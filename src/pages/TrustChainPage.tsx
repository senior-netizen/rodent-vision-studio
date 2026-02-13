import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileCheck, Gavel, ShieldCheck, WalletCards, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const features = [
  {
    icon: ShieldCheck,
    title: "Transparent policy storage",
    description: "Versioned, verifiable policy records with full audit trails for brokers, insurers, and reinsurers.",
  },
  {
    icon: FileCheck,
    title: "Evidence-backed claims",
    description: "Structured claim intake with media, geolocation, and attestations that are instantly verifiable.",
  },
  {
    icon: Workflow,
    title: "Automated adjudication",
    description: "Rule engines and oracle checks that accelerate claim approvals while staying regulator-ready.",
  },
  {
    icon: WalletCards,
    title: "Tokenized or fiat payouts",
    description: "Treasury automation for mobile money, bank rails, or tokenized reserves with safeguards.",
  },
  {
    icon: Gavel,
    title: "DAO-style governance",
    description: "Voting modules for mutuals and cooperatives to approve policies, budgets, and reserves transparently.",
  },
  {
    icon: CheckCircle2,
    title: "Reinsurer hooks",
    description: "APIs that notify reinsurers and funders with on-ledger proofs, reducing reconciliation cycles.",
  },
];

const roadmap = {
  live: [
    "On-ledger policy vault with version history",
    "Structured claim intake with photo, doc, and GPS evidence",
  ],
  building: [
    "Automated adjudication with regulator-ready audit trails",
    "Treasury automation for fiat and token payouts",
  ],
  coming: [
    "Reinsurer notification hooks and reserves dashboard",
    "KYC + fraud scoring tuned for African identity stacks",
  ],
  future: [
    "Cross-border captives with multi-currency treasury",
    "Parametric products for agriculture and logistics",
  ],
};

const audiences = [
  {
    title: "Insurers & MGAs",
    benefit: "Slash claim cycle times while keeping regulators and reinsurers fully informed.",
  },
  {
    title: "Mutuals & cooperatives",
    benefit: "Transparent voting, reserves tracking, and payouts that build member trust.",
  },
  {
    title: "Insurtechs",
    benefit: "Programmatic infrastructure to launch products with auditability from day one.",
  },
];

const solutionHighlights = [
  {
    title: "Verifiable from day one",
    detail:
      "Claims, policy updates, and evidence are hashed to a shared ledger so brokers, underwriters, and reinsurers see the same record in near real time.",
  },
  {
    title: "Programmatic treasury",
    detail:
      "Smart disbursement rules trigger mobile money, bank, or tokenized payouts with controls for reserves and regulatory approvals.",
  },
  {
    title: "Compliance-first rails",
    detail:
      "Audit exports, KYC hooks, and dispute-ready timelines help insurers satisfy regulators while serving policyholders faster.",
  },
];

const TrustChainPage = () => {
  const description =
    "TrustChain is Rodent's hybrid blockchain infrastructure for transparent claims, verifiable policy storage, and programmable treasury automation across Africa.";

  usePageMetadata("TrustChain", description, {
    url: "https://rodent-vision-studio.vercel.app/projects/trustchain",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TrustChain",
    description,
    brand: { "@type": "Organization", name: "Rodent Inc." },
    audience: [
      { "@type": "Audience", audienceType: "Insurance" },
      { "@type": "Audience", audienceType: "Fintech" },
    ],
    offers: {
      "@type": "Offer",
      availability: "PreOrder",
      price: "0",
      priceCurrency: "USD",
      url: "https://rodent-vision-studio.vercel.app/projects/trustchain",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tech/10 via-accent/10 to-background" aria-hidden />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60">
                <span className="text-sm font-semibold text-tech">Fintech + Claims Infrastructure</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                TrustChain — Transparent claims and payouts for Africa
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Insurance delays erode trust. TrustChain captures policies and claims on a verifiable ledger, automates adjudication, and moves payouts faster without compromising compliance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact">Explore partnerships</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-3xl p-8 border border-border/60 shadow-premium animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-muted-foreground">Claims clarity</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-card border border-border/60">Audit ready</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Verifiable submissions</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Evidence, identity, and attestations hashed to the ledger the moment a claim is filed.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Shared audit trail</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Every update is time-stamped and permissioned for policyholders, brokers, and reinsurers.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Treasury automation</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Tokenized reserves or fiat rails trigger payouts once conditions are met.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60">
                    <p className="text-sm font-semibold">Compliance comfort</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Evidence packs export directly to regulators with full lineage.</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-3xl p-6 border border-border/60 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Typical claim cycle</p>
                    <p className="text-4xl font-bold">30-90 days → under 7</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Audit coverage</p>
                    <p className="text-4xl font-bold">100% of actions logged</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border/60">
                    <p className="text-sm text-muted-foreground">Pilot throughput</p>
                    <p className="text-4xl font-bold">2k+ claims/month</p>
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
              Claims across the continent can take months to resolve. Policyholders lose trust; reinsurers face reconciliation drags; regulators lack visibility.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Manual paperwork and opaque status updates frustrate policyholders waiting on payouts.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Reinsurers struggle to verify exposure quickly, delaying settlements across borders.</span>
              </li>
              <li className="flex gap-2 text-sm">
                <span aria-hidden>•</span>
                <span>Regulators demand auditability, but fragmented systems make compliance expensive.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Our solution</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              TrustChain combines transparent ledgers with pragmatic APIs. Everyone—from brokers to regulators—sees the same timeline, making disputes rare and payouts faster.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              With configurable privacy zones, African data residency, and arbitration-ready audit trails, TrustChain modernizes claims without forcing teams to rewrite their core systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30" id="solution">
        <div className="container mx-auto px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">The solution</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Proof, speed, and accountability</h2>
            <p className="text-muted-foreground">
              TrustChain merges on-ledger confidence with the usability insurers expect—no crypto jargon, just faster, auditable claims.
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
                <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">Capabilities</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Trust without hype</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Blockchain is the infrastructure, not the headline. We focus on transparency, compliance, and speed to payout.
                </p>
              </div>
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact">Request a demo</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass rounded-2xl p-6 space-y-3 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-tech/10 border border-tech/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-tech" aria-hidden />
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
                <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">Roadmap</p>
                <h2 className="text-3xl lg:text-4xl font-bold">Proof before scale</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Live pilots with insurers in Zimbabwe and South Africa validate the workflows before we expand.
                </p>
              </div>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact">Join the pilot program</Link>
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
              <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">Who it’s for</p>
              <h2 className="text-3xl lg:text-4xl font-bold">For teams rebuilding trust</h2>
              <p className="text-muted-foreground">
                Claims, treasury, and governance teams who want speed without losing control.
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
            <p className="text-sm font-semibold text-tech uppercase tracking-[0.12em]">Partner with Rodent</p>
            <h2 className="text-4xl font-bold">Run a claims pilot on TrustChain</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We partner with insurers, cooperatives, and reinsurers to modernize claims without overwhelming teams. Let’s start with one product line.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Schedule a workshop</Link>
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

export default TrustChainPage;
