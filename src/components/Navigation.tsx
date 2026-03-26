import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Studio", href: "/studio" },
    { label: "Labs", href: "/labs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-shell">
        <div className="site-nav__row">
          <Link to="/" className="site-nav__brand">
            rodent®
          </Link>

          <div className="site-nav__links">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn("site-nav__link", isActive && "site-nav__link--active")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link to="/opportunities" className="site-nav__action">
            Start a project
          </Link>
        </div>
      </div>
    </nav>
  );
};
