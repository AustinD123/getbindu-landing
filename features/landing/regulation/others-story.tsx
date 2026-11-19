"use client";

/**
 * DPP · Others story — animated acts for /dpp/others.
 *
 * The roadmap page: after batteries and textiles, the Digital Product Passport
 * spreads across the economy one delegated act at a time. Same spine as the
 * textiles/battery stories, re-cast around the ESPR framework (Regulation (EU)
 * 2024/1781), its first Working Plan (COM(2025) 187), the Toy Safety Regulation
 * (EU) 2025/2509, and the shared CEN-CENELEC JTC 24 DPP standards.
 *
 * SSR-first: every element authored in its final visible state so no-JS,
 * reduced-motion and crawlers see the whole page; GSAP animates FROM hidden
 * only inside a matchMedia("(prefers-reduced-motion: no-preference)") context.
 * Scoped .ot-* — distinct from textiles' .tx-* and battery's .bt-* so the three
 * DPP pages never bleed into one another during client-side navigation.
 */

import Link from "next/link";
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
import "./others-story.css";

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
   "One framework. Every product, in its turn." A single rail
   (ESPR Articles 9-15) with product groups branching off it.
   ============================================================= */
const RAIL_PATH = "M64 176 L936 176";
const OT_NODES = [
  { x: 110, name: "Batteries", live: true },
  { x: 274, name: "Textiles", live: true },
  { x: 438, name: "Steel", live: false },
  { x: 602, name: "Aluminium", live: false },
  { x: 766, name: "Furniture", live: false },
  { x: 930, name: "Toys", live: false },
];
// The numbers. data-to drives the count-up; the authored text is the final
// value so no-JS readers see the real figure. Each label must read as a whole
// clause after its numeral, and each figure must be sourced. A "10 years a
// passport must stay reachable" stat was removed because no source in the repo
// backs it and the product's own retention term is five years.
const STATS = [
  { to: 6, suffix: "", accent: false, label: "priority product groups in the first ESPR Working Plan" },
  { to: 8, suffix: "", accent: false, label: "shared DPP standards, one carrier for any product" },
  { to: 0, suffix: "", accent: true, label: "of these passports can be met with a PDF. Every record is machine-read" },
];

export function OthersProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        gsap.from(".ot-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-problem-head", start: "top 80%" },
        });

        gsap.from("#ot-rail-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".ot-flow",
            start: "top 76%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".ot-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ot-flow", start: "top 74%" },
        });

        gsap.set(".ot-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".ot-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#ot-rail-path",
              align: "#ot-rail-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".ot-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".ot-stat-num").forEach((el) => {
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
            scrollTrigger: { trigger: ".ot-stats", start: "top 82%" },
          });
        });

        SplitText.create(".ot-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".ot-verdict-quote",
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
    <section aria-label="The problem" className="ot-problem" ref={ref}>
      <div className="st-container">
        <div className="ot-problem-head">
          <span className="st-eyebrow">Product groups on the roadmap</span>
          <h2 className="st-h2">One framework will reach every product group in turn.</h2>
          <p className="ot-problem-lead">
            The passport is not a battery thing, or a textiles thing. It is a{" "}
            <strong>framework</strong>. ESPR bolts the same carrier, the same
            identifiers and the same registry onto product group after product
            group, one delegated act at a time. When your act lands, the data
            problem is the one every group before you already hit:{" "}
            <strong>the proof lives up your chain, the duty lands on you</strong>.
          </p>
        </div>

        <div className="ot-flow">
          <svg
            aria-hidden="true"
            className="ot-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="ot-rail-line" d={RAIL_PATH} id="ot-rail-path" />
            <text className="ot-rail-label" x="500" y="208">
              One framework · ESPR Articles 9 to 15
            </text>

            {OT_NODES.map((n) => (
              <g className="ot-node" key={n.name}>
                <text
                  className={`ot-node-name${n.live ? " is-live" : ""}`}
                  x={n.x}
                  y={92}
                >
                  {n.name}
                </text>
                <path
                  className="ot-branch"
                  d={`M${n.x} 176 L${n.x} 112`}
                />
                <circle
                  className={`ot-node-dot${n.live ? " is-live" : ""}`}
                  cx={n.x}
                  cy={104}
                  r={n.live ? 7 : 5}
                />
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle className="ot-packet" cx={64} cy={176} key={i} r={5} />
            ))}
          </svg>
          {/* The chain in words. The diagram is a 1000-unit viewBox scaled to
              the column, so at 375px its 16px labels render near 5px, and it is
              aria-hidden, so a screen reader gets nothing from it either. This
              list is the text alternative at every width and the only rendering
              of the chain below 700px. */}
          <ol className="ot-flow-list">
            {OT_NODES.map((n) => (
              <li key={n.name}>
                <strong>{n.name}</strong>
                <span>{n.live ? "Live" : "Ahead"}</span>
              </li>
            ))}
          </ol>
          <p className="ot-flow-caption">
            Batteries and textiles are live. Steel, aluminium, furniture, toys,
            the rest ride the same rail. Only the fields change.
          </p>
        </div>

        <div className="ot-stats">
          {STATS.map((s) => (
            <div className="ot-stat" key={s.label}>
              <span
                className={`ot-stat-num${s.accent ? " is-accent" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="ot-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="ot-verdict">
          <p className="ot-verdict-quote">
            One carrier. One set of identifiers. One registry. Whatever the
            product, the framework underneath is the same, and each delegated
            act adds its own set of fields to it.
          </p>
          <span className="ot-verdict-cite">
            The DPP framework of ESPR, Regulation (EU) 2024/1781, Articles 9 to
            12, in plain words
          </span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE FLOW (ivory slab)
   Seven planned Bindu moves, product-agnostic: the same engine fills
   whichever fields the delegated act names.
   ============================================================= */
// The passport engine is NOT built: no DPP template, no carrier minting, no
// registry client, no public passport page. Every step is marked planned and
// must stay that way until the engine exists. See the act sub for the
// standing disclosure.
const FLOW_STEPS = [
  {
    n: "01",
    label: "Ask",
    head: "Ask each tier for the field it holds.",
    body: "Bindu runs supplier collection this way for EUDR today. Whatever the product, the passport pulls from the same chain: one request per supplier, each asked for a single field in the format it already keeps.",
    tag: "Planned",
    chips: ["composition", "origin", "durability", "recycled %", "test report"],
  },
  {
    n: "02",
    label: "Normalise",
    head: "Turn documents into identifiers.",
    body: "Answers map onto the shared DPP data model, the one CEN-CENELEC JTC 24 wrote for every product group, so nobody re-keys the same certificate twice.",
    tag: "Planned",
    chips: ["unique product ID", "operator ID", "facility ID", "GS1 Digital Link", "EN 1821x"],
  },
  {
    n: "03",
    label: "Verify",
    head: "Recalculate. Don't just trust.",
    body: "The figures an authority is entitled to recompute get recomputed before they are published, with the third-party evidence the delegated act names attached. The claim stands up to a customs check.",
    tag: "Planned",
    chips: ["durability", "recycled share", "footprint", "conformity"],
  },
  {
    n: "04",
    label: "Assemble",
    head: "Fill the fields this act asks for.",
    body: "Each delegated act picks its own Annex fields and its own grain, filled from records you already hold, at model, batch or item.",
    tag: "Planned",
    chips: ["identification", "compliance", "materials", "circularity"],
  },
  {
    n: "05",
    label: "Register",
    head: "One identifier to Brussels. The data stays yours.",
    body: "The unique identifier goes to the EU DPP Registry, live since 20 July 2026 under Implementing Regulation (EU) 2026/1778. The content stays with you, or your passport service provider. Nothing sensitive sits on an EU server.",
    tag: "Planned",
    chips: ["UID → EU Registry", "decentralised content", "no vendor lock-in"],
  },
  {
    n: "06",
    label: "Carrier",
    head: "Put a durable link on the product.",
    body: "The carrier the act requires, a QR to ISO/IEC 18004 or RFID or NFC, staying legible and resolving for the life of the product. Bindu mints no carriers today.",
    tag: "Planned",
    chips: ["QR · ISO/IEC 18004", "RFID · NFC", "on the product"],
  },
  {
    n: "07",
    label: "Publish",
    head: "One record, three doors.",
    body: "The record goes live with three doors: public for buyers, legitimate interest for repairers and recyclers, authority for customs. There is no public passport page yet.",
    tag: "Planned",
    chips: ["Public", "Legitimate interest", "Authority", "Credential-gated"],
  },
];

export function OthersFlow() {
  return (
    <RegulationFlow
      ariaLabel="How the passport is assembled"
      eyebrow="Digital product passport process"
      heading="The seven steps to a product passport."
      sub={
        <>
          The law asks one company for a record it doesn&apos;t hold. This is
          how Bindu is building it, in <strong>seven moves</strong>, the same
          seven for any product group. Supplier collection, evidence and the
          audit trail run today on the EUDR filing engine. The passport engine
          is still being built, so every step below is marked{" "}
          <strong>planned</strong>.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE SCAN (dark, Flip-filtered)
   Three ESPR access doors read one passport (public / legitimate
   interest / authority). The doors are the same for every group.
   ============================================================= */
// One source for both the door tab and the tag printed on each field card.
// `tag` is the card's short form: the tab reads "Legitimate interest", the card
// has to fit "Legit. interest".
const SCAN_TIERS = [
  { id: "public", label: "Public", tag: "Public" },
  { id: "legit", label: "Legitimate interest", tag: "Legit. interest" },
  { id: "authority", label: "Authority", tag: "Authority" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
const SCAN_TIER_TAG = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.tag] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  // Public
  { name: "Unique product identifier", tier: "public" },
  { name: "Product category & model", tier: "public" },
  { name: "Manufacturer identity", tier: "public" },
  { name: "Country of assembly", tier: "public" },
  { name: "Material composition", tier: "public" },
  { name: "Substances of concern", tier: "public" },
  { name: "Durability & reliability class", tier: "public" },
  { name: "Reparability score", tier: "public" },
  { name: "Recycled content share", tier: "public" },
  { name: "Recyclability", tier: "public" },
  { name: "Environmental footprint", tier: "public" },
  { name: "Care & use instructions", tier: "public" },
  { name: "Safety warnings", tier: "public" },
  { name: "Warranty", tier: "public" },
  { name: "EU declaration of conformity", tier: "public" },
  // Legitimate interest
  { name: "Disassembly & repair instructions", tier: "legit" },
  { name: "Spare-part sources", tier: "legit" },
  { name: "Location of substances of concern", tier: "legit" },
  { name: "End-of-life & recycling guidance", tier: "legit" },
  { name: "Detailed material breakdown", tier: "legit" },
  // Authority
  { name: "Conformity certificates & test reports", tier: "authority" },
  { name: "Economic-operator contacts", tier: "authority" },
  { name: "Technical-documentation references", tier: "authority" },
];

const QR_FINDERS: [number, number][] = [
  [8, 8],
  [66, 8],
  [8, 66],
];
const QR_MODULES: [number, number][] = [
  [42, 10],
  [50, 10],
  [42, 18],
  [58, 18],
  [42, 34],
  [50, 42],
  [58, 34],
  [10, 42],
  [18, 42],
  [26, 50],
  [34, 42],
  [42, 50],
  [42, 66],
  [50, 74],
  [58, 66],
  [66, 50],
  [74, 42],
  [74, 58],
  [66, 74],
  [50, 58],
];

export function OthersScan() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the public door.
      gsap.utils.toArray<HTMLElement>(".ot-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "public") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ot-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-act-head", start: "top 78%" },
        });
        gsap.from(".ot-scan-qr, .ot-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-scan-body", start: "top 78%" },
        });
        gsap.from(".ot-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".ot-scan-grid", start: "top 82%" },
        });
        gsap.fromTo(
          ".ot-scan-qr-sweep",
          { y: 0, autoAlpha: 0.9 },
          {
            y: 84,
            autoAlpha: 0.9,
            duration: 1.8,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.5,
            scrollTrigger: {
              trigger: ".ot-scan-qr",
              start: "top 90%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          }
        );
      });
    },
    { scope: ref }
  );

  const selectTier = contextSafe((tier: ScanTier) => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>(".ot-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".ot-scan-tab").forEach((t) => {
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

  // Lock the grid to the tallest door (Public) so switching doors never changes
  // the section height. Re-measure once fonts load and on resize.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".ot-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".ot-scan-field")
      );
      const prev = cards.map((c) => c.style.display);
      cards.forEach((c) => {
        c.style.display = c.dataset.tier === "public" ? "flex" : "none";
      });
      grid.style.minHeight = "";
      grid.style.minHeight = `${grid.offsetHeight}px`;
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
    <section aria-label="Who reads the passport" className="ot-dark ot-scan" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="ot-act-head">
          <span className="st-eyebrow">Passport access rights</span>
          <h2 className="st-h2">One QR code shows each reader a different view.</h2>
          <p className="ot-act-sub">
            A buyer, a repairer, a customs officer. One record, a different door
            for each. It works the same whether it&apos;s a sofa, a tyre or a
            toy.
          </p>
        </div>

        <div className="ot-scan-body">
          <div className="ot-scan-qr">
            <svg
              aria-hidden="true"
              viewBox="0 0 90 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              {QR_FINDERS.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <rect
                    className="ot-scan-qr-module"
                    fill="none"
                    height={16}
                    rx={3}
                    stroke="currentColor"
                    strokeWidth={3}
                    width={16}
                    x={x}
                    y={y}
                  />
                  <rect
                    className="ot-scan-qr-module"
                    height={6}
                    rx={1}
                    width={6}
                    x={x + 5}
                    y={y + 5}
                  />
                </g>
              ))}
              {QR_MODULES.map(([x, y]) => (
                <rect
                  className="ot-scan-qr-module"
                  height={5}
                  key={`${x}-${y}`}
                  rx={1}
                  width={5}
                  x={x}
                  y={y}
                />
              ))}
              <rect
                className="ot-scan-qr-sweep"
                height={3}
                width={90}
                x={0}
                y={0}
              />
              <rect
                className="ot-scan-qr-knock"
                height={26}
                rx={6}
                width={26}
                x={32}
                y={32}
              />
              <image height={20} href="/bindu-logo.png" width={20} x={35} y={35} />
            </svg>
          </div>

          <div>
            <div className="ot-scan-tabs" role="radiogroup" aria-label="Access door">
              {SCAN_TIERS.map((t, i) => (
                <label
                  className={`ot-scan-tab${i === 0 ? " is-on" : ""}`}
                  data-tier={t.id}
                  key={t.id}
                >
                  <input
                    defaultChecked={i === 0}
                    name="ot-scan-tier"
                    onChange={() => selectTier(t.id)}
                    type="radio"
                    value={t.id}
                  />
                  {t.label}
                </label>
              ))}
            </div>

            <div className="ot-scan-grid">
              {SCAN_FIELDS.map((f) => (
                <div className="ot-scan-field" data-tier={f.tier} key={f.name}>
                  <span className="ot-scan-field-tier">
                    {SCAN_TIER_TAG.get(f.tier)}
                  </span>
                  <span className="ot-scan-field-name">{f.name}</span>
                </div>
              ))}
            </div>

            <p className="ot-scan-caption">
              Static, model data is public. The rest opens to a legitimate
              interest or an authority. The doors are the same for every product
              group, only the fields change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (ivory slab)
   Model / batch / item. Each delegated act sets its own floor.
   ============================================================= */
const GRAINS = [
  {
    name: "Model",
    tag: "The usual floor",
    accent: true,
    min: true,
    desc: "Most groups pass at model level: composition, durability, reparability, footprint. The record every unit of that model shares.",
  },
  {
    name: "Batch",
    tag: "Per production run",
    accent: false,
    min: false,
    desc: "Where a value changes run to run, the act asks for it per batch: the plant, the date, a recycled-content share.",
  },
  {
    name: "Item",
    tag: "The deep end",
    accent: false,
    min: false,
    desc: "Some acts, batteries first, push to the individual unit: a serial ID and a living record that follows that one product for life.",
  },
];

export function OthersGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ot-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-act-head", start: "top 78%" },
        });
        gsap.from(".ot-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-gran-grid", start: "top 80%" },
        });
        gsap.from(".ot-gran-note", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ot-gran-note", start: "top 88%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="How fine-grained the passport is" className="ot-slab-wrap ot-gran" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="ot-slab">
        <div className="st-container">
          <div className="ot-act-head">
            <span className="st-eyebrow">Granularity</span>
            <h2 className="st-h2">Model, batch, or item?</h2>
            <p className="ot-act-sub">
              How fine the passport goes is set by each delegated act, not by
              you. Most groups pass at <strong>model</strong> level. Some, like
              batteries, go all the way to the unit.
            </p>
          </div>

          <div className="ot-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`ot-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`ot-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="ot-gran-name">{g.name}</h3>
                <p className="ot-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <p className="ot-gran-note">
            The fields and the grain are fixed by each delegated act under ESPR
            Articles 5 and 9. Bindu is being built to fill whichever the act
            names, from the records you already keep, so a change of grain is one
            setting rather than a rebuild.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark)
   The roadmap. Two statutory dates in accent; product-group
   dates flagged indicative (Working Plan + the 18-month rule).
   ============================================================= */
const CAL_ROWS = [
  {
    when: "18 Jul 2024",
    hard: false,
    body: "ESPR enters into force. It replaces the 2009 Ecodesign Directive and extends the passport from energy products to almost everything physical.",
  },
  {
    when: "16 Apr 2025",
    hard: false,
    body: "The first Working Plan names six priority groups: textiles, furniture, mattresses, tyres, iron and steel, aluminium, plus the horizontal repair and recycled-content measures.",
  },
  {
    when: "27 May 2026",
    hard: false,
    body: "CEN-CENELEC publishes the first six horizontal DPP standards (EN 18216 and EN 18219 to 18223): the identifiers, data carriers, storage, APIs and interoperability every passport shares, whatever the product group. The Commission cited them in the Official Journal on 15 July 2026.",
  },
  {
    when: "19 Jul 2026",
    hard: true,
    flag: "Statutory",
    body: "Two things fell due at once: the EU DPP Registry, live since 20 July 2026 under Implementing Regulation (EU) 2026/1778 as the shared lookup that resolves every product's identifier, and the ban on destroying unsold textiles and footwear for large companies (Article 25).",
  },
  {
    when: "2026 to 2027",
    hard: false,
    body: "Iron and steel first, then aluminium and tyres: the first delegated acts, and the first real test of the passport outside batteries. Textiles rides the same wave and has its own page.",
  },
  {
    when: "2028 to 2029",
    hard: false,
    body: "Furniture, then mattresses, plus the horizontal measures on reparability and recycled content. Cement waits on its own conditional window, no earlier than end 2028 (Article 18(6)).",
  },
  {
    when: "1 Aug 2030",
    hard: true,
    flag: "Statutory",
    body: "The Toy Safety Regulation applies: every toy needs a passport, and it replaces the paper declaration of conformity (Regulation (EU) 2025/2509).",
  },
];

export function OthersCalendar() {
  return (
    <RegCalendar
      stageClassName="ot-dark ot-cal"
      ariaLabel="The dates already set"
      trackLabel="DPP roadmap timeline"
      eyebrow="DPP roadmap dates"
      heading="The DPP roadmap dates are public."
      sub="Two dates are fixed in statute. The product-group dates are indicative: the Commission's own plan, and each act applies about 18 months after it lands. The direction does not change."
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — THE LOOP (ivory slab)
   ESPR is a design law, not a labelling law. The passport exists
   so a product can be repaired, resold and recycled.
   ============================================================= */
const LOOP_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "Buy", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Repair", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "Resell", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Recycle", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const LOOP_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";

export function OthersLoop() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ot-loop-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-loop-body", start: "top 76%" },
        });
        gsap.from("#ot-loop-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".ot-loop-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".ot-loop-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ot-loop-ring", start: "top 70%" },
        });
        gsap.set(".ot-loop-orbit", { opacity: 1 });
        gsap.to(".ot-loop-orbit", {
          motionPath: {
            path: "#ot-loop-circle",
            align: "#ot-loop-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".ot-loop-ring",
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
    <section aria-label="Why it matters" className="ot-slab-wrap ot-loop" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="ot-slab">
        <div className="st-container">
          <div className="ot-loop-body">
            <div className="ot-loop-copy">
              <span className="st-eyebrow">Purpose</span>
              <h2 className="st-h2">What the passport is for.</h2>
              <p className="ot-loop-lead">
                ESPR is a design law. The passport exists so a product can be
                repaired, resold and recycled instead of binned.
              </p>
              <p className="ot-loop-body-text">
                A repairer needs the spare-part number and the disassembly steps.
                A recycler needs the composition and where the substances of
                concern sit. A buyer wants to know it will last. Today that
                information dies at the till. The passport is where it survives,
                for every product group, not just batteries.
              </p>
              <ul className="ot-loop-fail">
                <li>reparability hidden</li>
                <li>no spare-part source</li>
                <li>composition unknown</li>
                <li>destroyed unsold</li>
                <li>binned at end of life</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="ot-loop-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ot-loop-circle"
                d={LOOP_CIRCLE}
                id="ot-loop-circle"
              />
              {LOOP_NODES.map((n) => (
                <g className="ot-loop-node" key={n.label}>
                  <circle className="ot-loop-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="ot-loop-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="ot-loop-center" x={200} y={166}>
                the loop
              </text>
              <text className="ot-loop-center" x={200} y={182}>
                closes
              </text>
              <circle className="ot-loop-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE OPEN STANDARDS UNDERNEATH (dark)
   The same Tractus-X KITs behind the battery passport, using the
   generic DPP aspect model so any product group rides them. These
   panels describe the STANDARDS, not Bindu capabilities. Only the
   connector is wired in this repo (internal/edc). Do not restore
   any claim that Bindu "runs on" the full stack.
   ============================================================= */
const RAILS_KITS: RailsPart[] = [
  {
    id: "eco-pass",
    name: "Eco Pass",
    tag: "Circular economy",
    role: "The passport itself",
    body: "The Digital Product Passport blueprint. Its generic DPP aspect model carries any product group, and the reference viewer resolves the carrier to a public or restricted view.",
    points: ["Generic DPP aspect model", "QR / RFID carrier", "Public + restricted views"],
  },
  {
    id: "digital-twin",
    name: "Digital Twin",
    tag: "Dataspace foundation",
    role: "Discoverable twins",
    body: "Every product is a digital twin, registered so the right party can find its passport. Built on the Asset Administration Shell and a Digital Twin Registry, discovered by identifier.",
    points: ["Asset Administration Shell", "Digital Twin Registry", "Discovery by identifier"],
  },
  {
    id: "connector",
    name: "Connector · EDC",
    tag: "Dataspace foundation",
    role: "Sovereign exchange",
    body: "The Eclipse Dataspace Connector moves data between two parties under a signed contract. Each side keeps control, and a supplier's field travels only to the party entitled to read it. This is the one block Bindu has wired: a driver that publishes an asset, an access policy and a contract definition on a stock tractusx-edc connector, then negotiates a contract to read from another.",
    points: ["Contract negotiation", "Policy-controlled transfer", "Dataspace protocol"],
  },
  {
    id: "business-partner",
    name: "Business Partner",
    tag: "Dataspace foundation",
    role: "Who's who",
    body: "A verifiable identity for every company in the chain. The Business Partner Number ties a legal entity, a site and an address together, so the passport can say who made what, where.",
    points: ["BPNL · BPNS · BPNA", "Golden-record data", "Onboarding + checks"],
  },
  {
    id: "data-trust",
    name: "Data Trust & Security",
    tag: "Dataspace foundation",
    role: "The three doors",
    body: "Wallets, decentralised identifiers and verifiable credentials decide who may read what. This is what turns public, legitimate-interest and authority access into something a machine checks at the door.",
    points: ["Managed wallets", "DIDs + credentials", "Credential-gated access"],
  },
  {
    id: "circularity",
    name: "Circularity",
    tag: "Circular economy",
    role: "End of life",
    body: "The data a repairer, refurbisher or recycler needs: material composition, disassembly, and the events a product picks up on its way through repair, resale and recovery.",
    points: ["Material composition", "Disassembly / EoL", "Second-life events"],
  },
];

export function OthersRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ot-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-act-head", start: "top 80%" },
        });
        gsap.from(".ot-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".ot-rails-tablist", start: "top 84%" },
        });
        gsap.from(".ot-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ot-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The same standards, every product group" className="ot-dark ot-rails" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="ot-act-head">
          <span className="st-eyebrow">Digital product passport standards</span>
          <h2 className="st-h2">The same standards apply to every product group.</h2>
          <p className="ot-act-sub">
            Whatever the next delegated act names, the plumbing is the same.
            Bindu is being built onto <strong>Eclipse Tractus-X</strong>, the
            open dataspace stack behind Catena-X, so a new product group needs a
            new template rather than a new stack. One block is wired today: the
            connector. The rest below are the standards the passport is being
            built onto, not features you can use yet. Pick a building block.
          </p>
        </div>

        <RailsExplorer
          label="Tractus-X KITs"
          parts={RAILS_KITS}
          prefix="ot"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — CLOSE (dark)
   Bindu as the ESPR passport service provider, across every
   group at once. The next act is a template, not a rebuild.
   ============================================================= */
// Retention and language figures come from the shipped product, not from
// aspiration: pricing/price-data.ts prices five years as standard and ten as a
// paid extension, and packages/views/locales/ ships four locales. If either
// number moves, move it here too. Never restore "10 years" or "24 languages".
// A "reachable even if you cease trading" badge was removed: there is no
// escrow, custody or continuity code anywhere in the repo.
const CLOSE_BADGES = [
  { head: "One set of standards", body: "the same carrier, identifiers and registry for any product" },
  { head: "5 years", body: "the standard retention term, ten years on request" },
  { head: "4 languages", body: "English, German, Spanish and Dutch today" },
  { head: "A template", body: "a new act is only a new form" },
];

export function OthersClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ot-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ot-act-head", start: "top 80%" },
        });
        gsap.from(".ot-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ot-close-badges", start: "top 85%" },
        });
        gsap.from(".ot-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ot-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".ot-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".ot-close-arrow");
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
    <section aria-label="Who files it" className="ot-dark ot-close" ref={ref}>
      <div className="st-container">
        <div className="ot-act-head">
          <span className="st-eyebrow">Operator responsibility</span>
          <h2 className="st-h2">Whoever places it on the market keeps the passport.</h2>
          <p className="ot-act-sub">
            ESPR names an independent <strong>passport service provider</strong>{" "}
            to run the DPP for the operator. That is the role Bindu is building
            for, across every group at once. The passport engine is not live yet,
            so what we can do today is tell you which fields your delegated act
            will ask for and which of them you already hold.
          </p>
        </div>

        <div className="ot-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="ot-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="ot-close-grid">
          <DemoCtaLink
            className="ot-close-panel is-primary"
            source="dpp-others-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>Bring one product. Leave knowing which passport fields you can already answer and which you cannot.</p>
            <span aria-hidden="true" className="ot-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
          <Link className="ot-close-panel" href="/dpp/battery">
            <h3>The Battery Passport</h3>
            <p>The first DPP to bind, live in full on its own page.</p>
            <span aria-hidden="true" className="ot-close-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
