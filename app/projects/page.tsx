import { ProjectCard } from '@/components/projects/project-card';
import { projectConfigs } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-heading text-4xl">Projects</h1>
        <p className="max-w-2xl text-body text-sm">
          Production systems designed and shipped across marketplace, geospatial,
          AR, and grid-intelligence domains.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectConfigs.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}
