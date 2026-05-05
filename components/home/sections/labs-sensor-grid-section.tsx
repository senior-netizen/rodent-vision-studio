'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { labs } from '@/data/labs';
import { revealMotion, slideInLeft } from './home-section-motion';

export function LabsSensorGridSection() {
  return <motion.section id="labs" style={{ padding: '0 2rem 4rem', maxWidth: 1100, margin: '0 auto' }} {...revealMotion}><motion.h2 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }} {...slideInLeft}>Labs</motion.h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>{labs.map((lab)=><Link key={lab.slug} href={`/labs/${lab.slug}`}>{lab.name}</Link>)}</div></motion.section>;
}
