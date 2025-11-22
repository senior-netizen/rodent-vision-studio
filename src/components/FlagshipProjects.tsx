import { Link } from "react-router-dom";
import { projects, flagshipSlugs } from "@/data/projects";
import { BadgeCheck, ArrowUpRight } from "lucide-react";

export const FlagshipProjects = () => {
  const featured = projects.filter((project) => flagshipSlugs.includes(project.slug));

  return (
    <section id="flagships" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,hsl(var(--energy)/0.08),transparent_35%)]" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 animate-fade-in">
          <div className="space-y-3">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Flagship <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Production-grade platforms spanning developer tools, energy intelligence, and trust infrastructure.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/50 hover:border-accent/50 hover:text-accent transition"
          >
            View all work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group glass-hover rounded-2xl p-7 space-y-4 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-accent uppercase tracking-[0.08em]">
                  {project.category}
                </div>
                <BadgeCheck className="w-5 h-5 text-tech" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center text-sm font-semibold text-accent">
                Explore <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
