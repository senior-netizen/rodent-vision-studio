import { Link, useLocation } from "react-router-dom";
import { CTAButton } from "@/components/CTAButton";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useTransparentLogo } from "@/hooks/useTransparentLogo";

export const Navigation = () => {
  const location = useLocation();
  const { logoSrc } = useTransparentLogo();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Studio", href: "/studio" },
    { label: "Labs", href: "/labs" },
    { label: "Opportunities", href: "/opportunities" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-card/60 border border-border/60 shadow-glow overflow-hidden">
              <img
                src={logoSrc}
                alt="Rodent Inc. logo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-xl font-bold gradient-text leading-tight">Rodent Inc.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-link-aurora",
                    "hover:text-foreground hover:bg-accent/10",
                    isActive ? "text-foreground bg-accent/10 is-active" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <CTAButton to="/projects" className="px-4 py-2 text-sm">Explore Projects</CTAButton>
            <CTAButton to="/contact" variant="secondary" className="px-4 py-2 text-sm">Contact Team</CTAButton>
          </div>

          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
};
