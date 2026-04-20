import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectBySlug, projectConfigs } from '@/data/projects';

type RouteParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectConfigs.map((project) => ({ slug: project.slug }));
}

export default function ProjectRoute({ params }: RouteParams) {
  if (!(params.slug in projectBySlug)) {
    notFound();
  }

  const project = projectBySlug[params.slug as keyof typeof projectBySlug];
  return <CaseStudyPage project={project} />;
}
