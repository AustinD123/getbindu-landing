import type { Metadata } from "next";
import Link from "next/link";
import { IslandHeader } from "@/features/landing/chrome/island-header";
import { LandingFooter } from "@/features/landing/chrome/landing-footer";
import { BlogIndex } from "@/features/landing/blog/blog-index";
import {
  getAllPostCards,
  getAllCategories,
} from "@/features/landing/blog/posts";
import { ogImagePath } from "@/features/landing/blog/blog-schema";
import { SITE_URL } from "@/features/landing/seo/team";
import { BLOG_LABELS } from "@/features/landing/blog/blog-labels";
import { blogIndexHreflang } from "@/features/landing/blog/hreflang";
import {
  type BlogLocale,
  BLOG_LOCALES,
  LOCALE_ENDONYMS,
  blogIndexPath,
  blogPostPath,
} from "@/features/landing/blog/locale";

/** Metadata for a locale's blog index. */
export function blogIndexMetadata(locale: BlogLocale): Metadata {
  const t = BLOG_LABELS[locale];
  const path = blogIndexPath(locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: path, languages: blogIndexHreflang(locale) },
    openGraph: {
      type: "website",
      siteName: "Bindu",
      title: t.ogTitle,
      description: t.metaDescription,
      url: path,
      images: [
        { url: "/bindu-card.jpg", width: 1200, height: 630, alt: "Bindu" },
      ],
    },
  };
}

/**
 * One locale's blog index, shared by every locale's route.
 *
 * Only posts written in that locale are listed. An English reader never sees a
 * German post in the archive and the German index never pads itself with
 * English, which is what keeps each index honest about what it holds.
 */
export function BlogIndexPage({ locale = "en" }: { locale?: BlogLocale }) {
  const t = BLOG_LABELS[locale];
  const posts = getAllPostCards(locale);
  const categories = getAllCategories(locale);
  const indexUrl = `${SITE_URL}${blogIndexPath(locale)}`;
  // Only offer a language that actually has posts. Before the first German
  // post landed, /de/blog existed but was empty, and a switcher pointing at an
  // empty archive is worse than none.
  const languages = BLOG_LOCALES.filter(
    (l) => l === locale || getAllPostCards(l).length > 0,
  );

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${indexUrl}#blog`,
    name: t.ogTitle,
    description: t.metaDescription,
    url: indexUrl,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}#org` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}${blogPostPath(p.slug, locale)}`,
      datePublished: p.date,
      // The PNG raster, matching what each post's own BlogPosting leads with.
      // The SVG here made the same entity carry two different primary images.
      image: `${SITE_URL}${ogImagePath(p)}`,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--stage-bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <IslandHeader active="blog" pinnedMode="light" />
      <main id="main">
        <section className="mx-auto max-w-5xl px-5 pt-24 pb-20">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--stage-fg-subtle)]">
              <span
                className="h-px w-6 bg-[var(--stage-border-strong)]"
                aria-hidden="true"
              />
              {t.eyebrow}
            </p>
            {languages.length > 1 && (
              <nav
                aria-label={t.languages}
                className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]"
              >
                {languages.map((l, i) => (
                  <span key={l} className="flex items-center gap-2">
                    {i > 0 && (
                      <span
                        className="text-[var(--stage-fg-faint)]"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    )}
                    {l === locale ? (
                      <span
                        aria-current="true"
                        className="text-[var(--stage-fg)]"
                      >
                        {LOCALE_ENDONYMS[l]}
                      </span>
                    ) : (
                      <Link
                        href={blogIndexPath(l)}
                        hrefLang={l}
                        className="text-[var(--brand)] transition-colors hover:text-[var(--stage-fg)]"
                      >
                        {LOCALE_ENDONYMS[l]}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-normal tracking-tight text-[var(--stage-fg)]">
            {t.indexTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--stage-fg-muted)]">
            {t.indexIntro}
          </p>

          <BlogIndex posts={posts} categories={categories} locale={locale} />
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
