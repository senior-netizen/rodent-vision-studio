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
    <section id="ecosystem" className="section-padding-sm bg-secondary/20" ref={ref}>
      <div className="container mx-auto">
        {/* Editorial header */}
        <div className={cn(
          "grid lg:grid-cols-8 gap-4 lg:gap-[2vw] mb-12 md:mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="lg:col-span-4">
            <h2>Product Portfolio</h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A connected set of software and hardware products that share APIs, data models, and operational standards.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "divider-solid mb-10 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} />

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((product, index) => (
            <Link
              key={product.slug}
              to={`/projects/${product.slug}`}
              className={cn(
                "group p-7 space-y-4 rounded-xl border border-border/20 hover:border-border/40 transition-all hover:-translate-y-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              data-tilt-card
              style={{
                transitionDelay: isVisible ? `${index * 60}ms` : '0ms',
                transitionDuration: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.08em] font-medium text-accent">
                  {product.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.status}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium group-hover:text-accent transition-colors duration-500">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.summary}
                </p>
              </div>

              {/* Features — dash-separated */}
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span key={feature} className="flex items-center gap-1">
                    {i > 0 && <span className="text-border">—</span>}
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="inline-flex items-center text-sm font-medium text-accent">
                Read project brief
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
