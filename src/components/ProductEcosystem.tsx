import { Code2, Zap, Wallet, Wind, Terminal, Eye, Brain, Home } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Squirrel API Studio",
    icon: Code2,
    color: "tech",
    description: "Next-gen API client",
    href: "/products/api-studio",
  },
  {
    name: "Squirrel API Vision",
    icon: Eye,
    color: "tech",
    description: "No-code builder",
    href: "/products/api-vision",
  },
  {
    name: "Squirrel AI",
    icon: Brain,
    color: "tech",
    description: "AI assistant",
    href: "/products/squirrel-ai",
  },
  {
    name: "ShedSense",
    icon: Zap,
    color: "energy",
    description: "Energy intelligence",
    href: "/products/shedsense",
  },
  {
    name: "Squirrel Property",
    icon: Home,
    color: "tech",
    description: "Property management",
    href: "/products/property",
  },
  {
    name: "TechChain",
    icon: Wallet,
    color: "accent",
    description: "DeFi & Insurance",
    href: "/products/techchain",
  },
  {
    name: "Squirrel CLI",
    icon: Terminal,
    color: "tech",
    description: "Command line power",
    href: "/products/cli",
  },
  {
    name: "VAWT Lab",
    icon: Wind,
    color: "energy",
    description: "Smart infrastructure",
    href: "/products/vawt",
  },
];

export const ProductEcosystem = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            The Rodent <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A connected suite of developer tools, energy intelligence, and fintech platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Link
                key={product.name}
                to={product.href}
                className="group glass-hover rounded-2xl p-6 space-y-4 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-${product.color}/10 border border-${product.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 text-${product.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
                  Learn more
                  <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
