import lightsOutMap from "@/assets/lights-out-map.jpg";
import { AlertCircle, Zap, ZapOff } from "lucide-react";

interface ShedSenseMapProps {
  className?: string;
}

type OutageStatus = "active" | "scheduled" | "clear";

const outageLocations: {
  name: string;
  status: OutageStatus;
  window: string;
  position: { top: string; left: string };
}[] = [
  {
    name: "Harare CBD",
    status: "active",
    window: "Restoration ETA: 45 minutes",
    position: { top: "42%", left: "62%" },
  },
  {
    name: "Bulawayo",
    status: "scheduled",
    window: "Scheduled outage 14:00 - 18:00",
    position: { top: "55%", left: "48%" },
  },
  {
    name: "Mutare",
    status: "active",
    window: "Grid instability — rerouting power",
    position: { top: "48%", left: "70%" },
  },
  {
    name: "Gweru",
    status: "clear",
    window: "Grid stable — monitoring sensors",
    position: { top: "52%", left: "55%" },
  },
];

const statusStyles: Record<OutageStatus, string> = {
  active: "bg-energy shadow-[0_0_0_8px_rgba(255,165,0,0.1)]",
  scheduled: "bg-destructive shadow-[0_0_0_8px_rgba(220,38,38,0.12)]",
  clear: "bg-tech shadow-[0_0_0_8px_rgba(56,189,248,0.12)]",
};

const statusCopy: Record<OutageStatus, string> = {
  active: "Current outage — crews dispatched",
  scheduled: "Scheduled maintenance window",
  clear: "Power stable — sensors online",
};

const ShedSenseMap = ({ className }: ShedSenseMapProps) => {
  return (
    <div className={className}>
      <div className="glass rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Live outage overlays</p>
            <h3 className="text-2xl font-bold">Token-free, always-on map</h3>
            <p className="text-sm text-muted-foreground">
              No setup steps required. We ship a tokenless basemap and render outage markers instantly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-energy animate-pulse" aria-hidden />
              <span>Active outage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive" aria-hidden />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-tech" aria-hidden />
              <span>Stable</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6 items-start">
          <div className="relative h-[460px] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-background/40 via-background/30 to-background/60">
            <img
              src={lightsOutMap}
              alt="Regional power coverage map"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/60" />
            <div className="absolute inset-6 rounded-xl border border-border/30" />

            {outageLocations.map((location) => (
              <div
                key={location.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: location.position.top, left: location.position.left }}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white ${statusStyles[location.status]} animate-glow`}
                  aria-hidden
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 min-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="glass p-3 rounded-xl shadow-lg">
                    <p className="text-sm font-semibold">{location.name}</p>
                    <p className="text-xs text-muted-foreground">{statusCopy[location.status]}</p>
                    <p className="text-xs mt-1 text-energy font-medium">{location.window}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/70 border border-border/50">
                <Zap className="w-4 h-4 text-energy" />
                <span>Real sensor pings</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/70 border border-border/50">
                <ZapOff className="w-4 h-4 text-destructive" />
                <span>Load-shedding windows</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {outageLocations.map((location) => (
              <div key={location.name} className="glass rounded-xl p-4 flex items-center gap-3 border border-border/40">
                <span className={`w-3 h-3 rounded-full ${statusStyles[location.status]}`} aria-hidden />
                <div className="space-y-1">
                  <p className="font-semibold leading-none">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{statusCopy[location.status]}</p>
                  <p className="text-xs text-energy font-medium">{location.window}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Edge-friendly fallback</p>
                <p className="text-muted-foreground">
                  The visual map works fully offline and without any external tokens. Add your own live data feed later without
                  changing the UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShedSenseMap;
