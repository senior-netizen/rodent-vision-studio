import { Cpu, BatteryCharging, Shield, Globe2 } from "lucide-react";

const areas = [
  {
    icon: Cpu,
    title: "Software & DevTools",
    description:
      "API-first platforms, AI copilots, and developer-first experiences that keep teams shipping with confidence.",
    highlights: ["API Studio & Vision", "CLI workflows", "AI copilots"],
    tone: "tech",
  },
  {
    icon: BatteryCharging,
    title: "Energy & Hardware",
    description:
      "Grid intelligence, IoT sensors, and vertical-axis wind R&D tuned for the realities of African power systems.",
    highlights: ["ShedSense", "VAWT Lab", "Edge telemetry"],
    tone: "energy",
  },
  {
    icon: Shield,
    title: "Fintech & Trust",
    description:
      "Hybrid on/off-chain rails for insurance, treasury, and compliance where transparency and speed are non-negotiable.",
    highlights: ["TrustChain", "Identity & KYC", "Auditability"],
    tone: "accent",
  },
  {
    icon: Globe2,
    title: "Infrastructure",
    description:
      "Operational software for property, mobility, and civic systems with embedded payments and resilient uptime.",
    highlights: ["Squirrel Property", "Mobility ops", "GovTech"],
    tone: "tech",
  },
];

export const WhatWeBuild = () => {
  return (
    <section id="what-we-build" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rodent is a full-stack studio shipping devtools, energy intelligence, and fintech rails that thrive in the African context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="glass rounded-2xl p-7 space-y-5 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center bg-${area.tone}/10 border-${area.tone}/25`}
                >
                  <Icon className={`w-6 h-6 text-${area.tone}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{area.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.highlights.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
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
