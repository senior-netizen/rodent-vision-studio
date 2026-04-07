'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectConfigs } from '@/data/projects';
import { reveal, stagger, staggerChild } from '@/lib/animations/reveal';

export function SelectedSystemsSection() {
  return (
    <section id="projects" className="section-shell relative">
      <div className="container-wide">
        {/* Section Header */}
        <div className="editorial-grid mb-16">
          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-1"
          >
            <span className="section-number">02</span>
          </motion.div>

          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-6"
          >
            <h2 className="text-heading text-[clamp(2.5rem,5vw,4.5rem)]">
              Selected
              <br />
              <span className="text-fg-muted">Systems</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 flex items-end md:col-span-5"
          >
            <p className="text-body max-w-md text-sm">
              Each project represents a production system — designed, built,
              and deployed for real operational environments.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="divider-accent mb-10 origin-left"
        />

        {/* Project List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-1"
        >
          {projectConfigs.map((project, index) => (
            <motion.div key={project.slug} variants={staggerChild}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-bg-elevated opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100" />

                <div className="relative flex flex-col gap-4 border-b border-border py-8 transition-all duration-500 ease-out-expo group-hover:border-border-hover md:flex-row md:items-center md:py-10">
                  {/* Number */}
                  <span className="font-mono text-xs text-fg-dim md:w-16">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Name */}
                  <h3 className="text-heading text-2xl transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:flex-1 md:text-3xl lg:text-4xl">
                    {project.name}
                  </h3>

                  {/* Role */}
                  <p className="text-body text-sm md:w-52 lg:w-64">
                    {project.role}
                  </p>

                  {/* Category */}
                  <span className="text-label md:w-36 md:text-right">
                    {project.category}
                  </span>

                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 md:relative md:translate-x-4 md:translate-y-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-accent"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
