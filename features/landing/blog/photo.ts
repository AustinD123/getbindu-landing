/**
 * Responsive-image helpers for the hotlinked editorial photos.
 *
 * Deliberately its own module with no Node imports: `posts.ts` is
 * `server-only` (it reads the content directory), and the blog index is a
 * client component, so these cannot live there without pulling the filesystem
 * reader into the browser bundle.
 */

/** The image host, for the preconnect the hero and the card grid both want. */
export const PHOTO_HOST = "https://images.unsplash.com";

/** Unsplash's CDN serves any width from the same photo id, so derive a srcset
 *  instead of pushing one 1200px file into a 273px card. `auto=format` lets it
 *  negotiate AVIF or WebP per browser. Returns the URL unchanged if it is not
 *  parseable, so a hand-written frontmatter value still renders. */
export function photoSrc(url: string, width: number): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("auto", "format");
    return u.toString();
  } catch {
    return url;
  }
}

/** A `srcset` string for the given widths, paired with a `sizes` at the call site. */
export function photoSrcSet(url: string, widths: readonly number[]): string {
  return widths.map((w) => `${photoSrc(url, w)} ${w}w`).join(", ");
}
