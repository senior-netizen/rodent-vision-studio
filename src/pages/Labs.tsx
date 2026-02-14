import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Cpu, Wind, Activity, ArrowUpRight, Beaker } from "lucide-react";

const experiments = [
  {
    title: "VAWT Lab",
    description:
      "Compact, vertical-axis wind hardware with modular blades, sensor-rich drivetrains, and digital twins for predictive maintenance.",
    icon: Wind,
    outcomes: ["Urban microgeneration", "Faster servicing", "Grid-edge analytics"],
  },
  {
    title: "Grid Edge Intelligence",
    description:
      "Low-power edge devices and mesh networking for outage detection, generator telemetry, and renewable orchestration.",
    icon: Activity,
    outcomes: ["Resilient sensing", "Offline-first", "Secure OTA updates"],
  },
  {
    title: "AI for Operations",
    description:
      "Applied AI for incident response, root-cause analysis, and predictive maintenance across fleets of APIs and hardware.",
    icon: Cpu,
    outcomes: ["Incident playbooks", "Anomaly detection", "Human-in-the-loop"],
  },
];

const Labs = () => {
  usePageMetadata(
    "Labs",
    "Explore Rodent Labs: hardware R&D, grid-edge intelligence, and AI for operations built for Africa's infrastructure needs."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground">
              <Beaker className="w-4 h-4 text-energy" />
              Research & Development
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight">
              Rodent Labs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our R&D unit for testing hardware and operational intelligence in real African field conditions.
            </p>
          </div>

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {experiments.map((experiment, index) => {
              const Icon = experiment.icon;
              return (
                <div
                  key={experiment.title}
                  className="card-premium group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-7 h-7 text-energy" />
                    </div>
                    <h2 className="text-2xl font-semibold">{experiment.title}</h2>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {experiment.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {experiment.outcomes.map((item) => (
                      <span
                        key={item}
                        className="badge-premium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    Collaborate with Labs
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Labs;
