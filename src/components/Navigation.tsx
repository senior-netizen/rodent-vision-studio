import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Developers", href: "#developers" },
    { label: "Resources", href: "#resources" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-tech rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold gradient-text">Rodent Inc.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact">Talk to Us</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 glass border-b border-border/50 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/contact">Talk to Us</Link>
            </Button>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
