export default function StudioExecutionEnginePage() {
  const pipelineSteps = [
    'Problem → defines hard constraints, failure modes, and operating conditions.',
    'System Design → defines components, interfaces, and reliability boundaries.',
    'Data Layer → structures ingestion pipelines for unreliable utility and field inputs.',
    'API Layer → exposes validated system state through authenticated endpoints.',
    'Interface → renders operator workflows for control, review, and intervention.',
    'Deployment → releases versioned services into municipal and utility environments.',
    'Monitoring → tracks telemetry, alerts, uptime, and incident response actions.'
  ];

  return (
    <main>
      <section className="card" style={{ marginBottom: '1rem' }}>
        <h1 className="display-hero">Infrastructure systems built under real-world constraints</h1>
        <p>
          API systems, data pipelines, hardware integrations, municipal and energy infrastructure.
          <br />
          Engineered through repeatable build pipelines and operated in live environments.
        </p>

        <h2 style={{ marginTop: '1rem' }}>System Architecture Diagram</h2>
        <pre style={{ overflowX: 'auto' }}>
{`Field Inputs / Sensors / Utility Feeds
                │
                ▼
        [ Data Ingestion Layer ]
                │
                ▼
       [ Validation + Rule Engine ]
                │
                ▼
           [ API Service Layer ]
                │
                ▼
     [ Operator Dashboards + Alerts ]`}
        </pre>
      </section>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <h2>SYSTEM BUILD PIPELINE</h2>
        <ul>
          {pipelineSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="grid cols-2" style={{ marginBottom: '1rem' }}>
        <article className="card">
          <h2>DATA INGESTION SYSTEMS</h2>
          <p>Processes utility exports, meter streams, and field-submitted records with retry-safe ingestion workflows.</p>
          <p>Used in municipal billing pipelines, outage event capture, and infrastructure performance archives.</p>
        </article>

        <article className="card">
          <h2>VALIDATION SYSTEMS</h2>
          <p>Enforces schema, range, and temporal integrity rules before records move into operational stores.</p>
          <p>Used in revenue-grade metering, compliance reporting, and incident-traceable operational datasets.</p>
        </article>

        <article className="card">
          <h2>API INFRASTRUCTURE</h2>
          <p>Serves validated infrastructure data through versioned endpoints with auth, rate limits, and access scopes.</p>
          <p>Used by operator consoles, reporting services, and machine-to-machine integrations.</p>
        </article>

        <article className="card">
          <h2>HARDWARE-INTEGRATED SYSTEMS</h2>
          <p>Connects sensors, meters, and edge devices into telemetry pipelines with command and control pathways.</p>
          <p>Used in distributed energy assets, municipal device fleets, and infrastructure reliability programs.</p>
        </article>
      </section>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <h2>SYSTEMS BUILT HERE</h2>
        <ul>
          <li>MeterFlow → built through ingestion and validation systems for utility-grade meter records.</li>
          <li>ShedSense → built through energy data pipelines for outage tracking and operational load analysis.</li>
          <li>VAWT telemetry → built through hardware integration and API infrastructure for live turbine monitoring.</li>
        </ul>
      </section>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <h2>DEPLOYMENT ENVIRONMENTS</h2>
        <ul>
          <li>Municipal systems → billing workflows, field data capture, and record traceability operations.</li>
          <li>Energy utilities → outage tracking, telemetry ingestion, and infrastructure-state visibility.</li>
          <li>Infrastructure operators → data pipeline execution, system health monitoring, and incident management.</li>
        </ul>
      </section>

      <section className="grid cols-2" style={{ marginBottom: '1rem' }}>
        <article className="card">
          <h2>Data Pipeline Diagram</h2>
          <pre style={{ overflowX: 'auto' }}>
{`Source Streams -> Queue -> Validation -> Time-Series Store -> API Cache -> Dashboard`}
          </pre>
        </article>

        <article className="card">
          <h2>API Interaction</h2>
          <pre style={{ overflowX: 'auto' }}>
{`GET /v1/telemetry?asset=vawt-17
200 OK
{
  "asset": "vawt-17",
  "status": "online",
  "power_kw": 12.4,
  "updated_at": "2026-03-25T12:00:00Z"
}`}
          </pre>
        </article>
      </section>

      <section className="card">
        <h2>SYSTEM OPERATIONS</h2>
        <ul>
          <li>Monitors real-time service throughput, ingest latency, and infrastructure event flow.</li>
          <li>Runs anomaly detection with alert routing for out-of-range telemetry and pipeline faults.</li>
          <li>Tracks uptime, error budgets, and recovery timelines for operational reliability.</li>
        </ul>

        <h3 style={{ marginTop: '1rem' }}>Dashboard Interface</h3>
        <pre style={{ overflowX: 'auto' }}>
{`[ Metrics ] Ingest Rate: 12.3k/min | API p95: 143ms | Error Rate: 0.12%
[ Alerts ] 2 active | 1 acknowledged | 1 escalated
[ Assets ] 384 online | 7 degraded | 3 offline`}
        </pre>
      </section>
    </main>
  );
}
