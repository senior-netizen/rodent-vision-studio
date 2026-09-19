import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectById, projectConfigs, projectIdBySlug } from '@/data/projects';

type RouteParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectConfigs.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const projectId = projectIdBySlug[params.slug];
  if (!projectId) return {};
  const project = projectById[projectId];
  const description = project.tagline || project.outcome || project.problem;
  return {
    title: `${project.name} — ${project.category} | Rodent`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Case Study`,
      description,
      type: 'article',
      url: `/projects/${project.slug}`,
      images: [{ url: project.visuals?.preview || '/rodent-logo.png', alt: `${project.name} preview` }],
    },
  };
}

export default function ProjectRoute({ params }: RouteParams) {
  const projectId = projectIdBySlug[params.slug];
  if (!projectId) {
    notFound();
  }

  return <CaseStudyPage project={projectById[projectId]} />;
}
