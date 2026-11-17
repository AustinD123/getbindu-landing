/**
 * Site-wide `metadata` and `viewport`, shared by every root layout.
 *
 * Next merges metadata down the tree from the root layout of whichever tree a
 * route lives in, so with more than one root these have to be exported from
 * each of them. They are authored once here and re-exported, so the intl tree
 * cannot drift from the English one.
 */

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://getbindu.com"),
  title: {
    default: "Bindu: The Trade-Compliance OS",
    template: "%s | Bindu",
  },
  // No "open-source" here. The compliance platform is proprietary; only the
  // agent layer at github.com/GetBindu/Bindu is open source, and it is
  // Apache-2.0. This string is the default description for every page that
  // does not set its own, so it was the widest-reaching version of the claim.
  description:
    "The trade-compliance OS. Describe a shipment once. Bindu finds the HS code, screens EUDR, CBAM, DPP and tariff rules, and files the artifact.",
  openGraph: {
    type: "website",
    siteName: "Bindu",
    locale: "en_US",
    images: [
      { url: "/bindu-card.jpg", width: 1200, height: 630, alt: "Bindu" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@getbindu",
    creator: "@getbindu",
    images: ["/bindu-card.jpg"],
  },
  // No default `alternates.canonical` here on purpose: a root default of "/"
  // would silently canonicalise any page that forgets to set its own canonical
  // to the homepage. Every route sets its own self-referencing canonical
  // instead (the homepage sets "/"), so a missing one emits no tag rather than
  // the wrong one.
  robots: {
    index: true,
    follow: true,
  },
};
