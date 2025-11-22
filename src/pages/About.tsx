import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  usePageMetadata(
    "About",
    "Learn about Rodent Inc., the deep-tech studio building Africa's innovation infrastructure across software, hardware, and energy."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">About Rodent Inc.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a founder-led engineering studio building API-first platforms, energy intelligence, and hardware for Africa's builders.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {["Engineering studio", "Hardware & software", "Africa-first"].map((item) => (
              <div key={item} className="glass rounded-2xl p-6 border border-border/60 text-center space-y-2">
                <p className="text-sm font-semibold text-accent uppercase tracking-[0.08em]">{item}</p>
                <p className="text-muted-foreground">
                  {item === "Engineering studio"
                    ? "Founder-led teams that ship production-grade products with clarity and speed."
                    : item === "Hardware & software"
                      ? "From turbines and IoT to cloud APIs and AI, we build the full stack."
                      : "Products designed for the realities of African markets—resilient, secure, and pragmatic."}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/studio">
                Explore the Studio
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button variant="premium" size="lg" asChild>
              <a href="/labs">
                Visit Labs
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
