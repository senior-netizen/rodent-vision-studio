import { useEffect } from "react";

export const usePageMetadata = (
  title: string,
  description: string,
  options?: { image?: string; url?: string }
) => {
  useEffect(() => {
    const fullTitle = `${title} | Rodent Inc.`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);

    if (options?.image) {
      setMeta("og:image", options.image);
    }

    if (options?.url) {
      setMeta("og:url", options.url);
    }

    setMeta("twitter:card", "summary_large_image");
  }, [title, description, options?.image, options?.url]);
};
