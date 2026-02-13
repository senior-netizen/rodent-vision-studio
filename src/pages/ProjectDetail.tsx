import { useMemo } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const normalizeProjectValue = (value?: string) =>
    (value || "")
      .trim()
      .toLowerCase()
      .replace(/%20/g, " ")
      .replace(/[_\s]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-{2,}/g, "-")
      .replace(/^-+|-+$/g, "");

  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

  const normalizedSlug = normalizeProjectValue(slug);
  const aliasMatch = useMemo(
    () =>
      projects.find((item) => {
        const normalizedName = normalizeProjectValue(item.name);
        const normalizedItemSlug = normalizeProjectValue(item.slug);
        return normalizedSlug === normalizedItemSlug || normalizedSlug === normalizedName;
      }),
    [normalizedSlug]
  );

  const suggestedProjects = useMemo(() => projects.slice(0, 3), []);

  usePageMetadata(
    project ? project.name : "Project",
    project
      ? project.summary
      : "Explore Rodent Inc. projects spanning devtools, energy, fintech, and hardware innovation in Africa."
  );

  if (!project && aliasMatch) {
    return <Navigate to={`/projects/${aliasMatch.slug}`} replace />;
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 lg:px-8 text-center space-y-8">
            <h1 className="text-4xl font-bold">Project not found</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We couldn't find that project link. Try one of these live projects or go back to the portfolio.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left max-w-5xl mx-auto">
              {suggestedProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="glass rounded-2xl p-5 border border-border/60 hover:border-accent/50 hover-lift space-y-2"
                >
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                </Link>
              ))}
            </div>
            <Button variant="hero" onClick={() => navigate("/projects")}>Back to projects</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-12">
          <div className="flex flex-col gap-6">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
              <ArrowLeft className="w-4 h-4" /> Back to all projects
            </Link>

            <div className="glass rounded-3xl p-8 lg:p-12 space-y-6 shadow-premium animate-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold">{project.name}</h1>
                  <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{project.headline}</p>
                </div>
                {project.cta && (
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      {project.cta}
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Problem</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Key features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/60">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tech stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-tech/10 border border-border/60 space-y-2">
                    <p className="text-sm font-semibold">Engage the team</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule a technical walk-through, request access, or propose a collaboration.
                    </p>
                    <Button variant="premium" size="sm" asChild>
                      <Link to="/contact">Talk to us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
