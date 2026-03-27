import { Code, Building2, Landmark, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const audiences = [
  {
    icon: Code,
    title: "Engineering Teams",
    description: "API-first workflows, observability, and AI copilots that respect your constraints and compliance needs.",
    features: ["Contract testing", "CLI automation", "AI runbooks", "Secure auth"],
    num: "01",
  },
  {
    icon: Building2,
    title: "Utilities & Cities",
    description: "Grid-aware tooling, outage intelligence, and IoT telemetry to keep critical services resilient.",
    features: ["ShedSense API", "Load-shedding alerts", "Device telemetry", "Predictive models"],
    num: "02",
  },
  {
    icon: Landmark,
    title: "Financial Institutions",
    description: "Transparent rails for insurance, treasury, and compliance with programmable governance built in.",
    features: ["TrustChain", "KYC & fraud", "Treasury automation", "Audit trails"],
    num: "03",
  },
  {
    icon: Rocket,
    title: "Studios & Enterprises",
    description: "Co-creation, pilots, and venture building for property, mobility, and infrastructure products.",
    features: ["Rapid prototyping", "Embedded payments", "Energy dashboards", "Co-branded launches"],
    num: "04",
  },
];

export const WhoWeServe = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="who-we-serve" className="section-padding-sm bg-secondary/20" ref={ref}>
      <div className="container mx-auto">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-4">
            <h2>Who This Is For</h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              For teams building, running, financing, or regulating infrastructure products.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.title}
                className={cn(
                  "group glass-card p-7 space-y-5 transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span className="editorial-num">{audience.num}</span>
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-medium">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>
                </div>

                {/* Features — editorial 2-column grid */}
                <div className="grid grid-cols-2 gap-2">
                  {audience.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      {feature}
                    </div>
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
