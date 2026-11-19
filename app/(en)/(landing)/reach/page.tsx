import type { Metadata } from "next";
import { ReachPage, REACH_FAQ } from "@/features/landing/regulation/reach-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

export const metadata: Metadata = {
  title: "REACH for importers: what to prove, and how",
  description:
    "There is no REACH certificate. One SVHC on the Candidate List, above 0.1% of a component, puts the whole product in scope. What an EU importer has to prove.",
  openGraph: {
    title: "REACH for importers: what to prove, and how",
    description:
      "One small part above 0.1% puts the whole product in scope. The Candidate List moves twice a year. The proof a buyer accepts is a dated declaration, not a certificate.",
    url: "/reach",
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
    canonical: "/reach",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="reach"
        headline="REACH for importers: what to prove, and how"
        description="EU REACH (Regulation (EC) No 1907/2006) for importers of finished goods: the Candidate List of substances of very high concern (253 substances as of 4 February 2026), the 0.1%-per-component rule (Court of Justice C-106/14), the Article 33 information duties, the Annex XVII restrictions that hit imports, and why the proof buyers accept is a dated declaration rather than a certificate."
        image="/images/hero-ship-sketch.webp"
        datePublished="2026-08-14"
        dateModified="2026-08-17"
        breadcrumb={[{ name: "REACH", path: "reach" }]}
        faq={REACH_FAQ}
      />
      <ReachPage />
    </>
  );
}
