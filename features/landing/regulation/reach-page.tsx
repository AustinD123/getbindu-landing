import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import {
  ReachProblem,
  ReachFlow,
  ReachScan,
  ReachGranularity,
  ReachCalendar,
  ReachLoop,
  ReachRails,
  ReachClose,
} from "./reach-story";

/**
 * The REACH questions, authored once.
 *
 * The route file emits these as FAQPage structured data and the page
 * renders the same array visibly, so a reader and a search engine can
 * never be shown different answers.
 */
export const REACH_FAQ = [
          {
            question: "What does REACH cover?",
            answer:
              "REACH covers chemical substances made in or imported into the EU, on their own, in mixtures, and inside articles. It works through four duties: registration, evaluation, authorisation and restriction. For an importer of finished goods, the duties that bite are the Candidate List obligations for substances of very high concern and the Annex XVII restrictions, which apply to imports.",
            source: {
              label: "EUR-Lex: EU REACH Regulation (consolidated)",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "What is an SVHC and the Candidate List?",
            answer:
              "A substance of very high concern (SVHC) is a chemical identified as, for example, carcinogenic, mutagenic, toxic to reproduction, or persistent and bioaccumulative. Substances so identified are added to the Candidate List, which holds more than 250 substances of very high concern; ECHA updates it about twice a year, so check the list for the exact current count.",
            source: {
              label: "ECHA: REACH Candidate List of substances of very high concern",
              href: "https://echa.europa.eu/candidate-list-table",
            },
          },
          {
            question: "How does the REACH 0.1% rule work?",
            answer:
              "If a Candidate List substance is present above 0.1% by weight of a component article, the supplier must pass information down the chain. The threshold is measured against each component, not the assembled product, so a small part with a concentrated substance still puts the finished product in scope. Dilution across an assembly never removes the duty.",
            source: {
              label: "Court of Justice of the EU: Case C-106/14",
              href: "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:62014CJ0106",
            },
          },
          {
            question: "Is there a REACH certificate?",
            answer:
              "No. Neither a REACH certificate nor an accredited REACH certification scheme exists in the regulation. What buyers ask for is a self-declaration: a dated statement pinned to a Candidate List version, naming any substance present above the threshold, with the substance name and EC or CAS number. A generic 'REACH compliant' letter with no list version and no substance names is not proof.",
            source: {
              label: "EUR-Lex: EU REACH Regulation (consolidated)",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "What must an importer do when a customer asks for REACH proof?",
            answer:
              "Identify the substances in each component, screen them against the current Candidate List and the Annex XVII restrictions, and provide a dated declaration. Business customers must be informed under Article 33 of REACH; a consumer who asks must receive an answer free of charge within 45 days.",
            source: {
              label: "EUR-Lex: EU REACH Regulation (consolidated)",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "What changed for REACH in 2026?",
            answer:
              "The Candidate List now holds more than 250 substances of very high concern, and ECHA updates it about twice a year. Two restricted-substance entries that bite on textiles take effect under Annex XVII: formaldehyde emission limits from 6 August 2026, and PFHxA in consumer textiles and footwear from 10 October 2026. The planned REACH revision was shelved in April 2026, with enforcement shifting to the border, where customs declarations already carry REACH Y-codes per CN code.",
            source: {
              label: "ECHA: REACH Candidate List of substances of very high concern",
              href: "https://echa.europa.eu/candidate-list-table",
            },
          },
          {
            question: "What is REACH compliance?",
            answer:
              "For a maker or importer of chemicals it means registering and managing them under REACH. For an importer of finished goods it is narrower: screen the substances in each component against the current Candidate List and the Annex XVII restrictions, pass the required information down the chain, and hold a dated declaration. There is no REACH certificate, so compliance is evidenced by that declaration, not by a stamp.",
            source: {
              label: "EUR-Lex: EU REACH Regulation (consolidated)",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "What is the difference between REACH and RoHS?",
            answer:
              "REACH covers chemical substances across all products, on their own, in mixtures and inside articles. RoHS restricts a short list of hazardous substances, such as lead, cadmium and certain phthalates, specifically in electrical and electronic equipment. They overlap for electronics, where both can apply, but REACH is far broader in scope.",
            source: {
              label: "EUR-Lex: EU RoHS Directive",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011L0065-20240801",
            },
          },
          {
            question: "Does REACH apply to products imported into the EU?",
            answer:
              "Yes. REACH reaches substances inside imported articles, so an importer of finished goods inherits the duties even though it makes no chemicals: it must communicate any Candidate List substance present above 0.1% of a component (Article 33) and meet the Annex XVII restrictions on what may be placed on the EU market. Enforcement increasingly happens at the border, against the customs declaration.",
            source: {
              label: "EUR-Lex: EU REACH Regulation (consolidated)",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "What is UK REACH, and is it the same as EU REACH?",
            answer:
              "No. Since Brexit, Great Britain runs its own UK REACH regime, kept in domestic law and administered by the Health and Safety Executive rather than ECHA, with a separate candidate list and its own registration duties. Northern Ireland continues to follow EU REACH under the Windsor Framework. A supplier selling into both the EU and Great Britain has to meet two regimes whose lists can drift apart over time. Bindu's REACH screening is not live yet; when it ships it will cover EU and EU-Northern-Ireland REACH, not the separate Great Britain regime.",
            source: {
              label: "UK Health and Safety Executive: UK REACH",
              href: "https://www.hse.gov.uk/reach/",
            },
          },
          {
            question: "What does REACH compliant mean on a datasheet?",
            answer:
              "There is no legal definition of REACH compliant and no body certifies it, so on a datasheet the phrase is only a supplier's own claim. It should mean the article has been screened against the current candidate list and the restricted-substances list, that any substance of very high concern above 0.1% of a component is being communicated, and that nothing breaches a restriction. Treat a bare REACH compliant stamp with no candidate-list version and no named substances as marketing, not evidence.",
            source: {
              label: "EUR-Lex: EU REACH Regulation, Article 33 and Annex XVII",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006R1907-20250101",
            },
          },
          {
            question: "Do I need lab testing to prove REACH?",
            answer:
              "REACH does not require you to test every article. The duty is to know whether a candidate-list substance is present above 0.1% of a component, and you can establish that from supplier declarations, safety data sheets, and bills of materials where the composition is reliably known. Analytical testing helps when the composition is unknown, a supplier's information is missing or doubtful, or you want to verify a claim before signing your own declaration. It is a way to get the evidence, not a legal requirement in itself.",
            source: {
              label: "ECHA: Guidance on substances in articles",
              href: "https://echa.europa.eu/guidance-documents/guidance-on-reach",
            },
          },
        ] as const;

export function ReachPage() {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active="reach" />
      <main id="main">
        <RegHero
          active="reach"
          showHeader={false}
          label="Regulation (EC) 1907/2006"
          code="Regulation (EC) 1907/2006 · REACH · SVHC Candidate List, more than 250 substances of very high concern"
          title="REACH: what an importer must prove."
          poster="/images/reach-tide-hero.webp"
          video="/videos/reach-tide-hero.webm"
          sub={
            <>
              A substance on the Candidate List, above{" "}
              <strong>0.1% of any one component</strong>, and the whole product
              carries the duty. There is no REACH certificate. What a buyer
              accepts is a <strong>dated declaration</strong>, and the list
              behind it moves twice a year.
            </>
          }
        />

        <ReachProblem />
        <ReachFlow />
        <ReachScan />
        <ReachGranularity />
        <ReachCalendar />
        <ReachLoop />
        <ReachRails />
        {/* Owner decision (workplan 16, D3): REACH is never sold separately,
            it ships inside the PPWR packaging offer. The price band stays
            (D6: no page skips it) but carries the bundle statement, so the
            page never prices unbuilt work on its own. */}
        <RegBlogBand reg="reach" />
        <RegulationFaq items={REACH_FAQ} />
        <RegulationPrice reg="reach" heading="What REACH screening costs." />
        <ReachClose />
      </main>

      <LandingFooter />
    </div>
  );
}
