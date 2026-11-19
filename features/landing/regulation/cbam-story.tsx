"use client";

/**
 * CBAM story — animated acts for /cbam.
 *
 * The Carbon Border Adjustment Mechanism (Regulation (EU) 2023/956, amended by
 * Reg (EU) 2025/2083) as a 9-act story matching the DPP/EUDR pages: the carbon
 * is burned in a furnace abroad, the bill lands on the importer at the EU
 * border. CBAM is not a product passport, so the spine is re-cast: the scan
 * filters the six sectors, the loop is the level-playing-field mechanic, and
 * the closing act is what a Bindu CBAM record holds, not a dataspace KIT.
 *
 * Truth contract (2026-08-16 remediation): CBAM is registered with
 * HasTemplate and no assembler (backend/internal/vertical/vertical.go), and
 * the template is a checklist (backend/internal/handler/dossier_template.go,
 * key "cbam"). There is no emissions calculator, no CBAM Registry connector
 * and no certificate ledger in this product. Every act here describes the
 * regulation's own sequence and says which steps Bindu tracks rather than
 * performs. Statistics carry a source or they do not appear.
 *
 * SSR-first: every element authored in its final visible state; GSAP animates
 * FROM hidden only inside a matchMedia("(prefers-reduced-motion: no-preference)")
 * context. Scoped .cb-* — distinct from .tx-/.bt-/.ot-/.ed- so the landing
 * family never cross-bleeds on client-side navigation.
 */

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";

import { DemoCtaLink } from "../demo-cta-link";
import { RegCalendar } from "./reg-calendar";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
import { RailsExplorer, type RailsPart } from "./rails-explorer";
import { RegulationFlow } from "./regulation-flow";
import "./cbam-story.css";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Flip
);

/* =============================================================
   ACT 2 — THE PROBLEM (dark film stage)
   The carbon is burned in a furnace abroad; the bill lands on
   the importer of record at the EU border.
   ============================================================= */
const NODES = [
  { x: 95, name: "Installation", tier: "Abroad" },
  { x: 365, name: "Goods", tier: "Shipped" },
  { x: 635, name: "EU border", tier: "Customs" },
  { x: 905, name: "Importer", tier: "Pays the price", duty: true },
];
const NODE_Y = 190;
const FLOW_PATH = `M95 ${NODE_Y} L365 ${NODE_Y} L635 ${NODE_Y} L905 ${NODE_Y}`;
const LOST_DOTS = [
  { x: 150, y: 168 },
  { x: 250, y: 174 },
  { x: 360, y: 166 },
  { x: 470, y: 172 },
  { x: 560, y: 168 },
];
// `from` is the count-up's starting value (motion only; the authored resting
// state is always `to`). The last stat drains 100 → 0 so the phase-out reads
// as a countdown instead of a number that never moves.
const STATS = [
  { to: 6, from: 0, suffix: "", accent: false, label: "carbon-intensive sectors the border now prices" },
  { to: 100, from: 0, suffix: "%", accent: false, label: "of the ETS carbon price importers pay by 2034, once free allowances end" },
  { to: 50, from: 0, suffix: " t", accent: false, label: "a year: import less than this and most goods fall out of scope" },
  { to: 0, from: 100, suffix: "", accent: true, label: "free ETS allowances remaining in 2034. The price follows the goods in" },
];

export function CbamProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        gsap.from(".cb-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-problem-head", start: "top 80%" },
        });

        gsap.from(".cb-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".cb-flow", start: "top 78%" },
        });
        gsap.from("#cb-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".cb-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".cb-lost-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".cb-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        gsap.set(".cb-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".cb-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#cb-flow-path",
              align: "#cb-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".cb-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<SVGCircleElement>(".cb-lost-dot").forEach((d, i) => {
          gsap.fromTo(
            d,
            { y: 0, autoAlpha: 0.55 },
            {
              y: -46,
              autoAlpha: 0,
              duration: 2.2,
              ease: "power1.out",
              repeat: -1,
              repeatDelay: 0.7,
              delay: i * 0.5,
              scrollTrigger: {
                trigger: ".cb-flow",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".cb-stat-num").forEach((el) => {
          const to = Number(el.dataset.to ?? 0);
          const from = Number(el.dataset.from ?? 0);
          const suffix = el.dataset.suffix ?? "";
          const proxy = { v: from };
          el.textContent = `${from}${suffix}`;
          gsap.to(proxy, {
            v: to,
            duration: 1.4,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = `${Math.round(proxy.v)}${suffix}`;
            },
            scrollTrigger: { trigger: ".cb-stats", start: "top 82%" },
          });
        });

        SplitText.create(".cb-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".cb-verdict-quote",
                start: "top 85%",
                end: "top 42%",
                scrub: 0.6,
              },
            }),
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The problem" className="cb-dark cb-problem" ref={ref}>
      <div className="st-container">
        <div className="cb-problem-head">
          <span className="st-eyebrow">CBAM importer liability</span>
          <h2 className="st-h2">
            Importers now pay for the carbon in what they import.
          </h2>
          <p className="cb-problem-lead">
            Making steel abroad releases carbon. A European mill pays for that
            carbon under the EU ETS. An importer used to pay nothing. From{" "}
            <strong>January 2026</strong> the EU charges the same carbon price at
            the border, and the{" "}
            <strong>importer of record</strong> pays it.
          </p>
        </div>

        <div className="cb-flow">
          <svg
            aria-hidden="true"
            className="cb-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="cb-flow-path" d={FLOW_PATH} id="cb-flow-path" />

            <path
              className="cb-lost-bracket"
              d="M95 128 L95 116 L365 116 L365 128"
            />
            {/* Two lines sized to the bracket they label: one 505-unit line
                overflowed the viewBox's left edge at every width. */}
            <text className="cb-lost-label" x="230" y="88">
              Where the carbon is burned.
            </text>
            <text className="cb-lost-label" x="230" y="106">
              Actual data lives here, or nowhere
            </text>

            {LOST_DOTS.map((d) => (
              <circle
                className="cb-lost-dot"
                cx={d.x}
                cy={d.y}
                key={`${d.x}-${d.y}`}
                r={3}
              />
            ))}

            {NODES.map((n) => (
              <g className="cb-node" key={n.name}>
                <text className="cb-node-name" x={n.x} y={152}>
                  {n.name}
                </text>
                <circle
                  className={`cb-node-dot${n.duty ? " is-duty" : ""}`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`cb-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {n.tier}
                </text>
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle className="cb-packet" cx={95} cy={NODE_Y} key={i} r={5} />
            ))}
          </svg>
          <p className="cb-flow-caption">
            The emissions are made in someone else&apos;s plant, an ocean away.
            The only place the real number lives is that installation, and it
            has to travel all the way to the customs declaration.
          </p>
        </div>

        <div className="cb-stats">
          {STATS.map((s) => (
            <div className="cb-stat" key={s.label}>
              <span
                className={`cb-stat-num${s.accent ? " is-accent" : ""}`}
                data-from={s.from}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="cb-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="cb-verdict">
          <p className="cb-verdict-quote">
            Carbon leakage occurs when companies move carbon-intensive production
            abroad to countries with less stringent climate policies, or when EU
            products get replaced by more carbon-intensive imports.
          </p>
          <span className="cb-verdict-cite">European Commission · DG TAXUD</span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 2.6 — THE WORKED EXAMPLE (ivory slab)
   One importer, walked through all four gates end to end: scope,
   de-minimis, regime and obligations. This is the page's spine
   protagonist — a fastener importer whose 200 t of Indian steel
   screws we carry from here to the closing bill. A single case
   run the whole distance so the numbers connect: the de-minimis
   measure, the transitional→definitive flip on the import date,
   and the obligation set that falls out at the end. The closing
   swap strip folds in the old corridor act's lesson (same code,
   three origins, three verdicts) so origin, not the code, is seen
   to decide.

   Copy contract: content, not a product claim. Every step names
   the article it turns on and the answer is stated as the law's,
   not the engine's. The Annex I check (step 1) is the piece live
   on the site today; the decision logic for the other gates is
   not run by this product (backend/internal/catala is EUDR-only
   and CBAM applicability is intentionally not computed — see
   handler/tariff.go), so no such claim is made here.
   ============================================================= */
const EXAMPLE_STEPS = [
  {
    n: "1",
    gate: "Is it in scope?",
    cite: "Article 2",
    answer: "In scope",
    lines: [
      "CN heading 7318 (steel screws and bolts) is in Annex I.",
      "The non-preferential origin is India, a third country, and not one of the Annex III territories whose carbon is already priced.",
      "Released for free circulation, with no military or shelf-energy carve-out.",
    ],
  },
  {
    n: "2",
    gate: "Exempt under de-minimis?",
    cite: "Reg (EU) 2025/2083 (Omnibus)",
    answer: "Not exempt",
    lines: [
      "The threshold is 50 tonnes of net mass, per importer, per calendar year, summed across every consignment, not judged per shipment.",
      "This importer brings 200 t across the year, so it is over the line and stays in scope.",
    ],
  },
  {
    n: "3",
    gate: "Which regime governs?",
    cite: "Articles 32 & 36",
    answer: "Definitive",
    lines: [
      "Before 1 January 2026: the transitional regime, quarterly reports on embedded emissions, and nothing to pay.",
      "From 1 January 2026: the definitive regime. Report and surrender certificates.",
      "These goods arrive March 2026, so the definitive regime applies. Had the same import landed in December 2025, it would be report-only, no certificates. The date alone decides it.",
    ],
  },
  {
    n: "4",
    gate: "So what is owed?",
    cite: "Articles 5, 6 & 22",
    answer: "Register · report · declare · surrender",
    lines: [
      "Be an authorised CBAM declarant: the importer, or the indirect customs representative it imports through (Article 5). The duty can rest on either.",
      "Report the embedded emissions, then file the annual CBAM declaration by 30 September.",
      "Surrender CBAM certificates to cover those emissions, holding at least 50% of the running total each quarter.",
    ],
  },
];

// The closing swap: hold the CN code and the screws fixed, change only the
// origin, and the verdict changes with it. This folds the retired corridor
// act's lesson into one line each — covered, out, and the honest third state.
const EXAMPLE_SWAP: {
  origin: string;
  verdict: "covered" | "out" | "unknown";
  head: string;
  body: string;
}[] = [
  {
    origin: "From India",
    verdict: "covered",
    head: "In scope",
    body: "Every gate clears. The filing clock starts.",
  },
  {
    origin: "From Switzerland",
    verdict: "out",
    head: "Out of scope",
    body: "Annex III already prices its carbon, so the identical code owes nothing.",
  },
  {
    origin: "Origin unstated",
    verdict: "unknown",
    head: "Not yet decidable",
    body: "Gate 1 needs the country. Answer without it and you are guessing.",
  },
];

export function CbamWorkedExample() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 80%" },
        });
        gsap.utils.toArray<HTMLElement>(".cb-ex-step", ref.current!).forEach((step) => {
          gsap.from(step, {
            autoAlpha: 0,
            y: 22,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 84%" },
          });
        });
        gsap.from(".cb-ex-swap-card", {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-ex-swap", start: "top 85%" },
        });
        gsap.from(".cb-ex-foot", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cb-ex-foot", start: "top 90%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label="One import, walked through every CBAM gate"
      className="cb-slab-wrap cb-ex"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="cb-slab cb-ex-slab">
        <div className="st-container">
        <div className="cb-act-head">
          <span className="st-eyebrow">Worked example</span>
          <h2 className="st-h2">One import, all four gates.</h2>
          <p className="cb-act-sub">
            Meet the importer we follow to the end of this page. A fastener
            distributor brings <strong>200 tonnes of steel screws from
            India</strong>, arriving March 2026, clearing its own customs. Walk
            the shipment the whole distance: in scope, exempt or not, which
            regime, and what it therefore owes.
          </p>
        </div>

        <ol className="cb-ex-steps">
          {EXAMPLE_STEPS.map((s) => (
            <li className="cb-ex-step" key={s.n}>
              <div className="cb-ex-side">
                <span aria-hidden="true" className="cb-ex-num">
                  {s.n}
                </span>
                <span className="cb-ex-cite">{s.cite}</span>
              </div>
              <div className="cb-ex-main">
                <div className="cb-ex-headline">
                  <h3 className="cb-ex-gate">{s.gate}</h3>
                  <span className="cb-ex-answer">{s.answer}</span>
                </div>
                <ul className="cb-ex-lines">
                  {s.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="cb-ex-swap">
          <p className="cb-ex-swap-lead">
            Now change one thing. Same screws, same CN code, three origins,{" "}
            <strong>three answers</strong>. Origin decides as much as the code.
          </p>
          <div className="cb-ex-swap-row">
            {EXAMPLE_SWAP.map((s) => (
              <div
                className="cb-ex-swap-card"
                data-verdict={s.verdict}
                key={s.origin}
              >
                <span className="cb-ex-swap-origin">{s.origin}</span>
                <strong className="cb-ex-swap-head">{s.head}</strong>
                <p className="cb-ex-swap-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

          <p className="cb-ex-foot">
            Each answer turns on a single article and is true as of the
            consolidated text: Regulation (EU) 2023/956, as amended by Reg (EU)
            2025/2083. The Annex I check in step 1 is the piece live on the site
            today; the other three are the law&apos;s own logic a filing has to
            walk. Bindu keeps this whole chain on one record; what that looks
            like is further down the page.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE FLOW (ivory slab). The seven steps a CBAM filing
   takes, told as the regulation's own sequence in the second
   person.

   Copy contract: this act describes ONLY what the law makes the
   filer do, step by step. It carries no product claim. What Bindu
   holds, what it does not run today, and what is on the roadmap
   all live in ONE place, the Rails act (ACT 8), so the honest
   shipped-versus-not truth is stated once instead of re-litigated
   per step. Do not reintroduce "Bindu holds / does not / on the
   roadmap" voice here. Bindu has no emissions calculator, no
   Registry connector and no certificate ledger today (vertical.go
   registers CBAM with HasTemplate only, no assembler).
   ============================================================= */
const FLOW_STEPS = [
  {
    n: "01",
    label: "Collect",
    head: "Collect the activity data from each installation.",
    body: "The real number lives at the third-country plant that made the goods: direct emissions, the electricity behind them, any carbon price already paid. You ask each installation for it, and keep the answer against the installation it came from.",
    chips: ["activity data", "direct emissions", "indirect (power)", "carbon price paid"],
  },
  {
    n: "02",
    label: "Classify",
    head: "Map each line to its Annex I CN code.",
    body: "Every line has to tie to an Annex I CN code and to the installation that made it, under one EORI. Whether a code sits inside Annex I is a lookup, not a judgment call.",
    chips: ["Annex I CN code", "installation ID", "EORI", "authorised declarant"],
  },
  {
    n: "03",
    label: "Verify",
    head: "Get an accredited verifier to sign the emissions off.",
    body: "A signed verifier report is what lets an actual installation value stand in place of the Commission's default, which is set high on purpose. You appoint the accredited verifier, and no actual value counts until the report lands.",
    chips: ["accredited verifier", "actual over default", "signed report"],
  },
  {
    n: "04",
    label: "Calculate",
    head: "Calculate the embedded emissions per tonne.",
    body: "Annex IV fixes the method: direct emissions, plus indirect for cement and fertilisers, minus any carbon price already paid at origin (Article 9). Every figure has to show its working, and whether it came from actual data or a conservative default.",
    chips: ["tCO₂e / tonne", "direct + indirect", "origin-price credit"],
  },
  {
    n: "05",
    label: "Declare",
    head: "File the annual declaration to the CBAM Registry.",
    body: "The annual declaration goes to the central CBAM Registry, due the following 30 September. Only an authorised declarant may file it, or a third party holding your EORI.",
    chips: ["CBAM Registry", "annual declaration", "authorised declarant"],
  },
  {
    n: "06",
    label: "Certificates",
    head: "Buy the certificates. Hold 50% as you go.",
    body: "One certificate per tonne of embedded CO2, priced off the EU ETS auction. You hold at least 50% of the running total each quarter and surrender the rest once a year.",
    chips: ["1 cert / tonne", "ETS-linked price", "50% quarterly hold"],
  },
  {
    n: "07",
    label: "Keep",
    head: "Keep every figure traceable for four years.",
    body: "The declaration and surrender for a year fall due the following 30 September, and every figure has to stay traceable to the installation that emitted it until the end of the fourth year after the declaration (Article 7(3)).",
    chips: ["surrender 30 Sep", "audit trail", "per-installation"],
  },
];

export function CbamFlow() {
  return (
    <RegulationFlow
      ariaLabel="How the declaration is assembled"
      eyebrow="CBAM declaration process"
      heading="The seven steps to a CBAM declaration."
      sub={
        <>
          The number you owe is scattered across every plant that made your
          goods. Getting it to the declaration takes{" "}
          <strong>seven steps</strong>, and they produce the six obligations
          Bindu keeps on one record. This is the sequence the regulation runs.
          What Bindu holds at each is further down.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE SCAN (dark, Flip-filtered)
   The six sectors in scope (Annex I). Pick a sector, watch what
   it carries change.
   ============================================================= */
const SCAN_TIERS = [
  { id: "cement", label: "Cement" },
  { id: "steel", label: "Iron & steel" },
  { id: "aluminium", label: "Aluminium" },
  { id: "fertilisers", label: "Fertilisers" },
  { id: "electricity", label: "Electricity" },
  { id: "hydrogen", label: "Hydrogen" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
// One source for the tab label and the tag printed on each field card.
const SCAN_TIER_LABEL = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.label] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  { name: "Direct + indirect emissions", tier: "cement" },
  { name: "Clinker, cement, binders", tier: "cement" },
  { name: "Indirect: the electricity counts", tier: "cement" },
  { name: "Chapter 72, less scrap and most ferro-alloys", tier: "steel" },
  { name: "Direct emissions only", tier: "steel" },
  { name: "Beams, tubes, screws, bolts", tier: "steel" },
  { name: "Plus iron ore 2601 12 and the 73xx rows", tier: "steel" },
  { name: "7601 and 7603 to 7616", tier: "aluminium" },
  { name: "Direct emissions only", tier: "aluminium" },
  { name: "Unwrought, bars, profiles, wire", tier: "aluminium" },
  { name: "Not scrap (7602) or household articles (7615)", tier: "aluminium" },
  { name: "3105, except 3105 60 00", tier: "fertilisers" },
  { name: "Direct + indirect emissions", tier: "fertilisers" },
  { name: "Ammonia, nitric acid, urea", tier: "fertilisers" },
  { name: "Plus 2808, 2814, 2834 21 and 3102", tier: "fertilisers" },
  { name: "Embedded emissions are direct", tier: "electricity" },
  { name: "Priced by interconnector", tier: "electricity" },
  { name: "Default or country factor", tier: "electricity" },
  { name: "No 50-tonne threshold: in scope from the first import", tier: "electricity" },
  { name: "Direct emissions only", tier: "hydrogen" },
  { name: "CN 2804 10, the whole subheading", tier: "hydrogen" },
  { name: "Carbon-intensive to produce", tier: "hydrogen" },
  { name: "No 50-tonne threshold: in scope from the first import", tier: "hydrogen" },
];

export function CbamScan() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the cement tab.
      gsap.utils.toArray<HTMLElement>(".cb-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "cement") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 78%" },
        });
        gsap.from(".cb-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cb-scan-tabs", start: "top 84%" },
        });
        gsap.from(".cb-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".cb-scan-grid", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  const selectTier = contextSafe((tier: ScanTier) => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>(".cb-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".cb-scan-tab").forEach((t) => {
      t.classList.toggle("is-on", t.dataset.tier === tier);
    });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    Flip.from(state, {
      duration: still ? 0 : 0.6,
      scale: true,
      ease: "power2.inOut",
      stagger: still ? 0 : 0.04,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: still ? 0 : 0.5 }
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.7, duration: still ? 0 : 0.4 }),
    });
  });

  // Lock the grid to the tallest sector so switching never changes the height.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".cb-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".cb-scan-field")
      );
      const prev = cards.map((c) => c.style.display);
      let max = 0;
      for (const t of SCAN_TIERS) {
        cards.forEach((c) => {
          c.style.display = c.dataset.tier === t.id ? "flex" : "none";
        });
        grid.style.minHeight = "";
        max = Math.max(max, grid.offsetHeight);
      }
      grid.style.minHeight = `${max}px`;
      cards.forEach((c, i) => {
        c.style.display = prev[i] ?? "";
      });
    };
    measure();
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    let timer: number | undefined;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section aria-label="What the border prices" className="cb-dark cb-scan" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="cb-act-head">
          <span className="st-eyebrow">Sectors in scope</span>
          <h2 className="st-h2">The sectors CBAM covers.</h2>
          <p className="cb-act-sub">
            CBAM covers six carbon-intensive sectors, each defined by CN code in
            Annex I. What the border prices changes sector by sector. Pick one.
          </p>
        </div>

        <div className="cb-scan-tabs" role="radiogroup" aria-label="CBAM sector">
          {SCAN_TIERS.map((t, i) => (
            <label
              className={`cb-scan-tab${i === 0 ? " is-on" : ""}`}
              data-tier={t.id}
              key={t.id}
            >
              <input
                defaultChecked={i === 0}
                name="cb-scan-tier"
                onChange={() => selectTier(t.id)}
                type="radio"
                value={t.id}
              />
              {t.label}
            </label>
          ))}
        </div>

        <div className="cb-scan-grid">
          {SCAN_FIELDS.map((f) => (
            <div className="cb-scan-field" data-tier={f.tier} key={`${f.tier}-${f.name}`}>
              <span className="cb-scan-field-tier">
                {SCAN_TIER_LABEL.get(f.tier)}
              </span>
              <span className="cb-scan-field-name">{f.name}</span>
            </div>
          ))}
        </div>

        <p className="cb-scan-caption">
          Cement and fertilisers carry indirect emissions, the electricity
          behind them; steel, aluminium and hydrogen count direct only.
          Electricity and hydrogen carry the obligation from the first import,
          with no mass threshold to fall under.
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (ivory slab)
   Actual installation data vs default values vs origin credit.
   ============================================================= */
const GRAINS = [
  {
    name: "Actual data",
    tag: "The accurate floor",
    accent: true,
    min: true,
    desc: "Installation-specific emissions, verified by an accredited third party. You pay for the real carbon, which rewards a supplier who actually decarbonised.",
  },
  {
    name: "Default values",
    tag: "The fallback",
    accent: false,
    min: false,
    desc: "The Commission's published defaults, used where actual data is missing. Set conservatively, so the fallback almost always costs you more.",
  },
  {
    name: "Origin credit",
    tag: "The deduction",
    accent: false,
    min: false,
    desc: "Any carbon price already paid where the goods were made is deducted from what you owe (Article 9), so the same tonne is never charged twice.",
  },
];

export function CbamGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 78%" },
        });
        gsap.from(".cb-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-gran-grid", start: "top 80%" },
        });
        gsap.from(".cb-gran-note", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cb-gran-note", start: "top 88%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Where the emissions number comes from" className="cb-slab-wrap cb-gran" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="cb-slab">
        <div className="st-container">
          <div className="cb-act-head">
            <span className="st-eyebrow">Embedded emissions</span>
            <h2 className="st-h2">
              How your emissions figure is calculated.
            </h2>
            <p className="cb-act-sub">
              Your bill is only as honest as your emissions data. Where the
              number comes from is the whole cost question.
            </p>
          </div>

          <div className="cb-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`cb-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`cb-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="cb-gran-name">{g.name}</h3>
                <p className="cb-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <p className="cb-gran-note">
            From 2027 the default is the exception. Actual, verified
            installation data keeps the bill honest, and the calculation
            method is fixed in Annex IV.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5.5 — WHAT IT COSTS (dark)
   The same import, priced across the phase-in. The bill is
   emissions × the year's CBAM factor × the certificate price,
   less any carbon already paid at origin. Only the factor moves
   on its own — from 2.5% in 2026 to 100% in 2034.

   Truth contract: the CBAM factor schedule is statutory (it
   mirrors the ETS free-allocation phase-out, Reg (EU) 2023/956
   / the ETS Directive); the certificate price tracks the weekly
   ETS auction and the tonnage here is an illustration — both are
   flagged in the caption. Bindu does not price a bill. This act
   teaches the regulation's arithmetic; it is not a calculator in
   the product (there is no emissions calculator — see the file
   header's truth contract).
   ============================================================= */
const COST_YEARS = [
  { year: 2026, factor: 2.5 },
  { year: 2027, factor: 5 },
  { year: 2028, factor: 10 },
  { year: 2029, factor: 22.5 },
  { year: 2030, factor: 48.5 },
  { year: 2031, factor: 61 },
  { year: 2032, factor: 73.5 },
  { year: 2033, factor: 86 },
  { year: 2034, factor: 100 },
] as const;
// Illustrative only, both flagged in the caption: a mid-size steel import and a
// round ETS-linked certificate price. The multiplication is the point here, not
// the two inputs.
const COST_EMISSIONS = 300; // tCO2e embedded
const COST_PRICE = 80; // € per certificate
const costFor = (factor: number) =>
  Math.round((COST_EMISSIONS * factor * COST_PRICE) / 100);

export function CbamCost() {
  const ref = useRef<HTMLElement | null>(null);

  const applyYear = (year: number, animate: boolean) => {
    const root = ref.current;
    if (!root) return;
    const row = COST_YEARS.find((y) => y.year === year) ?? COST_YEARS[0]!;
    const cost = costFor(row.factor);

    root.querySelectorAll<HTMLElement>(".cb-cost-bar").forEach((b) => {
      b.classList.toggle("is-on", Number(b.dataset.year) === year);
    });

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const factorEl = root.querySelector<HTMLElement>(".cb-cost-factor-num");
    const billEl = root.querySelector<HTMLElement>(".cb-cost-bill-num");

    // Count from the value on screen, not from zero, so re-selecting a year
    // reads as a move between two bills rather than a reset.
    const tween = (
      el: HTMLElement | null,
      to: number,
      fmt: (v: number) => string
    ) => {
      if (!el) return;
      const from = Number((el.textContent ?? "").replace(/[^\d.]/g, "")) || 0;
      if (!animate || still) {
        el.textContent = fmt(to);
        return;
      }
      const proxy = { v: from };
      gsap.to(proxy, {
        v: to,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = fmt(proxy.v);
        },
      });
    };
    tween(factorEl, row.factor, (v) => `${Math.round(v * 10) / 10}%`);
    tween(billEl, cost, (v) => `€${Math.round(v).toLocaleString("en-US")}`);
  };

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      applyYear(2026, false);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 80%" },
        });
        gsap.from(".cb-cost-term", {
          autoAlpha: 0,
          y: 16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".cb-cost-formula", start: "top 85%" },
        });
        gsap.from(".cb-cost-bar-fill", {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".cb-cost-ramp", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  const selectYear = contextSafe((year: number) => applyYear(year, true));

  return (
    <section
      aria-label="What a CBAM bill costs across the phase-in"
      className="cb-dark cb-cost"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="dark"
      />
      <div className="st-container">
        <div className="cb-act-head">
          <span className="st-eyebrow">What a tonne costs</span>
          <h2 className="st-h2">The same import costs more each year.</h2>
          <p className="cb-act-sub">
            Take our importer&apos;s 200 tonnes of screws again. The bill is
            three things multiplied and one deducted: the carbon in the goods,
            times the <strong>share you pay this year</strong>, times the
            certificate price, minus a credit for carbon already paid at
            origin. Only the share moves on its own, and it climbs from 2.5% to
            100%. Pick a year.
          </p>
        </div>

        <div className="cb-cost-formula">
          <span className="cb-cost-term">carbon in goods</span>
          <span aria-hidden="true" className="cb-cost-op">
            ×
          </span>
          <span className="cb-cost-term is-live">this year&apos;s share</span>
          <span aria-hidden="true" className="cb-cost-op">
            ×
          </span>
          <span className="cb-cost-term">certificate price</span>
          <span aria-hidden="true" className="cb-cost-op">
            −
          </span>
          <span className="cb-cost-term">origin credit</span>
        </div>

        <div className="cb-cost-readout">
          <div className="cb-cost-metric">
            <span className="cb-cost-metric-label">CBAM factor</span>
            <span className="cb-cost-factor-num cb-cost-metric-num">2.5%</span>
          </div>
          <div className="cb-cost-metric is-bill">
            <span className="cb-cost-metric-label">Illustrative bill</span>
            <span className="cb-cost-bill-num cb-cost-metric-num">€600</span>
          </div>
        </div>

        <div aria-label="Import year" className="cb-cost-ramp" role="radiogroup">
          {COST_YEARS.map((y, i) => (
            <label
              className={`cb-cost-bar${i === 0 ? " is-on" : ""}`}
              data-year={y.year}
              key={y.year}
              style={{ "--bar": `${y.factor}%` } as React.CSSProperties}
            >
              <input
                /* The visible label is the clipped "'26" form; give assistive
                   tech the full year. */
                aria-label={String(y.year)}
                defaultChecked={i === 0}
                name="cb-cost-year"
                onChange={() => selectYear(y.year)}
                type="radio"
                value={y.year}
              />
              <span aria-hidden="true" className="cb-cost-bar-fill" />
              <span className="cb-cost-bar-year">{`'${String(y.year).slice(2)}`}</span>
            </label>
          ))}
        </div>

        <p className="cb-cost-caption">
          Illustrative: those 200 tonnes carry about 300 tCO₂e, priced at €80 a
          certificate. The CBAM factor
          is set by law: 2.5% in 2026 rising to 100% in 2034 as the EU ETS free
          allowances phase out; the certificate price tracks the weekly ETS
          auction. Bindu tracks the obligation and its dates. It does not price
          your bill.
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark). Definitive start + first bill in accent.
   ============================================================= */
const CAL_ROWS = [
  {
    when: "1 Oct 2023",
    hard: false,
    body: "Quarterly emissions reports begin, with no payments yet.",
  },
  {
    when: "20 Oct 2025",
    hard: false,
    body: "A 50-tonne threshold exempts small importers; on the Commission's own estimate, over 99% of emissions stay in scope.",
  },
  {
    when: "1 Jan 2026",
    hard: true,
    flag: "Definitive regime",
    body: "Only authorised CBAM declarants may import; the charge and allowance phase-out begin.",
  },
  {
    when: "1 Feb 2027",
    hard: false,
    body: "The first CBAM certificates go on sale on the central platform.",
  },
  {
    when: "30 Sep 2027",
    hard: true,
    flag: "First bill",
    body: "The annual declaration and certificate surrender fall due for 2026 imports.",
  },
  {
    when: "2034",
    hard: false,
    body: "Free allocation ends; importers pay for 100% of embedded emissions.",
  },
];

export function CbamCalendar() {
  return (
    <RegCalendar
      stageClassName="cb-dark cb-cal"
      ariaLabel="The dates that apply"
      trackLabel="CBAM deadline timeline"
      eyebrow="CBAM deadlines"
      heading="The CBAM dates that apply to you."
      sub="Reporting has run since 2023. The money starts in 2026, the first real bill lands in 2027, and the free allowances run out in 2034. Two of these dates are where it gets real."
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — THE LOOP (ivory slab)
   The level playing field: CBAM phases in as free ETS allowances
   phase out, so the same tonne carries the same carbon price.
   ============================================================= */
const LOOP_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "ETS price", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Allowances out", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "CBAM in", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Level field", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const LOOP_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";

export function CbamLoop() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-loop-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-loop-body", start: "top 76%" },
        });
        gsap.from("#cb-loop-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".cb-loop-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".cb-loop-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".cb-loop-ring", start: "top 70%" },
        });
        gsap.set(".cb-loop-orbit", { opacity: 1 });
        gsap.to(".cb-loop-orbit", {
          motionPath: {
            path: "#cb-loop-circle",
            align: "#cb-loop-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".cb-loop-ring",
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Why the EU prices carbon at the border" className="cb-slab-wrap cb-loop" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="cb-slab">
        <div className="st-container">
          <div className="cb-loop-body">
            <div className="cb-loop-copy">
              <span className="st-eyebrow">Carbon border pricing</span>
              <h2 className="st-h2">Why the EU charges for carbon at the border.</h2>
              <p className="cb-loop-lead">
                A European plant already pays for its carbon under the EU ETS.
                Without a border price, the cheapest way around it was to make
                the steel somewhere with no carbon price and ship it in.
              </p>
              <p className="cb-loop-body-text">
                That is carbon leakage: the emissions do not fall, they move.
                CBAM closes the gap by charging imports the same carbon price,
                and it phases in exactly as the free ETS allowances phase out.
                The flip side is a reward: a clean producer abroad now undercuts
                a dirty one on the same shelf.
              </p>
              <ul className="cb-loop-fail">
                <li>production moves abroad</li>
                <li>dirtier imports undercut</li>
                <li>EU carbon price dodged</li>
                <li>emissions just relocate</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="cb-loop-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="cb-loop-circle"
                d={LOOP_CIRCLE}
                id="cb-loop-circle"
              />
              {LOOP_NODES.map((n) => (
                <g className="cb-loop-node" key={n.label}>
                  <circle className="cb-loop-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="cb-loop-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="cb-loop-center" x={200} y={166}>
                the gap
              </text>
              <text className="cb-loop-center" x={200} y={182}>
                closes
              </text>
              <circle className="cb-loop-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — WHAT BINDU HOLDS (dark). The CBAM record explorer.

   Copy contract: one part per obligation the CBAM template
   actually materialises (dossier_template.go, "cbam"), plus the
   Annex I scope lookup, which is the one piece shipped today.
   Every part states in its own words whether Bindu performs the
   step or tracks it. There is no emissions calculator, no CBAM
   Registry connector and no certificate ledger in this product;
   "on the roadmap" is the only tense those may be written in,
   and no ship date may be attached to them.
   ============================================================= */
const RAILS_PARTS: RailsPart[] = [
  {
    id: "scope",
    name: "Annex I scope check",
    tag: "Live today",
    role: "In scope or not",
    body: "Whether a CN code falls inside Annex I is a lookup, not a judgment call, and the scope map is on the site now: chapter 72 less scrap and most ferro-alloys, 7601 and 7603 to 7616, 3105 except 3105 60 00, and the rest of the annex row by row.",
    points: ["Annex I scope map", "Per CN code", "Live today"],
  },
  {
    id: "declarant",
    name: "Authorised declarant status",
    tag: "Before you import",
    role: "The gate",
    body: "Since 1 January 2026 only an authorised CBAM declarant may bring in-scope goods into the EU. Who carries that duty is not always one party: the importer is the declarant, but where it imports through an indirect customs representative, that representative can hold the authorisation and the obligations too (Article 5). The record opens on that authorisation as a blocking item, and Bindu holds the status and the evidence against whoever carries it. You apply.",
    points: ["Importer or indirect rep", "Blocking item", "Applied for by you"],
  },
  {
    id: "activity",
    name: "Installation activity data",
    tag: "The source data",
    role: "Where the number starts",
    body: "The real emissions live at the third-country plant: direct emissions, the electricity behind them, any carbon price already paid. Each answer attaches to the record as supplier evidence, against the installation it came from. Bindu does not contact the plant for you.",
    points: ["Supplier evidence", "Per installation", "Requested by you"],
  },
  {
    id: "emissions",
    name: "Embedded emissions figure",
    tag: "Annex IV",
    role: "The number",
    body: "Annex IV fixes the method: direct, plus indirect for cement and fertilisers, minus the Article 9 deduction for carbon already paid at origin. Bindu does not compute this figure today, and calculating it is on the roadmap. The record carries the figure, its working, and whether it came from actual data or a default.",
    points: ["Actual or default", "Working attached", "Calculation on the roadmap"],
  },
  {
    id: "verifier",
    name: "Verifier report",
    tag: "Accredited sign-off",
    role: "Actual over default",
    body: "An accredited verifier signs off the installation's emissions, and that signed report is what lets an actual value stand in place of the Commission's conservative default. You appoint the verifier. The report is a blocking item on the record until it lands.",
    points: ["Blocking item", "Accredited verifier", "Appointed by you"],
  },
  {
    id: "declaration",
    name: "Annual declaration",
    tag: "The customs handoff",
    role: "The filing",
    body: "The annual CBAM declaration goes to the central CBAM Registry, due the following 30 September, filed by an authorised declarant or a third party holding your EORI. Bindu has no Registry connector today; a connector is on the roadmap. It holds what the declaration needs and tracks the date, and you submit.",
    points: ["Due 30 September", "Deadline tracked", "Submitted by you"],
  },
  {
    id: "certificates",
    name: "Certificate surrender",
    tag: "The money",
    role: "Buy, hold, surrender",
    body: "One certificate per tonne of embedded CO2, priced off the EU ETS auction, with at least 50% of the running total held each quarter and the rest surrendered once a year. Bindu tracks the hold and the surrender as dated obligations. It does not buy, hold or surrender certificates for you.",
    points: ["1 cert / tonne", "50% quarterly hold", "Tracked, not traded"],
  },
];

export function CbamRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 80%" },
        });
        gsap.from(".cb-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".cb-rails-tablist", start: "top 84%" },
        });
        gsap.from(".cb-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cb-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="What Bindu holds for a CBAM filing" className="cb-dark cb-rails" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="cb-act-head">
          <span className="st-eyebrow">CBAM filing software</span>
          <h2 className="st-h2">What Bindu holds for a CBAM filing.</h2>
          <p className="cb-act-sub">
            CBAM turns six obligations into one deadline. Bindu keeps them on a{" "}
            <strong>single record</strong>, each with its evidence, its owner
            and its date, so 30 September is assembled rather than
            reconstructed. Pick a piece to see what is shipped and what is not.
          </p>
        </div>

        <RailsExplorer
          label="What a Bindu CBAM record holds"
          parts={RAILS_PARTS}
          prefix="cb"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — CLOSE (dark). Badges + magnetic CTA panels.
   ============================================================= */
const CLOSE_BADGES = [
  { head: "Report since 2023", body: "the transitional clock is already running" },
  { head: "Actual data", body: "verified emissions from the installation itself" },
  { head: "50% held", body: "the certificate balance the rule makes you hold each quarter" },
  { head: "Origin credit", body: "carbon paid abroad, deducted (Article 9)" },
  { head: "Audit trail", body: "append-only and hash-chained on the record" },
];

export function CbamClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cb-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cb-act-head", start: "top 80%" },
        });
        gsap.from(".cb-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".cb-close-badges", start: "top 85%" },
        });
        gsap.from(".cb-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".cb-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".cb-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".cb-close-arrow");
          if (!arrow) return;
          const xTo = gsap.quickTo(arrow, "x", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(arrow, "y", { duration: 0.4, ease: "power3" });
          const move = contextSafe!((e: Event) => {
            const ev = e as MouseEvent;
            const r = panel.getBoundingClientRect();
            xTo(((ev.clientX - r.left) / r.width - 0.5) * 20);
            yTo(((ev.clientY - r.top) / r.height - 0.5) * 20);
          });
          const leave = contextSafe!(() => {
            xTo(0);
            yTo(0);
          });
          panel.addEventListener("mousemove", move);
          panel.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            panel.removeEventListener("mousemove", move);
            panel.removeEventListener("mouseleave", leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Start now" className="cb-dark cb-close" ref={ref}>
      <div className="st-container">
        <div className="cb-act-head">
          <span className="st-eyebrow">Reporting and payment timeline</span>
          <h2 className="st-h2">Reporting since 2023, payment from 2026.</h2>
          <p className="cb-act-sub">
            Our importer&apos;s 200 tonnes become six obligations landing on one
            deadline. Bindu keeps them on a single record, with the evidence, the
            dates and the audit log attached, so the first real bill on 30
            September 2027 is a number you can defend.
          </p>
        </div>

        <div className="cb-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="cb-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="cb-close-grid">
          {/* Single-purpose close: after nine acts building to one action,
              the last screen offers no exit. The EUDR cross-link lives in
              the blog band region instead. */}
          <DemoCtaLink
            className="cb-close-panel is-primary"
            source="cbam-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>Bring one shipment. Leave knowing which obligations attach to it.</p>
            <span aria-hidden="true" className="cb-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
        </div>
      </div>
    </section>
  );
}
