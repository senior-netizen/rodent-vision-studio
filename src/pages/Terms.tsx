import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const Terms = () => {
  usePageMetadata(
    "Terms of Use",
    "Terms of Use for Rodent Inc. services, products, and website experience."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold">Terms of Use</h1>
            <p className="text-muted-foreground max-w-3xl">
              By using Rodent Inc.'s products and site, you agree to these terms. We build secure, enterprise-grade systems and expect the same respect for safety and privacy from our users.
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Use of Services</h2>
              <p>
                You may use our products and APIs only as permitted by law and by the documentation provided. Do not attempt to disrupt, reverse engineer, or misuse the services or related infrastructure.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Accounts & Security</h2>
              <p>
                Keep your credentials secure and notify us immediately of any unauthorized use. We may suspend or terminate access for misuse, security risks, or policy violations.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
              <p>
                Rodent Inc. retains all rights to our software, hardware designs, documentation, and brand assets. You may not use our marks without written permission.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Liability</h2>
              <p>
                Our products are provided “as is” during pilots and early access. To the fullest extent permitted by law, Rodent Inc. is not liable for indirect or consequential damages.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p>
                Questions about these terms? Reach us at <a className="text-accent" href="mailto:legal@rodent.co.zw">legal@rodent.co.zw</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
