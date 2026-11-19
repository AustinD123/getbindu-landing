"use client";

/**
 * PPWR story — animated acts for /ppwr.
 *
 * EU PPWR (Regulation (EU) 2025/40) as a 10-act story matching the
 * REACH/DPP/EUDR/CBAM pages: the regulation reads the wrapper rather than the
 * product, one unit of packaging decomposes into components, the declaration is
 * per packaging type rather than per SKU, nothing is submitted to an EU portal,
 * and the only real filing is a national producer registration.
 *
 * Every regulatory number, date and article reference here traces to the
 * validated research in the sibling knowledge layer,
 * ../shelley-knowledge-layer/ppwr/research/ (README, phase-1 … phase-5,
 * VALIDATION), pinned to corpus version 32025R0040 and validated 2026-08-16.
 * Do not edit a figure without re-checking it there. Three rules that pass
 * came out of that validation and must survive edits:
 *
 *  1. Six figures in wide circulation are contradicted by the text
 *     (VALIDATION § Secondary sources). Act 9 states them explicitly; never
 *     reintroduce one anywhere else on the page.
 *  2. Six commencements float on delegated or implementing acts that were not
 *     adopted at the pinned corpus version. They get "2030 at the earliest",
 *     never a hard 1 January 2030.
 *  3. Registration, EPR fees and deposit-and-return are national. The corpus
 *     holds nothing about the 27 regimes, so the page never implies coverage
 *     of them.
 *
 * SSR-first: every element authored in its final visible state; GSAP animates
 * FROM hidden only inside a matchMedia("(prefers-reduced-motion: no-preference)")
 * context. Scoped .pw-* — distinct from .rh-/.cb-/.tx-/.bt-/.ot-/.ed- so the
 * landing family never cross-bleeds on client-side navigation. Accent is cobalt
 * (var(--brand)), the one marketing accent.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DemoCtaLink } from "../demo-cta-link";
import { RegCalendar } from "./reg-calendar";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
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
import "./ppwr-story.css";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Flip
);

/* Every act opens its heading with the same reveal. One definition; each act
   calls it from inside its own useGSAP callback, so the tween registers with
   that act's context and is reverted with it on unmount. */
const revealHead = (selector: string, trigger: string, start = "top 80%") =>
  gsap.from(selector, {
    autoAlpha: 0,
    y: 26,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: { trigger, start },
  });

/* =============================================================
   ACT 2 — THE PROBLEM (dark film stage)
   PPWR reads the wrapper, not the product. The product itself is
   outside the frame; the unit of packaging and its components are
   what get assessed, and the file lands on whoever's name is on it.
   ============================================================= */
const NODES = [
  { x: 95, name: "The product", tier: "Outside PPWR", out: true },
  { x: 365, name: "The wrapper", tier: "Art 3(1)(1)" },
  { x: 635, name: "Its components", tier: "Art 3(1)(43)(44)" },
  { x: 905, name: "Your name on it", tier: "Carries the file", duty: true },
];
const NODE_Y = 190;
const FLOW_PATH = `M95 ${NODE_Y} L365 ${NODE_Y} L635 ${NODE_Y} L905 ${NODE_Y}`;
const STATS = [
  {
    to: 47,
    suffix: "",
    accent: false,
    label: "worked examples in Annex I, 27 of them in scope and 20 out",
  },
  {
    to: 7,
    suffix: "",
    accent: false,
    label: "economic operators in Art 3(1)(12). The final distributor is the one people drop",
  },
  {
    to: 22,
    suffix: "",
    accent: false,
    label: "material categories in Annex II Table 1, the only list PPWR routes on",
  },
  {
    to: 0,
    suffix: "",
    accent: true,
    label: "EU portals. Nothing is submitted. You draw up the declaration yourself",
  },
];

export function PpwrProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-problem-head > *", ".pw-problem-head");

        gsap.from(".pw-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pw-flow", start: "top 78%" },
        });
        gsap.from("#pw-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".pw-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".pw-read-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".pw-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        gsap.set(".pw-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".pw-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#pw-flow-path",
              align: "#pw-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".pw-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".pw-stat-num").forEach((el) => {
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
            scrollTrigger: { trigger: ".pw-stats", start: "top 82%" },
          });
        });

        SplitText.create(".pw-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".pw-verdict-quote",
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
    <section aria-label="The problem" className="pw-problem" ref={ref}>
      <div className="st-container">
        <div className="pw-problem-head">
          <span className="st-eyebrow">Packaging in scope</span>
          <h2 className="st-h2">PPWR regulates the wrapper, not the product.</h2>
          <p className="pw-problem-lead">
            A book is not a food product and not a chemical, and the regulation
            still reaches it. Article 2(1) applies PPWR to{" "}
            <strong>all packaging, whatever the material and whatever the sector</strong>
            , from industry and retail to offices, services and households. What
            gets assessed is the unit of packaging with its components (Art
            3(1)(45)): the mailer, the address label, the tape, the shrink wrap.
            Recyclability under Art 6 and recycled content under Art 7 are
            measured on those parts, not on the finished parcel.
          </p>
        </div>

        <div className="pw-flow">
          <svg
            aria-hidden="true"
            className="pw-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="pw-flow-path" d={FLOW_PATH} id="pw-flow-path" />

            <path
              className="pw-read-bracket"
              d="M365 128 L365 116 L905 116 L905 128"
            />
            <text className="pw-read-label" x="635" y="104">
              PPWR reads this half of the parcel. Art 2(1): all materials, all sectors
            </text>

            {NODES.map((n) => (
              <g className="pw-node" key={n.name}>
                <text
                  className={`pw-node-name${n.out ? " is-out" : ""}`}
                  x={n.x}
                  y={152}
                >
                  {n.name}
                </text>
                <circle
                  className={`pw-node-dot${n.duty ? " is-duty" : ""}${
                    n.out ? " is-out" : ""
                  }`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`pw-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {n.tier}
                </text>
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle className="pw-packet" cx={95} cy={NODE_Y} key={i} r={5} />
            ))}
          </svg>
          <p className="pw-flow-caption">
            The book is not the compliance object. The wrapper around it is, and
            the file lands on whoever puts a name or trademark on that wrapper.
          </p>
        </div>

        <div className="pw-stats">
          {STATS.map((s) => (
            <div className="pw-stat" key={s.label}>
              <span
                className={`pw-stat-num${s.accent ? " is-accent" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="pw-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="pw-verdict">
          <p className="pw-verdict-quote">
            This Regulation applies to all packaging, regardless of the material
            used, and to all packaging waste, whether such packaging is used in
            industry, other manufacturing, retail or distribution, offices,
            services or households.
          </p>
          <span className="pw-verdict-cite">
            Regulation (EU) 2025/40 · Article 2(1)
          </span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE FLOW (ivory slab). The six moves a PPWR answer takes,
   mirroring the five research phases plus the Art 15(4) re-open.
   Shelley has no PPWR engine: no /api/ppwr proxy, no ppwr entry in
   core/workspace/networks.ts, no Annex II or Annex V data. These
   steps describe the WORK, not a running product. Keep them in
   method voice and keep the disclosure in the act sub.
   ============================================================= */
const FLOW_STEPS = [
  {
    n: "01",
    label: "Scope",
    head: "Decide whether the item is packaging.",
    body: "Two questions, in order. Is it intended to contain, protect, handle, deliver or present a product, and does it fall in one of the seven limbs of Art 3(1)(1)? A limb is one numbered sub-part of the definition, and each has its own date. Annex I settles 47 recurring cases and binds nothing beyond them, so a not-packaging answer has to record which limb was tested and failed.",
    chips: ["Art 3(1)(1)", "seven limbs", "47 worked cases"],
  },
  {
    n: "02",
    label: "Classify",
    head: "Place the unit on four axes at once.",
    body: "Format, material, lifecycle and component role, all four simultaneously. There is no code table to look up: the material axis is the 22 Annex II Table 1 categories, and that same table is the key the annual tonnage report is later filed by.",
    chips: ["format x material", "lifecycle", "22 categories"],
  },
  {
    n: "03",
    label: "Route",
    head: "Work out which ladder you are on.",
    body: "Manufacturer under Art 15 and producer under Art 44 are two roles with two duty sets, and one company is routinely on both for the same box. Article 21 converts an importer or distributor into a manufacturer the moment its own name, trademark or a modification touches the packaging.",
    chips: ["Art 15 ladder", "Art 44 ladder", "Art 21 role switch"],
  },
  {
    n: "04",
    label: "Bind",
    head: "Pull the requirements limb by limb.",
    body: "Article 10 shows the unit of work is the limb, not the article. Art 10(2) binds at application in 2026; Art 10(1) only in 2030. A model keyed on article numbers under-reports the exposure that starts on the day the regulation applies.",
    chips: ["limb, not article", "four states", "one date per limb"],
  },
  {
    n: "05",
    label: "Declare",
    head: "Assess it yourself, and sign it.",
    body: "Annex VII holds one procedure, Module A internal production control, and no notified body exists for PPWR. The technical file carries the Annex VII point 2 content, and the declaration follows the Annex VIII model, drawn up once per packaging type and kept continuously updated.",
    chips: ["Module A", "Annex VII file", "Annex VIII model"],
  },
  {
    n: "06",
    label: "Re-open",
    head: "Re-assess when anything moves.",
    body: "Art 15(4) sends a design change, a material change or a revised standard back through the assessment. The file is retained 5 years for single-use packaging and 10 for reusable (Art 15(3)), and has to stay producible in 10 days throughout.",
    chips: ["Art 15(4)", "5 yr / 10 yr", "10-day production"],
  },
];

export function PpwrFlow() {
  return (
    <RegulationFlow
      ariaLabel="How a packaging file is assembled"
      eyebrow="PPWR declaration of conformity"
      heading="The six steps to a PPWR declaration."
      sub={
        <>
          PPWR has no code to look up and no form to submit. Getting from a
          parcel to a signed declaration takes <strong>six moves</strong>. This
          is the work the regulation asks for. PPWR is not live in Bindu yet;
          today, Bindu files EUDR end to end.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE AXES (dark, Flip-filtered)
   PPWR routes on a composite, not a code. Four classification axes
   plus the role axis, which is a property of the company rather
   than of the packaging.
   ============================================================= */
const SCAN_TIERS = [
  { id: "format", label: "Format" },
  { id: "material", label: "Material" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "component", label: "Component" },
  { id: "role", label: "Role" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
// One source for the tab label and the tag printed on each field card.
const SCAN_TIER_LABEL = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.label] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  { name: "Sales, grouped and transport packaging", tier: "format" },
  { name: "E-commerce is a subtype of transport", tier: "format" },
  { name: "Transport is exempt from the Art 12 label, e-commerce is not", tier: "format" },
  { name: "Composite once a second material passes 5% of mass", tier: "format" },
  { name: "22 categories in Annex II Table 1", tier: "material" },
  { name: "Nine plastic categories split on colour", tier: "material" },
  { name: "Every Annex V format ban is single-use plastic", tier: "material" },
  { name: "The annual tonnage report is filed by these categories", tier: "material" },
  { name: "Single-use is defined as packaging that is not reusable", tier: "lifecycle" },
  { name: "Reusable is a five-condition test (Art 11(1))", tier: "lifecycle" },
  { name: "Retention runs 5 years, or 10 if reusable", tier: "lifecycle" },
  { name: "Reusable in a re-use system is exempt from the empty-space ratio", tier: "lifecycle" },
  { name: "An integrated component stays on the unit", tier: "component" },
  { name: "A separate component comes off and is discarded apart", tier: "component" },
  { name: "Recyclability is assessed on the parts", tier: "component" },
  { name: "Recycled content is averaged per plant and per year", tier: "component" },
  { name: "Seven economic operators in Art 3(1)(12)", tier: "role" },
  { name: "Manufacturer (Art 15) is not producer (Art 44)", tier: "role" },
  { name: "Art 21 turns own-brand importers into manufacturers", tier: "role" },
  { name: "The producer question is answered per Member State", tier: "role" },
];

export function PpwrAxes() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the first tab.
      gsap.utils.toArray<HTMLElement>(".pw-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "format") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-act-head > *", ".pw-act-head", "top 78%");
        gsap.from(".pw-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pw-scan-tabs", start: "top 84%" },
        });
        gsap.from(".pw-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".pw-scan-grid", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  const selectTier = contextSafe((tier: ScanTier) => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>(".pw-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".pw-scan-tab").forEach((t) => {
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

  // Lock the grid to the tallest axis so switching never changes height.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".pw-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".pw-scan-field")
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
    <section
      aria-label="How PPWR classifies a unit of packaging"
      className="pw-dark"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="dark"
      />
      <div className="st-container">
        <div className="pw-act-head">
          <span className="st-eyebrow">PPWR scope</span>
          <h2 className="st-h2">PPWR classifies packaging on four axes, not a code.</h2>
          <p className="pw-act-sub">
            EUDR and CBAM route on a CN code in an annex. PPWR routes on a
            composite: <strong>format, material, lifecycle and component role</strong>
            , answered together for every unit. The fifth axis, your role, is a
            property of your company in a market rather than of the packaging.
            Pick an axis.
          </p>
        </div>

        <div
          className="pw-scan-tabs"
          role="radiogroup"
          aria-label="PPWR classification axis"
        >
          {SCAN_TIERS.map((t, i) => (
            <label
              className={`pw-scan-tab${i === 0 ? " is-on" : ""}`}
              data-tier={t.id}
              key={t.id}
            >
              <input
                defaultChecked={i === 0}
                name="pw-scan-tier"
                onChange={() => selectTier(t.id)}
                type="radio"
                value={t.id}
              />
              {t.label}
            </label>
          ))}
        </div>

        <div className="pw-scan-grid">
          {SCAN_FIELDS.map((f) => (
            <div className="pw-scan-field" data-tier={f.tier} key={f.name}>
              <span className="pw-scan-field-tier">
                {SCAN_TIER_LABEL.get(f.tier)}
              </span>
              <span className="pw-scan-field-name">{f.name}</span>
            </div>
          ))}
        </div>

        <p className="pw-scan-caption">
          The role axis is answered again in every country you sell into.
          Registration, the fees that follow it, and any deposit and return
          scheme are set by 27 Member States rather than by this regulation, so
          the EU layer here stops where the national one begins.
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (ivory slab)
   The declaration is per packaging TYPE. That is the economic fact
   of PPWR: the collapse from products to types is computable before
   a single supplier is contacted.
   ============================================================= */
const GRAINS = [
  {
    name: "The packaging type",
    tag: "What you declare",
    accent: true,
    min: true,
    desc: "Annex VII point 4 requires a written declaration of conformity for each packaging type, identifying the packaging it covers. One declaration covers every product that uses that type, it is drawn on the Annex VIII model, and Art 39(2) requires it to be continuously updated.",
  },
  {
    name: "The product code",
    tag: "The wrong unit",
    accent: false,
    min: false,
    desc: "A SKU is the wrong granularity in both directions. Five hundred products can share forty packaging types, and one product can carry several units of packaging at once. Counting products tells you nothing about how much work is in front of you.",
  },
  {
    name: "The component",
    tag: "Where the tests run",
    accent: false,
    min: false,
    desc: "Recyclability under Art 6 and recycled content under Art 7 are assessed on the parts. Annex II Table 4 names adhesives, colours, barriers, coatings, inks and lacquers as assessed parameters, and none of those is a property of the finished unit.",
  },
];

export function PpwrGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-act-head > *", ".pw-act-head", "top 78%");
        gsap.from(".pw-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pw-gran-grid", start: "top 80%" },
        });
        gsap.from(".pw-gran-note", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pw-gran-note", start: "top 88%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label="What a declaration covers"
      className="pw-slab-wrap"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="pw-slab">
        <div className="st-container">
          <div className="pw-act-head">
            <span className="st-eyebrow">Packaging requirements</span>
            <h2 className="st-h2">
              The declaration is per packaging type, not per product.
            </h2>
            <p className="pw-act-sub">
              A catalogue of five hundred products drawing on forty{" "}
              <strong>packaging types</strong> needs forty declarations, and
              that collapse is computable before you contact a single supplier.
            </p>
          </div>

          <div className="pw-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`pw-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`pw-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="pw-gran-name">{g.name}</h3>
                <p className="pw-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <p className="pw-gran-note">
            Count packaging types before you count products. It is the
            difference between a job you can finish and one you cannot size.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark). Operator-binding dates only.
   Two rules survive every edit: entry into force is 11 February
   2025 (not 12), and the six floating commencements never get a
   hard date, because the acts they run from were not adopted at
   the pinned corpus version.
   ============================================================= */
const CAL_ROWS = [
  {
    when: "11 Feb 2025",
    hard: false,
    body: "Entry into force. The text uses this date in ten places, as the reference for micro-enterprise status, protected design rights, reusability, and the Art 15(9) recall carve-out. Published summaries widely say 12 February. The text says the 11th.",
  },
  {
    when: "12 Aug 2026",
    hard: true,
    flag: "Application",
    body: "The Art 5 substance limits, including the Art 5(5) PFAS restriction on food-contact packaging, the Art 10(2) Annex IV criteria, the conformity assessment, the technical documentation, the declaration of conformity, operator identification, the importer and distributor duties, Art 22 traceability, and registration as a precondition to making packaging available.",
  },
  {
    when: "12 Feb 2027",
    hard: false,
    body: "Refill obligations for hotels, restaurants and cafes under Art 32(1). Art 12(9) also lands here and it is permissive: packaging in an extended producer responsibility scheme may be identified, not must.",
  },
  {
    when: "12 Feb 2028",
    hard: false,
    body: "Sales packaging empty space reduced to the minimum necessary (Art 24(4)), the re-use offer in hospitality (Art 33(1)), and compostability for permeable tea and coffee bags and for fruit and vegetable stickers (Art 9(1)).",
  },
  {
    when: "12 Aug 2028",
    hard: false,
    body: "The harmonised material-composition label (Art 12(1)) and the recycled-content label rules (Art 12(4)), or 24 months from the implementing acts behind them, whichever falls later.",
  },
  {
    when: "12 Feb 2029",
    hard: false,
    body: "The reusable-packaging label and its data carrier (Art 12(2)), or 30 months from the Art 12(6) implementing act, whichever falls later.",
  },
  {
    when: "1 Jan 2030",
    hard: false,
    body: "Fixed in the text: weight and volume reduced to the minimum necessary (Art 10(1)), the Annex V format bans (Art 25(1)), and the 40% transport re-use target (Art 29(1)).",
  },
  {
    when: "2030 at the earliest",
    hard: true,
    flag: "No date yet",
    body: "Recyclability grades, recycled content in plastic parts and the 50% empty-space ratio each start on the later of a fixed date and a period running from delegated or implementing acts. None of those acts had been adopted as of the regulation text this page was checked against (16 August 2026), so these arrive only once the Commission publishes the criteria.",
  },
  {
    when: "1 Jan 2038",
    hard: false,
    body: "Grade C packaging can no longer be placed on the market, leaving A and B (Art 6(3)). This is routinely reported as 2035. The 2035 date is when the recycled-at-scale factor, recyclable in facilities that actually exist at volume, is added to the grade under Art 6(2)(b).",
  },
  {
    when: "1 June, every year",
    hard: false,
    body: "The tonnage report to each national register, by Annex II Table 1 category (Art 44(7)). Below 10 tonnes a year it collapses to a seven-row table (Art 44(8)). Member States may require it to be audited.",
  },
];

export function PpwrCalendar() {
  return (
    <RegCalendar
      stageClassName="pw-dark"
      ariaLabel="The dates that apply"
      trackLabel="PPWR deadline timeline"
      eyebrow="PPWR deadlines"
      heading="The PPWR dates that bind an operator."
      sub={
        <>
          One date is the starting gun: <strong>12 August 2026</strong>, when
          the regulation applies and the file has to exist. After that the
          calendar splits limb by limb, and six requirements have no date at
          all until the Commission adopts the acts behind them. We will not
          print a date the law does not give.
        </>
      }
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — NOTHING IS SUBMITTED (ivory slab)
   The structural difference from EUDR and CBAM: no EU portal, a
   self-signed declaration, a 10-day production duty, and one real
   filing that is national and therefore outside the corpus.
   ============================================================= */
const FILE_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "Something changes", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Re-assess", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "Re-declare", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Hold it", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const FILE_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";

export function PpwrFiling() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pw-file-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pw-file-body", start: "top 76%" },
        });
        gsap.from("#pw-file-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".pw-file-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".pw-file-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pw-file-ring", start: "top 70%" },
        });
        gsap.set(".pw-file-orbit", { opacity: 1 });
        gsap.to(".pw-file-orbit", {
          motionPath: {
            path: "#pw-file-circle",
            align: "#pw-file-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".pw-file-ring",
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
    <section
      aria-label="What is filed and what is held"
      className="pw-slab-wrap"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="pw-slab">
        <div className="st-container">
          <div className="pw-file-body">
            <div className="pw-file-copy">
              <span className="st-eyebrow">PPWR enforcement</span>
              <h2 className="st-h2">Nothing is submitted to the EU.</h2>
              <p className="pw-file-lead">
                EUDR ends at TRACES and CBAM ends at the registry. PPWR ends in
                a drawer. There is no EU portal for packaging conformity: you
                draw up the declaration, and by drawing it up you assume
                responsibility for it (Art 39(4)). Nobody countersigns it.
              </p>
              <p className="pw-file-text">
                What replaces the filing is a deadline you cannot see coming. On
                a reasoned request from a national authority, the documentation
                has to be produced in electronic form, in a language that
                authority understands, within 10 days (Art 15(10)). The same ten
                days bind importers (Art 18(8)) and authorised representatives
                (Art 17(2)(d)). Ten days is the real service level of the whole
                regulation: anything you cannot assemble and translate inside it
                is not, in practice, held.
              </p>
              <div className="pw-file-panel">
                <span className="pw-file-panel-tag">The one real filing</span>
                <p>
                  Registration in a national producer register (Art 44). Art
                  44(4) bars a producer from making packaging available in a
                  Member State where it is not registered, which makes the
                  registration a precondition to selling rather than an
                  afterthought. It is answered once per Member State, and the
                  register, its thresholds, the fees and any deposit and return
                  scheme are set by each of the 27 Member States.
                </p>
              </div>
              <ul className="pw-file-trigger">
                <li>a resin changes</li>
                <li>a supplier changes</li>
                <li>a closure changes</li>
                <li>a standard is revised</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="pw-file-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="pw-file-circle"
                d={FILE_CIRCLE}
                id="pw-file-circle"
              />
              {FILE_NODES.map((n) => (
                <g className="pw-file-node" key={n.label}>
                  <circle className="pw-file-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="pw-file-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="pw-file-center" x={200} y={166}>
                Art 15(4)
              </text>
              <text className="pw-file-center" x={200} y={182}>
                never ends
              </text>
              <circle className="pw-file-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE SIX PIECES A PPWR FILE NEEDS (dark)
   None of them is built: there is no /api/ppwr proxy, no ppwr entry
   in core/workspace/networks.ts, and no Annex II or Annex V data in
   this repo. Every body stays marked planned until that changes.
   ============================================================= */
const RAILS_PARTS: RailsPart[] = [
  {
    id: "scope",
    name: "Scope gate",
    tag: "Is it packaging?",
    role: "Decide scope",
    body: "Planned. Runs the opening definition of Art 3(1)(1) and its seven limbs against the commercial context, and records which limb was met or which Annex I entry excluded the item. The same object moves in and out of scope depending on how it is sold, so an ambiguous case goes to a human rather than to a guess.",
    points: ["Seven limbs", "Annex I precedent", "Reason recorded"],
  },
  {
    id: "axes",
    name: "Axis classifier",
    tag: "Four axes at once",
    role: "Classify the unit",
    body: "Planned. Places each unit on format, material, lifecycle and component role, applies the 5% composite test, and assigns the Annex II Table 1 category that the annual tonnage report is later filed by. It decomposes to components, because that is where recyclability and recycled content are measured.",
    points: ["22 categories", "5% composite test", "Component split"],
  },
  {
    id: "router",
    name: "Role router",
    tag: "Two ladders",
    role: "Work out the duty",
    body: "Planned. Answers the manufacturer question once per packaging type and the producer question once per Member State, and evaluates Art 21 per unit rather than per company, because an own-brand line or a re-pack converts an importer into a manufacturer for that unit alone.",
    points: ["Art 15 ladder", "Art 44 ladder", "Art 21 per unit"],
  },
  {
    id: "ledger",
    name: "Obligation ledger",
    tag: "The limb, not the article",
    role: "Say what binds",
    body: "Planned. Holds each requirement at limb granularity with its own commencement and one of four states. A requirement whose start depends on an act the Commission has not adopted is marked as such, never given a date it does not have, because turning the silence of a regulator into an operator task is how a report loses its credibility.",
    points: ["Limb granularity", "Four states", "No invented dates"],
  },
  {
    id: "file",
    name: "Technical file",
    tag: "Annex VII and VIII",
    role: "Build the proof",
    body: "Planned. Assembles the Annex VII point 2 documentation, including the description of the solutions adopted where no harmonised standard exists yet, and draws the declaration on the Annex VIII model, one per packaging type, continuously updated.",
    points: ["Annex VII pt 2", "Per packaging type", "Kept current"],
  },
  {
    id: "clock",
    name: "Ten-day clock",
    tag: "Production on demand",
    role: "Produce it",
    body: "Planned. Keeps the file retrievable and translatable inside the Art 15(10) window, holds it for 5 or 10 years by lifecycle, and re-opens the assessment when Art 15(4) is triggered by a design, material, supplier or standard change.",
    points: ["10 days", "5 yr / 10 yr", "Art 15(4) re-open"],
  },
];

export function PpwrRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-act-head > *", ".pw-act-head");
        gsap.from(".pw-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".pw-rails-tablist", start: "top 84%" },
        });
        gsap.from(".pw-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pw-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label="The six pieces a PPWR file needs"
      className="pw-dark"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="dark"
      />
      <div className="st-container">
        <div className="pw-act-head">
          <span className="st-eyebrow">Evidence pipeline</span>
          <h2 className="st-h2">The six pieces a PPWR file needs.</h2>
          <p className="pw-act-sub">
            Parts in, a signed declaration out, re-run whenever the packaging or
            the standard behind it moves. The <strong>pipeline</strong> below is
            the work the regulation asks for, and none of it is live in Bindu
            yet. Pick a piece.
          </p>
        </div>

        <RailsExplorer
          label="PPWR packaging pipeline"
          parts={RAILS_PARTS}
          prefix="pw"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — WHAT THE TEXT SAYS (ivory slab)
   The six claims in wide circulation that the corpus contradicts,
   from VALIDATION.md § Secondary sources. This act is the page's
   credibility argument; do not soften it and do not let any of
   these six figures reappear elsewhere on the page.
   ============================================================= */
const CHECKS = [
  {
    claim: "Recyclability is graded A to E, on five bands.",
    truth:
      "There are three grades. Annex II Table 3 gives A, B and C, and nothing below them.",
    cite: "Annex II, Table 3",
  },
  {
    claim: "Grade A is above 90%, B is 75 to 90%, C is 50 to 75%.",
    truth:
      "A is 95% or above, B is 80% or above, C is 70% or above. Below 70% the packaging is technically non-recyclable and its placing on the market shall be restricted.",
    cite: "Annex II, Table 3",
  },
  {
    claim: "Only grades A and B may be sold from 2035.",
    truth:
      "From 1 January 2038. The 2035 date is when the recycled-at-scale factor is added to the grade, which is a different thing.",
    cite: "Art 6(3) · Art 6(2)(b)",
  },
  {
    claim:
      "The extended producer responsibility identifier is required from 12 February 2027.",
    truth:
      "The text says packaging included in an extended producer responsibility scheme may be identified. It is permissive, not a duty.",
    cite: "Art 12(9)",
  },
  {
    claim: "PPWR entered into force on 12 February 2025.",
    truth:
      "11 February 2025. The text uses that date in ten places, including Arts 3(1)(13)(b), 10(2)(a), 11(1), 15(9), 25(4) and 29(2), and every one of them moves if you get it wrong.",
    cite: "Art 71",
  },
  {
    claim: "Ten-year retention for reusable packaging comes from Article 11(1).",
    truth:
      "Retention is Art 15(3): 5 years for single-use, 10 for reusable. Art 11(1) defines reusability and sets no retention period at all.",
    cite: "Art 15(3)",
  },
];

export function PpwrChecked() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-act-head > *", ".pw-act-head");
        gsap.from(".pw-check-row", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pw-check-list", start: "top 84%" },
        });
        gsap.from(".pw-check-note", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pw-check-note", start: "top 90%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label="Claims the regulation contradicts"
      className="pw-slab-wrap"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="pw-slab">
        <div className="st-container">
          <div className="pw-act-head">
            <span className="st-eyebrow">Common PPWR mistakes</span>
            <h2 className="st-h2">Six things most PPWR pages get wrong.</h2>
            <p className="pw-act-sub">
              None of these is a close call. Each one is contradicted by the
              text of Regulation (EU) 2025/40, and each is repeated across
              vendor summaries and analyst notes because the analysis was copied
              rather than read. If a page you are reading carries one of them,
              check the rest of it.
            </p>
          </div>

          <div className="pw-check-list">
            {CHECKS.map((c) => (
              <div className="pw-check-row" key={c.cite + c.claim}>
                <p className="pw-check-claim">{c.claim}</p>
                <p className="pw-check-truth">
                  {c.truth}
                  <span className="pw-check-cite">{c.cite}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="pw-check-note">
            Every figure on this page was read from the regulation text itself
            (EUR-Lex 32025R0040) and checked on 16 August 2026. Where the text
            gives no date, this page gives no date.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 10 — CLOSE (dark). Badges + magnetic CTA panels.
   These badges state what PPWR demands, not what Bindu already
   does. There is no PPWR engine in the product. Do not restate
   them as capabilities.
   ============================================================= */
const CLOSE_BADGES = [
  { head: "12 Aug 2026", body: "the date PPWR applies, and the date the file has to exist" },
  { head: "Per packaging type", body: "one declaration covers every product that uses it" },
  { head: "10 days", body: "to produce the documentation on a reasoned request" },
  { head: "Nothing filed", body: "no EU portal, and one national registration per country" },
  { head: "Never final", body: "a design, material or supplier change re-opens the assessment" },
];

export function PpwrClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealHead(".pw-act-head > *", ".pw-act-head");
        gsap.from(".pw-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pw-close-badges", start: "top 85%" },
        });
        gsap.from(".pw-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pw-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".pw-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".pw-close-arrow");
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
    <section aria-label="Start now" className="pw-dark" ref={ref}>
      <div className="st-container">
        <div className="pw-act-head">
          <span className="st-eyebrow">PPWR proof</span>
          <h2 className="st-h2">Bring one parcel to the demo.</h2>
          <p className="pw-act-sub">
            A PPWR answer means deciding whether each item is packaging, placing
            it on four axes, working out which ladder you are on in each market,
            pulling the requirements limb by limb, and holding a file you can
            produce in ten days. That file is not live in Bindu yet. Today,
            Bindu files EUDR end to end and carries substance answers on the
            textile product passport; what we can do now is go through one
            parcel with you and show you what the regulation asks of every part
            of it.
          </p>
        </div>

        <div className="pw-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="pw-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="pw-close-grid">
          <DemoCtaLink
            className="pw-close-panel is-primary"
            source="ppwr-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>
              Bring one parcel. We will walk through what PPWR asks of every part
              of it.
            </p>
            <span aria-hidden="true" className="pw-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
          <Link className="pw-close-panel" href="/eudr">
            <h3>EUDR</h3>
            <p>
              The one regulation Bindu files end to end today, from plot
              geolocation to the statement in TRACES.
            </p>
            <span aria-hidden="true" className="pw-close-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
