'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectConfig } from '@/data/projects';
import { reveal, revealLeft, stagger, staggerChild } from '@/lib/animations/reveal';


export function CaseStudyPage({ project }: { project: ProjectConfig }) {
  const demoUrl = project.status === 'live' || project.status === 'staging'
    ? project.links.live
    : undefined;
  const availabilityLabel = project.status === 'live'
    ? 'Public project link available.'
    : project.status === 'staging'
      ? 'Public preview available.'
      : 'No public project link.';
  const statusLabel = project.status === 'live'
    ? 'Live project'
    : project.status === 'staging'
      ? 'Preview'
      : 'Case study';


  return (
    <main>
      {/* Hero */}
      <section className="relative pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="card-glass mb-10 overflow-hidden p-1"
          >
            <Image
              src={project.preview}
              alt={`${project.name} project preview`}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
            <p className="px-4 py-3 text-caption">Project preview</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <Link
              href="/projects"
              className="text-caption transition-colors duration-300 hover:text-fg-muted"
            >
              ← All projects
            </Link>
            <span className="h-px w-6 bg-border" />
            <span className="text-label">{project.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[clamp(3.5rem,9vw,8rem)]"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-body mt-6 max-w-2xl text-lg"
          >
            {project.role}
          </motion.p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-emerald-300">
              {statusLabel}
            </span>
            <span className="text-body text-xs">{availabilityLabel}</span>
          </div>

          {demoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-4 py-2 text-caption transition-colors duration-300 hover:border-border-hover hover:text-fg-muted"
                >
                  Open project link
                </Link>
              )}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-border"
        />
      </section>

      {/* Executive Summary */}
      <section className="pb-6 md:pb-10">
        <div className="container-wide">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid gap-3 md:grid-cols-3"
          >
            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label">Scope</span>
              <p className="text-body mt-3 text-sm">{project.summary.scope}</p>
            </motion.div>
            {project.summary.timeline && (
              <motion.div variants={staggerChild} className="card-glass p-6">
                <span className="text-label">Timeline</span>
                <p className="text-body mt-3 text-sm">{project.summary.timeline}</p>
              </motion.div>
            )}
            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label">Main capability</span>
              <p className="text-body mt-3 text-sm">{project.summary.primaryKpi}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-shell">
        <div className="container-wide editorial-grid">
          <motion.div
            {...revealLeft}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-1"
          >
            <span className="section-number">01</span>
          </motion.div>
          <motion.div
            {...reveal}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4"
          >
            <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Problem</h2>
          </motion.div>
          <motion.div
            {...reveal}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7"
          >
            <p className="text-body text-lg leading-relaxed">{project.problem}</p>
          </motion.div>
        </div>
        <div className="container-wide">
          <div className="divider mt-16" />
        </div>
      </section>

      {/* Solution */}
      {project.solution && (
        <section className="section-shell">
          <div className="container-wide editorial-grid">
            <motion.div {...revealLeft} viewport={{ once: true }} className="col-span-12 md:col-span-1">
              <span className="section-number">02</span>
            </motion.div>
            <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-4">
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">What Rodent built</h2>
            </motion.div>
            <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-7">
              <p className="text-body text-lg leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
          <div className="container-wide">
            <div className="divider mt-16" />
          </div>
        </section>
      )}

      {/* Result + Metrics */}
      {(project.result || (project.metrics && project.metrics.length > 0)) && (
        <section className="section-shell">
          <div className="container-wide editorial-grid">
            <motion.div {...revealLeft} viewport={{ once: true }} className="col-span-12 md:col-span-1">
              <span className="section-number">03</span>
            </motion.div>
            <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-4">
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Demonstrated result</h2>
            </motion.div>
            <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-7">
              {project.result && (
                <p className="text-body mb-8 text-lg leading-relaxed">{project.result}</p>
              )}
              {project.metrics && project.metrics.length > 0 && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {project.metrics.map((metric) => (
                    <motion.div key={metric.label} variants={staggerChild} className="card-glass p-5">
                      <span className="text-label">{metric.label}</span>
                      <p className="text-heading mt-2 text-2xl">{metric.value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
          <div className="container-wide">
            <div className="divider mt-16" />
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="section-shell">
        <div className="container-wide">
          <div className="editorial-grid mb-12">
            <motion.div
              {...revealLeft}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-1"
            >
              <span className="section-number">04</span>
            </motion.div>
            <motion.div
              {...reveal}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-11"
            >
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">How it works</h2>
            </motion.div>
          </div>

          {project.visuals.diagram && (
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="card-glass overflow-hidden p-1"
            >
              <Image
                src={project.visuals.diagram}
                alt={`${project.name} system diagram`}
                width={1600}
                height={900}
                className="w-full"
              />
              <figcaption className="px-4 py-3 text-caption">System diagram</figcaption>
            </motion.figure>
          )}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
          >
            {project.architecture.map((item) => (
              <motion.div
                key={item}
                variants={staggerChild}
                className="card-glass px-5 py-4"
              >
                <span className="text-body text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="divider mt-16" />
        </div>
      </section>

      {/* Stack / Data Flow / Decisions */}
      <section className="section-shell">
        <div className="container-wide">
          <div className="editorial-grid mb-12">
            <motion.div
              {...revealLeft}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-1"
            >
              <span className="section-number">05</span>
            </motion.div>
            <motion.div
              {...reveal}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-11"
            >
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Details</h2>
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label mb-4 block">Stack</span>
              <ul className="space-y-3">
                {project.stack.map((s) => (
                  <li key={s} className="text-body text-sm">{s}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label mb-4 block">Data Flow</span>
              <ul className="space-y-3">
                {project.dataFlow.map((s) => (
                  <li key={s} className="text-body text-sm">{s}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label mb-4 block">Decisions</span>
              <ul className="space-y-3">
                {project.decisions.map((s) => (
                  <li key={s} className="text-body text-sm">{s}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <div className="divider mt-16" />
        </div>
      </section>

      {/* Interface */}
      {project.visuals.screenshot !== project.visuals.preview && (
      <section className="section-shell">
        <div className="container-wide">
          <div className="editorial-grid mb-12">
            <motion.div
              {...revealLeft}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-1"
            >
              <span className="section-number">06</span>
            </motion.div>
            <motion.div
              {...reveal}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-11"
            >
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Interface</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="card-glass overflow-hidden p-1"
          >
            <Image
              src={project.visuals.screenshot}
              alt={`${project.name} operational interface`}
              width={1600}
              height={900}
              className="w-full"
            />
            <p className="px-4 py-3 text-caption">Product interface screenshot</p>
          </motion.div>

          <div className="divider mt-16" />
        </div>
      </section>
      )}

      {/* Back link */}
      <section className="pb-20">
        <div className="container-wide flex justify-center">
          <Link
            href="/projects"
            className="group flex items-center gap-3 text-caption transition-colors duration-300 hover:text-fg-muted"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
            <span>All projects</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
