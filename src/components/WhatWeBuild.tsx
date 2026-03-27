import { Cpu, BatteryCharging, Shield, Globe2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const areas = [
  {
    icon: Cpu,
    title: "Software & DevTools",
    description:
      "API platforms, tooling, and assistant workflows that help teams ship and maintain integrations.",
    highlights: ["API Studio", "CLI workflows", "AI copilots"],
    tone: "tech" as const,
    num: "01",
  },
  {
    icon: BatteryCharging,
    title: "Energy & Hardware",
    description:
      "Outage tracking, IoT sensors, and wind hardware research for unstable power systems.",
    highlights: ["ShedSense", "VAWT Research", "Edge telemetry"],
    tone: "energy" as const,
    num: "02",
  },
  {
    icon: Shield,
    title: "Fintech & Trust",
    description:
      "Claim, treasury, and compliance workflows with auditable records and clear approval trails.",
    highlights: ["TrustChain", "Identity & KYC", "Auditability"],
    tone: "accent" as const,
    num: "03",
  },
  {
    icon: Globe2,
    title: "Infrastructure",
    description:
      "Operational software for property, mobility, and civic workflows with integrated payments.",
    highlights: ["Property ops", "Mobility", "GovTech"],
    tone: "tech" as const,
    num: "04",
  },
];

const toneColors = {
  tech: "text-tech",
  energy: "text-energy",
  accent: "text-accent",
};

export const WhatWeBuild = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="what-we-build" className="section-padding-sm bg-gradient-subtle" ref={ref}>
      <div className="container mx-auto">
        {/* Editorial header — left-aligned */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-4">
            <h2>What We Build</h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We build practical systems across developer tooling, energy operations, and financial workflows.
            </p>
          </div>
        </div>

        {/* Divider line */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Editorial cards with numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className={cn(
                  "group space-y-5 p-6 rounded-xl border border-border/20 hover:border-border/40 transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Number + Icon */}
                <div className="flex items-start justify-between">
                  <span className="editorial-num">{area.num}</span>
                  <Icon className={cn("w-5 h-5", toneColors[area.tone])} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">{area.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Tags with dash separator (editorial style) */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
                  {area.highlights.map((item, i) => (
                    <span key={item} className="flex items-center gap-1">
                      {i > 0 && <span className="text-border">—</span>}
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
