import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { CheckCircle2, Sparkles, Calendar, ArrowUpRight } from "lucide-react";

const milestones = [
  { year: "2022", title: "Studio founded", description: "Built the first Rodent prototypes for energy monitoring and developer tooling." },
  { year: "2023", title: "ShedSense pilots", description: "Launched outage intelligence pilots across Bulawayo and the wider SADC region." },
  { year: "2024", title: "DevTools expansion", description: "Rolled out Squirrel API Studio private beta and extended the CLI across projects." },
  { year: "2025", title: "Hardware acceleration", description: "VAWT Lab prototypes and TrustChain fintech infrastructure move into design partner programs." },
];

const principles = [
  "Founder-led engineering with obsessive craft",
  "Rapid prototyping with governance and safety",
  "Africa-first constraints drive product decisions",
  "Transparent collaboration with partners and investors",
];

const Studio = () => {
  usePageMetadata(
    "Studio",
    "Rodent is a deep-tech studio building API-first software, energy intelligence, and hardware for Africa's innovation era."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-16">
          <section className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Rodent Studio</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold">
              Engineering the backbone of African innovation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a hybrid software-hardware studio building resilient infrastructure for builders across the continent—from developer APIs to turbines.
            </p>
          </section>

          <section className="grid lg:grid-cols-2 gap-10">
            <div className="glass rounded-3xl p-8 space-y-5 shadow-premium">
              <h2 className="text-2xl font-semibold">How we work</h2>
              <p className="text-muted-foreground leading-relaxed">
                Rodent operates like a product company and a lab. We run sprints with measurable outcomes, maintain production-grade pipelines, and pair design with engineering from day one.
              </p>
              <div className="space-y-3">
                {principles.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-accent font-semibold">
                See our projects
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="glass rounded-3xl p-8 space-y-6 border border-border/60">
              <h3 className="text-xl font-semibold">Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.year}
                    className="flex gap-4 p-4 rounded-2xl bg-card border border-border/60 hover:border-accent/50 transition"
                  >
                    <div className="flex flex-col items-center w-16">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold">{milestone.year}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
