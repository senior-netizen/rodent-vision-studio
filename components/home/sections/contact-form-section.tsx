'use client';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/contact-form';
import { easeCurve } from './home-section-motion';

export function ContactFormSection() {
  return <motion.section id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.9, ease: easeCurve }} style={{ background: 'linear-gradient(160deg, #0e0e10 0%, #17161c 60%, #1c1a26 100%)', color: '#fff', padding: '7rem 1.25rem' }}><div className="contact-grid"><ContactForm fullInquiry variant="dark" source="homepage_inquiry" /></div></motion.section>;
}
