import type { Metadata } from "next";
import { BinduLandingStory } from "@/features/landing/story/bindu-landing-story";
import { RedirectIfAuthenticated } from "@/features/landing/chrome/redirect-if-authenticated";

export const metadata: Metadata = {
  title: {
    absolute: "Bindu: Trade Compliance Software for EU Import & Export",
  },
  description:
    "Bindu is trade-compliance software for EU import & export. Describe a shipment once; Bindu screens EUDR, CBAM, DPP and tariff rules and files the artifact.",
  // NOTE: a page-level `openGraph` REPLACES the root layout's whole
  // openGraph object (Next merges shallowly per key), so images/siteName/
  // type must be restated here or the homepage ships without og:image.
  openGraph: {
    type: "website",
    siteName: "Bindu",
    locale: "en_US",
    title: "Bindu: Trade Compliance Software for EU Import & Export",
    description:
      "Describe a shipment once. Bindu screens the rules (EUDR, CBAM, DPP, tariffs) and files the artifact.",
    url: "/",
    images: [
      { url: "/bindu-card.jpg", width: 1200, height: 630, alt: "Bindu" },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <BinduLandingStory />
    </>
  );
}
