'use client';

import Link from 'next/link';
import { motion } from '@/vendor/framer-motion';
import { projects } from '@/data/projects';

export function SelectedSystems() {
  return (
    <section className="border-b border-white/10 px-6 py-[120px] lg:px-10">
      <div className="mx-auto max-w-grid">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Selected Systems</p>
        <div className="mt-8 space-y-4">
          {projects.map((project) => (
            <motion.div key={project.slug} whileHover={{ scale: 1.02, opacity: 1 }} className="group border border-white/15 p-6 opacity-85 transition-opacity">
              <Link href={`/projects/${project.slug}`} className="grid grid-cols-12 gap-4">
                <h3 className="col-span-12 text-3xl lg:col-span-5">{project.name}</h3>
                <p className="col-span-12 text-muted lg:col-span-5">{project.role}</p>
                <p className="col-span-12 font-mono text-xs uppercase tracking-[0.18em] text-accent lg:col-span-2">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
