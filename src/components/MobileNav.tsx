import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string };

interface MobileNavProps {
  navLinks: NavLink[];
}

export const MobileNav = ({ navLinks }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const enhancedLinks = useMemo(() => navLinks ?? [], [navLinks]);

  return (
    <div className="md:hidden">
      <button
        className="p-2 rounded-lg hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
      </button>

      <div
        id="mobile-menu"
        className={cn(
          "absolute top-16 left-0 right-0 glass border-b border-border/50 transition-all duration-300 overflow-hidden backdrop-blur-xl",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 space-y-2">
          {enhancedLinks.map((link) => {
            const isActive =
              location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                )}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 pb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <div className="pt-4 space-y-2">
            <Button variant="ghost" size="sm" className="w-full aurora-border" asChild>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact Team
              </Link>
            </Button>
            <Button variant="hero" size="sm" className="w-full aurora-border" asChild>
              <Link to="/projects" onClick={() => setOpen(false)}>
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
