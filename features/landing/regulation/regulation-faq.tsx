"use client";

/**
 * The visible FAQ band — shared by every regulation page.
 *
 * Full-width question rows on a dark stage; clicking one expands its answer,
 * and on a fine pointer the sunflower brand mark follows the cursor across the
 * row. The answers stay in the DOM whatever the open state, so the same text
 * the FAQPage JSON-LD emits is always present for a reader and a crawler.
 * Cursor-follow is gated to (hover: hover) + no-preference, so touch and
 * reduced-motion readers get a plain, still accordion.
 *
 * This renders the SAME array each page ships to Google inside its FAQPage
 * schema, so the two can never disagree.
 */

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import type { FaqItem } from "../seo/regulation-schema";
import "./regulation-faq.css";

gsap.registerPlugin(useGSAP);

export function RegulationFaq({
  items,
  heading = "Frequently asked questions.",
  ariaLabel = "Frequently asked questions",
  eyebrow = "FAQ",
}: {
  items: readonly FaqItem[];
  /** Section heading. Literal, per the landing copy rules. */
  heading?: string;
  /** Section landmark label, announced by screen readers. */
  ariaLabel?: string;
  /** Small label above the heading. */
  eyebrow?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      // Cursor-follow is a pointer affordance only: behind (hover: hover) so a
      // touch device never fires it, and behind no-preference so a
      // reduced-motion reader keeps a still, plain accordion.
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups: Array<() => void> = [];
          gsap.utils.toArray<HTMLElement>(".rfaq-row").forEach((row) => {
            const image = row.querySelector<HTMLElement>(".rfaq-mark");
            if (!image) return;
            gsap.set(image, { xPercent: -50, yPercent: -50 });
            const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
            const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });
            let first = false;
            const align = (e: MouseEvent) => {
              if (first) {
                setX(e.clientX, e.clientX);
                setY(e.clientY, e.clientY);
                first = false;
              } else {
                setX(e.clientX);
                setY(e.clientY);
              }
            };
            const fade = gsap.to(image, {
              autoAlpha: 1,
              ease: "none",
              paused: true,
              duration: 0.12,
              onReverseComplete: () =>
                document.removeEventListener("mousemove", align),
            });
            const enter = (e: MouseEvent) => {
              first = true;
              fade.play();
              document.addEventListener("mousemove", align);
              align(e);
            };
            const leave = () => fade.reverse();
            row.addEventListener("mouseenter", enter as EventListener);
            row.addEventListener("mouseleave", leave);
            cleanups.push(() => {
              row.removeEventListener("mouseenter", enter as EventListener);
              row.removeEventListener("mouseleave", leave);
              document.removeEventListener("mousemove", align);
            });
          });
          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: ref }
  );

  if (items.length === 0) return null;

  return (
    <section aria-label={ariaLabel} className="rfaq" ref={ref}>
      <div className="st-container">
        <div className="rfaq-head">
          <span className="st-eyebrow">{eyebrow}</span>
          <h2 className="st-h2">{heading}</h2>
        </div>

        <ul className="rfaq-list" role="list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="rfaq-row" key={item.question}>
                {/* eslint-disable-next-line @next/next/no-img-element -- GSAP quickTo drives this follower's transform directly; next/image's wrapper fights the fixed-position follow, and it is the decorative brand mark, never the LCP element. */}
                <img
                  aria-hidden="true"
                  alt=""
                  className="rfaq-mark"
                  src="/bindu-logo.png"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="rfaq-q">
                  <button
                    aria-controls={`rfaq-panel-${i}`}
                    aria-expanded={isOpen}
                    className="rfaq-trigger"
                    id={`rfaq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    type="button"
                  >
                    <span className="rfaq-text">{item.question}</span>
                    <span aria-hidden="true" className="rfaq-sign" data-open={isOpen} />
                  </button>
                </h3>
                <div
                  aria-labelledby={`rfaq-trigger-${i}`}
                  className="rfaq-panel"
                  data-open={isOpen}
                  id={`rfaq-panel-${i}`}
                  role="region"
                >
                  <div className="rfaq-panel-inner">
                    <p>{item.answer}</p>
                    {item.source ? (
                      <p className="rfaq-src">
                        Source:{" "}
                        <a
                          href={item.source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.source.label}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
