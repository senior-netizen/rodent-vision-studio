import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, TerminalSquare, Globe } from "lucide-react";

const tracks = [
  {
    title: "For Developers",
    description:
      "Ship faster with our API suite, CLI, and AI copilots. Designed for bandwidth-aware teams that need reliability and speed.",
    cta: "Explore developer stack",
    href: "/projects",
    icon: TerminalSquare,
    accent: "tech" as const,
    bullets: ["API Studio", "CLI + SDKs", "AI Playbooks"],
  },
  {
    title: "For Partners",
    description:
      "Co-build production pilots in energy, fintech, and infrastructure. We move from concept to deployment with you.",
    cta: "Partner with us",
    href: "/opportunities",
    icon: HeartHandshake,
    accent: "accent" as const,
    bullets: ["Joint ventures", "Pilots & rollouts", "Compliance ready"],
  },
  {
    title: "For Investors",
    description:
      "Back a studio compounding software and hardware advantages across Africa's infrastructure decade.",
    cta: "Investor brief",
    href: "/opportunities#investors",
    icon: Globe,
    accent: "energy" as const,
    bullets: ["Studio portfolio", "Hardware IP", "SADC focus"],
  },
];

const accentColors = {
  tech: "bg-tech/10 border-tech/20 text-tech",
  accent: "bg-accent/10 border-accent/20 text-accent",
  energy: "bg-energy/10 border-energy/20 text-energy",
};

export const EngagementTracks = () => {
  return (
    <section id="engagement" className="section-padding-sm">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 animate-fade-in">
            Choose How You Engage
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Developers, enterprises, and investors plug into Rodent through clear, outcome-driven tracks.
          </p>
        </div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <Link
                key={track.title}
                to={track.href}
                className="group rounded-2xl bg-card border border-border/50 p-8 space-y-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header with icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-11 h-11 rounded-xl border flex items-center justify-center ${accentColors[track.accent]}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-semibold">{track.title}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {track.description}
                </p>

                {/* Bullets */}
                <div className="flex flex-wrap gap-2">
                  {track.bullets.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`inline-flex items-center text-sm font-medium ${track.accent === 'tech' ? 'text-tech' : track.accent === 'energy' ? 'text-energy' : 'text-accent'}`}>
                  {track.cta}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
