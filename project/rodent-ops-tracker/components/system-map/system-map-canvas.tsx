'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { projects } from '@/data/projects';

type NodeKey = 'IoT Devices' | 'APIs' | 'Payment Rails' | 'Dashboards' | 'Grid Intelligence';
type GraphNode = { key: NodeKey; position: [number, number, number]; projectSlug?: string };

const graphNodes: GraphNode[] = [
  { key: 'IoT Devices', position: [-2.2, 1.2, 0], projectSlug: 'meterflow' },
  { key: 'APIs', position: [0, 0.6, 0] },
  { key: 'Payment Rails', position: [2.2, 1.2, 0], projectSlug: 'kwiksend' },
  { key: 'Dashboards', position: [1.4, -1.2, 0], projectSlug: 'sheq' },
  { key: 'Grid Intelligence', position: [-1.8, -1.1, 0], projectSlug: 'shedsense' }
];

const edges: [NodeKey, NodeKey][] = [
  ['IoT Devices', 'APIs'],
  ['APIs', 'Payment Rails'],
  ['APIs', 'Dashboards'],
  ['IoT Devices', 'Grid Intelligence'],
  ['Grid Intelligence', 'Dashboards']
];

export function SystemMapCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeKey | null>(null);
  const selectedNodeRef = useRef<NodeKey | null>(null);
  const activeNodeRef = useRef<NodeKey | null>(null);

  const projectLookup = useMemo(() => Object.fromEntries(projects.map((p) => [p.slug, p.name])), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const points = new Map<NodeKey, any>();
    const lines: Array<{ from: NodeKey; to: NodeKey; line: any }> = [];

    const findHoveredNode = (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(Array.from(points.values()));
      const hovered = intersects[0];
      return hovered ? [...points.entries()].find(([, mesh]) => mesh.uuid === hovered.object.uuid)?.[0] ?? null : null;
    };

    graphNodes.forEach(({ key, position }) => {
      const point = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#8f98a3', transparent: true, opacity: 0.8 })
      );
      point.position.set(...position);
      scene.add(point);
      points.set(key, point);
    });

    edges.forEach(([from, to]) => {
      const fromPos = points.get(from)?.position;
      const toPos = points.get(to)?.position;
      if (!fromPos || !toPos) return;

      const geometry = new THREE.BufferGeometry().setFromPoints([fromPos, toPos]);
      const material = new THREE.LineBasicMaterial({ color: '#22303a', transparent: true, opacity: 0.5 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push({ from, to, line });
    });

    const onMove = (event: MouseEvent) => {
      const key = findHoveredNode(event);
      activeNodeRef.current = key;
      setActiveNode(key);
    };

    const onClick = (event: MouseEvent) => {
      const key = findHoveredNode(event);
      if (key) {
        selectedNodeRef.current = key;
        setSelectedNode(key);
      }
    };

    renderer.domElement.addEventListener('mousemove', onMove);
    renderer.domElement.addEventListener('click', onClick);

    let frame = 0;
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      frame += 0.01;

      points.forEach((point, key) => {
        const highlighted = key === activeNodeRef.current || key === selectedNodeRef.current;
        (point.material as any).color.set(highlighted ? '#00F0FF' : '#8f98a3');
        point.scale.setScalar(highlighted ? 1.35 : 1);
        if (!reduceMotion) point.position.z = Math.sin(frame + point.position.x) * 0.08;
      });

      lines.forEach(({ from, to, line }) => {
        const mat = line.material as any;
        const hover = activeNodeRef.current;
        const highlight = (hover && (from === hover || to === hover)) || (selectedNodeRef.current && (from === selectedNodeRef.current || to === selectedNodeRef.current));
        mat.color.set(highlight ? '#00F0FF' : '#22303a');
        mat.opacity = highlight ? 0.95 : 0.45;
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener('mousemove', onMove);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [projectLookup]);

  const linkedProjects = graphNodes
    .filter((node) => node.key === selectedNode && node.projectSlug)
    .map((node) => projectLookup[node.projectSlug as keyof typeof projectLookup]);

  return (
    <section className="border-b border-white/10 px-6 py-[120px] lg:px-10">
      <div className="mx-auto grid max-w-grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">System Layer</p>
          <h2 className="mt-4 text-h2">Interactive Infrastructure Map</h2>
          <p className="mt-6 max-w-md text-sm text-muted">Hover highlights signal pathways. Click a node to lock linked projects for deeper review.</p>
          <div className="mt-6 border border-accent/50 px-4 py-3 text-sm">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Active Node</p>
            <p className="mt-2 text-foreground">{activeNode ?? 'None'}</p>
            <p className="mt-1 text-muted">Selected: {selectedNode ?? 'Click a node'}</p>
            <p className="mt-1 text-muted">{linkedProjects.join(', ') || 'No project linked.'}</p>
          </div>
        </div>
        <div className="col-span-12 h-[480px] border border-white/10 lg:col-span-8" ref={containerRef} />
      </div>
    </section>
  );
}
