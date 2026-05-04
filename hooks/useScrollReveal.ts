'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (!nodes.length) return;

    nodes.forEach((node, index) => {
      const direction = node.dataset.revealDirection ?? 'up';
      node.dataset.revealDirection = direction;

      const baseDelay = Number(node.dataset.revealDelay ?? 0);
      const staggerStep = Number(node.dataset.revealStagger ?? 0);
      const totalDelay = Number.isFinite(baseDelay) && Number.isFinite(staggerStep) ? baseDelay + staggerStep * index : 0;
      node.style.setProperty('--reveal-delay', `${Math.max(0, totalDelay)}ms`);

      if (prefersReducedMotion) {
        node.classList.add('revealed');
      }
    });

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);
}
