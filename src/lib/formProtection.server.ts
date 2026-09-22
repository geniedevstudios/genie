import { clientIp, enforceLeadRateLimit } from './leadRateLimit.server';
import { SubmissionError } from './submissionError';

const MAX_BODY_BYTES = 32 * 1024;

async function readJson(request: Request): Promise<Record<string, unknown>> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new SubmissionError('Please send a JSON form submission.', 415);
  }
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) {
    throw new SubmissionError('The form submission is too large.', 413);
  }
  if (!request.body) throw new SubmissionError('The form submission is empty.', 400);

  // Enforce the byte limit even without Content-Length (including chunked POSTs).
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new SubmissionError('The form submission is too large.', 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  try {
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Expected an object.');
    return body as Record<string, unknown>;
  } catch {
    throw new SubmissionError('The form submission contains invalid JSON.', 400);
  }
}

export async function prepareSubmission(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || (process.env.NODE_ENV === 'production' && /^[123]x0{10,}/.test(secret))) {
    console.error('A real TURNSTILE_SECRET_KEY is required for deployed forms.');
    throw new SubmissionError('The form is temporarily unavailable. Please email us directly.', 503);
  }
  const ip = clientIp(request);
  await enforceLeadRateLimit(ip, secret);
  const body = await readJson(request);
  if (body.companyWebsite !== undefined && typeof body.companyWebsite !== 'string') {
    throw new SubmissionError('Invalid form submission.', 400);
  }
  return { body, ip, secret, honeypotFilled: typeof body.companyWebsite === 'string' && body.companyWebsite.length > 0 };
}

export async function verifySubmission(
  submission: Awaited<ReturnType<typeof prepareSubmission>>,
  action: 'contact' | 'quote',
): Promise<void> {
  const token = submission.body.turnstileToken;
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) {
    throw new SubmissionError('Please complete the verification and try again.', 400);
  }

  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
    .split(',').map((hostname) => hostname.trim().toLowerCase()).filter(Boolean);
  if (!allowedHostnames.length) {
    console.error('TURNSTILE_ALLOWED_HOSTNAMES is required.');
    throw new SubmissionError('The form is temporarily unavailable. Please email us directly.', 503);
  }

  let result: { success?: boolean; action?: string; hostname?: string; 'error-codes'?: string[] };
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: submission.secret, response: token, remoteip: submission.ip }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Turnstile request failed.');
    result = await response.json();
    if (!result || typeof result.success !== 'boolean') throw new Error('Invalid Turnstile response.');
  } catch {
    throw new SubmissionError('Verification is temporarily unavailable. Please try again shortly.', 503);
  }

  if (!result.success || result.action !== action || typeof result.hostname !== 'string' || !allowedHostnames.includes(result.hostname.toLowerCase())) {
    throw new SubmissionError('Verification failed or expired. Please try again.', 400);
  }
}
