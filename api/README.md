# Rodent Lab API

Independent Next.js App Router API for `api.rodent-lab.com`. It is a boundary in front of Payload CMS: public callers receive allowlisted DTO fields from published records, never raw Payload documents. It has no database because all current data remains owned by the CMS or delivery providers.

## Local development

Requires Node 20.9+. Copy `.env.example` to `.env.local`, configure the required integrations, then:

```bash
cd api
npm install
npm run dev
```

The API runs at `http://localhost:3002` independently of the website and CMS. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` before deployment.

## Routes

- `/`, `/health`, `/docs`, `/openapi.json`
- `GET /v1/{insights,services,projects}` and `GET /v1/{insights,services,projects}/:slug`
- `GET /v1/{categories,technologies,industries}`
- `POST /v1/contact`
- Internal: `POST /v1/webhooks/cms`

Content requests explicitly set Payload's `draft=false` and `_status=published` constraints, use fixed query mappings rather than accepting Payload queries, map results into public DTOs, and cache for five minutes. The signed CMS webhook revalidates collection and record cache tags.

## Security model

Public reads and contact are unauthenticated. Contact has a 16 KiB body limit, strict Zod schema, honeypot, optional Turnstile, HTML escaping, and rate limiting. In production a Redis-compatible HTTP store configured by `RATE_LIMIT_STORE_URL` and `RATE_LIMIT_STORE_TOKEN` is mandatory; development uses an intentionally non-production memory fallback. Email delivery currently supports Resend when `EMAIL_PROVIDER=resend`.

The CMS webhook requires `X-Webhook-Signature: sha256=<hex HMAC-SHA256 of the exact body>` using `CMS_WEBHOOK_SECRET`. API-key helpers support SHA-256 hashes salted with a server-only pepper, expiry, enabled state, identification prefixes, and least-privilege scopes. `API_KEYS_JSON` is an initial server-side record source; move records to API-owned persistence before operating keys at scale. There is no public key creation endpoint and full keys must only be shown once by offline provisioning tooling.

CORS uses the exact comma-separated `ALLOWED_ORIGINS` allowlist; production defaults only to the two public Rodent Lab origins and CMS. Add localhost explicitly for development. Errors, logging, and request IDs are centralised without logging bodies or credentials.

## Environment variables

See `.env.example`. Required by deployed features: `CMS_BASE_URL`; `CMS_WEBHOOK_SECRET`; `ALLOWED_ORIGINS`; `RATE_LIMIT_STORE_URL`; `RATE_LIMIT_STORE_TOKEN`; and Resend delivery variables. `CMS_API_SECRET` is optional for a protected CMS read API. `TURNSTILE_SECRET` enables bot verification. Never prefix secrets with `NEXT_PUBLIC_`.

The public OpenAPI specification intentionally documents public endpoints only. Product transactional APIs (including Tread360 and QuoteFlow) remain separate bounded systems.
