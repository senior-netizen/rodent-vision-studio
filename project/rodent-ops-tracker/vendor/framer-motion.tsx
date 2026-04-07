'use client';

import { createElement, forwardRef, type ComponentType, type ReactNode } from 'react';

type MotionProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  whileHover?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

const createMotionComponent = (tag: keyof JSX.IntrinsicElements) =>
  forwardRef<HTMLElement, MotionProps>(({ whileHover, children, ...props }, ref) => {
    const resolvedProps = {
      ...props,
      ref,
      style: props.style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave
    };

    return createElement(tag, resolvedProps, children);
  });

export const motion: Record<string, ComponentType<any>> = new Proxy(
  {},
  {
    get: (_target, key: string) => createMotionComponent(key as keyof JSX.IntrinsicElements)
  }
);
