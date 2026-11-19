import type { Metadata } from "next";
import { DppTextilesPage, TEXTILES_FAQ } from "@/features/landing/regulation/dpp-textiles-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

export const metadata: Metadata = {
  title: "Textiles and the Digital Product Passport",
  description:
    "One textile rule is already dated: from 19 July 2026 large companies may not destroy unsold clothing. The apparel passport follows in the 2027 ESPR wave.",
  openGraph: {
    title: "Textiles and the Digital Product Passport",
    description:
      "The unsold-stock ban lands July 2026; the apparel passport follows once the ESPR delegated act is adopted. The order it arrives in.",
    url: "/dpp/textiles",
    type: "website",
    images: [
      {
        url: "/images/dpp-textile-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Textile production line",
      },
    ],
  },
  alternates: {
    canonical: "/dpp/textiles",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="dpp/textiles"
        headline="Textiles and the Digital Product Passport (DPP)"
        description="The textile Digital Product Passport under the Ecodesign for Sustainable Products Regulation (ESPR), Regulation (EU) 2024/1781: where apparel sits in the 2027 wave, what a textile passport is likely to carry, and the unsold-textiles destruction ban from 19 July 2026."
        image="/images/dpp-textile-hero.jpg"
        datePublished="2026-07-07"
        dateModified="2026-08-16"
        breadcrumb={[
          { name: "Digital Product Passport", path: "dpp/battery" },
          { name: "Textiles", path: "dpp/textiles" },
        ]}
        faq={TEXTILES_FAQ}
      />
      <DppTextilesPage />
    </>
  );
}
