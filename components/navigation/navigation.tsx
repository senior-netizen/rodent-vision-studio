'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Clients', href: '#clients' },
  { label: 'Impact', href: '#impact' },
  { label: 'Projects', href: '#projects' },
  { label: 'Systems', href: '#systems' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled
            ? 'bg-[hsl(var(--bg)/0.85)] backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 rounded-sm bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-accent">
                R
              </span>
            </div>
            <span className="hidden font-display text-sm font-medium tracking-wide sm:block">
              Rodent
              <span className="text-fg-dim">.systems</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline font-mono text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:contact@rodent.systems"
              className="ml-4 rounded-sm border border-accent/30 px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10"
            >
              Get in touch
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-5 bg-fg transition-all duration-300 ${
                menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-fg transition-all duration-300 ${
                menuOpen ? '-translate-y-[2.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[hsl(var(--bg)/0.97)] backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display text-3xl text-fg"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:contact@rodent.systems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 text-label text-accent"
              >
                contact@rodent.systems
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
