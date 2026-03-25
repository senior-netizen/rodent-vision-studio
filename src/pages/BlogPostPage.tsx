import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { findPostBySlug } from "@/lib/blogStore";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = useMemo(() => (slug ? findPostBySlug(slug) : undefined), [slug]);

  usePageMetadata(post?.title ?? "Systems Journal Record", post?.excerpt ?? "Infrastructure engineering record.");

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold">Record not found</h1>
            <Link to="/blog" className="text-accent">
              Back to systems journal
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6 lg:px-8 max-w-4xl space-y-6">
          <Link to="/blog" className="text-sm text-accent">
            ← Back to systems journal
          </Link>
          <header className="space-y-2">
            <p className="text-xs text-muted-foreground">
              {post.format} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <h1 className="text-4xl font-semibold">{post.title}</h1>
            <p className="text-muted-foreground">{post.author}</p>
          </header>
          <pre className="leading-7 text-foreground/90 whitespace-pre-wrap rounded-2xl border border-border/60 bg-card p-6 text-sm overflow-x-auto">
            {post.content}
          </pre>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
