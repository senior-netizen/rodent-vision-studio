import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BlogAuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const BLOG_SESSION_KEY = "rodent_blog_admin_session";
const BLOG_ADMIN_EMAIL = "anesu@rodent.co.zw";
const BLOG_ADMIN_PASSWORD = "rodent@2526";

const BlogAuthContext = createContext<BlogAuthContextValue | undefined>(undefined);

export const BlogAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem(BLOG_SESSION_KEY) === "true");

  const login = (email: string, password: string) => {
    const success = email.trim().toLowerCase() === BLOG_ADMIN_EMAIL && password === BLOG_ADMIN_PASSWORD;

    if (success) {
      localStorage.setItem(BLOG_SESSION_KEY, "true");
      setIsLoggedIn(true);
    }

    return success;
  };

  const logout = () => {
    localStorage.removeItem(BLOG_SESSION_KEY);
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <BlogAuthContext.Provider value={value}>{children}</BlogAuthContext.Provider>;
};

export const useBlogAuth = () => {
  const ctx = useContext(BlogAuthContext);
  if (!ctx) throw new Error("useBlogAuth must be used within BlogAuthProvider");
  return ctx;
};
