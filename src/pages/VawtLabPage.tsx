import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Activity, Download, Leaf, ShieldCheck, Sun, Wind, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { downloadProjectAbstract } from "@/lib/projectAbstractDownload";

const featureGrid = [
  {
    icon: Wind,
    title: "Low-wind start torque",
    description: "Biomimicry blades shaped from CFD data to start harvesting energy at <3 m/s, perfect for urban rooftops.",
  },
  {
    icon: Activity,
    title: "IoT telemetry stack",
    description: "Torque, vibration, weather, and inverter data streamed for predictive maintenance and energy optimisation.",
  },
  {
    icon: Wrench,
    title: "Modular servicing",
    description: "Blades, gearbox, and generator cartridges swap in under 90 minutes with field-friendly fixtures.",
  },
  {
    icon: Sun,
    title: "Hybrid solar coupling",
    description: "Shared inverters and storage orchestration so rooftops can run VAWT + PV without duplicated hardware.",
  },
  {
    icon: ShieldCheck,
    title: "Predictive maintenance",
    description: "Digital twins with anomaly detection to schedule service windows before failures cascade.",
  },
  {
    icon: Leaf,
    title: "Quiet, city-ready profile",
    description: "Biomimicry aero keeps acoustic signatures low for commercial and residential deployments.",
  },
];

const roadmap = {
  live: ["CFD models validated against Harare wind profiles", "First telemetry stack running on test rigs"],
  building: [
    "Urban microgrid pilot with hybrid solar coupling",
    "Digital twin calibration from long-run vibration tests",
  ],
  coming: [
    "Mini-farm deployment for industrial parks",
    "New blade molds for recycled composite materials",
  ],
  future: [
    "Edge AI for self-tuning pitch and damping",
    "Grid services participation for frequency response",
  ],
};

const audiences = [
  {
    title: "Property portfolios",
    benefit: "Rooftop micro-generation that offsets diesel and keeps tenants powered during municipal outages.",
  },
  {
    title: "Industrial parks",
    benefit: "Predictable servicing windows and telemetry-integrated uptime for critical manufacturing loads.",
  },
  {
    title: "Energy developers",
    benefit: "Modular hardware and APIs that plug into existing SCADA, battery, and solar infrastructure.",
  },
];

const solutionHighlights = [
  {
    title: "Urban-tuned aerodynamics",
    detail:
      "CFD models trained on Harare and Lagos wind roses keep the turbine spinning in low, turbulent conditions other VAWTs ignore.",
  },
  {
    title: "Telemetry-first hardware",
    detail:
      "Sensors across torque, vibration, weather, and power electronics feed dashboards and digital twins for predictive maintenance.",
  },
  {
    title: "Hybrid energy stack",
    detail:
      "Shared inverters and storage orchestration allow solar + VAWT deployments without duplicating expensive infrastructure.",
  },
];

const VawtLabPage = () => {
  const description =
    "Rodent Labs is engineering vertical-axis wind hardware for dense African cities—low-wind start torque, IoT telemetry, hybrid solar coupling, and predictive maintenance.";

  usePageMetadata("Rodent Labs — VAWT", description, {
    url: "https://rodent-vision-studio.vercel.app/projects/rodent-labs-vawt",
  });


  const handleDownloadAbstract = () => {
    const featureSummary = featureGrid.map((item) => `${item.title}: ${item.description}`).join(" ");
    const roadmapSummary = [
      `Live/Beta: ${roadmap.live.join("; ")}`,
      `In Development: ${roadmap.building.join("; ")}`,
      `Planned Next: ${roadmap.coming.join("; ")}`,
      `Future Direction: ${roadmap.future.join("; ")}`,
    ].join(" ");
    const audienceSummary = audiences.map((item) => `${item.title}: ${item.benefit}`).join(" ");

    downloadProjectAbstract({
      title: "Rodent Labs — VAWT",
      subtitle: "Vertical-axis wind hardware abstract for dense African cities",
      filename: "rodent-labs-vawt-abstract",
      generatedBy: "Rodent Labs",
      sections: [
        { heading: "Abstract", body: description },
        { heading: "Technical highlights", body: featureSummary },
        { heading: "Solution focus", body: solutionHighlights.map((item) => `${item.title}: ${item.detail}`).join(" ") },
        { heading: "Roadmap snapshot", body: roadmapSummary },
        { heading: "Deployment audiences", body: audienceSummary },
      ],
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Rodent Labs VAWT",
    description,
    brand: {
      "@type": "Organization",
      name: "Rodent Inc.",
    },
    audience: [
      { "@type": "Audience", audienceType: "Energy Developers" },
      { "@type": "Audience", audienceType: "Facilities Managers" },
    ],
    offers: {
      "@type": "Offer",
      availability: "PreOrder",
      price: "0",
      priceCurrency: "USD",
      url: "https://rodent-vision-studio.vercel.app/projects/rodent-labs-vawt",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-energy/10 via-accent/10 to-background" aria-hidden />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60">
              <span className="text-sm font-semibold text-energy">Hardware + IoT R&D</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Rodent Labs — Vertical-axis wind hardware for dense African cities
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Biomimicry blades, IoT telemetry, and predictive maintenance to keep rooftops generating in low, turbulent wind.
            </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact">Join the pilot program</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownloadAbstract}>
                  Download abstract
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-2 gap-8">
              <div
                className="glass rounded-3xl p-8 border border-border/60 shadow-premium animate-fade-in"
                role="img"
                aria-label="Abstract render of a vertical-axis wind turbine with modular blades and sensor stack"
              >
                <div className="absolute -top-24 -left-16 w-64 h-64 bg-gradient-to-br from-energy/20 to-accent/20 blur-3xl" aria-hidden />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Low-wind aero profile</p>
                    <span className="text-xs px-3 py-1 rounded-full bg-energy/10 text-energy">Labs Build</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                      <p className="font-semibold">Biomimicry blades</p>
                      <p className="text-muted-foreground">Inspired by owl wings for quieter operation.</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                      <p className="font-semibold">Exploded view</p>
                      <p className="text-muted-foreground">Modular hub + drivetrain for rapid swaps.</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                      <p className="font-semibold">Sensor stack</p>
                      <p className="text-muted-foreground">Vibration, torque, temperature, weather data.</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                      <p className="font-semibold">Hybrid bus</p>
                      <p className="text-muted-foreground">Solar-coupled inverter and storage orchestration.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-energy/10 to-accent/10 border border-border/60">
                    <p className="text-sm font-semibold">Service windows</p>
                    <p className="text-sm text-muted-foreground">Predictive maintenance based on vibration + torque drift.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <StatsCard label="Wind start speed" value="<3 m/s" />
                <StatsCard label="Servicing time" value="<90 mins" />
                <StatsCard label="Noise profile" value="<45 dB at 10m" />
                <StatsCard label="Hybrid ready" value="Solar + VAWT" />
              </div>
            </div>
          </div>
        </section>

      <section className="py-20" id="problem">
        <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">The problem</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              African cities have turbulent, low-speed wind; conventional turbines stall or burn through maintenance budgets. Diesel remains a default, even as costs spike.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Low rooftops and crowded skylines create chaotic airflows traditional turbines cannot capture.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Importing spare parts and cranes inflates OPEX, making smaller installs financially risky.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Diesel dependence drains budgets and increases noise and emissions near homes and hospitals.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Our solution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Rodent Labs combines biomimicry-inspired blades, an IoT telemetry stack, and digital twins. The result: turbines that start in gentle winds, stay quiet, and tell you when they need attention.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Modular blades, cartridge generators, and shared solar coupling make servicing predictable and minimize downtime even in hard-to-reach rooftops.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30" id="solution">
        <div className="container mx-auto px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">The solution</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Hardware, telemetry, and service in one loop</h2>
            <p className="text-muted-foreground">
              We design for rooftops that experience everything from Harmattan gusts to still mornings, keeping uptime high without expensive maintenance crews.
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
                <h2 className="text-3xl lg:text-4xl font-bold">Hardware + software in one loop</h2>
                <p className="text-muted-foreground max-w-3xl">
                  From blade geometry to telemetry dashboards, every component is designed to be serviceable, measurable, and grid-friendly.
                </p>
              </div>
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact">Collaborate with Labs</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureGrid.map((feature, index) => {
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
                <h2 className="text-3xl lg:text-4xl font-bold">From lab rigs to rooftop fleets</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Measured steps: validate aerodynamics, harden telemetry, then scale pilot fleets before marketplace rollouts.
                </p>
              </div>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact">Book a lab tour</Link>
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
              <h2 className="text-3xl lg:text-4xl font-bold">Urban energy leaders</h2>
              <p className="text-muted-foreground">
                Reliable micro-generation for properties, industrial parks, and developers who need clean power without noise or maintenance shock.
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
            <p className="text-sm font-semibold text-energy uppercase tracking-[0.12em]">Partner with Rodent Labs</p>
            <h2 className="text-4xl font-bold">Pilot a VAWT cluster with us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We’re selecting rooftops and industrial parks for telemetry-rich pilots. Let’s design a configuration for your site.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Start a pilot</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="mailto:anesu@rodent.co.zw">Email the lab</a>
              </Button>
              <Button variant="outline" size="lg" onClick={handleDownloadAbstract}>
                Download VAWT abstract
                <Download className="w-4 h-4 ml-2" />
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

const StatsCard = ({ label, value }: { label: string; value: string }) => (
  <div className="glass rounded-2xl p-6 border border-border/60 shadow-card animate-fade-in">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default VawtLabPage;
