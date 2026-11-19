import type { Metadata } from "next";
import { DERIVED, PRICES, eur } from "@/features/landing/pricing/price-data";
import { CbamSoftwarePage } from "@/features/landing/regulation/cbam-software-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

// This page previously carried its own SoftwareApplication node (the product it
// sells, with its published prices). It was removed (2026-09-02) for the same
// reason as the site-wide one: Google's SoftwareApplication rich result needs an
// aggregateRating or review, and with neither (no real ratings, none fabricated)
// it only produced a rich-results validation error. The prices still live in the
// visible copy and the metadata; RegulationJsonLd carries the Article/FAQ/
// Breadcrumb graph.

export const metadata: Metadata = {
  title: "CBAM reporting software: six obligations, one record",
  description: `Six CBAM obligations, one record: declarant status, installation data, verifier report, emissions figure, declaration, certificates. From ${eur(
    PRICES.cbamQuarter
  )} a quarter.`,
  openGraph: {
    title: "CBAM reporting software: six obligations, one record",
    description:
      "Declarant status, installation data, the verifier report, the emissions figure, the declaration, the certificates. Each with its evidence and its date.",
    url: "/cbam/software",
    type: "article",
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
    canonical: "/cbam/software",
  },
};

/**
 * Authored once: the route emits these as FAQPage structured data and
 * the page renders the same array visibly.
 */
const FAQ = [
          {
            question: "What is CBAM reporting software?",
            answer:
              "Software that keeps the source data for a Carbon Border Adjustment Mechanism declaration in one place. Bindu opens a CBAM record carrying the six obligations as a checklist: authorised declarant status, the activity data from each installation, the verifier report, the embedded-emissions figure, the annual declaration and the certificate surrender. Each row holds its own evidence, owner and date, and the record's audit log is append-only and hash-chained. It holds the per-installation trail until the end of the fourth year after the declaration year, the retention the EU CBAM Regulation asks for. Bindu does not compute embedded emissions, connect to the CBAM Registry, or trade certificates; you bring those and the record holds them.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Who has to report under CBAM?",
            answer:
              "Importers of the six covered sectors: cement, iron and steel, aluminium, fertilisers, electricity, and hydrogen, each defined by its CN code. Since 1 January 2026 only an authorised CBAM declarant may import in-scope goods. Below 50 tonnes of imports a year most goods fall out of scope. The threshold does not apply to electricity or hydrogen: those two sectors carry the obligation from the first import, whatever the tonnage.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "What data does a CBAM declaration need?",
            answer:
              "Activity data from each installation that made the goods: direct emissions, the electricity behind them, and any carbon price already paid at origin. From that, embedded emissions are computed per tonne, direct plus indirect for cement and fertilisers, and the carbon price already paid is deducted. Each line also carries its CN code, and the declaration is filed under the declarant's EORI.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Can I just use default values?",
            answer:
              "Yes. The Commission's default values are the legal fallback where installation data is missing, and they stay available. They are set conservatively, and the mark-up on them rises over time, roughly 20% in 2027 and 30% from 2028, so a declaration built on defaults almost always costs more than one built on verified actual data. The fallback does not go away; it just gets steadily more expensive, which is why actual figures win. Actuals also reward the right suppliers, because you pay for the real carbon.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Can I do this in a spreadsheet?",
            answer:
              "For the numbers, yes. What a spreadsheet cannot do is defend a 2026 declaration into 2030: Bindu's record keeps every figure against its evidence, its owner and its date in an append-only, hash-chained audit log, marks the blocking items, and holds the per-installation trail until the end of the fourth year after the declaration year. The arithmetic is the easy part; the defensibility is the product.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "My customs representative files for me. Do I still need this?",
            answer:
              "The EU CBAM Regulation lets an indirect customs representative hold the CBAM authorisation, so a broker can file. What stays with you either way is the data: collecting emissions figures from the installations that made your goods, the cost of defaults when suppliers do not answer, and the record behind each declaration that has to stand until the end of the fourth year after the declaration year. Bindu keeps that record whoever presses file.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "How is Bindu's CBAM software priced?",
            answer: `Published pricing, not an enterprise quote: ${eur(
              PRICES.cbamQuarter
            )} a quarter, ${eur(PRICES.cbamFiling)} a filing. That is ${eur(
              DERIVED.cbamYear
            )} a year. You keep the filing; Bindu keeps the record behind it. Onboarding starts with a demo on your own shipments.`,
          },
          {
            question: "Does Bindu connect to the CBAM Registry?",
            answer:
              "No. The EU CBAM Registry is the Commission's own portal, and the annual declaration is submitted there by the authorised declarant. Bindu is the system of record behind it: it assembles and holds the activity data, verifier reports, embedded-emissions figures and evidence, so whoever files has a defensible, audit-logged source for every number they enter. You file in the Registry; Bindu keeps the record that proves what you filed.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "Can I automate CBAM reporting or connect it to my ERP?",
            answer:
              "Bindu's accelerator is document upload with prefill: drop an invoice, supplier emissions sheet or verifier report and the figures land on the matching obligation for a person to confirm, instead of being retyped. It is not a black-box feed into the CBAM Registry, and it does not compute embedded emissions for you. What it automates is the assembly and the audit trail; a person still confirms every number and files it, which is what a defensible declaration needs.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "How much do CBAM certificates cost, and when do you buy them?",
            answer:
              "A CBAM certificate matches one tonne of embedded CO2, priced on average EU Emissions Trading System auction prices, so the cost tracks the carbon market rather than a fixed rate. Certificate sales start in 2027 for 2026 emissions, and declarants surrender certificates against the embedded emissions in the annual declaration, less any carbon price already paid at origin. Bindu holds the emissions and carbon-price evidence behind that surrender figure; it does not buy, hold or trade certificates for you.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
        ] as const;

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="cbam/software"
        headline="CBAM reporting software: every CBAM obligation on one record"
        description="CBAM reporting software for EU importers of the six covered sectors under Regulation (EU) 2023/956: the declarant authorisation, the activity data from each installation, the verifier report, the embedded-emissions figure, the annual declaration and the certificate surrender, each kept on one record with its evidence, its owner and its date."
        image="/images/cbam-steel-hero.jpg"
        datePublished="2026-08-10"
        dateModified="2026-08-18"
        breadcrumb={[
          { name: "CBAM", path: "cbam" },
          { name: "Software", path: "cbam/software" },
        ]}
        faq={FAQ}
      />
      <CbamSoftwarePage faq={FAQ} />
    </>
  );
}
