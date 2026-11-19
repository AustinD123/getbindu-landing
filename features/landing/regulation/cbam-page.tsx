import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import {
  CbamProblem,
  CbamWorkedExample,
  CbamFlow,
  CbamScan,
  CbamGranularity,
  CbamCost,
  CbamCalendar,
  CbamLoop,
  CbamRails,
  CbamClose,
} from "./cbam-story";

/**
 * The CBAM questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const CBAM_FAQ = [
          // Ordered by reader maturity: what it is → who it covers → when →
          // how to comply → cost → edge cases. Skimmers and featured snippets
          // both read top-down.
          {
            question: "What is CBAM?",
            answer:
              "CBAM is the EU's Carbon Border Adjustment Mechanism, set by the EU CBAM Regulation. It puts a carbon price on imports of certain carbon-intensive goods, matching the price EU producers already pay under the Emissions Trading System, so production and emissions do not simply move abroad to avoid the EU carbon price.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Which goods does CBAM cover?",
            answer:
              "Six carbon-intensive sectors: cement, iron and steel, aluminium, fertilisers, electricity, and hydrogen. Each is defined by CN code in Annex I of the EU CBAM Regulation. Cement and fertilisers also carry indirect emissions, the electricity behind them; steel, aluminium, and hydrogen count direct emissions only.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Does a CN code on the CBAM list mean I owe CBAM?",
            answer:
              "No. Being in Annex I is one of several conditions in Article 2. The good must also have non-preferential origin in a third country that is not listed in Annex III (Iceland, Liechtenstein, Norway, Switzerland and certain territories, whose carbon is already priced), enter under a customs procedure CBAM covers, and fall outside the carve-outs for military use and certain shelf or EEZ energy. Miss any one and the identical code carries no CBAM obligation, which is why origin decides as much as the code.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "When does CBAM start to apply?",
            answer:
              "The transitional period began on 1 October 2023 with quarterly reports on the embedded emissions of imported goods and no payments. The definitive regime begins on 1 January 2026: only an authorised CBAM declarant may import, the financial obligation starts, and the EU ETS free allowances begin to phase out.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "What is the CBAM transitional period?",
            answer:
              "From 1 October 2023 to the end of 2025, importers of covered goods file quarterly reports on the embedded emissions of their imports, with nothing to pay and no certificates to buy. It is a data-gathering phase. The definitive regime, when the charge begins, starts on 1 January 2026.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "How do you comply with CBAM?",
            answer:
              "Become an authorised CBAM declarant, collect the emissions data from each installation that made your goods, and have actual figures verified by an accredited third party. Calculate the embedded emissions per Annex IV, file the annual CBAM declaration to the central Registry by 30 September, and surrender one certificate per tonne of embedded CO2, holding at least 50% of the running total each quarter.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "When is the first CBAM declaration due?",
            answer:
              "The first CBAM certificates go on sale on the common central platform on 1 February 2027. The first annual CBAM declaration and certificate surrender fall due on 30 September 2027, covering 2026 imports. Every year after that, the declaration and surrender fall due the following 30 September.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "How are CBAM embedded emissions calculated?",
            answer:
              "Per Annex IV: direct emissions, plus indirect emissions for cement and fertilisers, per tonne of goods. Any carbon price already paid where the goods were made is then deducted (Article 9), so the same tonne is never charged twice. Actual installation data verified by an accredited third party takes precedence over the Commission's default values, which are set conservatively.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "How much of the carbon price do importers pay under CBAM?",
            answer:
              "One CBAM certificate per tonne of embedded CO2, priced off the EU ETS auction. Importers must hold at least 50% of the running total each quarter and surrender the rest once a year. Free allocation to CBAM sectors is fully gone by 2034, at which point importers pay for 100% of embedded emissions.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "What is the CBAM 50-tonne threshold?",
            answer:
              "A de minimis threshold introduced by the Omnibus simplification, which took effect on 20 October 2025. Importers below 50 tonnes of covered goods a year fall out of scope for those goods. It does not reach electricity or hydrogen, which stay in scope from the first import, whatever the tonnage.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "My customs representative handles my imports. Does CBAM still land on me?",
            answer:
              "Partly. Article 5 lets an indirect customs representative hold the CBAM authorisation, so a broker or forwarder can file for you. What cannot be delegated is the data: the emissions figures come from the installations that made your goods, defaults cost you money when suppliers do not answer, and the records behind each declaration must be kept until the end of the fourth year after the declaration year. Whoever files, the collection problem is the importer's.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation, Article 7",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
          {
            question: "Is there a UK CBAM?",
            answer:
              "Yes, and it is separate from the EU's. The UK is introducing its own Carbon Border Adjustment Mechanism from 1 January 2027, with its own scope, rate and reporting, so goods moving into both markets can face two different schemes. This page covers the EU CBAM Regulation.",
            source: {
              label: "UK Government: UK CBAM from January 2027",
              href: "https://www.gov.uk/government/consultations/draft-regulations-carbon-border-adjustment-mechanism-cbam",
            },
          },
          {
            question: "How much does a CBAM certificate cost?",
            answer:
              "There is no fixed price. One CBAM certificate covers one tonne of embedded CO2, and its price follows the EU Emissions Trading System: the Commission works it out from average ETS auction prices and publishes it, so it moves with the carbon market. You buy certificates to match your verified embedded emissions, less any carbon price already paid in the country of production.",
            source: {
              label: "European Commission: Carbon Border Adjustment Mechanism",
              href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
            },
          },
          {
            question: "Who has to comply with CBAM?",
            answer:
              "The obligation falls on the EU importer of the covered goods, or the indirect customs representative acting for them. From 1 January 2026 that party must be an authorised CBAM declarant to import at all. Producers outside the EU are not directly liable to the EU, but they supply the installation emissions data the declarant needs. Importers who bring in less than 50 tonnes of covered goods a year fall outside scope for those goods, though electricity and hydrogen are always in scope.",
            source: {
              label: "EUR-Lex: EU CBAM Regulation, Articles 2 and 5",
              href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng",
            },
          },
        ] as const;

export function CbamPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="cbam" />
      <main id="main">
        <RegHero
          active="cbam"
          showHeader={false}
          label="CBAM: what to file, and when"
          code="Regulation (EU) 2023/956 · CBAM · Definitive regime from 1 Jan 2026"
          title="CBAM: what to file, and when."
          poster="/images/cbam-steel-hero.jpg"
          video="/videos/cbam-steel-hero.webm"
          sub={
            <>
              Cement, steel, aluminium, fertilisers, electricity, hydrogen.
              Import them into the EU and you pay for the{" "}
              <strong>carbon embedded in them</strong>, the same price a
              European plant pays. Reporting since 2023.{" "}
              <strong>The bill starts with 2026 imports</strong>.
            </>
          }
        />

        <CbamProblem />
        <CbamWorkedExample />
        <CbamFlow />
        <CbamScan />
        <CbamGranularity />
        <CbamCost />
        <CbamCalendar />
        <CbamLoop />
        <CbamRails />
        <RegBlogBand reg="cbam" />
        <RegulationFaq items={CBAM_FAQ} />
        <RegulationPrice reg="cbam" heading="What a CBAM filing costs." />
        <CbamClose />
      </main>

      <LandingFooter />
    </div>
  );
}
