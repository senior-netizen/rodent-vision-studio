import {
  BLOG_FORMATS,
  MANDATORY_POST_TEMPLATE,
  type BlogFormat,
  type BlogPost,
} from "@/types/blog";

const BLOG_STORAGE_KEY = "rodent_blog_posts";

const scopeKeywords = ["meterflow", "shedsense", "api", "energy", "utility", "grid"];

const seedPosts: BlogPost[] = [
  {
    id: "seed-1",
    title: "MeterFlow GPS Boundary Enforcement for Audit-Grade Field Capture",
    slug: "meterflow-gps-boundary-enforcement-audit-grade-field-capture",
    excerpt:
      "System breakdown of geo-fencing, signature validation, and conflict rejection in meter-reading ingestion.",
    content: `Title: MeterFlow GPS Boundary Enforcement for Audit-Grade Field Capture

Problem
Municipal billing disputes were triggered by readings submitted outside assigned service polygons. Invalid capture locations contaminated billing and reduced regulator trust.

System Design
- Collector app signs payload with device keypair and includes GPS coordinates.
- Ingestion API verifies signature, evaluates geofence assignment, and stores immutable audit record.
- Validation service blocks writes when coordinates are outside assigned polygon by >40 meters.

[System Diagram]
Field Device -> API Gateway -> Validation Service -> MeterFlow Event Log -> Billing Export Queue

Data Flow
1) POST /meter-readings receives reading payload and image hash.
2) Validation service compares gps(lat,lng) against assigned_route_polygon.
3) Accepted records write to meter_readings; rejected records write to validation_rejections.
4) Billing export worker reads accepted records every 60 seconds.

[Pipeline Diagram]
Capture -> Signature Verify -> Geo Validate -> Persist -> Export

Constraints
- Low-quality GPS in dense neighborhoods produces ±25m variance.
- Offline capture can delay submissions by up to 12 hours.
- Polygon definitions change weekly and require versioned route lookup.

Implementation
API Example:
POST /meter-readings
{
  "meter_id": "MF-8821",
  "reader_id": "R-114",
  "timestamp": "2026-03-23T11:02:44Z",
  "reading_value": 113920,
  "gps": {"lat": 5.5671, "lng": -0.2219},
  "image_hash": "sha256:8b0f..."
}

Schema:
meter_readings(meter_id, reader_id, timestamp, reading_value, gps, image_hash, route_version)

Validation Rule:
reject_if distance(gps, assigned_polygon(route_version)) > 40m

[Interface Reference]
Dashboard: MeterFlow > Validation Queue > "Out-of-Zone Submissions"

Output
- 31% reduction in contested meter submissions.
- Rejected writes are fully auditable with signed payload trace.
- Billing pipeline exports only zone-valid records.`,
    author: "Infrastructure Systems Team",
    format: "System breakdown",
    createdAt: "2026-03-20T09:30:00.000Z",
  },
  {
    id: "seed-2",
    title: "ShedSense Offline Event Replay During Feeder Outages",
    slug: "shedsense-offline-event-replay-during-feeder-outages",
    excerpt:
      "Field report on delayed telemetry, duplicate replay, and idempotent recovery in municipal outage tracking.",
    content: `Title: ShedSense Offline Event Replay During Feeder Outages

Problem
Substation connectivity loss produced batch replay bursts that duplicated outage events and distorted restoration metrics.

System Design
ShedSense edge nodes persist outage events locally and replay when backhaul returns. API infrastructure enforces idempotency using event_id and source_epoch.

[System Diagram]
Feeder Sensor -> Edge Buffer -> Replay Worker -> Outage API -> Time-Series Store -> Ops Dashboard

Data Flow
- Edge writes events to local append log while offline.
- Replay worker sends POST /ingestion/outages with monotonic sequence.
- API deduplicates by (event_id, source_epoch) and updates outage timeline.

[Pipeline Diagram]
Detect -> Buffer -> Replay -> Deduplicate -> Aggregate

Constraints
- Cellular backhaul dropped for 4-9 hours in three districts.
- Burst replay exceeded normal ingest rate by 18x.
- Operators require minute-level restoration timeline accuracy.

Implementation
Endpoint:
POST /ingestion/outages

Schema:
outage_events(event_id, feeder_id, state, observed_at, source_epoch, source_node, replayed_at)

Validation Rule:
drop_if exists(event_id, source_epoch)

[Interface Reference]
ShedSense Operations Board > Replay Health > Duplicate Suppression Rate

Output
- Duplicate ingest reduced from 22% to 0.3%.
- Restoration KPI variance dropped below 2 minutes.
- Replay backlogs clear within SLA: 14 minutes at p95.`,
    author: "Infrastructure Systems Team",
    format: "Field report",
    createdAt: "2026-03-18T14:05:00.000Z",
  },
  {
    id: "seed-3",
    title: "Audit-Grade Utility Data Model for Low-Trust Billing Environments",
    slug: "audit-grade-utility-data-model-low-trust-billing-environments",
    excerpt:
      "Architecture paper defining immutable events, correction chains, and export controls for municipal billing APIs.",
    content: `Title: Audit-Grade Utility Data Model for Low-Trust Billing Environments

Problem
Billing operations required correction workflows without destroying original field evidence, while preserving regulator-grade traceability.

System Design
Use append-only event storage with correction links. Mutable billing views are derived projections. All API writes are signed and versioned.

[System Diagram]
Capture APIs -> Event Store -> Projection Engine -> Billing Read Model -> Municipal Export Gateway

Data Flow
1) Ingest writes immutable ReadingCaptured event.
2) Corrections generate ReadingCorrected event referencing prior event_id.
3) Projection engine materializes current_balance view.
4) Export gateway ships signed snapshots nightly.

[Pipeline Diagram]
Ingest -> Append -> Project -> Validate -> Export

Constraints
- Regulator audits require historical reconstruction at any point in time.
- Operators need corrected balance in <2 seconds.
- Export files must stay deterministic across retries.

Implementation
Endpoint:
GET /meter-readings?meter_id=MF-8821&as_of=2026-03-01T00:00:00Z

Schema:
reading_events(event_id, type, meter_id, payload_json, parent_event_id, actor_id, created_at, signature)

Validation Rule:
deny_correction_if parent_event_id not found OR signature invalid

[Interface Reference]
Billing Console > Meter Ledger > Event Chain View

Output
- Full temporal reconstruction achieved for 100% audited meters.
- Correction latency: 1.4s p95.
- Export retries are byte-identical with hash verification.`,
    author: "Infrastructure Systems Team",
    format: "Architecture paper",
    createdAt: "2026-03-15T08:10:00.000Z",
  },
];

const normalizeFormat = (value: unknown): BlogFormat => {
  if (typeof value === "string" && BLOG_FORMATS.includes(value as BlogFormat)) {
    return value as BlogFormat;
  }
  return "System breakdown";
};

const isSystemScoped = (post: Partial<BlogPost> & Record<string, unknown>) => {
  const haystack = `${String(post.title ?? "")} ${String(post.excerpt ?? "")} ${String(post.content ?? "")}`.toLowerCase();
  return scopeKeywords.some((keyword) => haystack.includes(keyword));
};

const hasMandatorySections = (content: string) =>
  MANDATORY_POST_TEMPLATE.every((section) => content.includes(`\n${section}\n`) || content.startsWith(`${section}\n`));

const normalizePost = (post: Partial<BlogPost> & Record<string, unknown>): BlogPost | null => {
  const normalized = {
    id: String(post.id ?? crypto.randomUUID()),
    title: String(post.title ?? "Untitled system note"),
    slug: String(post.slug ?? "untitled-system-note"),
    excerpt: String(post.excerpt ?? ""),
    content: String(post.content ?? ""),
    author: String(post.author ?? "Infrastructure Systems Team"),
    format: normalizeFormat(post.format),
    createdAt: String(post.createdAt ?? new Date().toISOString()),
  };

  if (!isSystemScoped(normalized) || !hasMandatorySections(normalized.content)) {
    return null;
  }

  return normalized;
};

export const getBlogPosts = (): BlogPost[] => {
  const raw = localStorage.getItem(BLOG_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }

  try {
    const parsed = JSON.parse(raw) as Array<Partial<BlogPost> & Record<string, unknown>>;
    const normalized = parsed
      .map(normalizePost)
      .filter((post): post is BlogPost => post !== null);

    const fallback = normalized.length > 0 ? normalized : seedPosts;
    const sorted = fallback.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(sorted));
    return sorted;
  } catch {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = getBlogPosts();
  const next = [post, ...posts];
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(next));
};

export const findPostBySlug = (slug: string) => getBlogPosts().find((p) => p.slug === slug);

export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
