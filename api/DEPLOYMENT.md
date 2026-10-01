# API deployment

1. Open Vercel and select **Add New Project**.
2. Import the existing Rodent Lab Git repository.
3. Set **Root Directory** to `api`.
4. Confirm automatic Next.js detection and Node 20.9 or newer.
5. Add the environment variables listed in `.env.example` for Preview and Production as appropriate. Use secret values from the organisation's secret manager.
6. Deploy and verify `/health`, `/docs`, `/openapi.json`, a content collection, an invalid query, and signed/unsigned CMS webhook requests.
7. Open **Project Settings → Domains**, add `api.rodent-lab.com`, and configure the project-specific DNS target Vercel provides. Do not reuse a guessed DNS value.

The Vercel project's root isolation means changes can deploy without building the repository's website or `cms` projects. Configure the CMS to send the exact JSON webhook body with an HMAC-SHA256 signature in `X-Webhook-Signature`. Rotate the shared secret through coordinated Vercel and CMS configuration changes.

## Operational requirements

- Configure a Redis-compatible HTTP rate-limit store; production fails closed if it is absent.
- Configure Resend and verified sender/recipient addresses for contact delivery.
- Optionally configure Turnstile and pass its token as `turnstileToken`.
- Provision machine keys offline, store only their peppered hash and prefix, grant minimum scopes, and rotate before expiration.
- Monitor structured JSON logs by `requestId`, route, status, duration, safe error code, and webhook event ID response.
- Keep CMS and API secrets server-side. Never give the website draft, admin, database, webhook, or key-provisioning credentials.
