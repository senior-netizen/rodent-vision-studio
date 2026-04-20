import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectConfigs } from '@/data/projects';
import { getProjectBySlug } from '@/lib/projects/store';

type RouteParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectConfigs.map((project) => ({ slug: project.slug }));
}

export const dynamic = 'force-dynamic';

export default function ProjectRoute({ params }: RouteParams) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyPage project={project} />;
}
