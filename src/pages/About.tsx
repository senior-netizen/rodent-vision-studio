import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Globe } from "lucide-react";
import { initTiltCards } from "@/effects/tiltCards";
import { initParallax } from "@/effects/parallax";

const highlights = [
  {
    title: "Engineering studio",
    description: "Founder-led teams that ship production-grade products with clarity and speed.",
    icon: Sparkles,
  },
  {
    title: "Hardware & software",
    description: "From turbines and IoT to cloud APIs and AI, we build the full stack.",
    icon: Target,
  },
  {
    title: "Africa-first",
    description: "Products designed for the realities of African markets—resilient, secure, and pragmatic.",
    icon: Globe,
  },
];

const About = () => {
  usePageMetadata(
    "About",
    "Learn about Rodent Inc., the deep-tech studio building Africa's innovation infrastructure across software, hardware, and energy.",
  );

  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanupTilt = initTiltCards("#about-highlight [data-tilt-card]", 8);
    const cleanupParallax = initParallax([bannerRef.current], { strength: 10 });
    return () => {
      cleanupTilt();
      cleanupParallax();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding" ref={bannerRef} data-parallax-depth="12">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl" id="about-highlight">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              About Rodent Inc.
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-balance">
              Building Africa's
              <span className="block gradient-text">innovation infrastructure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a founder-led engineering studio building API-first platforms, 
              energy intelligence, and hardware for Africa's builders.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-premium animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-tilt-card
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="default" size="lg" className="rounded-full px-8" asChild>
              <Link to="/studio">
                Explore the Studio
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <Link to="/labs">
                Visit Labs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
