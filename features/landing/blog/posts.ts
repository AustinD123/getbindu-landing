import "server-only";
import { cache } from "react";
import { photoSrc, photoSrcSet } from "@/features/landing/blog/photo";
import fs from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { TEAM, getTeamMember, type TeamMember } from "@/features/landing/seo/team";
import type { BlogLocale } from "@/features/landing/blog/locale";
import { BLOG_LABELS } from "@/features/landing/blog/blog-labels";

/**
 * Plain-Markdown blog over apps/web/content/blog/*.md. Frontmatter is read with
 * gray-matter; the body is rendered to an HTML string with a remark -> rehype
 * pipeline (the standard recipe). No MDX: the posts are pure Markdown, so this
 * stays simple and has no JSX-in-Markdown fragility.
 */

/**
 * English posts sit in content/blog. Every other locale is a subdirectory of
 * it, so the English reader never picks up a translated file and a new locale
 * needs no change here. See features/landing/blog/locale.ts.
 */
function blogDir(locale: BlogLocale): string {
  const root = join(process.cwd(), "content", "blog");
  return locale === "en" ? root : join(root, locale);
}

/** One editorial photo per post, hotlinked from Unsplash per its API terms
 *  (hotlink the returned URL, credit the photographer and Unsplash). It is the
 *  card thumbnail on the index and the article hero under the byline. */
export type PostPhoto = {
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Optional content-modified date (YYYY-MM-DD). Set only when a post's facts
   *  or recommendations materially change; drives the "Updated" byline,
   *  BlogPosting.dateModified and the sitemap lastModified. Null = never. */
  updated: string | null;
  /** Editorial grouping shown as a badge and filter chip. */
  category: string;
  /** TEAM slug that credits the article — drives byline + Person JSON-LD. */
  authorSlug: string;
  /** Flow-diagram path under /public (e.g. "/images/blog/slug.svg"). Rendered
   *  mid-body (see injectDiagram) and rasterised as the OG share card; it is
   *  also the card/hero fallback for a post without a photo. Empty = fallback. */
  image: string;
  /** Descriptive alt text for the diagram (SEO + a11y). */
  imageAlt: string;
  /** Editorial photo: card thumbnail + article hero. Null = no photo, in
   *  which case the diagram takes both slots. The diagram stays the share image. */
  photo: PostPhoto | null;
  /** Second editorial photo, rendered mid-body right before the FAQ heading
   *  via injectPhoto. Not used on the card, the hero or the share image. */
  photo2: PostPhoto | null;
  /** Regulation keys this post serves (e.g. ["eudr"]). Drives the "From the
   *  blog" band on each regulation pillar page and the post's back-link chip.
   *  First entry is treated as the primary regulation. */
  regulations: string[];
  order: number;
  /** Whole-minute read estimate from the body word count. */
  readingMinutes: number;
  /** Raw Markdown body (frontmatter stripped, leading H1 already removed). */
  content: string;
};

/** Serializable card shape passed from the server page to the client index. */
export type PostCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Resolved author name for display. */
  author: string;
  image: string;
  imageAlt: string;
  /** Card thumbnail when the post has an editorial photo; null = show the diagram. */
  photo: { url: string; alt: string } | null;
  date: string;
  /** Pre-formatted, locale-independent date (e.g. "4 August 2026"). */
  dateLabel: string;
  readingMinutes: number;
  regulations: string[];
};

/**
 * The regulation pillar pages a blog post can point back at. A post whose
 * primary regulation is listed here shows a "Related regulation" chip linking
 * to that pillar; the same registry drives the label on the reg-page blog band.
 * Keys with no pillar (e.g. "hsn", or an untagged general post) surface no
 * band and no chip.
 */
export const REGULATION_PILLARS: Record<string, { label: string; href: string }> = {
  eudr: { label: "EUDR", href: "/eudr" },
  cbam: { label: "CBAM", href: "/cbam" },
  dpp: { label: "Digital Product Passport", href: "/dpp" },
  reach: { label: "REACH", href: "/reach" },
  ppwr: { label: "PPWR", href: "/ppwr" },
};

export type FaqEntry = { question: string; answer: string };

const DEFAULT_CATEGORY = "Guide";
const DEFAULT_AUTHOR_SLUG = "raahul-dutta";

/** Resolve a frontmatter author slug to a TEAM member, falling back to the
 *  default author so a typo never breaks the build. */
export function resolveAuthor(slug: string): TeamMember {
  return TEAM[slug] ?? getTeamMember(DEFAULT_AUTHOR_SLUG);
}

/** ~200 wpm, rounded up, floored at 1. */
function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_BY_LOCALE: Record<BlogLocale, readonly string[]> = {
  en: MONTHS,
  de: [
    "Januar",
    "Februar",
    "M\u00e4rz",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
};

/**
 * Deterministic "D Month YYYY" so server and client render identically.
 * Intl.DateTimeFormat is avoided on purpose: its output depends on the ICU
 * build, so it can differ between the server and the browser and trip
 * hydration. German uses "D. Monat YYYY", with the ordinal dot.
 */
export function formatPostDate(iso: string, locale: BlogLocale = "en"): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, year, month, day] = m;
  const name = MONTHS_BY_LOCALE[locale][Number(month) - 1];
  return locale === "de"
    ? `${Number(day)}. ${name} ${year}`
    : `${Number(day)} ${name} ${year}`;
}

export function getPostSlugs(locale: BlogLocale = "en"): string[] {
  const dir = blogDir(locale);
  // A locale with no posts yet is legitimate, and readdirSync would throw.
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// cache(): dedupe per request. getAllPosts maps over every slug, and the
// [slug] page reads the same post in both generateMetadata and the body — so
// without this each .md would be read + gray-matter-parsed several times.
/**
 * Frontmatter dates as a plain `YYYY-MM-DD` string.
 *
 * YAML parses an unquoted `date: 2026-08-11` into a JS Date, and `String(date)`
 * on that yields "Sun Aug 11 2026 02:00:00 GMT+0200 (…)", which would then be
 * rendered in the byline, emitted as `datePublished`, and written to the
 * sitemap. Every post quotes its dates today, so this only has to hold the line
 * the first time one does not.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

export const getPostBySlug = cache(
  (slug: string, locale: BlogLocale = "en"): Post | null => {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const full = join(blogDir(locale), `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: isoDate(data.date),
    updated: data.updated ? isoDate(data.updated) : null,
    category: String(data.category ?? DEFAULT_CATEGORY),
    authorSlug: String(data.author ?? DEFAULT_AUTHOR_SLUG),
    image: String(data.image ?? ""),
    imageAlt: String(data.imageAlt ?? ""),
    photo: data.photo
      ? {
          url: String(data.photo),
          alt: String(data.photoAlt ?? ""),
          credit: String(data.photoCredit ?? ""),
          creditUrl: String(data.photoCreditUrl ?? ""),
        }
      : null,
    photo2: data.photo2
      ? {
          url: String(data.photo2),
          alt: String(data.photo2Alt ?? ""),
          credit: String(data.photo2Credit ?? ""),
          creditUrl: String(data.photo2CreditUrl ?? ""),
        }
      : null,
    regulations: Array.isArray(data.regulations)
      ? data.regulations.map(String)
      : [],
    order: Number(data.order ?? 99),
    readingMinutes: estimateReadingMinutes(content),
    content,
  };
  },
);

/** Newest first (by date), with `order` then title as deterministic tiebreaks
 *  so same-day posts keep a stable, editor-controlled sequence. Cached so the
 *  blog index (cards + categories) parses the corpus once per request. */
export const getAllPosts = cache((locale: BlogLocale = "en"): Post[] => {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        a.order - b.order ||
        a.title.localeCompare(b.title),
    );
});

/** Server-side map to the serializable shape the client index consumes. */
export function getAllPostCards(locale: BlogLocale = "en"): PostCard[] {
  return getAllPosts(locale).map((p) => {
    const author = resolveAuthor(p.authorSlug);
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      author: author.name,
      image: p.image,
      imageAlt: p.imageAlt || `${p.title} flow diagram`,
      photo: p.photo ? { url: p.photo.url, alt: p.photo.alt } : null,
      date: p.date,
      dateLabel: formatPostDate(p.date, locale),
      readingMinutes: p.readingMinutes,
      regulations: p.regulations,
    };
  });
}

/** Post cards tagged with `reg`, newest first, capped at `limit` (default 3).
 *  Used by the "From the blog" band on each regulation pillar page. */
export function getPostCardsByRegulation(
  reg: string,
  limit = 3,
  locale: BlogLocale = "en",
): PostCard[] {
  return getAllPostCards(locale)
    .filter((p) => p.regulations.includes(reg))
    .slice(0, limit);
}

/** Distinct categories in first-appearance (newest-post) order. */
export function getAllCategories(locale: BlogLocale = "en"): string[] {
  const seen = new Set<string>();
  for (const p of getAllPosts(locale)) seen.add(p.category);
  return [...seen];
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  // Wrap each table so the wrapper, not the table, scrolls sideways on
  // phones. Re-displaying the table itself as a block breaks the shared
  // column layout between thead and tbody (see blog.css). Same string work
  // on the rehype output as injectDiagram.
  return String(file)
    .replace(/<table>/g, '<div class="lp-blog-table"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

export const UNSPLASH_REFERRAL =
  "https://unsplash.com/?utm_source=bindu&utm_medium=referral";

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Insert the post's flow diagram into the rendered body at the midpoint of
 *  the page: before the H2 nearest the middle of the HTML (never the FAQ
 *  heading), falling back to the paragraph boundary nearest the middle. Pure
 *  string work on the rehype output so the Markdown stays image-free. */
export function injectDiagram(
  html: string,
  diagram: { src: string; alt: string },
): string {
  const figure =
    `<figure class="lp-blog-diagram">` +
    `<img src="${escapeAttr(diagram.src)}" alt="${escapeAttr(diagram.alt)}" width="1200" height="675" loading="lazy" decoding="async">` +
    `</figure>`;
  const mid = html.length / 2;
  let best = -1;
  let bestDist = Number.POSITIVE_INFINITY;
  const h2 = /<h2\b[^>]*>/g;
  for (let m = h2.exec(html); m; m = h2.exec(html)) {
    if (/\bid="faq"/.test(m[0])) continue;
    const dist = Math.abs(m.index - mid);
    if (dist < bestDist) {
      best = m.index;
      bestDist = dist;
    }
  }
  if (best !== -1) return html.slice(0, best) + figure + "\n" + html.slice(best);
  const para = /<\/p>/g;
  for (let m = para.exec(html); m; m = para.exec(html)) {
    const cut = m.index + m[0].length;
    const dist = Math.abs(cut - mid);
    if (dist < bestDist) {
      best = cut;
      bestDist = dist;
    }
  }
  if (best !== -1) return html.slice(0, best) + "\n" + figure + html.slice(best);
  return html + figure;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Insert the post's second editorial photo into the rendered body right
 *  before the `## FAQ` heading (rehype-slug gives it id="faq"), with the same
 *  localized "Photo by <name> on Unsplash" caption as the hero. Without a FAQ heading it
 *  goes before the last H2 that does not already have a figure above it, so
 *  a short post whose mid H2 is also its last one does not end up with the
 *  diagram and the photo stacked together. With no H2 at all it is appended.
 *  Run AFTER injectDiagram. Pure string work on the rehype output. */
export function injectPhoto(
  html: string,
  photo: PostPhoto,
  locale: BlogLocale = "en",
): string {
  const t = BLOG_LABELS[locale];
  const figure =
    `<figure class="lp-blog-photo">` +
    `<img src="${escapeAttr(photoSrc(photo.url, 840))}" ` +
    `srcset="${escapeAttr(photoSrcSet(photo.url, [560, 840, 1120]))}" ` +
    `sizes="(min-width: 40rem) 34.5rem, 100vw" ` +
    `alt="${escapeAttr(photo.alt)}" width="1200" height="800" loading="lazy" decoding="async">` +
    `<figcaption>${escapeHtml(t.photoBy)} ` +
    `<a href="${escapeAttr(photo.creditUrl)}" rel="nofollow noopener noreferrer" target="_blank">${escapeHtml(photo.credit)}</a>` +
    ` ${escapeHtml(t.photoOn)} ` +
    `<a href="${escapeAttr(UNSPLASH_REFERRAL)}" rel="nofollow noopener noreferrer" target="_blank">Unsplash</a>` +
    `</figcaption></figure>`;
  const faq = /<h2\b[^>]*\bid="faq"[^>]*>/.exec(html);
  if (faq) return html.slice(0, faq.index) + figure + "\n" + html.slice(faq.index);
  // No FAQ: fall back to the last H2. injectDiagram runs first and takes the
  // H2 nearest the middle, which in a short post can be the last one too, so
  // walk back past any heading a figure already sits above rather than
  // stacking the two images together.
  const starts: number[] = [];
  const h2 = /<h2\b[^>]*>/g;
  for (let m = h2.exec(html); m; m = h2.exec(html)) starts.push(m.index);
  for (let i = starts.length - 1; i >= 0; i--) {
    const at = starts[i];
    if (/<\/figure>\s*$/.test(html.slice(0, at))) continue;
    return html.slice(0, at) + figure + "\n" + html.slice(at);
  }
  return html + figure;
}

/** Pull Q&A pairs from the body's `## FAQ` section for FAQPage JSON-LD. Each
 *  question is a whole-line `**...**` bold heading; the answer is the paragraph
 *  under it up to the next blank line or bold question. */
export function parseFaq(markdown: string): FaqEntry[] {
  const heading = /^##\s+FAQ\s*$/m.exec(markdown);
  if (!heading) return [];
  const lines = markdown.slice(heading.index).split("\n");
  const isQuestion = (line: string) => /^\*\*(.+?)\*\*\s*$/.exec(line);
  const strip = (s: string) =>
    s
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
  const faq: FaqEntry[] = [];
  for (let i = 0; i < lines.length; i++) {
    const q = isQuestion(lines[i] ?? "");
    if (!q) continue;
    const question = strip(q[1] ?? "");
    const answer: string[] = [];
    for (let j = i + 1; j < lines.length; j++) {
      const line = (lines[j] ?? "").trim();
      if (line === "" || isQuestion(line)) break;
      answer.push(line);
    }
    const text = strip(answer.join(" "));
    if (question && text) faq.push({ question, answer: text });
  }
  return faq;
}
