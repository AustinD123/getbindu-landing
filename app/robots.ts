import type { MetadataRoute } from "next";

/**
 * This repo is a working copy of the blog, not the live site (the live blog is
 * served by shelley at getbindu.com/blog). Block every crawler so a preview
 * deploy of it can never compete with the real pages as duplicate content.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
