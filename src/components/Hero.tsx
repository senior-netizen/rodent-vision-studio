import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-glow" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left content */}
          <div className="space-y-8 sm:space-y-10 max-w-2xl" aria-label="Rodent value proposition">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/80 border border-border/50 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Built for African operating conditions
              </span>
            </div>

            {/* Headline - Responsive Apple-style */}
            <h1 
              className="font-display text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl font-semibold tracking-[-0.03em] animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Building resilient
              <span className="gradient-text"> infrastructure</span>
              {" "}that stays online
            </h1>

            {/* Description - Optimized for readability */}
            <p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              We build APIs, power visibility tools, and field-ready hardware for teams that run in unstable grid and network conditions.
            </p>

            {/* CTAs - Mobile optimized */}
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

            {/* Stats - Mobile optimized spacing */}
            <div 
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-border/50 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold font-display gradient-text">8+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Products in active build</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold font-display gradient-text-energy">SADC</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Primary operating region</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold font-display gradient-text">Full</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Software + hardware delivery</div>
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
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-accent/10 via-tech/10 to-energy/10 rounded-3xl blur-2xl sm:blur-3xl opacity-60" />

              {/* Main image container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                <img
                  src={heroDashboard}
                  alt="Rodent control plane interface"
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Overlay badges - Hidden on very small screens */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-medium text-accent">API Studio</span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-medium text-energy">Field tested</span>
                </div>
              </div>

              {/* Floating card - Hidden on mobile/tablet */}
              <div className="absolute -bottom-6 -right-6 hidden xl:block">
                <div className="rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
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
