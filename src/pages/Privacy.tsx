import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const Privacy = () => {
  usePageMetadata(
    "Privacy Policy",
    "Privacy commitments for Rodent Inc.'s products, APIs, and website."
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-3xl">
              We treat data stewardship as core infrastructure. This policy outlines how we collect, use, and safeguard information.
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
              <p>
                We collect contact details, account credentials, usage analytics, and device telemetry where necessary to deliver and secure our services. Sensitive data is minimized and encrypted in transit and at rest.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">How We Use Data</h2>
              <p>
                Data powers product delivery, reliability, and support. We never sell personal data. We use anonymized analytics to improve performance and guide roadmap decisions.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Sharing & Third Parties</h2>
              <p>
                We share data only with vetted processors required to operate the service (cloud hosting, communications, payments). Each partner upholds strict security and privacy standards.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
              <p>
                You can request access, correction, or deletion of your data at any time. Contact us at <a className="text-accent" href="mailto:privacy@rodent.co.zw">privacy@rodent.co.zw</a> to exercise these rights.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Security</h2>
              <p>
                We enforce encryption, access controls, audit logging, and secure SDLC practices across our stack. Security incidents are triaged with urgency and transparency.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
