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
    headline: "Design, test, and ship production-grade APIs in minutes",
    summary:
      "A premium API client and governance layer that makes collaboration, testing, and rollout feel effortless for African engineering teams.",
    problem:
      "Teams juggle fragmented tools for API design, versioning, and security. Rollouts break, documentation lags, and governance is an afterthought.",
    solution:
      "Squirrel API Studio unifies API design, testing, analytics, and rollout controls with opinionated workflows built for bandwidth-constrained environments.",
    features: [
      "Visual design + contract testing with automatic changelogs",
      "Team workspaces with granular environments and approvals",
      "Mock servers, performance budgets, and regression snapshots",
      "Zero-trust secrets handling and audit-grade logging",
      "CLI + SDKs for CI/CD integration across stacks",
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
    slug: "techchain",
    name: "TrustChain",
    category: "Fintech",
    headline: "Transparent risk, claims, and treasury rails for Africa",
    summary:
      "Hybrid on-chain/off-chain infrastructure for insurers, asset managers, and cooperatives to operate with trust and speed.",
    problem:
      "Legacy core systems are opaque, slow to reconcile, and disconnected from modern digital channels across the continent.",
    solution:
      "TrustChain provides programmatic policies, automated claims adjudication, and DAO-style governance for collaborative funds.",
    features: [
      "Programmable policies and event-driven claims",
      "Identity, KYC, and fraud controls tuned for regional regs",
      "Treasury dashboards with on/off-ramp automation",
      "Member governance with transparent voting and audits",
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
    slug: "vawt-lab",
    name: "VAWT Lab",
    category: "Hardware",
    headline: "Vertical-axis wind and microgrid intelligence",
    summary:
      "Hardware R&D for compact turbines, smart inverters, and grid-edge analytics tailored to African urban density.",
    problem:
      "Traditional turbines underperform in turbulent urban wind and require expensive maintenance, limiting deployment in cities.",
    solution:
      "VAWT Lab prototypes vertical-axis hardware with modular blades, IoT telemetry, and predictive maintenance driven by digital twins.",
    features: [
      "CFD-informed blade geometries for low-wind starts",
      "Modular drivetrain for fast field servicing",
      "Sensor stack with vibration, torque, and weather data",
      "Digital twin with predictive maintenance models",
    ],
    techStack: ["CAD", "CFD", "Embedded", "Edge AI"],
    status: "In Development",
    cta: "Collaborate with Labs",
  },
];

export const flagshipSlugs = [
  "squirrel-api-studio",
  "shedsense",
  "techchain",
  "vawt-lab",
];
