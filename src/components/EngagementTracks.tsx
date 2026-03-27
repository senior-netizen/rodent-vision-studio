import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, TerminalSquare, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const tracks = [
  {
    title: "For Developers",
    description: "Use our API products, CLI tools, and engineering workflows to ship and operate faster.",
    cta: "View developer products",
    href: "/projects",
    icon: TerminalSquare,
    bullets: ["API Studio", "CLI + SDKs", "AI Playbooks"],
    num: "01",
  },
  {
    title: "For Partners",
    description: "Run pilots with us in energy, fintech, or infrastructure and move from design to rollout.",
    cta: "Partner with us",
    href: "/opportunities",
    icon: HeartHandshake,
    bullets: ["Joint ventures", "Pilots & rollouts", "Compliance ready"],
    num: "02",
  },
  {
    title: "For Investors",
    description: "Review our studio model across software and hardware bets in African infrastructure.",
    cta: "Investor brief",
    href: "/opportunities#investors",
    icon: Globe,
    bullets: ["Studio portfolio", "Hardware IP", "SADC focus"],
    num: "03",
  },
];

export const EngagementTracks = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="engagement" className="section-padding-sm" ref={ref}>
      <div className="container mx-auto">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-5">
            <h2>Ways to Work With Rodent</h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pick the path that matches your role: build, partner, or invest.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <Link
                key={track.title}
                to={track.href}
                className={cn(
                  "group glass-card p-7 space-y-5 hover:-translate-y-2 transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Number + Icon + Arrow */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="editorial-num">{track.num}</span>
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
                </div>

                <h3 className="text-xl font-medium">{track.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {track.description}
                </p>

                {/* Bullets — dash-separated */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
                  {track.bullets.map((item, i) => (
                    <span key={item} className="flex items-center gap-1">
                      {i > 0 && <span className="text-border">—</span>}
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="inline-flex items-center text-sm font-medium text-accent">
                  {track.cta}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
