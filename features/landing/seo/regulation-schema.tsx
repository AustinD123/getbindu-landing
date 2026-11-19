/**
 * Article + FAQPage + BreadcrumbList schema for the regulation pillar pages
 * (/eudr, /dpp/battery, /dpp/textiles, and future spokes).
 *
 * Why this exists: the regulation pages are cinematic scroll-stories with very
 * little crawlable prose, so structured data is doing the heavy lifting for
 * AI-engine citation and entity understanding. The FAQ entries mirror the real
 * "People Also Ask" questions for each topic.
 *
 * NOTE: Google retired FAQ *rich results* for all sites on 7 May 2026 — there
 * is no SERP feature behind FAQPage any more, so do NOT keep this markup for
 * PAA / AI-Overview real estate. It stays purely for machine readability /
 * AI-engine answer extraction. Don't add new FAQPage expecting a SERP payoff.
 *
 * Author attribution ties each page to a named Person (Head of Regulations) so
 * AI engines can resolve "who is the authority behind Bindu's EUDR page?" to a
 * real human with a job title at a real org — the E-E-A-T play. The Person is
 * inlined per page (name, jobTitle, knowsAbout, email) with no profile URL;
 * there is no /about page to link to.
 *
 * ⚠️ Regulatory dates in the FAQ answers are the whole competitive edge — they
 * must be correct. Each answer here mirrors the dates already asserted in the
 * corresponding page's own vetted copy/metadata. Re-verify against EUR-Lex
 * before shipping content changes, and bump `dateModified` when you do.
 */

import { SITE_URL, TEAM } from "./team";

export type FaqItem = {
  question: string;
  answer: string;
  /**
   * Optional named citation for the answer. Rendered as a linked "Source" line
   * under the visible answer AND folded into the FAQPage JSON-LD answer text so
   * an AI engine extracting the answer also sees where it comes from. Name the
   * source in `label` (e.g. "EUR-Lex: EU Deforestation Regulation"), never a
   * bare regulation number on its own.
   */
  source?: { label: string; href: string };
};

export type BreadcrumbHop = { name: string; path: string };

export type RegulationSchemaProps = {
  /** Path after the origin without a leading slash — e.g. "eudr", "dpp/battery". */
  path: string;
  headline: string;
  description: string;
  /** Root-relative or absolute image URL (reuse the OG image). */
  image: string;
  /** ISO YYYY-MM-DD. `datePublished` from git history; bump `dateModified` on every content edit. */
  datePublished: string;
  dateModified: string;
  /** Author slug from TEAM. Defaults to the Head of Regulations. */
  authorSlug?: string;
  /**
   * BCP 47 language of the page's own prose, emitted as the Article's
   * `inLanguage`. Defaults to "en" so every existing caller keeps its current
   * output; the German pages (/de/eudr, /de/eudr/fristen) pass "de" so an
   * engine reading the graph resolves the German answer set to German
   * queries rather than treating it as a duplicate of the English article.
   */
  inLanguage?: string;
  /** Trail after the site root, in order — e.g. [{name:"DPP",path:"dpp/battery"},{name:"Battery",path:"dpp/battery"}]. */
  breadcrumb: BreadcrumbHop[];
  /**
   * readonly so a page can author the array `as const` and pass the SAME
   * value to both this schema and the visible RegulationFaq band.
   */
  faq: readonly FaqItem[];
};

function abs(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}/${path.replace(/^\//, "")}`;
}

function buildRegulationJsonLd(props: RegulationSchemaProps) {
  const {
    path,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorSlug = "raahul-dutta",
    inLanguage = "en",
    breadcrumb,
    faq,
  } = props;

  const pageUrl = abs(path);
  const author = TEAM[authorSlug];
  const authorPerson = {
    "@type": "Person",
    name: author?.name,
    jobTitle: author?.jobTitle,
    description: author?.bio,
    knowsAbout: author?.knowsAbout,
    email: author?.email,
    worksFor: { "@id": `${SITE_URL}#org` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline,
        description,
        image: abs(image),
        datePublished,
        dateModified,
        inLanguage,
        mainEntityOfPage: pageUrl,
        author: authorPerson,
        publisher: { "@id": `${SITE_URL}#org` },
        isPartOf: { "@id": `${SITE_URL}#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.source
              ? `${item.answer} Source: ${item.source.label} (${item.source.href})`
              : item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bindu", item: SITE_URL },
          ...breadcrumb.map((hop, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: hop.name,
            item: abs(hop.path),
          })),
        ],
      },
    ],
  };
}

export function RegulationJsonLd(props: RegulationSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRegulationJsonLd(props)) }}
    />
  );
}
