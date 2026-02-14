import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const WhatWeBuild = lazy(() => import("@/components/WhatWeBuild").then((m) => ({ default: m.WhatWeBuild })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })));
const FlagshipProjects = lazy(() => import("@/components/FlagshipProjects").then((m) => ({ default: m.FlagshipProjects })));
const ProductEcosystem = lazy(() => import("@/components/ProductEcosystem").then((m) => ({ default: m.ProductEcosystem })));
const WhyRodent = lazy(() => import("@/components/WhyRodent").then((m) => ({ default: m.WhyRodent })));
const WhoWeServe = lazy(() => import("@/components/WhoWeServe").then((m) => ({ default: m.WhoWeServe })));
const EngagementTracks = lazy(() => import("@/components/EngagementTracks").then((m) => ({ default: m.EngagementTracks })));

const Home = () => {
  usePageMetadata(
    "Home",
    "Rodent Inc. builds APIs, energy operations tooling, and hardware systems for African operating environments."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading experience…</div>}>
        <WhatWeBuild />
        <ServicesSection />
        <FlagshipProjects />
        <ProductEcosystem />
        <WhyRodent />
        <WhoWeServe />
        <EngagementTracks />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
