import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { SubmissionError } from './submissionError';

const LIMIT = 5;
const WINDOW_SECONDS = 600;
const developmentBuckets = new Map<string, { count: number; expiresAt: number }>();

// INCR and expiry must happen atomically across concurrent Vercel instances.
const RATE_LIMIT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return {count, redis.call('TTL', KEYS[1])}
`;

export function clientIp(request: Request): string {
  if (process.env.VERCEL !== '1') {
    if (process.env.NODE_ENV !== 'production') return '127.0.0.1';
    throw new SubmissionError('The form is temporarily unavailable. Please email us directly.', 503);
  }

  // Vercel overwrites this header. Never fall back to a client-supplied
  // X-Forwarded-For or CF-Connecting-IP value.
  const ip = request.headers.get('x-vercel-forwarded-for')?.trim() ?? '';
  const version = isIP(ip);
  if (!version) throw new SubmissionError('Unable to verify your connection. Please try again.', 400);
  return version === 6 ? new URL(`http://[${ip}]`).hostname.slice(1, -1) : ip;
}

export async function enforceLeadRateLimit(ip: string, secret: string): Promise<void> {
  const key = `genie:leads:${createHmac('sha256', secret).update(ip).digest('hex')}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  let count: number;
  let ttl: number;

  if (!url && !token && process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
    const now = Date.now();
    for (const [key, bucket] of developmentBuckets) {
      if (bucket.expiresAt <= now) developmentBuckets.delete(key);
    }
    const bucket = developmentBuckets.get(key) ?? { count: 0, expiresAt: now + WINDOW_SECONDS * 1000 };
    bucket.count++;
    developmentBuckets.set(key, bucket);
    count = bucket.count;
    ttl = Math.ceil((bucket.expiresAt - now) / 1000);
  } else {
    if (!url || !token) {
      console.error('Form rate limiting requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
      throw new SubmissionError('The form is temporarily unavailable. Please email us directly.', 503);
    }
    try {
      const endpoint = new URL(url);
      if (endpoint.protocol !== 'https:') throw new Error('Redis REST requires HTTPS.');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', RATE_LIMIT_SCRIPT, '1', key, String(WINDOW_SECONDS)]),
        signal: AbortSignal.timeout(5000),
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Redis request failed.');
      const data = await response.json();
      if (data.error || !Array.isArray(data.result) || data.result.length !== 2) {
        throw new Error('Invalid Redis response.');
      }
      [count, ttl] = data.result;
      if (!Number.isInteger(count) || count < 1 || !Number.isInteger(ttl) || ttl < 0) {
        throw new Error('Invalid rate limit counter.');
      }
    } catch {
      console.error('Form rate limit service unavailable.');
      throw new SubmissionError('The form is temporarily unavailable. Please try again shortly.', 503);
    }
  }

  if (count > LIMIT) {
    throw new SubmissionError('Too many attempts. Please wait a few minutes before trying again.', 429, Math.max(1, ttl));
  }
}
