import { useState, type ComponentType, type FormEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useToast } from "@/hooks/use-toast";
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
import { Layers3, Cpu, FlaskConical, RadioTower, ArrowRightLeft } from "lucide-react";

type TrackId = "infrastructure-engineering" | "hardware-energy" | "systems-research" | "field-systems";

type AccessTrack = {
  id: TrackId;
  title: string;
  systemFocus: string;
  builds: string;
  feeds: string;
  icon: ComponentType<{ className?: string }>;
};

const accessTracks: AccessTrack[] = [
  {
    id: "infrastructure-engineering",
    title: "INFRASTRUCTURE ENGINEERING",
    systemFocus: "API systems, data pipelines, and validation systems.",
    builds: "Builds API contracts, ingestion modules, and rule-enforcement services.",
    feeds:
      "Feeds MeterFlow billing APIs, ShedSense telemetry ingestion, Labs validation experiments, and Studio integration layers.",
    icon: Layers3,
  },
  {
    id: "hardware-energy",
    title: "HARDWARE + ENERGY SYSTEMS",
    systemFocus: "Turbines, telemetry channels, and sensor systems.",
    builds: "Builds edge telemetry modules, sensor adapters, and reliability controls.",
    feeds:
      "Feeds ShedSense outage intelligence, MeterFlow metering inputs, Labs hardware prototypes, and Studio device-to-API integrations.",
    icon: Cpu,
  },
  {
    id: "systems-research",
    title: "SYSTEMS RESEARCH (LABS)",
    systemFocus: "Experimental systems under constrained operating environments.",
    builds: "Builds test harnesses, simulation pipelines, and experimental infrastructure modules.",
    feeds:
      "Feeds Labs research tracks, Studio architecture baselines, MeterFlow model validation, and ShedSense anomaly pipelines.",
    icon: FlaskConical,
  },
  {
    id: "field-systems",
    title: "FIELD SYSTEMS",
    systemFocus: "Municipal deployments and data capture systems.",
    builds: "Builds deployment adapters, field capture workflows, and operations monitoring modules.",
    feeds:
      "Feeds MeterFlow municipal operations, ShedSense field telemetry, Labs deployment studies, and Studio rollout infrastructure.",
    icon: RadioTower,
  },
];

const experienceLevels = [
  "Production systems contributor",
  "Distributed systems implementer",
  "Infrastructure module engineer",
  "Field deployment specialist",
  "Systems research contributor",
];

const contributionTargets = [
  "API module development",
  "Ingestion and validation pipeline development",
  "Telemetry and hardware adapter development",
  "Municipal deployment integration",
  "Monitoring and reliability instrumentation",
];

const Opportunities = () => {
  usePageMetadata(
    "Infrastructure Access Layers",
    "Controlled access layer for infrastructure system development and execution tracks."
  );

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTrack, setActiveTrack] = useState<TrackId>("infrastructure-engineering");
  const [formData, setFormData] = useState({
    systemInterest: "",
    experienceLevel: "",
    intendedContribution: "",
    selectedTrack: "infrastructure-engineering" as TrackId,
    fullName: "",
    workEmail: "",
  });

  const isFormValid =
    formData.systemInterest.length > 0 &&
    formData.experienceLevel.length > 0 &&
    formData.intendedContribution.length > 0 &&
    formData.selectedTrack.length > 0 &&
    formData.fullName.length > 1 &&
    formData.workEmail.includes("@");

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectTrack = (trackId: TrackId) => {
    setActiveTrack(trackId);
    setFormData((prev) => ({ ...prev, selectedTrack: trackId }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const endpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT || "https://api.web3forms.com/submit";
    const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;

    if (!accessKey) {
      toast({
        title: "Missing gateway configuration",
        description: "Set VITE_CONTACT_ACCESS_KEY to enable participation profile delivery.",
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
          subject: `Track access request: ${formData.selectedTrack}`,
          selected_track: formData.selectedTrack,
          system_interest: formData.systemInterest,
          experience_level: formData.experienceLevel,
          intended_contribution: formData.intendedContribution,
          full_name: formData.fullName,
          work_email: formData.workEmail,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit participation profile");
      }

      toast({
        title: "Participation profile submitted",
        description: "Capability review initiated for selected infrastructure track.",
      });

      setFormData({
        systemInterest: "",
        experienceLevel: "",
        intendedContribution: "",
        selectedTrack: activeTrack,
        fullName: "",
        workEmail: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Participation profile submission failed.";
      toast({
        title: "Submission failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-8">
          <section className="card-premium space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Access to infrastructure system development and execution layers
            </h1>
            <p className="text-lg text-muted-foreground">
              Limited participation in API systems, energy infrastructure, and data systems.
            </p>
          </section>

          <section className="card-premium space-y-3">
            <h2 className="text-2xl font-semibold">Entry conditions</h2>
            <p className="text-muted-foreground">Participation is limited to capability-aligned system contributors.</p>
            <p className="text-muted-foreground">Selection is based on demonstrated infrastructure implementation capacity.</p>
            <p className="text-muted-foreground">Expected contribution is delivery of systems, modules, and infrastructure components.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Access tracks</h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {accessTracks.map((track) => {
                const Icon = track.icon;
                const active = activeTrack === track.id;
                return (
                  <button
                    type="button"
                    key={track.id}
                    onClick={() => selectTrack(track.id)}
                    className={`card-premium text-left space-y-3 border transition-colors ${
                      active ? "border-accent" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-accent" />
                      <h3 className="text-lg font-semibold">{track.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">System focus: {track.systemFocus}</p>
                    <p className="text-sm text-muted-foreground">What is built: {track.builds}</p>
                    <p className="text-sm text-muted-foreground">Feeds: {track.feeds}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <article className="card-premium space-y-4">
              <h2 className="text-2xl font-semibold">Submit participation profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Track</Label>
                    <Select value={formData.selectedTrack} onValueChange={(value) => selectTrack(value as TrackId)}>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accessTracks.map((track) => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>System interest</Label>
                    <Select value={formData.systemInterest} onValueChange={(value) => setField("systemInterest", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MeterFlow">MeterFlow</SelectItem>
                        <SelectItem value="ShedSense">ShedSense</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="Labs">Labs</SelectItem>
                        <SelectItem value="Cross-system">Cross-system</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Experience level</Label>
                    <Select value={formData.experienceLevel} onValueChange={(value) => setField("experienceLevel", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Intended contribution</Label>
                    <Select
                      value={formData.intendedContribution}
                      onValueChange={(value) => setField("intendedContribution", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select contribution" />
                      </SelectTrigger>
                      <SelectContent>
                        {contributionTargets.map((target) => (
                          <SelectItem key={target} value={target}>
                            {target}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Label>Work email</Label>
                    <Input
                      type="email"
                      value={formData.workEmail}
                      onChange={(event) => setField("workEmail", event.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting || !isFormValid} className="w-full h-11">
                  {isSubmitting
                    ? "Submitting profile..."
                    : "Request access to infrastructure engineering track"}
                </Button>
              </form>
            </article>

            <article className="card-premium space-y-4">
              <h2 className="text-xl font-semibold">System linkage diagram</h2>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2 text-sm text-muted-foreground">
                <p>Selected track: {accessTracks.find((track) => track.id === activeTrack)?.title}</p>
                <p className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-accent" />
                  Modules route into Studio integration layers.
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-accent" />
                  Data and telemetry outputs route into MeterFlow and ShedSense.
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-accent" />
                  Experimental pathways route into Labs validation and simulation systems.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                Output expectation: contributors build production modules, integration services, and infrastructure components.
              </div>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Opportunities;
