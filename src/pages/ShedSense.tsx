import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  MapPin, 
  Bell, 
  Cloud, 
  Smartphone, 
  Code2,
  ArrowRight,
  CheckCircle2,
  Activity,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import ShedSenseMap from "@/components/ShedSenseMap";
import ScheduleViewer from "@/components/ScheduleViewer";
import lightsOutSchedule from "@/assets/lights-out-schedule.jpg";
import lightsOutMap from "@/assets/lights-out-map.jpg";

const ShedSense = () => {
  const features = [
    {
      icon: MapPin,
      title: "Area-Based Schedules",
      description: "Precise load-shedding schedules for every area in Zimbabwe, Zambia, and Mozambique with offline caching.",
    },
    {
      icon: Activity,
      title: "Real-Time Outage Tracking",
      description: "Live outage reports and interactive maps showing current power status across SADC regions.",
    },
    {
      icon: Bell,
      title: "Predictive Alerts",
      description: "AI-driven notifications that warn you before outages happen, not after.",
    },
    {
      icon: Database,
      title: "ZESA Account Integration",
      description: "Connect your ZESA/ZETDC account for personalized billing insights and usage analytics.",
    },
    {
      icon: Cloud,
      title: "Backup Power Marketplace",
      description: "Find and compare solar panels, generators, and battery systems from verified suppliers.",
    },
    {
      icon: Code2,
      title: "Developer APIs",
      description: "Build on top of ShedSense with comprehensive REST APIs and WebSocket streams.",
    },
  ];

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/schedule/:area",
      description: "Get load-shedding schedule for a specific area",
    },
    {
      method: "GET",
      endpoint: "/api/v1/outages/live",
      description: "Real-time outage data across all regions",
    },
    {
      method: "POST",
      endpoint: "/api/v1/alerts/subscribe",
      description: "Subscribe to outage alerts via webhook",
    },
    {
      method: "GET",
      endpoint: "/api/v1/fuel/stations",
      description: "Fuel availability map and pricing",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-energy opacity-20" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-energy/20">
              <Zap className="w-4 h-4 text-energy animate-glow" />
              <span className="text-sm font-medium">Energy Intelligence Platform</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Know When the Lights Go{" "}
              <span className="gradient-text-energy">Out</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ShedSense tracks load-shedding schedules across SADC with live updates, practical alerts, and developer APIs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="energy" size="lg" asChild>
                <Link to="/contact">
                  Get API Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="premium" size="lg" asChild>
                <a href="#api-docs">
                  View API Documentation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text-energy">150+</div>
                <div className="text-sm text-muted-foreground">Areas Covered</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text-energy">99.9%</div>
                <div className="text-sm text-muted-foreground">API Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text-energy">3</div>
                <div className="text-sm text-muted-foreground">SADC Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Live Outage <span className="gradient-text-energy">Map</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Live outage mapping across covered regions
            </p>
          </div>

          <ShedSenseMap className="h-[600px] animate-fade-in" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-tech opacity-10" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for businesses, developers, and utilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass rounded-2xl p-8 space-y-4 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-energy/20 to-accent/20 border border-energy/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-energy" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule Viewer & Mobile Apps */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Schedule Viewer */}
            <div className="animate-fade-in">
              <ScheduleViewer />
            </div>

            {/* Mobile App Showcase */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">
                  <span className="gradient-text-energy">Lights Out 3</span> Mobile App
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Built with Flutter, Lights Out 3 brings the power of ShedSense to your pocket.
                  Offline-first architecture with Hive caching ensures you always have access to schedules.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Offline schedule caching with Hive",
                  "Real-time push notifications",
                  "Interactive outage map",
                  "Load-shedding analytics & trends",
                  "Dark/light theme support",
                  "Multi-area tracking",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-energy flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-energy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={lightsOutSchedule}
                    alt="Lights Out Schedule View"
                    className="w-full h-auto rounded-2xl shadow-premium group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={lightsOutMap}
                    alt="Lights Out Map View"
                    className="w-full h-auto rounded-2xl shadow-premium group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/contact">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Request App Access
                  </Link>
                </Button>
                <Button variant="premium" className="flex-1" asChild>
                  <a href="#features">
                    View Features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation Preview */}
      <section className="py-20 relative overflow-hidden" id="api-docs">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Developer-First <span className="gradient-text">APIs</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Build energy-aware applications with our comprehensive REST APIs
              </p>
            </div>

            <div className="glass rounded-2xl p-8 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">API Endpoints</h3>
                <Button variant="premium" size="sm" asChild>
                  <Link to="/contact">
                    Talk to DevRel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-3">
                {apiEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.endpoint}
                    className="glass-hover rounded-xl p-4 space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-tech/20 text-tech text-xs font-mono font-semibold">
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-foreground">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground pl-[72px]">
                      {endpoint.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Code Example */}
              <div className="rounded-xl bg-primary/5 border border-border/50 p-6 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code className="text-muted-foreground">
{`// Example: Get schedule for Bulawayo Area 12
fetch('https://api.shedsense.rodent.co.zw/v1/schedule/byo-area-12')
  .then(res => res.json())
  .then(data => {
    console.log('Next outage:', data.nextOutage);
    console.log('Schedule:', data.schedule);
  });`}
                  </code>
                </pre>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/contact">Get API Key</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/contact">
                    Request Example Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="glass rounded-3xl p-12 lg:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-energy opacity-10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to Build with <span className="gradient-text-energy">ShedSense?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join businesses and developers using ShedSense to build energy-aware applications
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button variant="energy" size="lg" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact">
                    Schedule Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShedSense;
