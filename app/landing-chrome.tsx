/**
 * The marketing-site chrome: the site-wide JSON-LD graph and the light wrapper.
 *
 * Shared because the landing surface spans several root layouts. The English
 * pages live under app/(en)/(landing) and the localized pages under the six
 * locale groups, app/(de) … app/(pl); all of them render this, so the
 * Organization and WebSite nodes are authored once and cannot disagree between
 * the trees.
 *
 * A site-wide SoftwareApplication node used to live here too. It was removed
 * (2026-09-02): Google's SoftwareApplication rich result requires an
 * aggregateRating or review to be eligible, and with neither present (no real
 * ratings, and we will not fabricate them) it produced a "rich results
 * validation error" on every page that renders this chrome. Organization +
 * WebSite carry the entity signal without the error.
 */

import { TEAM, SITE_URL } from "@/features/landing/seo/team";
import "@/features/landing/landing.css";
import "@/features/landing/story/story.css";
import "@/features/landing/story/theatre.css";
import "@/features/landing/story/home.css";

const employeeRefs = Object.values(TEAM).map((m) => ({
  "@type": "Person",
  name: m.name,
  jobTitle: m.jobTitle,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#org`,
      name: "Bindu",
      legalName: "Getbindu",
      url: SITE_URL,
      logo: `${SITE_URL}/bindu-logo.png`,
      description:
        "Trade-compliance software for small and mid-sized importers. Describe a shipment once, collect the evidence the regulation asks for, and file the EU Deforestation Regulation due-diligence statement. Battery and product passports, CBAM and HS classification are in build.",
      sameAs: [
        "https://github.com/GetBindu/Bindu",
        "https://x.com/raahulrahl",
        "https://news.getbindu.com",
      ],
      employee: employeeRefs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Bindu",
      publisher: { "@id": `${SITE_URL}#org` },
      inLanguage: "en",
    },
  ],
};

/** The site-wide Organization + WebSite graph, for a page that renders its own chrome (the homepage). */
export function LandingJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * "Skip to content", per locale.
 *
 * Every landing page opens with the same ten chrome controls, so a keyboard
 * user had to tab through all of them on all 31 routes before reaching any
 * content. The link is the first focusable element in the document and targets
 * the page's <main id="main">; it is visually hidden until focused.
 */
const SKIP_LABEL: Record<string, string> = {
  en: "Skip to content",
  de: "Zum Inhalt springen",
  fr: "Aller au contenu",
  es: "Ir al contenido",
  it: "Vai al contenuto",
  nl: "Naar de inhoud",
  pl: "Przejdź do treści",
};

/** The locales the chrome can label; one per root layout tree. */
export type LandingLocale = keyof typeof SKIP_LABEL;

export function LandingChrome({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  /** Locale of the tree this chrome wraps, for the skip link's wording. */
  locale?: LandingLocale;
}) {
  return (
    <>
      <LandingJsonLd />
      {/* overflow-x-clip (not -hidden): clips full-bleed overflow without
          becoming a scroll container, so the document keeps native scrolling
          (back-button restoration, mobile URL-bar collapse, scroll analytics). */}
      <div className="landing-light overflow-x-clip bg-white">
        <a className="lp-skip" href="#main">
          {SKIP_LABEL[locale] ?? SKIP_LABEL.en}
        </a>
        {children}
      </div>
    </>
  );
}
