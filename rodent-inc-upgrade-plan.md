# Rodent, Inc. — Website Upgrade Plan

**Site:** [www.rodent-lab.com](https://www.rodent-lab.com)  
**Date:** May 2026  
**Goal:** Attract more clients, look more professional, and better explain what Rodent does.

---

## 1. New Pages & Sections

### 1.1 Dedicated Contact Page
**Current state:** The "Contact" nav link leads to a bare or broken page — this is actively losing leads.

**What to build:**
- A project inquiry form with fields for:
  - Name & company
  - Email & phone
  - Project type (Web / Mobile / IoT / Robotics / Enterprise)
  - Budget range (< $5k / $5k–$20k / $20k–$50k / $50k+)
  - Timeline (ASAP / 1–3 months / 3–6 months / Flexible)
  - Brief project description (textarea)
- A response time promise (e.g. "We respond within 1 business day")
- Alternative contact options (email, WhatsApp, LinkedIn)

**Priority:** 🔴 Critical — fix before anything else.

---

### 1.2 Case Study Pages (one per project)
**Current state:** Each project has a one-line description and a thumbnail. That's not enough to close a B2B deal.

**What to build — one page per project:**

| Project | Stack | Story angle |
|---|---|---|
| **Job Opportunities For Everyone** | Flutter / Firebase | Centralising fragmented job listings into a scalable data platform |
| **Feel At Home** | Flutter / NestJS / PostgreSQL | End-to-end property discovery and remittance for renters and agents |
| **ShedSense** | ESP32 / Node / WS / React | Real-time energy monitoring for field assets with WebSocket streaming |
| **AR by Rodent** | (confirm stack) | Interactive brand storytelling beyond static landing pages |
| **Precise Locations** | (confirm stack) | Reusable geolocation utility for coordinate and distance management |

**Each case study page should include:**
1. **The problem** — what was broken or missing before Rodent was engaged
2. **The solution** — what was built, with key architectural decisions explained
3. **The stack** — technology choices and why
4. **The outcome** — measurable results (uptime, users onboarded, time saved, revenue enabled)
5. **Screenshots or demo video**
6. A CTA: *"Have a similar challenge? Start a project →"*

**Priority:** 🟠 High

---

### 1.3 Team / About Page
**Current state:** No team page exists. The "About" section is a one-paragraph blurb on the homepage.

**What to build:**
- Rodent's founding story and mission (2–3 paragraphs)
- Team member cards: photo, name, role, brief bio, LinkedIn link
- Core values or operating principles (3–5 bullet points)
- Geography: where Rodent operates and serves clients across Africa
- A timeline or milestones section (founded, first deployment, key clients, etc.)

**Priority:** 🟠 High — enterprise clients want to know who they're dealing with.

---

### 1.4 Pricing / Engagement Models Page
**Current state:** No pricing information anywhere on the site.

**What to build:**
- Three engagement models:
  - **MVP Sprint** — Fixed scope, fixed price, 6–8 weeks
  - **Project-Based** — Discovery → design → build → deploy, quoted per project
  - **Retainer / Embedded Team** — Monthly engineering capacity for ongoing clients
- Even rough budget ranges help pre-qualify leads and save sales time
- FAQ section: "How does the process work?", "Do you work with early-stage startups?", "Can you support post-launch?"

**Priority:** 🟡 Medium — improves lead quality significantly.

---

## 2. Content & Copywriting Improvements

### 2.1 Hero Section
**Current copy:**
> "Build systems that actually work"
> "From IoT grids to fintech rails — Rodent Inc turns wild ideas into deployed infrastructure."

**Issues:** Punchy but vague. Doesn't say who Rodent serves or where.

**Suggested rewrite:**

> **We build infrastructure that deploys.**
>
> From fintech rails to IoT sensor grids — Rodent, Inc. engineers production-ready systems for African enterprises, property platforms, and emerging-market operators.
>
> [Start a Project] [View Our Work]

**Priority:** 🟡 Quick win — 15-minute change, immediate improvement.

---

### 2.2 Project Card Descriptions
**Current state:** One sentence per project ("Property discovery and listing management were fragmented for renters and agents."). This describes the *problem* but not the *solution or outcome*.

**Format to use for each card:**
```
[Project name]
[One sentence: the problem]
[One sentence: what Rodent built]
[One sentence: the result or scale]
[Tech stack tags]
[→ View case study]
```

**Example rewrite for Feel At Home:**
> Renters and agents had no centralised platform for property discovery or payments in Zimbabwe.
> Rodent built Feel At Home — a Flutter app with NestJS APIs, booking flows, and integrated remittance.
> The platform now serves agents and tenants across multiple cities with end-to-end transaction support.
> `Flutter` `NestJS` `PostgreSQL`
> → [View case study]

**Priority:** 🟡 Quick win.

---

### 2.3 Service Pages (one per pillar)
**Current state:** Each service is a slide card with a stack list. No dedicated pages exist.

**What to build — one page per service:**

| Service | Target client |
|---|---|
| **Web Systems** | Corporates, SaaS companies, B2B portals |
| **Mobile Applications** | Startups, property, fintech, consumer apps |
| **IoT Systems** | Energy companies, utilities, SHEQ operators |
| **Robotics & Automation** | Industrial, agricultural, inspection |
| **Enterprise Platforms** | Fintech, property at scale, regulated industries |

**Each service page should include:**
- What the service covers (3–5 bullets)
- Who it's for (target client profile)
- What the typical engagement looks like (process steps)
- 1–2 example projects with a link to the case study
- CTA: *"Talk to us about your [Web / IoT / Mobile] project →"*

**Priority:** 🟠 High — critical for SEO and converting organic search traffic.

---

### 2.4 Labs Section Copy
**Current state:** Labs is a section on the homepage with 3 one-line items (Edge Orchestrator, Autonomous Inspection, Adaptive Grid Forecasting).

**Improvements:**
- Add a short paragraph explaining what "Labs" means at Rodent (internal R&D? open source? client spinouts?)
- Each lab project needs: a 2–3 sentence description, current status (research / prototype / deployed), and a "Follow progress" or "Collaborate" CTA

**Priority:** 🟡 Medium.

---

## 3. New Features

### 3.1 Blog / Insights
**Why:** A technical blog is the highest-ROI long-term investment for B2B SEO and positioning.

**Suggested content pillars:**
1. **Engineering deep-dives** — "How we built real-time energy monitoring with ESP32 and WebSockets"
2. **Africa infrastructure** — "Why fintech in Zimbabwe needs offline-first architecture"
3. **Tutorials & open source** — Short technical posts that rank on Google
4. **Company updates** — New projects, partnerships, Labs progress

**Recommended first 5 posts:**
- "Building KwikSend: Flutter + NestJS for cross-border remittance in Africa"
- "ShedSense architecture: WebSocket streaming from ESP32 to React dashboard"
- "Why we chose NestJS over Express for production API work"
- "The case for offline-first mobile apps in emerging markets"
- "What we learned building property tech for the Zimbabwean market"

**Tech recommendation:** Use a headless CMS (Sanity, Contentful, or Keystatic) that plugs into your existing stack.

**Priority:** 🟠 High — start publishing within 30 days of launch.

---

### 3.2 Project Inquiry Form (embedded)
**Current state:** "Start a Project" CTA links to a /contact page that may be broken.

**What to build:**
- An embedded form in the homepage CTA section (not just a link)
- Same fields as the dedicated contact page (see 1.1)
- On submit: send email notification to Rodent team + auto-reply to the prospect
- Optional: integrate with a CRM (HubSpot free tier, Notion, or Airtable)

**Priority:** 🔴 Critical.

---

### 3.3 Testimonials Section
**Why:** Even 2–3 client quotes on the homepage dramatically improve conversion for B2B services. Enterprise buyers look for social proof before making first contact.

**What to build:**
- 3–5 client quotes with: name, title, company, and optional logo
- Place on homepage between the Projects section and the CTA
- Format: large quote, attribution, company logo or avatar

**If you don't have quotes yet:**
- Reach out to 3 past clients and ask for a 1–2 sentence testimonial
- Even informal WhatsApp messages can be cleaned up and used with permission

**Priority:** 🟠 High.

---

### 3.4 SEO Foundations
**Current gaps:**
- No meta descriptions visible on the homepage
- Page titles need optimisation ("Rodent, Inc." alone won't rank)
- No structured data (schema.org) for the business or services

**Quick wins:**
- Add descriptive `<title>` tags per page: e.g. *"IoT Systems Engineering in Africa | Rodent, Inc."*
- Add `<meta name="description">` to every page (150–160 characters)
- Submit sitemap to Google Search Console
- Add `LocalBusiness` and `SoftwareApplication` schema where relevant

**Priority:** 🟡 Medium — do this alongside every new page added.

---

## Suggested Build Order

| Phase | Items | Timeline |
|---|---|---|
| **Phase 1** | Fix contact page + embed inquiry form + hero copy rewrite | Week 1 |
| **Phase 2** | Rewrite project card descriptions + add case study pages | Weeks 2–3 |
| **Phase 3** | Service pages (one per pillar) + SEO meta tags | Weeks 3–4 |
| **Phase 4** | Team/About page + Testimonials section | Week 4–5 |
| **Phase 5** | Blog setup + first 3 posts published | Weeks 5–7 |
| **Phase 6** | Pricing/Engagement models page + Labs copy | Week 7–8 |

---

## Notes

- All new pages should maintain the existing dark/minimal aesthetic of the current site.
- Each new page needs a consistent header/footer and internal linking back to Services and Contact.
- Consider adding a WhatsApp chat widget — it converts extremely well for B2B in Zimbabwe and the broader African market.
- The domain `rodent-lab.com` vs the brand name "Rodent, Inc." creates a minor disconnect — consider whether `rodent.inc` or `rodentinc.com` is worth pursuing long-term.

---

*Generated with Claude — [claude.ai](https://claude.ai)*
