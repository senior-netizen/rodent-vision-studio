export class Color {
  hex: number | string;

  constructor(hex: number | string = 0xffffff) {
    this.hex = hex;
  }

  toStyle(opacity = 1) {
    if (typeof this.hex === "number") {
      const r = (this.hex >> 16) & 255;
      const g = (this.hex >> 8) & 255;
      const b = this.hex & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return typeof this.hex === "string" && this.hex.startsWith("#")
      ? `${this.hex}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
      : this.hex;
  }
}

export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
}

export class Fog {
  color: Color;
  near: number;
  far: number;

  constructor(color: number | string, near = 1, far = 100) {
    this.color = new Color(color);
    this.near = near;
    this.far = far;
  }
}

export class Scene {
  children: any[];
  fog?: Fog;
  background: any;

  constructor() {
    this.children = [];
    this.background = null;
  }

  add(...objects: any[]) {
    this.children.push(...objects);
  }

  remove(obj: any) {
    this.children = this.children.filter((item) => item !== obj);
  }

  clear() {
    this.children = [];
  }
}

export class PerspectiveCamera {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: Vector3;

  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.position = new Vector3();
  }

  updateProjectionMatrix() {
    /* noop for lightweight renderer */
  }
}

export class BufferAttribute {
  array: Float32Array;
  itemSize: number;

  constructor(array: Float32Array, itemSize: number) {
    this.array = array;
    this.itemSize = itemSize;
  }
}

export class BufferGeometry {
  attributes: Record<string, BufferAttribute>;

  constructor() {
    this.attributes = {};
  }

  setAttribute(name: string, attribute: BufferAttribute) {
    this.attributes[name] = attribute;
    return this;
  }

  dispose() {
    this.attributes = {};
  }
}

export class PointsMaterial {
  color: Color;
  size: number;
  transparent?: boolean;
  opacity?: number;
  blending?: string;

  constructor({ color = 0xffffff, size = 1, transparent = true, opacity = 1 }: any = {}) {
    this.color = new Color(color);
    this.size = size;
    this.transparent = transparent;
    this.opacity = opacity;
    this.blending = "additive";
  }

  dispose() {}
}

export class Points {
  geometry: BufferGeometry;
  material: PointsMaterial;
  rotation: Vector3;
  position: Vector3;
  type: string;

  constructor(geometry: BufferGeometry, material: PointsMaterial) {
    this.geometry = geometry;
    this.material = material;
    this.rotation = new Vector3();
    this.position = new Vector3();
    this.type = "points";
  }
}

export class MeshStandardMaterial {
  color: Color;
  metalness: number;
  roughness: number;
  envMapIntensity: number;
  transparent?: boolean;

  constructor({
    color = 0xffffff,
    metalness = 0.6,
    roughness = 0.3,
    envMapIntensity = 1,
    transparent = false,
  }: any = {}) {
    this.color = new Color(color);
    this.metalness = metalness;
    this.roughness = roughness;
    this.envMapIntensity = envMapIntensity;
    this.transparent = transparent;
  }
}

export class Mesh {
  geometry: any;
  material: any;
  rotation: Vector3;
  position: Vector3;
  scale: Vector3;
  type: string;

  constructor(geometry: any, material: any) {
    this.geometry = geometry;
    this.material = material;
    this.rotation = new Vector3();
    this.position = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.type = "mesh";
  }
}

export class TorusKnotGeometry {
  radius: number;
  tube: number;
  tubularSegments: number;
  radialSegments: number;
  p: number;
  q: number;
  vertices: Float32Array;

  constructor(radius = 1, tube = 0.4, tubularSegments = 64, radialSegments = 8, p = 2, q = 3) {
    this.radius = radius;
    this.tube = tube;
    this.tubularSegments = tubularSegments;
    this.radialSegments = radialSegments;
    this.p = p;
    this.q = q;
    this.vertices = this.generateVertices();
  }

  generateVertices() {
    const points: number[] = [];
    for (let i = 0; i < this.tubularSegments; i += 1) {
      const u = (i / this.tubularSegments) * Math.PI * 2;
      const cu = Math.cos(u);
      const su = Math.sin(u);
      const quOverP = (u * this.q) / this.p;
      const cs = Math.cos(quOverP);
      const cx = (this.radius + this.tube * cs) * 0.6;
      const cy = this.tube * Math.sin(quOverP) * 0.6;
      const cz = this.tube * cs * 0.4;
      points.push(cx + cu * this.tube * 0.4, cy + su * this.tube * 0.4, cz);
    }
    return new Float32Array(points);
  }
}

export class Group {
  children: any[];
  rotation: Vector3;
  position: Vector3;
  scale: Vector3;
  type: string;

  constructor() {
    this.children = [];
    this.rotation = new Vector3();
    this.position = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.type = "group";
  }

  add(...objects: any[]) {
    this.children.push(...objects);
  }
}

export class AmbientLight {
  color: Color;
  intensity: number;
  type: string;

  constructor(color: number | string, intensity = 1) {
    this.color = new Color(color);
    this.intensity = intensity;
    this.type = "light";
  }
}

export class DirectionalLight {
  color: Color;
  intensity: number;
  position: Vector3;
  type: string;

  constructor(color: number | string, intensity = 1) {
    this.color = new Color(color);
    this.intensity = intensity;
    this.position = new Vector3();
    this.type = "light";
  }
}

export class Clock {
  private last: number;

  constructor() {
    this.last = performance.now();
  }

  getDelta() {
    const now = performance.now();
    const delta = (now - this.last) / 1000;
    this.last = now;
    return delta;
  }
}

export class WebGLRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;

  constructor({ canvas, antialias = true, alpha = true }: any = {}) {
    this.canvas = canvas || document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d", { alpha, desynchronized: true }) as CanvasRenderingContext2D;
    this.pixelRatio = 1;
    if (!antialias && this.ctx) {
      this.ctx.imageSmoothingEnabled = false;
    }
  }

  setPixelRatio(ratio: number) {
    this.pixelRatio = Math.max(1, ratio || 1);
  }

  setSize(width: number, height: number) {
    if (!this.ctx) return;
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  render(scene: Scene, camera: PerspectiveCamera) {
    if (!this.ctx) return;
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    const drawPoint = (x: number, y: number, size: number, color: Color, opacity = 1) => {
      this.ctx!.fillStyle = color.toStyle(opacity);
      this.ctx!.beginPath();
      this.ctx!.arc(x, y, size, 0, Math.PI * 2);
      this.ctx!.fill();
    };

    scene.children.forEach((child) => {
      if (child.type === "points" && child.geometry?.attributes?.position) {
        const { array, itemSize } = child.geometry.attributes.position;
        for (let i = 0; i < array.length; i += itemSize) {
          const x = (array[i] + child.position.x) * 12 + width / (2 * this.pixelRatio);
          const y = (array[i + 1] + child.position.y) * 12 + height / (2 * this.pixelRatio);
          const baseSize = child.material.size * 2.5;
          drawPoint(x, y, baseSize, child.material.color, child.material.opacity ?? 0.8);
        }
      }

      if (child.type === "mesh") {
        const radius = (child.geometry.radius || 1) * 42;
        const cx = width / (2 * this.pixelRatio);
        const cy = height / (2 * this.pixelRatio);
        const gradient = this.ctx!.createRadialGradient(cx - radius / 4, cy - radius / 4, radius / 8, cx, cy, radius);
        gradient.addColorStop(0, child.material.color.toStyle(0.95));
        gradient.addColorStop(0.6, child.material.color.toStyle(0.4));
        gradient.addColorStop(1, child.material.color.toStyle(0.08));
        this.ctx!.fillStyle = gradient;
        this.ctx!.beginPath();
        this.ctx!.ellipse(cx + child.position.x * 10, cy + child.position.y * 10, radius, radius * 0.92, 0, 0, Math.PI * 2);
        this.ctx!.fill();
        this.ctx!.lineWidth = 2;
        this.ctx!.strokeStyle = "rgba(255,255,255,0.08)";
        this.ctx!.stroke();
      }
    });
  }

  dispose() {
    this.ctx = null;
  }
}

export const AdditiveBlending = "additive";
