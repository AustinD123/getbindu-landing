import { DERIVED, PRICES, eur } from "@/features/landing/pricing/price-data";
import { EUDR_LOCALE_PATHS } from "@/features/landing/regulation/eudr-content";
import { DEMO_URL } from "@/lib/demo-url";

const baseUrl = "https://getbindu.com";

// The translated EUDR pillars, generated from the same constant the sitemap
// and the hreflang set read, so a new locale cannot ship without appearing
// here. English is listed separately under Regulations.
const LOCALE_LABELS: Record<string, string> = {
  de: "German",
  pl: "Polish",
  it: "Italian",
  nl: "Dutch",
  fr: "French",
  es: "Spanish",
};

const localePillars = Object.entries(EUDR_LOCALE_PATHS)
  .filter(([loc]) => loc !== "en")
  .map(
    ([loc, path]) =>
      `- [EUDR in ${LOCALE_LABELS[loc] ?? loc}](${baseUrl}${path}): the EU Deforestation Regulation for importers, in ${
        LOCALE_LABELS[loc] ?? loc
      }: commodities, geolocation, the Due Diligence Statement, and the dates.`
  )
  .join("\n");

const body = `# Bindu

> Trade-compliance software for small and mid-sized EU importers. Upload the documents behind a shipment, keep the evidence each regulation asks for on one record, and file the statement the border wants. Priced per filing, not on an enterprise retainer.

Bindu is built around two ideas: (1) the same shipment facts satisfy several regulations at once, so they should be collected once and filed many times; (2) compliance content should be plain-English, citation-first, and free to read.

What ships today: the EU Deforestation Regulation. A dossier holds the plot geolocation, the evidence and the audit trail, and the Due Diligence Statement is filed to TRACES. Battery and product passports, CBAM and HS classification exist as records and checklists; their engines are in build, and nothing on this site should be read as claiming otherwise.

## Product

- [Bindu, the homepage](${baseUrl}/): product overview, who it is for, and what ships today.
- [Blog](${baseUrl}/blog): essays and guides on EU trade compliance.
- [Book a demo](${DEMO_URL}): 30-minute walkthrough.
- [Bindu on GitHub](https://github.com/GetBindu/Bindu): the agent layer underneath the platform, open source under Apache-2.0. The compliance platform itself is proprietary.

## Software

- [EUDR compliance software](${baseUrl}/eudr): what the EUDR tool does, what it costs (from ${eur(
  DERIVED.eudrDossier
)} per dossier, plus ${eur(
  PRICES.workspaceMonth
)} a month per workspace), and how it files the DDS to TRACES. This is the one regulation Bindu files end to end today.
- [CBAM reporting software](${baseUrl}/cbam/software): the six CBAM obligations kept on one record with their evidence, owners and dates. Bindu holds the record; it does not compute embedded emissions or connect to the CBAM Registry yet.

## Regulations

Plain-English, citation-first pages on the regulations importers actually have to file.

- [CBAM for importers: what to file, and when](${baseUrl}/cbam): What the Carbon Border Adjustment Mechanism requires, and how to file it. Six product categories, four numbers per line, a ten-year audit trail.
- [REACH for importers: what to prove, and how](${baseUrl}/reach): EU REACH (Regulation (EC) No 1907/2006) for importers of finished goods. The Candidate List (253 substances as of 4 February 2026), the 0.1%-per-component rule (Court of Justice C-106/14), Article 33 duties, the Annex XVII restrictions that hit imports (including the 2026 textile deadlines for formaldehyde and PFHxA), and why the proof buyers accept is a dated declaration, not a certificate.
- [PPWR for importers: what a packaging file has to prove](${baseUrl}/ppwr): EU PPWR (Regulation (EU) 2025/40), which entered into force on 11 February 2025 and applies from 12 August 2026. It regulates the wrapper rather than the product, so it catches a book, a t-shirt and a laptop, and the only food-specific rule in it is the Art 5(5) PFAS limit. Nothing is submitted to an EU portal: the declaration of conformity is drawn up per packaging type (Annex VII point 4), held for 5 or 10 years by lifecycle (Art 15(3)) and produced within 10 days on a reasoned request (Art 15(10)). The one real filing is registration in a national producer register (Art 44), which Art 44(4) makes a precondition to making packaging available; that register, its fees and any deposit-and-return scheme are set by each of the 27 Member States. Recyclability grades are A, B and C at 95%, 80% and 70% (Annex II Table 3), and grade C is banned from 1 January 2038 (Art 6(3)).
- [EUDR compliance: what the EU Deforestation Regulation asks](${baseUrl}/eudr): The EU Deforestation Regulation (Regulation (EU) 2023/1115), step by step. Seven commodities (cattle, cocoa, coffee, oil palm, rubber, soya, wood), plot geolocation, the TRACES Due Diligence Statement (DDS), country benchmarking, the four dates kept apart (entry into force, the 31 December 2020 cutoff, and the postponed application dates: 30 December 2026 large/medium, 30 June 2027 micro/small), and the reliefs for small operators.
- [The Battery Passport (DPP): scope, data, and dates](${baseUrl}/dpp/battery): The EU Battery Passport under Regulation (EU) 2023/1542 Article 77, the first Digital Product Passport to bind, from 18 February 2027. Scope (EV, LMT, industrial above 2 kWh), Annex XIII data, and recycled-content floors.
- [Textiles and the Digital Product Passport (DPP)](${baseUrl}/dpp/textiles): The textile DPP under the ESPR (Regulation (EU) 2024/1781), where apparel sits in the 2027 wave, and the unsold-textiles destruction ban from 19 July 2026.
- [Other product groups on the DPP roadmap](${baseUrl}/dpp/others): Which product groups get a Digital Product Passport after batteries and textiles: iron and steel, aluminium, tyres, furniture, toys, and cement, and from which law.

## Regulations, translated

The EUDR pillar in six more languages. Each is a full translation, not a summary.

${localePillars}

## Brand

- Company: Getbindu
- Product: Bindu
- Domain: getbindu.com
- License: the compliance platform is proprietary. The agent layer at github.com/GetBindu/Bindu is Apache-2.0.
- Contact: raahul@getbindu.com
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
