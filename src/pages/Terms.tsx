import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const enforcementRules = [
  "Invalid authentication attempts exceed threshold → access token is blocked and session is terminated.",
  "Requests exceed rate limits → endpoint traffic is throttled and excess requests are rejected.",
  "Unauthorized data extraction is detected → API keys are restricted and data visibility is revoked.",
  "Payload tampering is detected → write operations are blocked and records are quarantined.",
  "Repeated policy violations are verified → account is permanently revoked across infrastructure systems.",
];

const Terms = () => {
  usePageMetadata(
    "Infrastructure Governance Rules",
    "Operational rules governing system access, usage, enforcement, and termination across infrastructure platforms."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-8">
          <section className="card-premium space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Rules governing access and usage of infrastructure systems
            </h1>
            <p className="text-lg text-muted-foreground">
              Defines constraints, enforcement, and system interaction boundaries.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">SYSTEM ACCESS</h2>
            <p className="text-muted-foreground">
              Access is granted to authenticated operators, approved integration systems, and verified infrastructure partners.
            </p>
            <p className="text-muted-foreground">
              Authentication requires valid credentials, active identity status, and policy-compliant session tokens.
            </p>
            <p className="text-muted-foreground">
              Access conditions enforce role scope, environment boundary, and system-specific permission controls.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">API USAGE</h2>
            <p className="text-muted-foreground">
              API authentication is required for every protected endpoint and every state-changing request.
            </p>
            <p className="text-muted-foreground">
              Rate limiting enforces request ceilings by identity, endpoint, and integration scope.
            </p>
            <p className="text-muted-foreground">
              Misuse detection evaluates anomaly patterns, failed auth bursts, and extraction signatures.
            </p>
            <p className="text-muted-foreground">
              Access revocation executes when abuse, tampering, or repeated policy violations are confirmed.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">DATA HANDLING</h2>
            <p className="text-muted-foreground">
              Data tampering is prohibited; integrity checks block altered payloads and inconsistent record mutations.
            </p>
            <p className="text-muted-foreground">
              Unauthorized extraction is prohibited; bulk export pathways require explicit role permission and audit trace.
            </p>
            <p className="text-muted-foreground">
              Reverse engineering of system interfaces, schemas, and protected logic is prohibited and monitored.
            </p>
          </section>

          <section className="grid lg:grid-cols-3 gap-6">
            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">METERFLOW</h2>
              <p className="text-sm text-muted-foreground">
                Field data submissions require accurate meter values, location linkage, and timestamp validity.
              </p>
              <p className="text-sm text-muted-foreground">
                Fraudulent submissions are rejected and source identities are restricted from write access.
              </p>
            </article>

            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">ENERGY SYSTEMS</h2>
              <p className="text-sm text-muted-foreground">
                Ingestion endpoints accept signed telemetry streams and validated outage event payloads.
              </p>
              <p className="text-sm text-muted-foreground">
                Endpoint abuse triggers request blocking, source quarantine, and incident escalation.
              </p>
            </article>

            <article className="card-premium space-y-3">
              <h2 className="text-xl font-semibold">API INFRASTRUCTURE</h2>
              <p className="text-sm text-muted-foreground">
                Structured access only: versioned endpoints, documented contracts, and authenticated request context.
              </p>
              <p className="text-sm text-muted-foreground">
                Usage is monitored with request tracing, threshold checks, and anomaly-triggered controls.
              </p>
            </article>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">ENFORCEMENT</h2>
            <div className="space-y-2 text-muted-foreground">
              {enforcementRules.map((rule) => (
                <p key={rule}>{rule}</p>
              ))}
            </div>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">ACCESS TERMINATION</h2>
            <p className="text-muted-foreground">
              Access is revoked when authentication fraud, data misuse, or repeated policy violations are verified.
            </p>
            <p className="text-muted-foreground">
              Systems restrict revoked users by disabling credentials, invalidating sessions, and blocking network identifiers.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">SYSTEM BOUNDARIES AND OPERATIONAL LIMITS</h2>
            <p className="text-muted-foreground">
              Operational boundaries are defined by documented API contracts, deployment environment scope, and approved integration paths.
            </p>
            <p className="text-muted-foreground">
              Requests outside defined boundaries are rejected and logged for governance review.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
