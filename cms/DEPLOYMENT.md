# CMS deployment runbook

## Create the Vercel project

1. Import this Git repository into Vercel as a **new, separate project**.
2. Set **Root Directory** to `cms`.
3. Allow Vercel to detect **Next.js**. Use the package scripts without adding a repository-root build command.
4. Do not point the CMS project at the existing public-site root.

Add `cms.rodent-lab.com` under **Project Settings → Domains**, then create the exact DNS record Vercel displays. Do not copy a hard-coded target from this document; Vercel's assigned target is authoritative.

## Environment

Required in production:

- `DATABASE_URL` — standard TLS PostgreSQL connection URL.
- `PAYLOAD_SECRET` — long cryptographically random value (for example, 32+ random bytes); rotating it invalidates sessions.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob store token. Media uses Payload's official adapter and direct client uploads.
- `CMS_PUBLIC_URL` — `https://cms.rodent-lab.com`.
- `PUBLIC_SITE_URL` — the exact public origin, normally `https://www.rodent-lab.com`.
- `PREVIEW_SECRET` — a separate long random value shared only with the public site's server-side preview handler.

Optional email variables are `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM`. Configure them together for password recovery/invitations. With SMTP omitted the CMS starts normally, but email-dependent flows are unavailable. None of these names may be prefixed with `NEXT_PUBLIC_`.

## PostgreSQL and migrations

Provision a managed PostgreSQL database (Neon, Supabase Postgres, Railway, Vercel-integrated Postgres, or another standard provider) before production use. Development may synchronize schemas; production disables schema push and must use reviewed Drizzle migrations:

```bash
cd cms
pnpm install               # commit the generated lockfile before the first production release
pnpm migrate:create       # during development; review and commit the result
pnpm migrate              # release step against the target database
pnpm build
```

Run migrations once per release before routing traffic; never run destructive development push against production. The first production administrator is created through Payload's one-time initialization screen only when the users table is empty.

## Blob media

Connect a Vercel Blob store to this project and provide its read/write token. The adapter is isolated in `payload.config.ts`, uses direct uploads to avoid serverless request-size limits, and can later be replaced by an official S3-compatible/R2 adapter without changing collection relationships. Production must not rely on ephemeral Vercel disk.

## Security operations

- Restrict CORS/CSRF to the exact CMS and public-site origins; never use a wildcard.
- Add Vercel Firewall/Cloudflare distributed rate limits to login, reset, and preview endpoints.
- Keep dependencies patched and validate the configured admin CSP in report-only mode before making it more restrictive (a guessed policy can break Payload Admin).
- MFA is an explicitly documented gap: enforce it upstream until a maintained Payload-compatible implementation is reviewed.
- Confirm `/admin` and `/api` return `X-Robots-Tag: noindex, nofollow` and HTTPS returns HSTS.

## Backups

Enable provider-managed PostgreSQL backups and point-in-time recovery, test restores, and define retention. Enable Blob/provider durability and object versioning where available. Git and Vercel deployment history back up **code only**, not database records or uploaded media.

## Rollout

Deploy the CMS first. Integrate published Insights into the public site next, then Services, Projects, and finally Homepage/settings. Preserve hard-coded content until parity and rollback behavior are verified.
