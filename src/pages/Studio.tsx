import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const buildPipeline = [
  "Problem → defines operating constraints, failure states, and performance targets.",
  "System Design → specifies service boundaries, contracts, and control flow.",
  "Data Layer → structures ingestion pipelines for unreliable utility and field inputs.",
  "API Layer → exposes validated infrastructure state through authenticated endpoints.",
  "Interface → provides operator controls for review, dispatch, and intervention.",
  "Deployment → releases versioned systems into municipal and utility environments.",
  "Monitoring → tracks telemetry, alerts, uptime, and incident response actions.",
];

const systemTypes = [
  {
    title: "DATA INGESTION SYSTEMS",
    process: "Processes utility exports, field packets, and meter streams with retry-safe ingestion.",
    usage: "Used in municipal billing records, outage logs, and infrastructure event timelines.",
  },
  {
    title: "VALIDATION SYSTEMS",
    process: "Applies schema, range, and temporal rules to enforce data integrity before persistence.",
    usage: "Used in compliance reporting, reconciliation pipelines, and revenue-grade metering data.",
  },
  {
    title: "API INFRASTRUCTURE",
    process: "Serves validated infrastructure data through versioned endpoints with scoped access controls.",
    usage: "Used by operator dashboards, automation jobs, and system-to-system integrations.",
  },
  {
    title: "HARDWARE-INTEGRATED SYSTEMS",
    process: "Connects sensors, meters, and edge devices into telemetry and command pathways.",
    usage: "Used in distributed energy assets, municipal device fleets, and remote infrastructure control.",
  },
];

const deploymentEnvironments = [
  "Municipal systems → billing execution, field data capture, and auditable records.",
  "Energy utilities → outage tracking, telemetry ingestion, and grid-state visibility.",
  "Infrastructure operators → pipeline monitoring, anomaly response, and reliability management.",
];

const Studio = () => {
  usePageMetadata(
    "Studio Execution Engine",
    "Infrastructure systems built and deployed under real-world constraints through repeatable engineering pipelines."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-8">
          <section className="card-premium space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Infrastructure systems built and deployed under real-world constraints
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              API systems, data pipelines, hardware integrations, municipal and energy infrastructure.
              <br />
              Engineered through repeatable processes and operated in live environments.
            </p>

            <div className="rounded-2xl border border-border bg-secondary/30 p-4" aria-label="System architecture diagram">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
                System Architecture Diagram
              </h2>
              <div className="grid gap-2 text-sm">
                {[
                  "Field Inputs / Sensors / Utility Feeds",
                  "Data Ingestion Layer",
                  "Validation + Rules Engine",
                  "API Service Layer",
                  "Operator Dashboards + Alerts",
                ].map((layer, index) => (
                  <div key={layer} className="flex items-center gap-2">
                    <div className="w-full rounded-lg border border-border bg-background px-3 py-2">{layer}</div>
                    {index < 4 ? <span className="text-accent">↓</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card-premium space-y-4">
            <h2 className="text-2xl font-semibold">SYSTEM BUILD PIPELINE</h2>
            <div className="space-y-2">
              {buildPipeline.map((step) => (
                <p key={step} className="text-muted-foreground">
                  {step}
                </p>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            {systemTypes.map((system) => (
              <article key={system.title} className="card-premium space-y-3">
                <h2 className="text-xl font-semibold">{system.title}</h2>
                <p className="text-muted-foreground">{system.process}</p>
                <p className="text-muted-foreground">{system.usage}</p>
              </article>
            ))}
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">SYSTEMS BUILT HERE</h2>
            <p className="text-muted-foreground">
              MeterFlow → built through validation and ingestion systems for utility-grade meter records.
            </p>
            <p className="text-muted-foreground">
              ShedSense → built through energy data pipelines for outage tracking and infrastructure-state analysis.
            </p>
            <p className="text-muted-foreground">
              VAWT telemetry → built through hardware and API integration for real-time turbine monitoring.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">DEPLOYMENT ENVIRONMENTS</h2>
            {deploymentEnvironments.map((environment) => (
              <p key={environment} className="text-muted-foreground">
                {environment}
              </p>
            ))}
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <article className="card-premium space-y-4">
              <h2 className="text-xl font-semibold">Data Pipeline Diagram</h2>
              <div className="rounded-xl border border-border bg-secondary/20 p-3 text-sm text-muted-foreground">
                Source Streams → Queue → Validation → Time-Series Store → API Cache → Dashboard
              </div>
            </article>

            <article className="card-premium space-y-4">
              <h2 className="text-xl font-semibold">API Interaction</h2>
              <pre className="rounded-xl border border-border bg-secondary/20 p-3 text-xs overflow-x-auto">
{`GET /v1/telemetry?asset=vawt-17
200 OK
{
  "asset": "vawt-17",
  "status": "online",
  "power_kw": 12.4,
  "updated_at": "2026-03-26T09:00:00Z"
}`}
              </pre>
            </article>
          </section>

          <section className="card-premium space-y-4">
            <h2 className="text-2xl font-semibold">SYSTEM OPERATIONS</h2>
            <p className="text-muted-foreground">
              Real-time monitoring tracks ingestion throughput, API latency, and infrastructure event flow.
            </p>
            <p className="text-muted-foreground">
              Anomaly detection routes alerts for out-of-range telemetry and data pipeline failures.
            </p>
            <p className="text-muted-foreground">
              Reliability tracking records uptime, error budgets, and recovery timelines.
            </p>

            <div className="rounded-2xl border border-border bg-secondary/30 p-4" aria-label="Dashboard interface metrics">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
                Dashboard Interface
              </h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-border bg-background p-3">Ingest Rate: 12.3k/min</div>
                <div className="rounded-lg border border-border bg-background p-3">API p95: 143ms</div>
                <div className="rounded-lg border border-border bg-background p-3">Error Rate: 0.12%</div>
                <div className="rounded-lg border border-border bg-background p-3">Active Alerts: 2</div>
                <div className="rounded-lg border border-border bg-background p-3">Escalated: 1</div>
                <div className="rounded-lg border border-border bg-background p-3">Assets Online: 384</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Studio;
