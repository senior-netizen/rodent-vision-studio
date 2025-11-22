import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Projects: [
    { label: "Portfolio", href: "/projects" },
    { label: "Squirrel API Studio", href: "/projects/squirrel-api-studio" },
    { label: "ShedSense", href: "/projects/shedsense" },
    { label: "VAWT Lab", href: "/projects/vawt-lab" },
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
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:anesu@rodent.co.zw", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-tech rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Rodent Inc.</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Building the infrastructure for the next decade of African innovation. From electrons to endpoints, we ship production-grade solutions that matter.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-accent/10 hover:border-accent/30 transition-all"
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rodent Inc. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Rodent, Inc. is a trade name for SquirrelLab Technologies Pvt Ltd.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
