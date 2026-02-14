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
      {/* Subtle background accents */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className={cn(
          "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Projects in Production and Pilot
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tools and infrastructure currently deployed, in pilot, or in private beta.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 neumorphic-button text-sm"
          >
            See all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={cn(
                "group glass-card p-8 space-y-5 hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              data-tilt-card
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              {/* Category & status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-accent uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent/60" />
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="inline-flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
