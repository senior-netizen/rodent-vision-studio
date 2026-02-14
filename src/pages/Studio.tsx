import { Link } from "react-router-dom";
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
    "Rodent is an engineering studio building API software, energy operations tools, and hardware for African markets."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <section className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              Rodent Studio
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-balance">
              Building software and hardware
              <span className="block gradient-text">for hard operating environments</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a software and hardware studio building tools for operators, utilities, and engineering teams.
            </p>
          </section>

          {/* Content Grid */}
          <section className="grid lg:grid-cols-2 gap-8">
            {/* How We Work */}
            <div className="card-premium animate-fade-in-up">
              <h2 className="text-2xl font-semibold mb-4">How we deliver</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work in short build cycles with clear delivery goals, measurable reliability targets, and shared ownership from design through deployment.
              </p>
              <div className="space-y-4 mb-6">
                {principles.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                See our projects
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Milestones */}
            <div className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-semibold mb-6">Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-accent/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center w-16 flex-shrink-0">
                      <Calendar className="w-5 h-5 text-accent mb-1" />
                      <span className="text-sm font-semibold">{milestone.year}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
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
