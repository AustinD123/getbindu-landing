/**
 * Single source of truth for landing pricing.
 *
 * Two layers:
 *  - `PRICES` — the raw figures. Every € number printed anywhere on the
 *    marketing site (pricing switcher, per-regulation price blocks, the
 *    software pages, JSON-LD offers, llms.txt) derives from here.
 *  - `PRICE_TABS` — the English prose built from those figures, rendered by
 *    the central pricing section (StPricing in story/bindu-landing-story.tsx)
 *    and by the per-regulation price block (pricing/regulation-price.tsx).
 *
 * Edit a number in `PRICES` and every surface moves together. Never retype a
 * € figure in prose, interpolate it.
 *
 * Only our own published prices are printed here.
 *
 * Competitor and market figures are not. The "~95% / ~90% / ~80% / ~70%
 * cheaper" badges and the EUDR_INDUSTRY_AMOUNTS anchors that produced them
 * (SME €350 to €950, enterprise €12,000, advisers €50,000) were seed-deck
 * estimates with no source a reader could check. They were removed once,
 * restored by `581d872`, and removed again here with the export deleted, so
 * there is no longer a mechanism to print one. Two of them also disagreed
 * with each other: the CBAM badge said ~70% while its own industry line said
 * "up to 79% under".
 *
 * `pct` now says how each price BEHAVES (Prepaid, Per filing, Two parts, Two
 * payers, Fixed) and `industry` says how the alternatives CHARGE, as a model.
 * The bar: a market figure returns only with a source a reader can follow, on
 * the page, next to it. The former JRC €2,550-a-SKU figure on the DPP tab was
 * cut on 2026-08-18: it had no followable primary source (even secondary
 * sources name no JRC report), and it is a documented overestimate, with
 * real-world per-SKU data-work costs at €1 to €10, so it failed both this
 * bar and the honesty stance the page trades on.
 */

/** The raw figures, in euros. The only place a price is authored. */
export const PRICES = {
  /** HS: one credit pack, and what a single trade costs inside it. */
  hsPack: 100,
  hsPerTrade: 5,
  /** EUDR: filing, then the retention term chosen at filing (Art. 12(5)). */
  eudrFiling: 199,
  eudrRetain5: 50,
  eudrRetain10: 100,
  /** CBAM: the quarterly run fee and the per-declaration filing fee. */
  cbamQuarter: 999,
  cbamFiling: 199,
  /** DPP: the brand's quarterly fee and the label printer's per-unit fee. */
  dppQuarter: 999,
  dppUnit: 0.59,
  /** PPWR: one shipment's packaging file (REACH checks included, D3). */
  ppwrShipment: 299,
  /** Charged to every filer regardless of volume, on every regulation. */
  workspaceMonth: 20,
} as const;

/**
 * Format a figure the way the reader's own locale writes money.
 *
 * The separator is not cosmetic: `€12,000` is twelve thousand euros in en-GB
 * and twelve euros in de/nl/it/es/pl, where the comma is the decimal mark. So
 * the locale has to travel with the number. Callers on English surfaces get
 * `€12,000`; `/de/eudr` gets `12.000 €`, `/fr/eudr` gets `12 000 €`.
 */
export function eur(amount: number, locale = "en-GB"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

/** Derived figures, so no surface ever does the arithmetic in prose. */
export const DERIVED = {
  /** The minimum a dossier ever costs: filing + the 5-year default term. */
  eudrDossier: PRICES.eudrFiling + PRICES.eudrRetain5,
  /** Four declarations a year. */
  cbamYear: PRICES.cbamQuarter * 4,
  /** A 100,000-unit print run at the label printer's per-unit fee. */
  dppRunUnits: 100000,
  dppRunTotal: PRICES.dppUnit * 100000,
} as const;

/**
 * The workspace-fee sentence that closes every price block. Shared so the
 * homepage switcher and the per-regulation blocks cannot drift.
 */
export const PRICING_NOTE = `Keeping your workspace live is ${eur(
  PRICES.workspaceMonth
)} a month. EU-hosted, GDPR compliant. Prices exclude VAT.`;

export type PriceTabId = "hs" | "eudr" | "cbam" | "dpp" | "ppwr" | "reach";

export type PriceTab = {
  id: PriceTabId;
  label: string;
  eyebrow: string;
  /**
   * The headline figure as a raw number, so a localized surface can format it
   * for its own reader. `price` is the same figure pre-formatted in en-GB.
   */
  amount: number;
  price: string;
  unit: string;
  /**
   * Big word in the dark badge. Says how the price behaves, never how much
   * cheaper it is than someone else: a comparison we cannot source does not
   * go on the page.
   */
  pct: string;
  /** Small line under the badge word. */
  vs: string;
  lines: string[];
  /**
   * How the alternatives charge, as a pricing model. No euro figures unless
   * a source can be printed beside them.
   */
  industry: string;
};

export const PRICE_TABS: PriceTab[] = [
  {
    id: "hs",
    label: "HS Code",
    eyebrow: "Trade compliance · classify and screen",
    amount: PRICES.hsPack,
    price: eur(PRICES.hsPack),
    unit: `${PRICES.hsPack / PRICES.hsPerTrade} trades. One run classifies and screens a line.`,
    pct: "Prepaid",
    vs: "credits, not a subscription",
    lines: [
      "Upload an invoice, get the HS or CN code on every line.",
      "Origin, destination and role checked against each regulation that applies.",
      `${eur(PRICES.hsPerTrade)} a trade. Credits work across the platform.`,
    ],
    industry: "Brokers bill per line and trade advisers bill by the day. Bindu bills per trade.",
  },
  {
    id: "eudr",
    label: "EUDR",
    eyebrow: "EUDR · due-diligence dossier",
    amount: DERIVED.eudrDossier,
    price: eur(DERIVED.eudrDossier),
    unit: `a dossier. ${eur(PRICES.eudrFiling)} to file, ${eur(
      PRICES.eudrRetain5
    )} to keep.`,
    pct: "Per filing",
    vs: "no seats, no annual licence",
    lines: [
      `${eur(PRICES.eudrFiling)} files the DDS to TRACES and returns the reference customs asks for.`,
      `${eur(PRICES.eudrRetain5)} keeps it the five years the law requires.`,
      `${eur(PRICES.eudrRetain10)} keeps it the full ten years.`,
      `${eur(PRICES.workspaceMonth)} a month keeps your workspace live to file.`,
    ],
    industry: "The alternatives bill per seat or per year. Bindu bills per dossier filed.",
  },
  {
    id: "cbam",
    label: "CBAM",
    /*
     * "annual declaration", not "quarterly". Quarterly reports were the
     * TRANSITIONAL regime and ended on 31 December 2025. Since 1 January 2026
     * the definitive regime is one annual declaration, due the following
     * 30 September, which is what /cbam and /cbam/software both say. What is
     * quarterly is the 50% certificate hold, not the declaration.
     */
    eyebrow: "CBAM · annual declaration",
    amount: PRICES.cbamQuarter,
    price: eur(PRICES.cbamQuarter),
    unit: `a quarter to keep every obligation, deadline and document on one record, ${eur(PRICES.cbamFiling)} when you file.`,
    pct: "Two parts",
    vs: "a quarterly platform fee, then per filing",
    /*
     * Three lines, each of which used to claim something the product does not
     * do. Kept here as the guardrail for the next edit:
     *
     *   "Four declarations a year from your real supplier data."
     *     Wrong on cadence (see the eyebrow above) and on capability: Bindu
     *     holds the attachments, it does not ingest or process supplier data.
     *
     *   "no +10% default markup on your emissions"
     *     Only means anything if Bindu computes embedded emissions. It does
     *     not, and cbam-story.tsx says so in as many words: "Bindu does not
     *     compute this figure today, and calculating it is on the roadmap."
     *     The backend agrees: CBAM carries a template and no assembler.
     *
     *   "One dataset covers the EU, UK and Australia."
     *     There is no UK or Australian handling anywhere in the backend or in
     *     packages/core. Australia operates no carbon border mechanism, and
     *     the UK's is a separate scheme with its own scope and timetable, so
     *     no single dataset could cover the three.
     *
     * What replaces them is the one thing this product genuinely does for
     * CBAM: it keeps the six obligations, their evidence and their dates on
     * one record, and you file.
     */
    lines: [
      "One annual declaration, with the activity data and the verifier report on one record.",
      `${eur(PRICES.cbamFiling)} a filing. Published, not quoted.`,
      `${eur(DERIVED.cbamYear)} a year to run. Every obligation on one record, with its evidence and its date.`,
    ],
    industry: "Enterprise CBAM platforms bill an annual licence and verifiers bill per site. Bindu bills per filing.",
  },
  {
    id: "dpp",
    label: "DPP",
    eyebrow: "Digital Product Passport · two payers, one record",
    amount: PRICES.dppQuarter,
    price: eur(PRICES.dppQuarter),
    unit: "a quarter for the brand. The label printer pays the rest.",
    pct: "Two payers",
    vs: "the brand pays quarterly, the printer per unit",
    lines: [
      `Brand: ${eur(PRICES.dppQuarter)} a quarter for the product record and supply-chain collection.`,
      `Label printer: ${eur(PRICES.dppUnit)} a unit at print, once passport minting ships. A ${DERIVED.dppRunUnits.toLocaleString(
        "en-GB"
      )} run is ${eur(DERIVED.dppRunTotal)}.`,
      "Battery passport 18 Feb 2027, textiles follow.",
    ],
    // Platform and QR pricing is quoted per project, so there is nothing
    // checkable to print and we publish ours instead.
    industry: "DPP platform and QR pricing is quoted per project. Bindu publishes its price instead.",
  },
  {
    id: "ppwr",
    label: "PPWR",
    eyebrow: "PPWR · the packaging file",
    amount: PRICES.ppwrShipment,
    price: eur(PRICES.ppwrShipment),
    unit: "a shipment, once the packaging file ships.",
    pct: "Per shipment",
    vs: "one price per shipment, REACH checks included",
    /*
     * Owner price (2026-08-18, workplan 16 D6): €299 a shipment. Future
     * tense on line one, deliberately: /ppwr says throughout that the
     * packaging engine is not built, so this block describes what the file
     * will cost, never that it runs today. REACH checks ride along at no
     * separate charge (D3).
     */
    lines: [
      "The packaging file is in build. This is what a shipment will cost when it ships.",
      "Every packaging type on the shipment screened, limb by limb, into one file.",
      "Held ready to produce within ten days when an authority asks. REACH checks included, no separate charge.",
    ],
    industry: "Consultancies bill packaging reviews by the hour. Bindu will bill per shipment.",
  },
  {
    id: "reach",
    label: "REACH",
    eyebrow: "REACH · covered by the PPWR offer",
    amount: 0,
    price: eur(0),
    unit: "extra. REACH checks ship as part of the PPWR packaging offer.",
    pct: "Included",
    vs: "one offer covers packaging and REACH, no separate charge",
    /*
     * Owner decision (2026-08-18, workplan 16 D3): REACH is never sold
     * separately. It ships inside the PPWR packaging offer at no extra
     * charge, so this tab carries the bundle statement instead of a
     * standalone price. REACH screening is still in build: keep the future
     * tense on line one so this block never contradicts /reach, which says
     * five separate times that none of it is live.
     */
    lines: [
      "REACH screening is in build and ships as part of the PPWR packaging offer, at no separate charge.",
      "The design: you ask a supplier up the chain for the one document you need.",
      "They approve it in their own workspace, pinned to the Candidate List version of the day.",
    ],
    industry: "Consultancies bill this by the hour. With Bindu it is included in the packaging offer.",
  },
];

export function getPriceTab(id: PriceTabId): PriceTab | undefined {
  return PRICE_TABS.find((t) => t.id === id);
}
