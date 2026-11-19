"use client";

/**
 * EUDR story — animated acts for /eudr.
 *
 * The EU Deforestation Regulation (Regulation (EU) 2023/1115) as a story:
 * the duty lands on the importer (Problem), five real product screens answer
 * the law's five demands (Journey), the risk tiers (Scan), the flagged-plot
 * desk (Flag), the dates (Calendar), and the TRACES receipt (Close). Facts
 * trace to the regulation, the country benchmarking (Implementing Reg (EU)
 * 2025/1093), and the 2025 simplification (Reg (EU) 2025/2650).
 *
 * SSR-first: every element authored in its final visible state; GSAP animates
 * FROM hidden only inside a matchMedia("(prefers-reduced-motion: no-preference)")
 * context. Scoped .ed-* — distinct from .tx-/.bt-/.ot- so the landing family
 * never cross-bleeds on client-side navigation.
 *
 * All copy comes in through a `content` prop (EudrContent slice per act) so
 * the same components serve /eudr and every /{locale}/eudr. Structure that
 * must not drift between locales (images, sizes, node positions, tier ids,
 * GSAP choreography) stays here. Article references are NOT structure: every
 * language writes them its own way, so they travel with the content.
 */

import Image from "next/image";
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

import type { EudrContent } from "./eudr-content";
import { renderRich } from "./eudr-rich";
import { DemoCtaLink } from "../demo-cta-link";
import { RegCalendar } from "./reg-calendar";
import "./eudr-story.css";

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
   The relay: plot → cooperative → exporter → the importer who
   files the DDS and carries the liability.
   ============================================================= */
const NODE_META = [
  { x: 95 },
  { x: 365 },
  { x: 635 },
  { x: 905, duty: true },
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
const STAT_META = [
  { to: 7, suffix: "", accent: false },
  { to: 4, suffix: "%", accent: false },
  { to: 10, suffix: "M ha", accent: false },
  { to: 0, suffix: "", accent: true },
];

export function EudrProblem({ content }: { content: EudrContent["problem"] }) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        gsap.from(".ed-problem-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-problem-head", start: "top 80%" },
        });

        gsap.from(".ed-node", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ed-flow", start: "top 78%" },
        });
        gsap.from("#ed-flow-path", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".ed-flow",
            start: "top 74%",
            end: "center center",
            scrub: 0.6,
          },
        });
        gsap.from(".ed-lost-bracket", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".ed-flow",
            start: "top 70%",
            end: "center 60%",
            scrub: 0.6,
          },
        });

        gsap.set(".ed-packet", { opacity: 1 });
        gsap.utils.toArray<SVGCircleElement>(".ed-packet").forEach((p, i) => {
          gsap.to(p, {
            motionPath: {
              path: "#ed-flow-path",
              align: "#ed-flow-path",
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.4,
            ease: "none",
            repeat: -1,
            delay: i * 1.1,
            scrollTrigger: {
              trigger: ".ed-flow",
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });
        });

        gsap.utils.toArray<SVGCircleElement>(".ed-lost-dot").forEach((d, i) => {
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
                trigger: ".ed-flow",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".ed-stat-num").forEach((el) => {
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
            scrollTrigger: { trigger: ".ed-stats", start: "top 82%" },
          });
        });

        SplitText.create(".ed-verdict-quote", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.16,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".ed-verdict-quote",
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
    <section aria-label={content.ariaLabel} className="ed-problem" ref={ref}>
      <div className="st-container">
        <div className="ed-problem-head">
          <span className="st-eyebrow">{content.eyebrow}</span>
          <h2 className="st-h2">{content.heading}</h2>
          <p className="ed-problem-lead">{renderRich(content.lead)}</p>
        </div>

        <div className="ed-flow">
          <svg
            aria-hidden="true"
            className="ed-flow-svg"
            viewBox="0 0 1000 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="ed-flow-path" d={FLOW_PATH} id="ed-flow-path" />

            <path
              className="ed-lost-bracket"
              d="M95 128 L95 116 L635 116 L635 128"
            />
            <text className="ed-lost-label" x="365" y="104">
              {content.lostLabel}
            </text>

            {LOST_DOTS.map((d) => (
              <circle
                className="ed-lost-dot"
                cx={d.x}
                cy={d.y}
                key={`${d.x}-${d.y}`}
                r={3}
              />
            ))}

            {NODE_META.map((n, i) => (
              <g className="ed-node" key={n.x}>
                <text className="ed-node-name" x={n.x} y={152}>
                  {content.nodes[i]?.name}
                </text>
                <circle
                  className={`ed-node-dot${n.duty ? " is-duty" : ""}`}
                  cx={n.x}
                  cy={NODE_Y}
                  r={n.duty ? 11 : 6}
                />
                <text
                  className={`ed-node-tier${n.duty ? " is-duty" : ""}`}
                  x={n.x}
                  y={226}
                >
                  {content.nodes[i]?.tier}
                </text>
              </g>
            ))}

            {[0, 1, 2].map((i) => (
              <circle className="ed-packet" cx={95} cy={NODE_Y} key={i} r={5} />
            ))}
          </svg>
          {/* The relay in words. The diagram is a 1000-unit viewBox scaled to
              the column, so at 375px its 16px labels render near 5px, and it
              is aria-hidden, so a screen reader gets nothing from it either.
              This list is the text alternative at every width and the only
              rendering of the relay below 700px. */}
          <ol className="ed-flow-list">
            {content.nodes.map((n) => (
              <li key={n.name}>
                <strong>{n.name}</strong>
                <span>{n.tier}</span>
              </li>
            ))}
          </ol>
          <p className="ed-flow-lost">{content.lostLabel}</p>
          <p className="ed-flow-caption">{content.flowCaption}</p>
        </div>

        <div className="ed-stats">
          {STAT_META.map((s, i) => (
            <div className="ed-stat" key={content.stats[i] ?? i}>
              <span
                className={`ed-stat-num${s.accent ? " is-accent" : ""}`}
                data-suffix={s.suffix}
                data-to={s.to}
              >
                {s.to}
                {s.suffix}
              </span>
              <span className="ed-stat-label">{content.stats[i]}</span>
            </div>
          ))}
        </div>

        <div className="ed-verdict">
          <p className="ed-verdict-quote">{content.verdictQuote}</p>
          <span className="ed-verdict-cite">{content.verdictCite}</span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3 — THE JOURNEY (ivory slab)
   The law, answered in five real screens: each Article's demand
   paired with the Bindu screen that satisfies it. Replaces the
   old abstract Flow + Rails acts (same facts, told once, with
   the product as the proof).
   ============================================================= */
/*
 * Structure only. The article reference used to live here as a shared `art`
 * string, which printed "Art. 9(1)(d)" on the German and Polish pages too.
 * The number is invariant, the way a language writes it is not, so `art` now
 * comes from content.steps[i] and each locale supplies its own EUR-Lex form.
 */
const JOURNEY_META = [
  {
    n: "01",
    img: "/images/eudr/journey-1-farms.webp",
    w: 1686,
    h: 1312,
  },
  {
    n: "02",
    img: "/images/eudr/journey-2-forest.webp",
    w: 1758,
    h: 1704,
  },
  {
    n: "03",
    img: "/images/eudr/journey-3-legality.webp",
    w: 1612,
    h: 720,
  },
  {
    n: "04",
    img: "/images/eudr/journey-4-declaration-final.webp",
    w: 1664,
    h: 1834,
  },
  {
    n: "05",
    img: "/images/eudr/journey-5-file.webp",
    w: 1690,
    h: 770,
  },
];

export function EudrJourney({ content }: { content: EudrContent["journey"] }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        gsap.from(".ed-jny-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-jny-head", start: "top 82%" },
        });

        gsap.utils.toArray<HTMLElement>(".ed-jny-step", root).forEach((step) => {
          gsap.from(
            step.querySelectorAll(".ed-jny-label, .ed-jny-h3, .ed-jny-law"),
            {
              autoAlpha: 0,
              y: 20,
              filter: "blur(6px)",
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: step, start: "top 78%" },
            }
          );
          const shot = step.querySelector(".ed-shot");
          if (shot) {
            gsap.from(shot, {
              autoAlpha: 0,
              y: 36,
              scale: 0.985,
              transformOrigin: "center top",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 74%" },
            });
          }
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label={content.ariaLabel}
      className="ed-slab-wrap ed-jny"
      id="journey"
      ref={ref}
    >
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="ed-slab">
        <div className="st-container">
          <div className="ed-act-head ed-jny-head">
            <span className="st-eyebrow">{content.eyebrow}</span>
            <h2 className="st-h2">{content.heading}</h2>
            <p className="ed-act-sub">{renderRich(content.sub)}</p>
            <p className="ed-jny-codes">{content.codes}</p>
          </div>

          <div className="ed-jny-steps">
            {JOURNEY_META.map((s, i) => (
              <div className="ed-jny-step" key={s.n}>
                <div className="ed-jny-copy">
                  <span className="ed-jny-label">
                    {s.n}
                    <span className="ed-jny-art">{content.steps[i]?.art}</span>
                  </span>
                  <h3 className="ed-jny-h3">{content.steps[i]?.ask}</h3>
                  <p className="ed-jny-law">{content.steps[i]?.law}</p>
                </div>
                <figure className="ed-shot">
                  <div className="ed-shot-frame">
                    <span aria-hidden="true" className="ed-shot-bar">
                      <i />
                      <i />
                      <i />
                    </span>
                    <Image
                      alt={content.steps[i]?.alt ?? ""}
                      className="ed-shot-img"
                      height={s.h}
                      sizes="(max-width: 900px) 94vw, 56vw"
                      src={s.img}
                      width={s.w}
                    />
                  </div>
                  <figcaption className="ed-shot-cap">
                    {content.steps[i]?.caption}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 3B — THE CHAIN (dark)
   Five roles, two file, all feed the filing. Each party keeps its
   data in its own workspace; sharing grants access, never a copy.
   Screens: the operator's chain step (receive a package or drop an
   invoice to invite) and the supplier's share panel.
   ============================================================= */
const CHAIN_ROLE_FILES = [true, true, false, false, false];

const CHAIN_SUPPLIER_SHOT = {
  img: "/images/eudr/chain-supplier.webp",
  w: 2260,
  h: 1116,
};
const CHAIN_SHARE_SHOT = {
  img: "/images/eudr/chain-share.webp",
  w: 692,
  h: 580,
};

export function EudrChain({ content }: { content: EudrContent["chain"] }) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ed-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-act-head", start: "top 80%" },
        });
        gsap.from(".ed-role", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ed-roles", start: "top 84%" },
        });
        gsap.utils.toArray<HTMLElement>(".ed-chain-handoff").forEach((h) => {
          gsap.from(h.querySelectorAll(".ed-chain-copy > *"), {
            autoAlpha: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: h, start: "top 78%" },
          });
          gsap.from(h.querySelector(".ed-shot"), {
            autoAlpha: 0,
            y: 34,
            scale: 0.985,
            transformOrigin: "center top",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 76%" },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label={content.ariaLabel} className="ed-dark ed-chain" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="ed-act-head">
          <span className="st-eyebrow">{content.eyebrow}</span>
          <h2 className="st-h2">{content.heading}</h2>
          <p className="ed-act-sub">{content.sub}</p>
        </div>

        <h3 className="ed-chain-subhead">{content.subhead}</h3>
        <div className="ed-roles">
          {content.roles.map((r, i) => (
            <div className="ed-role" key={r.role}>
              <div className="ed-role-head">
                <span className="ed-role-name">{r.role}</span>
                <span
                  className={`ed-role-badge${CHAIN_ROLE_FILES[i] ? " is-files" : ""}`}
                >
                  {CHAIN_ROLE_FILES[i] ? content.filesBadge : content.noFilesBadge}
                </span>
              </div>
              <p className="ed-role-body">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="ed-chain-handoff ed-chain-wide">
          <div className="ed-chain-copy">
            <h3>{content.invite.heading}</h3>
            <p>{renderRich(content.invite.body)}</p>
          </div>
          <figure className="ed-shot ed-chain-shot">
            <div className="ed-shot-frame">
              <span aria-hidden="true" className="ed-shot-bar">
                <i />
                <i />
                <i />
              </span>
              <Image
                alt={content.supplierShot.alt}
                className="ed-shot-img"
                height={CHAIN_SUPPLIER_SHOT.h}
                sizes="(max-width: 900px) 94vw, 68vw"
                src={CHAIN_SUPPLIER_SHOT.img}
                width={CHAIN_SUPPLIER_SHOT.w}
              />
            </div>
            <figcaption className="ed-shot-cap">
              {content.supplierShot.caption}
            </figcaption>
          </figure>
        </div>

        <div className="ed-chain-handoff is-split">
          <figure className="ed-shot ed-chain-shot">
            <div className="ed-shot-frame">
              <span aria-hidden="true" className="ed-shot-bar">
                <i />
                <i />
                <i />
              </span>
              <Image
                alt={content.shareShot.alt}
                className="ed-shot-img"
                height={CHAIN_SHARE_SHOT.h}
                sizes="(max-width: 900px) 94vw, 42vw"
                src={CHAIN_SHARE_SHOT.img}
                width={CHAIN_SHARE_SHOT.w}
              />
            </div>
            <figcaption className="ed-shot-cap">
              {content.shareShot.caption}
            </figcaption>
          </figure>
          <div className="ed-chain-copy">
            <h3>{content.share.heading}</h3>
            <p>{content.share.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 4 — THE SCAN (dark, Flip-filtered)
   The risk tiers (Article 29 + Implementing Reg (EU) 2025/1093).
   Pick a tier, watch the requirements change.
   ============================================================= */
const SCAN_TIER_IDS = ["low", "standard", "high"] as const;

export function EudrScan({ content }: { content: EudrContent["scan"] }) {
  const ref = useRef<HTMLElement | null>(null);

  const fields = SCAN_TIER_IDS.flatMap((tier) =>
    content.fields[tier].map((name) => ({ name, tier }))
  );

  const { contextSafe } = useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Functional (runs regardless of motion pref): start on the low tier.
      gsap.utils.toArray<HTMLElement>(".ed-scan-field", root).forEach((c) => {
        if (c.dataset.tier !== "low") c.style.display = "none";
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ed-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-act-head", start: "top 78%" },
        });
        gsap.from(".ed-scan-tabs", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ed-scan-tabs", start: "top 84%" },
        });
        gsap.from(".ed-scan-field", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".ed-scan-grid", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  const selectTier = contextSafe((tier: string) => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>(".ed-scan-field", root);
    const state = Flip.getState(cards);
    cards.forEach((c) => {
      c.style.display = c.dataset.tier === tier ? "flex" : "none";
    });
    root.querySelectorAll<HTMLElement>(".ed-scan-tab").forEach((t) => {
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

  // Lock the grid to the tallest tier so switching never changes the height.
  useEffect(() => {
    const root = ref.current;
    const grid = root?.querySelector<HTMLElement>(".ed-scan-grid");
    if (!root || !grid) return;
    const measure = () => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".ed-scan-field")
      );
      const prev = cards.map((c) => c.style.display);
      let max = 0;
      for (const t of SCAN_TIER_IDS) {
        cards.forEach((c) => {
          c.style.display = c.dataset.tier === t ? "flex" : "none";
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
    <section aria-label={content.ariaLabel} className="ed-dark ed-scan" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="ed-act-head">
          <span className="st-eyebrow">{content.eyebrow}</span>
          <h2 className="st-h2">{content.heading}</h2>
          <p className="ed-act-sub">{content.sub}</p>
        </div>

        <div className="ed-scan-tabs" role="radiogroup" aria-label={content.tierAria}>
          {SCAN_TIER_IDS.map((t, i) => (
            <label
              className={`ed-scan-tab${i === 0 ? " is-on" : ""}`}
              data-tier={t}
              key={t}
            >
              <input
                defaultChecked={i === 0}
                name="ed-scan-tier"
                onChange={() => selectTier(t)}
                type="radio"
                value={t}
              />
              {content.tiers[t]}
            </label>
          ))}
        </div>

        <div className="ed-scan-grid">
          {fields.map((f) => (
            <div className="ed-scan-field" data-tier={f.tier} key={f.name}>
              <span className="ed-scan-field-tier">{content.tiers[f.tier]}</span>
              <span className="ed-scan-field-name">{f.name}</span>
            </div>
          ))}
        </div>

        <p className="ed-scan-caption">{content.caption}</p>

        {/* Static, crawlable summary of all three tiers — the interactive
            grid above shows one tier at a time, so search engines and AI
            extractors get the full picture from this block. */}
        <dl className="ed-scan-facts">
          {SCAN_TIER_IDS.map((t) => (
            <div className="ed-scan-fact" key={t}>
              <dt>{content.tiers[t]}</dt>
              <dd>{content.facts[t]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 6 — THE CALENDAR (dark). A horizontal timeline of the dates,
   one open at a time, with the sunflower rolling along the axis to
   the live date — the same interaction the CBAM page uses, so the
   two regulation pages read as one system. The flagged dates (the
   2020 cutoff, the 2026 deadline) are accent diamonds; the rest are
   a spine. Opens on the last flagged date — the live deadline.
   ============================================================= */
export function EudrCalendar({ content }: { content: EudrContent["calendar"] }) {
  // Open on the live deadline — the last flagged date, the one that matters
  // most right now (30 Dec 2026). The cutoff is flagged too, but it is history.
  let lastFlagged = 0;
  content.rows.forEach((r, i) => {
    if (r.flag) lastFlagged = i;
  });

  return (
    <RegCalendar
      stageClassName="ed-dark ed-cal"
      ariaLabel={content.ariaLabel}
      trackLabel={content.ariaLabel}
      eyebrow={content.eyebrow}
      heading={content.heading}
      sub={renderRich(content.sub)}
      rows={content.rows.map((r) => ({ ...r, hard: Boolean(r.flag) }))}
      defaultIndex={lastFlagged}
    />
  );
}

/* =============================================================
   ACT 5 — THE FLAG (ivory slab)
   Satellites see loss, not why. The real screen where a flagged
   plot gets justified and cleared: the desk where alerts die.
   ============================================================= */
const FLAG_SHOT = {
  img: "/images/eudr/flag-resolve.webp",
  w: 1586,
  h: 430,
};

export function EudrFlag({ content }: { content: EudrContent["flag"] }) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ed-flag-copy > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-flag-body", start: "top 76%" },
        });
        gsap.from(".ed-flag-shot", {
          autoAlpha: 0,
          y: 36,
          scale: 0.985,
          transformOrigin: "center top",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ed-flag-body", start: "top 72%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label={content.ariaLabel} className="ed-slab-wrap ed-flag" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="ed-slab">
        <div className="st-container">
          <div className="ed-flag-body">
            <div className="ed-flag-copy">
              <span className="st-eyebrow">{content.eyebrow}</span>
              <h2 className="st-h2">{content.heading}</h2>
              <p className="ed-flag-lead">{content.lead}</p>
              <p className="ed-flag-text">{content.text}</p>
              <ul className="ed-flag-fail">
                {content.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <figure className="ed-shot ed-flag-shot">
              <div className="ed-shot-frame">
                <span aria-hidden="true" className="ed-shot-bar">
                  <i />
                  <i />
                  <i />
                </span>
                <Image
                  alt={content.shot.alt}
                  className="ed-shot-img"
                  height={FLAG_SHOT.h}
                  sizes="(max-width: 900px) 94vw, 52vw"
                  src={FLAG_SHOT.img}
                  width={FLAG_SHOT.w}
                />
              </div>
              <figcaption className="ed-shot-cap">
                {content.shot.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 10 — GO DEEPER (ivory slab). An editorial index of the EUDR
   spokes: the article each one answers to, set in mono, and one line
   of what it settles. Reads as a contents page, not a link list.
   Sits AFTER the Close act — the story ends on the receipt + CTA, and
   this is the quiet last word for readers who aren't ready to book.
   Rendered only when the locale has spoke pages (content.deeper set).
   ============================================================= */
export function EudrDeeper({
  content,
}: {
  content: NonNullable<EudrContent["deeper"]>;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ed-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-act-head", start: "top 80%" },
        });
        gsap.from(".ed-deeper-row", {
          autoAlpha: 0,
          y: 20,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ed-deeper-index", start: "top 84%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      aria-label={content.ariaLabel}
      className="ed-slab-wrap ed-deeper"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="ed-slab">
        <div className="st-container">
          <div className="ed-act-head">
            <span className="st-eyebrow">{content.eyebrow}</span>
            <h2 className="st-h2">{content.heading}</h2>
          </div>

          <nav aria-label={content.navAria} className="ed-deeper-index">
            {content.links.map((p) => (
              <Link className="ed-deeper-row" href={p.href} key={p.href}>
                <span className="ed-deeper-cite">{p.cite}</span>
                <span className="ed-deeper-main">
                  <span className="ed-deeper-name">{p.name}</span>
                  <span className="ed-deeper-desc">{p.desc}</span>
                </span>
                <span aria-hidden="true" className="ed-deeper-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9 — CLOSE (dark). Badges + magnetic CTA panels.
   ============================================================= */
const CLOSE_SHOT = {
  img: "/images/eudr/close-receipt.webp",
  w: 1594,
  h: 648,
};

export function EudrClose({ content }: { content: EudrContent["close"] }) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ed-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ed-act-head", start: "top 80%" },
        });
        gsap.from(".ed-close-shot", {
          autoAlpha: 0,
          y: 36,
          scale: 0.985,
          transformOrigin: "center top",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ed-close-shot", start: "top 82%" },
        });
        gsap.from(".ed-close-badge", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ed-close-badges", start: "top 85%" },
        });
        gsap.from(".ed-close-panel", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ed-close-grid", start: "top 85%" },
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".ed-close-panel").forEach((panel) => {
          const arrow = panel.querySelector(".ed-close-arrow");
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
    <section aria-label={content.ariaLabel} className="ed-dark ed-close" ref={ref}>
      {/* Dark sentinel so the header keeps white ink over this ink section
          no matter what precedes it — the deep-dive index (light) now sits
          above the close, so the close can no longer borrow the Calendar's
          dark sentinel. */}
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="dark"
      />
      <div className="st-container">
        <div className="ed-act-head">
          <span className="st-eyebrow">{content.eyebrow}</span>
          <h2 className="st-h2">{content.heading}</h2>
          <p className="ed-act-sub">{content.sub}</p>
        </div>

        <figure className="ed-shot ed-close-shot">
          <div className="ed-shot-frame">
            <span aria-hidden="true" className="ed-shot-bar">
              <i />
              <i />
              <i />
            </span>
            <Image
              alt={content.shot.alt}
              className="ed-shot-img"
              height={CLOSE_SHOT.h}
              sizes="(max-width: 900px) 94vw, 1160px"
              src={CLOSE_SHOT.img}
              width={CLOSE_SHOT.w}
            />
          </div>
          <figcaption className="ed-shot-cap">{content.shot.caption}</figcaption>
        </figure>

        <div className="ed-close-badges">
          {content.badges.map((b) => (
            <div className="ed-close-badge" key={b.head}>
              <strong>{b.head}</strong>
              {b.body}
            </div>
          ))}
        </div>

        {/* Single-purpose close (workplan 16): the CBAM cross-sell panel is
            gone so the last screen offers one action, not an exit. The
            content.cbam strings stay in the locale files for the blog-band
            region should a cross-link return there. */}
        <div className="ed-close-grid">
          <DemoCtaLink className="ed-close-panel is-primary" source="eudr-close">
            <h3>{content.demo.heading}</h3>
            <p>{content.demo.body}</p>
            <span aria-hidden="true" className="ed-close-arrow">
              <ArrowUpRight />
            </span>
          </DemoCtaLink>
        </div>
      </div>
    </section>
  );
}
