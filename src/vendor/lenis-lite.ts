export type LenisOptions = {
  lerp?: number;
  smoothWheel?: boolean;
  normalizeWheel?: boolean;
};

type ScrollCallback = (e: { scroll: number }) => void;

export default class Lenis {
  options: LenisOptions;
  private callbacks: ScrollCallback[];
  private animationFrame: number | null;

  constructor(options: LenisOptions = {}) {
    this.options = options;
    this.callbacks = [];
    this.animationFrame = null;
  }

  on(event: "scroll", callback: ScrollCallback) {
    if (event === "scroll") this.callbacks.push(callback);
  }

  raf(time: number) {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    this.callbacks.forEach((callback) => callback({ scroll, time } as any));
    this.animationFrame = requestAnimationFrame(this.raf.bind(this));
  }

  destroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.callbacks = [];
  }
}
