import { clampDevicePixelRatio, prefersReducedMotion, shouldUseStaticBackground } from "../utils/gpuCheck.js";
import { createCamera, createPerformanceMonitor, createRenderer, createScene } from "./threeEngine";

export const initFloatingLogo = async (canvas) => {
  if (!canvas) return () => {};

  const applyFallback = () => {
    canvas.classList.add("logo-fallback");
    return () => canvas.classList.remove("logo-fallback");
  };

  if (shouldUseStaticBackground()) return applyFallback();

  const context = await createRenderer(canvas, { alpha: true });
  if (!context) return applyFallback();

  const { renderer, THREE, cleanup } = context;
  const scene = createScene(THREE, { fogColor: 0x080c12 });
  const camera = createCamera(THREE, canvas);
  camera.position.set(0, 0.4, 5.6);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  const key = new THREE.DirectionalLight(0x9be8ff, 0.8);
  key.position.set(2.5, 2, 3);
  scene.add(ambient, key);

  const logoGroup = new THREE.Group();

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x9bd0ff,
    metalness: 0.85,
    roughness: 0.24,
    envMapIntensity: 1.15,
  });
  const logoGeometry = new THREE.TorusKnotGeometry(1.05, 0.34, 72, 10, 2, 3);
  const logoMesh = new THREE.Mesh(logoGeometry, metalMaterial);

  const haloMaterial = new THREE.MeshStandardMaterial({
    color: 0x7cf9e9,
    metalness: 0.2,
    roughness: 0.8,
    envMapIntensity: 0.8,
    transparent: true,
  });
  const haloGeometry = new THREE.TorusKnotGeometry(1.4, 0.08, 48, 6, 2, 5);
  const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);

  logoGroup.add(logoMesh);
  logoGroup.add(haloMesh);
  scene.add(logoGroup);

  const frameSampler = createPerformanceMonitor((average) => {
    if (average < 40 && !prefersReducedMotion()) {
      metalMaterial.roughness = 0.35;
      haloMaterial.opacity = 0.32;
    }
  });

  let animationFrame;
  const animate = (time) => {
    animationFrame = requestAnimationFrame(animate);
    const speedScale = prefersReducedMotion() ? 0.001 : 0.003;
    logoMesh.rotation.x += 0.4 * speedScale * clampDevicePixelRatio();
    logoMesh.rotation.y += 0.6 * speedScale * clampDevicePixelRatio();
    haloMesh.rotation.z -= 0.35 * speedScale;
    logoGroup.rotation.y = Math.sin(time * 0.0003) * 0.35;
    logoGroup.position.y = Math.sin(time * 0.0005) * 0.08;
    frameSampler(time);
    renderer.render(scene, camera);
  };

  animate(0);

  return () => {
    cancelAnimationFrame(animationFrame);
    logoGeometry.dispose?.();
    haloGeometry.dispose?.();
    cleanup();
  };
};
