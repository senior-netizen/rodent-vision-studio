import React, { forwardRef, useMemo, useState } from "react";
import { prefersReducedMotion } from "@/utils/gpuCheck.js";

const useSafeMotion = (style?: React.CSSProperties, initial?: React.CSSProperties, animate?: React.CSSProperties) => {
  const reduce = prefersReducedMotion();
  return useMemo(() => {
    if (reduce) return style;
    return { ...initial, ...animate, ...style } as React.CSSProperties;
  }, [style, initial, animate, reduce]);
};

const createMotionComponent = (tag: keyof JSX.IntrinsicElements) =>
  forwardRef<HTMLElement, any>(
    ({ initial, animate, whileHover, transition, style, children, ...props }, ref) => {
      const [hovered, setHovered] = useState(false);
      const baseStyle = useSafeMotion(style, initial, animate);
      const hoverStyle = !prefersReducedMotion() && hovered && whileHover ? whileHover : {};

      return React.createElement(tag, {
        ...props,
        ref,
        style: { ...baseStyle, ...hoverStyle, transition: transition?.duration ? `${transition.duration}s ease` : undefined },
        onMouseEnter: (event: React.MouseEvent) => {
          setHovered(true);
          props?.onMouseEnter?.(event);
        },
        onMouseLeave: (event: React.MouseEvent) => {
          setHovered(false);
          props?.onMouseLeave?.(event);
        },
        children,
      });
    }
  );

export const motion: Record<string, React.ComponentType<any>> = new Proxy(
  {},
  {
    get: (_target, key: string) => createMotionComponent(key as keyof JSX.IntrinsicElements),
  }
);

export const m = motion;
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const LazyMotion = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useReducedMotion = () => prefersReducedMotion();
