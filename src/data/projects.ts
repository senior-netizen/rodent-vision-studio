export type ProjectCategory = "DevTools" | "Energy" | "Fintech" | "Infrastructure" | "Hardware";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  headline: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  status: "Production" | "Private Beta" | "In Development";
  cta?: string;
  heroImage?: string;
};

export const projects: Project[] = [
  {
    slug: "squirrel-api-studio",
    name: "Squirrel API Studio",
    category: "DevTools",
    headline: "Design, test, and govern APIs that survive African network realities",
    summary:
      "A premium API workspace with offline modes, observability, and collaboration built for distributed teams shipping critical integrations across the continent.",
    problem:
      "Enterprise teams in Africa wrangle unreliable networks, fragmented tools, and slow approvals—pushing API delivery from weeks to months.",
    solution:
      "Squirrel API Studio compresses design, testing, and rollout into a single offline-capable surface with AI validation, queue simulation, and real-time governance.",
    features: [
      "AI-powered test and doc generation that understands African payment rails",
      "Offline collections with bandwidth-aware diffing and sync",
      "Queue and WebSocket simulators for mobile-first traffic",
      "OAuth, MTLS, and secrets isolation with audit-grade logging",
      "Observability overlays with latency, retries, and error budgets",
      "Team workspaces, reviews, and rollout approvals",
    ],
    techStack: ["React", "TypeScript", "Node.js", "OpenAPI", "PostgreSQL"],
    status: "Private Beta",
    cta: "Request access",
  },
  {
    slug: "squirrel-api-vision",
    name: "Squirrel API Vision",
    category: "DevTools",
    headline: "No-code API orchestration for modern teams",
    summary:
      "Drag-and-drop flows, observability, and guardrails that let product teams ship resilient integrations without drowning in boilerplate.",
    problem:
      "Integrations across payments, identity, and logistics take months to stabilize, especially when partners change contracts and SLAs frequently.",
    solution:
      "API Vision offers visual orchestration with retries, circuit breakers, and observability baked in—deployable to your cloud or ours.",
    features: [
      "Visual flow builder with test sandboxes",
      "Pre-built connectors for African fintech and telecom partners",
      "Runtime policies for rate limits, auth, and data residency",
      "Live observability and incident timelines for every flow",
    ],
    techStack: ["React", "Node.js", "Temporal", "Kafka", "Grafana"],
    status: "In Development",
    cta: "Join design partners",
  },
  {
    slug: "squirrel-ai",
    name: "Squirrel AI",
    category: "DevTools",
    headline: "AI copilots tuned for African engineering realities",
    summary:
      "Context-aware assistants that understand your stack, your APIs, and the constraints of building for emerging markets.",
    problem:
      "Generic AI tooling ignores local infrastructure, regulations, and the nuances of mobile-first, low-bandwidth deployments.",
    solution:
      "Squirrel AI trains on your codebase, infra, and observability signals to deliver grounded suggestions, migrations, and playbooks.",
    features: [
      "Secure on-prem or VPC deployment with data retention controls",
      "Playbooks for incident response, rollout, and QA",
      "Inline code generation aligned to team conventions",
      "Multilingual responses for distributed teams",
    ],
    techStack: ["TypeScript", "Python", "LLMs", "Vector Search"],
    status: "In Development",
    cta: "Book a demo",
  },
  {
    slug: "shedsense",
    name: "ShedSense",
    category: "Energy",
    headline: "Real-time load-shedding intelligence for African grids",
    summary:
      "Outage-aware APIs, dashboards, and alerting that keep cities, utilities, and businesses resilient when the grid is unstable.",
    problem:
      "Utilities and enterprises lack reliable, programmatic visibility into load-shedding, leading to downtime, spoiled inventory, and frustrated citizens.",
    solution:
      "ShedSense ingests utility schedules, field sensors, and crowdsourced telemetry to deliver precise outage timelines, device-level controls, and predictive insights.",
    features: [
      "API + dashboards for outage schedules and live incidents",
      "Predictive modeling for diesel usage and battery autonomy",
      "Smart notifications for residents, facilities, and field teams",
      "Sensor integrations for generators, solar, and IoT meters",
      "Enterprise SLAs with regional coverage across SADC",
    ],
    techStack: ["IoT", "Edge Compute", "PostgreSQL", "React", "Mapbox"],
    status: "Production",
    cta: "Schedule a pilot",
  },
  {
    slug: "squirrel-property",
    name: "Squirrel Property",
    category: "Infrastructure",
    headline: "Modern property operations for African portfolios",
    summary:
      "Digital-first tenancy, billing, and maintenance with embedded payments and energy insights out of the box.",
    problem:
      "Landlords juggle spreadsheets, WhatsApp threads, and manual billing. Energy volatility makes forecasting and service delivery chaotic.",
    solution:
      "Squirrel Property unifies leases, payments, maintenance, and power telemetry so teams can run resilient buildings at scale.",
    features: [
      "Tenant and lease management with automated invoicing",
      "Embedded payments and reconciliations for local rails",
      "Maintenance workflows with SLAs and vendor scoring",
      "Energy dashboards with generator/solar visibility",
      "Owner and tenant portals with secure messaging",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "IoT"],
    status: "Private Beta",
    cta: "Request a walkthrough",
  },
  {
    slug: "trustchain",
    name: "TrustChain",
    category: "Fintech",
    headline: "Transparent claims and payouts for insurers and cooperatives",
    summary:
      "Hybrid blockchain infrastructure that makes policy storage, claims adjudication, and treasury flows verifiable end to end.",
    problem:
      "Claims across the continent can take 30-90 days to settle, with little visibility for policyholders or reinsurers.",
    solution:
      "TrustChain captures every claim and policy change on an auditable ledger, automates evidence checks, and unlocks programmatic payouts.",
    features: [
      "Transparent policy storage with verifiable updates",
      "Evidence-backed claims workflows and shared audit trails",
      "Treasury automation with tokenized or fiat payouts",
      "DAO-style voting for mutuals and captives",
      "API hooks for reinsurer notifications and reserves",
    ],
    techStack: ["Solidity", "Node.js", "React", "PostgreSQL"],
    status: "In Development",
    cta: "Explore partnership",
  },
  {
    slug: "squirrel-cli",
    name: "Squirrel CLI",
    category: "DevTools",
    headline: "Command-line velocity for the Squirrel ecosystem",
    summary:
      "Automate environments, run smoke tests, and ship configuration-as-code across Rodent's platforms from your terminal.",
    problem:
      "Developers context-switch between dashboards and scripts to manage environments, tokens, and deployments.",
    solution:
      "The Squirrel CLI wraps best-practice workflows with secure auth, templates, and observability hooks that work offline-first.",
    features: [
      "Project scaffolding with linted, typed templates",
      "Offline-friendly auth with encrypted keychains",
      "One-command environment promotion and rollbacks",
      "Metrics tailing and log streaming for APIs and devices",
    ],
    techStack: ["TypeScript", "Rust", "OpenAPI", "GitHub Actions"],
    status: "Private Beta",
    cta: "Join early access",
  },
  {
    slug: "rodent-labs-vawt",
    name: "Rodent Labs — VAWT",
    category: "Hardware",
    headline: "Vertical-axis wind hardware tuned for dense African cities",
    summary:
      "Biomimicry-inspired turbines with IoT telemetry, solar coupling, and predictive maintenance for rooftops and industrial parks.",
    problem:
      "Urban wind in Lagos or Harare is turbulent and low-speed; traditional turbines stall and maintenance overwhelms OPEX.",
    solution:
      "Rodent Labs prototypes modular VAWTs with low-wind start torque, sensor-rich nacelles, and digital twins that forecast service windows.",
    features: [
      "IoT telemetry stack with vibration, torque, and weather feeds",
      "Modular blades and drivetrain for 90-minute swaps",
      "Hybrid solar coupling with shared inverters and storage",
      "Predictive maintenance using digital twins and edge AI",
      "Quiet, biomimicry-led aero profiles for rooftops",
    ],
    techStack: ["CAD", "CFD", "Embedded", "Edge AI"],
    status: "In Development",
    cta: "Collaborate with Labs",
  },
  {
    slug: "lights-out",
    name: "Lights Out",
    category: "Energy",
    headline: "Grid-aware utilities companion with smart alerts",
    summary:
      "Consumer and SME energy intelligence with region-based alerts, outage-resistant schedules, and a marketplace for backup options.",
    problem:
      "Load shedding across Zimbabwe and SADC still blindsides households and SMEs, leading to spoilage, diesel overspend, and unplanned downtime.",
    solution:
      "Lights Out tracks municipal APIs, citizen signals, and generator telemetry to deliver reliable schedules, predictive alerts, and a trusted backup marketplace.",
    features: [
      "Region-based alerts with language localization",
      "Offline-first schedules for low-connectivity zones",
      "Fault reporting with utility-friendly evidence bundles",
      "Fuel market and solar marketplace with verified suppliers",
      "Generator + battery monitoring with smart thresholds",
      "Municipality and utility API partnerships for authoritative data",
    ],
    techStack: ["React", "IoT", "Edge Compute", "Mapbox", "PostgreSQL"],
    status: "In Development",
    cta: "Join the beta",
  },
];

export const flagshipSlugs = [
  "squirrel-api-studio",
  "shedsense",
  "trustchain",
  "rodent-labs-vawt",
  "lights-out",
];
