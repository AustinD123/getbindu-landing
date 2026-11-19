"use client";

/**
 * Textile DPP story — animated acts for /dpp/textiles.
 *
 * Act 2 (THE PROBLEM) dramatises the JRC report's Box 1: "the data is born
 * upstream, but the legal duty sits downstream." A supply chain draws itself
 * across the film (DrawSVG), data packets stream down to the importer who owes
 * the passport (MotionPath), the four hard numbers count up, and the report's
 * verdict inks in word by word (SplitText + scrub) — the home guard-statement
 * effect. Every element is authored in its final state so no-JS, reduced-motion
 * and crawlers see the whole thing; GSAP animates from hidden states inside a
 * matchMedia context only.
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
import "./textiles-story.css";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Flip
);

// The chain a garment travels: origin → tiers 3/2/1 → the importer who,
// under ESPR, must create, register and maintain the DPP. y is fixed; the
// path threads every node.
const NODES = [
  { x: 95, name: "Cotton", tier: "Origin" },
  { x: 298, name: "Yarn", tier: "Tier 3" },
  { x: 500, name: "Fabric", tier: "Tier 2" },
  { x: 702, name: "Garment", tier: "Tier 1" },
  { x: 905, name: "Importer", tier: "Owes the DPP", duty: true },
];
const NODE_Y = 190;
const FLOW_PATH = `M95 ${NODE_Y} L298 ${NODE_Y} L500 ${NODE_Y} L702 ${NODE_Y} L905 ${NODE_Y}`;

// Faint dots that rise off the opaque upstream tiers and dissolve — the
// information that "gets lost here", held as Confidential Business Information.
const LOST_DOTS = [
  { x: 150, y: 168 },
  { x: 250, y: 174 },
  { x: 355, y: 166 },
  { x: 445, y: 172 },
  { x: 540, y: 168 },
];

// The four numbers from the report. data-to drives the count-up; the authored
// text is the final value so no-JS readers see the real figure.
const STATS = [
  { to: 15, suffix: "+", label: "economic operators behind one garment" },
  { to: 80, suffix: "%", label: "of EU garments are imported" },
  { to: 99, suffix: "%", label: "of the supply chain are SMEs" },
  { to: 0, suffix: "", label: "APIs. It travels by email and PDF" },
];

export function TextilesProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        // Head + lead rise in.
        gsap.from(".tx-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-problem-head", start: "top 80%" },
        });

        // The chain draws itself, nodes settle in, the CBI bracket draws.
        gsap.from(".tx-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".tx-flow", start: "top 78%" },
        });
        gsap.from("#tx-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".tx-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".tx-lost-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".tx-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        // Data packets stream down the chain into the importer, on a loop that
        // idles while the section is off screen.
        gsap.set(".tx-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".tx-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#tx-flow-path",
              align: "#tx-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".tx-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        // Upstream information rises off the chain and fades — lost.
        gsap.utils.toArray<SVGCircleElement>(".tx-lost-dot").forEach((d, i) => {
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
                trigger: ".tx-flow",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            }
          );
        });

        // The four numbers count up.
        gsap.utils.toArray<HTMLElement>(".tx-stat-num").forEach((el) => {
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
            scrollTrigger: { trigger: ".tx-stats", start: "top 82%" },
          });
        });

        // The verdict brightens word by word as it crosses the viewport.
        SplitText.create(".tx-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".tx-verdict-quote",
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
    <section aria-label="The problem" className="tx-problem" ref={ref}>
      <div className="st-container">
        <div className="tx-problem-head">
          <span className="st-eyebrow">Textile passport data</span>
          <h2 className="st-h2">
            The data comes from the supply chain, but the operator answers for it.
          </h2>
          <p className="tx-problem-lead">
            One garment passes through{" "}
            <strong>fifteen hands</strong> before it reaches a shelf. Each one
            knows only the supplier beside it. Fibre, chemistry, origin,
            footprint: the proof a passport needs is scattered up a chain that
            guards every link as a trade secret. The law hands the whole bill to{" "}
            <strong>the last name in the chain</strong>: the economic operator,
            whoever places the garment on the EU market, brand or importer.
          </p>
        </div>

        <div className="tx-flow">
          <svg
            aria-hidden="true"
            className="tx-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* the chain */}
            <path className="tx-flow-path" d={FLOW_PATH} id="tx-flow-path" />

            {/* the opaque-upstream bracket */}
            <path
              className="tx-lost-bracket"
              d="M95 128 L95 116 L590 116 L590 128"
            />
            <text className="tx-lost-label" x="342" y="104">
              Opaque upstream. Held as Confidential Business Information
            </text>

            {/* information rising off the chain and dissolving */}
            {LOST_DOTS.map((d) => (
              <circle
                className="tx-lost-dot"
                cx={d.x}
                cy={d.y}
                key={`${d.x}-${d.y}`}
                r={3}
              />
            ))}

            {/* nodes */}
            {NODES.map((n) => (
              <g className="tx-node" key={n.name}>
                <text className="tx-node-name" x={n.x} y={152}>
                  {n.name}
                </text>
                <circle
                  className={`tx-node-dot${n.duty ? " is-duty" : ""}`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`tx-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {n.tier}
                </text>
              </g>
            ))}

            {/* data packets streaming to the importer */}
            {[0, 1, 2].map((i) => (
              <circle
                className="tx-packet"
                cx={95}
                cy={NODE_Y}
                key={i}
                r={5}
              />
            ))}
          </svg>
          {/* The chain in words. The diagram is a 1000-unit viewBox scaled to
              the column, so at 375px its 16px labels render near 5px, and it is
              aria-hidden, so a screen reader gets nothing from it either. This
              list is the text alternative at every width and the only rendering
              of the chain below 700px. */}
          <ol className="tx-flow-list">
            {NODES.map((n) => (
              <li key={n.name}>
                <strong>{n.name}</strong>
                <span>{n.tier}</span>
              </li>
            ))}
          </ol>
          <p className="tx-flow-caption">
            Brands see only tier-1. Tier-2, tier-3 and origin stay dark. No
            APIs. Just PDF certificates, re-typed into every buyer&apos;s portal.
          </p>
        </div>

        <div className="tx-stats">
          {STATS.map((s) => (
            <div className="tx-stat" key={s.label}>
              <span
                className={`tx-stat-num${s.to === 0 ? " is-zero" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="tx-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="tx-verdict">
          <p className="tx-verdict-quote">
            The challenge is not the availability of data. It is the absence of
            standardised formats, interoperable systems, and scalable digital
            workflows.
          </p>
          <span className="tx-verdict-cite">
            JRC · Study on DPP content for textile apparel
          </span>
        </div>
      </div>
    </section>
  );
}

// Act 3 — the seven steps that turn a scattered chain into one passport.
// Each maps a JRC/ESPR mechanism onto a planned Bindu move. The textile
// passport engine is NOT built: no template, no carrier minting, no registry
// client, no public passport page. Every step is marked planned and must stay
// that way until the engine exists. See the act sub for the disclosure.
const FLOW_STEPS = [
  {
    n: "01",
    label: "Ask",
    head: "Ask each tier for the one field it holds.",
    body: "Bindu runs supplier collection this way for EUDR today. One request per supplier, tier-1 down to the raw material, each asked for a single field in the language they answer in.",
    tag: "Planned",
    chips: ["fibre %", "dye lot", "facility GLN", "test report", "recycled cert"],
  },
  {
    n: "02",
    label: "Normalise",
    head: "Turn PDFs and email threads into identifiers.",
    body: "Answers map onto the EN 18219 identity model, so nobody re-keys the same certificate into ten portals again.",
    tag: "Planned",
    chips: ["SGTIN", "GTIN + lot", "Party GLN", "EORI", "HS6 · TARIC10"],
  },
  {
    n: "03",
    label: "Verify",
    head: "Recalculate. Don't just trust.",
    body: "The figures an authority is entitled to recompute get recomputed before they are published: robustness, footprint, recycled share. Certificates attach where the rules demand them.",
    tag: "Planned",
    chips: ["ISO 15487 robustness", "PEFCR footprint", "ISO 14021 recycled %", "GRS · GOTS"],
  },
  {
    n: "04",
    label: "Assemble",
    head: "Fill the four content categories.",
    body: "The JRC's four buckets: identification, producer, product information, compliance. Each filled at the right grain. Batch the floor, model the default, item when it helps.",
    tag: "Planned",
    chips: ["identification", "producer", "product info", "compliance docs"],
  },
  {
    n: "05",
    label: "Register",
    head: "One identifier to Brussels. The data stays yours.",
    body: "The identifier goes to the EU DPP Registry, live since 20 July 2026 under Implementing Regulation (EU) 2026/1778. The content stays with you, or your passport service provider. Nothing sensitive sits on an EU server.",
    tag: "Planned",
    chips: ["UPI → EU Registry", "UOI", "UFI", "decentralised content"],
  },
  {
    n: "06",
    label: "Carrier",
    head: "Put a durable link on the garment.",
    body: "A carrier fixed to the garment, QR, RFID or NFC, that survives the wash and still resolves years after the sale. Bindu mints no carriers today.",
    tag: "Planned",
    chips: ["QR", "RFID", "NFC", "wash-durable"],
  },
  {
    n: "07",
    label: "Publish",
    head: "One passport, three doors.",
    body: "The record goes live with three doors: public for shoppers, legitimate interest for recyclers, authority for customs. Verifiable credentials hold the line. There is no public passport page yet.",
    tag: "Planned",
    chips: ["Public", "Legitimate interest", "Authority", "Credential-gated"],
  },
];

export function TextilesFlow() {
  return (
    <RegulationFlow
      ariaLabel="How the passport is assembled"
      eyebrow="Textile passport process"
      heading="The seven steps to a textile passport."
      sub={
        <>
          The law asks one company for a record it doesn&apos;t hold. This is
          how Bindu is building it, in <strong>seven moves</strong>. Supplier
          collection, evidence and the audit trail run today on the EUDR filing
          engine. The textile passport engine is still being built, so every
          step below is marked <strong>planned</strong>.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE SCAN (access tiers, Flip-filtered)
   Three doors read one passport. Tabs filter the field grid to
   what each access tier may see (JRC Table 14).
   ============================================================= */
// `label` names the tier on its tab; `tag` is the shorter form the field cards
// print, so the two are carried side by side rather than duplicated in a
// second lookup.
const SCAN_TIERS = [
  { id: "public", label: "Public", tag: "Public" },
  { id: "legit", label: "Legitimate interest", tag: "Legit. interest" },
  { id: "authority", label: "Authority", tag: "Authority" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
// One source for the tag printed on each field card.
const SCAN_TIER_LABEL = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.tag] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  { name: "Unique product identifier", tier: "public" },
  { name: "Product category", tier: "public" },
  { name: "Producer identity", tier: "public" },
  { name: "Fibre composition", tier: "public" },
  { name: "Robustness score", tier: "public" },
  { name: "Recyclability score", tier: "public" },
  { name: "Recycled / organic %", tier: "public" },
  { name: "Substances of concern + concentration", tier: "public" },
  { name: "Carbon footprint class", tier: "public" },
  { name: "Care & repair info", tier: "public" },
  { name: "Warranty", tier: "public" },
  { name: "Location of substances of concern", tier: "legit" },
  { name: "Disassembly / end-of-life info", tier: "legit" },
  { name: "Absolute footprint value", tier: "legit" },
  { name: "Footprint calculation parameters", tier: "legit" },
  { name: "Recycled & organic weights", tier: "legit" },
  { name: "Economic-operator contacts", tier: "authority" },
  { name: "Conformity certificates & declarations", tier: "authority" },
  { name: "Appended inspection reports", tier: "authority" },
];

// A small decorative data-carrier motif (aria-hidden).
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

export function TextilesScan() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the public door.
      gsap.utils.toArray<HTMLElement>(".tx-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "public") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tx-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-act-head", start: "top 78%" },
        });
        gsap.from(".tx-scan-qr, .tx-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-scan-body", start: "top 78%" },
        });
        gsap.from(".tx-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".tx-scan-grid", start: "top 82%" },
        });
        // The scanner sweep loops down the carrier.
        gsap.fromTo(
          ".tx-scan-qr-sweep",
          { y: 0, autoAlpha: 0.9 },
          {
            y: 84,
            autoAlpha: 0.9,
            duration: 1.8,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.5,
            scrollTrigger: {
              trigger: ".tx-scan-qr",
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
    const cards = gsap.utils.toArray<HTMLElement>(".tx-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".tx-scan-tab").forEach((t) => {
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

  // Lock the grid to the tallest door (Public) so switching tiers never
  // changes the section height. Re-measure once fonts load and on resize.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".tx-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".tx-scan-field")
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
    <section aria-label="Who reads the passport" className="tx-dark tx-scan" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="tx-act-head">
          <span className="st-eyebrow">Passport access rights</span>
          <h2 className="st-h2">One QR code shows each reader a different view.</h2>
          <p className="tx-act-sub">
            A shopper, a recycler, a customs officer. Same record, a different
            page for each. Pick a door. Watch the fields change.
          </p>
        </div>

        <div className="tx-scan-body">
          <div className="tx-scan-qr">
            <svg
              aria-hidden="true"
              viewBox="0 0 90 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              {QR_FINDERS.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <rect
                    className="tx-scan-qr-module"
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
                    className="tx-scan-qr-module"
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
                  className="tx-scan-qr-module"
                  height={5}
                  key={`${x}-${y}`}
                  rx={1}
                  width={5}
                  x={x}
                  y={y}
                />
              ))}
              <rect
                className="tx-scan-qr-sweep"
                height={3}
                width={90}
                x={0}
                y={0}
              />
              {/* Bindu mark in the centre: this is a Bindu passport. */}
              <rect
                className="tx-scan-qr-knock"
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
            <div className="tx-scan-tabs" role="radiogroup" aria-label="Access door">
              {SCAN_TIERS.map((t, i) => (
                <label
                  className={`tx-scan-tab${i === 0 ? " is-on" : ""}`}
                  data-tier={t.id}
                  key={t.id}
                >
                  <input
                    defaultChecked={i === 0}
                    name="tx-scan-tier"
                    onChange={() => selectTier(t.id)}
                    type="radio"
                    value={t.id}
                  />
                  {t.label}
                </label>
              ))}
            </div>

            <div className="tx-scan-grid">
              {SCAN_FIELDS.map((f) => (
                <div className="tx-scan-field" data-tier={f.tier} key={f.name}>
                  <span className="tx-scan-field-tier">
                    {SCAN_TIER_LABEL.get(f.tier)}
                  </span>
                  <span className="tx-scan-field-name">{f.name}</span>
                </div>
              ))}
            </div>

            <p className="tx-scan-caption">
              Each door inherits the ones above it. Verifiable credentials hold
              the tiers. No login leaks the recycler&apos;s view to a shopper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (model / batch / item)
   The key cost driver (JRC Table 13). Batch is the floor; item
   is voluntary via the inheritance model. Plus the consumer
   reality check (YouGov 2021).
   ============================================================= */
const GRAINS = [
  {
    name: "Model",
    tag: "By default",
    accent: false,
    min: false,
    desc: "Fixed by design: fibre composition, recyclability, footprint class, care. What shoppers compare at the point of sale.",
  },
  {
    name: "Batch",
    tag: "The minimum",
    accent: true,
    min: true,
    desc: "The floor the law asks for. Producer, dye chemistry, self-declared tests. The things that change from run to run.",
  },
  {
    name: "Item",
    tag: "Voluntary",
    accent: false,
    min: false,
    desc: "A serial ID, assigned early and cheap. Then fed events as they happen: repair, resale, recycling. The inheritance model.",
  },
];
const CONSUMER_BARS = [
  { label: "Price", pct: 68, low: false },
  { label: "Quality", pct: 61, low: false },
  { label: "Fit", pct: 56, low: false },
  { label: "Longevity", pct: 30, low: false },
  { label: "Fibre type", pct: 24, low: true },
  { label: "Environment", pct: 15, low: true },
];

export function TextilesGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tx-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-act-head", start: "top 78%" },
        });
        gsap.from(".tx-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-gran-grid", start: "top 80%" },
        });
        gsap.from(".tx-gran-bar-row", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".tx-gran-chart", start: "top 82%" },
        });
        gsap.fromTo(
          ".tx-gran-bar-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".tx-gran-chart", start: "top 82%" },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="How fine-grained the passport is" className="tx-slab-wrap tx-gran" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="tx-slab">
        <div className="st-container">
          <div className="tx-act-head">
            <span className="st-eyebrow">Granularity</span>
            <h2 className="st-h2">Model, batch, or item?</h2>
            <p className="tx-act-sub">
              How fine you go is the whole cost question. The JRC settles it:{" "}
              <strong>batch is the floor</strong>, model the default, item a
              voluntary head start.
            </p>
          </div>

          <div className="tx-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`tx-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`tx-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="tx-gran-name">{g.name}</h3>
                <p className="tx-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <figure className="tx-gran-chart">
            <figcaption className="tx-gran-chart-head">
              <h3 className="tx-gran-chart-title">
                What people actually buy on.
              </h3>
              <span className="tx-gran-chart-note">
                YouGov 2021 · 11,483 people
              </span>
            </figcaption>
            <div>
              {CONSUMER_BARS.map((b) => (
                <div className="tx-gran-bar-row" key={b.label}>
                  <span className="tx-gran-bar-label">{b.label}</span>
                  <span className="tx-gran-bar-track">
                    <span
                      className={`tx-gran-bar-fill${b.low ? " is-low" : ""}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </span>
                  <span className="tx-gran-bar-val">{b.pct}%</span>
                </div>
              ))}
            </div>
            <p className="tx-scan-caption" style={{ marginTop: 22 }}>
              82% still find the environmental labels useless, lost among 297
              ecolabels. The real hunger is downstream. At the recycler.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dated milestones)
   ============================================================= */
const CAL_ROWS = [
  {
    when: "18 Jul 2024",
    hard: false,
    body: "ESPR (Regulation (EU) 2024/1781) enters into force. It creates the Digital Product Passport as a framework; the rules for each product group follow one at a time, by delegated act.",
  },
  {
    when: "16 Apr 2025",
    hard: false,
    body: "The first ESPR working plan (2025 to 2030) is adopted. Textiles and apparel are ranked the top-priority product group, ahead of furniture, tyres, iron and steel, and aluminium.",
  },
  {
    when: "27 May 2026",
    hard: false,
    body: "CEN-CENELEC publishes the first six horizontal DPP standards, EN 18216 and EN 18219 to 18223: the identifiers, data carriers, storage, APIs and interoperability every passport is built on. The textile-specific fields still come later, in the delegated act.",
  },
  {
    when: "19 Jul 2026",
    hard: true,
    flag: "Hard date",
    body: "The deadline for the EU's central DPP Registry to be operational (ESPR Article 13), 24 months after entry into force. It went live on 20 July 2026 under Implementing Regulation (EU) 2026/1778: the authoritative directory that resolves a product's identifier to where its passport data is held. The same date starts the first concrete textile obligation, the ban on large companies destroying unsold clothing.",
  },
  {
    when: "2027",
    hard: false,
    flag: "Expected",
    body: "The ESPR textile delegated act is due, per the working plan. This is the act that fixes the passport's data fields, its carrier and its granularity for textiles, in law. Until it lands, the exact contents stay provisional.",
  },
  {
    when: "~2028",
    hard: false,
    body: "First textile passports become mandatory in practice. A delegated act applies after a transition period, typically around 18 months, so the obligation bites roughly a year and a half after the act is adopted.",
  },
];

export function TextilesCalendar() {
  return (
    <RegCalendar
      stageClassName="tx-dark tx-cal"
      ariaLabel="The dates already set"
      trackLabel="Textile passport deadline timeline"
      eyebrow="Textile passport deadlines"
      heading="The textile passport clock is already running."
      sub="The passport lands around 2028. The scaffolding is going up now. One of these dates is fixed in law. The rest move with the delegated act."
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — THE LOOP (why it matters: end of life)
   ============================================================= */
// Dots sit on the ring; labels are pushed outside it with a per-node anchor so
// none of the words cross the circle. Wider viewBox leaves room for the side
// labels (Repair / Recycle).
const LOOP_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "Reuse", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Repair", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "Resale", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Recycle", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const LOOP_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";

export function TextilesLoop() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tx-loop-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-loop-body", start: "top 76%" },
        });
        gsap.from("#tx-loop-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".tx-loop-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".tx-loop-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".tx-loop-ring", start: "top 70%" },
        });
        gsap.set(".tx-loop-orbit", { opacity: 1 });
        gsap.to(".tx-loop-orbit", {
          motionPath: {
            path: "#tx-loop-circle",
            align: "#tx-loop-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".tx-loop-ring",
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
    <section aria-label="Why it matters" className="tx-slab-wrap tx-loop" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="tx-slab">
        <div className="st-container">
          <div className="tx-loop-body">
            <div className="tx-loop-copy">
              <span className="st-eyebrow">Recycling and resale</span>
              <h2 className="st-h2">The passport stays with the garment after the sale.</h2>
              <p className="tx-loop-lead">
                End-of-life is where the passport earns its keep. It is also
                where today&apos;s tools go blind.
              </p>
              <p className="tx-loop-body-text">
                Recycling&apos;s infrared scanners can&apos;t read blends,
                layered garments, materials under 5%, or dark colours. Printed
                labels fade or get cut out. One thing survives the wash and still
                names every fibre. The passport.
              </p>
              <ul className="tx-loop-fail">
                <li>NIR fails on blends</li>
                <li>multi-layer</li>
                <li>minerals &lt; 5%</li>
                <li>dark colours</li>
                <li>faded labels</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="tx-loop-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="tx-loop-circle"
                d={LOOP_CIRCLE}
                id="tx-loop-circle"
              />
              {LOOP_NODES.map((n) => (
                <g className="tx-loop-node" key={n.label}>
                  <circle className="tx-loop-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="tx-loop-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="tx-loop-center" x={200} y={166}>
                the loop
              </text>
              <text className="tx-loop-center" x={200} y={182}>
                closes
              </text>
              <circle className="tx-loop-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE OPEN STANDARDS UNDERNEATH
   Eclipse Tractus-X KITs ("Keep It Together"), each one packaging
   the standards, semantic models, APIs and reference code for one
   job. This act describes the standards the passport is being
   built onto, not shipped Bindu features.
   ============================================================= */
// Only the Tractus-X KITs a textile passport actually needs. Each is a
// clickable tab; tag = KIT category, role = one-liner, body + points fill the
// detail panel. (CBAM and Customs dropped: carbon-border / customs concerns,
// not textiles.) Names omit the repeated "KIT" suffix; the intro sets that.
// These panels describe the STANDARDS, not Bindu capabilities. Only the
// connector is wired in this repo (internal/edc). Do not restore any claim
// that Bindu "runs on" the full stack.
const RAILS_KITS: RailsPart[] = [
  {
    id: "eco-pass",
    name: "Eco Pass",
    tag: "Cross-industry",
    role: "The passport itself",
    body: "The Digital Product Passport blueprint: the data model a garment's passport is built from, the carrier it binds to, and the public page it resolves to when someone scans it.",
    points: ["DPP aspect models", "Data-carrier binding", "Public + restricted views"],
  },
  {
    id: "connector",
    name: "Connector · EDC",
    tag: "Dataspace foundation",
    role: "Sovereign exchange",
    body: "The Eclipse Dataspace Connector moves data between two parties under a signed contract. One up, one down: each side keeps control, and a name never travels further than it has to. This is the one block Bindu has wired: a driver that publishes an asset, an access policy and a contract definition on a stock tractusx-edc connector, then negotiates a contract to read from another.",
    points: ["Contract negotiation", "Policy-controlled transfer", "Dataspace protocol"],
  },
  {
    id: "digital-twin",
    name: "Digital Twin",
    tag: "Dataspace foundation",
    role: "Discoverable twins",
    body: "Every passport is a digital twin, registered so the right party can find it. Built on the Asset Administration Shell and a Digital Twin Registry.",
    points: ["Digital Twin Registry", "AAS submodels", "Discovery by identifier"],
  },
  {
    id: "business-partner",
    name: "Business Partner",
    tag: "Dataspace foundation",
    role: "Who's who",
    body: "A verifiable identity for every company in the chain. The Business Partner Number ties an operator, a facility and a role together, so a passport can say who made what, where.",
    points: ["BPNL / BPNS numbers", "Golden-record data", "Onboarding + checks"],
  },
  {
    id: "data-trust",
    name: "Data Trust & Security",
    tag: "Dataspace foundation",
    role: "The three doors",
    body: "Wallets, decentralised identifiers and verifiable credentials decide who may read what. This is what turns public, legitimate-interest and authority access into something a machine checks.",
    points: ["Managed wallets", "DIDs + credentials", "Role-based access"],
  },
  {
    id: "traceability",
    name: "Traceability",
    tag: "Industry core",
    role: "The chain",
    body: "Part-chain traceability across tiers: how a finished garment links to the batches and materials it came from, without exposing the whole chain to any single party.",
    points: ["Serial / batch chains", "One-up / one-down", "Provenance + quality"],
  },
  {
    id: "circularity",
    name: "Circularity",
    tag: "Cross-industry",
    role: "End of life",
    body: "The data a recycler or second-life operator needs: composition, disassembly, and the events a garment picks up on its way back through repair, resale and recycling.",
    points: ["Material composition", "Disassembly / EoL", "Second-life events"],
  },
];

export function TextilesRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tx-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-act-head", start: "top 80%" },
        });
        gsap.from(".tx-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".tx-rails-tablist", start: "top 84%" },
        });
        gsap.from(".tx-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tx-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The open standards underneath" className="tx-dark tx-rails" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="tx-act-head">
          <span className="st-eyebrow">Digital product passport standards</span>
          <h2 className="st-h2">The open standards underneath.</h2>
          <p className="tx-act-sub">
            Bindu is being built onto the EU&apos;s own open standards rather
            than a private format. They come from{" "}
            <strong>Eclipse Tractus-X</strong>, the open dataspace stack the
            German car industry already ships its supply chains on, and its
            building blocks are KITs, &ldquo;Keep It Together&rdquo;. One of them
            is wired today: the connector. Bindu drives a stock Eclipse Dataspace
            Connector, and the other blocks below are the standards the passport
            is being built onto, not features you can use yet. Pick one to see
            the job it does.
          </p>
        </div>

        <RailsExplorer
          label="Tractus-X KITs"
          parts={RAILS_KITS}
          prefix="tx"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — WHO FILES IT / CLOSE
   Bindu as the ESPR passport service provider (Article 2), the
   unglamorous differentiators, and the magnetic CTA panels.
   ============================================================= */
// Retention and language figures come from the shipped product, not from
// aspiration: pricing/price-data.ts prices five years as standard and ten as a
// paid extension, and packages/views/locales/ ships four locales. If either
// number moves, move it here too. Never restore "10 years" or "24 languages".
// What the regulation demands of whoever runs the passport (mirrors the
// battery close): never present-tense service promises for an unbuilt engine.
const CLOSE_BADGES = [
  { head: "5 years", body: "the standard retention term, ten years on request" },
  { head: "4 languages", body: "English, German, Spanish and Dutch today" },
  { head: "Full audit", body: "versioned, append-only history" },
  { head: "Shared liability", body: "what the rules assign importer and maker" },
  { head: "No greenwashing", body: "what Article 7 demands of voluntary claims" },
];

export function TextilesClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tx-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".tx-act-head", start: "top 80%" },
        });
        gsap.from(".tx-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".tx-close-badges", start: "top 85%" },
        });
        gsap.from(".tx-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".tx-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".tx-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".tx-close-arrow");
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
    <section aria-label="Who files it" className="tx-dark tx-close" ref={ref}>
      <div className="st-container">
        <div className="tx-act-head">
          <span className="st-eyebrow">Operator responsibility</span>
          <h2 className="st-h2">Start with one garment.</h2>
          <p className="tx-act-sub">
            ESPR names an independent{" "}
            <strong>passport service provider</strong> to run the DPP for the
            operator. That is the role Bindu is building for. The unglamorous
            commitments below are what make a passport provider trustworthy.
          </p>
        </div>

        <div className="tx-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="tx-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="tx-close-grid">
          <DemoCtaLink
            className="tx-close-panel is-primary"
            source="dpp-textiles-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>Bring one garment. Leave knowing which passport fields you can already answer and which you cannot.</p>
            <span aria-hidden="true" className="tx-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
          <Link className="tx-close-panel" href="/dpp/others">
            <h3>Every product group</h3>
            <p>Batteries today, textiles next, the rest of the economy behind them.</p>
            <span aria-hidden="true" className="tx-close-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
