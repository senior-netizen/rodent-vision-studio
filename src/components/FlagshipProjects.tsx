import { useEffect } from "react";
import { Link } from "react-router-dom";
import { projects, flagshipSlugs } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { initTiltCards } from "@/effects/tiltCards";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export const FlagshipProjects = () => {
  const featured = projects.filter((project) => flagshipSlugs.includes(project.slug));
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const cleanup = initTiltCards("#flagships [data-tilt-card]", 8);
    return () => cleanup();
  }, []);

  return (
    <section id="flagships" className="section-padding-sm relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />

      <div className="container mx-auto relative z-10">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-5">
            <h2>Projects in Production and Pilot</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Tools and infrastructure currently deployed, in pilot, or in private beta.
            </p>
          </div>
          <div className="lg:col-span-3 lg:flex lg:items-end lg:justify-end">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 neumorphic-button text-sm"
            >
              See all projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={cn(
                "group glass-card p-7 space-y-5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              data-tilt-card
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                transitionDuration: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
              }}
            >
              {/* Category & status */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.08em] font-medium text-accent">
                  {project.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <h3 className="text-xl font-medium group-hover:text-accent transition-colors duration-500">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Features — dash-separated */}
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
                {project.features.slice(0, 3).map((feature, i) => (
                  <span key={feature} className="flex items-center gap-1">
                    {i > 0 && <span className="text-border">—</span>}
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="inline-flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-500">
                Open project details
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
