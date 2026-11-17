import { SITE_URL } from "@/features/landing/seo/team";
import {
  type BlogLocale,
  blogIndexPath,
  blogPostPath,
} from "@/features/landing/blog/locale";
import { resolveAuthor } from "./posts";
import type { Post, FaqEntry } from "./posts";

/**
 * BlogPosting + inline author Person + BreadcrumbList (+ FAQPage when the post
 * has an FAQ section) JSON-LD for one post. The author Person carries E-E-A-T
 * (name, jobTitle, knowsAbout, email) and a profile URL / @id that resolves to
 * the author page at /blog/authors/<slug>. @ids stay on the non-www host.
 */

const OG_IMAGE = "/bindu-card.jpg";

/** The 1200x630 PNG raster of a post's diagram, written by
 *  scripts/gen-blog-diagrams.mjs next to the SVG. Used for the OG/Twitter card
 *  and listed first in BlogPosting.image (raster, then the hero photo, then
 *  the second mid-body photo, then the SVG). */
export function ogImagePath(post: { slug: string; image: string }): string {
  return post.image ? `/images/blog/og/${post.slug}.png` : OG_IMAGE;
}

function abs(path: string): string {
  return path.startsWith("http")
    ? path
    : `${SITE_URL}/${path.replace(/^\//, "")}`;
}

export function BlogPostingJsonLd({
  post,
  faq,
  locale = "en",
}: {
  post: Post;
  faq: FaqEntry[];
  locale?: BlogLocale;
}) {
  const pageUrl = `${SITE_URL}${blogPostPath(post.slug, locale)}`;
  const author = resolveAuthor(post.authorSlug);
  const image = post.image
    ? [
        abs(ogImagePath(post)),
        ...(post.photo ? [post.photo.url] : []),
        ...(post.photo2 ? [post.photo2.url] : []),
        abs(post.image),
      ]
    : abs(OG_IMAGE);
  const authorUrl = `${SITE_URL}/blog/authors/${author.slug}`;
  const authorPerson = {
    "@type": "Person",
    "@id": `${authorUrl}#person`,
    url: authorUrl,
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    knowsAbout: author.knowsAbout,
    email: author.email,
    ...(author.avatar ? { image: abs(author.avatar) } : {}),
    worksFor: { "@id": `${SITE_URL}#org` },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description: post.description,
        image,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: locale,
        mainEntityOfPage: pageUrl,
        author: authorPerson,
        publisher: { "@id": `${SITE_URL}#org` },
        isPartOf: { "@id": `${SITE_URL}#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bindu", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}${blogIndexPath(locale)}`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              inLanguage: locale,
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
