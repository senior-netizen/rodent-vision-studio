import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Rodent — Mission, Founders, and Africa Service Footprint',
  description:
    'Learn about Rodent, the software and hardware engineering division of Squirrellabs Technologies (Private) Limited, and meet its founders.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Rodent — Mission, Founders, and Africa Service Footprint',
    description:
      'Meet the founders behind Rodent and see how the division deploys reliable digital infrastructure across Africa.',
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

type Milestone = {
  year: string;
  title: string;
  description: string;
};

const founders: TeamMember[] = [
  {
    name: 'Anesu Prince Ndava',
    role: 'Co-Founder',
    bio: 'Anesu brings a background in software development and electronic engineering, with a focus on digital infrastructure, APIs, and connected systems. His project portfolio includes ShedSense, Precise Locations, AR by Rodent, and Feel At Home, spanning energy information, developer tools, augmented reality, and property technology.',
  },
  {
    name: 'Vulan Anotidaishe K Machiri',
    role: 'Co-Founder',
    bio: 'Vulan brings a background in millwright work, industrial maintenance, and industrial electrical systems. His experience adds a practical engineering perspective to the founding team, complementing its software and electronics capabilities.',
  },
];

const values = [
  'Deployment-first engineering: systems are judged by how reliably they operate after launch.',
  'Clarity over cleverness: simple interfaces, explicit ownership, and maintainable architecture.',
  'Africa-context resilience: design for intermittent networks, field constraints, and operational scale.',
  'Security by default: protect user data, business workflows, and infrastructure from day one.',
  'Long-term partnership: ship, measure, support, and improve alongside client teams.',
];

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Rodent engineering work begins',
    description:
      'Formed to help African businesses turn fragile software ideas into robust web, mobile, and connected infrastructure.',
  },
  {
    year: '2024',
    title: 'First production deployments',
    description:
      'Delivered early client platforms for property operations, fintech workflows, and service-business automation.',
  },
  {
    year: '2025',
    title: 'IoT and monitoring expansion',
    description:
      'Extended delivery into telemetry dashboards, smart metering concepts, and field-alert systems for distributed operations.',
  },
  {
    year: '2026',
    title: 'Key client markers',
    description:
      'Consolidated project work across logistics, energy, property, SHEQ, and inspection use cases with Africa-focused deployment patterns.',
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
        <h1 id="about-title">Engineering digital infrastructure for African operators.</h1>
        <div className="about-story">
          <p>
            Rodent is the software and hardware engineering division of Squirrellabs Technologies (Private) Limited. We design and build web platforms, mobile applications, IoT systems, and robotics solutions, bringing software development and practical engineering together to solve real business problems.
          </p>
          <p>
            Our mission is to engineer practical web, mobile, IoT, and robotics platforms for African businesses, institutions, and field teams. That means pairing careful architecture with deployment discipline, security-minded defaults, and long-term support.
          </p>
          <p>
            We focus on the layer where technology meets operations: booking flows, payment workflows, telemetry, dashboards, inspections, and decision systems that help teams move faster with less fragility.
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

      <section className="about-section values-section" aria-labelledby="values-title">
        <div className="section-heading">
          <p className="eyebrow">Core values</p>
          <h2 id="values-title">Principles that keep delivery dependable.</h2>
        </div>
        <ul className="values-list">
          {values.map((value) => <li key={value}>{value}</li>)}
        </ul>
      </section>

      <section className="about-section footprint-section" aria-labelledby="footprint-title">
        <div className="section-heading">
          <p className="eyebrow">Geography</p>
          <h2 id="footprint-title">Africa-focused service footprint.</h2>
        </div>
        <p>
          Rodent serves organizations building for African markets, with delivery patterns shaped around Southern Africa and remote-first collaboration across the continent. We support discovery, architecture, build, launch, and iteration for clients operating in Zimbabwe, South Africa, Zambia, Botswana, Kenya, Nigeria, Ghana, Rwanda, and adjacent regional markets.
        </p>
        <div className="footprint-tags" aria-label="Representative service regions">
          {['Southern Africa', 'East Africa', 'West Africa', 'Remote-first delivery', 'Field deployments'].map((region) => <span key={region}>{region}</span>)}
        </div>
      </section>

      <section className="about-section" aria-labelledby="milestones-title">
        <div className="section-heading">
          <p className="eyebrow">Milestones</p>
          <h2 id="milestones-title">From founding to field deployments.</h2>
        </div>
        <ol className="timeline">
          {milestones.map((milestone) => (
            <li key={`${milestone.year}-${milestone.title}`}>
              <span>{milestone.year}</span>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-final-cta" aria-labelledby="next-step-title">
        <h2 id="next-step-title">Ready to build infrastructure that holds up in production?</h2>
        <div className="about-cta-row">
          <Link className="btn-primary" href="/contact">Start a conversation</Link>
          <Link className="btn-secondary" href="/services">Compare services</Link>
          <Link className="btn-ghost" href="/projects">See proof</Link>
        </div>
      </section>
    </main>
  );
}
