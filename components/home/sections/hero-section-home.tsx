'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { easeCurve } from './home-section-motion';

const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const heroItem = { hidden: { opacity: 0, y: 50, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easeCurve } } };
const heroTechCards = [{ className: 'card-1', badge: 'MOBILE', title: 'Flutter + NestJS + PostgreSQL', details: ['Frontend: Flutter', 'Backend: NestJS', 'DB: PostgreSQL'], useCase: 'Property mgmt, booking & remittance' }] as const;

export function HomeHeroSection({ onStartProject, onViewWork }: { onStartProject: () => void; onViewWork: () => void }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <motion.div className="hero" ref={heroRef} variants={heroContainer} initial="hidden" animate="show" id="about">
      <div className="hero-content">
        <motion.h1 variants={heroItem}>We build infrastructure that deploys.</motion.h1>
        <motion.p variants={heroItem}>From fintech rails to IoT sensor grids — Rodent, Inc. engineers production-ready systems.</motion.p>
        <motion.div variants={heroItem} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.4rem' }}>
          <button className="btn-primary" type="button" onClick={onStartProject}>Start a Project</button>
          <button className="btn-ghost" type="button" onClick={onViewWork} style={{ border: '1px solid var(--border)', borderRadius: 100, padding: '12px 28px', background: '#fff' }}>View Our Work</button>
        </motion.div>
      </div>
      <motion.div className="cards-fan" variants={heroItem} style={{ y: heroParallaxY, willChange: 'transform' }}>
        {heroTechCards.map((card) => (
          <motion.div key={card.title} className={`fan-card ${card.className}`}>
            <div className="card-content"><span className="card-badge">{card.badge}</span><div className="card-inner"><div className="card-art-text card-stack-title">{card.title}</div></div></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
