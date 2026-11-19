/**
 * Per-regulation price block for the standalone regulation pages
 * (/eudr, /cbam, /dpp/*). Renders one regulation's split price using the
 * SAME shared data (price-data.ts) and the SAME `st-price-*` / `st-pricing`
 * styles as the central pricing section, so the two can never disagree.
 *
 * story.css (which defines these classes and their tokens) is imported
 * globally by app/landing-chrome.tsx, so the classes resolve on every
 * landing page without an extra import here.
 */

import { ArrowRight } from "lucide-react";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
import {
  DERIVED,
  PRICES,
  PRICING_NOTE,
  eur,
  getPriceTab,
  type PriceTabId,
} from "./price-data";

/**
 * Every price-data figure, pre-formatted the way the reader's locale prints
 * money.
 *
 * Localized prose never types a € figure: it receives this object and
 * interpolates from it, so a translation can only ever print a number that
 * price-data authored. Change a figure in PRICES and all seven locales move.
 *
 * The formatting is per-locale, not shared: `€12,000` means twelve euros to a
 * German, Dutch, Italian, Spanish or Polish reader, so the same figure has to
 * be rendered as `12.000 €` / `12 000 €` on those pages.
 */
export type PriceFigures = {
  [K in keyof typeof PRICES | keyof typeof DERIVED]: string;
};

function buildFigures(locale: string): PriceFigures {
  return {
    hsPack: eur(PRICES.hsPack, locale),
    hsPerTrade: eur(PRICES.hsPerTrade, locale),
    eudrFiling: eur(PRICES.eudrFiling, locale),
    eudrRetain5: eur(PRICES.eudrRetain5, locale),
    eudrRetain10: eur(PRICES.eudrRetain10, locale),
    cbamQuarter: eur(PRICES.cbamQuarter, locale),
    cbamFiling: eur(PRICES.cbamFiling, locale),
    dppQuarter: eur(PRICES.dppQuarter, locale),
    dppUnit: eur(PRICES.dppUnit, locale),
    ppwrShipment: eur(PRICES.ppwrShipment, locale),
    workspaceMonth: eur(PRICES.workspaceMonth, locale),
    eudrDossier: eur(DERIVED.eudrDossier, locale),
    cbamYear: eur(DERIVED.cbamYear, locale),
    // A unit count, not a price: printed as "100,000", never with a euro sign.
    dppRunUnits: DERIVED.dppRunUnits.toLocaleString(locale),
    dppRunTotal: eur(DERIVED.dppRunTotal, locale),
  };
}

/** A localized sentence that prints one or more € figures. */
export type PriceSentence = (figures: PriceFigures) => string;

/**
 * Localized prose for the price block. When supplied (on a non-English
 * regulation page), these override the English strings.
 *
 * Anything that prints a € figure is a function of the figures, not a
 * string: translators write the prose and the numbers are interpolated at
 * render time from price-data.ts. Omit the whole slice and the block renders
 * the English defaults straight from price-data.
 */
export type RegulationPriceStrings = {
  /**
   * BCP-47 tag of the page this block renders on. Decides how every € figure
   * is written, including the headline number.
   */
  locale: string;
  /** Section landmark label, announced by screen readers ("Pricing"). */
  ariaLabel: string;
  /** Section eyebrow above the heading ("Pricing"). */
  eyebrow: string;
  /**
   * CTA button label: the locale's translation of DEMO_CTA_LABEL. It used to
   * read "Get your price", which promised a number and opened a calendar while
   * the number was already on screen beside it.
   */
  cta: string;
  /**
   * Optional override for the big word in the dark badge. Left unset, the
   * badge prints `tab.pct`, which is now a behaviour word (Prepaid, Per
   * filing, Two parts, Two payers, Fixed) rather than a comparative, so it
   * needs no translation to stay true on a localized page.
   */
  badge?: string;
  /** Plan eyebrow inside the panel (localized `tab.eyebrow`). */
  planEyebrow: string;
  /** Unit line under the big figure (localized `tab.unit`). */
  unit: PriceSentence;
  /** Small line under the badge figure (localized `tab.vs`). */
  vs: string;
  /** Detail lines (localized `tab.lines`). */
  lines: (figures: PriceFigures) => string[];
  /** Label before the industry comparison ("Industry:"). */
  industryLabel: string;
  /** Industry comparison line (localized `tab.industry`). */
  industry: string;
  /** Footnote under the panel (localized PRICING_NOTE). */
  note: PriceSentence;
};

type RegulationPriceProps = {
  /** Which price entry to show. A bad id is a compile error, not a blank page. */
  reg: PriceTabId;
  /** Section heading. Defaults to a plain, literal line. */
  heading?: string;
  /**
   * Localized prose overrides. Omit for English pages: the block then reads
   * its labels straight from price-data.ts.
   */
  strings?: RegulationPriceStrings;
};

export function RegulationPrice({
  reg,
  heading = "What it costs.",
  strings,
}: RegulationPriceProps) {
  // `reg` is a PriceTabId, so price-data always has the entry.
  const tab = getPriceTab(reg)!;

  // Prose falls back to the English strings; the € figures are always the
  // price-data values, formatted for the locale this block renders in.
  const locale = strings?.locale ?? "en-GB";
  const figures = buildFigures(locale);
  const ariaLabel = strings?.ariaLabel ?? "Pricing";
  const eyebrow = strings?.eyebrow ?? "Pricing";
  const cta = strings?.cta ?? DEMO_CTA_LABEL;
  const planEyebrow = strings?.planEyebrow ?? tab.eyebrow;
  const price = strings ? eur(tab.amount, locale) : tab.price;
  const unit = strings?.unit(figures) ?? tab.unit;
  const badge = strings?.badge ?? tab.pct;
  const vs = strings?.vs ?? tab.vs;
  const lines = strings?.lines(figures) ?? tab.lines;
  const industryLabel = strings?.industryLabel ?? "Industry:";
  const industry = strings?.industry ?? tab.industry;
  const note = strings?.note(figures) ?? PRICING_NOTE;

  return (
    <section aria-label={ariaLabel} className="st-pricing">
      <div className="st-container">
        <div className="st-pricing-head st-pricing-head--solo">
          <div>
            <span className="st-pricing-eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
          </div>
          <DemoCtaLink className="st-pricing-cta" source={`${reg}-price`}>
            {cta}
            <ArrowRight aria-hidden="true" />
          </DemoCtaLink>
        </div>

        <div className="st-price-panel">
          <div className="st-price-hero">
            <p className="st-price-eyebrow">{planEyebrow}</p>
            <span className="st-price-num">{price}</span>
            <p className="st-price-unit">{unit}</p>
            <div className="st-price-badge">
              <span className="st-price-badge-pct">{badge}</span>
              <span className="st-price-badge-vs">{vs}</span>
            </div>
          </div>
          <div className="st-price-detail">
            <ul className="st-price-lines">
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="st-price-industry">
              {industryLabel} {industry}
            </p>
          </div>
        </div>

        <p className="st-pricing-note">{note}</p>
      </div>
    </section>
  );
}
