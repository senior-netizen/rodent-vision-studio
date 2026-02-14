import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBlogAuth } from "@/context/BlogAuthContext";

const BlogLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useBlogAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!import.meta.env.VITE_BLOG_ADMIN_PASSWORD) {
      setError("Admin login is not configured yet. Set VITE_BLOG_ADMIN_PASSWORD in your environment.");
      return;
    }

    const ok = login(password);
    if (!ok) {
      setError("Invalid password.");
      return;
    }

    navigate("/blog/new");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-md">
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
            <h1 className="text-2xl font-semibold">Blog Admin Login</h1>
            <p className="text-sm text-muted-foreground">Login to create and publish blog posts.</p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button className="w-full" type="submit">Login</Button>
            </form>

            <Link to="/blog" className="text-sm text-accent">Back to blog</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogLogin;
