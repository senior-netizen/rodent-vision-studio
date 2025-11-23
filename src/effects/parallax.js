import gsap, { ScrollTrigger } from "gsap";
import Lenis from "lenis";
import { prefersReducedMotion } from "../utils/gpuCheck.js";

gsap.registerPlugin?.(ScrollTrigger);

export const initSmoothScroll = () => {
  if (prefersReducedMotion()) return () => {};

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    normalizeWheel: true,
  });

  let frame;
  const raf = (time) => {
    lenis.raf(time);
    ScrollTrigger.update?.();
    frame = requestAnimationFrame(raf);
  };

  frame = requestAnimationFrame(raf);
  lenis.on("scroll", () => ScrollTrigger.update?.());

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
};

export const initParallax = (targets, { strength = 14 } = {}) => {
  if (prefersReducedMotion()) return () => {};
  const elements = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
  const cleanups = [];

  elements.forEach((element) => {
    const depth = Number(element?.dataset?.parallaxDepth ?? strength);
    const animation = gsap.to(element, {
      yPercent: -depth,
      ease: "power2.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    cleanups.push(() => animation?.kill?.());
  });

  return () => cleanups.forEach((cleanup) => cleanup());
};
