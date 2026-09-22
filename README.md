# Genie Dev Studios

Next.js App Router site with contact and quote forms delivered through Resend.

## Development

```sh
npm ci
# Add missing settings from .env.example to .env.local; keep existing secrets.
npm run dev
```

Use a development Turnstile widget that allows `localhost`, and set
`TURNSTILE_ALLOWED_HOSTNAMES=localhost`. Verification is required locally too.
Local development uses an in-memory limit when Redis is unconfigured; all local
requests share one bucket. Deployed instances require Redis.

## Form protection setup on Vercel

Configure these before deploying this change. Until configured, forms show an
email alternative and the APIs refuse to send unverified submissions.

1. Create a **Managed** widget in [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/).
   Allow `geniedevstudios.com` and `www.geniedevstudios.com`. Add explicit preview
   hostnames if preview forms should work, preferably in a separate widget.
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to the Vercel
   project's environment variables. Only the site key is public; keep the secret
   exclusively on the server. Production rejects Cloudflare dummy secret keys.
3. Set `TURNSTILE_ALLOWED_HOSTNAMES` to the same comma-separated hostname list
   (no protocols or paths). This list is checked against Cloudflare's response,
   never against a caller-supplied Host header.
4. Connect an Upstash Redis database and add its `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN`. The token must permit `EVAL`, `INCR`, `EXPIRE`, and
   `TTL`. The [REST API](https://upstash.com/docs/redis/features/restapi) is used
   directly, with no extra runtime package. Reuse one database across production
   instances so they share the counter; use separate credentials for previews.
5. Keep the existing `RESEND_API_KEY` and `EMAIL_USER`. Rebuild and redeploy after
   setting the public site key because Next.js embeds it at build time.

The homepage and contact page post to `/api/book`; the quote wizard posts to
`/api/quote`. Both endpoints enforce:

- Five attempts per visitor IP per ten minutes, shared across both routes.
  Vercel's `x-vercel-forwarded-for` header supplies the IP; arbitrary forwarding
  headers are ignored. Counters use HMAC-derived keys and expire after ten minutes.
  A blocked request returns `429` with `Retry-After`.
- A 32 KiB request limit, JSON parsing, and a hidden `companyWebsite` honeypot.
  Filled honeypots receive a generic success response without sending emails.
- Bounded names, valid emails and international phone numbers, and messages of
  10–4,000 characters. Messages made entirely of repeated characters or with
  more than five links are rejected. International names and ordinary Gmail
  addresses remain welcome. Contact forms require privacy consent on the server.
- [Server verification with Cloudflare](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
  including the expected action (`contact` or `quote`) and allowed hostname.
  Missing, forged, expired, or replayed tokens cannot reach email delivery.
- Escaping submitted text before inserting it into notification HTML.

The widget refreshes expired tokens and resets after each submission attempt.
Redis or verification outages stop email delivery with a retryable error.
The handlers retain the existing email-only lead workflow; they do not add a
database of submissions. Hosting outside Vercel requires an explicit trusted
client-IP implementation before production forms will accept requests.

## Checks

```sh
npm test
npx tsc --noEmit
npm run lint
npm run build
```

API tests mock Cloudflare, Redis, and Resend. No real email is sent. They exercise
the actual route handlers, covering accepted enquiries, invalid tokens and
payloads, honeypots, shared limits, outages, and HTML escaping. After deployment,
submit one genuine enquiry from each of `/`, `/contact`, and `/quote` to verify
the live widget, hostname configuration, and mail delivery together.
