'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { StartProjectModal } from '@/components/contact/start-project-modal';
import { trackEvent } from '@/lib/analytics/track';
import { easeCurve } from '@/components/home/sections/home-section-motion';
import { HomeHeroSection } from '@/components/home/sections/hero-section-home';
import { ProofBarSection } from '@/components/home/sections/proof-bar-section';
import { ServicesListSection } from '@/components/home/sections/services-list-section';
import { ProjectsCaseStudiesSection } from '@/components/home/sections/projects-case-studies-section';
import { LabsSensorGridSection } from '@/components/home/sections/labs-sensor-grid-section';
import { ContactFormSection } from '@/components/home/sections/contact-form-section';

const sectionIds = ['about', 'services', 'projects', 'contact', 'labs', 'philosophy'];

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackEvent({ name: 'nav_click', metadata: { section: id } });
    setMobileNavOpen(false);
    setActiveSection(id);
  };

  return (<motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: easeCurve }}>
    <StartProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    <motion.nav animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)' }} transition={{ duration: 0.6, ease: easeCurve }}>
      <div className="nav-links">{sectionIds.map((id) => <button key={id} type="button" onClick={() => goToSection(id)} style={{ color: activeSection === id ? 'var(--dark)' : undefined }}>{id}</button>)}</div>
    </motion.nav>
    <AnimatePresence>{mobileNavOpen && <motion.div className="mobile-nav-panel" />}</AnimatePresence>

    <HomeHeroSection onStartProject={() => setProjectModalOpen(true)} onViewWork={() => goToSection('projects')} />
    <ProofBarSection onServices={() => goToSection('services')} />
    <ServicesListSection onOpenService={(slug) => router.push(`/services/${slug}`)} />
    <ProjectsCaseStudiesSection onOpenProject={(id) => router.push(`/projects/${id}`)} />
    <LabsSensorGridSection />
    <ContactFormSection />

    <motion.footer><h2>Build systems that operate at scale.</h2><p>Rodent, Inc. delivers infrastructure that works.</p><button className="footer-btn" type="button" onClick={() => setProjectModalOpen(true)}>Start a Project</button><div className="footer-links"><Link href="/privacy">Privacy</Link></div></motion.footer>
  </motion.main>);
}
