import type { ComponentType, ReactNode } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Cloud,
  CloudUpload,
  Gauge,
  LogIn,
  MapPinned,
  Radio,
  ScanLine,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wifi,
} from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

const statCards: StatCardProps[] = [
  { label: "Pending sync", value: "12", icon: CloudUpload },
  { label: "Synced today", value: "248", icon: CheckCircle2 },
  { label: "Route coverage", value: "91%", icon: MapPinned },
];

const dashboardMetrics = [
  {
    title: "Captured today",
    value: "248",
    description: "Readings captured across 9 routes with offline queue protection.",
    icon: Gauge,
  },
  {
    title: "Anomalies flagged",
    value: "7",
    description: "Leak, tamper, and unread exceptions promoted for supervisor review.",
    icon: ShieldCheck,
  },
  {
    title: "Sync health",
    value: "Stable",
    description: "Queued uploads resume automatically when field connectivity returns.",
    icon: Radio,
  },
];

const loginBenefits = [
  "Role-aware access for field officers and supervisors",
  "Demo-friendly onboarding without changing production authentication patterns",
  "Clear mobile-first controls for low-bandwidth environments",
];

const DeviceFrame = ({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) => (
  <div className="relative mx-auto w-full max-w-[340px] rounded-[2.5rem] border border-border/60 bg-slate-950 p-3 shadow-[0_24px_90px_rgba(15,23,42,0.35)]">
    <div className="absolute inset-x-0 top-3 mx-auto h-6 w-32 rounded-full bg-slate-900" />
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]">
      <div className={`h-1.5 w-full ${accent}`} />
      {children}
    </div>
  </div>
);

export const MeterFlowShowcase = () => {
  return (
    <section className="space-y-8 rounded-[2rem] border border-border/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-slate-50 shadow-premium lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-sky-200">
            <Smartphone className="h-3.5 w-3.5" />
            Field image-driven experience
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold lg:text-3xl">MeterFlow mobile experience, refined from the attached field screens</h2>
            <p className="text-sm leading-7 text-slate-300 lg:text-base">
              The portfolio page now presents MeterFlow as a production-ready field platform with a polished sign-in flow,
              resilient dashboard state, and operator-focused route telemetry inspired by the supplied mobile references.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px]">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-xl bg-sky-400/10 p-2 text-sky-300">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 lg:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Operator console</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Dashboard state optimized for route execution</h3>
            </div>
            <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200 sm:block">
              Offline ready
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <DeviceFrame accent="bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400">
              <div className="space-y-5 px-5 pb-6 pt-8 text-slate-900">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                  <span>MeterFlow</span>
                  <span>Online</span>
                </div>

                <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Welcome back</p>
                      <p className="text-2xl font-semibold">Demo Officer</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-[1.5rem] bg-sky-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-2 text-sky-700 shadow-sm">
                        <Wifi className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Wi‑Fi connected</p>
                        <p className="text-sm text-slate-500">Pending readings resume when sync queue opens.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[1.5rem] bg-white p-3 text-center shadow-sm">
                    <CloudUpload className="mx-auto h-4 w-4 text-slate-500" />
                    <p className="mt-2 text-2xl font-semibold">12</p>
                    <p className="text-xs text-slate-500">Pending</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white p-3 text-center shadow-sm">
                    <CheckCircle2 className="mx-auto h-4 w-4 text-slate-500" />
                    <p className="mt-2 text-2xl font-semibold">248</p>
                    <p className="text-xs text-slate-500">Synced</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white p-3 text-center shadow-sm">
                    <CalendarDays className="mx-auto h-4 w-4 text-slate-500" />
                    <p className="mt-2 text-2xl font-semibold">24</p>
                    <p className="text-xs text-slate-500">Today</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold">Quick Actions</p>
                    <p className="text-sm text-slate-500">Field officers move from scan to sync without leaving the primary task flow.</p>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-blue-600 px-4 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.3)]">
                    <ScanLine className="h-5 w-5" />
                    Scan meter
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium">
                      Open sync
                    </div>
                    <div className="rounded-[1.35rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-400">
                      Recent update
                    </div>
                  </div>
                </div>
              </div>
            </DeviceFrame>

            <div className="space-y-4">
              {dashboardMetrics.map(({ title, value, description, icon: Icon }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{title}</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
                    </div>
                    <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
              <div className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5 text-sm leading-6 text-sky-100">
                The dashboard composition keeps primary actions high-contrast and thumb reachable, while supervisor metrics remain visible for
                planning and audit readiness.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/5 p-5 lg:p-6">
          <div className="mb-5 space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Authentication touchpoint</p>
            <h3 className="text-xl font-semibold text-white">Sign-in experience aligned to municipal field deployments</h3>
            <p className="text-sm leading-6 text-slate-300">
              The login screen mirrors the provided municipal reader concept with cleaner spacing, stronger focus states, and guidance for demo or staged rollouts.
            </p>
          </div>

          <div className="grid gap-6">
            <DeviceFrame accent="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600">
              <div className="space-y-5 px-5 pb-6 pt-10 text-slate-900">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
                    <Cloud className="h-9 w-9 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">Masvingo Meter Reader</p>
                    <p className="text-sm text-slate-500">City of Masvingo • Water Department</p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <div className="mb-4">
                    <p className="text-2xl font-semibold">Sign in</p>
                  </div>
                  <div className="space-y-3">
                    <label className="block space-y-2 text-left text-sm text-slate-500">
                      <span>Username</span>
                      <div className="rounded-[1.25rem] border-2 border-sky-500 bg-slate-50 px-4 py-3 text-lg text-slate-900 shadow-[0_0_0_4px_rgba(14,165,233,0.08)]">
                        officertsvangira
                      </div>
                    </label>
                    <label className="block space-y-2 text-left text-sm text-slate-500">
                      <span>Password</span>
                      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-lg tracking-[0.3em] text-slate-900">
                        ••••
                      </div>
                    </label>
                  </div>
                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-blue-600 px-4 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)]">
                    <LogIn className="h-5 w-5" />
                    Continue
                  </button>
                  <p className="mt-4 text-sm text-slate-500">Using demo credentials by default. Edit if needed.</p>
                </div>
              </div>
            </DeviceFrame>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-white">Why this matters</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {loginBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Activity className="mt-1 h-4 w-4 flex-none text-sky-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
