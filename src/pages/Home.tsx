import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { InfrastructureAuthorityBlueprint } from "@/components/InfrastructureAuthorityBlueprint";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const Home = () => {
  usePageMetadata(
    "Home",
    "Rodent Inc. operates infrastructure intelligence, API systems, and hardware-integrated platforms for volatile operating environments."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <InfrastructureAuthorityBlueprint />
      <Footer />
    </div>
  );
};

export default Home;
