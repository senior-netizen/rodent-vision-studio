import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
      {/* Subtle editorial background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32 relative z-10">
        {/* Editorial 2-column grid */}
        <div className="grid lg:grid-cols-8 gap-8 lg:gap-[2vw] items-center">
          {/* Left content — spans 4 cols */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10" aria-label="Rodent value proposition">
            {/* Overline badge */}
            <div
              className="inline-flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs uppercase tracking-[0.08em] font-medium text-muted-foreground">
                Built for African operating conditions
              </span>
            </div>

            {/* Editorial headline */}
            <h1
              className="font-display animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Building resilient
              <span className="gradient-text"> infrastructure</span>
              {" "}that stays online
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              We build APIs, power visibility tools, and field-ready hardware for teams that run in unstable grid and network conditions.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <CTAButton to="/projects" className="w-full sm:w-auto justify-center">
                Explore Projects
                <ArrowRight className="w-4 h-4" aria-hidden />
              </CTAButton>
              <CTAButton to="/contact" variant="secondary" className="w-full sm:w-auto justify-center">
                Contact Team
              </CTAButton>
            </div>

            {/* Stats — editorial row with line dividers */}
            <div
              className="flex gap-8 sm:gap-12 pt-8 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {[
                { value: "8+", label: "Products in active build" },
                { value: "SADC", label: "Primary operating region" },
                { value: "Full", label: "Software + hardware" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1 relative">
                  {i > 0 && (
                    <div className="absolute -left-4 sm:-left-6 top-0 h-full w-px bg-border/40" />
                  )}
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-medium gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual — spans 4 cols */}
          <div
            className="lg:col-span-4 relative animate-fade-in-up lg:animate-slide-in-right"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-accent/5 via-tech/5 to-energy/5 rounded-2xl blur-3xl opacity-60" />

              {/* Main image — editorial rounded */}
              <div className="relative rounded-xl overflow-hidden border border-border/30 shadow-md">
                <img
                  src={heroDashboard}
                  alt="Rodent control plane interface"
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Overlay badges */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 py-1 rounded-full glass-subtle">
                  <span className="text-[10px] sm:text-xs font-medium text-accent">API Studio</span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2.5 py-1 rounded-full glass-subtle">
                  <span className="text-[10px] sm:text-xs font-medium text-energy">Field tested</span>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 hidden xl:block">
                <div className="glass-card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg neumorphic-inset flex items-center justify-center">
                      <span className="text-accent font-mono text-sm font-medium">200</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Uptime monitored</div>
                      <div className="text-xs text-muted-foreground">API response OK</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
