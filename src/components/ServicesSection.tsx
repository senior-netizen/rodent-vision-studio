import { Code, Smartphone, Globe, Database, Palette, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Web Platforms",
    description: "Web apps and portals that stay usable on slow networks and older devices.",
    features: ["React & Next.js", "Admin portals", "PWA support", "Performance tuning"],
    num: "01",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Mobile products for Android and iOS with offline handling and stable sync.",
    features: ["iOS & Android", "React Native", "Flutter", "Store deployment"],
    num: "02",
  },
  {
    icon: Database,
    title: "Backend Systems & APIs",
    description: "Backend services, data models, and APIs designed for long-term maintainability.",
    features: ["Node.js & Python", "API design", "Database architecture", "System integration"],
    num: "03",
  },
  {
    icon: Palette,
    title: "Interface Design",
    description: "Clear interface design for dashboards, operator tools, and customer flows.",
    features: ["Wireframes", "Prototypes", "Design systems", "Usability reviews"],
    num: "04",
  },
  {
    icon: Code,
    title: "Custom Engineering",
    description: "Purpose-built software for operational bottlenecks that off-the-shelf tools do not solve.",
    features: ["Workflow automation", "Legacy integration", "Ops tooling", "Long-term support"],
    num: "05",
  },
  {
    icon: Zap,
    title: "Technical Advisory",
    description: "Architecture, delivery, and reliability guidance for teams shipping under real constraints.",
    features: ["Architecture reviews", "Code audits", "Performance checks", "Team enablement"],
    num: "06",
  },
];

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="section-padding-sm bg-background" ref={ref}>
      <div className="container mx-auto">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.08em] font-medium text-muted-foreground mb-4 block">
              Core Services
            </span>
            <h2>Product Engineering</h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
              We help teams design, build, and run software that has to work in production, not just in demos.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={cn(
                  "group p-7 space-y-5 rounded-xl border border-border/20 hover:border-border/40 transition-all",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Number + Icon */}
                <div className="flex items-start justify-between">
                  <span className="editorial-num">{service.num}</span>
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-500" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium group-hover:text-foreground transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features — dash-separated */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
                  {service.features.map((feature, i) => (
                    <span key={feature} className="flex items-center gap-1">
                      {i > 0 && <span className="text-border">—</span>}
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
            className="neumorphic-button inline-flex items-center gap-2 text-sm text-foreground"
          >
            Start a Conversation
            <Zap className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
