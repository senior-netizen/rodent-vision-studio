import { BLOG_FORMATS, type BlogFormat, type BlogPost } from "@/types/blog";

const BLOG_STORAGE_KEY = "rodent_blog_posts";
const isBrowser = typeof window !== "undefined";

const seedPosts: BlogPost[] = [
  {
    id: "seed-1",
    title: "Grid latency spike after feeder switching",
    slug: "grid-latency-spike-after-feeder-switching",
    excerpt: "Field report from a week of outage telemetry where switching events doubled API retry traffic.",
    content:
      "We observed repeated latency spikes after feeder switching windows. Client retries increased 2.1x in the same time bands. Main action items: tighten cache TTL around known switch windows, return explicit retry-after headers, and isolate noisy feeders in dashboard filters.",
    author: "Rodent Team",
    format: "Field reports",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    title: "Post-mortem: missed alert window in Zone 4",
    slug: "post-mortem-missed-alert-window-in-zone-4",
    excerpt: "What failed, what we fixed, and the guardrails now in place.",
    content:
      "Root cause was a stale schedule import that passed schema checks but failed temporal validation. We added schedule freshness assertions, release blocking on stale imports, and explicit operator alerts for feed delays. No user-impacting misses after the patch.",
    author: "Rodent Team",
    format: "Post-mortems",
    createdAt: new Date().toISOString(),
  },
];

const makeId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `post-${Date.now()}`);

const normalizeFormat = (value: unknown): BlogFormat => {
  if (typeof value === "string" && BLOG_FORMATS.includes(value as BlogFormat)) {
    return value as BlogFormat;
  }
  return "Engineering notes";
};

const normalizePost = (post: Partial<BlogPost> & Record<string, unknown>): BlogPost => ({
  id: String(post.id ?? makeId()),
  title: String(post.title ?? "Untitled post"),
  slug: String(post.slug ?? "untitled-post"),
  excerpt: String(post.excerpt ?? ""),
  content: String(post.content ?? ""),
  author: String(post.author ?? "Rodent Team"),
  format: normalizeFormat(post.format),
  createdAt: String(post.createdAt ?? new Date().toISOString()),
});

const readRaw = () => {
  if (!isBrowser) return null;
  return window.localStorage.getItem(BLOG_STORAGE_KEY);
};

const writeRaw = (value: string) => {
  if (!isBrowser) return;
  window.localStorage.setItem(BLOG_STORAGE_KEY, value);
};

export const getBlogPosts = (): BlogPost[] => {
  if (!isBrowser) return seedPosts;

  const raw = readRaw();
  if (!raw) {
    writeRaw(JSON.stringify(seedPosts));
    return seedPosts;
  }

  try {
    const parsed = JSON.parse(raw) as Array<Partial<BlogPost> & Record<string, unknown>>;
    const normalized = parsed.map(normalizePost);
    const sorted = normalized.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    writeRaw(JSON.stringify(sorted));
    return sorted;
  } catch {
    writeRaw(JSON.stringify(seedPosts));
    return seedPosts;
  }
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = getBlogPosts();
  const next = [post, ...posts];
  writeRaw(JSON.stringify(next));
};

export const findPostBySlug = (slug: string) => getBlogPosts().find((p) => p.slug === slug);

export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
