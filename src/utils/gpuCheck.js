export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasWebGLSupport = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (error) {
    return false;
  }
};

export const clampDevicePixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.8);

export const getPerformanceTier = () => {
  if (prefersReducedMotion()) return "static";
  const cores = navigator.hardwareConcurrency || 4;
  if (cores >= 8) return "high";
  if (cores >= 4) return "mid";
  return "low";
};

export const shouldUseStaticBackground = () => !hasWebGLSupport() || prefersReducedMotion();
