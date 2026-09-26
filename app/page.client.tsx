'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { StartProjectModal } from '@/components/contact/start-project-modal';
import { ContactForm } from '@/components/contact/contact-form';
import { projects } from '@/data/projects';
import { labs } from '@/data/labs';
import { services } from '@/data/services';
import { contact, contactEmailHref } from '@/data/contact';
import { trackEvent } from '@/lib/analytics/track';

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];
const sectionIds = ['services', 'projects', 'labs'];
const founders = [
  {
    name: 'Anesu Prince Ndava',
    summary: 'Anesu’s background combines software development and electronic engineering. His portfolio includes ShedSense, Precise Locations, AR by Rodent, and Feel At Home.',
  },
  {
    name: 'Vulan Anotidaishe K Machiri',
    summary: 'Vulan brings a background in millwright work, industrial maintenance, and electrical systems, complementing the team’s software and electronics capabilities.',
  },
] as const;

const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const heroItem = { hidden: { opacity: 0, y: 50, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easeCurve } } };
const revealMotion = { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-15%' }, transition: { duration: 0.9, ease: easeCurve } };
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const staggerItem = { hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easeCurve } } };
const slideInLeft = { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-15%' }, transition: { duration: 0.8, ease: easeCurve } };
const scaleReveal = { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: '-10%' }, transition: { duration: 1, ease: easeCurve } };
const heroTechCards = [
  {
    className: 'card-1',
    badge: 'MOBILE',
    title: 'Mobile tools for daily work',
    details: ['Bookings and records', 'Staff workflows', 'Flutter, NestJS, PostgreSQL'],
    useCase: 'Capture and manage work away from a desk',
  },
  {
    className: 'card-2',
    badge: 'MVP',
    title: 'Focused product prototypes',
    details: ['Sign-in and permissions', 'Notifications', 'Flutter and Firebase'],
    useCase: 'Test a useful first version before expanding it',
  },
  {
    className: 'card-3',
    badge: 'SAAS',
    title: 'Web platforms and internal tools',
    details: ['Dashboards', 'Business workflows', 'React, Node.js, databases'],
    useCase: 'Put shared information and actions in one place',
  },
  {
    className: 'card-4',
    badge: 'CMS',
    title: 'Websites your team can manage',
    details: ['Publishing tools', 'Admin access', 'Laravel and MySQL'],
    useCase: 'Keep public information current without code changes',
  },
  {
    className: 'card-5',
    badge: 'IOT',
    title: 'Connected monitoring systems',
    details: ['Sensor readings', 'Alerts and history', 'ESP32, Node.js, React'],
    useCase: 'See what equipment is reporting and respond',
  },
  {
    className: 'card-6',
    badge: 'ENTERPRISE',
    title: 'Business platforms',
    details: ['Customer accounts', 'Media and payments', 'ASP.NET and PostgreSQL'],
    useCase: 'Run multi-step services through one system',
  },
] as const;

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [mobileServiceIndex, setMobileServiceIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  const [projectTouchStartX, setProjectTouchStartX] = useState<number | null>(null);
  const activeService = services[serviceIndex];
  const serviceVisuals: Record<string, { className: string; imageSrc?: string; imageAlt?: string }> = {
    web: { className: 'art-gradient-dots', imageSrc: '/visuals/service-web.jpg', imageAlt: 'Web systems dashboard preview' },
    mobile: { className: 'art-gradient-rainbow', imageSrc: '/visuals/service-mobile.jpg', imageAlt: 'Mobile application preview' },
    iot: { className: 'art-teal', imageSrc: '/visuals/service-iot.jpg', imageAlt: 'IoT sensor device' },
    robotics: { className: 'art-gradient-purple', imageSrc: '/visuals/service-robotics.jpg', imageAlt: 'Robotics arm in lab' },
  };

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
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
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
    setMobileNavOpen(false);
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

  const nextMobileProject = () => setMobileProjectIndex((prev) => (prev + 1) % projects.length);
  const prevMobileProject = () => setMobileProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleProjectTouchEnd = (endX: number) => {
    if (projectTouchStartX === null) return;
    const delta = endX - projectTouchStartX;
    if (delta > 50) prevMobileProject();
    if (delta < -50) nextMobileProject();
    setProjectTouchStartX(null);
  };

  return (
    <motion.main className="home-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: easeCurve }}>
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
        <div role="button" tabIndex={0} onClick={() => goToSection('about')} onKeyDown={(e) => e.key === 'Enter' && goToSection('about')} className="nav-logo" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <Image src="/rodent-logo.png" alt="Rodent logo" width={28} height={28} style={{ borderRadius: '50%' }} />
          Rodent
        </div>
        <div className="nav-desktop-group">
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
            <button className="nav-icon" type="button" onClick={() => router.push('/about')} aria-label="Go to about" style={{ fontSize: 12, fontWeight: 600, width: 'auto', padding: '0 12px' }}>About</button>
            <button className="nav-icon" type="button" onClick={() => router.push('/blog')} aria-label="Go to blog" style={{ fontSize: 12, fontWeight: 600 }}>Blog</button>
            <button className="nav-icon" type="button" onClick={() => router.push('/contact')} aria-label="Go to contact" style={{ fontSize: 12, fontWeight: 600, width: 'auto', padding: '0 12px' }}>Contact</button>
          </div>
        </div>
        <button className="nav-mobile-toggle" type="button" onClick={() => setMobileNavOpen((prev) => !prev)} aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}>
          {mobileNavOpen ? '✕' : '☰'}
        </button>
      </motion.nav>
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: easeCurve }}
          >
            {sectionIds.map((id) => (
              <button key={id} type="button" onClick={() => goToSection(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="mobile-nav-actions">
              <button type="button" onClick={() => { setMobileNavOpen(false); router.push('/about'); }}>About</button>
              <button type="button" onClick={() => { setMobileNavOpen(false); router.push('/blog'); }}>Blog</button>
              <button type="button" onClick={() => { setMobileNavOpen(false); router.push('/contact'); }}>Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="hero" ref={heroRef} variants={heroContainer} initial="hidden" animate="show" id="about">
        <div className="hero-content">
          <motion.h1 variants={heroItem}>Software and connected systems built around your business.</motion.h1>
          <motion.p variants={heroItem}>
            We build web platforms, mobile applications, and connected systems that help businesses manage their daily work.
          </motion.p>
          <motion.p variants={heroItem} className="hero-company-line">
            A division of Squirrellabs Technologies (Private) Limited.
          </motion.p>
          <motion.div variants={heroItem} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.4rem' }}>
            <button className="btn-primary" type="button" onClick={() => setProjectModalOpen(true)}>
              Start a Project
            </button>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => goToSection('projects')}
              style={{ border: '1px solid var(--border)', borderRadius: 100, padding: '12px 28px', background: '#fff' }}
            >
              View Our Work
            </button>
          </motion.div>
        </div>

        <motion.div className="cards-fan" variants={heroItem} style={{ y: heroParallaxY, willChange: 'transform' }}>
          <span className="floating-badge floating-badge-coplin">@KwikSend • Flutter/Nest</span>
          <span className="floating-badge floating-badge-andree">@ShedSense • ESP32/WS</span>

          {heroTechCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`fan-card ${card.className}`}
              initial={{ opacity: 0, y: 40, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, ease: easeCurve, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="card-content">
                <span className="card-badge">{card.badge}</span>
                <div className="card-inner">
                  <div className="card-art-text card-stack-title">{card.title}</div>
                  <div className="card-stack-list">
                    {card.details.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <p className="card-stack-use">{card.useCase}</p>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>
      </motion.div>

      <motion.div className="section-wrap home-philosophy" style={{ background: '#fafaf8', padding: '60px 2rem' }} {...revealMotion} id="philosophy">
        <div className="gateway">
          <div className="gateway-label">ABOUT RODENT</div>
          <div className="gateway-inner">
            <div className="gateway-text">
              <span className="gateway-bubble">Who we are</span>
              <h2>Software and practical engineering.</h2>
              <p className="gateway-about-copy">Rodent is the software and hardware engineering division of Squirrellabs Technologies (Private) Limited.</p>
              <p className="gateway-about-copy">Our team brings software, electronics, and practical industrial experience to projects that cross the digital and physical worlds.</p>
              <div className="gateway-controls">
                <button className="watch-btn" type="button" onClick={() => goToSection('services')}>See what we build</button>
                <button className="ctrl-btn" type="button" onClick={() => setServiceIndex((prev) => (prev - 1 + services.length) % services.length)}>←</button>
                <button className="ctrl-btn" type="button" onClick={() => setServiceIndex((prev) => (prev + 1) % services.length)}>→</button>
              </div>
              <p style={{ marginTop: '0.8rem', fontSize: 13, color: 'var(--mid)' }}>Current focus: {activeService.name}</p>
            </div>
            <motion.div className="gateway-img" whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: easeCurve }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  className="gateway-focus-content"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28, ease: easeCurve }}
                >
                  <p className="gateway-focus-label">{activeService.name}</p>
                  <p className="gateway-focus-summary">{activeService.summary}</p>
                  <p className="gateway-focus-capability">{activeService.capability}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.section className="home-founders home-founders-section" aria-labelledby="home-founders-title" {...revealMotion}>
        <div className="home-founders-heading">
          <p className="eyebrow">Meet the founders</p>
          <h2 id="home-founders-title">Software, electronics, and industrial engineering.</h2>
          <p>Squirrellabs Technologies (Private) Limited was founded by Anesu Prince Ndava and Vulan Anotidaishe K Machiri.</p>
        </div>
        <div className="founders-grid">
          {founders.map((founder) => (
            <article className="founder-card" key={founder.name}>
              <p className="founder-role">Co-Founder</p>
              <h3>{founder.name}</h3>
              <p>{founder.summary}</p>
            </article>
          ))}
        </div>
        <Link className="founders-link" href="/about#founders">Meet the founding team →</Link>
      </motion.section>

      <motion.div className="marketplace-wrap home-services" {...revealMotion} id="services" ref={marketplaceRef}>
        <div className="marketplace-inner">
          <div className="marketplace-header">
            <div className="mp-left"><div className="mp-label">SERVICES</div><h2>What we build</h2><p className="mp-desc">We build web platforms, mobile applications, and connected systems around the way your business works.</p></div>
            <motion.div className="mp-right" style={{ position: 'sticky', top: 96, y: stickyY, scale: stickyScale, opacity: stickyOpacity, willChange: 'transform, opacity' }}>
              <button className="view-all-btn" type="button" onClick={() => router.push('/projects')}>View Work</button>
            </motion.div>
          </div>

          <div className="mp-grid mp-grid-desktop">
            {services.map((card) => (
              <motion.button key={card.slug} className="mp-card mp-card-large" whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4, ease: easeCurve }} style={{ willChange: 'transform', border: 'none', textAlign: 'left', cursor: 'pointer' }} onClick={() => router.push(`/services/${card.slug}`)}>
                {(() => {
                  const visual = serviceVisuals[card.slug];
                  return (
                    <div className={visual?.className} style={{ width: '100%', aspectRatio: '1.15', position: 'relative', overflow: 'hidden' }}>
                      {visual?.imageSrc ? (
                        <Image
                          src={visual.imageSrc}
                          alt={visual.imageAlt ?? `${card.name} preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 25vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : null}
                    </div>
                  );
                })()}
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
              {(() => {
                const service = services[mobileServiceIndex];
                const visual = serviceVisuals[service.slug];
                return (
                  <div
                    className={visual?.className}
                    style={{ width: '100%', aspectRatio: '1.2', position: 'relative', overflow: 'hidden' }}
                  >
                    {visual?.imageSrc ? (
                      <Image
                        src={visual.imageSrc}
                        alt={visual.imageAlt ?? `${service.name} preview`}
                        fill
                        sizes="(max-width: 900px) 90vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>
                );
              })()}
              <div className="mp-card-label">{services[mobileServiceIndex].name}</div>
            </motion.button>
            <button className="mp-carousel-arrow mp-carousel-arrow-right" type="button" onClick={nextMobileService} aria-label="Next service">→</button>
          </div>
        </div>
      </motion.div>

      <motion.div className="gallery-wrap home-projects" {...scaleReveal} id="projects">
        <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} {...slideInLeft}><div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>PROJECTS</div><h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 800, letterSpacing: '-1.5px' }}>What we have built</h2></motion.div>
        <div className="gallery-grid gallery-grid-desktop">
          {projects.map((project) => (
            <motion.button key={project.id} className="g-card" whileHover={{ scale: 1.04, y: -6 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.4, ease: easeCurve }} onClick={() => router.push(`/projects/${project.slug}`)} style={{ border: 'none' }}>
              <div className="g-card-media">
                <Image
                  src={project.preview}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="g-card-image"
                />
              </div>
              <div className="featured-overlay"><span className="name">{project.name}</span><div className="source">{project.problem}</div></div>
            </motion.button>
          ))}
        </div>

        <div
          className="gallery-carousel"
          onTouchStart={(event) => setProjectTouchStartX(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleProjectTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
        >
          <button className="gallery-carousel-arrow gallery-carousel-arrow-left" type="button" onClick={prevMobileProject} aria-label="Previous project">←</button>
          <motion.button
            key={projects[mobileProjectIndex].id}
            className="g-card g-card-mobile"
            initial={{ opacity: 0.7, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: easeCurve }}
            onClick={() => router.push(`/projects/${projects[mobileProjectIndex].slug}`)}
            style={{ border: 'none', width: '100%' }}
          >
            <div className="g-card-media g-card-media-mobile">
              <Image
                src={projects[mobileProjectIndex].preview}
                alt={`${projects[mobileProjectIndex].name} preview`}
                fill
                sizes="100vw"
                className="g-card-image"
              />
            </div>
            <div className="featured-overlay">
              <span className="name">{projects[mobileProjectIndex].name}</span>
              <div className="source">{projects[mobileProjectIndex].problem}</div>
            </div>
          </motion.button>
          <button className="gallery-carousel-arrow gallery-carousel-arrow-right" type="button" onClick={nextMobileProject} aria-label="Next project">→</button>
        </div>
      </motion.div>

      <motion.section className="engineering-projects" aria-labelledby="engineering-projects-title" {...revealMotion}>
        <div className="engineering-projects-heading">
          <div>
            <p className="eyebrow">Engineering projects</p>
            <h2 id="engineering-projects-title">Practical systems, installed in the real world.</h2>
          </div>
          <p>Selected fieldwork delivered for Fortsync Technologies (Private) Limited, from structured cabling and access work to on-site installation support.</p>
        </div>
        <div className="engineering-projects-grid">
          <figure className="engineering-project-image engineering-project-image-wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45bde209-9473-4818-932f-ce7044f9f9f1_0_watermark-QPbvcWsT4FsVQjImo0GccLUS7njzaC.jpeg" alt="Rodent engineering team working at an international airport entrance" loading="lazy" />
            <figcaption><span>Airport infrastructure</span><strong>On-site installation and systems support</strong></figcaption>
          </figure>
          <figure className="engineering-project-image">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260514-WA0027-OvODyJK27WXADsmbc1epLrvBpLbaPv.jpg" alt="Engineer accessing ceiling infrastructure during an office installation" loading="lazy" />
            <figcaption><span>Commercial fit-out</span><strong>Careful delivery in active workspaces</strong></figcaption>
          </figure>
          <figure className="engineering-project-image">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45bde209-9473-4818-932f-ce7044f9f9f1_1_watermark-dmliR6mbVU9GTujL5EpCo0QuqELpNQ.jpeg" alt="Engineer working above an aircraft cabin during an installation" loading="lazy" />
            <figcaption><span>Specialist access</span><strong>Field engineering where it matters</strong></figcaption>
          </figure>
        </div>
      </motion.section>

      <motion.section className="home-labs" id="labs" style={{ padding: '0 2rem 4rem', maxWidth: 1100, margin: '0 auto' }} {...revealMotion}>
        <motion.h2 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }} {...slideInLeft}>Labs</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
          {labs.map((lab) => (
            <motion.div key={lab.slug} variants={staggerItem}>
              <Link href={`/labs/${lab.slug}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <strong>{lab.name}</strong>
                <p style={{ color: 'var(--mid)', fontSize: 14 }}>{lab.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="home-contact"
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: easeCurve }}
        style={{
          background: 'linear-gradient(160deg, #0e0e10 0%, #17161c 60%, #1c1a26 100%)',
          color: '#fff',
          padding: '7rem 1.25rem',
        }}
      >
        <div className="contact-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.8rem' }}>
              06 — Start a Project
            </p>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(34px,4.6vw,54px)', lineHeight: 1.04, letterSpacing: '-1.5px', marginBottom: '1.1rem' }}>
              Tell us what you&apos;re building.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, maxWidth: 440, marginBottom: '2rem' }}>
              Share what you need, your budget, and your preferred timeline. We will reply with practical next steps.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.65rem', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              <li>✉ <a href={contactEmailHref} style={{ color: 'inherit' }}>{contact.email}</a></li>
              <li>WhatsApp · <a href={contact.whatsapp.href} target="_blank" rel="noreferrer noopener" style={{ color: 'inherit' }}>{contact.whatsapp.display}</a></li>
              <li>Call · <a href={contact.phone.href} style={{ color: 'inherit' }}>{contact.phone.display}</a></li>
              <li className="company-identification">Company: Squirrellabs Technologies (Private) Limited.</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 22, padding: '2rem' }}>
            <ContactForm fullInquiry variant="dark" source="homepage_inquiry" />
          </div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: easeCurve }}
      >
        <h2>Have a project in mind?</h2>
        <p>Tell us about the work your business needs to manage.</p>
        <button className="footer-btn" type="button" onClick={() => setProjectModalOpen(true)}>Start a Project</button>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div className="footer-legal">
          <span>Rodent is a division of Squirrellabs Technologies (Private) Limited.</span>
          <span>© {new Date().getFullYear()} Squirrellabs Technologies (Private) Limited. All rights reserved.</span>
        </div>
      </motion.footer>
    </motion.main>
  );
}
