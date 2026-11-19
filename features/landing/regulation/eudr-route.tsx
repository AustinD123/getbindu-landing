import type { Metadata } from "next";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";
import { seoTitle } from "@/features/landing/seo/title";
import {
  type EudrContent,
  EUDR_HREFLANG,
  EUDR_LOCALE_PATHS,
} from "./eudr-content";

/**
 * Shared route wiring for /eudr and every /{locale}/eudr: metadata (with
 * reciprocal hreflang across all locales + x-default → English) and the
 * localized RegulationJsonLd. Each route file is then just:
 *
 *   export const metadata = eudrMetadata(eudrContentXX);
 *   export default () => <><EudrJsonLd content={eudrContentXX} /><EudrPage content={eudrContentXX} /></>;
 *
 * SITE_URL / metadataBase is non-www (https://getbindu.com); canonical is
 * self, OG url is the locale path, and every @id in the JSON-LD stays on the
 * non-www host via the schema builder.
 */

const OG_IMAGE = "/images/eudr-forest-hero.jpg";

function localePath(lang: string): string {
  return EUDR_LOCALE_PATHS[lang as keyof typeof EUDR_LOCALE_PATHS] ?? "/eudr";
}

export function eudrMetadata(content: EudrContent): Metadata {
  const path = localePath(content.lang);
  return {
    title: seoTitle(content.seo.title),
    description: content.seo.description,
    openGraph: {
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      url: path,
      type: "website",
      locale: content.lang,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: content.seo.ogImageAlt,
        },
      ],
    },
    alternates: {
      canonical: path,
      languages: EUDR_HREFLANG,
    },
  };
}

export function EudrJsonLd({ content }: { content: EudrContent }) {
  const path = localePath(content.lang).replace(/^\//, "");
  return (
    <RegulationJsonLd
      path={path}
      inLanguage={content.lang}
      headline={content.seo.jsonLd.headline}
      description={content.seo.jsonLd.description}
      image={OG_IMAGE}
      datePublished="2026-07-02"
      dateModified="2026-08-16"
      breadcrumb={[{ name: "EUDR", path }]}
      faq={content.seo.jsonLd.faq}
    />
  );
}
