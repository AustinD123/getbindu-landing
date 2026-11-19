"use client";

/**
 * Shared "process" stepper for every regulation page.
 *
 * One horizontal line with a dot per stage, a sunflower that rolls along the
 * line to the live stage, hover/click/keyboard selection, and a single centred
 * detail panel below — the design first built for CBAM, promoted here so every
 * page reads as one system instead of each carrying its own scroll-pipe.
 *
 * Data shape (`FlowStep`) matches what the pages already declare, so a page
 * swaps its bespoke <XxxFlow/> for <RegulationFlow steps={FLOW_STEPS} …/> with
 * no data reshaping. The stage count is free (6 or 7): the grid columns and the
 * axis insets read `--rf-cols`.
 */

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./regulation-flow.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type FlowStep = {
  n: string;
  label: string;
  head: string;
  body: string;
  chips: string[];
  /** Optional status chip on the panel, e.g. "Planned" for unbuilt engines —
   * one scannable marker instead of the word repeating in every body. */
  tag?: string;
};

type RegulationFlowProps = {
  /** Landmark label, e.g. "How the passport is assembled". */
  ariaLabel: string;
  eyebrow: string;
  heading: string;
  /** Supporting paragraph; may contain <strong>. */
  sub: ReactNode;
  steps: FlowStep[];
};

export function RegulationFlow({
  ariaLabel,
  eyebrow,
  heading,
  sub,
  steps,
}: RegulationFlowProps) {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rollerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);
  // The sunflower's live position along the axis: last x (px) + accumulated
  // rotation (deg), so each hop rolls forward by the true arc it travels.
  const rollState = useRef({ x: 0, rot: 0 });
  const [active, setActive] = useState(0);

  const total = String(steps.length).padStart(2, "0");

  const rollTo = useCallback((i: number, animate: boolean) => {
    const track = trackRef.current;
    const roller = rollerRef.current;
    if (!track || !roller || roller.offsetWidth === 0) return; // hidden on mobile
    const node = track.querySelectorAll<HTMLElement>(".rf-step-node")[i];
    if (!node) return;
    const target = node.offsetLeft + node.offsetWidth / 2 - roller.offsetWidth / 2;
    const circumference = Math.PI * roller.offsetWidth;
    const rot = rollState.current.rot + ((target - rollState.current.x) / circumference) * 360;
    rollState.current = { x: target, rot };
    gsap.to(roller, {
      x: target,
      rotation: rot,
      duration: animate ? 0.55 : 0,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, []);

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
        gsap.from(".rf-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rf-head", start: "top 82%" },
        });
        gsap.from(".rf-step-axis", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rf-step-track", start: "top 86%" },
        });
        gsap.from(".rf-step-node", {
          autoAlpha: 0,
          y: 14,
          scale: 0.7,
          duration: 0.5,
          ease: "back.out(1.6)",
          stagger: 0.07,
          scrollTrigger: { trigger: ".rf-step-track", start: "top 86%" },
        });
        // Parked on the active stage from the start, always visible, so hover
        // never rolls an invisible marker.
        gsap.set(".rf-step-roller", { autoAlpha: 1 });
        rollTo(active, false);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".rf-step-roller", { autoAlpha: 1 });
        rollTo(active, false);
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const track = trackRef.current;
    const btn = track?.querySelectorAll<HTMLElement>(".rf-step-node")[active];
    if (track && btn) {
      track.scrollTo({ left: btn.offsetLeft - track.clientWidth / 2 + btn.offsetWidth / 2, behavior: first.current ? "auto" : "smooth" });
    }
    const panel = panelRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!first.current) {
      rollTo(active, !reduce);
    }
    if (first.current || reduce) {
      first.current = false;
      return;
    }
    if (panel) {
      gsap.fromTo(panel, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [active, rollTo]);

  const step = steps[active] ?? steps[0]!;

  const onRailKey = (e: React.KeyboardEvent, i: number) => {
    const last = steps.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(i + 1, last);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(i - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    trackRef.current?.querySelectorAll<HTMLElement>(".rf-step-node")[next]?.focus();
  };

  return (
    <section aria-label={ariaLabel} className="rf" ref={ref}>
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="light" />
      <div className="rf-slab">
        <div className="st-container">
          <div className="rf-head">
            <span className="st-eyebrow">{eyebrow}</span>
            <h2 className="st-h2">{heading}</h2>
            <p className="rf-sub">{sub}</p>
          </div>

          <div className="rf-step">
            <div
              className="rf-step-track"
              ref={trackRef}
              role="tablist"
              aria-label={ariaLabel}
              style={{ ["--rf-cols" as string]: steps.length }}
            >
              <span aria-hidden="true" className="rf-step-axis" />
              <div aria-hidden="true" className="rf-step-roller" ref={rollerRef}>
                <Image alt="" height={30} src="/bindu-logo.png" width={30} />
              </div>
              {steps.map((s, i) => (
                <button
                  className={`rf-step-node${i === active ? " is-active" : ""}`}
                  key={s.n}
                  type="button"
                  role="tab"
                  id={`rf-step-tab-${s.n}`}
                  aria-selected={i === active}
                  aria-controls={`rf-step-panel-${s.n}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onRailKey(e, i)}
                >
                  <span aria-hidden="true" className="rf-step-dot" />
                  <span className="rf-step-node-n">{s.n}</span>
                  <span className="rf-step-node-label">{s.label}</span>
                </button>
              ))}
            </div>

            <div
              className="rf-step-panel"
              ref={panelRef}
              role="tabpanel"
              id={`rf-step-panel-${step.n}`}
              aria-labelledby={`rf-step-tab-${step.n}`}
            >
              <span className="rf-step-count">
                {step.n} / {total} · {step.label}
                {step.tag && <span className="rf-step-tag">{step.tag}</span>}
              </span>
              <h3 className="rf-step-h3">{step.head}</h3>
              <p className="rf-step-body">{step.body}</p>
              <div className="rf-step-chips">
                {step.chips.map((c) => (
                  <span className="rf-step-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
