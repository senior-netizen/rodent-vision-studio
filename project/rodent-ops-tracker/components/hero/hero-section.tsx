'use client';

import { motion } from '@/vendor/framer-motion';
import { revealUp } from '@/lib/animations/reveal';
import { HeroSystemViz } from './hero-system-viz';

export function HeroSection() {
  return (
    <section className="relative min-h-screen border-b border-white/10 overflow-hidden">
      <HeroSystemViz />
      <div className="relative mx-auto grid min-h-screen max-w-grid grid-cols-12 gap-6 px-6 py-24 lg:px-10">
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
          <motion.p
            className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-muted"
            variants={revealUp}
            initial="hidden"
            animate="visible"
          >
            Infrastructure Systems
          </motion.p>
          <motion.h1
            className="font-sans text-display text-foreground"
            variants={revealUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Built for Real-World Deployment
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
