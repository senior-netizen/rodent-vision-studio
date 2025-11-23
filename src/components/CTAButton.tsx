import { forwardRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  to?: LinkProps["to"];
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold shadow-premium transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-accent via-tech to-energy text-primary-foreground hover:shadow-glow hover:-translate-y-0.5",
  secondary:
    "glass border border-border/60 text-foreground hover:-translate-y-0.5 hover:shadow-premium",
};

export const CTAButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CTAButtonProps
>(function CTAButton({ to, href, children, variant = "primary", className, ...props }, ref) {
  const Component = to ? Link : href ? "a" : "button";
  const componentProps = to ? { to } : href ? { href } : {};
  const type = !to && !href ? "button" : undefined;

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      type={type}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
});

export default CTAButton;
