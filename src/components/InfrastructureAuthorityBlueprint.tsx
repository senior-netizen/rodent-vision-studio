const controlSurfaces = [
  {
    title: "API",
    statement: "Deterministic contracts for distributed operators.",
    visualRows: [
      ["GET /meters", "18ms", "200"],
      ["POST /outages", "42ms", "202"],
      ["GET /scores", "31ms", "200"],
    ],
  },
  {
    title: "MeterFlow",
    statement: "Capture to validation without manual drift.",
    visualRows: [
      ["Capture", "QR-8841", "Signed"],
      ["Read", "14.7kWh", "Verified"],
      ["Sync", "Billing", "Accepted"],
    ],
  },
  {
    title: "VAWT Lab",
    statement: "Hardware telemetry with operational thresholds.",
    visualRows: [
      ["Rotor", "11.8m/s", "Stable"],
      ["Output", "4.3kW", "Nominal"],
      ["Health", "0 faults", "Green"],
    ],
  },
];

const architectureChain = [
  { layer: "Input", detail: "Sensors · APIs · Field forms" },
  { layer: "Normalization", detail: "Timestamp · Signature · Validation" },
  { layer: "Decision", detail: "Rules · Scoring · Alert states" },
  { layer: "Interface", detail: "Dashboards · Dispatch · Mobile" },
];

const proofSignals = [
  ["Events/day", "18.7M"],
  ["Requests/min", "3.2k"],
  ["Uptime target", "99.95%"],
  ["Deployment scope", "Municipal · Grid · SME"],
];

export const InfrastructureAuthorityBlueprint = () => {
  return (
    <main>
      <section id="systems-operation" className="system-section section-reveal">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow text-overline">System visuals</p>
            <h2>Control surfaces.</h2>
            <p className="text-lead">Typography introduces. Interfaces prove.</p>
          </header>

          <div className="systems-grid">
            {controlSurfaces.map((surface) => (
              <article key={surface.title} className="system-card section-reveal">
                <h3>{surface.title}</h3>
                <p>{surface.statement}</p>
                <div className="system-panel">
                  {surface.visualRows.map((row) => (
                    <div key={`${surface.title}-${row[0]}`} className="system-panel__row">
                      <span>{row[0]}</span>
                      <span>{row[1]}</span>
                      <span>{row[2]}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="system-section section-reveal">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow text-overline">Architecture</p>
            <h2>Signal chain.</h2>
            <p className="text-lead">One path from field input to operator action.</p>
          </header>

          <div className="architecture-list">
            {architectureChain.map((stage) => (
              <div key={stage.layer} className="architecture-row">
                <p>{stage.layer}</p>
                <p>{stage.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="system-section section-reveal">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow text-overline">Proof layer</p>
            <h2>Operational signals.</h2>
            <p className="text-lead">Measured capacity for procurement and deployment teams.</p>
          </header>

          <div className="signal-grid">
            {proofSignals.map((signal) => (
              <article key={signal[0]} className="signal-card">
                <p>{signal[0]}</p>
                <p>{signal[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
