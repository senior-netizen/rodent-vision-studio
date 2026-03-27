import { Globe, Layers, Cpu, Award, Route } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Globe,
    title: "Built for African constraints",
    description: "We design for intermittent power, low bandwidth, and changing policy environments because that is where we operate.",
    num: "01",
  },
  {
    icon: Layers,
    title: "End-to-end execution",
    description: "We handle hardware, firmware, backend, and interface layers in one delivery stream.",
    num: "02",
  },
  {
    icon: Cpu,
    title: "Engineering discipline",
    description: "Testing, monitoring, and release controls are part of every build cycle.",
    num: "03",
  },
  {
    icon: Route,
    title: "Fast delivery with controls",
    description: "We move quickly, but with approvals, rollback paths, and deployment checks.",
    num: "04",
  },
  {
    icon: Award,
    title: "Hands-on leadership",
    description: "Leads stay in delivery, working directly with teams and partners.",
    num: "05",
  },
];

export const WhyRodent = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="why-rodent" className="section-padding-sm relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />

      <div className="container mx-auto relative z-10">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-4">
            <h2>Why Rodent</h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We focus on reliable delivery for teams running real infrastructure in Africa.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Editorial list — accordion-style with lines between */}
        <div className="space-y-0">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={cn(
                  "group grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-[2vw] py-8 border-b border-border/30 last:border-b-0 transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Number */}
                <div className="md:col-span-1 flex items-start">
                  <span className="editorial-num">{pillar.num}</span>
                </div>

                {/* Title + Icon */}
                <div className="md:col-span-3 flex items-start gap-3">
                  <Icon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <h3 className="text-lg font-medium">{pillar.title}</h3>
                </div>

                {/* Description */}
                <div className="md:col-span-4">
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
