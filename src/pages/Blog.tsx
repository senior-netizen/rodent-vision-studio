import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { getBlogPosts } from "@/lib/blogStore";
import { useBlogAuth } from "@/context/BlogAuthContext";
import { Button } from "@/components/ui/button";
import { BLOG_FORMATS } from "@/types/blog";

const Blog = () => {
  usePageMetadata("Blog", "Engineering notes, field reports, build logs, grid experiments, post-mortems, and research drops.");
  const posts = getBlogPosts();
  const { isLoggedIn, logout } = useBlogAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-semibold">Engineering Journal</h1>
              <p className="text-muted-foreground">Field notes from real builds, outages, tests, and release cycles.</p>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Button asChild>
                    <Link to="/blog/new">Publish Entry</Link>
                  </Button>
                  <Button variant="secondary" onClick={logout}>Log out</Button>
                </>
              ) : (
                <Button asChild>
                  <Link to="/blog/login">Admin Login</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {BLOG_FORMATS.map((format) => (
              <span key={format} className="text-xs px-3 py-1 rounded-full border border-border/60 bg-secondary text-muted-foreground">
                {format}
              </span>
            ))}
          </div>

          <div className="grid gap-5">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="rounded-2xl border border-border/60 p-6 hover:border-accent/60 transition-colors bg-card">
                <p className="text-xs text-muted-foreground mb-2">{post.format} • {new Date(post.createdAt).toLocaleDateString()}</p>
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
