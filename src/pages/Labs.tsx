import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  ArrowUpRight,
  Cpu,
  Database,
  HardDrive,
  Network,
  Workflow,
} from "lucide-react";

type MaturityStatus = "Research" | "Prototype" | "Field Testing" | "Integrated";

type LabDefinition = {
  title: string;
  problem: string;
  systemLayer: "Hardware" | "API" | "Data ingestion" | "Validation" | "Analytics";
  buildExperiment: string;
  dataFlow: string[];
  constraints: string[];
  output: string;
  systemConnection: string;
  maturity: MaturityStatus;
  visualInstructions: {
    systemDiagram: string;
    dataPipeline: string;
    interfacePreview: string;
  };
  icon: typeof HardDrive;
};

const labs: LabDefinition[] = [
  {
    title: "Distributed Wind Telemetry System",
    problem: "Unstable microgrid supply requires deterministic turbine telemetry delivery.",
    systemLayer: "Hardware",
    buildExperiment:
      "Tests sensor packet reliability and controller failover under variable wind load.",
    dataFlow: ["Turbine Sensors", "Edge Controller", "Telemetry API", "Energy Dashboard"],
    constraints: [
      "intermittent uplink in peri-urban zones",
      "temperature-driven sensor drift",
      "power fluctuations at edge controllers",
    ],
    output: "Telemetry edge module and fault-tolerant firmware package.",
    systemConnection:
      "Feeds Energy Intelligence service used by ShedSense infrastructure operations.",
    maturity: "Field Testing",
    visualInstructions: {
      systemDiagram: "Place hardware topology diagram above metrics table.",
      dataPipeline: "Render packet path from turbine sensor bus to telemetry API.",
      interfacePreview: "Show controller diagnostics panel with packet loss and failover state.",
    },
    icon: HardDrive,
  },
  {
    title: "Municipal Data Capture Validation Engine",
    problem: "Unreliable field records generate billing mismatches and delayed reconciliation.",
    systemLayer: "Validation",
    buildExperiment:
      "Tests schema validation accuracy and duplicate detection under mixed device uploads.",
    dataFlow: ["Field Meter App", "Ingestion Queue", "Validation Engine", "Billing Ledger API"],
    constraints: [
      "inconsistent meter identifier formats",
      "partial offline submissions",
      "high duplicate upload rates during reconnect",
    ],
    output: "Validation service with rejection rules and reconciliation events.",
    systemConnection: "Feeds municipal billing systems and downstream payment reconciliation.",
    maturity: "Prototype",
    visualInstructions: {
      systemDiagram: "Place validator component map with queue and rules engine boundaries.",
      dataPipeline: "Render upload-to-ledger flow with validation gates.",
      interfacePreview: "Show rejection log panel with error class and retry disposition.",
    },
    icon: Database,
  },
  {
    title: "Grid Edge Outage Detection API",
    problem: "Low-connectivity feeders require outage detection without continuous cloud access.",
    systemLayer: "API",
    buildExperiment:
      "Tests outage event ingestion idempotency and delayed sync conflict handling.",
    dataFlow: ["Feeder Node", "Edge Buffer", "Outage API", "Operations Dispatch Console"],
    constraints: [
      "long offline windows during storm conditions",
      "clock drift across feeder nodes",
      "burst sync after connectivity restoration",
    ],
    output: "Outage detection API with deduplication and conflict resolution module.",
    systemConnection:
      "Feeds dispatch routing pipeline used by field response infrastructure.",
    maturity: "Integrated",
    visualInstructions: {
      systemDiagram: "Place API boundary diagram with edge buffer and conflict resolver.",
      dataPipeline: "Render outage event sequence from feeder node to dispatch console.",
      interfacePreview: "Show API event timeline with sync status and dedupe decisions.",
    },
    icon: Network,
  },
  {
    title: "Operational Incident Analytics Pipeline",
    problem: "Inconsistent incident telemetry delays root-cause isolation for platform outages.",
    systemLayer: "Analytics",
    buildExperiment:
      "Tests feature extraction latency and alert precision under multi-source incident streams.",
    dataFlow: ["Service Logs", "Event Stream", "Analytics Engine", "Incident Command Dashboard"],
    constraints: [
      "heterogeneous log schema across services",
      "high cardinality event attributes",
      "strict alert latency threshold under load",
    ],
    output: "Incident scoring subsystem and actionable alert stream.",
    systemConnection:
      "Feeds operations command workflow and automated runbook execution platform.",
    maturity: "Research",
    visualInstructions: {
      systemDiagram: "Place analytics service map with stream processor and scoring worker.",
      dataPipeline: "Render logs-to-alert path with transformation stages.",
      interfacePreview: "Show incident dashboard panel with confidence score and escalation state.",
    },
    icon: Cpu,
  },
];

const maturityOrder: MaturityStatus[] = ["Research", "Prototype", "Field Testing", "Integrated"];

const Labs = () => {
  usePageMetadata(
    "Engineering Pipeline",
    "Systems engineered under constraint before deployment into production infrastructure."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Top Section */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight">
              ENGINEERING PIPELINE
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Systems engineered under constraint before deployment into infrastructure
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Labs are controlled environments where systems are built, tested, and validated before integration into production infrastructure.
            </p>
          </div>

          {/* Infrastructure Pipeline */}
          <section className="mb-16 card-premium animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <Workflow className="w-6 h-6 text-energy" />
              <h2 className="text-3xl font-semibold">INFRASTRUCTURE PIPELINE</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {maturityOrder.map((stage) => {
                const count = labs.filter((lab) => lab.maturity === stage).length;
                return (
                  <div key={stage} className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">
                      {stage}
                    </p>
                    <p className="text-lg font-semibold">
                      {count} {count === 1 ? "Lab" : "Labs"}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Lab → Prototype → Field Test → Production System
            </p>
          </section>

          {/* Lab Entries */}
          <div className="space-y-10">
            {labs.map((lab, index) => {
              const Icon = lab.icon;
              return (
                <div
                  key={lab.title}
                  className="card-premium animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                      <Icon className="w-7 h-7 text-energy" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold">{lab.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">MATURITY STATUS: {lab.maturity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        PROBLEM
                      </h3>
                      <p>{lab.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        SYSTEM LAYER
                      </h3>
                      <p>{lab.systemLayer}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        BUILD / EXPERIMENT
                      </h3>
                      <p>{lab.buildExperiment}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        OUTPUT
                      </h3>
                      <p>{lab.output}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      DATA FLOW
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {lab.dataFlow.map((node, nodeIndex) => (
                        <div key={node} className="flex items-center gap-2">
                          <span className="badge-premium">{node}</span>
                          {nodeIndex < lab.dataFlow.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      CONSTRAINTS
                    </h3>
                    <ul className="space-y-2">
                      {lab.constraints.map((constraint) => (
                        <li key={constraint} className="text-muted-foreground">
                          • {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        SYSTEM CONNECTION
                      </h3>
                      <p>{lab.systemConnection}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        INFRASTRUCTURE PIPELINE POSITION
                      </h3>
                      <p>
                        {lab.title} → {lab.maturity} → Production System
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      VISUAL PLACEMENT INSTRUCTIONS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                          System Diagram
                        </p>
                        <p className="text-sm">{lab.visualInstructions.systemDiagram}</p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                          Data Pipeline Diagram
                        </p>
                        <p className="text-sm">{lab.visualInstructions.dataPipeline}</p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                          Interface / Hardware Preview
                        </p>
                        <p className="text-sm">{lab.visualInstructions.interfacePreview}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    Request infrastructure integration review
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Labs;
