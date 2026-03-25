export const BLOG_FORMATS = ["System breakdown", "Field report", "Architecture paper"] as const;

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

export const MANDATORY_POST_TEMPLATE = [
  "Problem",
  "System Design",
  "Data Flow",
  "Constraints",
  "Implementation",
  "Output",
] as const;
