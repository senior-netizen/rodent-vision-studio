import { useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { initTiltCards } from "@/effects/tiltCards";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export const ProductEcosystem = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const cleanup = initTiltCards("#ecosystem [data-tilt-card]", 6);
    return () => cleanup();
  }, []);

  return (
    <section id="ecosystem" className="section-padding-sm bg-secondary/30" ref={ref}>
      <div className="container mx-auto">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            The Rodent Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A cohesive family of software, hardware, and energy products sharing a common design language, APIs, and security model.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((product, index) => (
            <Link
              key={product.slug}
              to={`/projects/${product.slug}`}
              className={cn(
                "group rounded-2xl bg-card border border-border/50 p-7 space-y-5 transition-all duration-500 hover:border-border hover:shadow-lg hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              data-tilt-card
              style={{ transitionDelay: isVisible ? `${index * 60}ms` : '0ms' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-accent">
                  {product.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50">
                  {product.status}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.summary}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="inline-flex items-center text-sm font-medium text-accent">
                View project
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
