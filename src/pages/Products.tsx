import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type SystemCard = {
  name: string;
  assertion: string;
  category: "API Infrastructure" | "Energy Systems" | "Financial Systems" | "Hardware Systems";
  runsIn: string;
  interfaceProof: string[];
  input: string[];
  processing: string[];
  output: string[];
};

const systems: SystemCard[] = [
  {
    name: "Squirrel API Studio",
    assertion: "Controls critical infrastructure data exchange.",
    category: "API Infrastructure",
    runsIn: "Runs in: Municipality, Utility, Infrastructure Operator",
    interfaceProof: ["GET /v1/assets 200", "POST /v1/outages 202", "Latency p95 42ms"],
    input: ["Partner APIs", "Operator actions", "Utility events", "Manual entry"],
    processing: ["Ingestion queue", "Schema validation", "Policy checks", "Rate controls"],
    output: ["Versioned APIs", "Audit logs", "Webhook events", "Ops dashboard"],
  },
  {
    name: "ShedSense",
    assertion: "Tracks outages and dispatch state live.",
    category: "Energy Systems",
    runsIn: "Runs in: Utility, Municipality",
    interfaceProof: ["Feeder-11 outage", "Dispatch team B", "Restoration ETA 32m"],
    input: ["Utility telemetry", "Sensor streams", "Field reports", "Manual entry"],
    processing: ["Signal ingestion", "Incident validation", "Rules engine", "Priority scoring"],
    output: ["Dispatch board", "Outage alerts", "Recovery status", "Operator timeline"],
  },
  {
    name: "Smart Metering System",
    assertion: "Captures meter state at the edge.",
    category: "Hardware Systems",
    runsIn: "Runs in: Utility, Infrastructure Operator",
    interfaceProof: ["QR scan verified", "Read 14.7 kWh", "Sync accepted"],
    input: ["Meter devices", "QR scans", "Technician input", "Sensor packets"],
    processing: ["Device auth", "Read validation", "Tamper checks", "Batch sync"],
    output: ["Billing events", "Device ledger", "Exception alerts", "Field console"],
  },
  {
    name: "SME Financial Trust Engine",
    assertion: "Computes risk from operational behavior.",
    category: "Financial Systems",
    runsIn: "Runs in: SME, Infrastructure Operator",
    interfaceProof: ["Trust score 72/100", "Watchlist 31", "Recalc interval 1h"],
    input: ["Transaction APIs", "User actions", "Service uptime", "Manual review"],
    processing: ["Data ingestion", "Identity validation", "Scoring rules", "Trend analytics"],
    output: ["Risk decisions", "Portfolio dashboard", "Intervention alerts", "Scoring API"],
  },
];

const SystemsOperationPage = () => {
  usePageMetadata(
    "Systems in Operation",
    "Systems designed for unstable environments. Built for deployment, not demonstration."
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navigation />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-6 lg:px-8 space-y-5">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em]">SYSTEMS IN OPERATION</h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-3xl">
            Systems designed for unstable environments. Built for deployment, not demonstration.
          </p>
        </section>

        <section className="container mx-auto px-6 lg:px-8 mt-14 grid grid-cols-1 xl:grid-cols-2 gap-12">
          {systems.map((system) => (
            <article key={system.name} className="space-y-6 border border-zinc-800 bg-zinc-900 p-6 md:p-8 rounded-xl">
              <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-6 min-h-52 flex flex-col justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Interface Proof</p>
                <div className="space-y-2">
                  {system.interfaceProof.map((line) => (
                    <div key={`${system.name}-${line}`} className="font-mono text-sm text-zinc-200 border border-zinc-800 rounded px-3 py-2">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <header className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em]">{system.name}</h2>
                <p className="text-zinc-300">{system.assertion}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{system.category}</p>
              </header>

              <details className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                <summary className="cursor-pointer text-sm uppercase tracking-[0.18em] text-zinc-300">System structure</summary>
                <div className="mt-5 space-y-5">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Input</p>
                      <ul className="space-y-1 text-sm text-zinc-200">
                        {system.input.map((item) => (
                          <li key={`${system.name}-input-${item}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Processing</p>
                      <ul className="space-y-1 text-sm text-zinc-200">
                        {system.processing.map((item) => (
                          <li key={`${system.name}-processing-${item}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Output</p>
                      <ul className="space-y-1 text-sm text-zinc-200">
                        {system.output.map((item) => (
                          <li key={`${system.name}-output-${item}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-md border border-zinc-800 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Architecture Snapshot</p>
                    <p className="text-sm font-mono text-zinc-200">Input → Processing → API → Interface → Output</p>
                  </div>

                  <p className="text-sm text-zinc-300">{system.runsIn}</p>
                </div>
              </details>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SystemsOperationPage;
