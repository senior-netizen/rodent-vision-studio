import { forwardRef, useMemo, useState, createElement, type ReactNode, type CSSProperties, type ComponentType, type MouseEvent } from "react";
import { prefersReducedMotion } from "@/utils/gpuCheck.js";

const useSafeMotion = (style?: CSSProperties, initial?: CSSProperties, animate?: CSSProperties) => {
  const reduce = prefersReducedMotion();
  return useMemo(() => {
    if (reduce) return style;
    return { ...initial, ...animate, ...style } as CSSProperties;
  }, [style, initial, animate, reduce]);
};

const createMotionComponent = (tag: keyof JSX.IntrinsicElements) =>
  forwardRef<HTMLElement, any>(
    ({ initial, animate, whileHover, transition, style, children, ...props }, ref) => {
      const [hovered, setHovered] = useState(false);
      const baseStyle = useSafeMotion(style, initial, animate);
      const hoverStyle = !prefersReducedMotion() && hovered && whileHover ? whileHover : {};

      return createElement(tag, {
        ...props,
        ref,
        style: { ...baseStyle, ...hoverStyle, transition: transition?.duration ? `${transition.duration}s ease` : undefined },
        onMouseEnter: (event: MouseEvent) => {
          setHovered(true);
          props?.onMouseEnter?.(event);
        },
        onMouseLeave: (event: MouseEvent) => {
          setHovered(false);
          props?.onMouseLeave?.(event);
        },
        children,
      });
    }
  );

export const motion: Record<string, ComponentType<any>> = new Proxy(
  {},
  {
    get: (_target, key: string) => createMotionComponent(key as keyof JSX.IntrinsicElements),
  }
);

export const m = motion;
export const AnimatePresence = ({ children }: { children: ReactNode }) => <>{children}</>;
export const LazyMotion = ({ children }: { children: ReactNode }) => <>{children}</>;
export const useReducedMotion = () => prefersReducedMotion();
