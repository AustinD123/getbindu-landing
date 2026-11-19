"use client";

/**
 * RegSpine — a horizontal, rolling-sunflower timeline used as a VISUAL SPINE
 * above a full, text-complete date list on the content spokes (/eudr/deadlines,
 * /eudr/sme, /de/eudr/fristen).
 *
 * It deliberately renders no descriptions of its own: the prose lives in the
 * server-rendered list below (all of it in the initial HTML, so nothing is lost
 * for search). The spine is the CBAM-style at-a-glance overview — an axis, a
 * node per date, diamonds for the hard dates, and the sunflower that rolls to
 * whichever date is nearest the middle of the viewport as you read, and to a
 * date you click (which also scrolls its entry into view).
 *
 * The active node is cross-referenced to the list by element id
 * (`${targetPrefix}${i}`); on active change the matching row gets `.is-current`.
 * Without JS the list is a plain, complete timeline — the spine is pure
 * enhancement.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./reg-spine.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type RegSpineNode = { label: string; hard?: boolean };

export function RegSpine({
  nodes,
  ariaLabel,
  targetPrefix,
}: {
  nodes: RegSpineNode[];
  ariaLabel: string;
  /** Row elements to sync with carry id `${targetPrefix}${index}`. */
  targetPrefix: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rollerRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);
  // Suppress scroll-driven active updates briefly after a click, so the
  // programmatic scroll it triggers does not fight the intent.
  const clickLock = useRef(false);
  const rollState = useRef({ x: 0, rot: 0 });
  const [active, setActive] = useState(0);

  // Roll the sunflower to node `i`, rotating in proportion to the distance
  // travelled so it reads as a wheel on the axis rather than a sliding sprite.
  const rollTo = useCallback((i: number, animate: boolean) => {
    const track = trackRef.current;
    const roller = rollerRef.current;
    if (!track || !roller || roller.offsetWidth === 0) return; // hidden on mobile
    const node = track.querySelectorAll<HTMLElement>(".rc-spine-node")[i];
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
        gsap.from(".rc-spine-axis", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rc-spine-track", start: "top 88%" },
        });
        gsap.from(".rc-spine-node", {
          autoAlpha: 0,
          y: 12,
          scale: 0.7,
          duration: 0.45,
          ease: "back.out(1.6)",
          stagger: 0.07,
          scrollTrigger: { trigger: ".rc-spine-track", start: "top 88%" },
        });
        // The sunflower is visible from the start (CSS), parked at the first
        // node; when the track scrolls into view it rolls to the live date.
        // Position-only reveal, so it can never be left stuck invisible.
        gsap.set(".rc-spine-roller", { x: 0, rotation: 0 });
        ScrollTrigger.create({
          trigger: ".rc-spine-track",
          start: "top 88%",
          once: true,
          onEnter: () => rollTo(active, true),
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        rollTo(active, false);
      });
    },
    { scope: ref }
  );

  // Track reading position: the active node follows whichever row sits nearest
  // the vertical middle of the viewport, so the sunflower rolls as you read.
  useEffect(() => {
    const rowEls = nodes.map((_, i) => document.getElementById(`${targetPrefix}${i}`));
    const onScroll = () => {
      if (clickLock.current) return;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      rowEls.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nodes, targetPrefix]);

  // Roll to the active node, and mark the matching list row.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!first.current) rollTo(active, !reduce);
    first.current = false;
    nodes.forEach((_, i) => {
      document.getElementById(`${targetPrefix}${i}`)?.classList.toggle("is-current", i === active);
    });
  }, [active, nodes, rollTo, targetPrefix]);

  const goTo = (i: number) => {
    clickLock.current = true;
    setActive(i);
    document.getElementById(`${targetPrefix}${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      clickLock.current = false;
    }, 800);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = nodes.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(i + 1, last);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(i - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    trackRef.current?.querySelectorAll<HTMLElement>(".rc-spine-node")[next]?.focus();
    goTo(next);
  };

  return (
    <div className="rc-spine" ref={ref}>
      <div
        className="rc-spine-track"
        ref={trackRef}
        role="tablist"
        aria-label={ariaLabel}
        style={{
          gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))`,
          ["--rc-cols" as string]: String(nodes.length),
        }}
      >
        <span aria-hidden="true" className="rc-spine-axis" />
        <div aria-hidden="true" className="rc-spine-roller" ref={rollerRef}>
          <Image alt="" height={34} src="/bindu-logo.png" width={34} />
        </div>
        {nodes.map((n, i) => (
          <button
            className={`rc-spine-node${n.hard ? " is-hard" : ""}${i === active ? " is-active" : ""}`}
            key={`${n.label}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => goTo(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span aria-hidden="true" className="rc-spine-dot" />
            <span className="rc-spine-when">{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
