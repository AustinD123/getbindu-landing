import {
  type BlogLocale,
  blogIndexPath,
  blogPostPath,
  translationSetFor,
} from "@/features/landing/blog/locale";

/**
 * hreflang for the blog.
 *
 * The index and the author pages are English-only, so each declares itself as
 * the English version and as `x-default`. A self-referential set is the
 * correct shape for a single-language page: it states the language outright
 * instead of leaving it to be inferred.
 *
 * The /eudr pillar is the one page group with full translations; its set is
 * EUDR_HREFLANG in features/landing/regulation/eudr-content.ts.
 */
export function blogHreflang(path: string): Record<string, string> {
  return { en: path, "x-default": path };
}

/**
 * hreflang for one post.
 *
 * Three cases, and the differences matter.
 *
 * A post listed in BLOG_TRANSLATIONS exists in several languages, so every
 * sibling is declared and `x-default` points at the English one.
 *
 * A standalone English post keeps `en` plus `x-default`: English is the site's
 * default language, so it is the right page to serve a reader whose language
 * matches nothing.
 *
 * A standalone post in any other language declares only that language. There
 * is no default-language version of it to fall back to, and pointing
 * `x-default` at a German page would tell search engines to serve German to
 * everyone unmatched.
 */
export function blogPostHreflang(
  slug: string,
  locale: BlogLocale,
): Record<string, string> {
  const set = translationSetFor(slug, locale);
  if (!set) {
    const path = blogPostPath(slug, locale);
    return locale === "en"
      ? { en: path, "x-default": path }
      : { [locale]: path };
  }

  const languages: Record<string, string> = {};
  for (const [loc, s] of Object.entries(set)) {
    languages[loc] = blogPostPath(s, loc as BlogLocale);
  }
  if (set.en) languages["x-default"] = blogPostPath(set.en, "en");
  return languages;
}

/** hreflang for a locale's blog index. Self-referential until one is paired. */
export function blogIndexHreflang(
  locale: BlogLocale,
): Record<string, string> {
  const path = blogIndexPath(locale);
  return locale === "en"
    ? { en: path, "x-default": path }
    : { [locale]: path };
}
