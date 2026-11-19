import type { Metadata } from "next";
import { CbamPage, CBAM_FAQ } from "@/features/landing/regulation/cbam-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

export const metadata: Metadata = {
  title: "CBAM for importers: what to file, and when",
  description:
    "CBAM prices the carbon in imported steel, cement, aluminium, fertiliser, hydrogen and electricity. The six sectors, what to collect, and the dates.",
  openGraph: {
    title: "CBAM for importers: what to file, and when",
    description:
      "Six sectors in scope, one record per shipment, ten-year audit trail. The CBAM filing process for importers without a compliance team.",
    url: "/cbam",
    type: "website",
    images: [
      {
        url: "/images/cbam-steel-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Rebar on a steel mill line",
      },
    ],
  },
  alternates: {
    canonical: "/cbam",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="cbam"
        headline="CBAM for importers: what to file, and when"
        description="The EU Carbon Border Adjustment Mechanism (Regulation (EU) 2023/956, amended by Regulation (EU) 2025/2083) for importers: the six sectors in scope, how embedded emissions are calculated under Annex IV, the CBAM Registry declaration, the certificates, and the dates from the 2023 transitional period to the 2034 end of free allocation."
        image="/images/cbam-steel-hero.jpg"
        datePublished="2026-07-07"
        dateModified="2026-08-16"
        breadcrumb={[{ name: "CBAM", path: "cbam" }]}
        faq={CBAM_FAQ}
      />
      <CbamPage />
    </>
  );
}
