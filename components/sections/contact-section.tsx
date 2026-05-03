'use client';

import { motion } from 'framer-motion';
import { reveal } from '@/lib/animations/reveal';

export function ContactSection() {
  return (
    <section id="contact" className="section-shell relative overflow-hidden">
      {/* Background — pure CSS gradient, no AI imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 20%, hsl(var(--accent)/0.12) 0%, transparent 60%), radial-gradient(50% 40% at 80% 70%, hsl(var(--accent)/0.08) 0%, transparent 65%), linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--bg)/0.85) 50%, hsl(var(--bg)) 100%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="editorial-grid mb-16">
          <motion.div
            {...reveal}
            viewport={{ once: true, margin: '-100px' }}
            className="col-span-12 md:col-span-1"
          >
            <span className="section-number">05</span>
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
              <div className="flex flex-col items-start gap-4 md:items-end">
                <span className="text-label text-lg">Anesu Ndava</span>
                <a
                  href="mailto:ndabaprinco@gmail.com"
                  className="group flex items-center gap-3 transition-all duration-300"
                >
                  <span className="text-label text-accent group-hover:tracking-[0.22em] transition-all duration-500">
                    ndabaprinco@gmail.com
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
                <a
                  href="mailto:anesu@rodent.co.zw"
                  className="group flex items-center gap-3 transition-all duration-300"
                >
                  <span className="text-label text-accent group-hover:tracking-[0.22em] transition-all duration-500">
                    anesu@rodent.co.zw
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
                <div className="flex flex-col gap-1 md:items-end">
                  <span className="text-caption">+263 78 700 8238</span>
                  <span className="text-caption">+253 78 528 6530</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <span className="text-caption">
            © {new Date().getFullYear()} Rodent, Inc.
          </span>
          <span className="text-caption">
            Designed & engineered with precision
          </span>
        </div>
      </div>
    </section>
  );
}
