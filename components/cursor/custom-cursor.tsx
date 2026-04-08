'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], .magnetic-hover, .link-underline';
const NATIVE_CURSOR_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const magneticRef = useRef<{ el: HTMLElement; rect: DOMRect } | null>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (coarsePointer || reduceMotion || touchCapable) {
      setHidden(true);
      return;
    }

    setHidden(false);

    const resetMagnetic = () => {
      if (magneticRef.current) {
        magneticRef.current.el.style.transform = '';
        magneticRef.current = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (magneticRef.current) {
        const { rect } = magneticRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.hypot(distX, distY);
        const magnetRadius = Math.max(rect.width, rect.height) * 0.8;

        if (dist < magnetRadius) {
          const pull = 0.35;
          cursorX.set(centerX + distX * pull);
          cursorY.set(centerY + distY * pull);
          magneticRef.current.el.style.transform = `translate(${distX * 0.15}px, ${distY * 0.15}px)`;
          return;
        }

        resetMagnetic();
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(NATIVE_CURSOR_SELECTOR)) {
        setHidden(true);
        setIsHovering(false);
        resetMagnetic();
        return;
      }

      setHidden(false);
      const interactive = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!interactive) {
        setIsHovering(false);
        resetMagnetic();
        return;
      }

      setIsHovering(true);
      const shouldMagnetize =
        interactive.classList.contains('magnetic-hover') ||
        interactive.tagName === 'BUTTON' ||
        interactive.closest('button') !== null ||
        interactive.classList.contains('link-underline');

      if (shouldMagnetize) {
        magneticRef.current = {
          el: interactive,
          rect: interactive.getBoundingClientRect(),
        };
      } else {
        resetMagnetic();
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeaveDoc = () => setHidden(true);
    const onMouseEnterDoc = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterDoc);
      resetMagnetic();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (hidden) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          a,
          button,
          [role='button'],
          .magnetic-hover,
          .link-underline {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-[hsl(var(--fg))]"
          animate={{
            width: isClicking ? 6 : isHovering ? 4 : 5,
            height: isClicking ? 6 : isHovering ? 4 : 5,
            x: isClicking ? -3 : isHovering ? -2 : -2.5,
            y: isClicking ? -3 : isHovering ? -2 : -2.5,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-[hsl(var(--fg)/0.5)]"
          animate={{
            width: isClicking ? 28 : isHovering ? 56 : 36,
            height: isClicking ? 28 : isHovering ? 56 : 36,
            x: isClicking ? -14 : isHovering ? -28 : -18,
            y: isClicking ? -14 : isHovering ? -28 : -18,
            borderColor: isHovering ? 'hsl(180 100% 50% / 0.6)' : 'hsl(0 0% 96% / 0.4)',
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </>
  );
}
