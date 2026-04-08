'use client';

import { motion } from 'framer-motion';
import { impactMetrics } from '@/data/metrics';
import { reveal, stagger, staggerChild } from '@/lib/animations/reveal';

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="section-shell pt-16 md:pt-20">
      <div className="container-wide">
        <motion.div
          {...reveal}
          viewport={{ once: true }}
          className="mb-10 flex items-center justify-between gap-8 border-t border-border pt-8 md:pt-10"
        >
          <h2 className="text-heading text-[clamp(1.8rem,3.5vw,3rem)]">Impact Snapshot</h2>
          <span className="text-label hidden md:block">Measured outcomes</span>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {impactMetrics.map((metric) => (
            <motion.div key={metric.label} variants={staggerChild} className="card-glass p-6">
              <p className="font-display text-[clamp(2rem,5vw,2.8rem)] leading-none">{metric.value}</p>
              <p className="text-label mt-4 text-[0.62rem] text-accent">{metric.label}</p>
              <p className="text-body mt-3 text-sm">{metric.context}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
