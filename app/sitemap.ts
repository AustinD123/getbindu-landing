import type { MetadataRoute } from "next";
import { EUDR_LOCALE_PATHS } from "@/features/landing/regulation/eudr-content";
import { getAllPosts } from "@/features/landing/blog/posts";
import {
  NON_DEFAULT_BLOG_LOCALES,
  blogIndexPath,
  blogPostPath,
} from "@/features/landing/blog/locale";
import { TEAM } from "@/features/landing/seo/team";

const baseUrl = "https://getbindu.com";

// Real content-modified dates, mirroring each page's Article `dateModified`, so
// `lastModified` is a truthful freshness signal rather than the build clock
// (which would stamp every URL with the same time on every deploy). Bump these
// when the corresponding page's content is edited. Only the blog index (which
// gains a post without an edit) keeps `now` on purpose.
const MODIFIED = {
  home: "2026-08-16",
  eudr: "2026-08-16",
  eudrSpokes: "2026-08-04",
  eudrSoftware: "2026-08-16",
  cbam: "2026-08-16",
  cbamSoftware: "2026-08-16",
  reach: "2026-08-17",
  ppwr: "2026-08-17",
  dppBattery: "2026-08-16",
  dppTextiles: "2026-08-16",
  dppOthers: "2026-08-16",
  // Mirrors the visible "Last updated" date in the legal pages' <LegalPage>.
  // Bump this when privacy/page.tsx or terms/page.tsx `updated=` changes.
  legal: "2026-08-24",
} as const;

// hreflang alternates shared by /eudr and every /{locale}/eudr. Absolute URLs
// on the non-www host; x-default points at the English source.
const eudrLanguageAlternates: Record<string, string> = Object.fromEntries([
  ...Object.entries(EUDR_LOCALE_PATHS).map(([loc, path]) => [
    loc,
    `${baseUrl}${path}`,
  ]),
  ["x-default", `${baseUrl}${EUDR_LOCALE_PATHS.en}`],
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: MODIFIED.home,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Blog posts, discovered from content/blog at build time. Each carries its
    // own frontmatter `updated` (or publish) date as lastModified rather than
    // the build clock.
    ...getAllPosts().map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      // Parenthesised on purpose: ?? binds tighter than ?:, so the bare form
      // read as if the ternary tested `p.date` alone.
      lastModified: (p.updated ?? p.date) ? new Date(p.updated ?? p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Localized blog. One index and its posts per non-English locale, from
    // content/blog/<locale>. A locale with no posts yet contributes nothing,
    // so this stays correct before the first translated post lands.
    ...NON_DEFAULT_BLOG_LOCALES.flatMap((locale) => {
      const posts = getAllPosts(locale);
      if (posts.length === 0) return [];
      return [
        {
          url: `${baseUrl}${blogIndexPath(locale)}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
        ...posts.map((p) => ({
          url: `${baseUrl}${blogPostPath(p.slug, locale)}`,
          lastModified: (p.updated ?? p.date)
            ? new Date(p.updated ?? p.date)
            : now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ];
    }),
    // Author pages (E-E-A-T). One per team member; the article "About the
    // author" block and the author Person JSON-LD both resolve here.
    ...Object.keys(TEAM).map((slug) => ({
      url: `${baseUrl}/blog/authors/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    {
      url: `${baseUrl}/eudr`,
      lastModified: MODIFIED.eudr,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: eudrLanguageAlternates },
    },
    // Localized EUDR journey pages (de, pl, it, nl, fr, es). Each carries the
    // same reciprocal hreflang set so every locale points at all the others.
    ...Object.entries(EUDR_LOCALE_PATHS)
      .filter(([loc]) => loc !== "en")
      .map(([, path]) => ({
        url: `${baseUrl}${path}`,
        lastModified: MODIFIED.eudr,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: eudrLanguageAlternates },
      })),
    // The five EUDR deep-dive spokes (deadlines, commodities index, DDS,
    // geolocation, for-SME) were consolidated into the /eudr pillar on
    // 2026-08-18 and 301-redirect to it (see next.config.ts). Only the seven
    // commodity leaves below survive as their own URLs.
    // The EUDR software page was consolidated into /eudr on 2026-08-18 and
    // 301-redirects to it (see next.config.ts); the pillar carries the product
    // walkthrough and pricing, so there is no separate commercial URL.
    // The seven per-commodity leaves were consolidated into /eudr on
    // 2026-08-18 and 301-redirect to it (see next.config.ts), so they are no
    // longer their own indexable URLs.
    {
      url: `${baseUrl}/cbam`,
      lastModified: MODIFIED.cbam,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Commercial software page (SEO W7, 2026-08-10).
    {
      url: `${baseUrl}/cbam/software`,
      lastModified: MODIFIED.cbamSoftware,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reach`,
      lastModified: MODIFIED.reach,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ppwr`,
      lastModified: MODIFIED.ppwr,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dpp/battery`,
      lastModified: MODIFIED.dppBattery,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dpp/textiles`,
      lastModified: MODIFIED.dppTextiles,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dpp/others`,
      lastModified: MODIFIED.dppOthers,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal pages: indexable (index,follow) but low-value, so a low priority.
    // Listed here so they are not flagged "indexable page not in sitemap".
    {
      url: `${baseUrl}/privacy`,
      lastModified: MODIFIED.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: MODIFIED.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
