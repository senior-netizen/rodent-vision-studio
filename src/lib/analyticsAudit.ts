export type AuditEventType = "abstract_download_requested" | "abstract_download_succeeded" | "abstract_download_failed";

export type AuditEvent = {
  id: string;
  eventType: AuditEventType;
  projectSlug: string;
  projectName: string;
  source: string;
  timestamp: string;
  details?: string;
};

const AUDIT_STORAGE_KEY = "rodent_audit_events";

const safeRead = (): AuditEvent[] => {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AuditEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (events: AuditEvent[]) => {
  localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(events));
};

export const recordAuditEvent = (event: Omit<AuditEvent, "id" | "timestamp">) => {
  const events = safeRead();
  const next: AuditEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  events.unshift(next);
  write(events.slice(0, 2000));
};

export const getAuditEvents = (projectSlug?: string) => {
  const events = safeRead();
  if (!projectSlug) return events;
  return events.filter((event) => event.projectSlug === projectSlug);
};

const downloadTextFile = (filename: string, contents: string, mime: string) => {
  const blob = new Blob([contents], { type: mime });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

export const exportAuditCsv = (projectSlug: string, projectName: string) => {
  const rows = getAuditEvents(projectSlug);
  const header = "timestamp,eventType,projectSlug,projectName,source,details";
  const lines = rows.map((row) =>
    [row.timestamp, row.eventType, row.projectSlug, row.projectName, row.source, row.details ?? ""]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csv = [header, ...lines].join("\n");
  const filename = `${projectSlug || "project"}-download-audit.csv`;
  downloadTextFile(filename, csv, "text/csv;charset=utf-8");

  recordAuditEvent({
    eventType: "abstract_download_succeeded",
    projectSlug,
    projectName,
    source: "audit_csv_export",
    details: `rows=${rows.length}`,
  });
};
