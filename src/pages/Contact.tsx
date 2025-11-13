import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how Rodent Inc. can power your next innovation
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
