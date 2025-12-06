import { useEffect } from "react";
import { Link } from "react-router-dom";
import { projects, flagshipSlugs } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { initTiltCards } from "@/effects/tiltCards";

export const FlagshipProjects = () => {
  const featured = projects.filter((project) => flagshipSlugs.includes(project.slug));

  useEffect(() => {
    const cleanup = initTiltCards("#flagships [data-tilt-card]", 8);
    return () => cleanup();
  }, []);

  return (
    <section id="flagships" className="section-padding-sm relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 animate-fade-in">
              Flagship Projects
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Production-grade platforms spanning developer tools, energy intelligence, and trust infrastructure.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-secondary border border-border/50 text-foreground hover:bg-secondary/80 hover:border-border transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            View all work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group rounded-2xl bg-card border border-border/50 p-8 space-y-5 transition-all duration-300 hover:border-border hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              data-tilt-card
              style={{ animationDelay: `${index * 0.1}s` }}
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
                Explore project
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
