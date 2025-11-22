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
      "Grid-aware tooling, outage intelligence, and IoT telemetry to keep critical services resilient when power is unstable.",
    features: ["ShedSense API", "Load-shedding alerts", "Device telemetry", "Predictive models"],
  },
  {
    icon: Landmark,
    title: "Financial Institutions",
    description:
      "Transparent rails for insurance, treasury, and compliance with programmable governance baked in.",
    features: ["TrustChain", "KYC & fraud", "Treasury automation", "Audit trails"],
  },
  {
    icon: Rocket,
    title: "Studios & Enterprises",
    description:
      "Co-creation, pilots, and venture building for property, mobility, and infrastructure products across Africa.",
    features: ["Rapid prototyping", "Embedded payments", "Energy dashboards", "Co-branded launches"],
  },
];

export const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Built for the <span className="gradient-text">Builders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're coding, financing, or deploying infrastructure, Rodent delivers dependable rails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.title}
                className="glass rounded-2xl p-8 space-y-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-tech/20 to-accent/20 border border-tech/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-tech" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{audience.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{audience.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {audiences[index].features.map((feature) => (
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
