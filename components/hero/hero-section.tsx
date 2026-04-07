'use client';

import { motion } from 'framer-motion';
import { SystemMapCanvas } from '@/components/system-map/system-map-canvas';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-secondary/20">
      <SystemMapCanvas mode="ambient" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 lg:px-12">
        <div className="system-grid w-full">
          <div className="col-span-12 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-mono text-sm uppercase tracking-[0.18em] text-accent"
            >
              Infrastructure Systems
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 text-[clamp(3.5rem,8vw,7rem)] font-semibold uppercase leading-[0.95]"
            >
              Built for Real-World Deployment
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}
