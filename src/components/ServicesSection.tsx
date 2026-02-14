import { Code, Smartphone, Globe, Database, Palette, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Web Platforms",
    description:
      "Web apps and portals that stay usable on slow networks and older devices.",
    features: ["React & Next.js", "Admin portals", "PWA support", "Performance tuning"],
    accent: "tech" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Mobile products for Android and iOS with offline handling and stable sync.",
    features: ["iOS & Android", "React Native", "Flutter", "Store deployment"],
    accent: "energy" as const,
  },
  {
    icon: Database,
    title: "Backend Systems & APIs",
    description:
      "Backend services, data models, and APIs designed for long-term maintainability.",
    features: ["Node.js & Python", "API design", "Database architecture", "System integration"],
    accent: "accent" as const,
  },
  {
    icon: Palette,
    title: "Interface Design",
    description:
      "Clear interface design for dashboards, operator tools, and customer flows.",
    features: ["Wireframes", "Prototypes", "Design systems", "Usability reviews"],
    accent: "tech" as const,
  },
  {
    icon: Code,
    title: "Custom Engineering",
    description:
      "Purpose-built software for operational bottlenecks that off-the-shelf tools do not solve.",
    features: ["Workflow automation", "Legacy integration", "Ops tooling", "Long-term support"],
    accent: "energy" as const,
  },
  {
    icon: Zap,
    title: "Technical Advisory",
    description:
      "Architecture, delivery, and reliability guidance for teams shipping under real constraints.",
    features: ["Architecture reviews", "Code audits", "Performance checks", "Team enablement"],
    accent: "accent" as const,
  },
];

const accentColors = {
  tech: "bg-tech/10 border-tech/20 text-tech",
  energy: "bg-energy/10 border-energy/20 text-energy",
  accent: "bg-accent/10 border-accent/20 text-accent",
};

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="section-padding-sm bg-background" ref={ref}>
      <div className="container mx-auto">
        <div className={cn(
          "text-center mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            Core Services
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Product Engineering
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We help teams design, build, and run software that has to work in production, not just in demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={cn(
                  "group glass-card p-8 space-y-6 hover:scale-[1.02] transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl neumorphic-inset flex items-center justify-center",
                  accentColors[service.accent]
                )}>
                  <Icon className="w-7 h-7" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className={cn(
          "text-center mt-12 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <a
            href="/contact"
            className="neumorphic-button inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
          >
            Start a Conversation
            <Zap className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
