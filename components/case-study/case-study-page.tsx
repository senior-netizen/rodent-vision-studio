'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProjectConfig } from '@/data/projects';
import { reveal } from '@/lib/animations/reveal';

export function CaseStudyPage({ project }: { project: ProjectConfig }) {
  return (
    <main>
      <section className="min-h-screen border-b border-secondary/20 px-6 py-24 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-end gap-6">
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent">{project.category}</p>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[0.92]">{project.name}</h1>
          <p className="max-w-2xl text-lg text-secondary">{project.role}</p>
        </div>
      </section>

      <section className="section-shell border-b border-secondary/20 px-6 lg:px-12">
        <motion.div {...reveal} viewport={{ once: true }} className="mx-auto max-w-[1440px]">
          <h2 className="mb-4 text-[clamp(2rem,3.2vw,3rem)] uppercase">Problem</h2>
          <p className="max-w-3xl text-secondary">{project.problem}</p>
        </motion.div>
      </section>

      <section className="section-shell border-b border-secondary/20 px-6 lg:px-12">
        <motion.div {...reveal} viewport={{ once: true }} className="mx-auto max-w-[1440px] space-y-8">
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] uppercase">Architecture</h2>
          <Image src={project.visuals.diagram} alt={`${project.name} architecture diagram`} width={1600} height={900} className="w-full border border-secondary/20" />
          <ul className="grid gap-3 text-secondary lg:grid-cols-2">
            {project.architecture.map((item) => (
              <li key={item} className="border border-secondary/20 px-4 py-3">{item}</li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section className="section-shell border-b border-secondary/20 px-6 lg:px-12">
        <motion.div {...reveal} viewport={{ once: true }} className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Stack</h3>
            <ul className="space-y-2 text-secondary">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Data flow</h3>
            <ul className="space-y-2 text-secondary">{project.dataFlow.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">System decisions</h3>
            <ul className="space-y-2 text-secondary">{project.decisions.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </motion.div>
      </section>

      <section className="section-shell border-b border-secondary/20 px-6 lg:px-12">
        <motion.div {...reveal} viewport={{ once: true }} className="mx-auto max-w-[1440px] space-y-8">
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] uppercase">Interface</h2>
          <Image src={project.visuals.screenshot} alt={`${project.name} operational interface`} width={1600} height={900} className="w-full border border-secondary/20" />
        </motion.div>
      </section>

      <section className="section-shell px-6 lg:px-12">
        <motion.div {...reveal} viewport={{ once: true }} className="mx-auto max-w-[1440px]">
          <h2 className="mb-4 text-[clamp(2rem,3.2vw,3rem)] uppercase">Outcome</h2>
          <p className="max-w-3xl text-secondary">{project.outcome}</p>
        </motion.div>
      </section>
    </main>
  );
}
