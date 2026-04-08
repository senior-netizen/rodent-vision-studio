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

## Commands

```bash
npm run dev        # next dev --port 8080
npm run build      # next build
npm run start      # next start
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

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
