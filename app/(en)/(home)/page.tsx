import type { Metadata } from "next";
import { HomePage } from "@/features/landing/home/home-page";
import { RedirectIfAuthenticated } from "@/features/landing/chrome/redirect-if-authenticated";
import { faq } from "@/features/landing/home/content";
import { SITE_URL } from "@/features/landing/seo/team";

// Homepage-only schema. Organization and WebSite come from LandingJsonLd in the layout; this adds the
// product with its one published price (EUDR dossier, EUR, excl. VAT) and the FAQ answers shown on the page.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#app`,
      name: "Bindu",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: { "@id": `${SITE_URL}#org` },
      offers: {
        "@type": "Offer",
        name: "EUDR due-diligence dossier",
        price: "249",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "249",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
          unitText: "per EUDR dossier",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items
        .filter((f) => f.a)
        .map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <RedirectIfAuthenticated />
      <HomePage />
    </>
  );
}
