'use client';

import { motion } from 'framer-motion';
import { SystemMapCanvas } from '@/components/system-map/system-map-canvas';
import { reveal } from '@/lib/animations/reveal';

export function SystemLayerSection() {
  return (
    <section id="systems" className="section-shell relative">
      <div className="container-wide">
        {/* Section Header */}
        <div className="editorial-grid mb-16">
          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-1"
          >
            <span className="section-number">04</span>
          </motion.div>

          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-6"
          >
            <h2 className="text-heading text-[clamp(2.5rem,5vw,4.5rem)]">
              System
              <br />
              <span className="text-fg-muted">Layer</span>
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
              Interactive infrastructure topology linking edge telemetry,
              API surfaces, payment rails, and command dashboards.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="divider-accent mb-12 origin-left"
        />

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-50px' }}
          className="card-glass h-[65vh] min-h-[500px] overflow-hidden"
        >
          <SystemMapCanvas mode="interactive" />
        </motion.div>
      </div>
    </section>
  );
}
