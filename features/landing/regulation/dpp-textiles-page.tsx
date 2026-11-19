import Link from "next/link";
import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import {
  TextilesProblem,
  TextilesFlow,
  TextilesScan,
  TextilesGranularity,
  TextilesCalendar,
  TextilesLoop,
  TextilesRails,
  TextilesClose,
} from "./textiles-story";

/**
 * The TEXTILES questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const TEXTILES_FAQ = [
          {
            question: "When will textiles need a Digital Product Passport?",
            answer:
              "Textiles and apparel sit in the first wave of the ESPR working plan, with an indicative 2027 timeframe. The exact date the textile DPP becomes mandatory is set once the ESPR delegated act for textiles is adopted.",
            source: {
              label: "European Commission: Ecodesign working plan 2025 to 2030",
              href: "https://ec.europa.eu/commission/presscorner/detail/en/ip_25_1071",
            },
          },
          {
            question: "What is the EU ban on destroying unsold textiles?",
            answer:
              "From 19 July 2026, large companies may no longer destroy unsold clothing, clothing accessories, and footwear, under the Ecodesign for Sustainable Products Regulation. It is the first concrete, dated textile obligation under the ESPR.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Who must comply with the unsold-textiles destruction ban?",
            answer:
              "Large companies from 19 July 2026. Medium-sized companies receive an extended transition period, and micro and small enterprises are exempt from the destruction ban.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "What will a textile Digital Product Passport contain?",
            answer:
              "Likely product identity, fibre composition and materials, care and repair information, durability and recyclability, and compliance data. The exact data set is defined by the forthcoming ESPR delegated act for textiles.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Which regulation introduces the textile DPP?",
            answer:
              "The Ecodesign for Sustainable Products Regulation (ESPR), which establishes the Digital Product Passport framework across product categories, with textiles among the first.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "How does a textile Digital Product Passport work?",
            answer:
              "Each garment gets a unique identifier, carried on the product in a QR code, NFC or RFID tag. Scanning the data carrier links directly to the passport data: fibre composition, care and repair, durability, recycled content and compliance. The EU's central DPP Registry is a directory that records each product's unique identifier; it is not what a consumer scan routes through. The content stays with the brand or its passport service provider, not on an EU server.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "How will people access a textile passport?",
            answer:
              "Through a data carrier fixed to the garment, usually a QR code but also NFC or RFID, made to survive washing and still resolve years after the sale. One scan opens the passport. What it shows depends on who is asking: a public view for shoppers, and wider views for recyclers and authorities through separate access tiers.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Who is responsible for creating a textile passport?",
            answer:
              "The economic operator that places the product on the EU market, usually the manufacturer or the importer, owes the passport. ESPR lets that operator appoint an independent passport service provider to create and maintain it on their behalf, but the legal responsibility stays with the operator.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Is a Digital Product Passport a blockchain?",
            answer:
              "No. Only a product's unique identifier goes to the EU's central DPP Registry, which is a directory, not a blockchain. The passport content itself stays with the operator or its service provider. The system is built on open EU standards, the EN 18216 to 18223 family, not on any single ledger technology.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Did the ESPR replace the old EU Ecodesign Directive?",
            answer:
              "Yes. The Ecodesign for Sustainable Products Regulation repealed and replaced the 2009 Ecodesign Directive. It keeps the energy-efficiency rules but extends ecodesign and the Digital Product Passport to almost every physical product, with textiles among the first groups.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Which textile and apparel products will need a Digital Product Passport?",
            answer:
              "The exact scope will be set by the ESPR delegated act for textiles, but the Ecodesign working plan lists apparel and clothing accessories as a priority group, with footwear expected alongside them. Scope is set by product category, not company size, so a small brand placing a finished garment on the EU market is as much in scope as a large one. Until the delegated act is adopted, treat any finished textile, apparel, or footwear item sold in the EU as a likely candidate.",
            source: {
              label: "European Commission: Ecodesign working plan 2025 to 2030",
              href: "https://ec.europa.eu/commission/presscorner/detail/en/ip_25_1071",
            },
          },
          {
            question: "Is the textile Digital Product Passport the same as textile EPR?",
            answer:
              "No, they are two separate obligations. The Digital Product Passport comes from the Ecodesign for Sustainable Products Regulation and governs the product-level data a garment must carry. Extended Producer Responsibility for textiles comes from the revised EU Waste Framework Directive and makes producers fund the collection and treatment of textile waste. A brand can owe both, but they are different laws with different triggers.",
            source: {
              label: "European Commission: EU textiles rules",
              href: "https://environment.ec.europa.eu/strategy/textiles-strategy_en",
            },
          },
        ] as const;

export function DppTextilesPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="dpp-textiles" />
      <main id="main">
        <RegHero
          active="dpp-textiles"
          showHeader={false}
          label="Textiles and the Digital Product Passport"
          code="ESPR 2024/1781 · Textile apparel · Delegated act ~2027"
          title="The textile passport: what an operator must publish."
          poster="/images/dpp-textiles-hero.jpg"
          video="/videos/dpp-textiles-hero.webm"
          sub={
            <>
              What it&apos;s made of, what&apos;s hidden in it, where it was cut,
              how to care for it, how to bring it back:{" "}
              <strong>one passport</strong> for every garment placed on the EU
              market, with the delegated act expected in <strong>2027</strong>.
            </>
          }
        />

        {/* /dpp redirects here, so all generic DPP intent lands on this page,
            battery producers included. Route them in one glance: theirs is the
            passport with the hard deadline. */}
        <aside aria-label="Battery passports" className="tx-battery-band">
          <div className="st-container">
            <p>
              Making batteries? The passport with the hard deadline is{" "}
              <strong>18 February 2027</strong>.{" "}
              <Link href="/dpp/battery">The battery passport →</Link>
            </p>
          </div>
        </aside>

        <TextilesProblem />
        <TextilesFlow />
        <TextilesScan />
        <TextilesGranularity />
        <TextilesCalendar />
        <TextilesLoop />
        <TextilesRails />
        <RegBlogBand reg="dpp" />
        <RegulationFaq items={TEXTILES_FAQ} />
        <RegulationPrice reg="dpp" heading="What a textile passport costs." />
        <TextilesClose />
      </main>

      <LandingFooter />
    </div>
  );
}
