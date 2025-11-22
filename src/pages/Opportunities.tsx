import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Mail, Handshake, Users, Rocket, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const lanes = [
  {
    title: "Collaborations",
    description:
      "Partner with Rodent to co-design products, pilot new capabilities, or embed our APIs inside your stack.",
    bullets: ["Design partner programs", "Enterprise pilots", "Joint ventures"],
    icon: Handshake,
    href: "/contact",
  },
  {
    title: "Join the Team",
    description:
      "Engineers, designers, and operators who thrive in ambiguous, high-velocity environments—let's build together.",
    bullets: ["Remote-friendly", "Hardware + software", "Rapid prototyping"],
    icon: Users,
    href: "mailto:careers@rodent.co.zw",
  },
  {
    title: "Investors",
    description:
      "Back a studio compounding IP across devtools, fintech, and energy. Explore our roadmap and portfolio performance.",
    bullets: ["Studio model", "Hardware IP", "SADC scale"],
    icon: Rocket,
    href: "mailto:invest@rodent.co.zw",
  },
];

const Opportunities = () => {
  usePageMetadata(
    "Opportunities",
    "Work with Rodent Inc. as a collaborator, team member, or investor building the infrastructure for Africa's innovation decade."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">Work With Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Collaborate on groundbreaking products, join the studio, or partner with us to scale innovation across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lanes.map((lane, index) => {
              const Icon = lane.icon;
              return (
                <a
                  key={lane.title}
                  href={lane.href}
                  className="group glass-hover rounded-2xl p-7 space-y-4 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tech/20 to-accent/20 border border-border/60 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-tech" />
                      </div>
                      <h2 className="text-xl font-semibold">{lane.title}</h2>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{lane.description}</p>
                  <div className="space-y-2">
                    {lane.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>

          <div
            id="investors"
            className="glass rounded-3xl p-8 border border-border/60 space-y-4 flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/60 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <Mail className="w-4 h-4" /> Direct line
              </div>
              <h3 className="text-2xl font-semibold">Looking to collaborate on a launch or invest?</h3>
              <p className="text-muted-foreground max-w-2xl">
                Tell us about your mandate and timeline. We prioritize partners who move fast, value transparency, and want to build enduring infrastructure in Africa.
              </p>
            </div>
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:anesu@rodent.co.zw">anesu@rodent.co.zw</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;
