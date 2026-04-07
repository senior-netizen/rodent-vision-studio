'use client';

import { useEffect, useRef } from 'react';
import { motion } from '@/vendor/framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectConfig } from '@/data/projects';
import { sectionFade } from '@/lib/animations/reveal';

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyPage({ project }: { project: ProjectConfig }) {
  const architectureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!architectureRef.current) return;

    const items = architectureRef.current.querySelectorAll('[data-arch]');
    gsap.fromTo(
      items,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: architectureRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <main className="bg-background px-6 pb-28 text-foreground lg:px-10">
      <section className="mx-auto flex min-h-screen max-w-grid flex-col justify-center border-b border-white/10 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">{project.category}</p>
        <h1 className="mt-4 text-display">{project.name}</h1>
        <p className="mt-5 text-lg text-muted">{project.role}</p>
      </section>

      <motion.section variants={sectionFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-grid border-b border-white/10 py-20">
        <h2 className="text-h2">Problem</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted">{project.problem}</p>
      </motion.section>

      <section ref={architectureRef} className="mx-auto max-w-grid border-b border-white/10 py-20">
        <h2 className="text-h2">Architecture</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {project.architecture.map((stage) => (
            <div key={stage} data-arch className="border border-white/15 p-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {stage}
            </div>
          ))}
        </div>
      </section>

      <motion.section variants={sectionFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-grid border-b border-white/10 py-20">
        <h2 className="text-h2">Build</h2>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-accent">Stack</p>
        <p className="mt-2 text-muted">{project.stack.join(' • ')}</p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-accent">Data Flow</p>
        <ul className="mt-3 space-y-2 text-muted">{project.dataFlow.map((item) => <li key={item}>— {item}</li>)}</ul>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-accent">System Decisions</p>
        <ul className="mt-3 space-y-2 text-muted">{project.systemDecisions.map((item) => <li key={item}>— {item}</li>)}</ul>
      </motion.section>

      <motion.section variants={sectionFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-grid border-b border-white/10 py-20">
        <h2 className="text-h2">Interface</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {project.visuals.map((visual) => (
            <div key={visual.title} className="border border-white/15 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{visual.kind}</p>
              <p className="mt-3 text-xl">{visual.title}</p>
              <p className="mt-2 text-muted">{visual.caption}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-grid py-20">
        <h2 className="text-h2">Outcome</h2>
        <ul className="mt-8 space-y-3 text-lg text-muted">
          {project.outcome.map((result) => (
            <li key={result}>— {result}</li>
          ))}
        </ul>
      </motion.section>
    </main>
  );
}
