import heroDashboard from "@/assets/hero-dashboard.jpg";
import lightsOutMap from "@/assets/lights-out-map.jpg";
import lightsOutSchedule from "@/assets/lights-out-schedule.jpg";
import rodentLogo from "@/assets/rodent-logo-transparent.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const showcaseCards = [
  {
    title: "Operational control surfaces",
    description: "Dashboards, alerts, and interfaces built for teams that need system state at a glance.",
    image: heroDashboard,
    alt: "Operational dashboard interface with system metrics and controls",
    className: "lg:col-span-7",
  },
  {
    title: "Field intelligence",
    description: "Grid-aware maps and telemetry views that turn local context into usable operations data.",
    image: lightsOutMap,
    alt: "Regional power map with outage visibility overlays",
    className: "lg:col-span-5",
  },
  {
    title: "Planning under instability",
    description: "Schedules, contingencies, and time-based views for operators planning around outages.",
    image: lightsOutSchedule,
    alt: "Load-shedding schedule view for operational planning",
    className: "lg:col-span-4",
  },
  {
    title: "Software + hardware delivery",
    description: "The studio spans product design, infrastructure software, and field-ready deployment systems.",
    image: rodentLogo,
    alt: "Rodent logo mark on a dark background",
    className: "lg:col-span-8",
    imageClassName: "object-contain bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)] p-10",
  },
] as const;

export const VisualShowcase = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" aria-hidden />

      <div className="container mx-auto relative z-10 space-y-12">
        <div
          className={cn(
            "max-w-3xl space-y-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Visual context</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            The work should feel tangible, not abstract.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We added product and field imagery so visitors can immediately see the operational environments, interfaces,
            and planning surfaces behind the company narrative.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {showcaseCards.map((card, index) => (
            <article
              key={card.title}
              className={cn(
                "group editorial-frame relative rounded-3xl border border-border/60 bg-card/70 shadow-xl backdrop-blur-sm transition-all duration-700",
                card.className,
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent z-10" aria-hidden />
              <img
                src={card.image}
                alt={card.alt}
                className={cn(
                  "editorial-image h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:h-80",
                  card.imageClassName,
                  card.imageClassName ? "editorial-image-logo" : undefined
                )}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                <div className="max-w-xl space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
