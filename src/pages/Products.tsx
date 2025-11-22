import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import { ArrowUpRight, Tag } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const categoryOrder = ["DevTools", "Energy", "Fintech", "Infrastructure", "Hardware"] as const;

const Projects = () => {
  usePageMetadata(
    "Projects",
    "Explore Rodent Inc.'s portfolio of developer tools, energy intelligence, fintech rails, and hardware R&D built for Africa."
  );

  const sortedProjects = [...projects].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every project is built for Africa's realities: bandwidth-aware, regulation-ready, and production-focused.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group glass-hover rounded-2xl p-7 space-y-4 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-accent uppercase tracking-[0.08em]">
                    <Tag className="w-4 h-4" />
                    {project.category}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground">
                    {project.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Highlights</p>
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
                </div>

                <div className="inline-flex items-center text-sm font-semibold text-accent">
                  View project <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
