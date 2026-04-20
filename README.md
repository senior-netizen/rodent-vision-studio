# Rodent Vision Studio

Production-facing portfolio for infrastructure systems delivery, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Three.js**.

## Stack

- Next.js App Router (`app/*`)
- Typed content models (`data/*`)
- Reusable UI modules (`components/*`)
- Design tokens + typography + motion styles (`app/globals.css`)

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:8080`.

## Runtime commands (Next.js only)

```bash
npm run dev        # next dev --port 8080
npm run build      # next build
npm run start      # next start
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```


## Environment variables

Create a local `.env` from `.env.example` and configure the following variables:

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | No (defaults to `development`) | Runtime mode (`development`, `test`, or `production`). |
| `RESEND_API_KEY` | Yes in production | API key for outbound contact email delivery. |
| `CONTACT_TO_EMAIL` | No | Destination mailbox for contact requests. |
| `CONTACT_FROM_EMAIL` | No | Sender address used for contact requests. |
| `CLOUDINARY_CLOUD_NAME` | Yes in production | Cloudinary cloud account identifier. |
| `CLOUDINARY_API_KEY` | Yes in production | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Yes in production | Cloudinary API secret. |
| `FEATURE_ANALYTICS` | No | Enables/disables analytics ingestion route (`true/false` or `1/0`). |
| `FEATURE_CONTACT_FORM` | No | Enables/disables contact form route (`true/false` or `1/0`). |
| `FEATURE_AUTOMATION` | No | Toggle reserved for automation workflows (`true/false` or `1/0`). |

### Boot-time validation

Server runtime env is validated in `lib/env.ts`. In `production`, the app fails fast during boot if required secrets are missing.

## Architecture Note

This repository is **Next.js App Router only**. The canonical entrypoints are `app/layout.tsx` and `app/page.tsx`; do not add a second frontend entrypoint (for example, Vite `index.html` + `src/main.tsx` mounting flow).

## Architecture map

- `app/layout.tsx` – root layout and global shells
- `app/page.tsx` – homepage composition
- `app/projects/[slug]/page.tsx` – project detail routing
- `components/sections/*` – editorial section modules
- `components/case-study/*` – case study renderer
- `data/projects.ts` – project domain model + content
- `data/clients.ts`, `data/metrics.ts` – trust and impact datasets

## Security notes

- Never commit credentials to source control.
- Keep admin secrets in deployment environment variables.
- Rotate credentials immediately if exposure is suspected.
