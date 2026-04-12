'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      // Lenis uses smoothWheel in current versions; smooth is passed to align with animation system contract.
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    } as ConstructorParameters<typeof Lenis>[0] & { smooth: boolean });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
