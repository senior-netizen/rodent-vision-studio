export function ContactSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="system-grid border border-secondary/20 px-8 py-16">
          <h2 className="col-span-12 text-[clamp(2rem,3.5vw,3.5rem)] uppercase lg:col-span-6">Build the next operational layer.</h2>
          <div className="col-span-12 flex flex-col justify-between text-secondary lg:col-span-6">
            <p>Structured for infrastructure-grade delivery: telemetry, controls, payments, and command surfaces.</p>
            <p className="mt-8 font-mono text-sm uppercase text-accent">contact@rodent.systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}
