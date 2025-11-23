import { prefersReducedMotion } from "../utils/gpuCheck.js";

const assignTilt = (card, intensity) => {
  const strength = intensity ?? 12;
  const handleMove = (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) * 2 - 1) * strength;
    const rotateX = ((y / rect.height) * -2 + 1) * strength;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const reset = () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    card.style.boxShadow = "var(--shadow-card)";
  };

  card.addEventListener("pointermove", handleMove);
  card.addEventListener("pointerleave", reset);

  return () => {
    card.removeEventListener("pointermove", handleMove);
    card.removeEventListener("pointerleave", reset);
    reset();
  };
};

export const initTiltCards = (selector = "[data-tilt-card]", intensity) => {
  if (prefersReducedMotion()) return () => {};
  const cards = Array.from(document.querySelectorAll(selector));
  const cleanups = cards.map((card) => assignTilt(card, intensity));
  return () => cleanups.forEach((cleanup) => cleanup());
};
