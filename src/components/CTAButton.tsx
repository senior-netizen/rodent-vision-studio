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
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-secondary text-secondary-foreground border border-border/50 hover:bg-secondary/80 hover:border-border active:scale-[0.98]",
};

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  function CTAButton({ to, href, children, variant = "primary", className, ...props }, ref) {
    const classes = cn(baseStyles, variants[variant], className);

    if (to) {
      return (
        <Link to={to} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} type="button" className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

export default CTAButton;
