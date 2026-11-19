"use client";

/**
 * ACT 3 media — the Bindu OS product window (os-gallery.tsx).
 *
 * A tabbed slider: a real browser window (traffic lights + a real
 * per-surface address) that RESIZES to each live screenshot — constant
 * width, height fits the shot, so nothing is cropped and there is no
 * letterbox void. A labelled cobalt pill rail below switches surfaces,
 * with gentle autoplay (paused on hover / focus, off under reduced
 * motion). One low-alpha cobalt bloom sits behind the window; cobalt is
 * the only colour; mono rail labels and address, sans caption title —
 * the story's own register.
 *
 * Copy is benefit-first: the outcome, then the mechanism. Screens span
 * several example shipments (footwear, steel, cocoa, battery, electrical)
 * — a capability tour, not one linear flow.
 *
 * Images ride the marketing CDN via the global next/image loader.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Surface = {
  key: string;
  label: string;
  path: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const SURFACES: Surface[] = [
  {
    key: "ask",
    label: "Ask",
    path: "/",
    title: "Start with a sentence, not a spreadsheet",
    body: "Describe a shipment in plain words. Bindu classifies it, screens which regulations apply, and opens the right dossier.",
    src: "/images/os/os-ask.webp",
    alt: "The Bindu intake screen: a shipment described in one line above a grid of regulation doors.",
    width: 1640,
    height: 1392,
  },
  {
    key: "classify",
    label: "Classify",
    path: "/threads/8f2c/code",
    title: "Land on the exact declarable code",
    body: "Every declarable code under the heading, drawn as a tree. Click the one that matches; Bindu shows the reasoning and the sources behind the pick.",
    src: "/images/os/os-classify.webp",
    alt: "A tree of every declarable commodity code under a heading, with the chosen code and its full path.",
    width: 1664,
    height: 1818,
  },
  {
    key: "verdict",
    label: "Verdict",
    path: "/threads/8f2c/screening",
    title: "Know where you stand, in one glance",
    body: "Import duty, border-enforcement risk, classification strength and a lower-duty flag, each backed by the measures, rulings and cases beneath it.",
    src: "/images/os/os-verdict.webp",
    alt: "The bottom-line summary: import duty, border enforcement, classification strength and lower-duty route, side by side.",
    width: 2178,
    height: 662,
  },
  {
    key: "defensible",
    label: "Tariff engineering",
    path: "/threads/8f2c/hs",
    title: "See whether a cheaper code will hold",
    body: "Every neighbouring code graded on real binding rulings. Bindu grades the argument; you make the call, and it never tells you which code to declare.",
    src: "/images/os/os-defensible.webp",
    alt: "A plot grading neighbouring customs codes from weak to strong by duty saved, against binding rulings.",
    width: 2226,
    height: 1530,
  },
  {
    key: "cost",
    label: "Cost",
    path: "/threads/8f2c/cost",
    title: "Know the real cost before you commit",
    body: "Duty versus reclaimable VAT, and exactly what a valid proof of origin saves. Here it cuts the duty from 8% to 4.5%.",
    src: "/images/os/os-cost.webp",
    alt: "An all-in cost breakdown: cash to clear customs, goods value, import duty and reclaimable VAT.",
    width: 2200,
    height: 996,
  },
  {
    key: "prepare",
    label: "Checklist",
    path: "/threads/8f2c/checklist",
    title: "Never miss the document that holds the truck",
    body: "Every paper the corridor demands, each naming the law behind it. Missing paperwork stops more shipments than duty does.",
    src: "/images/os/os-prepare.webp",
    alt: "A pre-shipment checklist of required documents, each citing the regulation that requires it.",
    width: 2190,
    height: 1566,
  },
  {
    key: "safetygate",
    label: "Enforcement",
    path: "/threads/8f2c/enforcement",
    title: "See who gets stopped before you ship",
    body: "Every EU Safety Gate case for the product's categories over 52 weeks, by country of origin, with your own corridor marked.",
    src: "/images/os/os-safetygate.webp",
    alt: "A treemap of EU Safety Gate cases by country of origin, sized by count and coloured by enforcement band.",
    width: 2202,
    height: 1604,
  },
  {
    key: "rulings",
    label: "Case law",
    path: "/threads/8f2c/rulings",
    title: "Stand on precedent, not a hunch",
    body: "The full body of binding rulings behind a code, the language they use, and how the count moves year to year across the EU.",
    src: "/images/os/os-rulings.webp",
    alt: "A word cloud of terms from binding rulings on a battery code, above a chart of rulings per year by member state.",
    width: 2212,
    height: 1590,
  },
];

const AUTOPLAY_MS = 6000;

export function StOsGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SURFACES.length;
  const screensRef = useRef<HTMLDivElement | null>(null);
  const cur = SURFACES[active];
  const go = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  // Resize the window to the active screenshot: constant width, height
  // fits the shot's aspect, bounded to a calm band. The shot is contained
  // (never cropped); the small white slack blends into the white screen.
  const syncHeight = useCallback(() => {
    const el = screensRef.current;
    if (!el || !cur) return;
    const w = el.clientWidth;
    const natural = Math.round((w * cur.height) / cur.width);
    const ceiling = Math.min(660, Math.round(window.innerHeight * 0.72));
    const floor = Math.min(380, ceiling);
    el.style.height = `${Math.max(floor, Math.min(natural, ceiling))}px`;
  }, [cur]);

  useEffect(() => {
    syncHeight();
  }, [syncHeight]);
  useEffect(() => {
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, [syncHeight]);

  // Below 901px the browser mock is hidden (story.css) and the caption is
  // all that is left of this section, so the rotation has nothing to show
  // and simply rewrites the prose under whoever is reading it. Touch
  // devices never fire the hover that pauses it, and a reader who tapped a
  // chip on purpose had their choice overridden about six seconds later.
  // Tracked as state with a change listener so a resize past the
  // breakpoint starts or stops it rather than waiting for a remount.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Gentle autoplay; `active` in deps gives each surface its full dwell.
  useEffect(() => {
    if (paused || compact) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % count),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [paused, compact, count, active]);

  return (
    <div
      aria-label="Bindu OS surfaces"
      aria-roledescription="carousel"
      className="osl"
      onBlurCapture={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="osl-frame">
        <span aria-hidden="true" className="osl-bloom" />
        <div className="osl-window">
          <div aria-hidden="true" className="osl-chrome">
            <span className="osl-cdot" />
            <span className="osl-cdot" />
            <span className="osl-cdot" />
            <span className="osl-addr">
              app.getbindu.com<span className="osl-addr-path">{cur?.path}</span>
            </span>
          </div>
          <div className="osl-screens" ref={screensRef}>
            {SURFACES.map((s, i) => (
              <div
                aria-hidden={i !== active}
                className={`osl-screen${i === active ? " is-active" : ""}`}
                key={s.key}
              >
                <Image
                  alt={s.alt}
                  className="osl-shot"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1100px) 92vw, 960px"
                  src={s.src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="osl-caption">
        <h3 className="osl-title">{cur?.title}</h3>
        <p className="osl-body">{cur?.body}</p>
      </div>

      <div aria-label="Choose a surface" className="osl-rail" role="tablist">
        {SURFACES.map((s, i) => (
          <button
            aria-current={i === active}
            aria-selected={i === active}
            className={`osl-chip${i === active ? " is-active" : ""}`}
            key={s.key}
            onClick={() => go(i)}
            role="tab"
            type="button"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
