import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Bell,
  CloudOff,
  Fuel,
  MapPin,
  Shield,
  Smartphone,
  Zap,
  BatteryCharging,
  Gauge,
  Leaf,
  Plug,
  Radio,
  TriangleAlert,
} from "lucide-react";
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
    description: "Signal outages early using schedule data, citizen reports, and generator telemetry.",
  },
  {
    icon: Fuel,
    title: "Fuel + solar marketplace",
    description: "Trusted suppliers, transparent pricing, and availability data for diesel, LPG, solar, and batteries.",
  },
  {
    icon: Smartphone,
    title: "Fault reporting",
    description: "Capture geotagged evidence and media that response teams can triage quickly.",
  },
  {
    icon: Activity,
    title: "Device telemetry",
    description: "Monitor generators, batteries, and inverters with smart thresholds to control fuel burn.",
  },
  {
    icon: Shield,
    title: "Operational data partnerships",
    description: "Authoritative data ingestion with uptime SLAs and rollback channels for unreliable schedule feeds.",
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
    "Operational data pilots with regional power partners",
    "Predictive models combining citizen signals and IoT telemetry",
  ],
  coming: [
    "Expanded solar and fuel marketplace with verification layers",
    "SME dashboards for generator + battery efficiency",
  ],
  future: [
    "Grid API for operators to broadcast planned outages",
    "Battery and EV charging orchestration for neighborhoods",
  ],
};

const audiences = [
  {
    title: "SMEs & grocery chains",
    benefit: "Protect inventory with precise outage windows, fuel guidance, and SLA-friendly alerts.",
  },
  {
    title: "Operators & communities",
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
      "Schedule feeds, citizen reports, and IoT telemetry are fused to deliver reliable schedules even when one signal fails.",
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

const dashboardKpis = [
  { icon: Zap, title: "Total Power", value: "24.8 GW", trend: "+12.5% vs last hour", tone: "text-tech" },
  { icon: Gauge, title: "Grid Frequency", value: "50.00 Hz", trend: "0.01 Hz stability", tone: "text-energy" },
  { icon: Plug, title: "Active Devices", value: "1,247", trend: "+3.2% vs last hour", tone: "text-tech" },
  { icon: Leaf, title: "Carbon Intensity", value: "92 gCO₂/kWh", trend: "-8.7% vs last hour", tone: "text-energy" },
];

const streamRows = [
  { source: "Solar Farm A1", region: "South Hub", power: "2.4 GW", voltage: "33 kV", current: "73.2 A", status: "Online" },
  { source: "Wind Turbine W7", region: "West Hub", power: "1.8 GW", voltage: "33 kV", current: "54.8 A", status: "Online" },
  { source: "Hydro Plant H3", region: "North Hub", power: "2.1 GW", voltage: "66 kV", current: "32.1 A", status: "Online" },
  { source: "Gas Plant G2", region: "East Hub", power: "0.9 GW", voltage: "11 kV", current: "89.1 A", status: "Online" },
];

const alertFeed = [
  { message: "Load spike detected", hub: "West Hub", severity: "Info" },
  { message: "Transformer T-14 maintenance", hub: "North Hub", severity: "Warning" },
  { message: "Frequency deviation · 50.03 Hz", hub: "East Hub", severity: "Info" },
  { message: "Solar input threshold exceeded", hub: "South Hub", severity: "Normal" },
];

const LightsOutPage = () => {
  const description =
    "Lights Out is Rodent's grid-aware operations companion—region-based alerts, offline schedules, predictive fault reporting, and a trusted marketplace for backup power.";

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
      { "@type": "Audience", audienceType: "Operators" },
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
                <span className="text-sm font-semibold text-energy">Operations + Energy Monitoring</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Lights Out — Smart alerts and energy intelligence for load shedding reality
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built for Zimbabwe and SADC: reliable schedules, predictive alerts, and a verified marketplace for every home and SME living with outages.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#features">Explore Features</a>
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
                <span>Schedule feeds are often unreliable; SMS trees and WhatsApp forwards become the default source of truth.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Backup fuel and solar stockouts happen without warning, driving up costs for SMEs.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Residents lack a way to submit structured fault evidence that response teams can act on quickly.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">The solution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Lights Out fuses schedule feeds, crowdsourced signals, and IoT telemetry. The result is reliable schedules, predictive alerts, and a vetted marketplace that reduces downtime and wasted diesel.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Communities, installers, and operators see the same timeline, supported by localization in English, Shona, and Ndebele so nobody is left out.
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

        <section className="py-20" id="dashboard">
          <div className="container mx-auto px-6 lg:px-8 space-y-8">
            <div className="space-y-3 max-w-3xl">
              <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">Operator dashboard</p>
              <h2 className="text-3xl lg:text-4xl font-bold">Live energy command center</h2>
              <p className="text-muted-foreground leading-relaxed">
                We embedded the dashboard directly into the product narrative so utilities and large SMEs can evaluate
                data density, alerting quality, and real-time stream observability before onboarding.
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-[#050b16] p-5 md:p-8 shadow-premium">
              <div className="grid xl:grid-cols-[minmax(0,2fr),360px] gap-6">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dashboardKpis.map((kpi) => (
                      <article key={kpi.title} className="rounded-2xl border border-border/50 bg-card/30 p-4 space-y-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary/60 flex items-center justify-center">
                          <kpi.icon className="w-4 h-4 text-tech" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{kpi.title}</p>
                          <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
                        </div>
                        <p className={`text-xs font-medium ${kpi.tone}`}>{kpi.trend}</p>
                      </article>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-[minmax(0,1.7fr),minmax(0,1fr)] gap-4">
                    <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Power generation</h3>
                        <span className="inline-flex items-center gap-2 text-xs text-tech">
                          <Radio className="w-3.5 h-3.5" />
                          Live
                        </span>
                      </div>
                      <div className="mt-5 h-48 rounded-xl bg-gradient-to-br from-tech/20 via-background to-background border border-border/40 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:36px_36px]" />
                        <div className="absolute inset-x-4 bottom-6 h-[2px] bg-tech/80 [clip-path:polygon(0%_80%,10%_78%,20%_75%,30%_68%,40%_60%,50%_45%,60%_35%,70%_26%,80%_20%,90%_27%,100%_33%)]" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
                      <h3 className="font-semibold">Energy mix</h3>
                      {[
                        ["Solar", "35%"],
                        ["Wind", "28%"],
                        ["Hydro", "22%"],
                        ["Gas", "12%"],
                        ["Battery", "3%"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                    <h3 className="font-semibold mb-4">Live data streams</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-muted-foreground border-b border-border/40">
                            <th className="text-left py-2 font-medium">Source</th>
                            <th className="text-left py-2 font-medium">Region</th>
                            <th className="text-left py-2 font-medium">Power</th>
                            <th className="text-left py-2 font-medium">Voltage</th>
                            <th className="text-left py-2 font-medium">Current</th>
                            <th className="text-left py-2 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {streamRows.map((row) => (
                            <tr key={row.source} className="border-b border-border/30">
                              <td className="py-3">{row.source}</td>
                              <td className="py-3 text-muted-foreground">{row.region}</td>
                              <td className="py-3">{row.power}</td>
                              <td className="py-3">{row.voltage}</td>
                              <td className="py-3">{row.current}</td>
                              <td className="py-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-energy/15 text-energy">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <aside className="space-y-4">
                  <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                    <h3 className="font-semibold">Grid status</h3>
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-energy/15 text-energy px-3 py-1 text-sm">
                      <span className="w-2 h-2 rounded-full bg-energy" />
                      All systems normal
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {["North Hub", "East Hub", "South Hub", "West Hub"].map((hub) => (
                        <div key={hub} className="rounded-xl border border-border/40 p-3 bg-background/50">
                          <p className="font-medium">{hub}</p>
                          <p className="text-xs text-energy mt-1">Online</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-3">
                    <h3 className="font-semibold">Recent alerts</h3>
                    {alertFeed.map((item) => (
                      <div key={item.message} className="rounded-xl border border-border/40 p-3 bg-background/50">
                        <p className="text-sm font-medium">{item.message}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.hub}</span>
                          <span className="inline-flex items-center gap-1">
                            <TriangleAlert className="w-3 h-3" />
                            {item.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                    <h3 className="font-semibold">Device health</h3>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full border-8 border-tech/70 border-r-tech/20 flex items-center justify-center text-lg font-semibold">
                        98.5%
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>1,229 Online</p>
                        <p className="text-muted-foreground">18 Offline</p>
                        <p className="text-muted-foreground">0 Maintenance</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-5">
                      <BatteryCharging className="w-4 h-4 mr-2" />
                      View all devices
                    </Button>
                  </div>
                </aside>
              </div>
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
                <h2 className="text-3xl lg:text-4xl font-bold">Building with operators and communities</h2>
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
              <RoadmapCard title="🗓 Planned Next" items={roadmap.coming} />
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
                From households to operators, Lights Out is designed to keep people informed, prepared, and protected.
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
              We partner with operators, installers, and NGOs to keep communities informed and powered. Let’s start with one city block.
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
