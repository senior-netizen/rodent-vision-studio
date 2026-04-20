import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectCaseStudiesById } from '@/data/project-case-studies';
import { projectById, projects } from '@/data/projects';

type RouteParams = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default function ProjectRoute({ params }: RouteParams) {
  if (!(params.id in projectById)) {
    notFound();
  }

  const project = projectById[params.id as keyof typeof projectById];
  const caseStudy = projectCaseStudiesById[project.caseStudy ?? project.id];

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
