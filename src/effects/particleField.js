import { clampDevicePixelRatio, getPerformanceTier, prefersReducedMotion, shouldUseStaticBackground } from "../utils/gpuCheck.js";
import { createCamera, createPerformanceMonitor, createRenderer, createScene } from "./threeEngine";

export const initParticleField = async (host) => {
  if (!host) return () => {};
  const cleanupFallback = () => host.classList.remove("particle-fallback");

  if (shouldUseStaticBackground()) {
    host.classList.add("particle-fallback");
    return cleanupFallback;
  }

  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";
  host.appendChild(canvas);

  const context = await createRenderer(canvas, { alpha: true });
  if (!context) {
    host.classList.add("particle-fallback");
    canvas.remove();
    return cleanupFallback;
  }

  const { renderer, THREE, cleanup } = context;
  const scene = createScene(THREE, { fogColor: 0x0a101a });
  const camera = createCamera(THREE, canvas);
  camera.position.set(0, 0.6, 6.5);

  const performanceTier = getPerformanceTier();
  const particleCount = performanceTier === "high" ? 1400 : performanceTier === "mid" ? 1100 : 780;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 6;
    positions[i3 + 1] = (Math.random() - 0.5) * 4;
    positions[i3 + 2] = (Math.random() - 0.5) * 8;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x7cf9e9,
    size: 0.55,
    opacity: 0.7,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const mouse = { x: 0, y: 0 };
  const handlePointer = (event) => {
    const rect = host.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
    mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
  };

  const performanceSampler = createPerformanceMonitor((average) => {
    if (average < 40 && !prefersReducedMotion()) {
      material.opacity = 0.5;
    }
  });

  window.addEventListener("pointermove", handlePointer, { passive: true });

  let animationFrame;
  const animate = (time) => {
    animationFrame = requestAnimationFrame(animate);
    const drift = prefersReducedMotion() ? 0 : 0.012;
    particles.rotation.y += drift * clampDevicePixelRatio();
    particles.position.x += (mouse.x * 1.6 - particles.position.x) * 0.02;
    particles.position.y += (-mouse.y * 1.6 - particles.position.y) * 0.02;
    performanceSampler(time);
    renderer.render(scene, camera);
  };

  animate(0);

  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("pointermove", handlePointer);
    geometry.dispose();
    material.dispose?.();
    scene.clear();
    cleanup();
    canvas.remove();
    cleanupFallback();
  };
};
