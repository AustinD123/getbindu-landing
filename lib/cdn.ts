/**
 * Marketing-media CDN base (bunny.net pull zone).
 *
 * `NEXT_PUBLIC_CDN_BASE` (e.g. https://getbindu.b-cdn.net) is baked into the
 * client bundle at BUILD time via a Docker build-arg (see apps/web/Dockerfile
 * + .github/workflows/*.yml). It is empty everywhere else — local dev and the
 * rollback path both serve /images + /videos same-origin from the pod's
 * /public, byte-identical to the pre-CDN behaviour.
 *
 * This is the single switch for the whole integration: unset the build-arg and
 * every image/video reverts to the pod. Consumed by:
 *   - image-loader.ts → the next/image custom loader (all landing <Image>s)
 *   - cdnAsset()       → raw <video>/<source>/poster attributes the loader
 *                        can't reach
 */
// Trailing slash stripped so a base with or without one composes identically —
// the bunny.net dashboard shows the pull-zone URL with a trailing slash, and a
// `https://…net//images/x` result would be a distinct (double-warmed) edge-cache
// key even though HTTP fetches it fine.
const CDN_BASE = (process.env.NEXT_PUBLIC_CDN_BASE || "").replace(
  /\/+$/,
  "",
);

/**
 * Prefix a root-relative /public path with the CDN base. Absolute URLs and the
 * empty-base (CDN-off) case pass through untouched, so callers can wrap
 * unconditionally without branching.
 */
export function cdnAsset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (!CDN_BASE) return path;
  return `${CDN_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
