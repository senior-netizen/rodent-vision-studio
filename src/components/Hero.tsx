import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-glow" />

      <div className="container mx-auto px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-10 max-w-2xl" aria-label="Rodent value proposition">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Africa-first infrastructure studio
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-balance animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Building resilient
              <span className="gradient-text"> infrastructure</span>
              {" "}for Africa
            </h1>

            {/* Description */}
            <p 
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              Production-grade APIs, energy intelligence, and hardware systems engineered for operators who need uptime—even when the grid doesn't.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-wrap gap-4 pt-2 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <CTAButton to="/projects">
                Explore Projects
                <ArrowRight className="w-4 h-4" aria-hidden />
              </CTAButton>
              <CTAButton to="/contact" variant="secondary">
                Contact Team
              </CTAButton>
            </div>

            {/* Stats */}
            <div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-semibold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Products shipped</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-semibold gradient-text-energy">SADC</div>
                <div className="text-sm text-muted-foreground">Regional focus</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-semibold gradient-text">Full</div>
                <div className="text-sm text-muted-foreground">Stack delivery</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div 
            className="relative animate-fade-in-up lg:animate-slide-in-right"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-accent/10 via-tech/10 to-energy/10 rounded-3xl blur-3xl opacity-60" />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                <img
                  src={heroDashboard}
                  alt="Rodent control plane interface"
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Overlay badges */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg">
                  <span className="text-xs font-medium text-accent">API Studio</span>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg">
                  <span className="text-xs font-medium text-energy">Production ready</span>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 hidden lg:block">
                <div className="rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-mono text-sm font-medium">200</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Zero-downtime</div>
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
