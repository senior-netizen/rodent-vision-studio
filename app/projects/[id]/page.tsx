import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectById, projectConfigs } from '@/data/projects';

type RouteParams = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projectConfigs.map((project) => ({ id: project.id }));
}

export default function ProjectRoute({ params }: RouteParams) {
  if (!(params.id in projectById)) {
    notFound();
  }

  const project = projectById[params.id as keyof typeof projectById];
  return <CaseStudyPage project={project} />;
}
