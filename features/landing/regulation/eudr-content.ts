/**
 * EUDR page content model — every visible string on /eudr, typed, so the
 * page renders identically in any locale (en at /eudr, de/pl/it/nl at
 * /{locale}/eudr). Structure (images, sizes, CN codes, article refs, GSAP)
 * stays in the components; only strings live here.
 *
 * Rich strings: `**bold**` spans render as <strong> via renderRich() in
 * eudr-story.tsx — translations may move the bold span freely.
 *
 * Translation rules (docs/EUDR-I18N-HANDOFF.md): never translate CN codes,
 * TRACES, GeoJSON, Bindu, or the identifying NUMBER of a regulation, article,
 * annex or date. Everything around the number does translate: each language
 * has an official EUR-Lex form ("Verordnung (EU) 2023/1115", "Artikel 9
 * Absatz 1 Buchstabe d", "Anhang I") and dates keep their value but take the
 * locale's format. Keep the DDS acronym and localize its expansion once. No
 * em-dash in any visible copy, in any language.
 */

import type { RegulationPriceStrings } from "../pricing/regulation-price";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";

/**
 * Localized price block for /{locale}/eudr: the shared render contract plus
 * the section heading the page passes as its own prop.
 *
 * Translators write prose only. Every € figure arrives as an argument
 * (`unit`, `lines` and `note` are functions of the price-data figures), so a
 * locale physically cannot quote a price the platform does not charge.
 */
export type EudrPricing = RegulationPriceStrings & {
  /** Section heading ("What an EUDR dossier costs."). */
  heading: string;
};

/*
 * The "Industry:" line describes how the alternatives CHARGE, as a pricing
 * model. It carries no euro figures: the market anchors the locale files used
 * to interpolate were unsourced, and were deleted with them on 2026-08-16. A
 * market figure returns only with a source printed beside it.
 */

export type EudrContent = {
  /** BCP-47 language tag for <html lang>, JSON-LD inLanguage. */
  lang: string;
  hero: {
    /** Hero section aria-label. */
    label: string;
    /**
     * Mono reg-code line. The regulation number and the date value are fixed;
     * the regulation's NAME and the date FORMAT follow the locale.
     */
    code: string;
    title: string;
    /** Rich: **bold** spans allowed. */
    sub: string;
    /**
     * Primary CTA label: this locale's translation of DEMO_CTA_LABEL. Never a
     * second wording for the same booking link.
     */
    cta: string;
    /**
     * Ghost CTA beside it. An in-page anchor to the journey act, so the hero
     * has one booking destination and one "show me" destination rather than
     * two buttons pointing at the same calendar.
     */
    ctaSecondary: string;
  };
  problem: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    /** Rich. */
    lead: string;
    /** The four relay nodes, in order: plot, cooperative, exporter, importer. */
    nodes: { name: string; tier: string }[];
    lostLabel: string;
    flowCaption: string;
    /** Labels for the four stats (numbers/suffixes are structural). */
    stats: string[];
    verdictQuote: string;
    verdictCite: string;
  };
  journey: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    /** Rich. */
    sub: string;
    /** The Annex I CN headings line. Codes stay; commodity names translate. */
    codes: string;
    /**
     * Five steps, same order as the structural JOURNEY_META.
     *
     * `art` is the article reference printed beside the step number. The
     * NUMBER is invariant (9(1)(d) is 9(1)(d) in every language); the way it
     * is written is not, so each locale carries its own EUR-Lex form:
     * "Art. 9(1)(d)" in English, "Artikel 9 Abs. 1 Buchst. d" in German,
     * "art. 9 ust. 1 lit. d" in Polish.
     */
    steps: {
      ask: string;
      law: string;
      art: string;
      caption: string;
      alt: string;
    }[];
  };
  chain: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    sub: string;
    subhead: string;
    filesBadge: string;
    noFilesBadge: string;
    /** Five roles, same order as the structural files/no-files flags. */
    roles: { role: string; body: string }[];
    invite: { heading: string; body: string };
    supplierShot: { alt: string; caption: string };
    share: { heading: string; body: string };
    shareShot: { alt: string; caption: string };
  };
  scan: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    sub: string;
    /** aria-label of the tier radiogroup. */
    tierAria: string;
    tiers: { low: string; standard: string; high: string };
    /** Six field names per tier. */
    fields: { low: string[]; standard: string[]; high: string[] };
    caption: string;
    /** Crawlable summary of the three tiers. */
    facts: { low: string; standard: string; high: string };
  };
  flag: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    lead: string;
    text: string;
    reasons: string[];
    shot: { alt: string; caption: string };
  };
  calendar: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    sub: string;
    /** Six rows. A date keeps its VALUE and takes the locale's FORMAT. */
    rows: { when: string; flag?: string; body: string }[];
  };
  close: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    sub: string;
    shot: { alt: string; caption: string };
    badges: { head: string; body: string }[];
    demo: { heading: string; body: string };
    cbam: { heading: string; body: string };
  };
  /**
   * Labels for the visible FAQ band. The questions and answers themselves are
   * `seo.jsonLd.faq`: the band renders the same array the FAQPage schema
   * emits, so the page and the search result can never disagree.
   */
  faqBand: { ariaLabel: string; heading: string };
  /**
   * Optional localized prose for the per-regulation price block. English
   * omits this slice and the block falls back to the price-data defaults.
   */
  pricing?: EudrPricing;
  /**
   * Optional "go deeper" index. Currently unused: the deep-dive spokes and the
   * per-commodity pages it used to link were consolidated into this pillar on
   * 2026-08-18. Kept optional so a locale can reintroduce an index without a
   * type change; when omitted the section is not rendered.
   */
  deeper?: {
    ariaLabel: string;
    eyebrow: string;
    heading: string;
    navAria: string;
    links: { href: string; cite: string; name: string; desc: string }[];
  };
  seo: {
    /** <title> without the "| Bindu" template suffix. Aim ≤ 60 chars. */
    title: string;
    /** Meta description. Aim ≤ 160 chars. */
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    jsonLd: {
      headline: string;
      description: string;
      faq: { question: string; answer: string; source?: { label: string; href: string } }[];
    };
  };
};

/** Locale → path map for hreflang. x-default is the English source. */
export const EUDR_LOCALE_PATHS = {
  en: "/eudr",
  de: "/de/eudr",
  pl: "/pl/eudr",
  it: "/it/eudr",
  nl: "/nl/eudr",
  fr: "/fr/eudr",
  es: "/es/eudr",
} as const;

export const EUDR_HREFLANG: Record<string, string> = {
  ...EUDR_LOCALE_PATHS,
  "x-default": EUDR_LOCALE_PATHS.en,
};

export const eudrContentEN: EudrContent = {
  lang: "en",
  hero: {
    label: "EUDR: what to collect, and when",
    code: "Regulation (EU) 2023/1115 · EUDR · Large operators 30 Dec 2026",
    title: "EUDR: what to collect, and when.",
    sub: "Seven commodities, one cutoff: **31 December 2020**. Bindu takes an importer from supplier coordinates to a filed **Due Diligence Statement (DDS)**: plots validated, forest-checked against the cutoff, and filed to TRACES with the reference customs asks for.",
    cta: DEMO_CTA_LABEL,
    ctaSecondary: "See the five screens",
  },
  problem: {
    ariaLabel: "The problem",
    eyebrow: "EUDR operator liability",
    heading: "The proof starts at the farm, but the importer carries the liability.",
    lead: "A bag of cocoa passes through a farmer, a cooperative and an exporter before an EU importer ever sees it. The law wants two proofs: the exact plot it grew on, and that the land was neither cleared after **31 December 2020** nor farmed against local law. Both are born at the first hand and must survive every handoff. Break the relay anywhere and the **importer** carries the fine.",
    nodes: [
      { name: "Plot", tier: "Farmer" },
      { name: "Cooperative", tier: "Bridge" },
      { name: "Exporter", tier: "Trader" },
      { name: "Importer", tier: "Files the DDS" },
    ],
    lostLabel:
      "Where the data breaks: a missing coordinate, a lost title, records nobody kept",
    flowCaption:
      "The importer files, but the proof is born at the plot. Coordinates, land title, harvest records: lose any of it at a handoff and the container stops at the border.",
    stats: [
      "commodities that now need a geolocated, legal origin",
      "of EU-wide turnover, the level fines can reach",
      "of forest lost a year, on FAO's count; about a tenth traced to EU demand",
      "mixing tolerated. One unverified bag fails the whole container",
    ],
    verdictQuote:
      "Trust moved containers into Europe for decades. A supplier's word and a scheme logo were enough. Now the law wants the ground the goods grew on.",
    verdictCite: "EUDR · Regulation (EU) 2023/1115 · in plain words",
  },
  journey: {
    ariaLabel: "The journey",
    eyebrow: "EUDR filing process",
    heading: "The EUDR filing in five steps.",
    sub: "**Cattle, cocoa, coffee, oil palm, rubber, soya, wood**: place any of them on the EU market and the EU Deforestation Regulation asks **five things**. Here is each demand, and the screen inside Bindu that answers it, followed through one coffee shipment from farm to filing.",
    codes:
      "Primary Annex I CN headings: coffee 0901 · cocoa 1801 · soya 1201 · oil palm 1511 · cattle 0102 · rubber 4001 · wood 4401.",
    steps: [
      {
        ask: "Where did it grow?",
        art: "Art. 9(1)(d)",
        law: "Coordinates for every plot that fed the batch, no sampling: a six-decimal point under 4 hectares, a traced boundary above it. Cattle is the one commodity a single point never satisfies.",
        caption:
          "Search the map, drop points, trace boundaries, or upload GeoJSON. Plots are saved once and reused on every shipment after.",
        alt: "Bindu farm-mapping screen: coffee plots near Badulla, Sri Lanka, captured as GPS points and a traced boundary, each with six-decimal coordinates.",
      },
      {
        ask: "Was it forest on 31 December 2020?",
        art: "Art. 3(a)",
        law: "Nothing grown on land deforested after the cutoff may enter the EU market, whether or not the clearing was legal where it happened.",
        caption:
          "Three independent satellite checks per plot, minutes per batch. They flag risk; the legal conclusion stays yours.",
        alt: "Bindu forest-check results table: four plots came back clear, one plot flagged with the satellite finding and a Resolve action.",
      },
      {
        ask: "Was it grown legally?",
        art: "Art. 2(40)",
        law: "Legal under the producer country's own law, across eight areas: land rights, environment, forest rules, third-party rights, labour, human rights, FPIC, tax and trade.",
        caption:
          "Eight questions per filing, proof attached where you hold it. A no needs a reason; land rights needs a document.",
        alt: "Bindu legality checklist: the eight Article 2(40) legal areas answered, with supporting proof documents uploaded.",
      },
      {
        ask: "Who signs for it?",
        art: "Art. 4(2)",
        law: "The operator attests, in a Due Diligence Statement, that the risk of non-compliance is negligible, and stays liable for what the statement claims.",
        caption:
          "The declaration assembles itself from your plots, harvests and checks. You read it over, fix anything off, and confirm.",
        alt: "Bindu declaration screen: the generated EUDR due-diligence summary with product, plots, screening results and legality attestations.",
      },
      {
        ask: "How does it reach the border?",
        art: "Art. 33",
        law: "The statement is filed in TRACES, the EUDR Information System, before the goods are placed on the market or exported.",
        caption:
          "One click to TRACES. The reference number comes back and travels on the customs declaration.",
        alt: "Bindu filing screen: the due diligence statement ready to submit to the EU TRACES system.",
      },
    ],
  },
  chain: {
    ariaLabel: "The chain",
    eyebrow: "Supplier data collection",
    heading: "One party files the DDS. The data comes from the whole chain.",
    sub: "Only one party is liable, yet the proof it needs is spread across five. This is the chain Bindu is built to serve, and the part that lets those parties hand proof to each other is in build: today a filing is assembled inside one workspace, and nothing crosses to another company.",
    subhead: "Who files the DDS, and who supplies the data",
    filesBadge: "Files the DDS",
    noFilesBadge: "No DDS of its own",
    roles: [
      {
        role: "Solo operator",
        body: "Imports and already holds the whole chain: farm maps, harvest records, legality. Nothing to collect from anyone else.",
      },
      {
        role: "Operator",
        body: "First to place the goods on the EU market. Collects the maps and records from its suppliers, then files the DDS.",
      },
      {
        role: "Trader",
        body: "Buys and sells goods already on the market, unchanged. Keeps and passes on its suppliers' DDS references.",
      },
      {
        role: "Downstream manufacturer",
        body: "Turns the goods into another product before selling it on. Carries the upstream DDS references with the new article.",
      },
      {
        role: "Producer (farm or co-op)",
        body: "Grows the commodity. Packages its plots and legality records as a data package for the buyer who files.",
      },
    ],
    invite: {
      heading: "Invite suppliers to share their data.",
      body: "**In build.** The operator opens a filing and the chain is already there: a producer or trader that shared a package appears under **Shared with you**, ready to use with one click, and dropping an invoice reads the supplier off it and sends the invite. None of that is live yet. Today you load what your suppliers send you into the dossier yourself.",
    },
    supplierShot: {
      alt: "Bindu chain step of an EUDR filing: data packages a producer already shared waiting to be used, beside an invoice dropzone that reads the supplier and invites them.",
      caption:
        "The design: the partner's package already waiting, one click, no re-typing, or drop the invoice and Bindu reads the supplier off it. Not live yet.",
    },
    share: {
      heading: "Give a buyer access without sending a copy.",
      body: "**In build.** Every plot, invoice and document stays in the workspace that created it, and a share is designed to grant the buyer standing access rather than send a copy: their workspace pulls the package, or takes the ZIP offline. That is how a farm will prove it is low-risk to its buyers without giving away its coordinates. It is not live yet, and until it is, no data leaves your workspace at all.",
    },
    shareShot: {
      alt: "Bindu share panel: grant a buyer's workspace standing access to a data package, or download the evidence pack as a ZIP.",
      caption:
        "The design: the supplier shares from its own workspace and the buyer's workspace pulls the package, so raw farm data never leaves the party that owns it. Not live yet.",
    },
  },
  scan: {
    ariaLabel: "Country risk tiers",
    eyebrow: "EUDR risk classification",
    heading: "The country of origin decides how much due diligence you owe.",
    sub: "Article 29 sorts every country into three risk tiers, and the tier decides how much due diligence is required and how often you get checked. Pick a tier. Watch the requirements change.",
    tierAria: "Risk tier",
    tiers: { low: "Low risk", standard: "Standard risk", high: "High risk" },
    fields: {
      low: [
        "140 countries in scope",
        "All the EU, the US, China",
        "Collect the data, file the DDS",
        "No risk assessment required",
        "No mitigation required",
        "About 1% of operators checked",
      ],
      standard: [
        "Around 50 countries",
        "Brazil, Côte d'Ivoire, Indonesia",
        "Full risk assessment, every batch",
        "Mitigation where risk is found",
        "No simplified declaration",
        "About 3% of operators inspected",
      ],
      high: [
        "4 countries",
        "Belarus, Myanmar, North Korea, Russia",
        "The full due-diligence programme",
        "At least 9% of operators checked",
        "At least 9% of volumes checked",
        "Shipments stopped and examined",
      ],
    },
    caption:
      "The list is the country benchmarking of May 2025 (Implementing Regulation (EU) 2025/1093). Standard risk is the default, and it gets no simplified declaration.",
    facts: {
      low: "140 countries, including every EU state, the US and China. Collect the data and file the DDS; no risk assessment, no mitigation required. About 1% of operators checked.",
      standard:
        "Around 50 countries, Brazil, Côte d'Ivoire and Indonesia among them. Full risk assessment on every batch, mitigation where risk is found. About 3% of operators inspected.",
      high: "Belarus, Myanmar, North Korea, Russia. The full due-diligence programme, at least 9% of operators and volumes checked, shipments stopped and examined.",
    },
  },
  flag: {
    ariaLabel: "Satellite alerts",
    eyebrow: "Deforestation alerts",
    heading: "When a satellite alert flags a compliant plot.",
    lead: "From orbit, routine farm work looks like deforestation. A compliant farm can still trip an alert.",
    text: "Shade pruning, stumping for regeneration, a boundary drawn too close to the forest edge, tropical cloud cover: all of it reads as tree-cover loss. What the law asks for is a documented reason, so pick it, attach the registry entry or the old aerial photo, and your explanation travels into the statement the authority reads. Most of these alerts get settled at a desk. This is that desk.",
    reasons: [
      "shade pruning",
      "stumping",
      "geometry error",
      "cloud cover",
      "adjacent forest",
      "pre-2020 crop",
    ],
    shot: {
      alt: "Bindu flagged-plot resolution screen: a satellite finding on one plot, the reason the plot should still be filed, attached evidence, and the operator's explanation for the authority.",
      caption:
        "One flagged plot, cleared at a desk: reason picked, registry entry attached, explanation carried into the statement the authority reads.",
    },
  },
  calendar: {
    ariaLabel: "The dates that apply",
    eyebrow: "EUDR deadlines",
    heading: "The deadlines that apply now.",
    sub: "The regulation was postponed twice and simplified once. Ignore the 2024 and early-2025 deadlines you may have read. These are the ones in force, and the deadline is close. For micro and small operators it falls later: 30 June 2027.",
    rows: [
      {
        when: "31 Dec 2020",
        flag: "The cutoff",
        body: "The cutoff. Land cleared after this date is non-compliant, whether or not the clearing was legal locally, and it does not reset when the land changes hands.",
      },
      {
        when: "29 Jun 2023",
        body: "Regulation (EU) 2023/1115 enters into force. It replaces the old Timber Regulation and starts the compliance clock.",
      },
      {
        when: "22 May 2025",
        body: "The first country benchmarking list is published (Implementing Regulation (EU) 2025/1093). It sorts origins into low, standard and high risk.",
      },
      {
        when: "23 Dec 2025",
        body: "Regulation (EU) 2025/2650: a second postponement plus real simplification. Annual statements, printed matter dropped from scope, downstream operators reuse the upstream reference number.",
      },
      {
        when: "30 Dec 2026",
        flag: "The deadline",
        body: "Application date for large and medium operators. The real deadline, and it is close.",
      },
      {
        when: "30 Jun 2027",
        body: "Application date for micro and small operators.",
      },
    ],
  },
  close: {
    ariaLabel: "The receipt",
    eyebrow: "TRACES reference number",
    heading: "The filing ends with two numbers from TRACES.",
    sub: "A reference number for customs and a verification number for the record, minted by TRACES the moment you file. Bindu keeps the five-year evidence vault behind them, and updates your filings when the rules change again. The payoff: any European buyer can see at a glance that you are low-risk.",
    shot: {
      alt: "Bindu TRACES receipt: the Due Diligence Statement accepted, with the DDS reference number for customs and the verification number for the record.",
      caption:
        "Accepted by TRACES. The reference number travels with the shipment; the evidence behind it stays kept for five years.",
    },
    badges: [
      { head: "Zero mixing", body: "verified and unverified lots kept apart" },
      { head: "5-year vault", body: "hash-chained evidence, every actor" },
      { head: "Rules tracked", body: "filings updated when the law shifts" },
    ],
    demo: {
      heading: DEMO_CTA_LABEL,
      body: "Bring one supplier. Leave with its plots validated.",
    },
    cbam: {
      heading: "CBAM",
      body: "The other carbon rule at the border, live on its own page.",
    },
  },
  faqBand: {
    ariaLabel: "Frequently asked questions",
    heading: "Frequently asked questions about the EUDR.",
  },
  seo: {
    // Title + meta lead with "deadlines". When the /eudr/deadlines spoke was
    // folded into this pillar (301, 2026-08-18; see next.config.ts), the pillar
    // inherited the "eudr deadlines" query intent, so the <title> and meta
    // description must carry that keyword to keep ranking for it. The two dates
    // are the confirmed post-second-postponement deadlines (Reg (EU) 2025/2650)
    // and are stated in full in the deadlines section below, so the same fact is
    // grounded across page copy, meta, and JSON-LD.
    title: "EUDR deadlines & DDS: what to collect, and when",
    description:
      "EUDR for importers: the seven commodities, plot geolocation, the TRACES Due Diligence Statement, and the deadlines of 30 Dec 2026 and 30 Jun 2027.",
    ogTitle: "EUDR deadlines & DDS: what to collect, and when",
    ogDescription:
      "Seven commodities, plot-level geolocation, country risk tiers, the TRACES Due Diligence Statement, and the EUDR deadlines that apply after two postponements.",
    ogImageAlt: "Forest canopy beside cleared land",
    jsonLd: {
      // Keep the schema headline in step with the <title> above.
      headline: "EUDR deadlines & DDS: what to collect, and when",
      description:
        "The EU Deforestation Regulation (Regulation (EU) 2023/1115) for importers: the seven covered commodities, plot geolocation, the TRACES Due Diligence Statement, country benchmarking, and the dates that apply after two postponements.",
      faq: [
        {
          question: "Which commodities does the EUDR cover?",
          answer:
            "Seven: cattle, cocoa, coffee, oil palm, rubber, soya, and wood, plus a defined list of products derived from them (leather, chocolate, furniture, paper, tyres, and more).",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Article 1 and Annex I",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "When does the EUDR start to apply?",
          answer:
            "For large and medium operators and traders, 30 December 2026; for natural persons and micro and small enterprises, 30 June 2027. These dates come from the EU's second postponement of the original 2024 deadline.",
          source: {
            label: "EUR-Lex: EUDR postponement and targeted revision",
            href: "https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng",
          },
        },
        {
          question: "What is an EUDR Due Diligence Statement (DDS)?",
          answer:
            "A statement submitted in the EU's TRACES information system before covered goods are placed on or exported from the EU market. It confirms due diligence was carried out and the risk of deforestation is negligible, and it references the geolocation of the plots of land. Filing returns a DDS reference number that is used at customs.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 4 and 33",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "What geolocation data does the EUDR require?",
          answer:
            "Geographic coordinates (latitude and longitude) of every plot of land where the commodity was produced: a single point for plots of 4 hectares or less, and a polygon tracing the boundary for plots larger than 4 hectares.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Article 9(1)(d)",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "What are the penalties for EUDR non-compliance?",
          answer:
            "The regulation sets the floor Member States must legislate, not the fine you would receive: the maximum fine has to be at least 4% of the operator's total annual EU-wide turnover, alongside confiscation of the goods and of the revenues gained from them, and temporary exclusion from public procurement and public funding.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Article 25",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "Who files the EUDR Due Diligence Statement?",
          answer:
            "The operator (the first to place the goods on the EU market) or a solo operator who imports and holds the whole chain. Traders, downstream operators, and producers do not file their own DDS: they carry or supply the data and reuse the upstream DDS reference number.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 4 and 5",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "Can a trader reuse a supplier's EUDR DDS reference?",
          answer:
            "Yes. A trader buying and selling goods already on the EU market, unchanged, does not file a new statement. It keeps and passes on the DDS reference numbers from its suppliers. Downstream operators likewise carry the upstream references with the transformed product.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 4(7) and 5(3)",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "How do suppliers share EUDR data without losing control of it?",
          answer:
            "Bindu is building sharing where each party keeps its plots, invoices, and documents in its own workspace and grants its buyer access to a data package instead of emailing a copy, so raw farm data never leaves the party that owns it. That sharing is not live yet. Until it ships, you load what suppliers send you into your own dossier, and nothing leaves your workspace.",
        },
        {
          question: "Can I just file directly in TRACES?",
          answer:
            "Yes. TRACES is free and it is the destination either way. Bindu is the system of record in front of it: your dossier is the working record, and the Due Diligence Statement (DDS) is what gets filed from it. Bindu validates plot geometry before TRACES refuses it, reuses the plots on every later shipment instead of re-keying them, and keeps the five-year evidence the reference number points to.",
          source: {
            label: "European Commission: EU deforestation-free products rules",
            href: "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en",
          },
        },
        {
          question: "What is the EUDR?",
          answer:
            "The EU Deforestation Regulation. It bars seven forest-risk commodities and their derived products from being placed on, or exported from, the EU market unless they are deforestation-free, legally produced in the country of origin, and covered by a due diligence statement. Deforestation-free means produced on land not deforested after 31 December 2020.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 1 to 3",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "Has the EUDR been delayed?",
          answer:
            "Yes, twice. The original application date was 30 December 2024. It now applies from 30 December 2026 for large and medium operators and traders, and from 30 June 2027 for micro and small enterprises and natural persons. The second postponement also simplified some obligations, such as letting only the first operator file and adding a downstream-operator category.",
          source: {
            label: "EUR-Lex: EUDR postponement and targeted revision",
            href: "https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng",
          },
        },
        {
          question: "How do you comply with the EUDR?",
          answer:
            "Collect the geolocation of every plot where the commodity was produced, confirm it was deforestation-free after 31 December 2020 and legally produced, and run a risk assessment. Then file a Due Diligence Statement in the EU's TRACES system before the goods enter or leave the market, and pass the DDS reference number down the chain. Bindu runs the supplier collection, evidence and audit trail behind this today.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 8 to 11",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "What is the EUDR cut-off date?",
          answer:
            "31 December 2020. A commodity is deforestation-free only if it was produced on land not subject to deforestation, or in the case of wood, forest degradation, after that date. Land cleared on or before 31 December 2020 does not, by itself, put the goods out of compliance.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Article 2",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "What does EUDR stand for?",
          answer:
            "EUDR stands for the EU Deforestation Regulation. Its full title covers the placing on the EU market, and the export from it, of certain commodities and products linked to deforestation and forest degradation. It is often shortened to the deforestation regulation or the deforestation-free products law.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "What is TRACES, the EUDR Information System?",
          answer:
            "TRACES is the European Commission's online system that hosts the EUDR Information System, the single place where Due Diligence Statements are registered before covered goods are placed on or exported from the EU market. The Commission runs it and it is free to use. Filing there returns the DDS reference number that travels on the customs declaration.",
          source: {
            label: "European Commission: EU deforestation-free products rules",
            href: "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en",
          },
        },
        {
          question: "Who does the EUDR apply to?",
          answer:
            "It applies to operators and traders that place the seven covered commodities or their derived products on the EU market, make them available, or export them, in any sector. A business outside the EU is caught the moment its goods enter: the first operator established in the Union carries the duty. Micro and small enterprises and natural persons face the same obligations but start later, from 30 June 2027, and can rely on due diligence already done upstream.",
          source: {
            label: "EUR-Lex: EU Deforestation Regulation, Articles 1, 2 and 13",
            href: "https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng",
          },
        },
        {
          question: "Is there an EUDR certificate?",
          answer:
            "No. There is no EUDR certificate, label, or certified scheme. Compliance is shown by carrying out due diligence, filing a Due Diligence Statement, and holding the evidence for five years, not by obtaining a certificate. Voluntary schemes such as FSC or Rainforest Alliance can support your evidence, but the Commission is clear that certification on its own does not prove compliance or replace your own due diligence.",
          source: {
            label: "European Commission: EU deforestation-free products rules",
            href: "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en",
          },
        },
      ],
    },
  },
};
