import type { Metadata } from 'next';
import Image from 'next/image';
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
        <div className="founder-feature">
          <div className="founder-feature-media">
            <span className="founder-feature-index" aria-hidden="true">01 / FOUNDER</span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2020%2C%202026%2C%2009_47_42%20PM-dhV41HKfONsHkP4idQE9iFGrhhNax4.png"
              alt="Anesu Prince Ndava, Co-Founder of SquirrelLabs Technologies"
              fill
              sizes="(max-width: 820px) 100vw, 44vw"
              priority
            />
          </div>
          <div className="founder-feature-copy">
            <p className="eyebrow">Co-Founder</p>
            <h3>Anesu Prince Ndava</h3>
            <p className="founder-company">SquirrelLabs Technologies</p>
            <p className="team-bio">Anesu Prince Ndava is a co-founder of SquirrelLabs Technologies, the company behind Rodent. His work focuses on building practical digital products, infrastructure and technology-driven businesses.</p>
            <a className="founder-social-link" href="https://www.linkedin.com/in/anesu-p-ndava-a73567421" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="team-grid founders-grid-full">
          <article className="team-card founder-secondary">
            <div className="founder-secondary-media">
              <span className="founder-feature-index" aria-hidden="true">02 / FOUNDER</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260921-WA0000-8JfszQkPj2ULMRPkMvXrv0i5EsEgmj.jpg"
                alt="Vulan Anotidaishe K Machiri, Co-Founder of SquirrelLabs Technologies"
                fill
                sizes="(max-width: 820px) 100vw, 40vw"
              />
            </div>
            <div>
              <h3>{founders[1].name}</h3>
              <p className="team-role">{founders[1].role}</p>
              <p className="team-bio">{founders[1].bio}</p>
              <a className="founder-social-link" href="https://www.linkedin.com/in/vulan-machiri▪︎▪︎industrial-maintenance▪︎-00a3b3338" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
          </article>
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
