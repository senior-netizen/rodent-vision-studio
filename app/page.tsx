'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { StartProjectModal } from '@/components/contact/start-project-modal';
import { projectConfigs } from '@/data/projects';
import { labs } from '@/data/labs';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics/track';

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const sectionIds = ['about', 'services', 'projects', 'contact', 'labs', 'philosophy'];

const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const heroItem = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeCurve } } };
const revealMotion = { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-20%' }, transition: { duration: 0.8, ease: easeCurve } };

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [mobileServiceIndex, setMobileServiceIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const heroLines = useMemo(() => ['Engineering Digital', 'Infrastructure for Africa'], []);
  const serviceVisuals = ['art-gradient-dots', 'art-gradient-rainbow', 'art-teal', 'art-gradient-purple'];

  const heroRef = useRef<HTMLDivElement | null>(null);
  const marketplaceRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  const { scrollYProgress: marketplaceProgress } = useScroll({ target: marketplaceRef, offset: ['start end', 'end start'] });
  const stickyScale = useSpring(useTransform(marketplaceProgress, [0, 0.5, 1], [0.94, 1, 0.97]), { damping: 34, stiffness: 320 });
  const stickyY = useTransform(marketplaceProgress, [0, 1], [36, -24]);
  const stickyOpacity = useTransform(marketplaceProgress, [0, 0.12, 1], [0.35, 1, 0.9]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackEvent({ name: 'nav_click', metadata: { section: id } });
  };

  const nextMobileService = () => setMobileServiceIndex((prev) => (prev + 1) % services.length);
  const prevMobileService = () => setMobileServiceIndex((prev) => (prev - 1 + services.length) % services.length);

  const handleServiceTouchEnd = (endX: number) => {
    if (touchStartX === null) return;
    const delta = endX - touchStartX;
    if (delta > 50) prevMobileService();
    if (delta < -50) nextMobileService();
    setTouchStartX(null);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: easeCurve }}>
      <StartProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />

      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          height: scrolled ? 58 : 64,
          borderBottomColor: scrolled ? 'rgba(232, 232, 228, 1)' : 'rgba(232,232,228,0)',
        }}
        transition={{ duration: 0.6, ease: easeCurve }}
      >
        <button type="button" onClick={() => goToSection('about')} className="nav-logo" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <span className="logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" fill="#1ac99e" opacity="0.2" /><path d="M4 8L12 3L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" /><path d="M12 3V12M4 8L12 12L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" /></svg></span>
          Rodent, Inc.
        </button>
        <div className="nav-links">
          {sectionIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSection === id ? 'var(--dark)' : undefined }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="nav-icon" type="button" onClick={() => router.push('/blog')} aria-label="Go to blog">✎</button>
          <button className="nav-icon" type="button" onClick={() => router.push('/contact')} aria-label="Go to contact">⚙</button>
        </div>
      </motion.nav>

      <motion.div className="hero" ref={heroRef} variants={heroContainer} initial="hidden" animate="show" id="about">
        <h1>{heroLines.map((line, index) => (<span key={line} style={{ display: 'block', overflow: 'hidden' }}><motion.span style={{ display: 'block', willChange: 'transform, opacity' }} initial={{ y: '120%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} transition={{ duration: 0.9, ease: easeCurve, delay: 0.16 + index * 0.08 }}>{line}</motion.span></span>))}</h1>
        <motion.p className="hero-sub" variants={heroItem}>We design and build production-grade systems across web, mobile, IoT, and robotics—focused on performance, reliability, and real-world deployment.</motion.p>
        <motion.div className="hero-btns" variants={heroItem}>
          <button type="button" className="btn-primary" onClick={() => goToSection('projects')}>View Work</button>
          <button type="button" className="btn-ghost" onClick={() => setProjectModalOpen(true)}>Start a Project</button>
        </motion.div>
        <motion.div className="cards-fan" variants={heroItem} style={{ y: heroParallaxY, willChange: 'transform' }}>
          <span className="bubble teal bubble-1">Web Systems</span>
          <span className="bubble green bubble-2">Mobile Applications</span>
          {[1, 2, 3, 4, 5, 6].map((card, index) => (
            <motion.div key={card} className="fan-card" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ willChange: 'transform, opacity' }} custom={index} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="section-wrap" style={{ background: '#fafaf8', padding: '60px 2rem' }} {...revealMotion} id="philosophy">
        <div className="gateway">
          <div className="gateway-label">ABOUT RODENT, INC.</div>
          <div className="gateway-inner">
            <div className="gateway-text">
              <span className="gateway-bubble">Infrastructure Engineering</span>
              <h2>Rodent, Inc. builds infrastructure-level systems across software and hardware domains.</h2>
              <div className="gateway-controls">
                <button className="watch-btn" type="button" onClick={() => goToSection('services')}>Operate</button>
                <button className="ctrl-btn" type="button" onClick={() => setServiceIndex((prev) => (prev - 1 + services.length) % services.length)}>←</button>
                <button className="ctrl-btn" type="button" onClick={() => setServiceIndex((prev) => (prev + 1) % services.length)}>→</button>
              </div>
              <p style={{ marginTop: '0.8rem', fontSize: 13, color: 'var(--mid)' }}>Current focus: {services[serviceIndex].name}</p>
            </div>
            <motion.div className="gateway-img" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} />
          </div>
        </div>
      </motion.div>

      <motion.div className="marketplace-wrap" {...revealMotion} id="services" ref={marketplaceRef}>
        <div className="marketplace-inner">
          <div className="marketplace-header">
            <div className="mp-left"><div className="mp-label">SERVICES</div><h2>Engineering Pillars<br />for Deployment</h2><p className="mp-desc">Each service has a dedicated capability page and conversion flow.</p></div>
            <motion.div className="mp-right" style={{ position: 'sticky', top: 96, y: stickyY, scale: stickyScale, opacity: stickyOpacity, willChange: 'transform, opacity' }}>
              <button className="view-all-btn" type="button" onClick={() => router.push('/projects')}>View Work</button>
            </motion.div>
          </div>

          <div className="mp-grid mp-grid-desktop">
            {services.map((card, index) => (
              <motion.button key={card.slug} className="mp-card mp-card-large" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} style={{ willChange: 'transform', border: 'none', textAlign: 'left', cursor: 'pointer' }} onClick={() => router.push(`/services/${card.slug}`)}>
                <div className={serviceVisuals[index]} style={{ width: '100%', aspectRatio: '1.15' }} />
                <div className="mp-card-label">{card.name}</div>
              </motion.button>
            ))}
          </div>

          <div
            className="mp-carousel"
            onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={(event) => handleServiceTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            <button className="mp-carousel-arrow mp-carousel-arrow-left" type="button" onClick={prevMobileService} aria-label="Previous service">←</button>
            <motion.button
              key={services[mobileServiceIndex].slug}
              className="mp-card mp-card-large mp-card-mobile"
              initial={{ opacity: 0.7, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeCurve }}
              style={{ border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => router.push(`/services/${services[mobileServiceIndex].slug}`)}
            >
              <div className={serviceVisuals[mobileServiceIndex]} style={{ width: '100%', aspectRatio: '1.2' }} />
              <div className="mp-card-label">{services[mobileServiceIndex].name}</div>
            </motion.button>
            <button className="mp-carousel-arrow mp-carousel-arrow-right" type="button" onClick={nextMobileService} aria-label="Next service">→</button>
          </div>
        </div>
      </motion.div>

      <motion.div className="gallery-wrap" {...revealMotion} id="projects">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}><div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>PROJECTS</div><h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 800, letterSpacing: '-1.5px' }}>Our work is deployed in real environments.</h2></div>
        <div className="gallery-grid">
          {projectConfigs.map((project) => (
            <motion.button key={project.slug} className="g-card" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} onClick={() => router.push(`/projects/${project.slug}`)} style={{ border: 'none' }}>
              <div className="featured-overlay"><span className="name">{project.name}</span><div className="source">{project.problem}</div></div>
            </motion.button>
          ))}
          <motion.div className="g-card featured art-orange" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }}>
            <button className="like-btn" type="button" onClick={() => router.push('/labs')}>LABS</button>
            <div className="featured-overlay"><span className="tag">Internal research and system development focused on IoT, robotics, and intelligent infrastructure.</span></div>
          </motion.div>
        </div>
      </motion.div>

      <section id="labs" style={{ padding: '0 2rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Labs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
          {labs.map((lab) => (
            <Link key={lab.slug} href={`/labs/${lab.slug}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
              <strong>{lab.title}</strong>
              <p style={{ color: 'var(--mid)', fontSize: 14 }}>{lab.concept}</p>
            </Link>
          ))}
        </div>
      </section>

      <motion.footer {...revealMotion} id="contact">
        <h2>Build systems that operate at scale.</h2>
        <p>Rodent, Inc. delivers infrastructure that works.</p>
        <button className="footer-btn" type="button" onClick={() => setProjectModalOpen(true)}>Start a Project</button>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/projects/shedsense">Projects</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div style={{ marginTop: '2rem', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Rodent, Inc. All rights reserved.</div>
      </motion.footer>
    </motion.main>
  );
}
