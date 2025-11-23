import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass, Home, Mail, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/60 text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(111,255,176,0.12),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(130,125,255,0.14),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(255,115,179,0.12),transparent_25%)]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center lg:py-24">
        <div className="flex-1 space-y-6">
          <Badge variant="secondary" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Lost signal
          </Badge>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">404 · Page not found</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              We couldn&apos;t locate <span className="text-accent">{location.pathname}</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you back to a
              signal—choose a destination below or message the team if you still can&apos;t find what you need.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="hero">
              <Link to="/">
                <Home className="h-5 w-5" />
                Return home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                <Mail className="h-5 w-5" />
                Talk with us
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-foreground">
                <Compass className="h-4 w-4 text-accent" />
                Last seen at: <code className="font-mono text-sm">{location.pathname}</code>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                HQ: Bulawayo, Zimbabwe
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Link
                to="/projects"
                className="group rounded-2xl border border-border/60 bg-background/70 p-4 transition hover:border-accent/60 hover:shadow-premium"
              >
                <div className="flex items-center justify-between text-foreground">
                  <div>
                    <p className="text-sm text-muted-foreground">Explore</p>
                    <p className="text-lg font-semibold">Projects</p>
                  </div>
                  <Compass className="h-5 w-5 transition group-hover:scale-110 group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">See what we&apos;re building across labs and products.</p>
              </Link>

              <Link
                to="/about"
                className="group rounded-2xl border border-border/60 bg-background/70 p-4 transition hover:border-accent/60 hover:shadow-premium"
              >
                <div className="flex items-center justify-between text-foreground">
                  <div>
                    <p className="text-sm text-muted-foreground">Learn</p>
                    <p className="text-lg font-semibold">About Rodent Lab</p>
                  </div>
                  <Home className="h-5 w-5 transition group-hover:scale-110 group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Meet the team shaping resilient, human-centered systems.</p>
              </Link>

              <Link
                to="/labs"
                className="group rounded-2xl border border-border/60 bg-background/70 p-4 transition hover:border-accent/60 hover:shadow-premium"
              >
                <div className="flex items-center justify-between text-foreground">
                  <div>
                    <p className="text-sm text-muted-foreground">Visit</p>
                    <p className="text-lg font-semibold">Our Labs</p>
                  </div>
                  <ArrowLeft className="h-5 w-5 rotate-180 transition group-hover:scale-110 group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Discover the experiments pushing our vision forward.</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl rounded-3xl border border-border/50 bg-card/40 p-8 shadow-premium backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Need hands-on help?</h2>
            <p className="text-muted-foreground">
              If you arrived here from a broken link, drop us a note and we&apos;ll make sure you get to the right
              place. Our inbox is monitored by the same team building our experiments.
            </p>
            <div className="rounded-2xl border border-dashed border-accent/40 bg-background/60 p-4 text-sm">
              <p className="font-medium text-foreground">Contact Rodent Lab</p>
              <p className="text-muted-foreground">Email: <a className="text-accent underline" href="mailto:anesu@rodent.co.zw">anesu@rodent.co.zw</a></p>
              <p className="text-muted-foreground">Phone: <a className="text-accent underline" href="tel:+263787008238">+263 787 008 238</a></p>
              <p className="text-muted-foreground">Hours: Mon–Fri · 10a–5p ET</p>
            </div>
            <Button asChild size="lg" variant="premium" className="w-full">
              <Link to="/contact">
                <Mail className="h-5 w-5" />
                Message the team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
