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
    <section id="why-rodent" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-tech opacity-25" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why <span className="gradient-text">Rodent</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building Africa's innovation infrastructure with precision, speed, and a relentless engineering culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass rounded-2xl p-8 space-y-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-tech/20 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
