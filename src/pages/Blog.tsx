import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { getBlogPosts } from "@/lib/blogStore";
import { useBlogAuth } from "@/context/BlogAuthContext";
import { Button } from "@/components/ui/button";
import { BLOG_FORMATS } from "@/types/blog";

const exampleTitles = [
  "Ingestion Pipeline Design for Unreliable Utility Feeder Telemetry",
  "MeterFlow Route Versioning Under Weekly Boundary Changes",
  "API Backpressure Controls During Municipal Billing Cutoff Windows",
  "ShedSense Outage Event Deduplication at 18x Replay Load",
  "Designing Dispute-Ready Image Hash Chains for Meter Evidence",
  "Failure Modes in Cross-District Tariff Synchronization",
  "Real-Time Anomaly Detection for Zero-Usage Meter Clusters",
  "Data Contract Governance for Utility Partner Integrations",
];

const Blog = () => {
  usePageMetadata(
    "Systems Journal",
    "Infrastructure intelligence layer for MeterFlow, ShedSense, API infrastructure, and energy systems.",
  );
  const posts = getBlogPosts();
  const { isLoggedIn, logout } = useBlogAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-semibold">Systems Journal</h1>
              <p className="text-muted-foreground">
                System-backed engineering output for MeterFlow, ShedSense, API infrastructure, and municipal energy operations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Button asChild>
                    <Link to="/blog/new">Publish System Record</Link>
                  </Button>
                  <Button variant="secondary" onClick={logout}>
                    Log out
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link to="/blog/login">Admin Login</Link>
                </Button>
              )}
            </div>
          </div>

          <section className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Journal Structure</h2>
            <p className="text-sm text-muted-foreground">
              Accepted categories: System breakdown, Field report, Architecture paper. Every record must include Problem,
              System Design, Data Flow, Constraints, Implementation, and Output.
            </p>
            <div className="flex flex-wrap gap-2">
              {BLOG_FORMATS.map((format) => (
                <span
                  key={format}
                  className="text-xs px-3 py-1 rounded-full border border-border/60 bg-secondary text-muted-foreground"
                >
                  {format}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-6 space-y-3">
            <h2 className="text-xl font-semibold">Pipeline Backlog: Candidate Records</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {exampleTitles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </section>

          <div className="grid gap-5">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="rounded-2xl border border-border/60 p-6 hover:border-accent/60 transition-colors bg-card"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  {post.format} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
