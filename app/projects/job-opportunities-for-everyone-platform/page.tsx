'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/10 bg-white/90 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

const metadata = [
  { label: 'Client', value: 'Rodent, Inc.' },
  { label: 'Industry', value: 'Employment & Access Infrastructure' },
  { label: 'Stack', value: 'Next.js, Supabase, TailwindCSS, Vercel' },
  { label: 'Timeline', value: '6 Weeks' }
];

const problems = [
  'No centralized job platform',
  'Listings scattered across WhatsApp & social media',
  'No structured submission system',
  'No persistent data layer',
  'No scalability'
];

const objectives = [
  'Centralize job listings',
  'Enable structured submissions',
  'Build mobile-first access',
  'Ensure scalability',
  'Own the platform and data'
];

const features = [
  { title: 'Job listing system', icon: '01', desc: 'Unified publishing model with consistent listing structure and retention.' },
  { title: 'Submission pipeline', icon: '02', desc: 'Form intake, validation rules, and managed persistence for all submissions.' },
  { title: 'Admin control', icon: '03', desc: 'Authenticated moderation and publish controls for operational governance.' },
  { title: 'SEO-ready pages', icon: '04', desc: 'Server-side rendering and crawlable routes for discoverability and reach.' },
  { title: 'Mobile optimization', icon: '05', desc: 'Touch-first interactions and legible hierarchy across smaller devices.' },
  { title: 'Scalable backend', icon: '06', desc: 'PostgreSQL-backed Supabase architecture for durable growth.' }
];

const executionSteps = [
  'System architecture design',
  'UI development',
  'Database modeling (PostgreSQL)',
  'Supabase integration',
  'Deployment (Vercel)'
];

const outcomes = [
  'Centralized job access',
  'Reduced fragmentation',
  'Scalable intake system',
  'Improved accessibility',
  'Future-ready infrastructure'
];

export default function JobOpportunitiesForEveryoneCaseStudyPage() {
  return (
    <main className="bg-neutral-50 text-neutral-950">
      <Section className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(15,23,42,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_40%),linear-gradient(to_bottom,#ffffff,#f5f5f4)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">Case Study</p>
            <h1 className="max-w-5xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Job Opportunities For Everyone — Platform Build
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-xl">
              Cloud-native job distribution platform engineered for accessibility and scale.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
          >
            {metadata.map((item) => (
              <div key={item.label} className="rounded-xl border border-black/5 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{item.label}</p>
                <p className="mt-2 text-sm font-medium text-neutral-900">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="problem" className="bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="grid gap-8 lg:grid-cols-12"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Problem</h2>
          </motion.div>
          <motion.ul variants={fadeInUp} className="space-y-4 lg:col-span-8">
            {problems.map((problem) => (
              <li key={problem} className="rounded-xl border border-black/10 bg-neutral-50 px-5 py-4 text-neutral-700">
                {problem}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Section>

      <Section id="objective">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Objective
          </motion.h2>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {objectives.map((objective) => (
              <motion.div variants={fadeInUp} key={objective}>
                <Card className="h-full">
                  <p className="text-sm font-medium text-neutral-800">{objective}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="solution" className="bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Solution Architecture
          </motion.h2>

          <motion.div variants={fadeInUp} className="grid gap-4 lg:grid-cols-3">
            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Frontend</p>
              <p className="mt-3 text-sm text-neutral-700">Next.js App Router with SSR + SEO optimization for fast, discoverable, mobile-first experiences.</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Backend</p>
              <p className="mt-3 text-sm text-neutral-700">Supabase BaaS with PostgreSQL core, PostgREST API layer, Auth, and Realtime-enabled infrastructure.</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Data Flow</p>
              <p className="mt-3 text-sm text-neutral-700">Form submission → schema validation → Supabase persistence → server-rendered UI updates.</p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="rounded-3xl border border-black/10 bg-gradient-to-b from-white to-neutral-100 p-5 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-4">
              {['Form Input', 'Validation Layer', 'Supabase (Postgres + API + Auth + Realtime)', 'Rendered Job Pages'].map((node, index) => (
                <div key={node} className="relative rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-800">{node}</p>
                  {index < 3 && (
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-neutral-300 to-transparent lg:absolute lg:-right-6 lg:top-1/2 lg:mt-0 lg:h-0.5 lg:w-6" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Section>

      <Section id="features">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Features
          </motion.h2>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div variants={fadeInUp} key={feature.title}>
                <Card className="h-full space-y-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-neutral-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="execution" className="bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Execution
          </motion.h2>
          <motion.ol variants={stagger} className="space-y-4">
            {executionSteps.map((step, index) => (
              <motion.li variants={fadeInUp} key={step} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4">
                <span className="mt-0.5 text-xs font-semibold tracking-[0.2em] text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm font-medium text-neutral-800">{step}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </Section>

      <Section id="outcome">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Outcome
          </motion.h2>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {outcomes.map((outcome) => (
              <motion.div variants={fadeInUp} key={outcome}>
                <Card className="h-full bg-gradient-to-b from-white to-neutral-100">
                  <p className="text-sm font-semibold text-neutral-900">{outcome}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="strategic-value" className="bg-neutral-950 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-6"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Strategic Value
          </motion.p>
          <motion.h2 variants={fadeInUp} className="max-w-5xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Converts informal systems into infrastructure.
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
            Enables data ownership and establishes a foundation ready for API expansion, mobile applications, and workflow automation.
          </motion.p>
        </motion.div>
      </Section>

      <Section className="py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-balance text-2xl font-semibold tracking-tight sm:text-4xl"
        >
          Built by Rodent, Inc. — infrastructure for scalable digital systems.
        </motion.p>
      </Section>
    </main>
  );
}
