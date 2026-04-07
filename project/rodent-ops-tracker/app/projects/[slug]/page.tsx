import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { projectBySlug, projects } from '@/data/projects';

type Slug = keyof typeof projectBySlug;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: Slug } }) {
  const project = projectBySlug[params.slug];
  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
