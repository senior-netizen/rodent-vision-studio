'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectConfig } from '@/data/projects';
import { reveal, revealLeft, stagger, staggerChild } from '@/lib/animations/reveal';

export function CaseStudyPage({ project }: { project: ProjectConfig }) {
  const deployments = project.deployments ?? [];
  const projectStatus = project.status ?? 'staging';
  const [selectedVersion, setSelectedVersion] = useState(deployments[0]?.version ?? '');
  const selectedDeployment = useMemo(
    () => deployments.find((deployment) => deployment.version === selectedVersion) ?? deployments[0],
    [deployments, selectedVersion],
  );

  const statusTone = {
    live: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
    staging: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    failed: 'border-rose-400/40 bg-rose-500/10 text-rose-300',
  } as const;

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
              src={project.visuals.preview}
              alt={`${project.name} project preview`}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <Link
              href="/"
              className="text-caption transition-colors duration-300 hover:text-fg-muted"
            >
              ← Back
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
            <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] ${statusTone[projectStatus]}`}>
              {projectStatus}
            </span>
            {project.previewGeneratedAt && (
              <span className="text-body text-xs">
                Preview generated {new Date(project.previewGeneratedAt).toLocaleString()}
              </span>
            )}
          </div>

          {(project.links.live || project.links.repo) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-4 py-2 text-caption transition-colors duration-300 hover:border-border-hover hover:text-fg-muted"
                >
                  Visit live project
                </Link>
              )}
              {project.links.repo && (
                <Link
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-4 py-2 text-caption transition-colors duration-300 hover:border-border-hover hover:text-fg-muted"
                >
                  View source repository
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
            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label">Timeline</span>
              <p className="text-body mt-3 text-sm">{project.summary.timeline}</p>
            </motion.div>
            <motion.div variants={staggerChild} className="card-glass p-6">
              <span className="text-label">Primary KPI</span>
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

      {/* Architecture */}
      <section className="section-shell">
        <div className="container-wide">
          <div className="editorial-grid mb-12">
            <motion.div
              {...revealLeft}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-1"
            >
              <span className="section-number">02</span>
            </motion.div>
            <motion.div
              {...reveal}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-11"
            >
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Architecture</h2>
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
              src={project.visuals.diagram}
              alt={`${project.name} architecture diagram`}
              width={1600}
              height={900}
              className="w-full"
            />
          </motion.div>

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
              <span className="section-number">03</span>
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

      {/* Deployments */}
      <section className="section-shell">
        <div className="container-wide">
          <div className="editorial-grid mb-8">
            <motion.div
              {...revealLeft}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-1"
            >
              <span className="section-number">04</span>
            </motion.div>
            <motion.div {...reveal} viewport={{ once: true }} className="col-span-12 md:col-span-11">
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Deployments</h2>
            </motion.div>
          </div>

          {deployments.length > 1 && (
            <label className="text-label mb-4 block">
              Version
              <select
                value={selectedVersion}
                onChange={(event) => setSelectedVersion(event.target.value)}
                className="mt-2 w-full max-w-sm rounded-md border border-border bg-transparent px-3 py-2 text-sm text-fg"
              >
                {deployments.map((deployment) => (
                  <option key={deployment.version} value={deployment.version} className="bg-[#0d0d10]">
                    {deployment.version}
                  </option>
                ))}
              </select>
            </label>
          )}

          {selectedDeployment && (
            <div className="card-glass mb-6 flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-body text-sm">Selected deployment</p>
                <p className="text-label mt-1">{selectedDeployment.version}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.12em] ${statusTone[selectedDeployment.status]}`}>
                  {selectedDeployment.status}
                </span>
                <Link
                  href={selectedDeployment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-3 py-1.5 text-caption transition-colors duration-300 hover:border-border-hover hover:text-fg-muted"
                >
                  Open version
                </Link>
              </div>
            </div>
          )}

          <ul className="space-y-3">
            {deployments.map((deployment) => (
              <li key={`${deployment.version}-${deployment.createdAt}`} className="card-glass flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-label">{deployment.version}</p>
                  <p className="text-body mt-1 text-xs">{new Date(deployment.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.12em] ${statusTone[deployment.status]}`}>
                    {deployment.status}
                  </span>
                  <Link href={deployment.url} target="_blank" rel="noreferrer" className="text-caption hover:text-fg-muted">
                    Visit
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="divider mt-16" />
        </div>
      </section>

      {/* Interface */}
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
          </motion.div>

          <div className="divider mt-16" />
        </div>
      </section>

      {/* Outcome */}
      <section className="section-shell">
        <div className="container-wide editorial-grid">
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
            className="col-span-12 md:col-span-4"
          >
            <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Outcome</h2>
          </motion.div>
          <motion.div
            {...reveal}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7"
          >
            <p className="text-body text-lg leading-relaxed">{project.outcome}</p>
          </motion.div>
        </div>
      </section>

      {/* Back link */}
      <section className="pb-20">
        <div className="container-wide flex justify-center">
          <Link
            href="/"
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
            <span>All Systems</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
