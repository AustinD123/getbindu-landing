import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import {
  OthersProblem,
  OthersFlow,
  OthersScan,
  OthersGranularity,
  OthersCalendar,
  OthersLoop,
  OthersRails,
  OthersClose,
} from "./others-story";

/**
 * The OTHERS questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const OTHERS_FAQ = [
          {
            question: "Which product groups get a Digital Product Passport next?",
            answer:
              "After batteries and textiles, the passport spreads one delegated act at a time. The per-group years are when each act is adopted, not when compliance bites: iron and steel first (adopted 2026), then aluminium and tyres (2027), furniture (2028), and mattresses (2029), alongside horizontal measures on reparability and recycled content. Toys follow on their own statutory track in 2030, and cement on a separate conditional window. These dates are indicative and follow the Commission's own plan, and the passport for each group applies about 18 months after its act is adopted, not on the adoption date itself.",
            source: {
              label: "European Commission: Ecodesign working plan 2025 to 2030",
              href: "https://ec.europa.eu/commission/presscorner/detail/en/ip_25_1071",
            },
          },
          {
            question: "Which regulation sets the Digital Product Passport roadmap?",
            answer:
              "The Ecodesign for Sustainable Products Regulation (ESPR), which entered into force on 18 July 2024. It replaced the 2009 Ecodesign Directive and extended the passport from energy products to almost everything physical, with the requirements for each product group set by its own delegated act.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "What is the first ESPR Working Plan?",
            answer:
              "Adopted on 16 April 2025, it names six priority product groups (textiles, furniture, mattresses, tyres, iron and steel, and aluminium) plus horizontal measures on repair and recycled content. It is the published queue for which group gets a passport, and roughly when.",
            source: {
              label: "European Commission: Ecodesign working plan 2025 to 2030",
              href: "https://ec.europa.eu/commission/presscorner/detail/en/ip_25_1071",
            },
          },
          {
            question: "When does the EU Digital Product Passport Registry go live?",
            answer:
              "The deadline was 19 July 2026, and it went live on 20 July 2026 under the implementing regulation for the Registry. The Registry is the shared lookup that resolves every product's unique identifier to where its passport is held, while the content stays with the operator or its passport service provider. The same date, the ban on destroying unsold textiles and footwear started to bite for large companies under the ESPR.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Do toys need a Digital Product Passport?",
            answer:
              "Yes. From 1 August 2030 the Toy Safety Regulation applies: every toy needs a passport, and it replaces the paper declaration of conformity. Toys arrive on their own statutory track rather than through an ESPR delegated act.",
            source: {
              label: "European Commission: Toy safety",
              href: "https://single-market-economy.ec.europa.eu/sectors/toys_en",
            },
          },
          {
            question: "When will cement need a Digital Product Passport?",
            answer:
              "Cement waits on its own conditional window, no earlier than the end of 2028, under the ESPR.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "What is a Digital Product Passport?",
            answer:
              "A structured electronic record that travels with a product and carries its identity, materials, compliance and end-of-life data. It is reached by scanning a data carrier on the product, usually a QR code, and is built so shoppers, recyclers and authorities each see the parts they are entitled to. The EU is rolling it out one product group at a time.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "How does a Digital Product Passport work?",
            answer:
              "Each product gets a unique identifier carried on it in a QR, NFC or RFID tag. Scanning it resolves, through the EU's central Registry, to the passport data held by the operator or its service provider. Only the identifier sits in the Registry; the content stays with the company, not on an EU server.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Who needs a Digital Product Passport?",
            answer:
              "The economic operator that places a product from a covered group on the EU market, usually the manufacturer or the importer. Which groups are covered, and when, is set one delegated act at a time: batteries first, then textiles, and the rest of the Working Plan behind them. An operator may appoint a passport service provider to run it, but stays legally responsible.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "What data must a Digital Product Passport contain?",
            answer:
              "The ESPR sets the framework categories: a unique product identifier, compliance and conformity details, material composition and any substances of concern, plus durability, reparability, recycled-content and end-of-life data. The exact fields are fixed per product group by that group's delegated act, not by one universal list. Access is layered, so consumers, recyclers and market-surveillance authorities each see the parts they are entitled to.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation, Articles 9 to 11",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "What is the ESPR?",
            answer:
              "The ESPR is the EU's Ecodesign for Sustainable Products Regulation, in force since 18 July 2024. It replaced the 2009 Ecodesign Directive and lets the EU set sustainability and information rules, including the Digital Product Passport, for almost every physical product. It sets no product rules directly: each product group's requirements arrive through its own delegated act, sequenced by the Ecodesign working plan.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Does the UK have its own Digital Product Passport?",
            answer:
              "No. The Digital Product Passport is an EU instrument under the ESPR, and the UK has not adopted an equivalent mandatory passport. Scope follows the market, not the maker, so a UK company placing a product from a covered group on the EU market still needs a compliant passport for it. UK digital-labelling work is being explored separately and requires nothing yet.",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
        ] as const;

export function DppOthersPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="dpp-others" />
      <main id="main">
        <RegHero
          active="dpp-others"
          showHeader={false}
          label="Every other product group in line for a passport"
          code="ESPR 2024/1781 · The Digital Product Passport roadmap"
          title="The product passport: which group is next."
          poster="/images/dpp-others-hero.jpg"
          video="/videos/dpp-others-hero.webm"
          sub={
            <>
              <strong>Steel, aluminium, furniture, mattresses, toys</strong>: the
              passport reaches the whole economy one delegated act at a time. The
              engine being built underneath <strong>is the same one</strong>.
            </>
          }
        />

        <OthersProblem />
        <OthersFlow />
        <OthersScan />
        <OthersGranularity />
        <OthersCalendar />
        <OthersLoop />
        <OthersRails />
        <RegBlogBand reg="dpp" />
        <RegulationFaq items={OTHERS_FAQ} />
        <RegulationPrice reg="dpp" heading="What a product passport costs." />
        <OthersClose />
      </main>

      <LandingFooter />
    </div>
  );
}
