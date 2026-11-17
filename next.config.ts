import type { NextConfig } from "next";

/**
 * Blog-only config. Shelley's next.config.ts also proxies the Go backend,
 * sets the site CSP and the marketing redirects; none of that applies here.
 * Do NOT copy this file back into shelley.
 */
const nextConfig: NextConfig = {
  devIndicators: false,
  // Same custom loader as shelley: <Image> sources are served as-is (or from
  // the CDN when NEXT_PUBLIC_CDN_BASE is set), never through /_next/image.
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
