import type { Metadata } from "next";
import { DppOthersPage, OTHERS_FAQ } from "@/features/landing/regulation/dpp-others-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

export const metadata: Metadata = {
  title: "Other product groups on the DPP roadmap",
  description:
    "Your product group is probably on the list. Steel 2026, aluminium and tyres 2027, furniture 2028, toys 2030, cement later. Which law sets each date.",
  openGraph: {
    title: "Other product groups on the DPP roadmap",
    description:
      "The ESPR Working Plan queue plus toys and cement: which product group gets a passport, when, and from which law.",
    url: "/dpp/others",
    type: "website",
    // A page-level openGraph REPLACES the root layout's whole openGraph
    // object, so the image must be restated here or /dpp/others ships with
    // no og:image. Reuse the same hero the page's Article schema points at.
    images: [
      {
        url: "/images/dpp-others-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Assorted consumer products on the DPP roadmap",
      },
    ],
  },
  alternates: {
    canonical: "/dpp/others",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="dpp/others"
        headline="Other product groups on the Digital Product Passport (DPP) roadmap"
        description="The Digital Product Passport roadmap beyond batteries and textiles: the six priority groups of the first ESPR Working Plan, the EU DPP Registry going live on 19 July 2026, toys under the Toy Safety Regulation (EU) 2025/2509, and cement on its own conditional track."
        image="/images/dpp-others-hero.jpg"
        datePublished="2026-07-07"
        dateModified="2026-08-16"
        breadcrumb={[
          { name: "Digital Product Passport", path: "dpp/battery" },
          { name: "Other product groups", path: "dpp/others" },
        ]}
        faq={OTHERS_FAQ}
      />
      <DppOthersPage />
    </>
  );
}
