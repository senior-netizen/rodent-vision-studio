import { useEffect } from "react";

export const usePageMetadata = (
  title: string,
  description: string,
  options?: { image?: string; url?: string }
) => {
  useEffect(() => {
    const fullTitle = `${title} | Rodent Inc.`;
    document.title = fullTitle;

    const setMeta = (
      key: string,
      content: string,
      attribute: "name" | "property" = "name"
    ) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");

    if (options?.image) {
      setMeta("og:image", options.image, "property");
    }

    if (options?.url) {
      setMeta("og:url", options.url, "property");
    }

    setMeta("twitter:card", "summary_large_image");
    setMeta(
      "legal:organization",
      "Rodent, Inc. is a trade name for SquirrelLab Technologies Pvt Ltd."
    );
  }, [title, description, options?.image, options?.url]);
};
