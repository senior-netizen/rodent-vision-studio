import { Code, Building2, Landmark, Rocket } from "lucide-react";

const audiences = [
  {
    icon: Code,
    title: "Developers",
    description: "Build faster with our API platforms, CLI tools, and AI-powered development assistants.",
    features: ["API Studio", "CLI Tools", "AI Assistance", "Documentation"],
  },
  {
    icon: Building2,
    title: "Utilities & Cities",
    description: "Transform grid intelligence and citizen experience with real-time outage tracking and smart infrastructure.",
    features: ["ShedSense API", "Outage Tracking", "VAWT Integration", "Analytics"],
  },
  {
    icon: Landmark,
    title: "Banks & Insurers",
    description: "Enable transparent, decentralized insurance models with blockchain-powered claims and governance.",
    features: ["TechChain Platform", "DAO Governance", "Claims Automation", "Risk Analytics"],
  },
  {
    icon: Rocket,
    title: "Startups & Enterprises",
    description: "Deploy production-ready infrastructure for property management, energy monitoring, and fintech.",
    features: ["White-label Solutions", "Enterprise APIs", "Scalable Architecture", "24/7 Support"],
  },
];

export const WhoWeServe = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Who We <span className="gradient-text">Serve</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solutions tailored for every part of the innovation ecosystem
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
                      <p className="text-muted-foreground leading-relaxed">
                        {audience.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {audience.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
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
