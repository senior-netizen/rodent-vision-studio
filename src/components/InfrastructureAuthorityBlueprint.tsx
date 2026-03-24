const architectureLayers = [
  {
    name: "Edge Execution Layer",
    code: "L0_EDGE",
    scope: "QR stations, smart meters, transformer sensors, offline field apps.",
    function: "Captures operational state at source and buffers during network loss.",
  },
  {
    name: "Ingestion & Synchronization Layer",
    code: "L1_INGEST",
    scope: "Utility feeds, telco events, payment rails, manual forms, partner APIs.",
    function: "Normalizes fragmented inputs into signed event streams with provenance.",
  },
  {
    name: "Decision & Processing Layer",
    code: "L2_PROCESS",
    scope: "Rules engine, anomaly detection, tariff logic, credit scoring, reconciliation.",
    function: "Computes operational and financial decisions under unstable conditions.",
  },
  {
    name: "Platform API Layer",
    code: "L3_API",
    scope: "Public APIs, internal orchestration endpoints, policy-managed webhooks.",
    function: "Exposes deterministic interfaces for product systems and integrations.",
  },
  {
    name: "Interface & Operations Layer",
    code: "L4_INTERFACE",
    scope: "Control dashboards, mobile operator apps, municipal admin consoles.",
    function: "Delivers execution visibility, audits, interventions, and service workflows.",
  },
];

const productStack = [
  {
    name: "Squirrel API Studio",
    definition: "API control plane for infrastructure data exchange, orchestration, and partner integration.",
    problem: "Institutions run disconnected systems where every integration is bespoke, fragile, and unobservable.",
    components: ["API gateway", "schema registry", "event ingestion", "policy engine", "developer portal"],
    context: "African operators depend on mixed legacy stacks and intermittent connectivity, so integration must be resilient and auditable by default.",
  },
  {
    name: "ShedSense",
    definition: "Energy intelligence platform that converts field telemetry and outage signals into operational action.",
    problem: "Grid operators lack trusted real-time visibility for load instability, transformer risk, and outage recovery.",
    components: ["meter telemetry ingestion", "load analytics", "outage classification", "alert routing", "operator dashboard"],
    context: "Power volatility is structural, so sensing and decision loops must work with delayed, partial, and noisy data.",
  },
  {
    name: "Smart Metering System",
    definition: "Hardware-integrated metering network with secure sync, remote control, and consumption intelligence.",
    problem: "Revenue leakage and billing disputes persist when meter reads are manual, delayed, or tampered.",
    components: ["edge meter firmware", "device identity", "sync service", "billing event stream", "field technician app"],
    context: "Physical infrastructure is distributed and hard to service, requiring offline-safe capture and verifiable transaction trails.",
  },
  {
    name: "SME Financial Trust Engine",
    definition: "Infrastructure scoring and settlement system for SME risk, repayment behavior, and service continuity.",
    problem: "SMEs remain underfinanced because banks cannot verify daily operational reliability or cashflow integrity.",
    components: ["transaction ingestion", "behavioral scoring", "rules-based underwriting", "repayment monitoring", "institution API endpoints"],
    context: "Trust must be computed from fragmented operational data, not assumed from thin-file financial records.",
  },
];

const conversionPaths = [
  {
    audience: "Government & Utilities",
    entry: "Critical Infrastructure page with municipality and utility deployment map.",
    trust: ["Regulatory audit trail examples", "service continuity metrics", "procurement-ready security and compliance pack"],
    action: "Book infrastructure assessment → receive system architecture draft → begin scoped pilot in one service zone.",
  },
  {
    audience: "Developers",
    entry: "Developer portal with live API reference and sandbox credentials.",
    trust: ["Versioned API contracts", "incident and uptime history", "SDK quickstarts with test fixtures"],
    action: "Create account → generate keys → run reference integration → request production access.",
  },
  {
    audience: "Enterprises & Financial Institutions",
    entry: "Enterprise Systems page focused on risk, settlement, and operational verification.",
    trust: ["Pilot scorecard templates", "integration architecture patterns", "data governance and access controls"],
    action: "Define target portfolio → deploy data connectors → launch monitored trust model rollout.",
  },
];

export const InfrastructureAuthorityBlueprint = () => {
  return (
    <main className="bg-background text-foreground">
      <section className="section-padding border-y border-border/50">
        <div className="container mx-auto max-w-5xl space-y-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Core Thesis</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Rodent Inc. operates the infrastructure intelligence and execution layer that keeps power, payment, and field service systems reliable in volatile environments.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>
              The operating problem is not software scarcity; it is systemic unreliability across electricity, settlement rails, device fleets, and fragmented records.
              Institutions cannot coordinate service delivery when telemetry is delayed, payment proofs are inconsistent, and field actions are disconnected from policy.
              The result is lost revenue, weak trust, and slow recovery under routine failure conditions.
            </p>
            <p>
              Rodent wins by combining field-grade hardware integration, deterministic API contracts, and context-specific decision systems built for network loss, power instability,
              and regulatory accountability.
              The platform is designed around contested data, not ideal data, and turns fragmented signals into enforceable actions that operators, banks, and governments can verify.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-border/50 bg-card p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Infrastructure Overview</p>
            <h3 className="text-2xl font-semibold tracking-tight">One operational backbone for distributed, unstable infrastructure.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rodent links edge hardware, utilities, finance systems, and government operations through a single execution fabric that preserves data lineage and service continuity.
            </p>
          </article>
          <article className="rounded-2xl border border-border/50 bg-card p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Strategic Vision</p>
            <h3 className="text-2xl font-semibold tracking-tight">Build the default infrastructure substrate for service reliability across African markets.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ten-year objective: standardize how power, municipal operations, and SME finance exchange trustable signals.
              Twenty-year objective: operate cross-border infrastructure protocol rails that de-risk capital and service delivery.
            </p>
          </article>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary/30">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Product Stack</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Integrated platforms built as one system, not isolated products.</h3>
          </header>
          <div className="grid lg:grid-cols-2 gap-6">
            {productStack.map((product) => (
              <article key={product.name} className="rounded-2xl border border-border/50 bg-card p-7 space-y-4">
                <h4 className="text-2xl font-semibold tracking-tight">{product.name}</h4>
                <p className="text-muted-foreground">{product.definition}</p>
                <div>
                  <p className="font-medium">Problem it solves</p>
                  <p className="text-muted-foreground">{product.problem}</p>
                </div>
                <div>
                  <p className="font-medium">System components</p>
                  <p className="text-muted-foreground">{product.components.join(" · ")}</p>
                </div>
                <div>
                  <p className="font-medium">Infrastructure relevance</p>
                  <p className="text-muted-foreground">{product.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">System Architecture</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Visible layer model for implementation and governance.</h3>
            <p className="text-muted-foreground leading-relaxed">Layer naming convention: L0_EDGE → L1_INGEST → L2_PROCESS → L3_API → L4_INTERFACE.</p>
          </header>
          <div className="grid gap-4">
            {architectureLayers.map((layer) => (
              <article key={layer.code} className="grid lg:grid-cols-[220px_1fr] gap-4 rounded-xl border border-border/50 bg-card p-6">
                <div>
                  <p className="text-sm text-muted-foreground">{layer.code}</p>
                  <h4 className="text-xl font-semibold">{layer.name}</h4>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="text-foreground font-medium">Scope:</span> {layer.scope}</p>
                  <p><span className="text-foreground font-medium">Function:</span> {layer.function}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary/30">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Use Cases</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Operational patterns already represented in deployment design.</h3>
          </header>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
              <h4 className="text-xl font-semibold">Municipal Services</h4>
              <p className="text-muted-foreground">Streetlight uptime tracking, outage routing, work-order verification, and public accountability reporting.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
              <h4 className="text-xl font-semibold">Utility Operations</h4>
              <p className="text-muted-foreground">Load anomaly detection, transformer risk scoring, prepaid sync, and field response prioritization.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
              <h4 className="text-xl font-semibold">SME Finance</h4>
              <p className="text-muted-foreground">Operational behavior scoring, settlement validation, and repayment continuity intelligence for lenders.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Case Studies / Deployments</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Deployment narrative format for live authority proof.</h3>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Pilot: Municipality Service Zone</h4>
              <p className="text-muted-foreground">Integrated asset registry, outage workflow, and contractor verification reduced unresolved service tickets by operational week two.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Pilot: Utility Distribution Corridor</h4>
              <p className="text-muted-foreground">Transformer telemetry and rules-driven alerting cut unplanned maintenance response latency and improved restoration sequencing.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Pilot: SME Lending Cohort</h4>
              <p className="text-muted-foreground">Trust scoring from operations data improved borrower visibility and tightened repayment intervention timing.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Deployment Pack Structure</h4>
              <p className="text-muted-foreground">Each case includes architecture diagram, integration map, baseline metrics, incident record, and governance controls.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary/30">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-border/50 bg-card p-7 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Developer Layer</p>
            <h3 className="text-2xl font-semibold tracking-tight">Build against stable interfaces, not unstable field conditions.</h3>
            <p className="text-muted-foreground">Reference docs include API schemas, auth model, webhook contracts, idempotency guarantees, retry semantics, and version policy.</p>
            <p className="font-mono text-sm text-muted-foreground">GET /v1/municipal/assets?zone_id=lusaka-east</p>
            <p className="font-mono text-sm text-muted-foreground">POST /v1/meter-events/ingest</p>
            <p className="font-mono text-sm text-muted-foreground">POST /v1/trust-scores/compute</p>
          </article>
          <article className="rounded-2xl border border-border/50 bg-card p-7 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Government / Enterprise Layer</p>
            <h3 className="text-2xl font-semibold tracking-tight">Governance-ready systems for institutions accountable to service continuity.</h3>
            <p className="text-muted-foreground">Platform controls include role policies, audit exports, SLA monitoring, workflow approvals, and data residency configuration.</p>
            <p className="text-muted-foreground">Operational command surfaces: municipal command center, utility reliability desk, enterprise risk operations panel.</p>
          </article>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Proof & Metrics</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Evidence architecture for technical and institutional trust.</h3>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border/50 bg-card p-5"><p className="text-sm text-muted-foreground">Requests / day</p><p className="text-3xl font-semibold">2.4M</p></div>
            <div className="rounded-xl border border-border/50 bg-card p-5"><p className="text-sm text-muted-foreground">Platform uptime</p><p className="text-3xl font-semibold">99.96%</p></div>
            <div className="rounded-xl border border-border/50 bg-card p-5"><p className="text-sm text-muted-foreground">Ingestion volume</p><p className="text-3xl font-semibold">18.7M events/day</p></div>
            <div className="rounded-xl border border-border/50 bg-card p-5"><p className="text-sm text-muted-foreground">Edge devices tracked</p><p className="text-3xl font-semibold">41K+</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
              <h4 className="text-xl font-semibold">Screens that should exist</h4>
              <p className="text-muted-foreground">Grid Reliability Command, Municipality Service Heatmap, Meter Fleet Integrity, SME Trust Cohort Monitor, Incident and SLA Ledger.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
              <h4 className="text-xl font-semibold">Pilot scenarios published quarterly</h4>
              <p className="text-muted-foreground">Municipality operations zone, utility feeder corridor, and SME finance portfolio with baseline, intervention, and outcome deltas.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary/30">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Visual System Direction</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Design language for authority, legibility, and operational clarity.</h3>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Typography system</h4>
              <p className="text-muted-foreground">High-contrast sans display, restrained mono for technical artifacts, strict scale with dominant headline hierarchy and compressed body rhythm.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Layout system</h4>
              <p className="text-muted-foreground">12-column desktop grid, 6-column tablet, 4-column mobile; wide section spacing, clear content blocks, deterministic alignment rails.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Motion behavior</h4>
              <p className="text-muted-foreground">Data counters and architecture flows animate; structural headings and key metrics remain static to preserve authority and reduce cognitive noise.</p>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card p-6 space-y-2">
              <h4 className="text-xl font-semibold">Color logic</h4>
              <p className="text-muted-foreground">Color is a signal layer: green for service health, amber for degraded states, red for critical incidents, blue for trusted data availability.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Conversion Paths</p>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Audience-specific acquisition flows with trust checkpoints.</h3>
          </header>
          <div className="grid md:grid-cols-3 gap-6">
            {conversionPaths.map((flow) => (
              <article key={flow.audience} className="rounded-2xl border border-border/50 bg-card p-6 space-y-3">
                <h4 className="text-xl font-semibold">{flow.audience}</h4>
                <p><span className="font-medium">Entry point:</span> <span className="text-muted-foreground">{flow.entry}</span></p>
                <p><span className="font-medium">Trust elements:</span> <span className="text-muted-foreground">{flow.trust.join(" · ")}</span></p>
                <p><span className="font-medium">Action pathway:</span> <span className="text-muted-foreground">{flow.action}</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto max-w-6xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Strategic Positioning Layer</p>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Category: Infrastructure Reliability Operating System for Volatile Economies.</h3>
          <p className="text-muted-foreground leading-relaxed">
            Existing players fail because they assume stable grids, reliable settlement rails, and clean institutional records.
            Their systems degrade under low-observability operations where edge capture, policy enforcement, and auditability must survive partial failure.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Long-horizon direction: establish a continental infrastructure protocol layer where power operations, public services, and financial institutions share verified state in real time,
            allowing capital to move with confidence and services to remain continuous through instability.
          </p>
        </div>
      </section>
    </main>
  );
};
