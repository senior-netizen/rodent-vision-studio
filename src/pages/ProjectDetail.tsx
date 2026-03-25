import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, FileSpreadsheet } from "lucide-react";
import { Footer } from "@/components/Footer";
import { MeterFlowShowcase } from "@/components/MeterFlowShowcase";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { exportAuditCsv } from "@/lib/analyticsAudit";
import { downloadProjectAbstract } from "@/lib/projectAbstractDownload";

const normalizeProjectValue = (value?: string) =>
  (value || "")
    .trim()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

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
  const isMeterFlowProject = project?.slug === "meterflow";

  usePageMetadata(
    project ? project.name : "Project",
    project
      ? project.summary
      : "Explore Rodent Inc. projects across developer tools, energy operations, fintech systems, and hardware in Africa."
  );

  if (!project && aliasMatch) {
    return <Navigate to={`/projects/${aliasMatch.slug}`} replace />;
  }

  const handleDownloadAbstract = () => {
    if (!project) return;

    downloadProjectAbstract({
      title: project.name,
      subtitle: project.headline,
      filename: `${project.slug}-abstract`,
      generatedBy: "Rodent Inc.",
      projectSlug: project.slug,
      projectName: project.name,
      source: "project_detail",
      template: "premium",
      sections: [
        { heading: "Summary", body: project.summary },
        { heading: "Problem", body: project.problem },
        { heading: "Solution", body: project.solution },
        { heading: "Key features", body: project.features.join("; ") },
        { heading: "Tech stack", body: project.techStack.join(", ") },
      ],
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="pt-32 pb-24">
          <div className="container mx-auto space-y-8 px-6 text-center lg:px-8">
            <h1 className="text-4xl font-bold">Project not found</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We couldn't find that project link. Try one of these live projects or go back to the portfolio.
            </p>
            <div className="mx-auto grid max-w-5xl gap-4 text-left md:grid-cols-3">
              {suggestedProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="glass space-y-2 rounded-2xl border border-border/60 p-5 hover:border-accent/50 hover-lift"
                >
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="font-semibold">{item.name}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{item.summary}</p>
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
        <div className={`${isMeterFlowProject ? "mx-auto w-[min(1800px,98vw)] space-y-12 px-3 lg:px-4" : "container mx-auto space-y-12 px-6 lg:px-8"}`}>
          <div className="flex flex-col gap-6">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
              <ArrowLeft className="h-4 w-4" /> Back to all projects
            </Link>

            <div className="glass animate-fade-in space-y-6 rounded-3xl p-8 shadow-premium lg:p-12">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-3">
                    <span className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold lg:text-5xl">{project.name}</h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.headline}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" size="lg" onClick={handleDownloadAbstract}>
                    Download abstract
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="lg" onClick={() => exportAuditCsv(project.slug, project.name)}>
                    Export audit CSV
                    <FileSpreadsheet className="ml-2 h-4 w-4" />
                  </Button>
                  {project.cta && (
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">
                        {project.cta}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {!isMeterFlowProject && (
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Problem</h2>
                    <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Solution</h2>
                    <p className="leading-relaxed text-muted-foreground">{project.solution}</p>
                  </div>
                </div>
              )}

              {isMeterFlowProject && <MeterFlowShowcase />}

              {!isMeterFlowProject && (
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="space-y-4 lg:col-span-2">
                    <h3 className="text-lg font-semibold">What it does</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" />
                          <p className="text-sm leading-relaxed text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Tech stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 to-tech/10 p-4">
                      <p className="text-sm font-semibold">Contact the team</p>
                      <p className="text-sm text-muted-foreground">
                        Request access, discuss integration, or start a pilot conversation.
                      </p>
                      <Button variant="premium" size="sm" asChild>
                        <Link to="/contact">Talk to us</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
