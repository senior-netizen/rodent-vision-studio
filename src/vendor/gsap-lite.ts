export type TweenTarget = Element | Element[] | NodeListOf<Element>;
export type TweenVars = {
  y?: number | string;
  x?: number | string;
  yPercent?: number;
  duration?: number;
  ease?: string;
  onUpdate?: () => void;
  scrollTrigger?: any;
};

const normalizeTargets = (target: TweenTarget) => {
  if (Array.isArray(target)) return target;
  if (target instanceof Element) return [target];
  return Array.from(target);
};

export const ScrollTrigger = {
  create(config: any) {
    const triggerElement = config.trigger || window;
    const start = config.start || "top center";
    const startOffset = typeof start === "string" && start.includes("bottom") ? 0.6 : 0;
    const handler = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight;
      const rect = triggerElement instanceof Element ? triggerElement.getBoundingClientRect() : { top: 0 };
      const progress = Math.min(
        1,
        Math.max(0, (scrollTop + viewport * (1 - startOffset) - (scrollTop + rect.top)) / (viewport || 1)),
      );
      config.onUpdate?.({ progress });
      if (config.animation?.progress) config.animation.progress(progress);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();

    return {
      kill() {
        window.removeEventListener("scroll", handler);
      },
    };
  },
  refresh() {},
  update() {},
};

export const gsap = {
  to(target: TweenTarget, vars: TweenVars) {
    const nodes = normalizeTargets(target);
    const duration = (vars.duration ?? 0.6) * 1000;
    const yPercent = vars.yPercent ?? null;
    const y = typeof vars.y === "string" && vars.y.includes("%") ? 0 : (vars.y as number | undefined);
    const x = typeof vars.x === "string" && vars.x.includes("%") ? 0 : (vars.x as number | undefined);
    const startTime = performance.now();

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      nodes.forEach((node) => {
        const element = node as HTMLElement;
        const translateY = y ?? 0;
        const translateX = x ?? 0;
        const percent = yPercent != null ? yPercent * (progress / 100) : 0;
        element.style.transform = `translate3d(${translateX}px, ${translateY + percent}px, 0)`;
      });
      vars.onUpdate?.();
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    if (vars.scrollTrigger) {
      const trigger = ScrollTrigger.create({ ...vars.scrollTrigger, animation: { progress: () => {} } });
      return { kill: () => trigger.kill() };
    }

    return { kill: () => {} };
  },
  set(target: TweenTarget, vars: TweenVars) {
    const nodes = normalizeTargets(target);
    nodes.forEach((node) => {
      const element = node as HTMLElement;
      const translateY = vars.y ?? 0;
      const translateX = vars.x ?? 0;
      element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  },
  registerPlugin() {},
  utils: {
    clamp(min: number, max: number, value: number) {
      return Math.min(max, Math.max(min, value));
    },
  },
};

export default gsap;
