"use client";

/**
 * RegCalendar — the shared deadline timeline every regulation page renders.
 *
 * Extracted from the CBAM calendar (and its EUDR mirror) so the interaction
 * lives in one place: the dates on one horizontal axis, one open at a time,
 * hard dates as accent diamonds, and the sunflower rolling along the axis to
 * the live date. Scoped .rc-*; each page keeps its own stage class (rh-dark,
 * pw-dark, …) on the section, which carries the stage palette the .rc-*
 * rules read through the shared --st-* tokens.
 *
 * SSR-first like the story acts: authored in the final visible state, GSAP
 * animates FROM hidden only under prefers-reduced-motion: no-preference.
 */

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./reg-calendar.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type RegCalendarRow = {
  when: string;
  /** Hard, binding date: accent diamond node + emphasised label. */
  hard?: boolean;
  /** Small mono caption under the date (e.g. "First bill", "Expected"). */
  flag?: string;
  body: ReactNode;
};

export type RegCalendarProps = {
  /** The page's dark stage class (e.g. "rh-dark") — brings the palette. */
  stageClassName: string;
  ariaLabel: string;
  /** aria-label for the tablist track (e.g. "CBAM deadline timeline"). */
  trackLabel: string;
  eyebrow: string;
  heading: string;
  sub: ReactNode;
  rows: RegCalendarRow[];
  /** Which date opens first. Defaults to the first hard date. */
  defaultIndex?: number;
};

export function RegCalendar({
  stageClassName,
  ariaLabel,
  trackLabel,
  eyebrow,
  heading,
  sub,
  rows,
  defaultIndex,
}: RegCalendarProps) {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const rollerRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);
  // The sunflower's live position along the axis: last x (px) + accumulated
  // rotation (deg), so each hop rolls forward by the true arc it travels.
  const rollState = useRef({ x: 0, rot: 0 });
  // Open on the date that matters most: the caller's pick, else the first
  // hard date, else the first row.
  const [active, setActive] = useState(() => {
    if (defaultIndex !== undefined) return defaultIndex;
    const hard = rows.findIndex((r) => r.hard);
    return hard === -1 ? 0 : hard;
  });

  // Roll the sunflower to the node at index `i`. Rotation is proportional to
  // the horizontal distance travelled (distance / circumference), so it reads
  // as a wheel rolling along the timeline rather than a sprite sliding.
  const rollTo = useCallback((i: number, animate: boolean) => {
    const track = trackRef.current;
    const roller = rollerRef.current;
    if (!track || !roller || roller.offsetWidth === 0) return; // hidden on mobile
    const node = track.querySelectorAll<HTMLElement>(".rc-tl-node")[i];
    if (!node) return;
    const target = node.offsetLeft + node.offsetWidth / 2 - roller.offsetWidth / 2;
    const circumference = Math.PI * roller.offsetWidth;
    const rot = rollState.current.rot + ((target - rollState.current.x) / circumference) * 360;
    rollState.current = { x: target, rot };
    gsap.to(roller, {
      x: target,
      rotation: rot,
      duration: animate ? 0.7 : 0,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rc-act-head > *", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rc-act-head", start: "top 80%" },
        });
        gsap.from(".rc-tl-axis", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rc-tl-track", start: "top 82%" },
        });
        gsap.from(".rc-tl-node", {
          autoAlpha: 0,
          y: 14,
          scale: 0.7,
          duration: 0.5,
          ease: "back.out(1.6)",
          stagger: 0.09,
          scrollTrigger: { trigger: ".rc-tl-track", start: "top 82%" },
        });
        // The sunflower rolls in from the left edge to the live date once the
        // track appears, riding along the axis it traces.
        gsap.set(".rc-tl-roller", { autoAlpha: 0, x: 0, rotation: 0 });
        ScrollTrigger.create({
          trigger: ".rc-tl-track",
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(".rc-tl-roller", { autoAlpha: 1, duration: 0.3 });
            rollTo(active, true);
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // No rolling: park the sunflower on the active date, already visible.
        gsap.set(".rc-tl-roller", { autoAlpha: 1 });
        rollTo(active, false);
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const track = trackRef.current;
    const btn = track?.querySelectorAll<HTMLElement>(".rc-tl-node")[active];
    if (track && btn) {
      track.scrollTo({ left: btn.offsetLeft - track.clientWidth / 2 + btn.offsetWidth / 2, behavior: first.current ? "auto" : "smooth" });
    }
    const panel = panelRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Roll the sunflower to the newly-active date. Skipped on the first pass —
    // the scroll-in reveal handles the initial roll.
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

  const row = rows[active] ?? rows[0]!;

  const onTrackKey = (e: React.KeyboardEvent, i: number) => {
    const last = rows.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(i + 1, last);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(i - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    trackRef.current?.querySelectorAll<HTMLElement>(".rc-tl-node")[next]?.focus();
  };

  return (
    <section
      aria-label={ariaLabel}
      className={`${stageClassName} rc-cal${rows.length >= 8 ? " is-crowded" : ""}`}
      ref={ref}
    >
      <div aria-hidden="true" className="lp-island-sentinel lp-island-sentinel-abs" data-island-mode="dark" />
      <div className="st-container">
        <div className="rc-act-head">
          <span className="st-eyebrow">{eyebrow}</span>
          <h2 className="st-h2">{heading}</h2>
          <p className="rc-act-sub">{sub}</p>
        </div>

        <div className="rc-tl">
          <div
            className="rc-tl-track"
            ref={trackRef}
            role="tablist"
            aria-label={trackLabel}
            style={{ "--rc-cols": rows.length } as React.CSSProperties}
          >
            <span aria-hidden="true" className="rc-tl-axis" />
            <div aria-hidden="true" className="rc-tl-roller" ref={rollerRef}>
              <Image alt="" height={34} src="/bindu-logo.png" width={34} />
            </div>
            {rows.map((r, i) => (
              <button
                className={`rc-tl-node${r.hard ? " is-hard" : ""}${i === active ? " is-active" : ""}`}
                key={`${r.when}-${i}`}
                type="button"
                role="tab"
                id={`rc-tl-node-${i}`}
                aria-selected={i === active}
                aria-controls="rc-tl-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onTrackKey(e, i)}
              >
                <span aria-hidden="true" className="rc-tl-dot" />
                <span className="rc-tl-when">{r.when}</span>
                {r.flag ? <span className="rc-tl-flag">{r.flag}</span> : null}
              </button>
            ))}
          </div>

          <div className="rc-tl-panel" id="rc-tl-panel" ref={panelRef} role="tabpanel" aria-labelledby={`rc-tl-node-${active}`}>
            <p className="rc-tl-panel-body">{row.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
