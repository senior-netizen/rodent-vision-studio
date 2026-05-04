export const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealMotion = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.9, ease: easeCurve },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.8, ease: easeCurve },
};

export const scaleReveal = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 1, ease: easeCurve },
};
