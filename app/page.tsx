'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MarketplaceControls } from '@/components/home/marketplace-controls';

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCurve },
  },
};

const revealMotion = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20%' },
  transition: { duration: 0.8, ease: easeCurve },
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const heroLines = useMemo(() => ['Engineering Digital', 'Infrastructure for Africa'], []);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const marketplaceRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  const { scrollYProgress: marketplaceProgress } = useScroll({
    target: marketplaceRef,
    offset: ['start end', 'end start'],
  });

  const stickyScale = useSpring(useTransform(marketplaceProgress, [0, 0.5, 1], [0.94, 1, 0.97]), {
    damping: 34,
    stiffness: 320,
  });
  const stickyY = useTransform(marketplaceProgress, [0, 1], [36, -24]);
  const stickyOpacity = useTransform(marketplaceProgress, [0, 0.12, 1], [0.35, 1, 0.9]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeCurve }}
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          height: scrolled ? 58 : 64,
          borderBottomColor: scrolled ? 'rgba(232, 232, 228, 1)' : 'rgba(232,232,228,0)',
        }}
        transition={{ duration: 0.6, ease: easeCurve }}
      >
        <a href="#" className="nav-logo">
          <span className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" fill="#1ac99e" opacity="0.2" />
              <path d="M4 8L12 3L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 3V12M4 8L12 12L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          Rodent, Inc.
        </a>
        <div className="nav-links">
          <a href="#">About</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="nav-dot" />Services
          </a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
          <a href="#">Labs</a>
          <a href="#">Philosophy</a>
        </div>
        <div className="nav-actions">
          <div className="nav-icon">✎</div>
          <div className="nav-icon">⚙</div>
        </div>
      </motion.nav>

      <motion.div className="hero" ref={heroRef} variants={heroContainer} initial="hidden" animate="show">
        <h1>
          {heroLines.map((line, index) => (
            <span key={line} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block', willChange: 'transform, opacity' }}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: easeCurve, delay: 0.16 + index * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" variants={heroItem}>We design and build production-grade systems across web, mobile, IoT, and robotics—focused on performance, reliability, and real-world deployment.</motion.p>
        <motion.div className="hero-btns" variants={heroItem}>
          <a href="#" className="btn-primary">View Work</a>
          <a href="#" className="btn-ghost">Start a Project</a>
        </motion.div>
        <motion.div className="cards-fan" variants={heroItem} style={{ y: heroParallaxY, willChange: 'transform' }}>
          <span className="bubble teal bubble-1">Web Systems</span>
          <span className="bubble green bubble-2">Mobile Applications</span>
          {[1, 2, 3, 4, 5, 6].map((card, index) => (
            <motion.div
              key={card}
              className="fan-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: easeCurve }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ willChange: 'transform, opacity' }}
              custom={index}
            >
              {card === 1 && <div className="art-1 art-shape"><div className="art-text" style={{ fontSize: 40, opacity: 0.3 }}>★</div></div>}
              {card === 2 && <div className="art-2 art-shape"><div className="art-text" style={{ color: '#999', fontSize: 18 }}>IoT Systems</div></div>}
              {card === 3 && <div className="art-3 art-shape"><div className="art-text">Robotics</div></div>}
              {card === 4 && <div className="art-4 art-shape"><div className="art-text" style={{ fontSize: 20 }}>DEPLOY<br /><small style={{ fontSize: 12 }}>OPS</small></div></div>}
              {card === 5 && <div className="art-5 art-shape"><div className="art-text" style={{ fontSize: 16 }}>REAL<br />LOAD</div></div>}
              {card === 6 && <div className="art-6 art-shape"><div className="art-text" style={{ fontSize: 48 }}>♣</div></div>}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="section-wrap" style={{ background: '#fafaf8', padding: '60px 2rem' }} {...revealMotion}>
        <div className="gateway">
          <div className="gateway-label">ABOUT RODENT, INC.</div>
          <div className="gateway-inner">
            <div className="gateway-text">
              <span className="gateway-bubble">Infrastructure Engineering</span>
              <h2>Rodent, Inc. builds infrastructure-level systems across software and hardware domains.</h2>
              <div className="gateway-controls">
                <button className="watch-btn">Operate</button>
                <button className="ctrl-btn">←</button>
                <button className="ctrl-btn">→</button>
              </div>
            </div>
            <motion.div className="gateway-img" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }}>
              <motion.div className="art-gradient-warm" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: easeCurve }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', willChange: 'transform' }}>
                <svg width="200" height="300" viewBox="0 0 200 300" style={{ position: 'absolute' }}>
                  <ellipse cx="100" cy="80" rx="50" ry="60" fill="rgba(0,0,0,0.15)" />
                  <rect x="60" y="140" width="80" height="120" rx="10" fill="rgba(0,0,0,0.1)" />
                </svg>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 80, fontWeight: 800, color: 'rgba(255,255,255,0.2)', userSelect: 'none' }}>★</div>
              </motion.div>
              <div className="gateway-logo-overlay">
                <div className="logo-sq"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" fill="none" stroke="#111" strokeWidth="2" /></svg></div>
                <div className="logo-sq logo-sq-dark"><svg width="20" height="20" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="#fff" /></svg></div>
              </div>
              <div className="dots-overlay">
                <div className="dot-ind active" />
                <div className="dot-ind active" />
                <div className="dot-ind" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div className="community-wrap" {...revealMotion}>
        <div className="avatar-row top-row">
          <div className="avatar-card art-7" />
          <div className="avatar-card art-8" />
          <div className="avatar-card" style={{ background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 9, fontWeight: 600, color: '#888', textAlign: 'center', padding: 4 }}>WEB<br />SYSTEMS</span></div>
          <div className="avatar-card art-9" />
          <div className="avatar-card art-10" />
          <div className="avatar-card art-11" />
          <div className="avatar-card" style={{ background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: '#f57c00' }}>IOT</span></div>
          <div className="avatar-card art-12" />
          <div className="avatar-card art-gradient-purple" />
          <div className="avatar-card art-teal" />
        </div>

        <div className="community-icon">🐦</div>
        <h2>We engineer systems that run in real environments.</h2>
        <p>We engineer web platforms, mobile applications, connected devices, and robotic systems designed to operate in real environments. Our focus is not on prototypes. We build systems that run.</p>

        <div className="avatar-row bottom-row">
          <div className="avatar-card art-1" />
          <div className="avatar-card" style={{ background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: '#1b5e20', lineHeight: 1.1, textAlign: 'center' }}>MOBILE</span></div>
          <div className="avatar-card" style={{ background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#e91e63' }}>APPS</span></div>
          <div className="avatar-card art-dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="40" height="40" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="#4a90e2" /><path d="M15 30 Q25 15 35 30" stroke="#fff" strokeWidth="3" fill="none" /></svg></div>
          <div className="avatar-card art-gradient-dots" />
          <div className="avatar-card art-gradient-rainbow" />
          <div className="avatar-card art-8" />
          <div className="avatar-card art-7" />
          <div className="avatar-card art-9" />
          <div className="avatar-card art-gradient-warm" />
        </div>
      </motion.div>

      <motion.div ref={marketplaceRef} className="marketplace-wrap" {...revealMotion}>
        <div className="marketplace-inner">
          <div className="marketplace-header">
            <div className="mp-left">
              <div className="mp-label">SERVICES</div>
              <h2>Engineering Pillars<br />for Deployment</h2>
              <p className="mp-desc">1. Web Systems — Custom platforms, dashboards, and APIs engineered for scale, security, and performance. 2. Mobile Applications — Production-grade mobile systems designed for reliability and operational use. 3. IoT Systems — Connected infrastructure for monitoring, automation, and real-time data processing. 4. Robotics & Automation — Integrated hardware and software systems that automate physical operations.</p>
              <div className="mp-nav">
                <MarketplaceControls />
              </div>
            </div>
            <motion.div className="mp-right" style={{ position: 'sticky', top: 96, y: stickyY, scale: stickyScale, opacity: stickyOpacity, willChange: 'transform, opacity' }}>
              <button className="view-all-btn">View Work</button>
            </motion.div>
          </div>
          <div className="mp-grid">
            {[
              { label: 'Web Systems', content: <div className="art-gradient-dots" style={{ width: '100%', aspectRatio: '1' }} />, progress: true },
              { label: 'Mobile Applications', content: <div className="art-gradient-rainbow" style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '60%', height: '60%', background: 'white', borderRadius: '50%', opacity: 0.15 }} /></div> },
              { label: 'IoT Systems', content: <div style={{ background: 'linear-gradient(135deg,#fff9c4,#4caf50,#ff5722)', width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 50 }}>🦋</div></div> },
              { label: 'Robotics & Automation', content: <div style={{ background: 'linear-gradient(135deg,#1565c0,#e91e63,#ff9800)', width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 50 }}>🎭</div></div> },
            ].map((card) => (
              <motion.div key={card.label} className="mp-card" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} style={{ willChange: 'transform' }}>
                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: easeCurve }} style={{ willChange: 'transform' }}>
                  {card.content}
                </motion.div>
                <div className="mp-card-label">{card.label}</div>
                {card.progress ? <div className="mp-progress" /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className="gallery-wrap" {...revealMotion}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>PROJECTS</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 800, letterSpacing: '-1.5px' }}>Our work is deployed in real environments—energy, infrastructure, logistics, and enterprise systems. Each project is engineered for function, not presentation.</h2>
        </div>
        <div className="gallery-grid">
          {['art-7', 'art-dark', 'art-gradient-rainbow', '', 'art-teal', 'art-1', 'art-8'].map((styleClass, index) => (
            <motion.div key={`g-a-${index}`} className={`g-card ${styleClass}`.trim()} whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} style={{ background: styleClass ? undefined : 'linear-gradient(135deg,#1a1a2e,#e53935)', display: styleClass === 'art-dark' ? 'flex' : undefined, alignItems: styleClass === 'art-dark' ? 'center' : undefined, justifyContent: styleClass === 'art-dark' ? 'center' : undefined, willChange: 'transform' }}>
              {styleClass === 'art-dark' ? <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800 }}>★</span> : null}
            </motion.div>
          ))}
          <motion.div className="g-card featured art-orange" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} style={{ willChange: 'transform' }}>
            <button className="like-btn">LABS</button>
            <div className="featured-overlay">
              <span className="tag">Internal research and system development focused on IoT, robotics, and intelligent infrastructure.</span>
              <div className="name">Concepts developed here are transitioned into production systems.</div>
              <div className="source">We do not build for aesthetics. We build for operation. Every system is designed to: perform under load, operate continuously, scale without failure.</div>
            </div>
          </motion.div>
          {['art-gradient-purple', 'art-11', 'art-12', 'art-9', 'art-gradient-warm', 'art-10', 'art-gradient-dots'].map((styleClass, index) => (
            <motion.div key={`g-b-${index}`} className={`g-card ${styleClass}`} whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }} style={{ willChange: 'transform' }} />
          ))}
        </div>
      </motion.div>

      <motion.footer {...revealMotion}>
        <h2>Build systems that operate at scale.</h2>
        <p>Rodent, Inc. delivers infrastructure that works.</p>
        <button className="footer-btn">Start a Project</button>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
          <a href="#">Labs</a>
          <a href="#">Philosophy</a>
        </div>
        <div style={{ marginTop: '2rem', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Rodent, Inc. All rights reserved.</div>
      </motion.footer>
    </motion.main>
  );
}
