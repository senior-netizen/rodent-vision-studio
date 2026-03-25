const systemFlow = [
  {
    step: "Field Agent",
    line: "Authenticated agent opens assigned meter route for the day.",
  },
  {
    step: "Meter Capture",
    line: "Agent records numeric meter value at each service point.",
  },
  {
    step: "GPS + Image",
    line: "Device binds latitude, longitude, timestamp, and photo evidence.",
  },
  {
    step: "API",
    line: "Submission posts one signed reading record per meter event.",
  },
  {
    step: "Billing System",
    line: "Validated readings update billable consumption for each account.",
  },
  {
    step: "Audit Trail",
    line: "Immutable record keeps full trace for dispute and compliance review.",
  },
];

const fieldOps = [
  {
    title: "Agent authentication",
    line: "Role-bound credentials tie each capture to a named officer and shift.",
  },
  {
    title: "Assigned routes and locations",
    line: "Daily route lists lock expected meter IDs and service locations.",
  },
  {
    title: "Offline capture capability",
    line: "Readings queue on device when signal drops and sync on reconnect.",
  },
  {
    title: "Submission workflow",
    line: "Agent reviews entry, confirms evidence, then submits one meter record.",
  },
];

const captureLayer = [
  {
    field: "Meter reading value",
    why: "Creates the billable consumption input.",
    prevents: "Prevents manual transcription drift and value tampering.",
  },
  {
    field: "GPS coordinates",
    why: "Proves reading origin against assigned service location.",
    prevents: "Prevents remote or fabricated route submissions.",
  },
  {
    field: "Timestamp",
    why: "Pins capture to billing cycle and collection window.",
    prevents: "Prevents backdated or duplicate-cycle posting.",
  },
  {
    field: "Photo evidence",
    why: "Documents dial state and meter condition at capture time.",
    prevents: "Prevents disputes on unreadable or contested readings.",
  },
];

const integrityRules = [
  {
    rule: "GPS verification",
    line: "Rule: reject or flag records outside route geofence tolerance.",
  },
  {
    rule: "Image verification",
    line: "Rule: require visible meter face before record status becomes billable.",
  },
  {
    rule: "Duplicate detection",
    line: "Rule: block repeated submissions for same meter and cycle window.",
  },
  {
    rule: "Anomaly detection",
    line: "Rule: flag spikes against historical consumption baseline bands.",
  },
];

const useCases = [
  {
    title: "Urban municipality (high-density billing)",
    line: "Input: high route volume → System: verified capture and API validation → Outcome: faster billing closure with fewer disputes.",
  },
  {
    title: "Rural and low-connectivity regions",
    line: "Input: intermittent network → System: offline queue with delayed sync validation → Outcome: complete cycle coverage without data loss.",
  },
  {
    title: "Utility audit operations",
    line: "Input: contested account reading → System: immutable log with image and GPS trace → Outcome: rapid dispute resolution and protected revenue.",
  },
];

export const MeterFlowShowcase = () => {
  return (
    <section className="space-y-8 rounded-[2rem] border border-border/60 bg-zinc-950 p-6 text-zinc-100 shadow-premium lg:p-8">
      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">1. Hero (Revenue Control)</p>
        <h2 className="text-2xl font-semibold lg:text-3xl">Verifiable meter capture protecting municipal billing revenue</h2>
        <p className="text-sm text-zinc-300">Municipal water operations run through field agents, constrained routes, and evidence-backed billing records.</p>
        <p className="text-sm text-zinc-300">The system closes leakage from unverified reads, delayed uploads, and unresolved disputes.</p>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Visual: Field Capture</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Field agent: Officer ID MF-204 active</div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Meter: Account 447021 • Reading 38291</div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">GPS: -20.07, 30.82 • Accuracy 4m</div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">2. System Overview</p>
        <p className="text-sm text-zinc-300">Field Agent → Meter Capture → GPS + Image → API → Billing System → Audit Trail</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {systemFlow.map((item) => (
            <article key={item.step} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{item.step}</p>
              <p className="mt-2 text-sm text-zinc-200">{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">3. Field Operation Layer</p>
        <div className="grid gap-3 md:grid-cols-2">
          {fieldOps.map((item) => (
            <article key={item.title} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-zinc-300">{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">4. Data Capture Layer</p>
        <div className="grid gap-3 md:grid-cols-2">
          {captureLayer.map((item) => (
            <article key={item.field} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4 space-y-2">
              <p className="font-semibold">{item.field}</p>
              <p className="text-sm text-zinc-200">Why: {item.why}</p>
              <p className="text-sm text-zinc-300">Prevents: {item.prevents}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">5. Validation + Integrity Layer</p>
        <div className="grid gap-3 md:grid-cols-2">
          {integrityRules.map((item) => (
            <article key={item.rule} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p className="font-semibold">{item.rule}</p>
              <p className="mt-2 text-sm text-zinc-300">{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">6. Data Pipeline</p>
        <p className="text-sm text-zinc-300">Mobile Device → API → Validation Engine → Database → Billing System → Audit Logs</p>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Visual: Data Pipeline Diagram</p>
          <div className="grid gap-2 text-xs font-mono sm:grid-cols-3 lg:grid-cols-6">
            {['Mobile Device','API','Validation Engine','Database','Billing System','Audit Logs'].map((node) => (
              <span key={node} className="rounded border border-zinc-700 p-2 text-center">{node}</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-zinc-200">Submission frequency: one submission per captured meter reading.</p>
        <p className="text-sm text-zinc-200">Data structure: one record per meter per capture event with evidence fields.</p>
        <p className="text-sm text-zinc-200">Persistence model: immutable append-only audit log with revision trace.</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">7. Dashboard</p>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Visual: Dashboard UI Mock</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Daily readings collected: 2,418</div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Flagged anomalies: 34 records</div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Agent performance: 11 routes closed, 2 pending</div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Map view: 2,418 GPS capture points across wards</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Visual: Captured Location Map</p>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }).map((_, idx) => (
              <span key={`map-point-${idx}`} className="h-2 rounded-full bg-emerald-400/80" />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">8. Billing Impact</p>
        <p className="text-sm text-zinc-200">Validated readings convert directly into billable consumption entries per municipal account.</p>
        <p className="text-sm text-zinc-200">Integrity checks reduce correction cycles, reversals, and manual rebilling overhead.</p>
        <p className="text-sm text-zinc-200">Evidence-backed records block leakage from unverifiable submissions and disputed bills.</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">9. Use Cases</p>
        <div className="grid gap-3 md:grid-cols-3">
          {useCases.map((item) => (
            <article key={item.title} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-zinc-300">{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">10. Audit + Compliance Layer</p>
        <p className="text-sm text-zinc-200">Immutable reading logs keep original value, evidence hash, and submission identity.</p>
        <p className="text-sm text-zinc-200">Per-meter traceability links route assignment, capture event, validation status, and billing post.</p>
        <p className="text-sm text-zinc-200">Dispute handling replays full record history for financial and regulatory review.</p>
      </section>

      <section className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">11. Integration with Rodent Stack</p>
        <p className="text-sm text-zinc-200">MeterFlow sends verified records to Rodent API infrastructure for controlled downstream delivery.</p>
        <p className="text-sm text-zinc-200">Analytics systems consume route and anomaly streams for operational and revenue reporting.</p>
        <p className="text-sm text-zinc-200">Financial trust systems receive audit-grade billing events for reconciliation and controls.</p>
      </section>
    </section>
  );
};
