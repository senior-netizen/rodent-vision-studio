import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Aperture,
  CheckCircle2,
  CloudCog,
  Cpu,
  GitBranch,
  ShieldCheck,
  Signal,
  WifiOff
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const featureGrid = [
  {
    icon: Aperture,
    title: "AI Test & Doc Generator",
    description:
      "Generate OpenAPI tests, contract diffs, and human-grade documentation tuned for African payment and identity stacks.",
  },
  {
    icon: WifiOff,
    title: "Offline-first Collections",
    description:
      "Cache requests, mock servers, and approvals locally with graceful sync for teams in Harare, Lagos, and Nairobi.",
  },
  {
    icon: Activity,
    title: "Queue & WebSocket Simulation",
    description: "Replay mobile traffic, latency spikes, and retries to harden APIs before they hit production.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Secrets",
    description:
      "Isolated vaults with MTLS, OAuth playgrounds, and audit-grade logging for regulated sectors.",
  },
  {
    icon: GitBranch,
    title: "Governance & Rollouts",
    description:
      "Environment approvals, change requests, and SLA guardrails built into every merge and deploy.",
  },
  {
    icon: Signal,
    title: "Observability Overlays",
    description:
      "Latency heatmaps, retry visibility, and contract health for every collection, environment, and partner.",
  },
  {
    icon: CloudCog,
    title: "Integrations Marketplace",
    description: "African payment, mobile money, and telco connectors planned with pre-flight validation flows.",
  },
  {
    icon: Cpu,
    title: "CLI + SDKs",
    description: "Ship CI/CD checks, smoke tests, and workspace automation with typed SDKs across stacks.",
  },
];

const roadmap = {
  live: [
    "Offline collections with encrypted local cache",
    "AI-powered request generator and changelog drafts",
    "Team workspaces with granular environments",
  ],
  building: [
    "Queue simulation for mobile-first traffic",
    "Observability overlays with latency + retry heatmaps",
    "WebSocket + OAuth tester with guided flows",
  ],
  coming: [
    "Marketplace for African payment and telco integrations",
    "API policy packs for banks, health, and logistics",
  ],
  future: [
    "On-device runtimes for field teams working fully offline",
    "Automated resilience scoring across partner integrations",
  ],
};

const audiences = [
  {
    title: "Fintech & Banking Teams",
    benefit: "Reduce integration timelines from months to weeks with auditable rollouts and secure sandboxes.",
  },
  {
    title: "Platform Engineering",
    benefit: "Single surface for API governance, secrets, and incident timelines that plug into CI/CD.",
  },
  {
    title: "Startups & Scaleups",
    benefit: "Ship production APIs fast with AI assistance, offline collaboration, and bandwidth-aware sync.",
  },
];

const solutionHighlights = [
  {
    title: "Resilience for African networks",
    detail:
      "Bandwidth-aware sync, offline workspaces, and queue rehearsal mean Harare, Lagos, or Kigali teams keep shipping during fibre cuts.",
  },
  {
    title: "Collaboration without drift",
    detail:
      "Team spaces, AI-generated changelogs, and review-ready diffs ensure regulators, partners, and engineers stay aligned.",
  },
  {
    title: "Governed delivery",
    detail:
      "WebSocket and OAuth testers, secrets isolation, and observability overlays keep every rollout auditable and SLA-honest.",
  },
];

const imageryBlocks = [
  {
    title: "Bandwidth-aware diffs",
    description: "Collections sync gently with delta updates and conflict resolution built for intermittent networks.",
  },
  {
    title: "Review-ready rollouts",
    description: "Approvals, versioning, and performance budgets stay in one pane so teams never ship blind.",
  },
  {
    title: "Signals that matter",
    description: "Latency, retries, and error budgets are visualized alongside every request to keep SLAs honest.",
  },
];

const SquirrelApiStudioPage = () => {
  const description =
    "Squirrel API Studio is Rodent's offline-first API workspace with AI validation, observability overlays, and rollout governance built for African engineering teams.";

  usePageMetadata("Squirrel API Studio", description, {
    url: "https://rodent-vision-studio.vercel.app/projects/squirrel-api-studio",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Squirrel API Studio",
    description,
    brand: {
      "@type": "Organization",
      name: "Rodent Inc.",
    },
    audience: [
      { "@type": "Audience", audienceType: "Developers" },
      { "@type": "Audience", audienceType: "Platform Engineers" },
    ],
    offers: {
      "@type": "Offer",
      availability: "PreOrder",
      price: "0",
      priceCurrency: "USD",
      url: "https://rodent-vision-studio.vercel.app/projects/squirrel-api-studio",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-tech/10 to-background" aria-hidden />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60">
                <span className="text-sm font-semibold text-accent">Developer Tools Platform</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Squirrel API Studio — The infrastructure powering resilient African APIs
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Offline-first design, testing, and observability so product teams can deliver dependable integrations even when bandwidth drops.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact">Request Access</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-3xl p-8 border border-border/60 shadow-premium animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-muted-foreground">Live traffic rehearsal</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-card border border-border/60">Mobile-first</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {imageryBlocks.map((block) => (
                    <div key={block.title} className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                      <p className="text-sm font-semibold">{block.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{block.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-accent/10 to-tech/10 border border-border/60 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Bandwidth aware</p>
                    <p className="text-sm text-muted-foreground">Syncs only the deltas, keeps approvals intact.</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-accent" aria-hidden />
                </div>
              </div>
              <div className="glass rounded-3xl p-6 border border-border/60 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Median API approval cycle</p>
                    <p className="text-4xl font-bold">48 hrs → 12 hrs</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Bandwidth saved per engineer</p>
                    <p className="text-4xl font-bold">~32%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Typical latency reduction after rehearsal</p>
                    <p className="text-4xl font-bold">-140ms</p>
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
              African engineering teams battle intermittent connectivity, expensive bandwidth, and fragmented approval chains. Every new partner API adds risk—queues back up, retries explode, and documentation drifts the moment contracts change.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Cloud tools throttle or stall on 2G/3G fallbacks common outside CBDs.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Banking and telco partners change contracts fast, leaving teams reconciling versions manually.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Travel for in-person approvals slows launches while outages force repeated QA runs.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Our approach</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Squirrel API Studio was built to keep shipping moving even when the internet is not. Offline-first workspaces, AI validation, and observability overlays mean your teams can design, test, and approve confidently—no matter where they sit.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We pair performance with accountability: every request, policy, and approval is logged, reproducible, and accessible to auditors and partners without sacrificing speed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30" id="solution">
        <div className="container mx-auto px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">The solution</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Purpose-built for African delivery realities</h2>
            <p className="text-muted-foreground">
              From low-bandwidth sync to auditable rollouts, Squirrel API Studio compresses the entire API lifecycle into a single, resilient surface.
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
                <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">Capabilities</p>
                <h2 className="text-3xl lg:text-4xl font-bold">An API workspace from design to rollout</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Every workflow is tuned for low-latency collaboration: fast search, gentle animations, and accessible navigation from keyboard or screen readers.
                </p>
              </div>
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact">Book a technical walk-through</Link>
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
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20" id="render">
          <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">Visual system</p>
              <h2 className="text-3xl lg:text-4xl font-bold">Built like a precision instrument</h2>
              <p className="text-muted-foreground leading-relaxed">
                The interface uses clear motion cues and keyboard-friendly controls so teams can work quickly without losing accessibility.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-border/60">
                  <p className="text-sm font-semibold">Offline mode</p>
                  <p className="text-sm text-muted-foreground">Work uninterrupted; sync resumes automatically when connectivity returns.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border/60">
                  <p className="text-sm font-semibold">Bandwidth efficiency</p>
                  <p className="text-sm text-muted-foreground">Diff-based sync and lightweight telemetry respect costly data plans.</p>
                </div>
              </div>
            </div>
            <div
              className="relative glass rounded-3xl p-8 border border-border/60 shadow-premium overflow-hidden"
              role="img"
              aria-label="Abstract visualization of the Squirrel API Studio interface showing tests, queues, and observability overlays"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-accent/20 to-tech/20 blur-3xl" aria-hidden />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Rodent / Squirrel API Studio</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">Private Beta</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="font-semibold">Load Shed Ready</p>
                    <p className="text-muted-foreground">Offline QA packs cached for on-site teams.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="font-semibold">Queue Simulator</p>
                    <p className="text-muted-foreground">Model retries, jitter, and mobile burst traffic.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="font-semibold">AI Playbooks</p>
                    <p className="text-muted-foreground">Generate regression steps and release notes.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="font-semibold">Observability</p>
                    <p className="text-muted-foreground">Latency + retry overlays on every request.</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/10 to-tech/10 border border-border/60">
                  <p className="text-sm font-semibold">Compliance ready</p>
                  <p className="text-sm text-muted-foreground">ISO 27001 playbooks, audit exports, and workspace access reviews built-in.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/40" id="roadmap">
          <div className="container mx-auto px-6 lg:px-8 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">Roadmap</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Shipping with accountability</h2>
                <p className="text-muted-foreground max-w-2xl">
                  We prioritise reliability, governance, and measurable speed gains over hype. Here is how we are sequencing work.
                </p>
              </div>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact">Discuss your integration needs</Link>
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

        <section className="py-20" id="audiences">
          <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1 space-y-4">
              <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">Who it’s for</p>
              <h2 className="text-3xl lg:text-4xl font-bold">Teams that refuse to ship brittle APIs</h2>
              <p className="text-muted-foreground">
                Whether you run a bank, a marketplace, or a mobility network, Squirrel API Studio keeps your integrations predictable.
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
            <p className="text-sm font-semibold text-accent uppercase tracking-[0.12em]">Partner with Rodent</p>
            <h2 className="text-4xl font-bold">Request access or run a pilot</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We onboard a limited number of teams each month to preserve support quality. Let’s tailor a workspace to your stack and SLAs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Request Access</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="mailto:anesu@rodent.co.zw">Email the founders</a>
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

export default SquirrelApiStudioPage;
