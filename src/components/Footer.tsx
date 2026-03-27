import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import rodentLogo from "@/assets/rodent-logo-transparent.png";

const footerLinks = {
  Projects: [
    { label: "Portfolio", href: "/projects" },
    { label: "Squirrel API Studio", href: "/projects/squirrel-api-studio" },
    { label: "ShedSense", href: "/projects/shedsense" },
    { label: "VAWT Lab", href: "/projects/rodent-labs-vawt" },
    { label: "Lights Out", href: "/projects/lights-out" },
    { label: "TrustChain", href: "/projects/trustchain" },
  ],
  Company: [
    { label: "Studio", href: "/studio" },
    { label: "Labs", href: "/labs" },
    { label: "Work With Us", href: "/opportunities" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
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
    <footer className="border-t border-border/30 bg-background">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        {/* Editorial grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-8 gap-8 sm:gap-10 lg:gap-[2vw] mb-10 lg:mb-14">
          {/* Brand column — spans 3 */}
          <div className="col-span-2 lg:col-span-3 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-border/30 transition-transform duration-500 group-hover:scale-105" style={{ transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                <img src={rodentLogo} alt="Rodent Inc. logo" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-lg font-medium font-display text-foreground">Rodent Inc.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              We build practical software and hardware systems for African operators, utilities, and engineering teams.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-400"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3 lg:col-span-1 first:lg:col-start-5">
              <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-foreground">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }}
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
        <div className="divider-solid mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-0.5">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Rodent Inc. All rights reserved.
            </p>
            <p className="text-[11px] text-muted-foreground/70">
              A trade name for SquirrelLab Technologies Pvt Ltd. | Reg. No: 72190A01122025
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors duration-400">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors duration-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
