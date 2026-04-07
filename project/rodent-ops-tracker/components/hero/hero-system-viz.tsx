'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroSystemViz() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, node.clientWidth / node.clientHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(node.clientWidth, node.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    node.appendChild(renderer.domElement);

    const particles = new THREE.Group();
    for (let i = 0; i < 24; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.25 })
      );
      mesh.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
      particles.add(mesh);
    }
    scene.add(particles);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      particles.rotation.y += 0.0018;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = node.clientWidth / node.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(node.clientWidth, node.clientHeight);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      node.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div aria-hidden className="absolute inset-0 opacity-40" ref={ref} />;
}
