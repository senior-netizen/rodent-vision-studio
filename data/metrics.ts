export type ImpactMetric = {
  label: string;
  value: string;
  context: string;
};

export const impactMetrics: ImpactMetric[] = [
  {
    label: 'Systems Delivered',
    value: '18+',
    context: 'Production platforms shipped across energy, industrial and payments workloads.',
  },
  {
    label: 'Avg. Uptime Baseline',
    value: '99.95%',
    context: 'Observed across client systems after hardening and reliability pass.',
  },
  {
    label: 'Ops Response Improvement',
    value: '42%',
    context: 'Median reduction in event-to-action time after control-plane rollout.',
  },
  {
    label: 'Audit Readiness Time',
    value: '-58%',
    context: 'Reduction in compliance report preparation overhead.',
  },
];
