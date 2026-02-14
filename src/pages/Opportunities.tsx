import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Mail, Handshake, Users, Rocket, ArrowUpRight, Briefcase } from "lucide-react";
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
    "Work with Rodent Inc. as a collaborator, team member, or investor supporting software and hardware delivery in Africa."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4 text-tech" />
              Opportunities
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight">
              Work With Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Collaborate on live products, join the team, or invest in the studio.
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {lanes.map((lane, index) => {
              const Icon = lane.icon;
              return (
                <a
                  key={lane.title}
                  href={lane.href}
                  className="card-premium group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <Icon className="w-6 h-6 text-tech" />
                      </div>
                      <h2 className="text-xl font-semibold">{lane.title}</h2>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {lane.description}
                  </p>
                  
                  <div className="space-y-2">
                    {lane.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Direct Line CTA */}
          <div
            id="investors"
            className="card-premium flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="space-y-3">
              <div className="badge-premium">
                <Mail className="w-3.5 h-3.5" /> 
                Direct line
              </div>
              <h3 className="text-2xl font-semibold">Want to collaborate or invest?</h3>
              <p className="text-muted-foreground max-w-xl">
                Share your scope and timeline. We prioritize partners with clear goals, fast decision cycles, and long-term delivery plans.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8 flex-shrink-0" asChild>
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
