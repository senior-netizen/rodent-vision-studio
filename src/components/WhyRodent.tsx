import { Globe, Layers, Cpu, Award, Route } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "African Innovation First",
    description:
      "We design for intermittent power, patchy bandwidth, and diverse regulatory environments—because that's our backyard.",
  },
  {
    icon: Layers,
    title: "Full-Stack Craft",
    description:
      "From wind turbines and IoT sensors to cloud APIs and AI copilots, we build the stack end-to-end with composable modules.",
  },
  {
    icon: Cpu,
    title: "Engineering Rigor",
    description:
      "Production-grade standards, automated testing, and observability are baked into every release, not tacked on.",
  },
  {
    icon: Route,
    title: "Velocity with Governance",
    description:
      "Rapid prototyping paired with clear controls, approvals, and rollout safety—so enterprises can move without fear.",
  },
  {
    icon: Award,
    title: "Founder-Led Studio",
    description:
      "Rodent is hands-on: leadership codes, designs, and ships alongside partners to unlock real-world outcomes.",
  },
];

export const WhyRodent = () => {
  return (
    <section id="why-rodent" className="section-padding-sm relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 animate-fade-in">
            Why Rodent
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Building Africa's innovation infrastructure with precision, speed, and a relentless engineering culture.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group rounded-2xl bg-card border border-border/50 p-8 space-y-6 transition-all duration-300 hover:border-border hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
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
