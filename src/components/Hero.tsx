import { ArrowRight } from "lucide-react";

const operationalLinks = [
  { label: "Live System Feed", href: "#systems-operation" },
  { label: "API Access", href: "/squirrel-api-studio" },
  { label: "Deployment Discussion", href: "/contact" },
];

export const Hero = () => {
  return (
    <section className="bg-zinc-950 text-zinc-100 pt-24 pb-20 md:pt-32 md:pb-28 border-b border-zinc-800/80">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-5xl space-y-10">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Infrastructure Control Plane</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] text-zinc-50">
            We Operate Critical Infrastructure Data Systems Across Africa
          </h1>
          <p className="max-w-3xl text-base md:text-xl text-zinc-300 leading-relaxed">
            Grid instability, partial connectivity, and fragmented records are baseline operating conditions.
            <br />
            Rodent runs the ingestion, decision, and API layers that keep municipal, utility, and finance operations moving.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            {operationalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-800"
              >
                {link.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
