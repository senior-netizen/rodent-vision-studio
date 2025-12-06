import { Code, Building2, Landmark, Rocket } from "lucide-react";

const audiences = [
  {
    icon: Code,
    title: "Engineering Teams",
    description:
      "API-first workflows, observability, and AI copilots that respect your constraints and compliance needs.",
    features: ["Contract testing", "CLI automation", "AI runbooks", "Secure auth"],
  },
  {
    icon: Building2,
    title: "Utilities & Cities",
    description:
      "Grid-aware tooling, outage intelligence, and IoT telemetry to keep critical services resilient.",
    features: ["ShedSense API", "Load-shedding alerts", "Device telemetry", "Predictive models"],
  },
  {
    icon: Landmark,
    title: "Financial Institutions",
    description:
      "Transparent rails for insurance, treasury, and compliance with programmable governance built in.",
    features: ["TrustChain", "KYC & fraud", "Treasury automation", "Audit trails"],
  },
  {
    icon: Rocket,
    title: "Studios & Enterprises",
    description:
      "Co-creation, pilots, and venture building for property, mobility, and infrastructure products.",
    features: ["Rapid prototyping", "Embedded payments", "Energy dashboards", "Co-branded launches"],
  },
];

export const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className="section-padding-sm bg-secondary/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 animate-fade-in">
            Built for the Builders
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Whether you're coding, financing, or deploying infrastructure, Rodent delivers dependable rails.
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.title}
                className="group rounded-2xl bg-card border border-border/50 p-8 transition-all duration-300 hover:border-border hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-tech/10 border border-tech/20 flex items-center justify-center flex-shrink-0 group-hover:bg-tech/15 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-tech" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{audience.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {audience.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2">
                      {audience.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
