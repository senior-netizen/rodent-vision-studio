import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Projects — Rodent',
  description: 'Selected engineering and field installation work delivered for Fortsync Technologies (Private) Limited.',
  alternates: { canonical: '/engineering-projects' },
};

const projects = [
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45bde209-9473-4818-932f-ce7044f9f9f1_0_watermark-QPbvcWsT4FsVQjImo0GccLUS7njzaC.jpeg',
    alt: 'Rodent engineering team working at an international airport entrance',
    category: 'Airport infrastructure',
    title: 'On-site installation and systems support',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260514-WA0027-OvODyJK27WXADsmbc1epLrvBpLbaPv.jpg',
    alt: 'Engineer accessing ceiling infrastructure during an office installation',
    category: 'Commercial fit-out',
    title: 'Careful delivery in active workspaces',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45bde209-9473-4818-932f-ce7044f9f9f1_1_watermark-dmliR6mbVU9GTujL5EpCo0QuqELpNQ.jpeg',
    alt: 'Engineer working above an aircraft cabin during an installation',
    category: 'Specialist access',
    title: 'Field engineering where it matters',
  },
];

export default function EngineeringProjectsPage() {
  return (
    <main className="engineering-projects engineering-projects-page">
      <div className="engineering-projects-heading">
        <div>
          <p className="eyebrow">Engineering projects</p>
          <h1 id="engineering-projects-title">Practical systems, installed in the real world.</h1>
        </div>
        <p>Selected fieldwork delivered for Fortsync Technologies (Private) Limited, from structured cabling and access work to on-site installation support.</p>
      </div>
      <div className="engineering-projects-grid">
        {projects.map((project, index) => (
          <figure className={`engineering-project-image ${index === 0 ? 'engineering-project-image-wide' : ''}`} key={project.image}>
            <img src={project.image} alt={project.alt} loading={index === 0 ? 'eager' : 'lazy'} />
            <figcaption><span>{project.category}</span><strong>{project.title}</strong></figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
