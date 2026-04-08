'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const magneticRef = useRef<{ el: HTMLElement; rect: DOMRect } | null>(null);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setHidden(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (magneticRef.current) {
        const { rect } = magneticRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const magnetRadius = Math.max(rect.width, rect.height) * 0.8;

        if (dist < magnetRadius) {
          // Pull cursor toward center with easing
          const pull = 0.35;
          cursorX.set(centerX + distX * pull);
          cursorY.set(centerY + distY * pull);
          
          // Move the element slightly toward cursor
          const elPull = 0.15;
          magneticRef.current.el.style.transform = `translate(${distX * elPull}px, ${distY * elPull}px)`;
        } else {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          magneticRef.current.el.style.transform = '';
        }
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const setupInteractiveElements = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], .magnetic-hover'
      );

      const enterHandlers = new Map<Element, () => void>();
      const leaveHandlers = new Map<Element, () => void>();

      interactives.forEach((el) => {
        const enter = () => {
          setIsHovering(true);
          const isMag = el.classList.contains('magnetic-hover') || 
                        el.tagName === 'BUTTON' || 
                        el.closest('button') !== null ||
                        el.classList.contains('link-underline');
          if (isMag) {
            setIsMagnetic(true);
            magneticRef.current = { 
              el: el as HTMLElement, 
              rect: el.getBoundingClientRect() 
            };
          }
        };
        const leave = () => {
          setIsHovering(false);
          setIsMagnetic(false);
          if (magneticRef.current) {
            magneticRef.current.el.style.transform = '';
            magneticRef.current = null;
          }
        };
        enterHandlers.set(el, enter);
        leaveHandlers.set(el, leave);
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });

      return () => {
        interactives.forEach((el) => {
          const enter = enterHandlers.get(el);
          const leave = leaveHandlers.get(el);
          if (enter) el.removeEventListener('mouseenter', enter);
          if (leave) el.removeEventListener('mouseleave', leave);
        });
      };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Delay setup to catch dynamically rendered elements
    const timer = setTimeout(setupInteractiveElements, 500);
    
    // Re-setup on route changes via MutationObserver
    let cleanupInteractives: (() => void) | null = null;
    const observer = new MutationObserver(() => {
      if (cleanupInteractives) cleanupInteractives();
      cleanupInteractives = setupInteractiveElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      clearTimeout(timer);
      observer.disconnect();
      if (cleanupInteractives) cleanupInteractives();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (hidden) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
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

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-[hsl(var(--fg)/0.5)]"
          animate={{
            width: isClicking ? 28 : isHovering ? 56 : 36,
            height: isClicking ? 28 : isHovering ? 56 : 36,
            x: isClicking ? -14 : isHovering ? -28 : -18,
            y: isClicking ? -14 : isHovering ? -28 : -18,
            borderColor: isHovering
              ? 'hsl(180 100% 50% / 0.6)'
              : 'hsl(0 0% 96% / 0.4)',
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </>
  );
}
