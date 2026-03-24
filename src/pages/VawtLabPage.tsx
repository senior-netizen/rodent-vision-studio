import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const systemFlow = [
  { stage: "Wind", line: "Captures rooftop and corridor airflow at 2-12 m/s." },
  { stage: "Turbine", line: "Converts rotational motion into shaft torque." },
  { stage: "Sensors", line: "Measures RPM, vibration, output current, and frame heat." },
  { stage: "Edge Controller", line: "Buffers, validates, and signs telemetry every 5 seconds." },
  { stage: "API", line: "Publishes time-series payloads to infrastructure endpoints." },
  { stage: "Dashboard", line: "Shows RPM, vibration, output curve, and fault state." },
  { stage: "Alerts", line: "Triggers maintenance tasks on threshold or trend breach." },
];

const physicalComponents = [
  {
    name: "Rotor / Blade system",
    does: "Maintains torque generation in multidirectional urban wind.",
    handles: "Handles turbulence and low-start-speed operation.",
  },
  {
    name: "Shaft + bearing system",
    does: "Transfers rotor torque to generator coupling.",
    handles: "Handles cyclic load and alignment drift.",
  },
  {
    name: "Generator coupling",
    does: "Converts shaft rotation into electrical output.",
    handles: "Handles variable RPM without output collapse.",
  },
  {
    name: "Mounting structure",
    does: "Anchors assembly to rooftop or industrial base.",
    handles: "Handles vibration transfer and structural fatigue.",
  },
];

const telemetryLayer = [
  {
    sensor: "RPM sensor",
    measures: "Rotational velocity in revolutions per minute.",
    matters: "Detects stall risk and irregular spin behavior.",
  },
  {
    sensor: "Vibration sensor",
    measures: "Axial and radial vibration signature.",
    matters: "Detects imbalance, bearing wear, and looseness.",
  },
  {
    sensor: "Voltage/current output",
    measures: "Instant electrical output and load response.",
    matters: "Detects conversion loss and coupling faults.",
  },
  {
    sensor: "Temperature sensor",
    measures: "Generator and controller temperature bands.",
    matters: "Detects overheating before shutdown conditions.",
  },
];

const predictiveMaintenance = [
  {
    name: "Vibration anomaly detection",
    signal: "RMS vibration baseline vs rolling 24-hour deviation.",
    trigger: "Create inspection task at +25% sustained deviation.",
  },
  {
    name: "RPM irregularity detection",
    signal: "RPM stability window at fixed wind intervals.",
    trigger: "Raise drivetrain check on repeated RPM dropouts.",
  },
  {
    name: "Output degradation tracking",
    signal: "Power curve slope against wind-speed bins.",
    trigger: "Flag coupling or generator maintenance when slope decays.",
  },
];

const useCases = [
  {
    title: "Rooftop deployment (urban Africa)",
    line: "Input: turbulent low-speed wind → System: VAWT + telemetry loop → Output: monitored supplemental rooftop power.",
  },
  {
    title: "Industrial supplemental power",
    line: "Input: variable plant-edge wind → System: turbine + API + alerts → Output: tracked auxiliary energy for critical loads.",
  },
  {
    title: "Off-grid monitoring systems",
    line: "Input: remote wind + sensor stream → System: edge buffering + cloud sync → Output: uptime and maintenance visibility.",
  },
];

const constraints = [
  "Low wind speed conditions reduce torque windows.",
  "Urban turbulence creates rapid directional shifts.",
  "Blade assemblies accumulate structural fatigue.",
  "Intermittent energy output requires buffering and alerting.",
];

const VawtLabPage = () => {
  usePageMetadata(
    "Rodent Labs VAWT System",
    "Urban wind system with telemetry, API integration, and operational dashboard outputs."
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navigation />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-6 lg:px-8 space-y-6">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em]">Urban wind infrastructure with live telemetry control</h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-4xl">
            Deployment context: rooftops, industrial environments, and unstable grid regions.
            <br />
            Hardware, data, and alerting operate as one monitored system.
          </p>
          <div className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-4">Turbine Render</p>
            <div className="grid md:grid-cols-[240px_1fr] gap-6 items-center">
              <div className="h-64 rounded-lg border border-zinc-700 bg-zinc-950 relative">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-zinc-400" />
                <div className="absolute top-[5.9rem] left-1/2 -translate-x-1/2 w-1 h-24 bg-zinc-400" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-3 rounded bg-zinc-500" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-1 bg-emerald-400 rotate-45" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-1 bg-emerald-400 -rotate-45" />
              </div>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>Mount: rooftop frame / industrial base frame.</p>
                <p>Controller bay: local edge compute and power electronics.</p>
                <p>Telemetry path: sensor bus routed to edge controller.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Wind → Turbine → Sensors → Edge Controller → API → Dashboard → Alerts</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {systemFlow.map((item) => (
              <article key={item.stage} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{item.stage}</p>
                <p className="text-sm text-zinc-200 mt-2">{item.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Physical System</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {physicalComponents.map((component) => (
              <article key={component.name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 space-y-2">
                <h3 className="text-xl font-semibold">{component.name}</h3>
                <p className="text-sm text-zinc-200">Function: {component.does}</p>
                <p className="text-sm text-zinc-300">Constraint: {component.handles}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Sensor + Telemetry Layer</h2>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-4">Sensor Layout Diagram</p>
            <div className="grid md:grid-cols-4 gap-3 mb-6">
              {telemetryLayer.map((item) => (
                <div key={item.sensor} className="rounded-md border border-zinc-700 bg-zinc-950 p-3 text-xs text-zinc-200">
                  {item.sensor}
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {telemetryLayer.map((item) => (
                <article key={`${item.sensor}-details`} className="rounded-md border border-zinc-800 p-4">
                  <p className="font-semibold">{item.sensor}</p>
                  <p className="text-sm text-zinc-200 mt-1">Measures: {item.measures}</p>
                  <p className="text-sm text-zinc-300 mt-1">Why it matters: {item.matters}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Data Pipeline</h2>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 space-y-4">
            <p className="text-sm font-mono text-zinc-200">Sensor → Edge Device → API → Storage → Dashboard → Alert System</p>
            <p className="text-sm text-zinc-300">Ingestion frequency: every 5 seconds per sensor channel.</p>
            <p className="text-sm text-zinc-300">Data type: signed time-series payloads with UTC timestamps.</p>
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Pipeline Diagram</p>
              <div className="grid md:grid-cols-6 gap-2 text-xs font-mono">
                <span className="border border-zinc-700 rounded p-2">Sensor</span>
                <span className="border border-zinc-700 rounded p-2">Edge</span>
                <span className="border border-zinc-700 rounded p-2">API</span>
                <span className="border border-zinc-700 rounded p-2">Storage</span>
                <span className="border border-zinc-700 rounded p-2">Dashboard</span>
                <span className="border border-zinc-700 rounded p-2">Alerts</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Dashboard</h2>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Dashboard UI Mock</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-300">RPM graph over time</p>
                <div className="h-20 mt-3 rounded bg-zinc-900 border border-zinc-800" />
              </div>
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-300">Vibration trend analysis</p>
                <div className="h-20 mt-3 rounded bg-zinc-900 border border-zinc-800" />
              </div>
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-300">Power output curve</p>
                <div className="h-20 mt-3 rounded bg-zinc-900 border border-zinc-800" />
              </div>
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-300">Fault alerts</p>
                <ul className="mt-3 space-y-1 text-xs text-zinc-200 font-mono">
                  <li>ALERT: vibration threshold breached</li>
                  <li>ALERT: RPM instability detected</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Predictive Maintenance</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {predictiveMaintenance.map((rule) => (
              <article key={rule.name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 space-y-2">
                <h3 className="text-lg font-semibold">{rule.name}</h3>
                <p className="text-sm text-zinc-200">Signal: {rule.signal}</p>
                <p className="text-sm text-zinc-300">Trigger: {rule.trigger}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 space-y-2">
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="text-sm text-zinc-300">{useCase.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Engineering Constraints</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {constraints.map((item) => (
              <div key={item} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-16">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 space-y-3">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Integration with Rodent Stack</h2>
            <p className="text-sm text-zinc-200">API layer: telemetry events stream to infrastructure API contracts.</p>
            <p className="text-sm text-zinc-200">ShedSense: turbine output and fault signals feed energy intelligence workflows.</p>
            <p className="text-sm text-zinc-200">Infrastructure dashboards: municipal and utility operators view turbine fleet health with outage context.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VawtLabPage;
