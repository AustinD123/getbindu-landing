"use client";

/**
 * The "how it's built" pipeline explorer, shared by every regulation story
 * (/reach, /cbam, /dpp/battery, /dpp/textiles, /dpp/others).
 *
 * Each page used to carry its own byte-identical copy of this markup, differing
 * only in the `.xx-` class prefix and the aria-label — five copies of the same
 * tablist, none of them keyboard-operable. This module is the one copy.
 *
 * Accessibility (the reason it was extracted): a `role="tablist"` promises the
 * tab interaction pattern, so it has to keep the promise —
 *  - every tab has an id and `aria-controls` pointing at the panel;
 *  - the panel has `aria-labelledby` pointing at the *active* tab;
 *  - roving tabindex: only the active tab is in the tab order, and Arrow /
 *    Home / End move between tabs (automatic activation, per the APG's simple
 *    tabs pattern);
 *  - `aria-orientation="vertical"` because the tabs stack vertically, so
 *    Up/Down are the primary keys and Left/Right are accepted as a courtesy.
 *
 * Styling stays per-page: pass `prefix` ("rh", "cb", "bt", "tx", "ot") and the
 * component renders that page's existing `.{prefix}-rails-*` classes, so each
 * story's CSS file is untouched. The per-change reveal animates
 * `.{prefix}-rails-anim` and is owned here, scoped to the panel.
 */

import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type RailsPart = {
  id: string;
  /** Tab title and panel heading. */
  name: string;
  /** Small line under the tab title. */
  role: string;
  /** Eyebrow above the panel heading. */
  tag: string;
  body: string;
  points: string[];
};

type RailsExplorerProps = {
  /** Story class prefix without the dash: "rh" | "cb" | "bt" | "tx" | "ot". */
  prefix: string;
  /** Accessible name for the tablist, e.g. "Bindu REACH pipeline". */
  label: string;
  parts: RailsPart[];
};

export function RailsExplorer({ prefix, label, parts }: RailsExplorerProps) {
  const detailRef = useRef<HTMLDivElement | null>(null);
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(parts[0]!.id);

  // Unique per instance, so two explorers on one page can't collide on ids.
  const uid = useId();
  const tabId = (id: string) => `${uid}-${prefix}-tab-${id}`;
  const panelId = `${uid}-${prefix}-panel`;

  const activeIndex = Math.max(
    0,
    parts.findIndex((p) => p.id === active)
  );
  const activePart = parts[activeIndex]!;

  /** Move selection and focus together — automatic activation. */
  const focusTab = (index: number) => {
    const next = parts[(index + parts.length) % parts.length]!;
    setActive(next.id);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`#${CSS.escape(tabId(next.id))}`)
      ?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(parts.length - 1);
        break;
      default:
        break;
    }
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = detailRef.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(`.${prefix}-rails-anim`),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }
      );
    },
    { scope: detailRef, dependencies: [active] }
  );

  return (
    <div className={`${prefix}-rails-explorer`}>
      <div
        aria-label={label}
        aria-orientation="vertical"
        className={`${prefix}-rails-tablist`}
        onKeyDown={onKeyDown}
        ref={tablistRef}
        role="tablist"
      >
        {parts.map((part) => {
          const isActive = part.id === active;
          return (
            <button
              aria-controls={panelId}
              aria-selected={isActive}
              className={`${prefix}-rails-tab`}
              id={tabId(part.id)}
              key={part.id}
              onClick={() => setActive(part.id)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className={`${prefix}-rails-tab-name`}>{part.name}</span>
              <span className={`${prefix}-rails-tab-role`}>{part.role}</span>
            </button>
          );
        })}
      </div>

      {/* tabIndex 0: the panel holds no focusable children, so it has to be
          reachable itself for a keyboard user to read and scroll it. */}
      <div
        aria-labelledby={tabId(activePart.id)}
        className={`${prefix}-rails-detail`}
        id={panelId}
        ref={detailRef}
        role="tabpanel"
        tabIndex={0}
      >
        <span className={`${prefix}-rails-detail-tag ${prefix}-rails-anim`}>
          {activePart.tag}
        </span>
        <h3 className={`${prefix}-rails-detail-title ${prefix}-rails-anim`}>
          {activePart.name}
        </h3>
        <p className={`${prefix}-rails-detail-body ${prefix}-rails-anim`}>
          {activePart.body}
        </p>
        <ul className={`${prefix}-rails-detail-points ${prefix}-rails-anim`}>
          {activePart.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
