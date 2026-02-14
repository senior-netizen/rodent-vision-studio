export const BLOG_FORMATS = [
  "Engineering notes",
  "Field reports",
  "Build logs",
  "Grid experiments",
  "Post-mortems",
  "Research drops",
] as const;

export type BlogFormat = (typeof BLOG_FORMATS)[number];

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  format: BlogFormat;
  createdAt: string;
};
