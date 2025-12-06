import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import rodentLogo from "@/assets/rodent-logo-transparent.png";

const footerLinks = {
  Projects: [
    { label: "Portfolio", href: "/projects" },
    { label: "Squirrel API Studio", href: "/projects/squirrel-api-studio" },
    { label: "ShedSense", href: "/projects/shedsense" },
    { label: "Rodent Labs — VAWT", href: "/projects/rodent-labs-vawt" },
    { label: "Lights Out", href: "/projects/lights-out" },
    { label: "TrustChain", href: "/projects/trustchain" },
  ],
  Company: [
    { label: "Studio", href: "/studio" },
    { label: "Labs", href: "/labs" },
    { label: "Work With Us", href: "/opportunities" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/Rodent-Inc", label: "GitHub" },
  { icon: Linkedin, href: "https://zw.linkedin.com/company/rodent-zimbabwe", label: "LinkedIn" },
  { icon: Mail, href: "mailto:anesu@rodent.co.zw", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12 lg:mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img src={rodentLogo} alt="Rodent Inc. logo" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-xl font-semibold text-foreground">Rodent Inc.</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Building the infrastructure for the next decade of African innovation. From electrons to endpoints, we ship production-grade solutions that matter.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rodent Inc. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              A trade name for SquirrelLab Technologies Pvt Ltd.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
