import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Rodent — Meet the Founders',
  description:
    'Learn about Rodent, the software and hardware engineering division of Squirrellabs Technologies (Private) Limited, and meet its founders.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Rodent — Meet the Founders',
    description:
      'Meet the founders behind Rodent, the engineering division of Squirrellabs Technologies (Private) Limited.',
    type: 'website',
    url: '/about',
    images: [{ url: '/rodent-logo.png', alt: 'Rodent logo' }],
  },
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

const founders: TeamMember[] = [
  {
    name: 'Anesu Prince Ndava',
    role: 'Co-Founder',
    bio: 'Anesu’s background combines software development and electronic engineering. His portfolio includes ShedSense, Precise Locations, AR by Rodent, and Feel At Home.',
  },
  {
    name: 'Vulan Anotidaishe K Machiri',
    role: 'Co-Founder',
    bio: 'Vulan brings a background in millwright work, industrial maintenance, and electrical systems, complementing the team’s software and electronics capabilities.',
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <p className="eyebrow">About Rodent</p>
        <h1 id="about-title">Software and practical engineering, working together.</h1>
        <div className="about-story">
          <p>
            Rodent is the software and hardware engineering division of Squirrellabs Technologies (Private) Limited.
          </p>
        </div>
        <div className="about-cta-row" aria-label="About page calls to action">
          <Link className="btn-primary" href="/services">Explore services</Link>
          <Link className="btn-secondary" href="/projects">View projects</Link>
          <Link className="btn-ghost" href="/contact">Contact us</Link>
        </div>
      </section>

      <section className="about-section" id="founders" aria-labelledby="founders-title">
        <div className="section-heading">
          <p className="eyebrow">Meet the founders</p>
          <h2 id="founders-title">A founding team grounded in software and practical engineering.</h2>
          <p className="founders-intro">Squirrellabs Technologies (Private) Limited was founded by Anesu Prince Ndava and Vulan Anotidaishe K Machiri. Through Rodent, the team brings together software, electronics, and industrial engineering.</p>
        </div>
        <div className="team-grid founders-grid-full">
          {founders.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-avatar" aria-hidden="true">{getInitials(member.name)}</div>
              <div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-final-cta" aria-labelledby="next-step-title">
        <h2 id="next-step-title">Tell us what your business needs to manage.</h2>
        <div className="about-cta-row">
          <Link className="btn-primary" href="/contact">Start a conversation</Link>
          <Link className="btn-secondary" href="/services">Compare services</Link>
          <Link className="btn-ghost" href="/projects">View projects</Link>
        </div>
      </section>
    </main>
  );
}
