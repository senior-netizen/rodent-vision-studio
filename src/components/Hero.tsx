import heroNetworkNodes from "@/assets/hero-network-nodes.svg";

export const Hero = () => {
  return (
    <section className="hero-block">
      <div className="hero-block__media" aria-hidden>
        <img src={heroNetworkNodes} alt="" loading="eager" decoding="async" />
      </div>
      <div className="site-shell">
        <div className="hero-block__inner section-reveal">
          <p className="eyebrow">Infrastructure operator</p>
          <h1>API infrastructure for unstable systems.</h1>
          <p className="hero-block__lead">Ingestion, decision, and field workflows for utility, municipal, and financing operations.</p>
          <div className="hero-block__actions">
            <a href="#systems-operation" className="signal-link">
              View live systems
            </a>
            <a href="/contact" className="signal-link signal-link--muted">
              Start deployment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
