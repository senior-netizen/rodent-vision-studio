import { Globe, Layers, Cpu, Award } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Built for African Reality",
    description: "Solutions engineered for real-world constraints—unreliable power, limited bandwidth, and complex regulations.",
  },
  {
    icon: Layers,
    title: "API-First Everything",
    description: "Every product is designed as a composable API platform, enabling developers to build on our infrastructure.",
  },
  {
    icon: Cpu,
    title: "From Electrons to Endpoints",
    description: "We build the full stack—from hardware sensors and wind turbines to cloud APIs and mobile apps.",
  },
  {
    icon: Award,
    title: "Production-Grade Engineering",
    description: "World-class code quality, comprehensive testing, and enterprise-ready scalability from day one.",
  },
];

export const WhyRodent = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-tech opacity-30" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why <span className="gradient-text">Rodent Inc.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Engineering excellence meets African innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass rounded-2xl p-8 space-y-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-tech/20 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
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
