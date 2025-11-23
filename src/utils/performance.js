import { prefersReducedMotion, hasWebGLSupport, getPerformanceTier } from "./gpuCheck.js";

export const shouldDeferHeavyEffects = () => {
  if (prefersReducedMotion()) return true;
  const tier = getPerformanceTier();
  return tier === "low";
};

export const shouldEnableWebGL = () => hasWebGLSupport() && !prefersReducedMotion();

export const performanceBudget = {
  lighthouse: {
    performance: 0.92,
    accessibility: 0.95,
    bestPractices: 0.95,
    seo: 0.9,
  },
  viewports: [360, 412, 768],
};

export const dynamicImportGuard = async (importer) => {
  const shouldDefer = shouldDeferHeavyEffects();
  if (shouldDefer) return () => {};
  const module = await importer();
  return module;
};

export const lazyMotionConfig = {
  default: { duration: 0.8, opacity: { from: 0, to: 1 } },
  hover: { scale: 1.01 },
};
