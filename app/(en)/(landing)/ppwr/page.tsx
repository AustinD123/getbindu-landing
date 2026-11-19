import type { Metadata } from "next";
import { PpwrPage, PPWR_FAQ } from "@/features/landing/regulation/ppwr-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

/**
 * English only, like /reach and unlike /eudr. EUDR carries a
 * *-content.<locale>.ts set because it is the one regulation Bindu files end
 * to end, with a self-serve funnel behind each translated pillar. PPWR's
 * engine and filing path are still in build (the price band is future-tense),
 * so a translated set would be maintenance without a funnel. There is a
 * second reason specific to this
 * regulation: registration, EPR fees and deposit-and-return are set by 27
 * Member States and the corpus behind this page holds none of them, so a
 * per-country page is exactly where a reader would expect a national answer
 * this page cannot give.
 */
export const metadata: Metadata = {
  title: "PPWR: what a packaging file has to prove",
  description:
    "EU PPWR regulates the wrapper, not the product. A declaration per packaging type, produced in 10 days, under Regulation (EU) 2025/40 from 12 August 2026.",
  openGraph: {
    title: "PPWR: what a packaging file has to prove",
    description:
      "One parcel is several compliance objects. The declaration is per packaging type, not per product. Nothing is filed to an EU portal, and the only real filing is national.",
    url: "/ppwr",
    type: "website",
    images: [
      {
        url: "/images/hero-ship-sketch.webp",
        // Real pixel dimensions of the asset. Declaring a 1200x630 card for a
        // 1920x1437 file makes crawlers mis-crop it or drop the large-card
        // treatment; the declared ratio must match the file on disk.
        width: 1920,
        height: 1437,
        alt: "A port where imported goods cross the EU border",
      },
    ],
  },
  alternates: {
    canonical: "/ppwr",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="ppwr"
        headline="PPWR: what a packaging file has to prove"
        description="EU PPWR (Regulation (EU) 2025/40) for anyone placing packaged goods on the EU market: the seven limbs of the packaging definition, the four classification axes, the manufacturer and producer ladders, the obligations that bind from 12 August 2026, the declaration of conformity per packaging type, and the 10-day production duty. Every figure read from the regulation text rather than from published commentary."
        image="/images/hero-ship-sketch.webp"
        datePublished="2026-08-16"
        dateModified="2026-08-17"
        breadcrumb={[{ name: "PPWR", path: "ppwr" }]}
        faq={PPWR_FAQ}
      />
      <PpwrPage />
    </>
  );
}
