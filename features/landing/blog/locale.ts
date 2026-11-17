/**
 * The locales the blog publishes in, and the slug pairs that tie a translated
 * post to its source.
 *
 * English posts live in `content/blog`. Every other locale gets a
 * subdirectory, `content/blog/<locale>`. Adding a locale means adding it here,
 * giving it a route under `app/(<locale>)/<locale>/blog`, and adding its
 * strings to BLOG_LABELS.
 *
 * BLOG_TRANSLATIONS is deliberately an explicit list rather than something
 * derived from frontmatter. hreflang has to be reciprocal: the English post
 * must point at the German one and the German one back at it. Deriving that
 * would mean parsing every locale's corpus to render a single page. This
 * mirrors EUDR_LOCALE_PATHS, which solves the same problem for the pillar
 * pages.
 *
 * A post with no entry here is standalone, and declares only its own language.
 * That is the correct shape for a post written for one market rather than
 * translated from another, which is what the German posts are: they target
 * German search terms that have no English counterpart on this blog.
 */

export type BlogLocale = "en" | "de";

/** English first: it is the source locale and the x-default target. */
export const BLOG_LOCALES = ["en", "de"] as const satisfies readonly BlogLocale[];

/** Locales that live in a subdirectory and under a prefixed route. */
/**
 * Each locale's name in its own language. A German reader scanning an English
 * page looks for "Deutsch", not "German", so the switcher never translates
 * these into the page's language.
 */
export const LOCALE_ENDONYMS: Record<BlogLocale, string> = {
  en: "English",
  de: "Deutsch",
};

export const NON_DEFAULT_BLOG_LOCALES = BLOG_LOCALES.filter(
  (l): l is Exclude<BlogLocale, "en"> => l !== "en",
);

export type BlogTranslationSet = Partial<Record<BlogLocale, string>>;

/**
 * Posts that exist in more than one locale, by slug.
 *
 * Add a row only when two posts are genuinely the same article in two
 * languages. Pairing posts that merely cover the same regulation would
 * declare a translation that does not exist, which is worse for search than
 * declaring nothing.
 */
export const BLOG_TRANSLATIONS: readonly BlogTranslationSet[] = [
  {
    en: "which-products-need-a-digital-product-passport",
    de: "digitaler-produktpass-welche-produkte",
  },
  {
    en: "digital-product-passport-latest-updates",
    de: "espr-aktuelle-aenderungen",
  },
  {
    en: "eu-batteries-regulation",
    de: "batterieverordnung",
  },
  {
    en: "digital-product-passport-software",
    de: "digitaler-produktpass-software",
  },
  {
    en: "digital-product-passport-example",
    de: "digitaler-produktpass-beispiel",
  },
  {
    en: "who-is-responsible-for-a-digital-product-passport",
    de: "digitaler-produktpass-verantwortlich",
  },
  {
    en: "digital-product-passport-uk",
    de: "digitaler-produktpass-exporteure-nicht-eu",
  },
  {
    en: "battery-passport",
    de: "batteriepass",
  },
  {
    en: "ecodesign-directive-vs-espr",
    de: "oekodesign-richtlinie-espr",
  },
  {
    en: "what-is-cbam",
    de: "cbam-verordnung",
  },
  {
    en: "what-is-an-hs-code",
    de: "hs-code",
  },
  {
    en: "ppwr-labelling-requirements",
    de: "ppwr-kennzeichnungspflicht",
  },
  {
    en: "mpeda-catch-certificate",
    de: "mpeda-fangbescheinigung",
  },
  {
    en: "eudr-latest-updates",
    de: "eudr-verschiebung",
  },
  {
    en: "cbam-timeline",
    de: "cbam-zeitplan",
  },
  {
    en: "eudr-requirements-checklist",
    de: "eudr-checkliste",
  },
  {
    en: "ppwr-checklist-cardboard",
    de: "ppwr-checkliste-karton",
  },
  {
    en: "digital-product-passport-checklist",
    de: "digitaler-produktpass-checkliste",
  },
  {
    en: "eu-catch-certificate-checklist",
    de: "fangbescheinigung-checkliste",
  },
  {
    en: "eori-number-checklist",
    de: "eori-nummer-checkliste",
  },
  {
    en: "taric-code-checklist",
    de: "taric-code-finden",
  },
];

export function blogIndexPath(locale: BlogLocale): string {
  return locale === "en" ? "/blog" : `/${locale}/blog`;
}

export function blogPostPath(slug: string, locale: BlogLocale): string {
  return `${blogIndexPath(locale)}/${slug}`;
}

/** The translation set a post belongs to, or null when it stands alone. */
export function translationSetFor(
  slug: string,
  locale: BlogLocale,
): BlogTranslationSet | null {
  return BLOG_TRANSLATIONS.find((set) => set[locale] === slug) ?? null;
}

/**
 * Regulation pillar pages that exist per locale.
 *
 * Only /eudr is translated today. A German post about REACH therefore shows no
 * pillar chip rather than linking a German reader to an English page: a chip
 * that changes language without warning is worse than no chip. Add a key here
 * when the matching pillar page ships in that locale.
 */
const LOCALIZED_PILLAR_PATHS: Record<BlogLocale, Record<string, string>> = {
  en: {
    eudr: "/eudr",
    cbam: "/cbam",
    dpp: "/dpp",
    reach: "/reach",
    ppwr: "/ppwr",
  },
  de: {
    eudr: "/de/eudr",
  },
};

/** The pillar path for `reg` in `locale`, or null when none exists there. */
export function pillarPathFor(
  reg: string,
  locale: BlogLocale,
): string | null {
  return LOCALIZED_PILLAR_PATHS[locale][reg] ?? null;
}
