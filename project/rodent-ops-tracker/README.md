# rodent-ops-tracker

`rodent-ops-tracker` is a Next.js + TypeScript sub-application that can run standalone **or** mount behind an existing website under a base path such as `/tracker`.

## 1) Project folder structure

```txt
project/rodent-ops-tracker
├── app
│   ├── api
│   │   ├── expenses
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   └── projects
│   │       ├── [id]/route.ts
│   │       └── route.ts
│   ├── components
│   │   └── dashboard-charts.tsx
│   ├── lib
│   │   ├── prisma.ts
│   │   └── validators.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── prisma
│   └── schema.prisma
├── scripts
│   └── post-export.mjs
├── .env.example
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## 2) Packages to install

```bash
npm install next react react-dom @prisma/client recharts zod
npm install -D prisma typescript @types/node @types/react @types/react-dom cross-env
```

## Quick start

```bash
cd project/rodent-ops-tracker
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

Tracker UI becomes available at: `http://localhost:3000/tracker`.

---

## 3) Example `page.tsx` for the dashboard

> Real file: `app/page.tsx`

Highlights:
- Fetches projects + expenses from Prisma.
- Computes chart datasets (`byCategory`, `revenueExpense`).
- Renders tables + charts with `recharts`.

```tsx
import { prisma } from '@/app/lib/prisma';
import { DashboardCharts } from '@/app/components/dashboard-charts';

export default async function DashboardPage() {
  const [projects, expenses] = await Promise.all([
    prisma.project.findMany({
      orderBy: { startDate: 'desc' },
      include: { expenses: true }
    }),
    prisma.expense.findMany({ orderBy: { date: 'desc' }, take: 8 })
  ]);

  const byCategory = Object.entries(
    projects.flatMap((p) => p.expenses).reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const revenueExpense = projects.map((p) => ({
    name: p.name,
    revenue: p.revenue,
    expenses: p.expenses.reduce((sum, e) => sum + e.amount, 0)
  }));

  return <DashboardCharts byCategory={byCategory} revenueExpense={revenueExpense} />;
}
```

---

## 4) Example database schema with Prisma

> Real file: `prisma/schema.prisma`

```prisma
enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
}

enum ExpenseCategory {
  EQUIPMENT
  LABOR
  SOFTWARE
  TRAVEL
  OTHER
}

model Project {
  id        String        @id @default(cuid())
  name      String
  status    ProjectStatus @default(PLANNING)
  revenue   Float         @default(0)
  startDate DateTime
  endDate   DateTime?
  expenses  Expense[]
}

model Expense {
  id        String          @id @default(cuid())
  title     String
  amount    Float
  date      DateTime
  category  ExpenseCategory
  projectId String
  project   Project         @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

---

## 5) Example API route handlers (CRUD)

> Real files:
- `app/api/projects/route.ts`
- `app/api/projects/[id]/route.ts`
- `app/api/expenses/route.ts`
- `app/api/expenses/[id]/route.ts`

### Route map

- `GET /tracker/api/projects`
- `POST /tracker/api/projects`
- `GET /tracker/api/projects/:id`
- `PUT /tracker/api/projects/:id`
- `DELETE /tracker/api/projects/:id`

- `GET /tracker/api/expenses`
- `POST /tracker/api/expenses`
- `GET /tracker/api/expenses/:id`
- `PUT /tracker/api/expenses/:id`
- `DELETE /tracker/api/expenses/:id`

### Sample create payloads

```json
{
  "name": "Cage Sensor Rollout",
  "status": "ACTIVE",
  "revenue": 45000,
  "startDate": "2026-01-01T00:00:00.000Z",
  "endDate": null
}
```

```json
{
  "title": "Thermal Camera Module",
  "amount": 1299.99,
  "date": "2026-01-20T00:00:00.000Z",
  "category": "EQUIPMENT",
  "projectId": "ck_project_id"
}
```

---

## 6) Integration into an existing website

### A) Reverse proxy (recommended for server-side API support)

Use this if `rodent-lab.com` is your main site and tracker runs as separate process at `localhost:3010`.

#### Nginx

```nginx
location /tracker/ {
  proxy_pass http://127.0.0.1:3010/tracker/;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

### B) iframe embed (quick integration)

```html
<iframe
  src="https://rodent-lab.com/tracker"
  title="Rodent Ops Tracker"
  style="width:100%; min-height:900px; border:0;"
  loading="lazy"
></iframe>
```

### C) Standalone deployment

```bash
npm run build
npm run start
```

### D) Static assets build output

For static-only hosting previews (no Next.js API runtime):

```bash
npm run build:static
```

Exports static assets to `out/`. Note: API routes require Node runtime, so they are unavailable in pure static mode.

---

## Deployment notes for `/tracker`

- Base path is controlled by `TRACKER_BASE_PATH` (defaults to `/tracker`).
- `next.config.mjs` sets `basePath` and `assetPrefix` so all routes/assets resolve correctly when proxied.
- For standalone containerized deploys, use `npm run build` (standalone output).
