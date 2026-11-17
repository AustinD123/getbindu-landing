/**
 * next/image custom loader — routes every <Image> through the marketing CDN
 * (bunny.net) and, as a deliberate side effect, REPLACES Next's on-the-fly
 * /_next/image optimizer entirely.
 *
 * Why replace the optimizer: the source images are already-compressed .webp,
 * and sharp was the CPU bottleneck that made a page of screenshots take 3-4s
 * on the limited-CPU pod (AVIF was worse still, ~8-11s/image, measured
 * 2026-08-04). With this loader the images are plain static files served from
 * the edge — or same-origin from /public when NEXT_PUBLIC_CDN_BASE is empty
 * (local dev + rollback). See lib/cdn.ts.
 *
 * `width` is intentionally ignored: bunny is NOT running the paid Image
 * Optimizer (the sources are pre-sized), so appending a width would only
 * fragment the edge cache into one entry per breakpoint for no byte saving.
 */
import { cdnAsset } from "./lib/cdn";

export default function cdnImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return cdnAsset(src);
}
