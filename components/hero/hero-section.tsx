'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SystemMapCanvas } from '@/components/system-map/system-map-canvas';

const titleWords = ['Built', 'for', 'Real-World', 'Deployment'];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/visuals/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[hsl(var(--bg)/0.6)]" />
      </div>

      {/* Background System Map */}
      <div className="absolute inset-0 opacity-20">
        <SystemMapCanvas mode="ambient" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--bg)/0.4)] via-transparent to-[hsl(var(--bg))]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 md:pb-24">
        <div className="container-wide">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="h-px w-10 bg-accent" />
            <span className="text-label">Infrastructure Systems</span>
          </motion.div>

          {/* Title - word by word reveal */}
          <h1 className="text-display text-[clamp(3rem,9vw,8rem)] max-w-[18ch]">
            {titleWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', rotateX: -40 }}
                  animate={{ y: '0%', rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle + scroll hint */}
          <div className="mt-10 flex items-end justify-between md:mt-16">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-body max-w-md text-base"
            >
              Systems architecture studio delivering infrastructure-grade
              telemetry, controls, payments, and command surfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="hidden flex-col items-center gap-2 md:flex"
            >
              <span className="text-caption">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="h-8 w-px bg-fg-dim"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom border line animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-border"
      />
    </section>
  );
}
