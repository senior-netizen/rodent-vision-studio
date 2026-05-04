'use client';
import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { revealMotion, easeCurve } from './home-section-motion';

export function ProofBarSection({ onServices }: { onServices: () => void }) {
  return <motion.div className="section-wrap" style={{ background: '#fafaf8', padding: '60px 2rem' }} {...revealMotion} id="philosophy"><div className="gateway"><div className="gateway-label">ABOUT RODENT, INC.</div><div className="gateway-inner"><div className="gateway-text"><h2>Rodent, Inc. builds infrastructure-level systems across software and hardware domains.</h2><div className="gateway-controls"><button className="watch-btn" type="button" onClick={onServices}>Operate</button></div><p style={{ marginTop: '0.8rem', fontSize: 13, color: 'var(--mid)' }}>Capabilities: {services.length}</p></div><motion.div className="gateway-img" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} /></div></div></motion.div>;
}
