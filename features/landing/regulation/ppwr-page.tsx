import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationFaq } from "./regulation-faq";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegBlogBand } from "./reg-blog-band";
import {
  PpwrProblem,
  PpwrFlow,
  PpwrAxes,
  PpwrGranularity,
  PpwrCalendar,
  PpwrFiling,
  PpwrRails,
  PpwrChecked,
  PpwrClose,
} from "./ppwr-story";

/**
 * The PPWR questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const PPWR_FAQ = [
  {
    question: "What is the PPWR and when does it apply?",
    answer:
      "PPWR is the EU Packaging and Packaging Waste Regulation. It entered into force on 11 February 2025, which is the date the text itself uses in ten places, and it applies from 12 August 2026 under Article 71. Published summaries frequently give 12 February 2025 for entry into force; the regulation says the 11th.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 71",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "Does PPWR only cover food packaging?",
    answer:
      "No. Article 2(1) applies the regulation to all packaging regardless of the material used and regardless of whether it comes from industry, other manufacturing, retail or distribution, offices, services or households. The Article 5(5) PFAS limit is the only food-contact substance restriction, but it is not the only food-and-beverage-specific rule: the regulation also carries others, such as the single-use format bans in Annex V. Everything else is gated on format, material, lifecycle or role, so a book, a t-shirt and a laptop are caught by the same rules as a yoghurt pot.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 2",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What has to be submitted to the EU under PPWR?",
    answer:
      "Nothing. There is no EU portal for packaging conformity. Under Article 39(4) the manufacturer assumes responsibility by drawing up the EU declaration of conformity, and nobody countersigns it. You hold the declaration and the technical documentation; on a reasoned request from a national authority you produce them electronically, in a language it understands, within 10 days (Article 15(10)). The one genuine filing is different: registration in a national producer register under Article 44. Article 44(4) bars an unregistered producer from making packaging available in that Member State, and registration mechanics, producer responsibility fees and deposit-and-return schemes are set by each of the 27 Member States, not by this regulation.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 39 and 44",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "How many declarations of conformity does a catalogue need?",
    answer:
      "One per packaging type, not one per product. The regulation requires a declaration of conformity for each packaging type, identifying the packaging it covers, and it has to be continuously updated on the model the regulation sets out. A catalogue of 500 products drawing on 40 packaging types needs 40 declarations. The declaration and the technical documentation are retained for 5 years for single-use packaging and 10 years for reusable packaging under Article 15(3), which is the retention rule; Article 11(1) defines reusability and sets no retention period.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 15 and 39",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What are the PPWR recyclability grades?",
    answer:
      "Three grades, not five. Annex II Table 3 sets grade A at a design-for-recycling threshold of 95% or above, grade B at 80% or above and grade C at 70% or above; below 70% the packaging is technically non-recyclable and its placing on the market shall be restricted. From 1 January 2038 grade C can no longer be placed on the market, leaving A and B (Article 6(3)). 2035 is a different milestone: the recycled-at-scale factor, recyclable in facilities that actually exist at volume, is added to the grade under Article 6(2)(b). The grades themselves start on the later of 1 January 2030 and 24 months from the Article 6(4) delegated acts. Those acts had not been adopted as of the regulation text this page was checked against (16 August 2026), so the start date is not fixed today.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 6",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "Am I a manufacturer or a producer under PPWR?",
    answer:
      "They are two different roles with two different duty sets, and one company is routinely both for the same box. The manufacturer under Article 3(1)(13) and Article 15 answers whether the packaging is legal: conformity assessment, technical documentation, the declaration, retention, identification on the pack. That is answered once per packaging type. The producer under Article 3(1)(15) answers who pays for end of life. Producer registration and fees sit under Article 44; the annual tonnage report by 1 June is a separate reporting duty. That is answered once per Member State. Article 21 converts an importer or distributor into a manufacturer where it places packaging on the market under its own name or trademark, or modifies packaging already on the market in a way that could affect compliance.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 44 and 45",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What are the key PPWR dates?",
    answer:
      "PPWR entered into force on 11 February 2025 and applies from 12 August 2026 (Article 71), when the substance limits, conformity assessment, declaration of conformity and national registration start to bite. The harmonised material-composition label follows around 12 August 2028 (Article 12), the recyclability grades no earlier than 2030, and grade C packaging can no longer be placed on the market from 1 January 2038. Several dates run from delegated or implementing acts the Commission has not yet adopted, so they are not all fixed today.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 71",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "How do you comply with PPWR?",
    answer:
      "For each packaging type, run the conformity assessment, draw up the technical documentation and the EU declaration of conformity, and mark the pack. There is no EU portal: you hold the documents and produce them within 10 days on a national authority's reasoned request (Article 15(10)). Separately, register as a producer in each Member State where you place packaging on the market (Article 44) and file the annual tonnage report. One declaration per packaging type; one registration per Member State.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 15 and 44",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What are the PPWR labelling requirements?",
    answer:
      "Packaging carries a harmonised label showing its material composition to guide sorting (Article 12(1)), on a format set by a Commission implementing act. It applies from around 12 August 2028, or 24 months after that act, whichever is later. Reusable packaging gets its own label and data carrier from around 12 February 2029 (Article 12(2)). Transport packaging is exempt from the Article 12 label; e-commerce packaging is not.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 12",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "Does PPWR restrict PFAS in packaging?",
    answer:
      "Yes, but only for food contact. Article 5(5) bars food-contact packaging from being placed on the market from 12 August 2026 if it contains PFAS above the set thresholds. It is the only food-contact substance restriction, though not the only food-and-beverage-specific rule in the regulation, which also carries others such as the single-use format bans in Annex V. PFAS in other packaging is not caught by this limit.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 5",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What must a PPWR declaration of conformity contain?",
    answer:
      "The EU declaration of conformity follows the model set out in the regulation and must identify the packaging type it covers and state that the applicable requirements are met. It has to be kept continuously updated, and the manufacturer alone signs it. You keep it with the technical documentation, for five years for single-use packaging or ten years for reusable packaging, and produce it electronically within ten days of a national authority's reasoned request.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 15 and 39",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "Does PPWR apply to the UK?",
    answer:
      "PPWR is EU law and does not apply inside the UK. It bites on any packaging placed on the EU market, so a UK business exporting to the EU is caught: the EU importer or an authorised representative carries the manufacturer and producer duties. Great Britain runs its own separate regime, including packaging Extended Producer Responsibility and the Plastic Packaging Tax, so UK sellers into the EU must satisfy both.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Articles 2 and 21",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
  {
    question: "What are the PPWR recycled-content requirements?",
    answer:
      "From 1 January 2030, the regulation sets minimum recycled-content shares for the plastic part of packaging, for example 30% for contact-sensitive PET and single-use plastic beverage bottles, 10% for contact-sensitive non-PET plastics, and 35% for other plastic packaging, with higher targets from 2040. The share is measured as an average per manufacturing plant and year, and some compostable or specialised packaging is exempt. The exact percentages and the calculation method are fixed by Commission implementing acts.",
    source: {
      label: "EUR-Lex: EU Packaging and Packaging Waste Regulation, Article 7",
      href: "https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng",
    },
  },
] as const;

/**
 * The pricing band arrived with the owner's number (workplan 16, D6:
 * €299 a shipment, 2026-08-18). Its copy stays in the future tense, so the
 * page never claims the unbuilt engine runs; REACH checks are included at
 * no separate charge (D3).
 */
export function PpwrPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="ppwr" />
      <main id="main">
        <RegHero
          active="ppwr"
          showHeader={false}
          label="The EU packaging regulation"
          code="EU PPWR · Regulation (EU) 2025/40 · applies 12 August 2026"
          title="PPWR: what a packaging file has to prove."
          poster="/images/ppwr-recycling-hero.webp"
          video="/videos/ppwr-recycling-hero.webm"
          sub={
            <>
              PPWR regulates the wrapper, not the product. Every box, bag, cap,
              label and strip of tape is its own compliance object, and{" "}
              <strong>nothing is submitted</strong>. You sign a declaration per
              packaging type, hold it, and produce it{" "}
              <strong>within 10 days</strong> if an authority asks.
            </>
          }
        />

        <PpwrProblem />
        <PpwrFlow />
        <PpwrAxes />
        <PpwrGranularity />
        <PpwrCalendar />
        <PpwrFiling />
        <PpwrRails />
        <PpwrChecked />
        <RegBlogBand reg="ppwr" />
        <RegulationFaq items={PPWR_FAQ} />
        <RegulationPrice reg="ppwr" heading="What a packaging file will cost." />
        <PpwrClose />
      </main>

      <LandingFooter />
    </div>
  );
}
