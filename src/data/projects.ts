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
    headline: "Design, test, and govern APIs for unreliable networks",
    summary:
      "An API workspace with offline support, shared reviews, and observability for distributed engineering teams.",
    problem:
      "Teams working across Africa deal with unstable networks, scattered tooling, and long approval cycles that slow API releases.",
    solution:
      "Squirrel API Studio puts design, testing, rollout checks, and governance in one workspace with offline sync.",
    features: [
      "Test and docs assistance tuned for African payment and telecom integrations",
      "Offline collections with conflict-aware sync",
      "Queue and WebSocket simulators for mobile-first traffic",
      "OAuth, MTLS, secrets controls, and audit logging",
      "Latency, retries, and error-budget observability overlays",
      "Team reviews, approvals, and rollout checkpoints",
    ],
    techStack: ["React", "TypeScript", "Node.js", "OpenAPI", "PostgreSQL"],
    status: "Private Beta",
    cta: "Request access",
  },
  {
    slug: "squirrel-api-vision",
    name: "Squirrel API Vision",
    category: "DevTools",
    headline: "Visual API orchestration with runtime controls",
    summary:
      "Build integration flows with a visual editor, policy controls, and runtime observability.",
    problem:
      "Payment, identity, and logistics integrations often break when partners change specs or service levels.",
    solution:
      "API Vision provides visual orchestration with retries, circuit breakers, and deployment options in your cloud or ours.",
    features: [
      "Visual flow builder with test sandboxes",
      "Connectors for local fintech and telecom systems",
      "Runtime policies for auth, limits, and data residency",
      "Live observability and incident timelines",
    ],
    techStack: ["React", "Node.js", "Temporal", "Kafka", "Grafana"],
    status: "In Development",
    cta: "Join design partners",
  },
  {
    slug: "squirrel-ai",
    name: "Squirrel AI",
    category: "DevTools",
    headline: "Engineering assistants grounded in your systems",
    summary:
      "Assistants trained on your codebase, APIs, and runbooks to support engineering and operations teams.",
    problem:
      "Generic AI tools ignore local infrastructure limits, compliance needs, and mobile-first deployment realities.",
    solution:
      "Squirrel AI runs on your context and observability data to generate changes, runbooks, and incident guidance.",
    features: [
      "On-prem or VPC deployment with retention controls",
      "Incident, rollout, and QA playbooks",
      "Inline code generation aligned to team standards",
      "Multilingual output for distributed teams",
    ],
    techStack: ["TypeScript", "Python", "LLMs", "Vector Search"],
    status: "In Development",
    cta: "Book a demo",
  },
  {
    slug: "shedsense",
    name: "ShedSense",
    category: "Energy",
    headline: "Outage intelligence for load-shedding regions",
    summary:
      "APIs, dashboards, and alerts that help utilities, cities, and businesses plan around unstable power.",
    problem:
      "Utilities and operators often lack reliable programmatic outage visibility, causing downtime and costly decisions.",
    solution:
      "ShedSense combines utility schedules, field telemetry, and user reports to provide clearer outage timelines and actions.",
    features: [
      "Outage schedules and incident APIs with dashboards",
      "Diesel and battery autonomy forecasting",
      "Targeted alerts for residents and field teams",
      "Generator, solar, and meter sensor integrations",
      "Enterprise SLAs for SADC coverage",
    ],
    techStack: ["IoT", "Edge Compute", "PostgreSQL", "React", "Mapbox"],
    status: "Production",
    cta: "Schedule a pilot",
  },
  {
    slug: "squirrel-property",
    name: "Squirrel Property",
    category: "Infrastructure",
    headline: "Property operations for African portfolios",
    summary:
      "Lease, billing, maintenance, and payment workflows in one platform, with energy visibility included.",
    problem:
      "Property teams rely on spreadsheets and chat threads while energy instability disrupts planning and service delivery.",
    solution:
      "Squirrel Property centralizes tenant, payment, maintenance, and energy workflows for portfolio operators.",
    features: [
      "Tenant and lease management with invoicing",
      "Embedded payments and reconciliation",
      "Maintenance workflows with SLA tracking",
      "Energy dashboards for generator and solar status",
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
    headline: "Transparent claims and payouts infrastructure",
    summary:
      "Claims and policy workflows with verifiable records for insurers, cooperatives, and treasury teams.",
    problem:
      "Claims processing can take months with little visibility for policyholders, operators, and reinsurers.",
    solution:
      "TrustChain records policy and claim events in an auditable trail and supports automated payout workflows.",
    features: [
      "Policy records with verifiable history",
      "Evidence-based claims workflows",
      "Treasury automation for fiat or token payouts",
      "Voting flows for mutual and captive models",
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
    headline: "Command-line workflows for delivery teams",
    summary:
      "Manage environments, run checks, and deploy configuration workflows from the terminal.",
    problem:
      "Developers lose time switching between dashboards and scripts for auth, environment, and deployment tasks.",
    solution:
      "Squirrel CLI packages repeatable workflows with secure auth, templates, and telemetry hooks.",
    features: [
      "Project scaffolding with typed templates",
      "Offline-friendly auth with encrypted storage",
      "One-command environment promotion and rollback",
      "Log and metrics streaming for APIs and devices",
    ],
    techStack: ["TypeScript", "Rust", "OpenAPI", "GitHub Actions"],
    status: "Private Beta",
    cta: "Join early access",
  },
  {
    slug: "rodent-labs-vawt",
    name: "Rodent Labs — VAWT",
    category: "Hardware",
    headline: "Vertical-axis wind systems for dense cities",
    summary:
      "Modular turbine prototypes with telemetry and predictive maintenance for rooftops and industrial sites.",
    problem:
      "Urban wind is turbulent and low-speed, while traditional turbines are difficult and expensive to maintain locally.",
    solution:
      "Rodent Labs builds modular VAWT systems with low-wind startup, sensor telemetry, and digital maintenance planning.",
    features: [
      "Telemetry stack for vibration, torque, and weather",
      "Modular blades and drivetrain for quick swaps",
      "Solar coupling with shared inverter and storage",
      "Predictive maintenance with edge analytics",
      "Low-noise aero profiles suited to rooftops",
    ],
    techStack: ["CAD", "CFD", "Embedded", "Edge AI"],
    status: "In Development",
    cta: "Collaborate with Labs",
  },
  {
    slug: "lights-out",
    name: "Lights Out",
    category: "Energy",
    headline: "Grid-aware planning and alerting for residents and SMEs",
    summary:
      "Localized outage schedules, practical alerts, and backup power options for households and businesses.",
    problem:
      "Load shedding still causes product loss, diesel overspend, and avoidable downtime for homes and SMEs.",
    solution:
      "Lights Out combines municipal data, user reports, and device telemetry to improve schedule reliability and response.",
    features: [
      "Region-based alerts with local language support",
      "Offline-first schedule access",
      "Fault reporting with evidence capture",
      "Fuel and solar supplier listings",
      "Generator and battery monitoring thresholds",
      "Utility API integrations where available",
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
