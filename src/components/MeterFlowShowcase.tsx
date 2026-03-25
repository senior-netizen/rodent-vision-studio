import fieldCaptureVisual from "@/assets/meterflow-field-capture.svg";

const enforcementRules = [
  "GPS outside assigned zone → submission rejected",
  "Record hash already exists in cycle → duplicate blocked",
  "Reading delta outside threshold band → anomaly flag raised",
  "Missing reading value, GPS, timestamp, or image hash → submission discarded",
];

const systemFlow = [
  "Mobile Device → API",
  "API → Validation Engine",
  "Validation Engine → Immutable Database",
  "Immutable Database → Billing System",
  "Immutable Database → Audit Logs",
];

const auditLinks = ["agent_id", "timestamp", "gps_coordinates", "image_hash", "submission_id"];

const recordFields = [
  "meter_id",
  "reading_value",
  "timestamp",
  "gps_coordinates",
  "image_hash",
  "agent_id",
  "submission_id",
];

const failureHandling = [
  "No network available → device writes record to encrypted local queue",
  "Sync window restored → queued records replay in original capture order",
  "Submission conflict detected → record held and routed to supervisor review",
  "API timeout or 5xx response → retry policy executes with bounded backoff",
];

const capacityStatements = [
  "Operational capacity: 10,000+ validated readings per day per deployment cluster",
  "Concurrent ingestion: 500+ active field agents submitting in parallel windows",
  "Pipeline latency target: validation decision and persistence in near real time",
];

export const MeterFlowShowcase = () => {
  return (
    <section className="space-y-8 rounded-[2rem] border border-border/60 bg-zinc-950 p-6 text-zinc-100 shadow-premium lg:p-8">
      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Hero</p>
        <h2 className="text-2xl font-semibold lg:text-3xl">Meter data systems with enforced validation and audit traceability</h2>
        <p className="text-sm text-zinc-300">Municipal billing control with field agent constraints, geofenced capture, and revenue leakage containment.</p>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Visual Placement: Field Capture + GPS Overlay + Audit Markers</p>
          <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            <img
              src={fieldCaptureVisual}
              alt="Field capture screen with meter scan and sync controls"
              className="h-[420px] w-full rounded-lg border border-zinc-700 object-cover"
              loading="lazy"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">GPS lock: ward-14 zone, 5m tolerance, pass</div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Audit marker: submission_id MF-2026-03-25-004182</div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Agent control: agent_id AGT-091 tied to device token</div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">Evidence lock: image_hash persisted before billing write</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-red-800/60 bg-red-950/20 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-red-300">System Enforcement</p>
        <div className="grid gap-3 md:grid-cols-2">
          {enforcementRules.map((rule) => (
            <article key={rule} className="rounded-lg border border-red-800/70 bg-zinc-950 p-4 text-sm text-zinc-200">
              {rule}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Reading Record Structure</p>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-2 text-sm text-zinc-300">Record schema (per reading):</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {recordFields.map((field) => (
              <code key={field} className="rounded border border-zinc-700 px-2 py-1 text-xs text-emerald-300">
                {field}
              </code>
            ))}
          </div>
        </div>
        <p className="text-sm text-zinc-200">Constraint: records are immutable after acceptance.</p>
        <p className="text-sm text-zinc-200">Constraint: storage model is append-only across billing cycles.</p>
        <p className="text-sm text-zinc-200">Constraint: overwrite operations are denied at API and storage layers.</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Audit Trail</p>
        <p className="text-sm text-zinc-200">Every accepted reading is stored as an immutable record with cryptographic evidence binding.</p>
        <div className="grid gap-2 md:grid-cols-5">
          {auditLinks.map((field) => (
            <div key={field} className="rounded border border-zinc-700 bg-zinc-950 px-2 py-2 text-center text-xs text-zinc-300">
              {field}
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-200">Trace reconstruction query: meter_id + billing_cycle returns full capture and validation chain.</p>
        <p className="text-sm text-zinc-200">Silent alteration path: none. Mutation attempts generate audit violations.</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Field Failure Handling</p>
        <div className="grid gap-3 md:grid-cols-2">
          {failureHandling.map((item) => (
            <article key={item} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-sm text-zinc-200">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">System Capacity</p>
        <div className="grid gap-3 md:grid-cols-3">
          {capacityStatements.map((item) => (
            <article key={item} className="rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-sm text-zinc-200">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Visual Placement: GPS Map + Dashboard + Pipeline</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-400">GPS Map with plotted readings</p>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 40 }).map((_, idx) => (
                <span key={`gps-point-${idx}`} className="h-2 rounded-full bg-emerald-400/80" />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-400">Dashboard totals and anomalies</p>
            <div className="grid gap-2 text-sm">
              <div className="rounded border border-zinc-700 p-2">Daily validated readings: 4,862</div>
              <div className="rounded border border-zinc-700 p-2">Anomalies requiring supervisor action: 61</div>
              <div className="rounded border border-zinc-700 p-2">Agent metrics: 37 active, 35 route-complete, 2 delayed</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-400">Data pipeline diagram</p>
          <div className="grid gap-2 text-xs font-mono sm:grid-cols-3 lg:grid-cols-5">
            {systemFlow.map((node) => (
              <span key={node} className="rounded border border-zinc-700 p-2 text-center">
                {node}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Financial Impact Controls</p>
        <p className="text-sm text-zinc-200">Validated records post into municipal billing ledgers as billable consumption events.</p>
        <p className="text-sm text-zinc-200">Rejected, discarded, and anomalous submissions never reach bill generation.</p>
        <p className="text-sm text-zinc-200">Audit evidence shortens dispute resolution and protects collectible municipal income.</p>
      </section>
    </section>
  );
};
