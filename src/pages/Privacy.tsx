import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const dataFlow = [
  {
    step: "Collection",
    detail:
      "Captures meter readings, outage events, telemetry streams, API request metadata, and operator identity records; enforces schema-bound intake contracts.",
  },
  {
    step: "Validation",
    detail:
      "Runs schema checks, range constraints, timestamp verification, and source authentication before records enter persistent stores.",
  },
  {
    step: "Storage",
    detail:
      "Writes validated records to partitioned databases and append-only audit tables; enforces encryption-at-rest and integrity checkpoints.",
  },
  {
    step: "Access",
    detail:
      "Serves data through authenticated APIs and role-scoped dashboards; enforces least-privilege visibility and access logging.",
  },
  {
    step: "Retention",
    detail:
      "Applies lifecycle policies by data class; enforces scheduled archival, deletion execution, and retention audit reports.",
  },
];

const Privacy = () => {
  usePageMetadata(
    "Data Governance Layer",
    "Data control, validation, storage, access, and integrity controls for infrastructure systems."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-8">
          <section className="card-premium space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Data control and integrity across infrastructure systems
            </h1>
            <p className="text-lg text-muted-foreground">
              Defines how data is captured, validated, stored, and accessed.
            </p>
          </section>

          <section className="card-premium space-y-4">
            <h2 className="text-2xl font-semibold">DATA FLOW</h2>
            <div className="space-y-3">
              {dataFlow.map((item) => (
                <div key={item.step} className="rounded-xl border border-border bg-secondary/20 p-4">
                  <p className="font-semibold">{item.step}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-6">
            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">METERFLOW</h2>
              <p className="text-sm text-muted-foreground">
                Captures meter readings, GPS coordinates, and field images for billing and verification pipelines.
              </p>
              <p className="text-sm text-muted-foreground">
                Validation enforces meter identity, geospatial consistency, and image-to-record linkage integrity.
              </p>
              <p className="text-sm text-muted-foreground">
                Storage writes immutable billing events and audit-trace records with operator attribution.
              </p>
            </article>

            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">ENERGY SYSTEMS</h2>
              <p className="text-sm text-muted-foreground">
                Captures outage reports, restoration events, and telemetry streams from grid and edge assets.
              </p>
              <p className="text-sm text-muted-foreground">
                Ingestion pipelines normalize event formats, enforce sequence ordering, and reject malformed signals.
              </p>
              <p className="text-sm text-muted-foreground">
                Processing layers compute service-state metrics and incident timelines for operational control.
              </p>
            </article>

            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">API INFRASTRUCTURE</h2>
              <p className="text-sm text-muted-foreground">
                Captures request logs, response metrics, auth outcomes, and endpoint usage data.
              </p>
              <p className="text-sm text-muted-foreground">
                Access control enforces token verification, role-scoped permissions, and endpoint-specific policy checks.
              </p>
              <p className="text-sm text-muted-foreground">
                Rate limiting enforces throughput ceilings and abuse controls per identity and integration scope.
              </p>
            </article>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">ACCESS CONTROL</h2>
            <p className="text-muted-foreground">
              Authentication enforcement validates identity tokens and signed credentials on every protected request.
            </p>
            <p className="text-muted-foreground">
              Role-based access assigns data visibility by operational responsibility and system boundary.
            </p>
            <p className="text-muted-foreground">
              Restricted visibility masks sensitive fields outside authorized roles and records each access event.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">DATA INTEGRITY</h2>
            <p className="text-muted-foreground">
              Validation rules enforce schema correctness, range limits, chronological ordering, and source authenticity.
            </p>
            <p className="text-muted-foreground">
              Immutable records preserve critical operational events, billing transactions, and governance checkpoints.
            </p>
            <p className="text-muted-foreground">
              Audit traceability links each record mutation to actor identity, timestamp, and system context.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">SYSTEM SECURITY</h2>
            <p className="text-muted-foreground">
              Encryption in transit uses TLS for all API, dashboard, and service-to-service traffic.
            </p>
            <p className="text-muted-foreground">
              Encryption at rest protects relational stores, object storage, and backup snapshots.
            </p>
            <p className="text-muted-foreground">
              API authentication mechanisms enforce signed tokens, secret rotation, and credential revocation workflows.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">DATA RETENTION</h2>
            <p className="text-muted-foreground">
              Storage duration is assigned per class: operational telemetry, billing records, audit logs, and integration logs.
            </p>
            <p className="text-muted-foreground">
              Deletion rules execute scheduled purges for expired records and verify completion through audit checks.
            </p>
            <p className="text-muted-foreground">
              Lifecycle controls run archive, retention, and deletion workflows as monitored system jobs.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
