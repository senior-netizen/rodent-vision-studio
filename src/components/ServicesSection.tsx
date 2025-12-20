import { Code, Smartphone, Globe, Database, Palette, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies. From landing pages to complex enterprise solutions.",
    features: ["React & Next.js", "E-commerce", "Progressive Web Apps", "SEO Optimization"],
    accent: "tech" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences optimized for performance.",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
    accent: "energy" as const,
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description:
      "Robust server-side solutions, RESTful APIs, and database architecture. Scalable infrastructure that grows with your business.",
    features: ["Node.js & Python", "Cloud Services", "Database Design", "API Integration"],
    accent: "accent" as const,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with functionality. Creating intuitive interfaces that delight users.",
    features: ["Wireframing", "Prototyping", "Design Systems", "User Research"],
    accent: "tech" as const,
  },
  {
    icon: Code,
    title: "Custom Software",
    description:
      "Tailored software solutions to automate processes and solve unique business challenges. Built to your exact specifications.",
    features: ["Process Automation", "Legacy Modernization", "Integration", "Maintenance"],
    accent: "energy" as const,
  },
  {
    icon: Zap,
    title: "Technical Consulting",
    description:
      "Strategic guidance on technology choices, architecture decisions, and digital transformation initiatives.",
    features: ["Tech Strategy", "Code Review", "Performance Audit", "Team Training"],
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
        {/* Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Development Services
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            End-to-end development solutions from concept to deployment. We bring your digital vision to life with modern technologies and best practices.
          </p>
        </div>

        {/* Services grid */}
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
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl neumorphic-inset flex items-center justify-center",
                  accentColors[service.accent]
                )}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
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

        {/* CTA */}
        <div className={cn(
          "text-center mt-12 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <a
            href="/contact"
            className="neumorphic-button inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
          >
            Start Your Project
            <Zap className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
