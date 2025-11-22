import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Activity, Bell, CloudOff, Fuel, MapPin, Shield, Smartphone, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const features = [
  {
    icon: MapPin,
    title: "Region-based alerts",
    description: "Localized push, SMS, and email alerts translated for communities across ZW, ZM, and MZ.",
  },
  {
    icon: CloudOff,
    title: "Offline schedules",
    description: "Schedules cache on-device so families and SMEs stay informed even during multi-hour outages.",
  },
  {
    icon: Bell,
    title: "Predictive smart alerts",
    description: "Signal outages early using municipal feeds, citizen reports, and generator telemetry.",
  },
  {
    icon: Fuel,
    title: "Fuel + solar marketplace",
    description: "Trusted suppliers, transparent pricing, and availability data for diesel, LPG, solar, and batteries.",
  },
  {
    icon: Smartphone,
    title: "Fault reporting",
    description: "Capture geotagged evidence, meter numbers, and media that utilities can triage quickly.",
  },
  {
    icon: Activity,
    title: "Device telemetry",
    description: "Monitor generators, batteries, and inverters with smart thresholds to control fuel burn.",
  },
  {
    icon: Shield,
    title: "Municipality API partnerships",
    description: "Authoritative data ingestion with uptime SLAs and rollback channels for unreliable feeds.",
  },
  {
    icon: Zap,
    title: "Developer APIs",
    description: "Embed schedules, alerts, and telemetry streams into your own apps with rate-limit safety.",
  },
];

const roadmap = {
  live: ["Offline-first schedule caching", "Region-based alerting for major metros"],
  building: [
    "Municipality API pilots with ZESA/ZETDC partners",
    "Predictive models combining citizen signals and IoT telemetry",
  ],
  coming: [
    "Expanded solar and fuel marketplace with verification layers",
    "SME dashboards for generator + battery efficiency",
  ],
  future: [
    "Grid API for utilities to broadcast planned outages",
    "Battery and EV charging orchestration for neighborhoods",
  ],
};

const audiences = [
  {
    title: "SMEs & grocery chains",
    benefit: "Protect inventory with precise outage windows, fuel guidance, and SLA-friendly alerts.",
  },
  {
    title: "Utilities & municipalities",
    benefit: "Better field response through structured citizen reports and API-first communication.",
  },
  {
    title: "Energy installers",
    benefit: "Lead-ready marketplace with load data, financing signals, and trusted suppliers.",
  },
];

const solutionHighlights = [
  {
    title: "Multi-source truth",
    detail:
      "Municipal APIs, citizen reports, and IoT telemetry are fused to deliver reliable schedules even when one signal fails.",
  },
  {
    title: "Offline-first experience",
    detail:
      "Schedules and alerts cache locally so households and SMEs in low-connectivity zones stay informed during rolling blackouts.",
  },
  {
    title: "Actionable resiliency",
    detail:
      "Region-aware notifications link directly to vetted fuel, solar, and battery suppliers to reduce downtime and price gouging.",
  },
];

const LightsOutPage = () => {
  const description =
    "Lights Out is Rodent's grid-aware utility companion—region-based alerts, offline schedules, predictive fault reporting, and a trusted marketplace for backup power.";

  usePageMetadata("Lights Out", description, {
    url: "https://rodent-vision-studio.vercel.app/projects/lights-out",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lights Out",
    description,
    brand: { "@type": "Organization", name: "Rodent Inc." },
    audience: [
      { "@type": "Audience", audienceType: "Utilities" },
      { "@type": "Audience", audienceType: "Small Business" },
    ],
    offers: {
      "@type": "Offer",
      availability: "PreOrder",
      price: "0",
      priceCurrency: "USD",
      url: "https://rodent-vision-studio.vercel.app/projects/lights-out",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-energy/10 via-tech/10 to-background" aria-hidden />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60">
                <span className="text-sm font-semibold text-energy">Utilities + Energy Monitoring</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Lights Out — Smart alerts and energy intelligence for load shedding reality
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built for Zimbabwe and SADC: reliable schedules, predictive alerts, and a verified marketplace for every home and SME living with outages.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="#features">Explore Features</Link>
                </Button>
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact">Join the beta</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-3xl p-8 border border-border/60 shadow-premium animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-muted-foreground">Load shedding navigator</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-card border border-border/60">Offline ready</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Offline schedules</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Plans cache locally; families stay informed even during multi-day cuts.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Region-aware alerts</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Zip-code precision alerts in English, Shona, and Ndebele.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Marketplace</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Pre-vetted fuel, solar, and battery suppliers with delivery windows.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Field telemetry</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Generator runtime, battery SOC, and fuel burn visualized in one pane.</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-3xl p-6 border border-border/60 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Households reached</p>
                    <p className="text-4xl font-bold">120k+</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Average alert lead time</p>
                    <p className="text-4xl font-bold">35 mins</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Marketplace partners</p>
                    <p className="text-4xl font-bold">42</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <section className="py-20" id="problem">
        <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">The problem</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Load shedding cuts can exceed 12 hours a day. Families and SMEs face spoilage, stalled production, and fuel overspend because information is late, patchy, or expensive to access.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Municipal feeds are often unreliable; SMS trees and WhatsApp forwards become the default source of truth.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Backup fuel and solar stockouts happen without warning, driving up costs for SMEs.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Residents lack a way to submit structured fault evidence that utilities can act on quickly.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">The solution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Lights Out fuses municipal APIs, crowdsourced signals, and IoT telemetry. The result is reliable schedules, predictive alerts, and a vetted marketplace that reduces downtime and wasted diesel.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Communities, installers, and utilities see the same timeline, supported by localization in English, Shona, and Ndebele so nobody is left out.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30" id="solution">
        <div className="container mx-auto px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">The solution</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Reliability for every neighborhood</h2>
            <p className="text-muted-foreground">
              Whether you are in Harare CBD or a rural growth point, Lights Out keeps information flowing and backup options available.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {solutionHighlights.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 space-y-3 border border-border/60">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="py-20 bg-gradient-to-b from-secondary/40 via-background to-background" id="features">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">Capabilities</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Energy resilience, not just alerts</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Designed for Africa’s grid realities: offline support, language localization, and trust-driven supplier verification.
                </p>
              </div>
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact">Partner with Lights Out</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass rounded-2xl p-6 space-y-3 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-energy/10 border border-energy/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-energy" aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20" id="roadmap">
          <div className="container mx-auto px-6 lg:px-8 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">Roadmap</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Building with utilities and communities</h2>
                <p className="text-muted-foreground max-w-2xl">
                  We ship in measured, accountable increments to keep quality high and misinformation low.
                </p>
              </div>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact">Bring Lights Out to your city</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <RoadmapCard title="✔ Live / Beta" items={roadmap.live} />
              <RoadmapCard title="🧪 In Development" items={roadmap.building} />
              <RoadmapCard title="🚧 Coming Soon" items={roadmap.coming} />
              <RoadmapCard title="🧭 Future Direction" items={roadmap.future} />
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/40" id="audiences">
          <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1 space-y-4">
              <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">Who it’s for</p>
              <h2 className="text-3xl lg:text-4xl font-bold">Everyone navigating outages</h2>
              <p className="text-muted-foreground">
                From households to utilities, Lights Out is designed to keep people informed, prepared, and protected.
              </p>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {audiences.map((audience) => (
                <div key={audience.title} className="glass rounded-2xl p-6 space-y-3 border border-border/60">
                  <h3 className="text-xl font-semibold">{audience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{audience.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background" id="cta">
          <div className="container mx-auto px-6 lg:px-8 text-center space-y-6">
            <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">Partner with Rodent</p>
            <h2 className="text-4xl font-bold">Pilot Lights Out in your region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We partner with utilities, installers, and NGOs to keep communities informed and powered. Let’s start with one city block.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Schedule a pilot</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="mailto:anesu@rodent.co.zw">Email the team</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Footer />
    </div>
  );
};

const RoadmapCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="glass rounded-2xl p-6 space-y-3 border border-border/60 animate-fade-in">
    <p className="text-sm font-semibold">{title}</p>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default LightsOutPage;
