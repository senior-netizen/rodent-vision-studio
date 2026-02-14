import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBlogAuth } from "@/context/BlogAuthContext";
import { saveBlogPost, slugify } from "@/lib/blogStore";
import { BLOG_FORMATS, type BlogFormat } from "@/types/blog";

const BlogNewPost = () => {
  const { isLoggedIn } = useBlogAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Rodent Team");
  const [format, setFormat] = useState<BlogFormat>("Engineering notes");

  if (!isLoggedIn) return <Navigate to="/blog/login" replace />;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const slug = slugify(title);

    saveBlogPost({
      id: crypto.randomUUID(),
      title,
      slug,
      excerpt,
      content,
      author,
      format,
      createdAt: new Date().toISOString(),
    });

    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-5">
          <h1 className="text-3xl font-semibold">Publish Journal Entry</h1>
          <p className="text-sm text-muted-foreground">Keep it technical and specific: what happened, what changed, and what you learned.</p>
          <form className="rounded-2xl border border-border/60 bg-card p-6 space-y-4" onSubmit={submit}>
            <Input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input placeholder="Short excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
            <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={format}
              onChange={(e) => setFormat(e.target.value as BlogFormat)}
            >
              {BLOG_FORMATS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <Textarea
              placeholder="Write details, metrics, timeline, and decisions. Avoid generic marketing language."
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex items-center gap-3">
              <Button type="submit">Publish</Button>
              <Button type="button" variant="secondary" asChild>
                <Link to="/blog">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogNewPost;
