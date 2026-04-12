export type AnalyticsEvent = {
  name: string;
  metadata?: Record<string, string>;
};

export function trackEvent(event: AnalyticsEvent) {
  const payload = JSON.stringify({
    ...event,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    navigator.sendBeacon('/api/analytics', payload);
    return;
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });
}
