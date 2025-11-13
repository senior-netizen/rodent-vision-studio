import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">
              About <span className="gradient-text">Rodent Inc.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the future of African innovation, one product at a time
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
