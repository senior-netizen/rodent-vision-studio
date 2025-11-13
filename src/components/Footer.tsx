import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Squirrel API Studio", href: "/products/api-studio" },
    { label: "Squirrel API Vision", href: "/products/api-vision" },
    { label: "ShedSense", href: "/products/shedsense" },
    { label: "TechChain", href: "/products/techchain" },
  ],
  Solutions: [
    { label: "For Developers", href: "#developers" },
    { label: "For Utilities", href: "#utilities" },
    { label: "For Financial Institutions", href: "#fintech" },
    { label: "For Enterprises", href: "#enterprises" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "/contact", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-tech rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Rodent Inc.</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Building the infrastructure for the next decade of African innovation.
              From electrons to endpoints, we ship production-grade solutions that matter.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    to={social.href}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-accent/10 hover:border-accent/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rodent Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
