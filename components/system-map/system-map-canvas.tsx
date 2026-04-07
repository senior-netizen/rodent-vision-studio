'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Mode = 'ambient' | 'interactive';

type NodeConfig = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const nodes: NodeConfig[] = [
  { id: 'iot', label: 'IoT Devices', x: -0.72, y: 0.38 },
  { id: 'api', label: 'APIs', x: -0.2, y: 0.1 },
  { id: 'payments', label: 'Payment Rails', x: 0.58, y: -0.25 },
  { id: 'dashboards', label: 'Dashboards', x: 0.28, y: 0.48 },
  { id: 'grid', label: 'Grid Intelligence', x: -0.48, y: -0.35 }
];

const edges: Array<[string, string]> = [
  ['iot', 'api'],
  ['api', 'payments'],
  ['api', 'dashboards'],
  ['grid', 'api'],
  ['dashboards', 'payments']
];

const projectMap: Record<string, string[]> = {
  grid: ['ShedSense'],
  iot: ['MeterFlow'],
  dashboards: ['SHEQ Dashboard'],
  payments: ['KwikSend'],
  api: ['ShedSense', 'MeterFlow', 'SHEQ Dashboard', 'KwikSend']
};

export function SystemMapCanvas({ mode = 'interactive' }: { mode?: Mode }) {
  const ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const isLowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, root.clientWidth / root.clientHeight, 0.1, 100);
    camera.position.z = 2.4;

    const renderer = new THREE.WebGLRenderer({ antialias: !isLowPower, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1 : 1.5));
    renderer.setSize(root.clientWidth, root.clientHeight);
    root.appendChild(renderer.domElement);

    const points: Record<string, THREE.Mesh> = {};
    const segments: Array<{ pair: [string, string]; line: THREE.Line }> = [];
    const pointGeometry = new THREE.CircleGeometry(0.018, 24);

    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(
        pointGeometry,
        new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: mode === 'ambient' ? 0.35 : 0.7 })
      );
      mesh.position.set(node.x, node.y, 0);
      mesh.userData = { id: node.id, label: node.label };
      scene.add(mesh);
      points[node.id] = mesh;
    });

    edges.forEach((pair) => {
      const [a, b] = pair;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(points[a].position.x, points[a].position.y, 0),
        new THREE.Vector3(points[b].position.x, points[b].position.y, 0)
      ]);
      const material = new THREE.LineBasicMaterial({ color: '#00F0FF', transparent: true, opacity: mode === 'ambient' ? 0.15 : 0.4 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      segments.push({ pair, line });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let active = '';

    const onMove = (event: PointerEvent) => {
      if (mode === 'ambient') return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(Object.values(points));
      const next = intersects[0]?.object?.userData?.id ?? '';
      if (next !== active) {
        active = next;
        updateStyles();
      }
    };

    const onClick = () => {
      if (!active || !metaRef.current) return;
      metaRef.current.textContent = `${nodes.find((n) => n.id === active)?.label}: ${projectMap[active].join(' · ')}`;
    };

    const updateStyles = () => {
      Object.entries(points).forEach(([id, mesh]) => {
        (mesh.material as THREE.MeshBasicMaterial).opacity = !active || id === active ? 0.9 : 0.25;
      });
      segments.forEach(({ pair, line }) => {
        const isMatch = pair.includes(active);
        (line.material as THREE.LineBasicMaterial).opacity = !active ? 0.4 : isMatch ? 0.9 : 0.14;
      });
    };

    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('click', onClick);

    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.025, 0.03, 40),
      new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.4 })
    );
    pulse.position.copy(points.api.position);
    scene.add(pulse);

    const clock = new THREE.Clock();
    let animation = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      pulse.scale.setScalar(1 + (Math.sin(elapsed * 1.5) + 1) * 0.2);
      pulse.rotation.z = elapsed * 0.2;
      points.api.position.y += Math.sin(elapsed) * 0.0004;
      renderer.render(scene, camera);
      animation = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    const onResize = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('click', onClick);
      pointGeometry.dispose();
      renderer.dispose();
      root.removeChild(renderer.domElement);
    };
  }, [mode]);

  return (
    <div className="relative h-full min-h-[460px] w-full">
      <div ref={ref} className="h-full w-full" />
      {mode === 'interactive' ? (
        <div
          ref={metaRef}
          className="pointer-events-none absolute bottom-6 left-6 border border-secondary/20 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-secondary"
        >
          Hover a node to inspect routes.
        </div>
      ) : null}
    </div>
  );
}
