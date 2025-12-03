import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Cpu, Wind, Activity, ArrowUpRight } from "lucide-react";

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
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">Rodent Labs</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The experimental arm of Rodent, building hardware and intelligence that turn African constraints into competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => {
              const Icon = experiment.icon;
              return (
                <div
                  key={experiment.title}
                  className="glass rounded-2xl p-7 space-y-4 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-energy/20 to-tech/20 border border-border/60 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-energy" />
                    </div>
                    <h2 className="text-2xl font-semibold">{experiment.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{experiment.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experiment.outcomes.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
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
