import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { findPostBySlug } from "@/lib/blogStore";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = useMemo(() => (slug ? findPostBySlug(slug) : undefined), [slug]);

  usePageMetadata(post?.title ?? "Blog Post", post?.excerpt ?? "Blog article.");

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold">Post not found</h1>
            <Link to="/blog" className="text-accent">Back to blog</Link>
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
        <article className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-6">
          <Link to="/blog" className="text-sm text-accent">← Back to blog</Link>
          <header className="space-y-2">
            <p className="text-xs text-muted-foreground">{post.format} • {new Date(post.createdAt).toLocaleDateString()}</p>
            <h1 className="text-4xl font-semibold">{post.title}</h1>
            <p className="text-muted-foreground">By {post.author}</p>
          </header>
          <p className="leading-8 text-foreground/90 whitespace-pre-line">{post.content}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
