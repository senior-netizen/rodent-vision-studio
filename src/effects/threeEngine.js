import { clampDevicePixelRatio, hasWebGLSupport, prefersReducedMotion } from "../utils/gpuCheck.js";

export const loadThree = async () => import("three");

export const createRenderer = async (canvas, { alpha = true } = {}) => {
  if (!canvas || prefersReducedMotion() || !hasWebGLSupport()) return null;

  const THREE = await loadThree();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha,
    powerPreference: "high-performance",
  });
  const resize = () => {
    if (!canvas) return;
    renderer.setPixelRatio(clampDevicePixelRatio());
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  };

  resize();
  window.addEventListener("resize", resize);

  return {
    renderer,
    THREE,
    cleanup: () => {
      window.removeEventListener("resize", resize);
      renderer.dispose();
    },
  };
};

export const createScene = (THREE, { fogColor = 0x06080d } = {}) => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(fogColor, 24, 160);
  return scene;
};

export const createCamera = (THREE, canvas) => {
  const camera = new THREE.PerspectiveCamera(
    48,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    180,
  );
  camera.position.set(0, 1.4, 6);
  camera.updateProjectionMatrix();
  return camera;
};

export const createPerformanceMonitor = (onDrop) => {
  let frames = [];
  let last = performance.now();

  return (now = performance.now()) => {
    const delta = now - last;
    last = now;
    const fps = 1000 / Math.max(delta, 0.0001);
    frames.push(fps);

    if (frames.length >= 30) {
      const average = frames.reduce((sum, value) => sum + value, 0) / frames.length;
      if (average < 40 && typeof onDrop === "function") onDrop(average);
      frames = [];
      return average;
    }

    return null;
  };
};

export const isFrameRateHealthy = (samples, threshold = 40) => {
  if (!samples.length) return true;
  const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;
  return average >= threshold;
};
