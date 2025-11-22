import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export const ProductEcosystem = () => {
  return (
    <section id="ecosystem" className="py-24 bg-card/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">The Rodent Ecosystem</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A cohesive family of software, hardware, and energy products that share a common design language, APIs, and security model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((product, index) => (
            <Link
              key={product.slug}
              to={`/projects/${product.slug}`}
              className="group glass-hover rounded-2xl p-7 space-y-4 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium uppercase tracking-[0.08em] text-accent">
                  {product.category}
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground">
                  {product.status}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs bg-card border border-border/60 text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center text-sm font-semibold text-accent">
                View project <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
