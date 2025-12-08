import { Cpu, BatteryCharging, Shield, Globe2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const areas = [
  {
    icon: Cpu,
    title: "Software & DevTools",
    description:
      "API-first platforms, AI copilots, and developer experiences that keep teams shipping with confidence.",
    highlights: ["API Studio", "CLI workflows", "AI copilots"],
    tone: "tech" as const,
  },
  {
    icon: BatteryCharging,
    title: "Energy & Hardware",
    description:
      "Grid intelligence, IoT sensors, and wind R&D tuned for the realities of African power systems.",
    highlights: ["ShedSense", "VAWT Research", "Edge telemetry"],
    tone: "energy" as const,
  },
  {
    icon: Shield,
    title: "Fintech & Trust",
    description:
      "Hybrid on/off-chain rails for insurance, treasury, and compliance where transparency matters.",
    highlights: ["TrustChain", "Identity & KYC", "Auditability"],
    tone: "accent" as const,
  },
  {
    icon: Globe2,
    title: "Infrastructure",
    description:
      "Operational software for property, mobility, and civic systems with embedded payments.",
    highlights: ["Property ops", "Mobility", "GovTech"],
    tone: "tech" as const,
  },
];

const toneColors = {
  tech: "bg-tech/10 border-tech/20 text-tech",
  energy: "bg-energy/10 border-energy/20 text-energy",
  accent: "bg-accent/10 border-accent/20 text-accent",
};

export const WhatWeBuild = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="what-we-build" className="section-padding-sm bg-gradient-subtle" ref={ref}>
      <div className="container mx-auto">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            What We Build
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A full-stack studio shipping devtools, energy intelligence, and fintech rails designed for Africa's unique context.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className={cn(
                  "group rounded-2xl bg-card border border-border/50 p-8 space-y-6 transition-all duration-500 hover:border-border hover:shadow-lg",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${toneColors[area.tone]}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{area.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {area.highlights.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
