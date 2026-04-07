'use client';

import { motion } from 'framer-motion';
import { reveal } from '@/lib/animations/reveal';

export function ContactSection() {
  return (
    <section id="contact" className="section-shell relative">
      <div className="container-wide">
        {/* Section Header */}
        <div className="editorial-grid mb-16">
          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-1"
          >
            <span className="section-number">03</span>
          </motion.div>

          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-11"
          >
            <h2 className="text-display text-[clamp(2.5rem,6vw,5.5rem)] max-w-[16ch]">
              Build the next
              <br />
              <span className="shimmer-text">operational layer.</span>
            </h2>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="card-glass p-8 md:p-12 lg:p-16"
        >
          <div className="editorial-grid">
            <div className="col-span-12 md:col-span-7">
              <p className="text-body text-lg leading-relaxed max-w-xl">
                Structured for infrastructure-grade delivery: telemetry,
                controls, payments, and command surfaces. Let&apos;s discuss
                how we can build your next system.
              </p>
            </div>
            <div className="col-span-12 flex flex-col items-start justify-end gap-6 md:col-span-5 md:items-end">
              <a
                href="mailto:contact@rodent.systems"
                className="group flex items-center gap-3 transition-all duration-300"
              >
                <span className="text-label text-accent group-hover:tracking-[0.22em] transition-all duration-500">
                  contact@rodent.systems
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <span className="text-caption">
            © {new Date().getFullYear()} Rodent Vision Studio
          </span>
          <span className="text-caption">
            Designed & engineered with precision
          </span>
        </div>
      </div>
    </section>
  );
}
