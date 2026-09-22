import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { POST as book } from '../src/app/api/book/route';
import { POST as quote } from '../src/app/api/quote/route';
import { clientIp } from '../src/lib/leadRateLimit.server';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
let sentEmails: { html: string; to: string; reply_to: string }[];
let verificationRequests: { response: string; remoteip: string; secret: string }[];
let counters: Map<string, number>;
let verificationResult: Record<string, unknown> | undefined;
let failingService: 'redis' | 'turnstile' | undefined;
let usedTokens: Set<string>;

beforeEach(() => {
  process.env.VERCEL = '1';
  process.env.TURNSTILE_SECRET_KEY = 'test-secret-not-a-cloudflare-dummy-key';
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = 'geniedevstudios.com,www.geniedevstudios.com';
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-redis-token';
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.EMAIL_USER = 'admin@example.test';
  sentEmails = [];
  verificationRequests = [];
  counters = new Map();
  usedTokens = new Set();
  verificationResult = undefined;
  failingService = undefined;
  globalThis.fetch = async (url, options) => {
    const address = String(url);
    if (address.startsWith('https://redis.example.test')) {
      if (failingService === 'redis') throw new Error('Redis unavailable');
      const command = JSON.parse(String(options?.body));
      assert.equal(command[0], 'EVAL');
      assert.equal(command[2], '1');
      assert.equal(command[4], '600');
      const key = command[3];
      assert.match(key, /^genie:leads:[a-f0-9]{64}$/);
      const count = (counters.get(key) ?? 0) + 1;
      counters.set(key, count);
      return Response.json({ result: [count, 600] });
    }
    if (address === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      if (failingService === 'turnstile') throw new Error('Verification unavailable');
      const body = JSON.parse(String(options?.body));
      verificationRequests.push(body);
      const replayed = usedTokens.has(body.response);
      usedTokens.add(body.response);
      return Response.json(verificationResult ?? {
        success: !replayed,
        hostname: 'geniedevstudios.com',
        action: body.response.startsWith('quote') ? 'quote' : 'contact',
      });
    }
    if (address === 'https://api.resend.com/emails') {
      sentEmails.push(JSON.parse(String(options?.body)));
      return Response.json({ id: `email-${sentEmails.length}` });
    }
    throw new Error(`Unexpected network request: ${address}`);
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

const contactPayload = {
  firstName: 'Ama', lastName: 'Mensah', email: 'ama@example.com',
  purpose: 'Hi, I need an e-commerce website.', privacyAccepted: true,
  turnstileToken: 'contact-valid', companyWebsite: '',
};
const quotePayload = {
  service: 'web', features: ['Custom E-commerce'],
  description: 'Hi, I need an e-commerce website.', budget: 'standard', timeframe: '1-3-months',
  contact: { name: 'Ama Mensah', email: 'ama@example.com', whatsapp: '+233539433339' },
  turnstileToken: 'quote-valid', companyWebsite: '',
};

function request(payload: unknown, headers: Record<string, string> = {}) {
  return new Request('https://geniedevstudios.com/api/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-vercel-forwarded-for': '203.0.113.10', ...headers },
    body: JSON.stringify(payload),
  });
}

for (const [label, handler, payload] of [
  ['contact', book, contactPayload], ['quote', quote, quotePayload],
] as const) {
  test(`${label}: valid enquiry verifies before sending both emails`, async () => {
    const response = await handler(request(payload));
    assert.equal(response.status, label === 'quote' ? 201 : 200);
    assert.equal(verificationRequests.length, 1);
    assert.equal(verificationRequests[0].remoteip, '203.0.113.10');
    assert.equal(sentEmails.length, 2);
    assert.equal(sentEmails[0].reply_to, 'ama@example.com');
    if (label === 'quote') assert.ok((await response.json()).quote.estimate);
  });

  for (const token of [undefined, '', ' ', 123, 'x'.repeat(2049)]) {
    test(`${label}: rejects missing or malformed token (${typeof token}, ${String(token).length})`, async () => {
      const response = await handler(request({ ...payload, turnstileToken: token }));
      assert.equal(response.status, 400);
      assert.equal(verificationRequests.length, 0);
      assert.equal(sentEmails.length, 0);
    });
  }

  for (const result of [
    { success: false, 'error-codes': ['invalid-input-response'] },
    { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'attacker.example', action: label },
    { success: true, hostname: 'geniedevstudios.com', action: 'wrong-form' },
    { success: true },
    { success: true, action: label, hostname: 123 },
  ]) {
    test(`${label}: refuses untrusted verification ${JSON.stringify(result)}`, async () => {
      verificationResult = result;
      assert.equal((await handler(request(payload))).status, 400);
      assert.equal(sentEmails.length, 0);
    });
  }

  test(`${label}: honeypot silently discards without verification or mail`, async () => {
    assert.equal((await handler(request({ ...payload, companyWebsite: 'https://spam.example' }))).status, 200);
    assert.equal(verificationRequests.length, 0);
    assert.equal(sentEmails.length, 0);
  });

  test(`${label}: replayed token cannot send another email`, async () => {
    assert.ok((await handler(request(payload))).ok);
    assert.equal((await handler(request(payload))).status, 400);
    assert.equal(sentEmails.length, 2);
  });

  for (const service of ['redis', 'turnstile'] as const) {
    test(`${label}: ${service} outage fails closed`, async () => {
      failingService = service;
      assert.equal((await handler(request(payload))).status, 503);
      assert.equal(sentEmails.length, 0);
    });
  }

  test(`${label}: missing server configuration fails closed`, async () => {
    for (const key of ['TURNSTILE_SECRET_KEY', 'TURNSTILE_ALLOWED_HOSTNAMES', 'UPSTASH_REDIS_REST_TOKEN']) {
      const value = process.env[key];
      delete process.env[key];
      assert.equal((await handler(request(payload))).status, 503);
      process.env[key] = value;
    }
    assert.equal(sentEmails.length, 0);
  });

  test(`${label}: invalid JSON, content type, and oversized bodies never send mail`, async () => {
    const malformed = new Request('https://geniedevstudios.com/api/test', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-vercel-forwarded-for': '203.0.113.10' }, body: '{',
    });
    assert.equal((await handler(malformed)).status, 400);
    assert.equal((await handler(request(payload, { 'Content-Type': 'text/plain' }))).status, 415);
    assert.equal((await handler(request({ ...payload, padding: 'x'.repeat(33000) }))).status, 413);
    assert.equal((await handler(request(null))).status, 400);
    assert.equal((await handler(request([]))).status, 400);
    assert.equal(sentEmails.length, 0);
  });
}

test('contact: legacy name-only payload cannot bypass validation or consent', async () => {
  const response = await book(request({ name: 'Spam', email: 'spam@example.com', turnstileToken: 'contact-valid' }));
  assert.equal(response.status, 400);
  assert.equal(sentEmails.length, 0);
});

for (const patch of [
  { firstName: { invalid: true } }, { firstName: 'a'.repeat(101) }, { firstName: 'Name\r\nBcc: spam@example.com' },
  { email: 'invalid-email' }, { phone: 'abcdefghi' }, { privacyAccepted: false }, { privacyAccepted: 'true' },
  { purpose: 'hello' }, { purpose: 'a'.repeat(30) }, { purpose: 'x'.repeat(4001) },
  { purpose: 'https://spam.example '.repeat(6) },
]) {
  test(`contact: invalid field ${Object.keys(patch)[0]} is rejected`, async () => {
    assert.equal((await book(request({ ...contactPayload, ...patch }))).status, 400);
    assert.equal(sentEmails.length, 0);
  });
}

test('international names and a useful reference link are accepted and HTML is escaped', async () => {
  const response = await book(request({ ...contactPayload, firstName: "O'Neil", lastName: '李',
    purpose: 'Please build <b>our site</b> like https://example.com?a=1&b=2' }));
  assert.equal(response.status, 200);
  assert.match(sentEmails[0].html, /&lt;b&gt;our site&lt;\/b&gt;/);
  assert.match(sentEmails[0].html, /O&#39;Neil 李/);
  assert.doesNotMatch(sentEmails[0].html, /<b>our site<\/b>/);
  assert.doesNotMatch(sentEmails[1].html, /https:\/\/example.com/);
});

test('quote: rejects features outside the chosen service', async () => {
  assert.equal((await quote(request({ ...quotePayload, features: ['Made up feature'] }))).status, 400);
  assert.equal(sentEmails.length, 0);
});

test('both routes share a limit, including concurrent attempts and spoofed IP headers', async () => {
  const responses = await Promise.all(Array.from({ length: 10 }, (_, index) => {
    const handler = index % 2 ? quote : book;
    const payload = index % 2 ? quotePayload : contactPayload;
    return handler(request({ ...payload, turnstileToken: undefined }, { 'x-forwarded-for': `192.0.2.${index}` }));
  }));
  assert.equal(responses.filter((response) => response.status === 400).length, 5);
  const blocked = responses.filter((response) => response.status === 429);
  assert.equal(blocked.length, 5);
  assert.equal(blocked[0].headers.get('Retry-After'), '600');
  assert.equal(counters.size, 1);
  assert.equal(sentEmails.length, 0);
  assert.equal((await book(request(contactPayload, { 'x-vercel-forwarded-for': '203.0.113.11' }))).status, 200);
});

test('an untrusted forwarding header cannot replace a missing Vercel IP', async () => {
  assert.equal((await book(request(contactPayload, { 'x-vercel-forwarded-for': '', 'x-forwarded-for': '203.0.113.10' }))).status, 400);
  assert.equal(sentEmails.length, 0);
});

test('IPv6 spelling variations use the same canonical IP', () => {
  assert.equal(clientIp(request({}, { 'x-vercel-forwarded-for': '2001:0db8:0:0:0:0:0:1' })),
    clientIp(request({}, { 'x-vercel-forwarded-for': '2001:db8::1' })));
});

test('Cloudflare dummy secrets cannot be used in production', async () => {
  Object.assign(process.env, { NODE_ENV: 'production', TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA' });
  assert.equal((await book(request(contactPayload))).status, 503);
  assert.equal(sentEmails.length, 0);
});
