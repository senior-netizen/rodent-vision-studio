import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const WhatWeBuild = lazy(() => import("@/components/WhatWeBuild").then((m) => ({ default: m.WhatWeBuild })));
const FlagshipProjects = lazy(() => import("@/components/FlagshipProjects").then((m) => ({ default: m.FlagshipProjects })));
const ProductEcosystem = lazy(() => import("@/components/ProductEcosystem").then((m) => ({ default: m.ProductEcosystem })));
const WhyRodent = lazy(() => import("@/components/WhyRodent").then((m) => ({ default: m.WhyRodent })));
const WhoWeServe = lazy(() => import("@/components/WhoWeServe").then((m) => ({ default: m.WhoWeServe })));
const EngagementTracks = lazy(() => import("@/components/EngagementTracks").then((m) => ({ default: m.EngagementTracks })));

const Home = () => {
  usePageMetadata(
    "Home",
    "Rodent Inc. builds Africa's innovation infrastructure—APIs, energy intelligence, fintech rails, and hardware designed for the continent."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading experience…</div>}>
        <WhatWeBuild />
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
