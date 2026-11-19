/**
 * Shared primitives for the story-landing sections. Kept in one module so the
 * demo CTA and its slot-machine label aren't re-authored per section.
 */

import { ArrowRight } from "lucide-react";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";

/**
 * Slot-machine label for .st-btn: the visible text rolls out upward while an
 * identical clone rolls in from below (GSAP hover-demo pattern). The clone is
 * parked off-slot by CSS so no-JS and reduced-motion users see a plain label.
 */
export function BtnLabel({ text }: { text: string }) {
  return (
    <span className="st-btn-roll">
      <span className="st-btn-text">{text}</span>
      <span aria-hidden="true" className="st-btn-text st-btn-text-dup">
        {text}
      </span>
    </span>
  );
}

/**
 * Primary demo CTA: the identical booking anchor repeated across sections.
 *
 * There is no label prop. Every demo anchor on the landing surface wears
 * DEMO_CTA_LABEL, so one wording accumulates recognition instead of several
 * competing for it, and a page cannot quietly invent a second one. `source`
 * names the act the click came from so the hero and the mid-page repeat can be
 * told apart in Plausible.
 */
export function DemoButton({ source = "story" }: { source?: string }) {
  return (
    <DemoCtaLink className="st-btn st-btn-primary" source={source}>
      <BtnLabel text={DEMO_CTA_LABEL} />
      <ArrowRight aria-hidden="true" />
    </DemoCtaLink>
  );
}
