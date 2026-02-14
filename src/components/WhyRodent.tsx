import { Globe, Layers, Cpu, Award, Route } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Globe,
    title: "Built for African constraints",
    description:
      "We design for intermittent power, low bandwidth, and changing policy environments because that is where we operate.",
  },
  {
    icon: Layers,
    title: "End-to-end execution",
    description:
      "We handle hardware, firmware, backend, and interface layers in one delivery stream.",
  },
  {
    icon: Cpu,
    title: "Engineering discipline",
    description:
      "Testing, monitoring, and release controls are part of every build cycle.",
  },
  {
    icon: Route,
    title: "Fast delivery with controls",
    description:
      "We move quickly, but with approvals, rollback paths, and deployment checks.",
  },
  {
    icon: Award,
    title: "Hands-on leadership",
    description:
      "Leads stay in delivery, working directly with teams and partners.",
  },
];

export const WhyRodent = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="why-rodent" className="section-padding-sm relative overflow-hidden" ref={ref}>
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Why Rodent
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We focus on reliable delivery for teams running real infrastructure in Africa.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={cn(
                  "group glass-card p-8 space-y-6",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl neumorphic-inset flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
