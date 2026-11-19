"use client";

/**
 * Battery DPP story — animated acts for /dpp/battery.
 *
 * Mirrors the textiles story's spine (bindu-landing-story → reg pages) but
 * tells the battery-passport version: the record is per INDIVIDUAL unit, born
 * across a mine-to-module chain, split across the four Annex XIII access points,
 * and it outlives the sale. Every fact traces to Regulation (EU) 2023/1542, the
 * Battery Pass consortium's Content Guidance, or the Eclipse Tractus-X KITs.
 *
 * Every element is authored in its final visible state so no-JS, reduced-motion
 * and crawlers see the whole page; GSAP animates FROM hidden states inside a
 * matchMedia("(prefers-reduced-motion: no-preference)") context only. Scoped
 * .bt-* — a distinct prefix from textiles' .tx-* so the two DPP pages never
 * bleed into one another during client-side navigation.
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
import "./battery-story.css";

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
   "Born in the ground. Owed at the pack." The passport wants
   chemistry, carbon, sourcing and a living state of health that
   sit across a mine-to-module chain — per individual battery.
   ============================================================= */
// The chain a cell travels: mine → refiner → cell → pack → the producer who,
// under Article 77, must create, register and maintain the passport per unit.
const NODES = [
  { x: 95, name: "Mine", tier: "Cobalt · lithium" },
  { x: 298, name: "Refiner", tier: "Active material" },
  { x: 500, name: "Cell", tier: "Cathode · anode" },
  { x: 702, name: "Pack", tier: "Module · BMS" },
  { x: 905, name: "Producer", tier: "Owes the passport", duty: true },
];
const NODE_Y = 190;
const FLOW_PATH = `M95 ${NODE_Y} L298 ${NODE_Y} L500 ${NODE_Y} L702 ${NODE_Y} L905 ${NODE_Y}`;

const LOST_DOTS = [
  { x: 150, y: 168 },
  { x: 250, y: 174 },
  { x: 355, y: 166 },
  { x: 445, y: 172 },
  { x: 540, y: 168 },
];

// The four numbers. data-to drives the count-up; the authored text is the
// final value so no-JS readers see the real figure.
const STATS = [
  { to: 80, suffix: "+", accent: false, label: "mandatory data attributes behind a single EV battery" },
  { to: 4, suffix: "", accent: false, label: "access points Annex XIII writes into one record" },
  { to: 2, suffix: " kWh", accent: false, label: "the capacity above which every industrial battery needs a passport" },
  { to: 0, suffix: "", accent: true, label: "of your suppliers share that data through a system today. It rides certificates and spreadsheets" },
];

export function BatteryProblem() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        gsap.from(".bt-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-problem-head", start: "top 80%" },
        });

        gsap.from(".bt-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".bt-flow", start: "top 78%" },
        });
        gsap.from("#bt-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".bt-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".bt-lost-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".bt-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        gsap.set(".bt-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".bt-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#bt-flow-path",
              align: "#bt-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".bt-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<SVGCircleElement>(".bt-lost-dot").forEach((d, i) => {
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
                trigger: ".bt-flow",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".bt-stat-num").forEach((el) => {
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
            scrollTrigger: { trigger: ".bt-stats", start: "top 82%" },
          });
        });

        SplitText.create(".bt-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".bt-verdict-quote",
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
    <section aria-label="The problem" className="bt-problem" ref={ref}>
      <div className="st-container">
        <div className="bt-problem-head">
          <span className="st-eyebrow">Battery passport data</span>
          <h2 className="st-h2">The data starts at the mine, but the operator answers for all of it.</h2>
          <p className="bt-problem-lead">
            One EV battery is a mine, a refiner, a cell line and a pack plant,
            strung across three continents. Each holds one slice: the
            cobalt&apos;s origin, the cell&apos;s carbon, the plant&apos;s
            recycled share, the pack&apos;s living state of health. From{" "}
            <strong>18 February 2027</strong> the law wants{" "}
            <strong>all of it, per individual battery</strong>, and it sends the
            bill to the last name on the pack. That last name is the economic
            operator: whoever places the battery on the EU market.
          </p>
        </div>

        <div className="bt-flow">
          <svg
            aria-hidden="true"
            className="bt-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="bt-flow-path" d={FLOW_PATH} id="bt-flow-path" />

            <path
              className="bt-lost-bracket"
              d="M95 128 L95 116 L590 116 L590 128"
            />
            <text className="bt-lost-label" x="342" y="104">
              Chemistry, carbon and origin. Scattered across borders and tiers
            </text>

            {LOST_DOTS.map((d) => (
              <circle
                className="bt-lost-dot"
                cx={d.x}
                cy={d.y}
                key={`${d.x}-${d.y}`}
                r={3}
              />
            ))}

            {NODES.map((n) => (
              <g className="bt-node" key={n.name}>
                <text className="bt-node-name" x={n.x} y={152}>
                  {n.name}
                </text>
                <circle
                  className={`bt-node-dot${n.duty ? " is-duty" : ""}`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`bt-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {n.tier}
                </text>
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle
                className="bt-packet"
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
          <ol className="bt-flow-list">
            {NODES.map((n) => (
              <li key={n.name}>
                <strong>{n.name}</strong>
                <span>{n.tier}</span>
              </li>
            ))}
          </ol>
          <p className="bt-flow-caption">
            The operator sees the pack. The cell&apos;s carbon, the
            refiner&apos;s mix, the mine&apos;s origin: all of it stays upstream.
            No shared record. Just certificates, re-typed into every
            buyer&apos;s portal.
          </p>
        </div>

        <div className="bt-stats">
          {STATS.map((s) => (
            <div className="bt-stat" key={s.label}>
              <span
                className={`bt-stat-num${s.accent ? " is-accent" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="bt-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bt-verdict">
          <p className="bt-verdict-quote">
            All information in the battery passport shall be based on open
            standards, in an interoperable format, transferable without vendor
            lock-in, machine-readable, structured and searchable.
          </p>
          <span className="bt-verdict-cite">
            Regulation (EU) 2023/1542 · Article 77(5)
          </span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE FLOW (ivory slab)
   The seven moves that turn a scattered chain into one passport.
   This is the design of the battery passport engine, which is not
   built yet. Every step is written as planned work, never as a
   shipped capability. See the act sub for the standing disclosure.
   ============================================================= */
const FLOW_STEPS = [
  {
    n: "01",
    label: "Ask",
    head: "Ask each tier for the one field it holds.",
    body: "Bindu runs supplier collection this way for EUDR today. One request per party, pack plant down to the mine, each asked for the single field it holds in the format it already keeps.",
    chips: ["cell chemistry", "carbon activity data", "recycled %", "mine of origin", "test report"],
    tag: "Planned",
  },
  {
    n: "02",
    label: "Normalise",
    head: "Turn certificates and spreadsheets into identifiers.",
    body: "Answers map onto the Catena-X Battery Pass aspect model, so nobody re-keys the same mill certificate into ten portals again.",
    chips: ["ISO/IEC 15459 UID", "BPNL party", "GS1 Digital Link", "battery_pass 6.0.0"],
    tag: "Planned",
  },
  {
    n: "03",
    label: "Verify",
    head: "Recalculate. Don't just trust.",
    body: "The figures an authority is entitled to recompute get recomputed before they are published, not taken on trust: the carbon footprint per kWh, the recycled-content share, the due-diligence coverage. Third-party reports attach where Articles 8 and 48 demand them.",
    chips: ["CO₂e / kWh", "recycled share", "due-diligence report", "PEF method"],
    tag: "Planned",
  },
  {
    n: "04",
    label: "Assemble",
    head: "Fill the seven content clusters.",
    body: "The Battery Pass consortium's seven buckets: general info, compliance, carbon, due diligence, materials, circularity, performance. Each field placed at model, batch or unit.",
    chips: ["general", "compliance", "carbon", "due diligence", "materials", "circularity", "performance"],
    tag: "Planned",
  },
  {
    n: "05",
    label: "Register",
    head: "One identifier to Brussels. The data stays yours.",
    body: "The unique identifier goes to the EU Central DPP Registry, live since 20 July 2026 under Implementing Regulation (EU) 2026/1778. The content stays with you, or your passport service provider. Nothing sensitive sits on an EU server.",
    chips: ["UID → EU Registry", "decentralised content", "no vendor lock-in"],
    tag: "Planned",
  },
  {
    n: "06",
    label: "Carrier",
    head: "Engrave a link that outlives the battery.",
    body: "A QR to ISO/IEC 18004, printed or lasered on the case and legible for the battery's whole life, still resolving after resale, repurposing and years of wear. Bindu mints no QR codes today.",
    chips: ["QR · ISO/IEC 18004", "on the case", "life of the battery"],
    tag: "Planned",
  },
  {
    n: "07",
    label: "Publish",
    head: "One record, four doors.",
    body: "The record goes live with four doors: public for buyers, dismantling for recyclers, authority for surveillance, live-unit for owners and second-life operators. Verifiable credentials hold each line. There is no public passport page yet.",
    chips: ["Public", "Dismantling", "Authority", "Live unit"],
    tag: "Planned",
  },
];

export function BatteryFlow() {
  return (
    <RegulationFlow
      ariaLabel="How the passport is assembled"
      eyebrow="Battery passport process"
      heading="The seven steps to a battery passport."
      sub={
        <>
          The law asks one company for a record it doesn&apos;t hold. This is
          how Bindu is building it, in <strong>seven moves</strong>. Supplier
          collection, evidence and the audit trail run today on the EUDR filing
          engine. The battery passport engine is still being built, so every
          step below is marked <strong>planned</strong>.
        </>
      }
      steps={FLOW_STEPS}
    />
  );
}

/* =============================================================
   ACT 4 — THE SCAN (dark, Flip-filtered)
   Four doors read one passport. Tabs filter the field grid to
   each Annex XIII access point (Article 77(2) + Annex XIII 1–4).
   ============================================================= */
// `label` names the door on its tab; `tag` is what the field cards print, and
// the two differ because both legitimate-interest doors carry the same tag.
const SCAN_TIERS = [
  { id: "public", label: "Public", tag: "Public" },
  { id: "dismantle", label: "Dismantling", tag: "Legit. interest" },
  { id: "authority", label: "Authority", tag: "Authority" },
  { id: "live", label: "Live unit", tag: "Legit. interest" },
] as const;
type ScanTier = (typeof SCAN_TIERS)[number]["id"];
// One source for the tag printed on each field card.
const SCAN_TIER_LABEL = new Map<ScanTier, string>(
  SCAN_TIERS.map((t) => [t.id, t.tag] as const)
);
const SCAN_FIELDS: { name: string; tier: ScanTier }[] = [
  // Annex XIII point 1 — public (battery model)
  { name: "Unique battery identifier", tier: "public" },
  { name: "Manufacturer identity", tier: "public" },
  { name: "Place & date of manufacture", tier: "public" },
  { name: "Battery category & model", tier: "public" },
  { name: "Battery chemistry", tier: "public" },
  { name: "Critical raw materials over 0.1%", tier: "public" },
  { name: "Hazardous substances", tier: "public" },
  { name: "Carbon footprint & performance class", tier: "public" },
  { name: "Responsible-sourcing report", tier: "public" },
  { name: "Recycled content: Co · Pb · Li · Ni", tier: "public" },
  { name: "Share of renewable content", tier: "public" },
  { name: "Rated capacity (Ah)", tier: "public" },
  { name: "Nominal, min & max voltage", tier: "public" },
  { name: "Expected lifetime in cycles", tier: "public" },
  { name: "Round-trip efficiency", tier: "public" },
  { name: "Temperature range withstood", tier: "public" },
  { name: "Commercial warranty period", tier: "public" },
  { name: "EU declaration of conformity", tier: "public" },
  // Annex XIII point 2 — legitimate interest + authorities (dismantling)
  { name: "Detailed cathode, anode & electrolyte composition", tier: "dismantle" },
  { name: "Component part numbers", tier: "dismantle" },
  { name: "Spare-part sources & contacts", tier: "dismantle" },
  { name: "Exploded pack diagrams", tier: "dismantle" },
  { name: "Disassembly sequence", tier: "dismantle" },
  { name: "Fastening types & count", tier: "dismantle" },
  { name: "Tools required to dismantle", tier: "dismantle" },
  { name: "Safety measures", tier: "dismantle" },
  // Annex XIII point 3 — notified bodies, surveillance, Commission
  { name: "Test reports proving compliance", tier: "authority" },
  { name: "Annex IV performance test results", tier: "authority" },
  { name: "Delegated-act conformity evidence", tier: "authority" },
  // Annex XIII point 4 — legitimate interest (the individual battery)
  { name: "State of health", tier: "live" },
  { name: "State of charge", tier: "live" },
  { name: "Remaining capacity & capacity fade", tier: "live" },
  { name: "Full charge-discharge cycle count", tier: "live" },
  { name: "Status: original → repurposed → waste", tier: "live" },
  { name: "Negative events & accidents", tier: "live" },
  { name: "Operating temperature history", tier: "live" },
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

export function BatteryScan() {
  const ref = useRef<HTMLElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the public door.
      gsap.utils.toArray<HTMLElement>(".bt-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "public") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bt-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-act-head", start: "top 78%" },
        });
        gsap.from(".bt-scan-qr, .bt-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-scan-body", start: "top 78%" },
        });
        gsap.from(".bt-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".bt-scan-grid", start: "top 82%" },
        });
        gsap.fromTo(
          ".bt-scan-qr-sweep",
          { y: 0, autoAlpha: 0.9 },
          {
            y: 84,
            autoAlpha: 0.9,
            duration: 1.8,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.5,
            scrollTrigger: {
              trigger: ".bt-scan-qr",
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
    const cards = gsap.utils.toArray<HTMLElement>(".bt-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".bt-scan-tab").forEach((t) => {
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
    const grid = root?.querySelector<HTMLElement>(".bt-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".bt-scan-field")
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
    <section aria-label="Who reads the passport" className="bt-dark bt-scan" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="bt-act-head">
          <span className="st-eyebrow">Passport access rights</span>
          <h2 className="st-h2">One QR code shows each reader a different view.</h2>
          <p className="bt-act-sub">
            A buyer, a recycler, a surveillance officer, the battery&apos;s next
            owner. One record, a different door for each. Pick a door. Watch the
            fields change.
          </p>
        </div>

        <div className="bt-scan-body">
          <div className="bt-scan-qr">
            <svg
              aria-hidden="true"
              viewBox="0 0 90 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              {QR_FINDERS.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <rect
                    className="bt-scan-qr-module"
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
                    className="bt-scan-qr-module"
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
                  className="bt-scan-qr-module"
                  height={5}
                  key={`${x}-${y}`}
                  rx={1}
                  width={5}
                  x={x}
                  y={y}
                />
              ))}
              <rect
                className="bt-scan-qr-sweep"
                height={3}
                width={90}
                x={0}
                y={0}
              />
              <rect
                className="bt-scan-qr-knock"
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
            <div className="bt-scan-tabs" role="radiogroup" aria-label="Access door">
              {SCAN_TIERS.map((t, i) => (
                <label
                  className={`bt-scan-tab${i === 0 ? " is-on" : ""}`}
                  data-tier={t.id}
                  key={t.id}
                >
                  <input
                    defaultChecked={i === 0}
                    name="bt-scan-tier"
                    onChange={() => selectTier(t.id)}
                    type="radio"
                    value={t.id}
                  />
                  {t.label}
                </label>
              ))}
            </div>

            <div className="bt-scan-grid">
              {SCAN_FIELDS.map((f) => (
                <div className="bt-scan-field" data-tier={f.tier} key={f.name}>
                  <span className="bt-scan-field-tier">
                    {SCAN_TIER_LABEL.get(f.tier)}
                  </span>
                  <span className="bt-scan-field-name">{f.name}</span>
                </div>
              ))}
            </div>

            <p className="bt-scan-caption">
              Static, model data is public. The living, per-unit data opens only
              to a legitimate interest. Verifiable credentials hold each door; a
              buyer never sees the recycler&apos;s view.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 5 — GRANULARITY (ivory slab)
   For a garment, batch is the floor. For a battery, the law goes
   all the way down: the passport is per INDIVIDUAL unit, and the
   living data is its own. Recycled content is the batch-level cut.
   ============================================================= */
const GRAINS = [
  {
    name: "Model",
    tag: "By design",
    accent: false,
    min: false,
    desc: "Fixed for every unit of a model: chemistry, nominal capacity and voltage, the carbon-footprint class, the spec sheet a buyer compares.",
  },
  {
    name: "Batch",
    tag: "Per production run",
    accent: false,
    min: false,
    desc: "What changes run to run: the plant and date of manufacture, the recycled-content share, calculated per model, per plant, per year.",
  },
  {
    name: "Unit",
    tag: "The law's floor",
    accent: true,
    min: true,
    desc: "A unique identifier on every individual battery, its QR engraved on the case, and a living record: state of health, cycle count, status, the events it survives.",
  },
];
// Article 8(2) recycled-content minima, wave one (from 18 Aug 2031). Documented
// per battery model, per plant, per year — the batch-level cut of the record.
const RECYCLED_BARS = [
  { label: "Lead", pct: 85, val: "85%", low: false },
  { label: "Cobalt", pct: 16, val: "16%", low: false },
  { label: "Lithium", pct: 6, val: "6%", low: true },
  { label: "Nickel", pct: 6, val: "6%", low: true },
];

export function BatteryGranularity() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bt-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-act-head", start: "top 78%" },
        });
        gsap.from(".bt-gran-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-gran-grid", start: "top 80%" },
        });
        gsap.from(".bt-gran-bar-row", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".bt-gran-chart", start: "top 82%" },
        });
        gsap.fromTo(
          ".bt-gran-bar-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".bt-gran-chart", start: "top 82%" },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="How fine-grained the passport is" className="bt-slab-wrap bt-gran" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="bt-slab">
        <div className="st-container">
          <div className="bt-act-head">
            <span className="st-eyebrow">Granularity</span>
            <h2 className="st-h2">Model, batch, or unit?</h2>
            <p className="bt-act-sub">
              A garment can pass with a batch number. A battery can&apos;t. The
              passport goes all the way down, <strong>one per individual
              unit</strong>, and the living data belongs to that single cell.
            </p>
          </div>

          <div className="bt-gran-grid">
            {GRAINS.map((g) => (
              <article
                className={`bt-gran-card${g.min ? " is-min" : ""}`}
                key={g.name}
              >
                <span className={`bt-gran-tag${g.accent ? " is-accent" : ""}`}>
                  {g.tag}
                </span>
                <h3 className="bt-gran-name">{g.name}</h3>
                <p className="bt-gran-desc">{g.desc}</p>
              </article>
            ))}
          </div>

          <figure className="bt-gran-chart">
            <figcaption className="bt-gran-chart-head">
              <h3 className="bt-gran-chart-title">
                Recycled content, wave one. Already law.
              </h3>
              <span className="bt-gran-chart-note">
                Art. 8(2) · per model, per plant, per year · from 18 Aug 2031
              </span>
            </figcaption>
            <div>
              {RECYCLED_BARS.map((b) => (
                <div className="bt-gran-bar-row" key={b.label}>
                  <span className="bt-gran-bar-label">{b.label}</span>
                  <span className="bt-gran-bar-track">
                    <span
                      className={`bt-gran-bar-fill${b.low ? " is-low" : ""}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </span>
                  <span className="bt-gran-bar-val">{b.val}</span>
                </div>
              ))}
            </div>
            <p className="bt-scan-caption" style={{ marginTop: 22 }}>
              Wave two lifts them from 18 August 2036: cobalt 26%, lithium 12%,
              nickel 15%, lead held at 85%. You can only prove a recycled share
              you can trace to the plant that made the cell.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark)
   The dated milestones. The passport binds Feb 2027; carbon-
   footprint dates float on delegated acts still pending.
   ============================================================= */
const CAL_ROWS = [
  {
    when: "18 Aug 2024",
    hard: false,
    body: "State-of-health and expected-lifetime data must live in the battery management system of stationary storage, LMT and EV batteries, with read-only access for owners and independent operators (Article 14).",
  },
  {
    when: "18 Aug 2025",
    hard: false,
    body: "The separate-collection symbol became mandatory and Directive 2006/66/EC was repealed. Member-State penalty regimes fell due.",
  },
  {
    when: "19 Jul 2026",
    hard: false,
    body: "The deadline for the EU Central DPP Registry to be operational (ESPR Article 13), 24 months after ESPR entered into force. It went live on 20 July 2026 under Implementing Regulation (EU) 2026/1778: the authoritative directory that resolves every battery's unique identifier to where its passport is held, while the record itself stays with the operator.",
  },
  {
    when: "18 Aug 2026",
    hard: false,
    body: "General-info and capacity labels apply. The Commission must define, by implementing act, who counts as a person with a 'legitimate interest' (Article 77(9)).",
  },
  {
    when: "18 Feb 2027",
    hard: true,
    flag: "Hard date",
    body: "The QR appears on every battery and the passport goes live, per individual unit, for EVs, industrial batteries over 2 kWh and LMT batteries.",
  },
  {
    when: "18 Aug 2027",
    hard: false,
    body: "Supply-chain due diligence on cobalt, natural graphite, lithium and nickel applies to operators above EUR 40m net turnover, third-party verified and reported into the passport. Postponed from 2025 by Regulation (EU) 2025/1561.",
  },
  {
    when: "18 Aug 2031",
    hard: true,
    flag: "Hard date",
    body: "Recycled-content floors, wave one: 16% cobalt, 85% lead, 6% lithium, 6% nickel, calculated per model, per plant, per year.",
  },
  {
    when: "18 Aug 2036",
    hard: false,
    body: "Wave two lifts the floors, cobalt 26%, lithium 12%, nickel 15%, and LMT batteries join the recycled-content regime.",
  },
];

export function BatteryCalendar() {
  return (
    <RegCalendar
      stageClassName="bt-dark bt-cal"
      ariaLabel="The dates already set"
      trackLabel="Battery passport deadline timeline"
      eyebrow="Battery passport deadlines"
      heading="The battery passport dates are already set."
      sub="The passport binds on 18 February 2027, per unit. Around it, the feeder obligations switch on one by one. The carbon-footprint deadlines are the moving part: each lands only after a delegated act still pending. Everything else here is fixed, and 2027 is close."
      rows={CAL_ROWS}
    />
  );
}

/* =============================================================
   ACT 7 — THE LOOP (ivory slab)
   Why it matters: the passport outlives the sale. The recycler
   reads the chemistry; the recovery targets are already law.
   ============================================================= */
const LOOP_NODES: {
  label: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { label: "Collect", x: 200, y: 52, lx: 200, ly: 32, anchor: "middle" },
  { label: "Second life", x: 318, y: 170, lx: 332, ly: 175, anchor: "start" },
  { label: "Recycle", x: 200, y: 288, lx: 200, ly: 314, anchor: "middle" },
  { label: "Recover", x: 82, y: 170, lx: 68, ly: 175, anchor: "end" },
];
const LOOP_CIRCLE = "M200 52 A118 118 0 1 1 200 288 A118 118 0 1 1 200 52";
// Annex XII material-recovery targets by 31 Dec 2031 (the end-state floors).
const RECOVERY_BARS = [
  { label: "Cobalt", pct: 95, val: "95%", wave2: false },
  { label: "Copper", pct: 95, val: "95%", wave2: false },
  { label: "Lead", pct: 95, val: "95%", wave2: false },
  { label: "Nickel", pct: 95, val: "95%", wave2: false },
  { label: "Lithium", pct: 80, val: "80%", wave2: true },
];

export function BatteryLoop() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bt-loop-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-loop-body", start: "top 76%" },
        });
        gsap.from("#bt-loop-circle", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".bt-loop-ring",
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        gsap.from(".bt-loop-node", {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".bt-loop-ring", start: "top 70%" },
        });
        gsap.set(".bt-loop-orbit", { opacity: 1 });
        gsap.to(".bt-loop-orbit", {
          motionPath: {
            path: "#bt-loop-circle",
            align: "#bt-loop-circle",
            alignOrigin: [0.5, 0.5],
          },
          duration: 9,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".bt-loop-ring",
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
        gsap.from(".bt-loop-bar-row", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".bt-loop-chart", start: "top 84%" },
        });
        gsap.fromTo(
          ".bt-loop-bar-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: { trigger: ".bt-loop-chart", start: "top 84%" },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Why it matters" className="bt-slab-wrap bt-loop" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="bt-slab">
        <div className="st-container">
          <div className="bt-loop-body">
            <div className="bt-loop-copy">
              <span className="st-eyebrow">Recycling and second life</span>
              <h2 className="st-h2">The passport stays with the battery after the sale.</h2>
              <p className="bt-loop-lead">
                End of life is where the battery passport pays for itself. It is
                also where the data has always gone dark.
              </p>
              <p className="bt-loop-body-text">
                A recycler pulling apart a pack needs the chemistry, the joints
                and the hazards before the first cut, not after. State of health
                decides whether a used pack gets a second life or goes straight
                to shredding. One record survives resale, repurposing and years
                of wear, and still names every cell. The passport.
              </p>
              <ul className="bt-loop-fail">
                <li>chemistry unknown</li>
                <li>no disassembly map</li>
                <li>hidden hazards</li>
                <li>unknown state of health</li>
                <li>worn labels</li>
              </ul>
            </div>

            <svg
              aria-hidden="true"
              className="bt-loop-ring"
              viewBox="0 0 400 340"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="bt-loop-circle"
                d={LOOP_CIRCLE}
                id="bt-loop-circle"
              />
              {LOOP_NODES.map((n) => (
                <g className="bt-loop-node" key={n.label}>
                  <circle className="bt-loop-node-dot" cx={n.x} cy={n.y} r={7} />
                  <text
                    className="bt-loop-node-label"
                    textAnchor={n.anchor}
                    x={n.lx}
                    y={n.ly}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <text className="bt-loop-center" x={200} y={166}>
                the loop
              </text>
              <text className="bt-loop-center" x={200} y={182}>
                closes
              </text>
              <circle className="bt-loop-orbit" cx={200} cy={52} r={6} />
            </svg>
          </div>

          <figure className="bt-loop-chart">
            <figcaption className="bt-loop-chart-head">
              <h3 className="bt-loop-chart-title">
                Materials the recycler must recover.
              </h3>
              <span className="bt-loop-chart-note">
                by 31 Dec 2031 · Reg (EU) 2023/1542 Annex XII
              </span>
            </figcaption>
            <div className="bt-loop-bars">
              {RECOVERY_BARS.map((b) => (
                <div className="bt-loop-bar-row" key={b.label}>
                  <span className="bt-loop-bar-label">{b.label}</span>
                  <span className="bt-loop-bar-track">
                    <span
                      className={`bt-loop-bar-fill${b.wave2 ? " is-wave2" : ""}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </span>
                  <span className="bt-loop-bar-val">{b.val}</span>
                </div>
              ))}
            </div>
            <p className="bt-loop-chart-foot">
              By end 2027 the floors are lower: lithium 50%, the rest 90%. Those
              recovered grams feed the recycled-content minima, and the passport
              tells the recycler which chemistry it is pulling apart.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE OPEN STANDARDS UNDERNEATH (dark)
   These panels describe the Eclipse Tractus-X building blocks, the
   open-source stack behind Catena-X. They describe the STANDARDS,
   not Bindu capabilities. Only the connector is wired in this repo
   (internal/edc): a driver against a stock tractusx-edc management
   API, today driven from cmd/edc-verify. Do not restore any claim
   that Bindu "runs on" the full stack.
   ============================================================= */
const RAILS_KITS: RailsPart[] = [
  {
    id: "eco-pass",
    name: "Eco Pass",
    tag: "Circular economy",
    role: "The passport itself",
    body: "The Digital Product Passport blueprint. Its Battery Pass aspect model, battery_pass 6.0.0, is built directly on Regulation (EU) 2023/1542, and the reference viewer resolves the QR to a public or restricted view.",
    points: ["Battery Pass aspect model", "QR data carrier", "Public + restricted views"],
  },
  {
    id: "digital-twin",
    name: "Digital Twin",
    tag: "Dataspace foundation",
    role: "Discoverable twins",
    body: "Every battery is a digital twin, registered so the right party can find its passport. Built on the Asset Administration Shell and a Digital Twin Registry, discovered by identifier.",
    points: ["Asset Administration Shell", "Digital Twin Registry", "Discovery by identifier"],
  },
  {
    id: "connector",
    name: "Connector · EDC",
    tag: "Dataspace foundation",
    role: "Sovereign exchange",
    body: "The Eclipse Dataspace Connector moves data between two parties under a signed contract. Each side keeps control, and a cell's carbon figure travels only to the party entitled to read it. This is the one block Bindu has wired: a driver that publishes an asset, an access policy and a contract definition on a stock tractusx-edc connector, then negotiates a contract to read from another.",
    points: ["Contract negotiation", "Policy-controlled transfer", "Dataspace protocol"],
  },
  {
    id: "business-partner",
    name: "Business Partner",
    tag: "Dataspace foundation",
    role: "Who's who",
    body: "A verifiable identity for every company in the chain. The Business Partner Number ties a legal entity, a site and an address together, so the passport can say who refined the nickel and where the cell was made.",
    points: ["BPNL · BPNS · BPNA", "Golden-record data", "Onboarding + checks"],
  },
  {
    id: "data-trust",
    name: "Data Trust & Security",
    tag: "Dataspace foundation",
    role: "The four doors",
    body: "Wallets, decentralised identifiers and verifiable credentials decide who may read what. This is what turns public, dismantling, authority and live-unit access into something a machine checks at the door.",
    points: ["Managed wallets", "DIDs + credentials", "Credential-gated access"],
  },
  {
    id: "circularity",
    name: "Circularity",
    tag: "Circular economy",
    role: "End of life",
    body: "The data a recycler or second-life operator needs: material composition, disassembly, and the events a battery picks up on its way back through collection, repurposing and recovery.",
    points: ["Material composition", "Disassembly / EoL", "Second-life events"],
  },
];

export function BatteryRails() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bt-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-act-head", start: "top 80%" },
        });
        gsap.from(".bt-rails-tab", {
          autoAlpha: 0,
          x: -16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".bt-rails-tablist", start: "top 84%" },
        });
        gsap.from(".bt-rails-detail", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".bt-rails-explorer", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The open standards underneath" className="bt-dark bt-rails" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="bt-act-head">
          <span className="st-eyebrow">Battery passport standards</span>
          <h2 className="st-h2">The open standards underneath.</h2>
          <p className="bt-act-sub">
            Bindu is being built onto the EU&apos;s own open standards rather
            than a private format. They come from{" "}
            <strong>Eclipse Tractus-X</strong>, the open-source stack behind{" "}
            <strong>Catena-X</strong>, and its building blocks are KITs,
            &ldquo;Keep It Together&rdquo;. One of them is wired today: the
            connector. Bindu drives a stock Eclipse Dataspace Connector, and the
            other blocks below are the standards the passport is being built
            onto, not features you can use yet. Pick one to see the job it does.
          </p>
        </div>

        <RailsExplorer
          label="Tractus-X KITs"
          parts={RAILS_KITS}
          prefix="bt"
        />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — WHO FILES IT / CLOSE (dark)
   The badges below state what the REGULATION demands of whoever
   holds the passport. They are not Bindu service guarantees: there
   is no DPP retention, continuity or donor-lineage feature in the
   product. Do not restate them as things Bindu already does.
   ============================================================= */
const CLOSE_BADGES = [
  { head: "Per unit", body: "one passport for every individual battery" },
  { head: "Free to read", body: "no charge for anyone within their rights" },
  { head: "Open standards", body: "transferable without vendor lock-in, machine-readable, searchable" },
];

export function BatteryClose() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bt-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bt-act-head", start: "top 80%" },
        });
        gsap.from(".bt-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".bt-close-badges", start: "top 85%" },
        });
        gsap.from(".bt-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".bt-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".bt-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".bt-close-arrow");
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
    <section aria-label="Who files it" className="bt-dark bt-close" ref={ref}>
      <div className="st-container">
        <div className="bt-act-head">
          <span className="st-eyebrow">Operator responsibility</span>
          <h2 className="st-h2">Start with one battery.</h2>
          <p className="bt-act-sub">
            Article 77 lets the operator authorise another party, in writing, to
            keep the passport accurate and up to date. That is the role Bindu is
            building for. Below is what the regulation demands of whoever takes
            it on.
          </p>
        </div>

        <div className="bt-close-badges">
          {CLOSE_BADGES.map((b) => (
            <div className="bt-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        <div className="bt-close-grid">
          <DemoCtaLink
            className="bt-close-panel is-primary"
            source="dpp-battery-close"
          >
            <h3>{DEMO_CTA_LABEL}</h3>
            <p>Bring one battery. Leave knowing which Annex XIII fields you can already answer and which you cannot.</p>
            <span aria-hidden="true" className="bt-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
          <Link className="bt-close-panel" href="/dpp/others">
            <h3>Every product group</h3>
            <p>Batteries today, textiles beside them, the rest of the economy behind.</p>
            <span aria-hidden="true" className="bt-close-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
