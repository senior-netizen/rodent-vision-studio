import { useMemo, useState, type ComponentType, type FormEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ServerCog, PlugZap, Building2, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type EntryPathId = "government" | "developers" | "enterprise" | "general";

type EntryPath = {
  id: EntryPathId;
  title: string;
  icon: ComponentType<{ className?: string }>;
  intent: string;
  actions: string[];
  productLinkage: string;
};

const entryPaths: EntryPath[] = [
  {
    id: "government",
    title: "GOVERNMENT / MUNICIPAL SYSTEMS",
    icon: Building2,
    intent: "Initiates pilot deployments, billing system upgrades, and infrastructure integration planning.",
    actions: [
      "Pilot deployment scope",
      "MeterFlow billing system integration",
      "Municipal infrastructure interoperability",
    ],
    productLinkage: "Connects to MeterFlow, ShedSense, Studio, and Labs deployment tracks.",
  },
  {
    id: "developers",
    title: "DEVELOPERS",
    icon: PlugZap,
    intent: "Initiates API access workflows, system integration sequencing, and technical documentation routing.",
    actions: [
      "API access request",
      "System integration sequencing",
      "Technical documentation routing",
    ],
    productLinkage: "Connects to Studio APIs, ShedSense integration endpoints, MeterFlow data APIs, and Labs references.",
  },
  {
    id: "enterprise",
    title: "ENTERPRISE / UTILITIES",
    icon: ServerCog,
    intent: "Initiates energy deployment reviews, ingestion pipeline design, and telemetry integration planning.",
    actions: [
      "Energy system deployment review",
      "Data ingestion pipeline definition",
      "Telemetry integration planning",
    ],
    productLinkage: "Connects to ShedSense operations, MeterFlow ingestion layers, Studio integration systems, and Labs prototypes.",
  },
  {
    id: "general",
    title: "GENERAL",
    icon: Database,
    intent: "Routes unmatched infrastructure inquiries into structured technical triage.",
    actions: [
      "Infrastructure inquiry triage",
      "System fit classification",
      "Technical pathway assignment",
    ],
    productLinkage: "Connects to MeterFlow, ShedSense, Studio, and Labs based on system classification.",
  },
];

const organizationTypes = [
  "Municipality / City Authority",
  "Government Agency",
  "Energy Utility",
  "Enterprise Operator",
  "Technology Team",
  "Research Institution",
];

const systemInterests = ["MeterFlow", "ShedSense", "Studio", "Labs", "Multi-system integration"];

const deploymentContexts = [
  "Pilot deployment (single site)",
  "Regional rollout (multi-site)",
  "Existing system migration",
  "New infrastructure implementation",
  "Telemetry and API integration",
];

const followUpTypes = ["Technical call", "System demonstration", "Pilot discussion"];

const Contact = () => {
  usePageMetadata(
    "Infrastructure Entry Gateway",
    "Structured entry gateway for municipal systems, utilities, developers, and infrastructure deployment workflows."
  );

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePath, setActivePath] = useState<EntryPathId>("government");
  const [formData, setFormData] = useState({
    entryPath: "government" as EntryPathId,
    organizationType: "",
    systemInterest: "",
    deploymentContext: "",
    followUpType: "",
    timeline: "",
    fullName: "",
    roleTitle: "",
    workEmail: "",
    phoneNumber: "",
  });

  const selectedPath = useMemo(
    () => entryPaths.find((path) => path.id === activePath) ?? entryPaths[0],
    [activePath]
  );

  const isFormValid =
    formData.entryPath.length > 0 &&
    formData.organizationType.length > 0 &&
    formData.systemInterest.length > 0 &&
    formData.deploymentContext.length > 0 &&
    formData.followUpType.length > 0 &&
    formData.timeline.length > 1 &&
    formData.fullName.length > 1 &&
    formData.roleTitle.length > 1 &&
    formData.workEmail.includes("@") &&
    formData.phoneNumber.length > 6;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const endpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT || "https://api.web3forms.com/submit";
    const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;

    if (!accessKey) {
      toast({
        title: "Missing gateway configuration",
        description: "Set VITE_CONTACT_ACCESS_KEY to enable infrastructure request delivery.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Infrastructure request: ${formData.entryPath} / ${formData.systemInterest}`,
          entry_path: formData.entryPath,
          organization_type: formData.organizationType,
          system_interest: formData.systemInterest,
          deployment_context: formData.deploymentContext,
          follow_up_type: formData.followUpType,
          deployment_timeline: formData.timeline,
          full_name: formData.fullName,
          role_title: formData.roleTitle,
          work_email: formData.workEmail,
          phone_number: formData.phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit infrastructure request");
      }

      toast({
        title: "Infrastructure request submitted",
        description: "Technical triage initiated with follow-up routing.",
      });

      setFormData({
        entryPath: activePath,
        organizationType: "",
        systemInterest: "",
        deploymentContext: "",
        followUpType: "",
        timeline: "",
        fullName: "",
        roleTitle: "",
        workEmail: "",
        phoneNumber: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Infrastructure request delivery failed.";
      toast({
        title: "Submission failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectPath = (pathId: EntryPathId) => {
    setActivePath(pathId);
    setFormData((prev) => ({ ...prev, entryPath: pathId }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-8">
          <section className="card-premium space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Initiate infrastructure deployment and system integration
            </h1>
            <p className="text-lg text-muted-foreground">
              Municipal systems, energy infrastructure, API integration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">ENTRY PATH SEGMENTATION</h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {entryPaths.map((path) => {
                const active = path.id === activePath;
                const Icon = path.icon;
                return (
                  <button
                    type="button"
                    key={path.id}
                    onClick={() => selectPath(path.id)}
                    className={`card-premium text-left space-y-3 border transition-colors ${
                      active ? "border-accent" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-accent" />
                      <h3 className="text-lg font-semibold">{path.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{path.intent}</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {path.actions.map((action) => (
                        <li key={action} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          {action}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground">{path.productLinkage}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <article className="card-premium space-y-4">
              <h2 className="text-2xl font-semibold">Submit infrastructure integration request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entry path</Label>
                    <Select
                      value={formData.entryPath}
                      onValueChange={(value) => selectPath(value as EntryPathId)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {entryPaths.map((path) => (
                          <SelectItem key={path.id} value={path.id}>
                            {path.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Organization type</Label>
                    <Select value={formData.organizationType} onValueChange={(value) => setField("organizationType", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>System of interest</Label>
                    <Select value={formData.systemInterest} onValueChange={(value) => setField("systemInterest", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select system" />
                      </SelectTrigger>
                      <SelectContent>
                        {systemInterests.map((system) => (
                          <SelectItem key={system} value={system}>
                            {system}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Deployment context</Label>
                    <Select value={formData.deploymentContext} onValueChange={(value) => setField("deploymentContext", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select context" />
                      </SelectTrigger>
                      <SelectContent>
                        {deploymentContexts.map((context) => (
                          <SelectItem key={context} value={context}>
                            {context}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred follow-up</Label>
                    <Select value={formData.followUpType} onValueChange={(value) => setField("followUpType", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select follow-up" />
                      </SelectTrigger>
                      <SelectContent>
                        {followUpTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Deployment timeline</Label>
                    <Input
                      value={formData.timeline}
                      onChange={(event) => setField("timeline", event.target.value)}
                      placeholder="e.g., Pilot in Q3 2026"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full name</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(event) => setField("fullName", event.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role title</Label>
                    <Input
                      value={formData.roleTitle}
                      onChange={(event) => setField("roleTitle", event.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Work email</Label>
                    <Input
                      type="email"
                      value={formData.workEmail}
                      onChange={(event) => setField("workEmail", event.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone number</Label>
                    <Input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(event) => setField("phoneNumber", event.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting || !isFormValid} className="w-full h-11">
                  {isSubmitting ? "Submitting request..." : "Request system deployment discussion"}
                </Button>
              </form>
            </article>

            <article className="card-premium space-y-4">
              <h2 className="text-xl font-semibold">Structured request scope</h2>
              <p className="text-sm text-muted-foreground">Active path: {selectedPath.title}</p>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                <p className="text-sm text-muted-foreground">{selectedPath.intent}</p>
                <p className="text-sm text-muted-foreground">{selectedPath.productLinkage}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
                <h3 className="font-semibold">System linkage</h3>
                <p className="text-sm text-muted-foreground">MeterFlow → billing and municipal data execution.</p>
                <p className="text-sm text-muted-foreground">ShedSense → energy telemetry and outage operations.</p>
                <p className="text-sm text-muted-foreground">Studio → API and integration infrastructure.</p>
                <p className="text-sm text-muted-foreground">Labs → prototype pathways for hardware and applied R&D.</p>
              </div>
            </article>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">Response expectations</h2>
            <p className="text-muted-foreground">
              Initial technical triage response timeline: within 24 hours.
            </p>
            <p className="text-muted-foreground">
              Follow-up options: technical call, system demonstration, or pilot discussion.
            </p>
            <p className="text-muted-foreground">
              Requests are routed by entry path, deployment context, and system of interest.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
