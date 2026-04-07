'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectConfigs } from '@/data/projects';

export function SelectedSystemsSection() {
  return (
    <section className="section-shell border-b border-secondary/20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="mb-12 text-[clamp(2.5rem,4vw,4rem)] uppercase">Selected Systems</h2>
        <div className="space-y-4">
          {projectConfigs.map((project) => (
            <motion.div key={project.slug} whileHover={{ scale: 1.02, opacity: 1 }} className="reveal-panel opacity-90">
              <Link href={`/projects/${project.slug}`} className="system-grid items-center px-6 py-10">
                <h3 className="col-span-12 text-3xl uppercase lg:col-span-4">{project.name}</h3>
                <p className="col-span-12 text-secondary lg:col-span-4">{project.role}</p>
                <p className="col-span-12 font-mono text-xs uppercase tracking-[0.15em] text-accent lg:col-span-4">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
