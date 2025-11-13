import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { WhyRodent } from "@/components/WhyRodent";
import { WhoWeServe } from "@/components/WhoWeServe";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductEcosystem />
      <WhyRodent />
      <WhoWeServe />
      <Footer />
    </div>
  );
};

export default Home;
