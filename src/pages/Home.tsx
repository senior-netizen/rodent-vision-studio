import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { WhyRodent } from "@/components/WhyRodent";
import { WhoWeServe } from "@/components/WhoWeServe";
import { EngagementTracks } from "@/components/EngagementTracks";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const Home = () => {
  usePageMetadata(
    "Home",
    "Rodent Inc. builds Africa's innovation infrastructure—APIs, energy intelligence, fintech rails, and hardware designed for the continent."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhatWeBuild />
      <FlagshipProjects />
      <ProductEcosystem />
      <WhyRodent />
      <WhoWeServe />
      <EngagementTracks />
      <Footer />
    </div>
  );
};

export default Home;
