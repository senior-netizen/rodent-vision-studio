import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--energy)/0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-8"
            aria-label="Rodent value proposition"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20" role="note">
              <Sparkles className="w-4 h-4 text-accent" aria-hidden />
              <span className="text-sm font-medium text-muted-foreground">
                Africa-first infrastructure studio built for unstable grids
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Rodent builds resilient
              <span className="gradient-text"> energy, API, and hardware stacks</span>
               for Africa's operators
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              We ship production control planes, fintech rails, and rugged IoT for governments, utilities, and venture-backed
              teams—engineered on the ground so services stay online even when the grid does not.
            </p>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Trusted by ministries, utilities, and climate hardware builders who need uptime-first systems, integrated firmware
              to cloud observability, and a partner that executes across frontier environments.
            </p>

            <div className="flex flex-wrap gap-4" role="group" aria-label="Primary actions">
              <CTAButton to="/projects" className="shadow-glow">
                Explore Projects
                <ArrowRight className="w-5 h-5" aria-hidden />
              </CTAButton>
              <CTAButton to="/contact" variant="secondary" className="backdrop-blur-lg">
                Contact Team
              </CTAButton>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4" aria-label="Proof points">
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Products engineered and shipped</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text-energy">SADC</div>
                <div className="text-sm text-muted-foreground">Built for power-unstable regions</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">API + Hardware</div>
                <div className="text-sm text-muted-foreground">Verticalized delivery from sensor to cloud</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative group aurora-border">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-tech/20 rounded-3xl blur-3xl transition-all duration-500" />

              <div className="relative glass rounded-2xl p-2 shadow-premium transition-all duration-500">
                <img
                  src={heroDashboard}
                  alt="Rodent control plane interface"
                  className="rounded-xl w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 540px, 90vw"
                />

                <div className="absolute -top-4 -right-4 glass rounded-lg px-4 py-2 shadow-card border border-tech/30">
                  <div className="text-xs font-medium text-tech">API Studio</div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass rounded-lg px-4 py-2 shadow-card border border-energy/30">
                  <div className="text-xs font-medium text-energy">Production ready</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -right-8 hidden xl:block">
              <div className="glass rounded-lg p-4 shadow-card border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-tech" aria-hidden />
                  <div className="text-xs text-muted-foreground">Zero-downtime delivery</div>
                </div>
                <div className="font-mono text-xs text-tech" aria-label="API response success">
                  200 OK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
