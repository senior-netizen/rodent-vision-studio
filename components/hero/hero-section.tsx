'use client';

import { motion } from 'framer-motion';
import { SystemMapCanvas } from '@/components/system-map/system-map-canvas';
import { projectConfigs } from '@/data/projects';

const titleWords = ['Built', 'for', 'Real-World', 'Deployment'];

const cardTransforms = [
  { rotate: -12, x: -60, z: 1 },
  { rotate: -4, x: -20, z: 2 },
  { rotate: 3, x: 20, z: 3 },
  { rotate: 10, x: 55, z: 2 },
];

const cardGradients = [
  'from-emerald-500/80 to-emerald-700/90',
  'from-rose-500/80 to-rose-700/90',
  'from-zinc-400/80 to-zinc-600/90',
  'from-amber-400/80 to-orange-500/90',
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-white">
      {/* Background System Map */}
      <div className="absolute inset-0 opacity-20">
        <SystemMapCanvas mode="ambient" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 md:pb-24">
        <div className="container-wide">
          {/* Tilted Project Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex items-center justify-center md:mb-16"
          >
            <div className="relative flex items-center justify-center h-[200px] md:h-[260px] w-full max-w-[500px]">
              {projectConfigs.slice(0, 4).map((project, i) => {
                const t = cardTransforms[i];
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: t.rotate,
                      x: t.x,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.4 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute w-[120px] h-[170px] md:w-[150px] md:h-[210px] rounded-2xl shadow-2xl cursor-pointer group"
                    style={{ zIndex: t.z }}
                    whileHover={{ scale: 1.08, y: -10, zIndex: 10 }}
                  >
                    <div
                      className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${cardGradients[i]} p-4 flex flex-col justify-between overflow-hidden backdrop-blur-sm border border-white/10`}
                    >
                      {/* Category badge */}
                      <span className="self-end rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-md">
                        {project.category.split(' ')[0]}
                      </span>

                      {/* Project name */}
                      <div className="mt-auto">
                        <p className="text-sm md:text-base font-bold text-white/90 leading-tight drop-shadow-md">
                          {project.name}
                        </p>
                      </div>

                      {/* Decorative glow */}
                      <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

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
