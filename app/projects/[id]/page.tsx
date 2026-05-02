import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectById, projectConfigs } from '@/data/projects';
import { applyProjectFreshness } from '@/lib/projects/scheduler';

type RouteParams = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projectConfigs.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  if (!(params.id in projectById)) return {};
  const project = projectById[params.id as keyof typeof projectById];
  const description = project.tagline || project.outcome || project.problem;
  return {
    title: `${project.name} — ${project.category} | Rodent, Inc.`,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.name} — Case Study`,
      description,
      type: 'article',
      url: `/projects/${project.id}`,
      images: project.visuals?.preview ? [{ url: project.visuals.preview }] : undefined,
    },
  };
}

export default function ProjectRoute({ params }: RouteParams) {
  if (!(params.id in projectById)) {
    notFound();
  }

  const project = applyProjectFreshness(projectById[params.id as keyof typeof projectById]);
  const staleContextLabel = project.linkHealth?.lastSuccessfulCheckAt
    ? `Last successful check: ${new Date(project.linkHealth.lastSuccessfulCheckAt).toLocaleString()}`
    : 'No successful deployment health check recorded yet.';

  return (
    <>
      {project.stale && (
        <section className="container-wide pt-28">
          <div
            className="rounded-xl border border-amber-400/35 bg-amber-500/10 p-4 text-amber-100"
            title={staleContextLabel}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">Deployment freshness warning</p>
            <p className="mt-2 text-sm">{staleContextLabel}</p>
          </div>
        </section>
      )}
      <CaseStudyPage project={project} />
    </>
  );
}
