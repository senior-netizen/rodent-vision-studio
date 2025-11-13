import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--energy)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent animate-glow" />
              <span className="text-sm font-medium text-muted-foreground">
                Building Africa's Innovation Infrastructure
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Building the{" "}
              <span className="gradient-text">infrastructure</span> for the next
              decade of African innovation
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Rodent Inc. is a deep-tech innovation lab shipping production-grade
              SaaS platforms, developer APIs, and smart infrastructure—from electrons
              to endpoints.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact">Talk to Rodent Inc.</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text-energy">SADC</div>
                <div className="text-sm text-muted-foreground">Region Focus</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">API-First</div>
                <div className="text-sm text-muted-foreground">Everything</div>
              </div>
            </div>
          </div>

          {/* Right Content - Device Mockup */}
          <div className="relative animate-fade-in">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-tech/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 animate-glow" />
              
              {/* Device Frame */}
              <div className="relative glass rounded-2xl p-2 shadow-premium hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
                <img
                  src={heroDashboard}
                  alt="Squirrel API Studio Dashboard"
                  className="rounded-xl w-full h-auto"
                />
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 glass rounded-lg px-4 py-2 shadow-card border border-tech/30">
                  <div className="text-xs font-medium text-tech">API Studio</div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass rounded-lg px-4 py-2 shadow-card border border-energy/30">
                  <div className="text-xs font-medium text-energy">Production Ready</div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-1/4 -right-8 hidden xl:block animate-slide-in-right">
              <div className="glass rounded-lg p-4 shadow-card border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">API Response</div>
                <div className="font-mono text-xs text-tech">200 OK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
