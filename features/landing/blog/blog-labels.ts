import type { BlogLocale } from "@/features/landing/blog/locale";

/**
 * Every string the blog chrome renders, per locale.
 *
 * The posts themselves are written in their own language; this is only the
 * furniture around them (the index heading, the byline, the author block, the
 * filter controls). Kept in one object so a new locale is one entry rather
 * than a hunt through three components.
 */
/**
 * Category names come from post frontmatter, which is also the filter identity,
 * so they are translated for display only. An unmapped category falls through
 * to its frontmatter value.
 */
const CATEGORY_LABELS: Record<BlogLocale, Record<string, string>> = {
  en: {},
  de: { Fundamentals: "Grundlagen", Guide: "Leitfaden", Reference: "Referenz" },
};

export function categoryLabel(category: string, locale: BlogLocale): string {
  return CATEGORY_LABELS[locale][category] ?? category;
}

export type BlogLabels = {
  /** Index page */
  eyebrow: string;
  indexTitle: string;
  indexIntro: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  /** Index controls (the client component) */
  searchPlaceholder: string;
  all: string;
  sort: string;
  /** Language switcher */
  languages: string;
  newest: string;
  oldest: string;
  alphabetical: string;
  showingOf: (shown: number, total: number) => string;
  articleCount: (n: number) => string;
  noMatches: string;
  readArticle: string;
  showMore: string;
  /** Shared */
  minRead: string;
  /** Article page */
  backToBlog: string;
  updatedPrefix: string;
  regulationChip: string;
  photoBy: string;
  photoOn: string;
  aboutTheAuthor: string;
  jobTitleSuffix: string;
  contact: string;
  editorialStandards: string;
};

export const BLOG_LABELS: Record<BlogLocale, BlogLabels> = {
  en: {
    eyebrow: "The Bindu blog",
    indexTitle: "Trade compliance, in plain language.",
    indexIntro:
      "Guides, references, and fundamentals for the people who actually have to file. EUDR, CBAM, product passports, and HS classification, for everyone moving goods across the EU border. Start anywhere.",
    metaTitle: "Trade compliance blog",
    metaDescription:
      "Guides on EUDR, CBAM, product passports and HS classification, written for the people who actually have to file them. Plain language, dated, cited.",
    ogTitle: "The Bindu trade compliance blog",
    searchPlaceholder: "Search articles",
    all: "All",
    sort: "Sort",
    languages: "Languages",
    newest: "Newest",
    oldest: "Oldest",
    alphabetical: "A → Z",
    showingOf: (shown, total) => `Showing ${shown} of ${total} articles`,
    articleCount: (n) => `${n} ${n === 1 ? "article" : "articles"}`,
    noMatches: "No articles match your search.",
    readArticle: "Read article",
    showMore: "Show more articles",
    minRead: "min read",
    backToBlog: "Blog",
    updatedPrefix: "Updated",
    regulationChip: "Regulation",
    photoBy: "Photo by",
    photoOn: "on",
    aboutTheAuthor: "About the author",
    jobTitleSuffix: "Bindu",
    contact: "Contact:",
    editorialStandards:
      "Editorial standards: written and maintained from the primary regulation text, not third-party summaries.",
  },
  de: {
    eyebrow: "Der Bindu Blog",
    indexTitle: "Handels-Compliance, klar erklärt.",
    indexIntro:
      "Leitfäden und Grundlagen für alle, die die Meldungen am Ende wirklich einreichen. EUDR, CBAM, Produktpässe und Zolltarifnummern, für jeden, der Waren über die EU-Grenze bringt.",
    metaTitle: "Blog zur Handels-Compliance",
    metaDescription:
      "Leitfäden zu EUDR, CBAM, Produktpass und REACH, geschrieben für die Menschen, die sie einreichen müssen. Klare Sprache, mit Datum und Quelle.",
    ogTitle: "Der Bindu Blog zur Handels-Compliance",
    searchPlaceholder: "Artikel durchsuchen",
    all: "Alle",
    languages: "Sprachen",
    sort: "Sortieren",
    newest: "Neueste",
    oldest: "Älteste",
    alphabetical: "A → Z",
    showingOf: (shown, total) => `${shown} von ${total} Artikeln`,
    articleCount: (n) => `${n} ${n === 1 ? "Artikel" : "Artikel"}`,
    noMatches: "Keine Artikel gefunden.",
    readArticle: "Artikel lesen",
    showMore: "Weitere Artikel anzeigen",
    minRead: "Min. Lesezeit",
    backToBlog: "Blog",
    updatedPrefix: "Aktualisiert",
    regulationChip: "Verordnung",
    photoBy: "Foto von",
    photoOn: "auf",
    aboutTheAuthor: "Über den Autor",
    jobTitleSuffix: "Bindu",
    contact: "Kontakt:",
    editorialStandards:
      "Redaktionelle Grundsätze: geschrieben und gepflegt auf Basis des Verordnungstextes selbst, nicht auf Basis von Zusammenfassungen Dritter.",
  },
};
