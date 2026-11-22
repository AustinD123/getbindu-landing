/* All words on the page. Facts only from the brief and bindu-design (prices, dates, statuses).
   Anything not confirmed is marked PLACEHOLDER or "Answer from Raahul". Illustrations are labelled in the UI. */

import { CAL_URL } from "./config";

export const DEMO_URL = CAL_URL;
export const EUDR_SOURCE = "https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en";

/* round 13, item 9: "Book a 15-minute demo" is the main CTA (nav, hero, finale, sub-page links). "Estimate your cost" is
   secondary and appears only in pricing and the calculator popup. */
export const cta = {
  estimate: "Estimate your cost",
  demo: "Book a 15-minute demo",
  popupBook: "Book a demo",
  demoShort: "Book a demo",
};

export const nav = {
  theme: { toDark: "Switch to dark theme", toLight: "Switch to light theme" },
  links: [
    { t: "How it works", href: "#how" },
    { t: "Pricing", href: "#pricing" },
    { t: "FAQ", href: "#faq" },
  ],
  regulations: "Regulations",
  menu: "Menu",
  close: "Close",
};

/* the intro (components/Intro.tsx): the dot line, then one mono label, then the hand-off to the page */
export const intro = {
  dot: "Every proof is a dot.",
  tag: "BINDU · TRADE COMPLIANCE OS",
};

export const hero = {
  title: ["Describe a shipment.", "Bindu handles the rules."],
  sub: "Bindu works out which EU rules apply to your goods, gathers the proof from your suppliers and files it. Every line traces back to the supplier document behind it.",
  mono: "Six containers a year or six hundred.",
  artLabel: "Illustration: every proof is a dot. Together they make the filing.",
  pause: "Pause animation",
  play: "Play animation",
};

/* Round 6, item 2: "Sound familiar?" Three importer lines, each with one plain answer. Not quotes: no footnote. */
/* Round 6 (follow-up): the EUDR check tool, kept on the Pricing EUDR tab. The deadline list and the lead moved to
   "Sound familiar?" row 02 and row 03, so only the audience line, the button and the source link remain here. */
export const applies = {
  eyebrow: "For EU importers without a compliance team",
  source: "Dates: European Commission",
  check: "Check if EUDR applies to you",
};

/* the "Check if EUDR applies to you" mini-check: illustrative only */
export const check = {
  title: "Simplified EUDR check",
  label: "Illustration: a simplified check, not legal advice.",
  q1: "What do you bring into the EU?",
  goods: ["Coffee", "Cocoa", "Soy", "Palm oil", "Rubber", "Wood", "Cattle", "None of these"],
  q2: "How big is your company, by the EU's size rules (staff, turnover, balance sheet)?",
  sizes: [
    { k: "small", t: "Micro or small" },
    { k: "large", t: "Medium or large" },
    { k: "unsure", t: "Not sure" },
  ],
  resultCovered: "EUDR likely covers what you bring in.",
  resultNot: "EUDR probably doesn't cover these goods.",
  resultNotMore: "Other EU rules might. Bindu's checks for those are in build.",
  dateSmall: "Your date is most likely 30 Jun 2027, the date for most micro and small companies.",
  dateLarge: "Your date is most likely 30 Dec 2026, the date for medium and large companies.",
  dateUnsure: "The date depends on your company size: 30 Dec 2026 for medium and large companies, 30 Jun 2027 for most micro and small ones.",
  next: "A demo is the quickest way to check your real shipments.",
  close: "Close",
};

export const pains = {
  eyebrow: "Sound familiar?",
  items: [
    { q: "My suppliers won't send the data I need.", a: "Bindu asks your suppliers over WhatsApp and email for exactly what's missing." },
    { q: "I don't know which EU rules apply to my goods.", a: "Describe your goods and Bindu tells you which rules apply." },
    { q: "What if my shipment gets held at customs?", a: "Bindu files and returns the reference customs asks for, for EUDR today." },
  ],
};

export const how = {
  /* r36-5: the File step's record lines, each with a thread back to the made-up document it came from (Illustration). */
  trace: {
    label: "Record lines and the document each one came from",
    hint: "Select a line to see the document behind it.",
    from: "from",
    illus: "Illustration",
    lines: [
      { line: "Fibre composition", doc: "Fibre composition sheet", by: "mill" },
      { line: "Mill and dye house", doc: "Dye house declaration", by: "dye house" },
      { line: "Care and repair data", doc: "Care and repair sheet", by: "mill" },
      { line: "Supplier declaration", doc: "Supplier declaration", by: "supplier" },
    ],
  },
  eyebrow: "How it works",
  title: "One sentence in. The proof comes back.",
  frame: "Workspace · example shipment",
  illus: "Illustration",
  steps: [
    { n: "01", t: "Describe", d: "Tell Bindu about the shipment in plain words. It works out which EU rules apply and what proof each one needs." },
    { n: "02", t: "Prove", d: "Bindu asks your suppliers by WhatsApp or email, with no login for them, for exactly what's missing. Each document is checked against its rule, and each line of your record points back to the document it came from." },
    { n: "03", t: "File", d: "Bindu builds one compliance record. Some rules are still in build." },
  ],
  describeText: "Two containers of cocoa beans from Ecuador to Antwerp, arriving in June.",
  describeRules: [
    { t: "EUDR", s: "Live" }, { t: "Textile passports", s: "Live" },
    { t: "CBAM", s: "In build" }, { t: "REACH", s: "In build" }, { t: "PPWR", s: "In build" }, { t: "Battery passports", s: "In build" },
  ],
  pieces: [
    { k: "wa", t: "Material certificate", m: "WhatsApp · supplier" },
    { k: "mail", t: "Re: supplier declaration", m: "Email · supplier" },
    { k: "pdf", t: "Invoice_final_v3.pdf", m: "PDF" },
    { k: "img", t: "Photo of the product label", m: "Image · WhatsApp" },
    { k: "xls", t: "product_data (2).xlsx", m: "Spreadsheet" },
    { k: "wa", t: "Packing list, two containers", m: "WhatsApp · supplier" },
  ],
  record: "Compliance record",
  recordRows: ["What it is and how much", "Who supplied it", "Where it was made", "Supplier declaration"],
  plotsTitle: "Each document checked against its rule",
  plotsDone: "4 of 4 checks pass",
  path: ["Supplier", "Check", "Filing"],
  refLabel: "Reference number for customs",
  ref: "EXAMPLE-26-0000-0142",
  refNote: "Made-up number",
  filed: "Filed",
  feed: [
    { t: "now", e: "Compliance record filed, reference issued" },
    { t: "4s", e: "Check 4 passed: documents match the rule" },
    { t: "8s", e: "Supplier answered on WhatsApp" },
    { t: "12s", e: "Request sent to supplier, no login needed" },
  ],
};

/* Round 36 (r36-4): "Ask your supply chain", between How it works and the journey. The question, the answer lines and the reference
   numbers are made up (Illustration). The section is live (Austin, r36-4 fix), so no in-build note. Scenario 3 states no regulation date:
   "mandatory since Feb 2025" could not be confirmed from a public EUR-Lex page (see DECISIONS.md, round 36). */
export const ask = {
  title: "Stop chasing documents. Just ask.",
  lead: "Type a question. Your suppliers' own systems work out the answer, a person on their side approves it, and you get it back signed. Nobody emails files around.",
  tabsLabel: "Example questions",
  stageLabel: "Illustration of a question going out to three suppliers and a signed answer coming back",
  beats: ["You ask.", "The question goes out.", "Their data stays with them.", "A person approves the answer.", "You get it back, signed."],
  illus: "Illustration",
  caption: "Made-up question, reference numbers and certificate numbers.",
  asker: "You",
  learn: "They will learn:",
  yes: "Yes",
  no: "said no",
  signed: "signed",
  cards: [
    { w: "Unread.", l: "Sealed to you", d: "Answers are sealed to the asker. Bindu carries the envelope and cannot open it." },
    { w: "Allowed.", l: "They stay in control", d: "Before anything leaves, your supplier sees exactly what you'll learn, and can say no. Their files never move." },
    { w: "Provable.", l: "Signed at the source", d: "Every answer is signed by the company that gave it. Paste it in your filing, show it to your auditor." },
  ],
  scenarios: [
    { id: "coffee", tab: "Coffee", asker: "importer", nodes: ["co-op", "trader", "mill"], q: "DDS reference numbers for order PO-2214?", why: "your own filing cites them, checked in TRACES",
      ap: ["DDS ref 25NL7K3X9M", "verification nr V-99DK2"], aw: ["Answer · order PO-2214", "DDS 25NL7K3X9M · V-99DK2 · co-op", "DDS 25DE4Q8V2C · V-84HF1 · trader"] },
    { id: "textiles", tab: "Textiles", asker: "brand", nodes: ["spinner", "fabric mill", "garment maker"], q: "Valid GRS transaction certificate for lot F-88?", why: "no valid certificate, no recycled claim on the label",
      ap: ["TC GRS-2026-4471 · valid", "65% recycled polyester"], aw: ["Answer · lot F-88", "TC GRS-2026-4471, valid · spinner", "65% rPET · 35% cotton · fabric mill"] },
    { id: "batteries", tab: "Batteries", asker: "carmaker", nodes: ["refinery", "cathode plant", "cell maker"], q: "Carbon footprint of cell model NC-811?", why: "a number your own paperwork can point to",
      ap: ["61 kg CO₂e per kWh", "third-party verified"], aw: ["Answer · cell NC-811", "61 kg CO₂e/kWh, verified · cell maker", "cathode share 38 kg · cathode plant"] },
  ],
};

/* Round 13, item 6: one shipment, five regulation stories. Every story runs along the same example route (Guayaquil to
   Antwerp) with six milestones, so the animation is the same for each. live: false means the last milestone says
   "coming" and the dots do not turn into a filing. Status chips follow the status list (EUDR and textile passports Live). */
export const journey = {
  eyebrow: "Example shipment",
  title: "Follow one shipment from origin to customs",
  illus: "Illustration",
  caption: "Example shipment, not a real customer. Map simplified, not to scale. Each story has its own illustrative route.",
  stories: [
    {
      id: "eudr", tab: "EUDR", live: true,
      chips: [{ text: "EUDR Live", live: true }],
      sub: "2 containers of cocoa beans, Guayaquil (Ecuador) to Antwerp. The proof is collected along the way, not at the end.",
      milestones: [
        { label: "Origin plots mapped", detail: "Each farm plot is recorded with its geolocation." },
        { label: "Supplier proof received", detail: "The supplier sends the plot data and its proof." },
        { label: "Plots checked against forest data", detail: "Land cleared after 31 December 2020 fails the check." },
        { label: "DDS filed to TRACES", detail: "The due diligence statement goes into the EU's TRACES system." },
        { label: "Reference number sent", detail: "The TRACES reference number goes to the customs agent." },
        { label: "Customs clears it on arrival", detail: "Customs decides on arrival. Bindu does not control this step." },
      ],
    },
    {
      id: "cbam", tab: "CBAM", live: false,
      chips: [{ text: "CBAM In build", live: false }],
      sub: "Example: 2 containers of steel, Mumbai (India) to Rotterdam. The emissions data comes from the mill along the way. The CBAM report is in build.",
      milestones: [
        { label: "Steel batch recorded", detail: "The batch is recorded with its supplier and its weight." },
        { label: "Mill asked for emissions data", detail: "Bindu asks the mill for the emissions figures for this batch." },
        { label: "Emissions data received", detail: "The mill sends the figures by WhatsApp or email." },
        { label: "Embedded emissions calculated", detail: "The CO₂ in each tonne of steel is worked out from that data." },
        { label: "Missing figures asked for", detail: "Bindu asks again for any figure that is still missing." },
        { label: "CBAM report: coming", detail: "The report is in build. Not live yet." },
      ],
    },
    {
      id: "dpp", tab: "DPP", live: true,
      chips: [{ text: "Textile passports Live", live: true }, { text: "Battery passports In build", live: false }],
      sub: "Example: 2 containers of textile batches, Ningbo (China) to Hamburg. Each batch gets its product data, then a passport and a QR label. Textile passports are Live. Battery passports are in build.",
      milestones: [
        { label: "Textile batch tagged", detail: "The batch gets its own product ID before it ships." },
        { label: "Supplier asked for product data", detail: "Fibre, dye and care details are requested by WhatsApp or email." },
        { label: "Product data received", detail: "The supplier sends the details for this batch." },
        { label: "Passport created", detail: "The digital product passport is created for this batch." },
        { label: "Missing details asked for", detail: "Bindu asks again for any detail that is still missing." },
        { label: "QR label attached", detail: "A QR code on the label links to the passport. Battery passports are in build." },
      ],
    },
    {
      id: "reach", tab: "REACH", live: false,
      chips: [{ text: "REACH In build", live: false }],
      sub: "Example: 2 containers of chemical products, Houston (United States) to Antwerp. Each substance is checked against the EU list of restricted chemicals (REACH). The compliance record is in build.",
      milestones: [
        { label: "Chemical product declared", detail: "The product and its supplier are recorded at origin." },
        { label: "Substance data requested", detail: "The supplier is asked for the data sheet for each ingredient." },
        { label: "Substance data received", detail: "The data sheets arrive by WhatsApp or email." },
        { label: "Restricted-substance check", detail: "Each substance is checked against the restricted list." },
        { label: "Missing data asked for", detail: "Bindu asks again for any substance that still has no data." },
        { label: "Compliance record: coming", detail: "The record is in build. Not live yet." },
      ],
    },
    {
      id: "ppwr", tab: "PPWR", live: false,
      chips: [{ text: "PPWR In build", live: false }],
      sub: "Example: 2 containers of packaged consumer goods, Cai Mep (Vietnam) to Valencia. Each pack is checked against the EU packaging rules (PPWR). The packaging record is in build.",
      milestones: [
        { label: "Packaged goods loaded", detail: "The shipment is recorded with its packaging lines." },
        { label: "Packaging data requested", detail: "The supplier is asked for the material and weight of each pack." },
        { label: "Packaging data received", detail: "The supplier sends the details by WhatsApp or email." },
        { label: "Requirements checked", detail: "Each pack is checked against the EU packaging rules." },
        { label: "Missing data asked for", detail: "Bindu asks again for anything that is still missing." },
        { label: "Packaging record: coming", detail: "The record is in build. Not live yet." },
      ],
    },
  ],
};

/* Round 6, item 1: minimal pricing. Only EUDR has a published price; the other tabs show "Pricing on request".
   `tag` is the tab's title and `desc` the one-line description (the copy the module strip used). Prices exactly as published. */
export const pricing = {
  eyebrow: "Pricing",
  title: "What each filing costs.",
  lead: "Per filing. Not per seat.",
  tabs: [
    {
      id: "eudr", label: "EUDR", tag: "Deforestation-free goods", status: "live",
      price: {
        amount: "€249", unit: "per EUDR dossier",
        rows: [
          { k: "File the statement to TRACES", v: "€199" },
          { k: "Keep records for 5 years", v: "€50" },
          { k: "Keep records for 10 years (option)", v: "€100" },
          { k: "Workspace", v: "€20 / month" },
        ],
        line: "No seats. No annual licence. EU-hosted. Prices excl. VAT.",
      },
    },
    { id: "hs", label: "HS Code", tag: "Product classification", desc: "The customs code for each product, so the right rules and duties are checked.", status: "build" },
    { id: "cbam", label: "CBAM", tag: "Carbon at the border", desc: "The carbon cost of steel, aluminium, cement, fertilisers, hydrogen and electricity made outside the EU.", status: "build" },
    {
      /* per-row status: textiles are live, battery and other product groups are in build. No price for any row. */
      id: "dpp", label: "DPP", k: "Textile passports", tag: "Product passports",
      lines: [
        { t: "Textile passports", s: "live" },
        { t: "Battery passports", s: "build" },
        { t: "Other product groups", s: "build" },
      ],
    },
    { id: "ppwr", label: "PPWR", tag: "Packaging", desc: "What your packaging is made of and whether it can be recycled.", status: "build" },
    { id: "reach", label: "REACH", tag: "Chemicals", desc: "Which chemicals are in your products, checked against the EU's restricted list.", status: "build" },
  ],
  /* round 13, item 7: the right side of the section. Copy from getbindu.com (before.html), not invented. */
  side: {
    covers: {
      eyebrow: "What each EUDR filing covers",
      items: [
        { p: "€199", t: "files the statement to TRACES and returns the reference customs asks for." },
        { p: "€50", t: "keeps the dossier for the five years the law requires." },
        { p: "€100", t: "keeps it the full ten years." },
        { p: "€20 a month", t: "keeps your workspace live to file." },
      ],
    },
    billing: {
      eyebrow: "How billing works",
      lines: ["You pay per filing, not per seat or per year.", "No seats, no annual licence."],
    },
    notes: ["One platform for EUDR, CBAM, battery and textile passports.", "EU-hosted and GDPR compliant. Prices exclude VAT."],
  },
  calc: {
    title: "Your year with Bindu",
    label: "An estimate from the published prices, not a quote.",
    filings: "Filings a year",
    keep: "How long to keep records",
    keep5: "Five years (€50)",
    keep10: "Ten years (€100)",
    total: "Estimated yearly cost",
    lineFilings: "filings",
    lineWorkspace: "Workspace, 12 months",
    vat: "Excl. VAT",
    close: "Close",
  },
};

export const roles = {
  eyebrow: "Built for your role",
  title: "Who Bindu is for.",
  learn: "Learn more",
  items: [
    { t: "Importers", d: "You bring goods in. Bindu works out the proof each shipment needs and files the statement for you.", href: "/eudr" },
    { t: "Exporters and co-ops", d: "You sell into the EU. Map each plot once and answer your buyers' requests without a new login.", href: "/eudr" },
    { t: "Customs brokers", d: "You file for clients. Keep each client's proof on one record per shipment.", href: "/eudr" },
    { t: "Traders", d: "You buy and sell on. Keep the reference numbers and records your buyers ask for.", href: "/eudr" },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions owners ask.",
  raahul: "Answer from Raahul",
  items: [
    { q: "Am I an operator?", a: "", pending: true },
    { q: "Do I need to file if I buy from an EU importer?", a: "", pending: true },
    { q: "Is the simplified declaration enough?", a: "", pending: true },
    { q: "What if a supplier won't share data?", a: "Bindu asks them on WhatsApp or by email, with no login, and shows you what is still missing. A statement can only be filed once the proof is complete.", pending: true },
    { q: "Do my suppliers need an account?", a: "No. Bindu asks them on WhatsApp or by email, with no login for them. Before anything leaves, they see exactly what you will learn, and they can say no. Each line of your record then points back to the document they sent.", pending: false },
    { q: "Is my data shared with other companies?", a: "No. Every workspace is single-tenant and your data stays inside it. Nothing crosses to another company until the exchange layer ships, and that layer is still in build.", pending: false },
    { q: "Who's liable?", a: "", pending: true },
  ],
};

export const footer = {
  line: "Describe your shipment once. Bindu finds the rules that apply and files the statement.",
  cols: [
    { h: "Product", l: [{ t: "How it works", u: "#how" }, { t: "Pricing", u: "#pricing" }] },
    { h: "Company", l: [{ t: "GitHub", u: "https://github.com/GetBindu/Bindu" }, { t: "raahul@getbindu.com", u: "mailto:raahul@getbindu.com" }] },
  ],
  legal: "© 2026 GetBindu · The73 B.V. · KvK 92797911 · Amsterdam, NL · Hosted in the EU · Prices exclude VAT",
};

/* Round 17 (one story). Statement, before and after, the hero selector. Facts only from the brief; statuses as in the brief. */
export const statement = {
  before: "Describe a shipment once.",
  after: "works out the rules and the HS code, gathers the evidence and prepares the filing, every line traced to its document.",
};

export const beforeAfter = {
  title: "Sound familiar?",
  cards: [
    { before: "My suppliers won't send the data.", after: "Bindu asks them for you, by WhatsApp or email.", detail: "Before anything leaves, your supplier sees exactly what you'll learn, and can say no. Their files never move." },
    { before: "I don't know which rules apply.", after: "Bindu tells you which apply.", detail: "Describe the shipment once. Bindu works out the rules, the HS code and the evidence each rule needs." },
    { before: "Will customs hold my goods?", after: "Bindu files and returns the reference customs asks for.", detail: "Every answer is signed by the company that gave it, so the proof holds up when someone asks." },
  ],
};

export const finaleWordmark = { label: "Bindu", letters: ["b", "ı", "ndu"] };

export const footerRoles = {
  lead: "For",
  items: [
    { t: "importers", href: "/eudr" },
    { t: "exporters and co-ops", href: "/eudr" },
    { t: "customs brokers", href: "/eudr" },
    { t: "traders", href: "/eudr" },
  ],
};
