/**
 * Spoke: /cbam/software. The commercial page for "CBAM reporting software",
 * written as a reference article rather than a brochure.
 *
 * Truth contract (2026-08-16 remediation). What Bindu ships for CBAM today is
 * a record: `dossier.kind = "cbam"` registered with HasTemplate and no
 * assembler (backend/internal/vertical/vertical.go), the checklist in
 * backend/internal/handler/dossier_template.go under key "cbam", evidence and
 * a hash-chained audit log on that record. There is NO emissions calculator, NO CBAM Registry
 * connector and NO certificate ledger. Those may only be written as roadmap,
 * never in the present tense, and never with a ship date attached. Product
 * claims here must stay in step with Act 3 and Act 8 of cbam-story.tsx.
 *
 * Every € figure is interpolated from pricing/price-data.ts, the same source
 * the homepage pricing card reads; onboarding is demo-led via the close band.
 * The story cites no penalty figure, so this page states none. Re-verify
 * against EUR-Lex before editing figures, and bump `lastReviewed` + the schema
 * `dateModified` in app/(en)/(landing)/cbam/software/page.tsx when you do.
 */

import Link from "next/link";
import { DERIVED, PRICES, eur } from "../pricing/price-data";
import { SpokePage } from "./spoke-page";
import type { FaqItem } from "../seo/regulation-schema";

export function CbamSoftwarePage({ faq }: { faq?: readonly FaqItem[] }) {
  return (
    <SpokePage
      faq={faq}
      active="cbam"
      close={{
        title: "Collect the installation data once. Defend every declaration after.",
        subtitle:
          "Bindu keeps the activity data, the verifier report, the emissions figure and the certificate dates on one record, each with its evidence and its owner, so nothing is reconstructed at the deadline.",
        secondary: {
          label: "CBAM, the regulation itself",
          href: "/cbam",
          note: "The six sectors, the calendar from 2023 to 2034, and how the border prices carbon.",
        },
      }}
      code="Regulation (EU) 2023/956 · CBAM · Annexes I & IV"
      crumbs={[
        { label: "CBAM", href: "/cbam" },
        { label: "Software" },
      ]}
      instrument="Regulation (EU) 2023/956"
      lastReviewed="18 August 2026"
      railNav={{
        title: "CBAM reference",
        links: [
          { label: "CBAM overview", href: "/cbam" },
        ],
      }}
      related={{
        heading: "More on carbon at the border",
        links: [
          {
            label: "CBAM: what to file, and when",
            href: "/cbam",
            note: "The regulation in plain words: six sectors, the calendar, the certificates.",
          },
          {
            label: "EUDR: what to collect, and when",
            href: "/eudr",
            note: "The other border rule Bindu files end to end: plots, forest checks, and the DDS filed to TRACES.",
          },
        ],
      }}
      title="CBAM reporting software: every CBAM obligation on one record"
      standfirst={
        <>
          CBAM lands six separate obligations on a single deadline. Bindu keeps
          them on one record: the declarant authorisation, the activity data
          from each installation, the verifier report, the emissions figure,
          the annual declaration and the certificate surrender, each with its
          evidence, its owner and its date. Built for EU importers of the six
          covered sectors: cement, iron and steel, aluminium, fertilisers,
          electricity, and hydrogen.
        </>
      }
      facts={{
        title: "The mechanism in brief",
        items: [
          "Six sectors: cement, steel, aluminium, fertilisers, electricity, hydrogen",
          "In scope once imports pass 50 tonnes a year (no threshold for electricity or hydrogen)",
          "One certificate per tonne of embedded CO2",
          "Certificates priced at the week's ETS rate",
          "Hold 50% of the running total each quarter",
          `${eur(PRICES.cbamQuarter)} a quarter, ${eur(PRICES.cbamFiling)} a filing`,
        ],
      }}
      lede={
        <>
          Reporting has run since <strong>October 2023</strong>. Since{" "}
          <strong>1 January 2026</strong> the definitive regime applies: only
          an authorised CBAM declarant may import in-scope goods, the
          financial obligation has started, and the first annual declaration
          and certificate surrender fall due on{" "}
          <strong>30 September 2027</strong>, covering 2026 imports. The
          number those filings ask for is scattered across every plant that
          made your goods, which makes CBAM a data problem before it is a
          customs one. Bindu is where that data is held:{" "}
          <strong>one record per filing, with every obligation, its evidence
          and its date on it</strong>.
        </>
      }
      sections={[
        {
          heading: "What CBAM asks of an importer",
          body: (
            <>
              <p>
                The obligation follows the goods. Import cement, iron and
                steel, aluminium, fertilisers, electricity or hydrogen into
                the EU, each sector defined by CN code in Annex I, and the
                carbon embedded in them carries a price at the border, the
                same price a European plant pays. The one exemption is small:
                below <strong>50 tonnes of imports a year</strong> you are out
                of scope, a threshold that, on the Commission&rsquo;s own
                estimate, excuses about 182,000 importers while keeping over
                99% of the embedded emissions in scope. The
                threshold does not apply to{" "}
                <strong>electricity or hydrogen</strong>: those two sectors
                carry the obligation from the first import, whatever the
                tonnage. Whether a specific code is caught is a fixed list, not
                a judgment call: read{" "}
                <Link href="/cbam">how the whole mechanism works</Link>.
              </p>
              <p>
                What you owe comes in three parts. An annual{" "}
                <strong>declaration</strong> of embedded emissions to the CBAM
                Registry, due the following 30 September, filed by an
                authorised declarant. <strong>Certificates</strong>, one per
                tonne of embedded CO2, priced off the EU ETS auction, with at
                least 50% of the running total held each quarter and the rest
                surrendered once a year. And the <strong>audit trail</strong>:
                every figure traceable to the installation that emitted it,
                kept until the end of the fourth year after the declaration.
              </p>
            </>
          ),
        },
        {
          heading: "What the software does today, and what it does not",
          body: (
            <>
              <p>
                Bindu&rsquo;s CBAM software is a{" "}
                <strong>record, not a calculator</strong>. Opening a CBAM
                filing gives you the six obligations as a checklist:
                authorised declarant status, the activity data from each
                installation, the verifier report, the embedded emissions
                figure, the annual declaration and the certificate surrender.
                Each row carries its own evidence, its owner and its date, the
                blocking ones are marked, and the record&rsquo;s audit log is
                append-only and hash-chained, so what was known on any given
                day stays readable for the four years the regulation asks for.
              </p>
              <p>
                What Bindu does not do yet, stated plainly so you can plan
                around it. It does not compute the embedded emissions per
                tonne under <span className="sp-mono">Annex IV</span>: you
                bring that figure, and the record holds it with its working
                and a note of whether it came from actual data or a default.
                It does not connect to the CBAM Registry, so you file the
                declaration yourself; Bindu holds what the declaration needs
                and tracks the 30 September date. And it does not buy, hold or
                surrender certificates: the quarterly hold and the annual
                surrender are tracked as dated obligations, not traded on your
                behalf. The calculator and the Registry connector are on the
                roadmap, without a date attached. The{" "}
                <Link href="/cbam">CBAM page</Link> walks the same seven steps
                in more detail.
              </p>
            </>
          ),
        },
        {
          heading: "Actuals against defaults",
          body: (
            <p>
              A declaration built entirely on the Commission&rsquo;s default
              values is a legal declaration. It is rarely a cheap one: the
              defaults are set conservatively, so the fallback almost always
              costs you more than the real number, and from 2027 the default
              is the exception rather than the rule. Verified actual data from
              the installation takes precedence, and it is the route that
              rewards the right suppliers, because you pay for the real carbon
              and a producer who decarbonised undercuts one who did not.
              Collecting actuals is the unglamorous part: reaching plants,
              chasing activity data, getting it in front of an accredited
              verifier. Bindu does not make those calls for you. It holds the
              record of them, so you can see which installations have answered,
              which are still open, and which lines are still running on a
              default. Where a plant does not answer, the defaults keep the
              declaration legal, at the conservative price.
            </p>
          ),
        },
        {
          heading: "For teams that import, not measure carbon",
          body: (
            <p>
              Bindu&rsquo;s CBAM software is for teams whose job is moving
              goods: import and customs managers, procurement, the
              trade-compliance desk of a group that suddenly owns a carbon
              obligation. It assumes no emissions expertise on your side: the
              record tells you which obligation is next, what evidence it
              wants, and when it is due, in customs vocabulary rather than
              carbon-accounting vocabulary. You still own the filing. The price
              is published, not quoted:{" "}
              <strong>
                {eur(PRICES.cbamQuarter)} a quarter,{" "}
                {eur(PRICES.cbamFiling)} a filing
              </strong>
              . That is {eur(DERIVED.cbamYear)} a year. Onboarding starts with
              a demo on your own shipments.
            </p>
          ),
        },
      ]}
      sources={[
        {
          label: "Regulation (EU) 2023/956 (CBAM), full text on EUR-Lex",
          href: "https://eur-lex.europa.eu/eli/reg/2023/956/oj",
        },
        {
          label: "Regulation (EU) 2025/2083, the Omnibus simplification",
          href: "https://eur-lex.europa.eu/eli/reg/2025/2083/oj",
        },
        {
          label: "European Commission, the Carbon Border Adjustment Mechanism",
          href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
        },
      ]}
    />
  );
}
