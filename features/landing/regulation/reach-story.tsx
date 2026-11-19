"use client";

/**
 * REACH story — animated acts for /reach.
 *
 * EU REACH (Regulation (EC) No 1907/2006) as a 9-act story matching the
 * DPP/EUDR/CBAM pages: a substance hides in one small part, the 0.1%-per-
 * component rule pulls the whole product into scope, the Candidate List moves
 * twice a year and re-opens every past answer, and the proof a buyer accepts is
 * a dated declaration, not a certificate (there is no REACH certificate).
 *
 * Every regulatory number/date here is drawn from the verified fact base in the
 * sibling repo ../bindu-reach/docs/ (01-REGULATION.md, 02-DATA-SOURCES.md);
 * each such doc carries the source URL per claim. Do not edit a figure without
 * re-checking it there.
 *
 * SSR-first: every element authored in its final visible state; GSAP animates
 * FROM hidden only inside a matchMedia("(prefers-reduced-motion: no-preference)")
 * context. Scoped .rh-* — distinct from .cb-/.tx-/.bt-/.ot-/.ed- so the landing
 * family never cross-bleeds on client-side navigation. Accent is cobalt
 * (var(--brand)), the one marketing accent.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
import { RegCalendar } from "./reg-calendar";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";

import { RailsExplorer, type RailsPart } from "./rails-explorer";
import { RegulationFlow } from "./regulation-flow";
import "./reach-story.css";

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
   A substance hides in one small part; the 0.1% is measured
   against that part; the duty lands on the importer.
   ============================================================= */
const NODES = [
  { x: 95, name: "Substance", tier: "In a part" },
  { x: 365, name: "Component", tier: "The 0.1% base" },
  { x: 635, name: "Product", tier: "Assembled" },
  { x: 905, name: "Importer", tier: "Carries the duty", duty: true },
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
// The former 32% "REF-12, 2024" stat is out until the figure can be traced
// to ECHA's published REF-12 report: statistics carry a followable source or
// they do not appear.
const STATS = [
  { to: 250, suffix: "+", accent: false, label: "substances on the Candidate List, and it grows twice a year" },
  { to: 45, suffix: "", accent: false, label: "days you have to answer a consumer who asks, and the answer is free" },
  { to: 0, suffix: "", accent: true, label: "official REACH certificates exist. The proof is a dated declaration" },
];

export function ReachProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-problem-head", start: "top 80%" },
        });

        gsap.from(".rh-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".rh-flow", start: "top 78%" },
        });
        gsap.from("#rh-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".rh-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".rh-lost-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".rh-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        gsap.set(".rh-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".rh-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#rh-flow-path",
              align: "#rh-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".rh-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<SVGCircleElement>(".rh-lost-dot").forEach((d, i) => {
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
                trigger: ".rh-flow",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".rh-stat-num").forEach((el) => {
          const to = Number(el.dataset.to ?? 0);
          const suffix = el.dataset.suffix ?? "";
          const proxy = { v: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(proxy, {
            v: to,
            duration: 1.4,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = `${Math.round(proxy.v)}${suffix}`;
            },
            scrollTrigger: { trigger: ".rh-stats", start: "top 82%" },
          });
        });

        SplitText.create(".rh-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".rh-verdict-quote",
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
    <section aria-label="The problem" className="rh-problem" ref={ref}>
      <div className="st-container">
        <div className="rh-problem-head">
          <span className="st-eyebrow">SVHC and the Candidate List</span>
          <h2 className="st-h2">One substance in one small part puts the whole product in scope.</h2>
          <p className="rh-problem-lead">
            A five-gram zipper pull can put a six-hundred-gram jacket in scope.
            If a substance of very high concern (SVHC) on the Candidate List
            sits above{" "}
            <strong>0.1% of the weight of any one component</strong>, the whole
            product carries the duty. The threshold is measured against the{" "}
            <strong>part</strong>, not the finished product, so building the
            part into something bigger never dilutes it away.
          </p>
        </div>

        <div className="rh-flow">
          <svg
            aria-hidden="true"
            className="rh-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="rh-flow-path" d={FLOW_PATH} id="rh-flow-path" />

            <path
              className="rh-lost-bracket"
              d="M95 128 L95 116 L365 116 L365 128"
            />
            <text className="rh-lost-label" x="230" y="104">
              The 0.1% is measured here, against the component. Dilution never helps
            </text>

            {LOST_DOTS.map((d) => (
              <circle
                className="rh-lost-dot"
                cx={d.x}
                cy={d.y}
                key={`${d.x}-${d.y}`}
                r={3}
              />
            ))}

            {NODES.map((n) => (
              <g className="rh-node" key={n.name}>
                <text className="rh-node-name" x={n.x} y={152}>
                  {n.name}
                </text>
                <circle
                  className={`rh-node-dot${n.duty ? " is-duty" : ""}`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`rh-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {n.tier}
                </text>
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle className="rh-packet" cx={95} cy={NODE_Y} key={i} r={5} />
            ))}
          </svg>
          <p className="rh-flow-caption">
            A substance hides in the smallest part. The 0.1% threshold is
            measured against that part, and the duty still lands on whoever
            brings the finished product across the border.
          </p>
        </div>

        <div className="rh-stats">
          {STATS.map((s) => (
            <div className="rh-stat" key={s.label}>
              <span
                className={`rh-stat-num${s.accent ? " is-accent" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="rh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="rh-verdict">
          <p className="rh-verdict-quote">
            Once an item is an article, it stays an article. The 0.1% threshold
            applies to every component article, even after it is built into a
            larger product.
          </p>
          <span className="rh-verdict-cite">
            The holding of C-106/14, Court of Justice of the EU, in plain words
          </span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE FLOW (ivory slab). The seven moves a REACH answer
   takes. Shelley has no /api/reach proxy, no REACH engine room
   (core/workspace/networks.ts lists eudr|dpp|textile|cbam only),
   and no Candidate List or Annex XVII data. These steps describe
   the WORK, not a running product. Keep them in method voice and
   keep the disclosure in the act sub.
   ============================================================= */
const FLOW_STEPS = [
  {
    n: "01",
    label: "Decompose",
    head: "Break the product into its parts.",
    body: "The product has to come apart to the lowest article level, because the 0.1% threshold is measured against each component, not the whole product.",
    chips: ["component articles", "lowest level", "0.1% denominator"],
  },
  {
    n: "02",
    label: "Identify",
    head: "Name the substances in every material.",
    body: "Each material resolves to substances by EC number and CAS number, so a part is matched to what it is actually made of, not to a guess.",
    chips: ["EC number", "CAS number", "material to substance"],
  },
  {
    n: "03",
    label: "Screen",
    head: "Check every part against today's list.",
    body: "Every part is screened against the Candidate List version of the day and the Annex XVII restriction limits that apply to it.",
    chips: ["Candidate List", "Annex XVII", "dated version"],
  },
  {
    n: "04",
    label: "Ask",
    head: "Ask the supplier up the chain.",
    body: "Where the data is missing, the supplier who made the part has to be asked for a dated declaration, approved at source before it is sent on.",
    chips: ["supplier request", "up the chain", "approved at source"],
  },
  {
    n: "05",
    label: "Measure",
    head: "Weigh the substance against the part.",
    body: "Where a listed substance is present, it is weighed against 0.1% of that component, so a small part with a concentrated substance is caught, not lost in the total.",
    chips: ["0.1% w/w", "per component", "concentration"],
  },
  {
    n: "06",
    label: "Declare",
    head: "Build the dated declaration.",
    body: "The declaration is pinned to the Candidate List version, names each substance, and carries the Annex XVII statement and Y-code the customs entry needs.",
    chips: ["dated declaration", "list version pinned", "Y-code ready"],
  },
  {
    n: "07",
    label: "Re-open",
    head: "Re-screen when the list moves.",
    body: "The Candidate List changes about twice a year. When it does, every past screening has to run again, or an answer that was clean last year quietly goes stale.",
    chips: ["twice a year", "re-screen", "no stale answer"],
  },
];

export function ReachFlow() {
  return (
    <RegulationFlow
      ariaLabel="How the declaration is assembled"
      eyebrow="REACH declaration process"
      heading="The seven steps to a REACH declaration."
      sub={
        <>
          The answer is scattered across every part in the product and every
          supplier behind it. Getting to one dated declaration takes{" "}
          <strong>seven moves</strong>. This is the work REACH asks for. REACH
          screening is not live in Bindu yet; today, Bindu files EUDR end to
          end and carries substance answers on the textile product passport.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE SCAN (dark, Flip-filtered)
   The textile rule set (customs chapters 61-64). Pick a
   restriction, watch what it carries change.
   ============================================================= */
const SCAN_TIERS = [
  { id: "candidate", label: "Candidate List" },
  { id: "formaldehyde", label: "Formaldehyde" },
  { id: "pfhxa", label: "PFHxA" },
  { id: "azo", label: "Azo dyes" },
  { id: "chromium", label: "Chromium VI" },
  { id: "phthalates", label: "Phthalates" },
  { id: "nickel", label: "Nickel" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
// One source for the tab label and the tag printed on each field card.
const SCAN_TIER_LABEL = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.label] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  { name: "250+ substances, above 0.1% per part", tier: "candidate" },
  { name: "Inform business buyers (Art. 33)", tier: "candidate" },
  { name: "Answer consumers free within 45 days", tier: "candidate" },
  { name: "Updated about twice a year", tier: "candidate" },
  { name: "Annex XVII, entry 77", tier: "formaldehyde" },
  { name: "0.062 mg/m³ for furniture and wood", tier: "formaldehyde" },
  { name: "0.080 mg/m³ for other articles", tier: "formaldehyde" },
  { name: "Applies from 6 August 2026", tier: "formaldehyde" },
  { name: "Annex XVII, entry 79", tier: "pfhxa" },
  { name: "Consumer textiles and footwear", tier: "pfhxa" },
  { name: "25 ppb, 1,000 ppb for the sums", tier: "pfhxa" },
  { name: "Applies from 10 October 2026", tier: "pfhxa" },
  { name: "Annex XVII, entry 43", tier: "azo" },
  { name: "22 restricted aromatic amines", tier: "azo" },
  { name: "30 mg/kg per amine, skin contact", tier: "azo" },
  { name: "Tested by EN 14362", tier: "azo" },
  { name: "Annex XVII, entry 47", tier: "chromium" },
  { name: "Chromium VI in leather", tier: "chromium" },
  { name: "3 mg/kg limit", tier: "chromium" },
  { name: "Tested by ISO 17075", tier: "chromium" },
  { name: "Annex XVII, entry 51", tier: "phthalates" },
  { name: "DEHP, DBP, BBP and DIBP", tier: "phthalates" },
  { name: "0.1% by weight, as a sum", tier: "phthalates" },
  { name: "Plasticised materials", tier: "phthalates" },
  { name: "Annex XVII, entry 27", tier: "nickel" },
  { name: "Prolonged skin contact", tier: "nickel" },
  { name: "0.5 µg/cm² a week release", tier: "nickel" },
  { name: "Tested by EN 1811", tier: "nickel" },
];

export function ReachScan() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the first tab.
      gsap.utils.toArray<HTMLElement>(".rh-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "candidate") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-act-head", start: "top 78%" },
        });
        gsap.from(".rh-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rh-scan-tabs", start: "top 84%" },
        });
        gsap.from(".rh-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".rh-scan-grid", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  const selectTier = contextSafe((tier: ScanTier) => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>(".rh-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".rh-scan-tab").forEach((t) => {
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

  // Lock the grid to the tallest restriction so switching never changes height.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".rh-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".rh-scan-field")
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
    <section aria-label="What the border checks" className="rh-dark" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="rh-act-head">
          <span className="st-eyebrow">Annex XVII restrictions</span>
          <h2 className="st-h2">What the border checks, restriction by restriction.</h2>
          <p className="rh-act-sub">
            This page covers the textile rule set first: footwear and apparel,
            customs chapters 61 to 64. Two restrictions land in 2026, on top of
            the Candidate List that always applies. Pick a restriction.
          </p>
        </div>

        <div className="rh-scan-tabs" role="radiogroup" aria-label="REACH restriction">
          {SCAN_TIERS.map((t, i) => (
            <label
              className={`rh-scan-tab${i === 0 ? " is-on" : ""}`}
              data-tier={t.id}
              key={t.id}
            >
              <input
                defaultChecked={i === 0}
                name="rh-scan-tier"
                onChange={() => selectTier(t.id)}
                type="radio"
                value={t.id}
              />
              {t.label}
            </label>
          ))}
        </div>

        <div className="rh-scan-grid">
          {SCAN_FIELDS.map((f) => (
            <div className="rh-scan-field" data-tier={f.tier} key={f.name}>
              <span className="rh-scan-field-tier">
                {SCAN_TIER_LABEL.get(f.tier)}
              </span>
              <span className="rh-scan-field-name">{f.name}</span>
            </div>
          ))}
        </div>

        <p className="rh-scan-caption">
          Private buyer standards like AFIRM and OEKO-TEX sit above this legal
          floor. The restrictions here are the floor the border enforces, and
          the Candidate List behind them moves about twice a year.
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (ivory slab)
   What proof holds up: a dated declaration vs a one-line letter
   vs a test report.
   ============================================================= */
const GRAINS = [
  {
    name: "A dated declaration",
    tag: "What buyers accept",
    accent: true,
    min: true,
    desc: "A declaration pinned to a Candidate List version, naming each substance with its EC or CAS number and concentration, signed by a named person. This is what a buyer contract actually asks for.",
  },
  {
    name: "A one-line letter",
    tag: "What buyers reject",
    accent: false,
    min: false,
    desc: "A generic 'REACH compliant' note with no list version and no substance names proves nothing. It also expires the moment the list moves, which it does twice a year.",
  },
  {
    name: "A test report",
    tag: "The evidence",
    accent: false,
    min: false,
    desc: "A lab result against a specific restriction limit backs a claim on a part. The accreditation body's public register is where a human confirms the lab, since those registers have no API.",
  },
];

export function ReachGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-act-head", start: "top 78%" },
        });
        gsap.from(".rh-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-gran-grid", start: "top 80%" },
        });
        gsap.from(".rh-gran-note", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rh-gran-note", start: "top 88%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="What proof holds up" className="rh-slab-wrap" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="rh-slab">
        <div className="st-container">
          <div className="rh-act-head">
            <span className="st-eyebrow">REACH compliance proof</span>
            <h2 className="st-h2">What proof holds up.</h2>
            <p className="rh-act-sub">
              There is no REACH certificate. What a buyer accepts is a dated
              declaration, not a badge, and buyers know the difference.
            </p>
          </div>

          <div className="rh-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`rh-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`rh-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="rh-gran-name">{g.name}</h3>
                <p className="rh-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <p className="rh-gran-note">
            The Y-code, the customs remark code that tells the border a REACH
            restriction was checked, has been on the customs form since 2023.
            From 2026, checking it is where enforcement is moving, not a
            certificate. A claim is only as good as the list version it is
            pinned to.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark). The two textile deadlines in accent.
   ============================================================= */
const CAL_ROWS = [
  {
    when: "Since Feb 2023",
    hard: false,
    body: "Customs declarations carry REACH Y-codes for restricted goods, per CN code. The border already asks whether a shipment complies.",
  },
  {
    when: "4 Feb 2026",
    hard: false,
    body: "The Candidate List reaches 253 substances, adding n-hexane and bisphenol AF. Every prior screening re-opens against the new list.",
  },
  {
    when: "6 Aug 2026",
    hard: true,
    flag: "Textile deadline",
    body: "Formaldehyde emission limits under Annex XVII entry 77 apply to consumer articles, including textiles and wood-based furniture.",
  },
  {
    when: "10 Oct 2026",
    hard: true,
    flag: "Textile deadline",
    body: "PFHxA and its related substances are restricted in consumer textiles and footwear under Annex XVII entry 79.",
  },
  {
    when: "23 Dec 2026",
    hard: false,
    body: "Annex XVII entries 80 and 81 apply, restricting DMAC and NEP. The restriction list keeps growing.",
  },
  {
    when: "Twice a year",
    hard: false,
    body: "The Candidate List updates again, and every answer you filed before is measured against the new version.",
  },
];

export function ReachCalendar() {
  return (
    <RegCalendar
      stageClassName="rh-dark"
      ariaLabel="The dates that apply"
      trackLabel="REACH deadline timeline"
      eyebrow="REACH deadlines"
      heading="The REACH dates that apply to you."
      sub="REACH has no single start date. The Candidate List grows twice a year, and two textile restrictions land in 2026. The two dates in cobalt are where it gets real for an importer."
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — WHY THE ANSWER EXPIRES (ivory slab)
   The treadmill: the Candidate List moves twice a year, so every
   past answer re-opens. Automatic re-screening is planned work,
   not a shipped feature. Keep the copy in that voice.
   ============================================================= */
const LOOP_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "List moves", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Answer expires", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "Re-screen", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Stay clean", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const LOOP_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";

export function ReachLoop() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-loop-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-loop-body", start: "top 76%" },
        });
        gsap.from("#rh-loop-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".rh-loop-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".rh-loop-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".rh-loop-ring", start: "top 70%" },
        });
        gsap.set(".rh-loop-orbit", { opacity: 1 });
        gsap.to(".rh-loop-orbit", {
          motionPath: {
            path: "#rh-loop-circle",
            align: "#rh-loop-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".rh-loop-ring",
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
    <section aria-label="Why it matters" className="rh-slab-wrap" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="rh-slab">
        <div className="st-container">
          <div className="rh-loop-body">
            <div className="rh-loop-copy">
              <span className="st-eyebrow">Why REACH answers expire</span>
              <h2 className="st-h2">Why a REACH answer expires.</h2>
              <p className="rh-loop-lead">
                Screen a product today and it is clean. Then the Candidate List
                adds two substances, and one of them is in a dye you use. The
                answer you filed is now wrong, and nobody told you.
              </p>
              <p className="rh-loop-body-text">
                That is the treadmill. The list moves about twice a year, and
                every update re-opens every prior screening. The work is not
                screening once; it is screening again, on every change, across
                every part you ever declared: a job for a system that re-runs
                the screen on every change, so the answer stays true instead
                of quietly going stale.
              </p>
              <ul className="rh-loop-fail">
                <li>the answer goes stale</li>
                <li>the buyer re-asks</li>
                <li>a new substance lands</li>
                <li>a part slips through</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="rh-loop-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="rh-loop-circle"
                d={LOOP_CIRCLE}
                id="rh-loop-circle"
              />
              {LOOP_NODES.map((n) => (
                <g className="rh-loop-node" key={n.label}>
                  <circle className="rh-loop-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="rh-loop-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="rh-loop-center" x={200} y={166}>
                the list
              </text>
              <text className="rh-loop-center" x={200} y={182}>
                moves
              </text>
              <circle className="rh-loop-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE SIX PIECES A SCREENING NEEDS (dark)
   These are the parts a REACH screening pipeline has to have. None
   of them is built: there is no /api/reach proxy, no reach
   EngineRoom in core/workspace/networks.ts, and no Candidate List
   or Annex XVII data in this repo. Every body stays marked planned
   until that changes.
   ============================================================= */
const RAILS_PARTS: RailsPart[] = [
  {
    id: "decomposer",
    name: "Article decomposer",
    tag: "The denominator",
    role: "Break it down",
    body: "Planned. Breaks each product into its component articles, because the 0.1% is measured against the part, not the whole. A complex product becomes the list of parts it is really made of.",
    points: ["Component articles", "Lowest level", "0.1% base"],
  },
  {
    id: "matcher",
    name: "Substance matcher",
    tag: "Identity resolution",
    role: "Name the substance",
    body: "Planned. Resolves each material to substances by EC number, CAS number and structure. A material with no match is reported as no match found, never a clean pass, because the lists are open-ended.",
    points: ["EC and CAS", "Structure match", "No false clears"],
  },
  {
    id: "screener",
    name: "List screener",
    tag: "Candidate List + Annex XVII",
    role: "Check the lists",
    body: "Planned. Screens every part against the dated Candidate List and the Annex XVII restriction limits that apply to it. The list version is recorded, so the answer is tied to a point in time. Neither list is loaded into Bindu today.",
    points: ["Candidate List", "Annex XVII", "Dated version"],
  },
  {
    id: "request",
    name: "Supplier request",
    tag: "Up the chain",
    role: "Ask for proof",
    body: "Planned. Requests a dated declaration from the supplier who made a part, approved inside their own workspace before it is sent, so the proof comes from the source. Bindu runs supplier requests this way for EUDR today.",
    points: ["Dated declaration", "Approved at source", "Up the chain"],
  },
  {
    id: "builder",
    name: "Declaration builder",
    tag: "The output",
    role: "Assemble it",
    body: "Planned. Assembles the declaration pinned to the Candidate List version, naming each substance, with the Annex XVII statement and the Y-code the customs entry needs.",
    points: ["Pinned to version", "Named substances", "Y-code ready"],
  },
  {
    id: "watcher",
    name: "Re-screen watcher",
    tag: "The treadmill",
    role: "Watch the list",
    body: "Planned. Watches the Candidate List and Annex XVII for changes. When the list moves, every past screening runs again and flags anything that is now in scope.",
    points: ["Watches the list", "Re-screen", "Flags new scope"],
  },
];

export function ReachRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-act-head", start: "top 80%" },
        });
        gsap.from(".rh-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".rh-rails-tablist", start: "top 84%" },
        });
        gsap.from(".rh-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rh-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The six pieces a REACH screening needs" className="rh-dark" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="rh-act-head">
          <span className="st-eyebrow">REACH screening</span>
          <h2 className="st-h2">The six pieces a REACH screening needs.</h2>
          <p className="rh-act-sub">
            REACH is screening against a list that keeps moving, part by part.
            The <strong>pipeline</strong> below is what that takes: parts in, a
            dated declaration out, re-run every time the list changes. None of
            it is live in Bindu yet. Pick a piece.
          </p>
        </div>

        <RailsExplorer
          label="REACH screening pipeline"
          parts={RAILS_PARTS}
          prefix="rh"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — CLOSE (dark). Badges + magnetic CTA panels.
   ============================================================= */
// These badges state what REACH demands, not what Bindu already does. There
// is no REACH screening in the product. Do not restate them as capabilities.
const CLOSE_BADGES = [
  { head: "250+ and rising", body: "substances on the Candidate List every part is screened against" },
  { head: "0.1% per part", body: "measured against each component, not the whole product" },
  { head: "Dated proof", body: "a declaration pinned to a list version, not a badge" },
  { head: "45-day answer", body: "a consumer question answered inside the deadline, free" },
  { head: "Never final", body: "an answer only holds until the list next moves" },
];

export function ReachClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rh-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rh-act-head", start: "top 80%" },
        });
        gsap.from(".rh-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".rh-close-badges", start: "top 85%" },
        });
        gsap.from(".rh-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".rh-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".rh-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".rh-close-arrow");
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
    <section aria-label="Start now" className="rh-dark" ref={ref}>
      <div className="st-container">
        <div className="rh-act-head">
          <span className="st-eyebrow">Candidate list updates</span>
          <h2 className="st-h2">Bring one shipment to the demo.</h2>
          <p className="rh-act-sub">
            A REACH answer means breaking a product into its parts, screening
            each against the dated list, asking suppliers for what is missing,
            and building a declaration a buyer will accept. That screening is
            not live in Bindu yet, so what we can do today is go through one
            shipment with you and show you what REACH will ask of it. The
            substance answers themselves ride the textile product passport.
          </p>
        </div>

        <div className="rh-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="rh-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="rh-close-grid">
          <DemoCtaLink
            className="rh-close-panel is-primary"
            source="reach-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>Bring one shipment. We will walk through what REACH asks of every part in it.</p>
            <span aria-hidden="true" className="rh-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
          <Link className="rh-close-panel" href="/dpp/textiles">
            <h3>Textile DPP</h3>
            <p>The product passport that will carry these substance answers, live on its own page.</p>
            <span aria-hidden="true" className="rh-close-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
