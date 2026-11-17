import type { Metadata } from "next";
import Link from "next/link";
import { IslandHeader } from "@/features/landing/chrome/island-header";
import { LandingFooter } from "@/features/landing/chrome/landing-footer";
import {
  REGULATION_PILLARS,
  UNSPLASH_REFERRAL,
  formatPostDate,
  injectDiagram,
  injectPhoto,
  markdownToHtml,
  parseFaq,
  resolveAuthor,
  type Post,
} from "@/features/landing/blog/posts";
import {
  PHOTO_HOST,
  photoSrc,
  photoSrcSet,
} from "@/features/landing/blog/photo";
import {
  BlogPostingJsonLd,
  ogImagePath,
} from "@/features/landing/blog/blog-schema";
import { seoTitle } from "@/features/landing/seo/title";
import { AuthorAvatar } from "@/features/landing/blog/author-avatar";
import { BLOG_LABELS } from "@/features/landing/blog/blog-labels";
import {
  type BlogLocale,
  blogIndexPath,
  blogPostPath,
  pillarPathFor,
} from "@/features/landing/blog/locale";
import { blogPostHreflang } from "@/features/landing/blog/hreflang";
import "@/features/landing/blog/blog.css";

/**
 * One rendered post, shared by every locale's article route.
 *
 * The route files stay thin (params, metadata, notFound) so the markup and the
 * body-assembly order live in exactly one place. Adding a locale must never
 * mean a second copy of this to drift out of sync.
 */
export async function BlogArticle({
  post,
  locale = "en",
}: {
  post: Post;
  locale?: BlogLocale;
}) {
  const t = BLOG_LABELS[locale];
  const rendered = await markdownToHtml(post.content);
  // With a photo as hero, the diagram moves to the middle of the body. Without
  // one the diagram is the hero and is not repeated.
  const withDiagram =
    post.photo && post.image
      ? injectDiagram(rendered, {
          src: post.image,
          alt: post.imageAlt || `${post.title} flow diagram`,
        })
      : rendered;
  // Order matters: the diagram picks the mid H2 excluding FAQ, so it runs
  // first; the second photo then lands right before the FAQ heading.
  const html = post.photo2 ? injectPhoto(withDiagram, post.photo2, locale) : withDiagram;
  const faq = parseFaq(post.content);
  const author = resolveAuthor(post.authorSlug);
  // Reciprocal hub link, but only where that pillar exists in this language.
  const primary = post.regulations[0] ?? "";
  const pillarLabel = REGULATION_PILLARS[primary]?.label;
  const pillarHref = pillarPathFor(primary, locale);

  return (
    <div className="min-h-screen bg-white">
      <BlogPostingJsonLd post={post} faq={faq} locale={locale} />
      <IslandHeader active="blog" pinnedMode="light" />
      <main id="main">
        <article className="mx-auto max-w-2xl px-5 pt-24 pb-20">
          <nav className="mb-8 text-sm text-[var(--stage-fg-subtle)]">
            <Link
              href={blogIndexPath(locale)}
              className="hover:text-[var(--brand)]"
            >
              &larr; {t.backToBlog}
            </Link>
          </nav>
          <h1 className="text-4xl font-normal leading-tight tracking-tight text-[var(--stage-fg)]">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--stage-fg-subtle)]">
            <AuthorAvatar
              author={author}
              size={36}
              className="h-9 w-9 flex-none rounded-full object-cover"
              fallbackClassName="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-xs font-semibold text-white"
            />
            {author.email ? (
              <a
                href={`mailto:${author.email}`}
                className="font-medium text-[var(--stage-fg)] hover:text-[var(--brand)]"
              >
                {author.name}
              </a>
            ) : (
              <span className="font-medium text-[var(--stage-fg)]">
                {author.name}
              </span>
            )}
            <span aria-hidden="true">&middot;</span>
            <span>{formatPostDate(post.date, locale)}</span>
            {post.updated && post.updated !== post.date ? (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>
                  {t.updatedPrefix} {formatPostDate(post.updated, locale)}
                </span>
              </>
            ) : null}
            <span aria-hidden="true">&middot;</span>
            <span>
              {post.readingMinutes} {t.minRead}
            </span>
          </div>

          {pillarHref && pillarLabel ? (
            <div className="mt-5 mb-2">
              <Link
                href={pillarHref}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-border-strong)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--stage-fg-muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--stage-fg-faint)]">
                  {t.regulationChip}
                </span>
                {pillarLabel}
              </Link>
            </div>
          ) : null}

          {post.photo ? (
            <figure className="lp-blog-hero">
              {/* The hero is the LCP element on a post, and it comes from a
                  third-party host, so warm the connection and fetch it first. */}
              <link rel="preconnect" href={PHOTO_HOST} crossOrigin="" />
              {/* eslint-disable-next-line @next/next/no-img-element -- hotlinked Unsplash photo per its API terms, not routed through the optimizer */}
              <img
                src={photoSrc(post.photo.url, 1120)}
                srcSet={photoSrcSet(post.photo.url, [560, 840, 1120])}
                // The article column caps at 34.5rem, so the hero never needs
                // a full-viewport file on a wide screen.
                sizes="(min-width: 40rem) 34.5rem, 100vw"
                alt={post.photo.alt}
                width={1200}
                height={800}
                fetchPriority="high"
                decoding="async"
                className="aspect-[3/2] w-full rounded-xl border border-[var(--stage-border)] object-cover"
              />
              <figcaption>
                {t.photoBy}{" "}
                <a
                  href={post.photo.creditUrl}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {post.photo.credit}
                </a>{" "}
                {t.photoOn}{" "}
                <a
                  href={UNSPLASH_REFERRAL}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Unsplash
                </a>
              </figcaption>
            </figure>
          ) : post.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- SVG diagrams bypass the image optimizer (no dangerouslyAllowSVG)
            <img
              src={post.image}
              alt={post.imageAlt || `${post.title} flow diagram`}
              width={1200}
              height={675}
              className="mt-12 aspect-[16/9] w-full rounded-xl border border-[var(--stage-border)]"
            />
          ) : null}

          <div
            className="lp-blog-body mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside className="lp-blog-author mt-14">
            <h2>{t.aboutTheAuthor}</h2>
            <div className="lp-blog-author-head">
              <span className="lp-blog-author-avatar">
                <AuthorAvatar author={author} size={40} />
              </span>
              <div>
                {/* Author pages are English-only, so this always points there. */}
                <Link href={`/blog/authors/${author.slug}`}>{author.name}</Link>
                <p>
                  {author.jobTitle}, {t.jobTitleSuffix}
                </p>
              </div>
            </div>
            <p>{author.bio}</p>
            <p className="lp-blog-author-meta">
              {author.email ? (
                <>
                  {t.contact}{" "}
                  <a href={`mailto:${author.email}`}>{author.email}</a>.{" "}
                </>
              ) : null}
              {t.editorialStandards}
            </p>
          </aside>
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}

/**
 * Metadata for one post, shared by every locale's article route.
 *
 * Canonical and OG url are the locale's own path, and the alternates come from
 * blogPostHreflang, so a standalone German post declares only German and a
 * translated one declares the whole set.
 */
export function blogPostMetadata(post: Post, locale: BlogLocale): Metadata {
  const url = blogPostPath(post.slug, locale);
  // Per-post share card: the PNG raster of the post's flow diagram (social
  // scrapers do not render SVG), falling back to the site card for a post
  // without a diagram.
  const ogImage = {
    url: ogImagePath(post),
    width: 1200,
    height: 630,
    alt: post.image ? post.imageAlt || post.title : "Bindu",
  };
  return {
    title: seoTitle(post.title),
    description: post.description,
    alternates: {
      canonical: url,
      languages: blogPostHreflang(post.slug, locale),
    },
    openGraph: {
      type: "article",
      siteName: "Bindu",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      // site and creator are repeated from the root defaults on purpose: a
      // per-page twitter block replaces the root one wholesale rather than
      // merging into it.
      site: "@getbindu",
      creator: "@getbindu",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}
