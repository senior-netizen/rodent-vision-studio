'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 800;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export function useCountUp(target: number, suffix = '') {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      setValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target]);

  return `${value}${suffix}`;
}
