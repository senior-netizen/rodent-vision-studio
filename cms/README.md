# Rodent Lab CMS

Independent Payload CMS 3 / Next.js / TypeScript application. This directory is a self-contained Vercel root; it does not share runtime dependencies or build steps with the public site.

## Local development

1. Use Node 20.9+ and PostgreSQL.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, a random `PAYLOAD_SECRET`, `PREVIEW_SECRET`, and (for uploads) `BLOB_READ_WRITE_TOKEN`.
3. Run:

```bash
cd cms
pnpm install
pnpm dev
```

Open <http://localhost:3001/admin>. Payload only offers first-user creation while the users collection is empty. Create the first production super-admin interactively; the seed script never creates accounts.

## Content/API boundary

REST is served from `/api`; GraphQL is available but optional. Anonymous collection reads are constrained server-side to `_status = published`. `users` and audit logs are never public. Authors can edit only their own non-published Insights; service, project, settings, publishing, and user-management rights are enforced in collection/global access functions.

Run `pnpm seed` only in development to add standard taxonomies. The intended public-site migration order is Insights, Services, Projects, then Homepage/settings. Keep existing hard-coded pages until each API-backed route is validated.

## Preview contract

`src/lib/preview.ts` signs short-lived HMAC-SHA256 claims (`collection`, `slug`, `exp`) with `PREVIEW_SECRET`. Public-site integration should add an authenticated preview entry endpoint which receives a token generated for a logged-in CMS editor, verifies it server-side with the same secret, enables the framework's preview/draft cookie, and fetches the requested draft server-to-server using an authenticated least-privilege Payload account. Tokens must never be logged or put in client bundles. There is deliberately no anonymous “draft by slug” endpoint.

## MFA and rate limiting

This baseline uses Payload's lockout, login-attempt limit, secure/HTTP-only authentication cookies, and eight-hour token expiry. Payload does not currently provide a maintained first-party TOTP flow appropriate to install blindly; no home-grown MFA is included. Require MFA at the identity/infrastructure layer until a reviewed Payload-compatible provider is selected. Configure Vercel Firewall or Cloudflare rate limiting for `/api/users/login`, password reset, and preview-entry routes—local-memory limiting is ineffective on serverless instances.
