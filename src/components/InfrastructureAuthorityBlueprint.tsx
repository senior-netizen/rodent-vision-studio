const systemsInOperation = [
  {
    name: "API Dashboard",
    proof: "Gateway requests, endpoint latency, and audit logs.",
    visualTitle: "Request stream",
    rows: [
      ["GET /v1/meters", "18 ms", "200"],
      ["POST /v1/outages", "42 ms", "202"],
      ["GET /v1/score/sme", "33 ms", "200"],
    ],
  },
  {
    name: "Energy Dashboard",
    proof: "Outage ingestion, feeder alerts, and restoration tracking.",
    visualTitle: "Outage queue",
    rows: [
      ["Feeder-11", "Outage detected", "Dispatch"],
      ["Feeder-09", "Voltage unstable", "Watch"],
      ["Feeder-04", "Restored", "Closed"],
    ],
  },
  {
    name: "Metering Interface",
    proof: "QR scan to meter read sync into billing backend.",
    visualTitle: "Scan to sync",
    rows: [
      ["Scan", "QR-8841", "Verified"],
      ["Read", "14.7 kWh", "Signed"],
      ["Sync", "Billing event", "Accepted"],
    ],
  },
  {
    name: "Financial Scoring Interface",
    proof: "Operational behavior scoring for SME credit workflows.",
    visualTitle: "Scoring pipeline",
    rows: [
      ["Repayment cadence", "Stable", "+18"],
      ["Energy continuity", "Intermittent", "-6"],
      ["Final trust score", "72/100", "Eligible"],
    ],
  },
];

const architectureLayers = [
  {
    name: "Data Ingestion Layer",
    sources: "Telcos · Utilities · Manual entry · Sensors",
    action: "Normalize, timestamp, sign every event.",
  },
  {
    name: "Processing Layer",
    sources: "Rules engine · Scoring · Analytics",
    action: "Generate decisions, alerts, and risk states.",
  },
  {
    name: "API Layer",
    sources: "Public endpoints · Internal endpoints",
    action: "Expose deterministic contracts and access policy.",
  },
  {
    name: "Interface Layer",
    sources: "Dashboards · Mobile apps",
    action: "Run operators, dispatchers, and administrators.",
  },
  {
    name: "Edge Layer",
    sources: "QR devices · Meters · Field hardware",
    action: "Capture field state and execute local workflows.",
  },
];

const productStack = [
  {
    name: "Squirrel API Studio",
    definition: "Infrastructure API control plane.",
    data: "Endpoint traffic, auth tokens, schema versions, webhook delivery.",
    powers: "Cross-system integration for municipal and utility operations.",
    preview: ["3.2k req/min", "98 endpoints", "0 auth drift"],
  },
  {
    name: "ShedSense",
    definition: "Grid outage and load command desk.",
    data: "Feeder telemetry, outage reports, transformer health, restoration updates.",
    powers: "Utility dispatch and municipal service continuity monitoring.",
    preview: ["17 active outages", "42 alerts/hr", "4 dispatch teams"],
  },
  {
    name: "Smart Metering System",
    definition: "Field meter capture and sync network.",
    data: "Meter reads, device identity, QR scans, tamper events.",
    powers: "Billing integrity and field verification workflows.",
    preview: ["1,244 scans/day", "99.4% sync", "12 tamper flags"],
  },
  {
    name: "SME Financial Trust Engine",
    definition: "Operational risk scoring engine.",
    data: "Payment events, uptime behavior, cashflow rhythm, intervention history.",
    powers: "Lender underwriting and repayment monitoring.",
    preview: ["620 portfolios", "14 score recalcs/hr", "31 watchlist accounts"],
  },
];

const proofLayer = [
  { label: "API requests processed", value: "2.4M/day", note: "Rolling operational estimate" },
  { label: "Data ingestion volume", value: "18.7M events/day", note: "Across utility, meter, and finance feeds" },
  { label: "System uptime target", value: "99.95%", note: "Platform SLO for critical paths" },
  { label: "Deployment contexts", value: "Municipal · Energy · SME", note: "Production architecture already mapped" },
];

const useCases = [
  {
    name: "Municipal Systems",
    input: "Outage calls, asset IDs, contractor updates",
    system: "ShedSense + API Studio route and verify every action",
    output: "Prioritized dispatch queue and auditable closure records",
  },
  {
    name: "Energy Utilities",
    input: "Feeder telemetry, voltage anomalies, meter health",
    system: "Rules engine classifies incidents and triggers response",
    output: "Restoration order with operator alerts and SLA timestamps",
  },
  {
    name: "Financial Systems",
    input: "Repayment behavior, service uptime, transaction continuity",
    system: "Trust Engine computes risk from operational evidence",
    output: "Scored portfolios for lending, pricing, and intervention",
  },
  {
    name: "Infrastructure Operators",
    input: "Field scans, manual forms, API events",
    system: "Ingestion and workflow controls maintain system state",
    output: "Single operations ledger for teams across regions",
  },
];

export const InfrastructureAuthorityBlueprint = () => {
  return (
    <main className="bg-background text-foreground">
      <section id="systems-operation" className="py-20 md:py-28 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          <header className="space-y-3 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Systems in Operation</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em]">Operational Interfaces, Not Concept Slides</h2>
          </header>
          <div className="grid lg:grid-cols-2 gap-6">
            {systemsInOperation.map((system) => (
              <article key={system.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-50">{system.name}</h3>
                  <p className="text-sm text-zinc-300">{system.proof}</p>
                </div>
                <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-3">{system.visualTitle}</p>
                  <div className="space-y-2">
                    {system.rows.map((row) => (
                      <div key={`${system.name}-${row[0]}`} className="grid grid-cols-3 gap-2 text-xs md:text-sm font-mono">
                        <span className="text-zinc-200">{row[0]}</span>
                        <span className="text-zinc-400">{row[1]}</span>
                        <span className="text-emerald-400">{row[2]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-border/70">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          <header className="space-y-3 max-w-5xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Architecture</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em]">Infrastructure Flow From Field Input to Operator Control</h2>
          </header>
          <div className="rounded-2xl border border-border/70 p-6 md:p-10 bg-card">
            <div className="grid gap-3">
              {architectureLayers.map((layer, index) => (
                <div key={layer.name} className="space-y-3">
                  <div className="grid md:grid-cols-[1.1fr_1fr_1fr] gap-3 items-center rounded-lg border border-border/60 p-4">
                    <p className="font-semibold text-lg">{layer.name}</p>
                    <p className="text-sm text-muted-foreground">{layer.sources}</p>
                    <p className="text-sm">{layer.action}</p>
                  </div>
                  {index < architectureLayers.length - 1 && <div className="h-5 w-px bg-border mx-auto" aria-hidden />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          <header className="space-y-3 max-w-5xl">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Product Stack</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em]">Real Systems Running One Shared Infrastructure Backbone</h2>
          </header>
          <div className="grid lg:grid-cols-2 gap-6">
            {productStack.map((product) => (
              <article key={product.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-zinc-50">{product.name}</h3>
                <p className="text-zinc-200">{product.definition}</p>
                <p className="text-sm text-zinc-300"><span className="text-zinc-100 font-medium">Data:</span> {product.data}</p>
                <p className="text-sm text-zinc-300"><span className="text-zinc-100 font-medium">Powers:</span> {product.powers}</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.preview.map((metric) => (
                    <div key={`${product.name}-${metric}`} className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-200 text-center">
                      {metric}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-border/70">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          <header className="space-y-3 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Proof Layer</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em]">Capability Signals for Procurement and Integration Teams</h2>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proofLayer.map((item) => (
              <article key={item.label} className="rounded-lg border border-border/70 bg-card p-5 space-y-2">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
          <header className="space-y-3 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Use Cases</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em]">Input to System to Output in Live Operating Environments</h2>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((item) => (
              <article key={item.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-3">
                <h3 className="text-2xl font-semibold text-zinc-50">{item.name}</h3>
                <p className="text-sm text-zinc-300"><span className="font-medium text-zinc-100">Input:</span> {item.input}</p>
                <p className="text-sm text-zinc-300"><span className="font-medium text-zinc-100">System:</span> {item.system}</p>
                <p className="text-sm text-zinc-300"><span className="font-medium text-zinc-100">Output:</span> {item.output}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
