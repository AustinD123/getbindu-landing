import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import {
  BatteryProblem,
  BatteryFlow,
  BatteryScan,
  BatteryGranularity,
  BatteryCalendar,
  BatteryLoop,
  BatteryRails,
  BatteryClose,
} from "./battery-story";

/**
 * The BATTERY questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const BATTERY_FAQ = [
          {
            question: "What is the battery passport?",
            answer:
              "An electronic record, the first Digital Product Passport (DPP) to become mandatory, required under the EU Batteries Regulation for individual batteries placed on the EU market. It is accessed via a QR code on the battery.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "When is the battery passport mandatory?",
            answer: "From 18 February 2027, under the EU Batteries Regulation.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "Which batteries need a passport?",
            answer:
              "Each electric-vehicle (EV) battery, LMT (light means of transport) battery, and industrial battery with a capacity above 2 kWh. One passport per individual battery unit.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "What data does a battery passport contain?",
            answer:
              "The information listed in Annex XIII: battery identity and model, composition and materials, carbon footprint, recycled-content shares, performance and durability, supply-chain due-diligence, and dismantling and recycling information, disclosed at defined access tiers (public, legitimate interest, and notified bodies).",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "Is the battery passport a Digital Product Passport (DPP)?",
            answer:
              "Yes. The battery passport is the first Digital Product Passport to take effect. Other categories, textiles among the first, follow under the Ecodesign for Sustainable Products Regulation (ESPR).",
            source: {
              label: "EUR-Lex: EU Ecodesign for Sustainable Products Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
            },
          },
          {
            question: "Who is responsible for the battery passport?",
            answer:
              "The economic operator that places the battery on the EU market, the manufacturer or the importer, is responsible for the passport and for keeping its data accurate, complete and up to date. There is one responsible operator per battery placed on the market.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "Do all batteries need a passport?",
            answer:
              "No. The passport applies only to electric-vehicle batteries, LMT batteries, and industrial batteries above 2 kWh. Portable batteries, such as those in phones, laptops and power tools, fall outside the passport requirement, though other parts of the Batteries Regulation still apply to them.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "How do you access a battery passport?",
            answer:
              "Through a QR code printed on or attached to each battery, which resolves to that battery's passport. What a reader sees depends on their access tier: a public view for anyone, more for those with a legitimate interest, and the full record for notified bodies and market-surveillance authorities.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "What if my suppliers will not answer?",
            answer:
              "That is the passport's real work, and it is the same supplier-collection problem Bindu already runs for EUDR filings today: each party gets a link asking for the one field it holds, in the format it already keeps, with no portal account to create. What they enter lands on your dossier, attributed to them.",
          },
          {
            question: "What happens when the delegated acts change the required fields?",
            answer:
              "The template is versioned. Your collected data stays where it is; new or changed fields appear as new obligations on the checklist, so you see exactly what the updated act asks for that you have not answered yet.",
          },
          {
            question: "Where does the passport data sit?",
            answer:
              "In your own workspace: EU-hosted and GDPR compliant, one workspace per company. By the regulation's design, only the unique identifier goes to the EU registry, and nothing is public except the passport view you choose to publish.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 77",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "Are phone and laptop batteries required to be removable?",
            answer:
              "Yes, but that is a separate rule from the passport. From 18 February 2027 the EU Batteries Regulation requires portable batteries in products such as phones and laptops to be readily removable and replaceable by the user. Those same portable batteries do not need a battery passport, which is reserved for EV, LMT, and industrial batteries above 2 kWh, so the two 2027 duties are easy to confuse.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Article 11",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
          {
            question: "Who has to carry out battery due diligence, and from when?",
            answer:
              "Economic operators that place batteries on the EU market must run a supply-chain due-diligence policy covering raw materials such as cobalt, lithium, nickel and natural graphite. The duty was postponed to 18 August 2027 and falls on operators with net annual turnover of at least EUR 40 million, so smaller firms are exempt. For batteries that need a passport, the due-diligence information is one of the data points the passport must carry.",
            source: {
              label: "EUR-Lex: EU Batteries Regulation, Articles 48 to 49",
              href: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng",
            },
          },
        ] as const;

export function DppBatteryPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="dpp-battery" />
      <main id="main">
        <RegHero
          active="dpp-battery"
          showHeader={false}
          label="Batteries and the Digital Product Passport"
          code="Regulation (EU) 2023/1542 · Article 77 · Passport from 18 Feb 2027"
          title="The battery passport: what an operator must publish."
          poster="/images/dpp-battery-hero.jpg"
          video="/videos/dpp-battery-hero.webm"
          sub={
            <>
              Chemistry, carbon, sourcing, recycled content, a living state of
              health: one passport carries all of it. One for every EV and LMT
              battery, and every <strong>industrial battery over 2 kWh</strong>,
              that you place on the EU market. From{" "}
              <strong>18 February 2027, you cannot place one without it</strong>.
            </>
          }
        />

        <BatteryProblem />
        <BatteryFlow />
        <BatteryScan />
        <BatteryGranularity />
        <BatteryCalendar />
        <BatteryLoop />
        <BatteryRails />
        <RegBlogBand reg="dpp" />
        <RegulationFaq items={BATTERY_FAQ} />
        <RegulationPrice reg="dpp" heading="What a battery passport costs." />
        <BatteryClose />
      </main>

      <LandingFooter />
    </div>
  );
}
