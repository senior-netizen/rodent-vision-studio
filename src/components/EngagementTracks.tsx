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
    accent: "tech",
    bullets: ["API Studio", "CLI + SDKs", "AI Playbooks"],
  },
  {
    title: "For Partners",
    description:
      "Co-build production pilots in energy, fintech, and infrastructure. We move from concept to deployment with you in the loop.",
    cta: "Partner with us",
    href: "/opportunities",
    icon: HeartHandshake,
    accent: "accent",
    bullets: ["Joint ventures", "Pilots & rollouts", "Compliance ready"],
  },
  {
    title: "For Investors",
    description:
      "Back a studio compounding software and hardware advantages across Africa's infrastructure decade.",
    cta: "Investor brief",
    href: "/opportunities#investors",
    icon: Globe,
    accent: "energy",
    bullets: ["Studio portfolio", "Hardware IP", "SADC focus"],
  },
];

export const EngagementTracks = () => {
  return (
    <section id="engagement" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">Choose How You Engage</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Developers, enterprises, and investors plug into Rodent through clear, outcome-driven tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <Link
                key={track.title}
                to={track.href}
                className="group glass-hover rounded-2xl p-7 space-y-5 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-10 rounded-full bg-${track.accent}/10 border border-${track.accent}/25 flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${track.accent}`} />
                    </span>
                    <h3 className="text-xl font-semibold">{track.title}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{track.description}</p>
                <div className="flex flex-wrap gap-2">
                  {track.bullets.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-accent">
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
