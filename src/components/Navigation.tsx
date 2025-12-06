import { Link, useLocation } from "react-router-dom";
import { CTAButton } from "@/components/CTAButton";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import rodentLogo from "@/assets/rodent-logo-transparent.png";

export const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Studio", href: "/studio" },
    { label: "Labs", href: "/labs" },
    { label: "Opportunities", href: "/opportunities" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={rodentLogo}
                alt="Rodent Inc. logo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-lg font-semibold text-foreground">Rodent</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {/* Active indicator */}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300",
                      isActive ? "w-4" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <CTAButton to="/contact" variant="secondary" className="px-4 py-2 text-sm">
              Contact
            </CTAButton>
            <CTAButton to="/projects" className="px-4 py-2 text-sm">
              Explore
            </CTAButton>
          </div>

          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
};
