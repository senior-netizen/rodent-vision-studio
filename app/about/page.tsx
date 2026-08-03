import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Rodent, Inc. — Mission, Team, and Africa Service Footprint',
  description:
    'Learn how Rodent, Inc. builds production-grade web, mobile, IoT, and robotics systems for African operators, with team profiles, values, footprint, and milestones.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Rodent, Inc. — Mission, Team, and Africa Service Footprint',
    description:
      'Meet the Rodent, Inc. team and see how we deploy reliable digital infrastructure across Africa.',
    type: 'website',
    url: '/about',
    images: [{ url: '/rodent-logo.png', alt: 'Rodent, Inc. logo' }],
  },
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedinUrl: string;
};

type Milestone = {
  year: string;
  title: string;
  description: string;
};

const team: TeamMember[] = [
  {
    name: 'Anesu Ndava',
    role: 'Founder & Systems Engineer',
    bio: 'Leads product architecture, infrastructure design, and deployment strategy for operators that need dependable systems in the field.',
    linkedinUrl: 'https://www.linkedin.com/in/anesu-ndava',
  },
  {
    name: 'Platform Engineering Team',
    role: 'Web, Mobile & Backend Systems',
    bio: 'Builds secure APIs, internal tools, dashboards, and mobile workflows with clear operational ownership from prototype to production.',
    linkedinUrl: 'https://www.linkedin.com/company/rodent-systems',
  },
  {
    name: 'Field Systems Team',
    role: 'IoT, Robotics & Edge Infrastructure',
    bio: 'Connects sensors, robotics workflows, and field telemetry to resilient monitoring layers for real-world African operating environments.',
    linkedinUrl: 'https://www.linkedin.com/company/rodent-systems',
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
    title: 'Rodent, Inc. founded',
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
        <p className="eyebrow">About Rodent, Inc.</p>
        <h1 id="about-title">Engineering digital infrastructure for African operators.</h1>
        <div className="about-story">
          <p>
            Rodent, Inc. was founded to close the gap between ambitious digital ideas and systems that survive real production constraints. We build for teams that need software, connected devices, and operational tooling to work reliably outside ideal lab conditions.
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

      <section className="about-section" aria-labelledby="team-title">
        <div className="section-heading">
          <p className="eyebrow">Team</p>
          <h2 id="team-title">Small senior teams, accountable delivery.</h2>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-avatar" aria-hidden="true">{getInitials(member.name)}</div>
              <div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                <a href={member.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn profile</a>
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
          Rodent, Inc. serves organizations building for African markets, with delivery patterns shaped around Southern Africa and remote-first collaboration across the continent. We support discovery, architecture, build, launch, and iteration for clients operating in Zimbabwe, South Africa, Zambia, Botswana, Kenya, Nigeria, Ghana, Rwanda, and adjacent regional markets.
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
