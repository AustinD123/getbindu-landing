Bindu landing page: project context

Read this before planning or writing anything. It is the source of truth for facts, design and rules. Decisions here override older notes, skills and earlier rounds. When something here is wrong or out of date, update this file.

Last updated: 19 Nov 2026 (r16)

1. The project
What: the redesigned Bindu homepage (`/`), designed in a separate mockup repo and ported into this repo in `features/landing/home/` (React + TypeScript in Next.js, GSAP + ScrollTrigger, Lenis, three.js for WebGL). Where this brief mentions sub-pages, those were mockup-only: this repo's real pages are used instead.
Who: built by Austin Dcosta (contractor) for Bindu.
Raahul Dutta: founder, final decisions.
Suraj Biswas (suraj@getbindu.com): reviewer; daily sync at 8 PM IST.
Status: ported into getbindu-landing; the live site is still served by shelley until the merge-back. The mockup badge is not part of the port.
Repo: this repo mirrors shelley's paths for merge-back (see README.md). Keep the homepage portable: no absolute paths; config (cal.com link, theme defaults, copy) in clearly named files (`features/landing/home/config.ts`, `content.ts`).
Baseline: the dark design that ran on the 5182 build is the approved layout. Light theme = same layout, colours only.
2. The company (facts, don't change them)
Bindu, run by The73 B.V., Amsterdam. "Bindu" means "dot".
EU trade-compliance software ("trade-compliance OS"). You describe a shipment once in plain language; Bindu works out which EU rules apply, the HS code and the evidence each rule needs, gathers proof from suppliers (email/WhatsApp), and files or prepares the paperwork.
Regulations and status (use exactly these labels):
Area	Status
EUDR (deforestation): files the due diligence statement to TRACES, returns the reference customs asks for	Live
Textile passports (ESPR / DPP)	Live (as labelled on getbindu.com)
Battery passports, other DPP groups	In build
CBAM	In build (site claims it in present tense, no label; Raahul to confirm)
REACH, PPWR	In build
HS code classification	Tab exists on the site; status unconfirmed
Identity layer: every answer signed (W3C DID)	Live
Sealed transport (mTLS + OAuth2), agent settlement (A2A + x402)	In build
Agent layer is open source (github.com/GetBindu/Bindu), built on Eclipse Tractus-X. Workspaces are single-tenant; no data crosses between companies until the exchange layer ships.
EU-hosted, GDPR compliant.
3. Pricing (exact, from getbindu.com)
Title: "What each filing costs." Intro: "One platform for five regulations. You pay per filing, not per seat."
Tabs: EUDR (first, default) · HS Code · CBAM · DPP · PPWR · REACH.
EUDR due-diligence dossier: €249 = €199 to file the statement to TRACES and return the reference + €50 to keep the dossier the 5 years the law requires. Option: €100 to keep it 10 years (site doesn't say if this replaces or adds to the €50). Workspace: €20/month.
Per filing; no seats; no annual licence. Competitors bill per seat or per year. Prices excl. VAT.
Other tabs: no published price → "Pricing on request". Never invent prices.
4. Key dates

EUDR applies from 30 Dec 2026 for medium/large companies and 30 Jun 2027 for most micro/small companies (micro/small timber already under the old EUTR: 30 Dec 2026). Proof: goods not from land deforested after 31 Dec 2020, and produced legally.

5. Audience
Lead buyer: the EU importer (first placer) with no compliance team, often the owner or MD. Also exporters, co-ops, customs brokers, traders.
80%+ are 35 or older and mostly use light-mode tools.
Goods: coffee, cocoa, rubber, textiles, batteries, chemicals, packaged goods.
Top pains: suppliers won't send data; unsure which rules apply and by when; fear of goods held at customs; cost; no staff for it; trust in a small vendor.
6. Messaging rules
The homepage is NOT EUDR-specific. Present Bindu's core technology across all regulations. EUDR detail belongs only in the EUDR tab, the EUDR story in the shipment journey, and the EUDR sub-page.
Customer is the hero; Bindu is the guide. Plain language for business owners.
Headlines ≤ 8 words. Explain a term before naming it.
Use buyer words: shipment, supplier, proof, record, filing, reference number, customs, due diligence statement (EUDR only).
Avoid: seamless, effortless, unlock, empower, streamline, revolutionise, leverage, elevate, AI-powered, next-generation, end-to-end, "guaranteed" or "fully compliant", regulation numbers, unexplained acronyms.
7. Honesty rules (always)
No invented customers, logos, testimonials, metrics, certifications, prices or time savings.
All example shipments, documents, routes, chats and reference numbers are labelled "Illustration".
In build is never shown as live. In build stories end in "coming", never in a completed filing.
Bindu does not take on the customer's legal liability; don't imply it.
8. Calls to action
Primary everywhere: "Book a 15-minute demo" (or just "Book a demo"). Never "30-minute". Highlighted (yellow pill or clearly highlighted link).
Demo CTA only in: nav, hero, final section. No demo buttons repeated in every section.
"Estimate your cost" is secondary: only in the pricing section and the calculator popup (which ends with the Book a demo button).
cal.com link lives in one config value. TODO: need the 15-minute event URL from Bindu.
9. Design system
Sources: merged from x.ai (base), Together AI (structure), Apple (polish). Full detail in docs/home/DESIGN.md; tokens in features/landing/home/styles/tokens.css.
Colours: brand yellow + cobalt. Yellow = main action, Live chips, key numbers, shipments/filing pulses. Cobalt = system: maps, routes, links, active states, progress, diagrams. Placeholders until Bindu sends exact hex: yellow 
#FFD400, cobalt 
#0047AB; bright cobalt 
#3D7BFF for lines/glows on dark. "In build" chips: grey dashed outline.
Never pure black or pure white (#000 / #fff). Off-white and navy.
Themes: one site, sun/moon toggle in the nav, saved in localStorage, light is the default, no flash on load (inline head script).
Dark: the current dark theme from the 5182 build. Keep it exactly.
Light (r15): warm ivory, calm, low-saturation (never earthy). Base #F5F1E8, panels #FBF8F1, navy text #14213D, cobalt links/active #0A3A8C, yellow #FFD400 with #B38F00 outline; light shipment dots #E0B000 with #8A6A00 outline. Reference: Difault (look only); ClickHouse/Miro for sparing yellow + blue.
Both themes: identical layout and components; only colour tokens differ.
Fonts: one display + one mono, self-hosted (Inter + IBM Plex Mono since r16), set only via tokens. No other font declarations.
Buttons: pills, mono-caps labels, consistent height; real hover, active, focus and disabled states. Primary (r15): yellow pill with a navy dot that slides into an arrow on hover, one sheen sweep, label wipe navy → cobalt. Text links: underline grows from the left, arrow nudges 4px. One easing token cubic-bezier(0.22,1,0.36,1); 200ms colour/arrow, 600ms sheen; reduced motion = instant swaps.
Tabs / segmented controls (r15): minimalist and identical everywhere: muted mono-caps labels, active = full contrast + 2px cobalt underline that slides, one hairline under the row. No fill, glow, pattern or status dots.
Motif: "Bindu = dot". Many dots form the sunflower (golden-angle spiral) and the logo; "Every proof is a dot." Label: "BINDU · TRADE COMPLIANCE OS".
Motion: futuristic but calm and readable. Readability, accessibility and indexability beat animation. Scroll-linked where used; respects prefers-reduced-motion; site-wide pause control; 60fps; WebGL lazy-loaded with static fallbacks. Recreate reference effects in our own code; never copy other sites' code or assets.
10. Page structure (current homepage, in order)

Check the current build if unsure; update this list when it changes.

Intro (first visit): one dot → many dots → sunflower → logo → "Every proof is a dot." → "BINDU · TRADE COMPLIANCE OS" → dots scatter into the world map → smooth hand-off into the hero (same canvas).
Hero: centred; general mission headline (not EUDR); short sub-line; Book a 15-minute demo. World map: dots in cobalt, many yellow shipments on routes across all regions.
How it works / Describe the shipment: one window; left = heading, then steps Describe · Prove · File on one left edge; right = tall vertical illustration. General, multi-regulation; no EUDR line in step 03.
Sound familiar?: three full-width rows (01 · 02 · 03), pain left → Bindu answer right, one line each. Layout ref: Rubie (maxibestof).
Four documents become one record: one window; heading + input-document list (labelled Illustration) on the left; theme-surface panel (near-black / ivory) with dot pattern, animated cobalt beams into one yellow record. Generic documents → one compliance record → reference. Not EUDR.
One shipment from origin to customs: pinned (also on phones), fits one window at all sizes; minimalist tab row EUDR · CBAM · DPP · REACH · PPWR; each has its own route, cargo and milestones (illustrative).
What each filing costs: centred head + tab row; one bordered card split in two: receipt left (price, ledger, "Pricing on request" on other tabs), included checklist + "Estimate your cost" + trust notes right; one-time border beam. Only "Estimate your cost"; EUDR check is a text link. Refs: time.fyi (unsection), Made With GSAP.
Who Bindu is for: role cards.
Questions owners ask (FAQ): minimal accordion, aligned +/− icons.
Final CTA + footer: full screen, aligned to one grid.

Removed for good: "Start with EUDR" section; "Who's behind Bindu" on the homepage (moved to /about); the old earthy-sunflower theme.

Sub-pages: matching the main site (EUDR, CBAM, REACH, PPWR, passports, blog index, about), same design system, short.

11. Working rules for coding agents
Only change what the spec lists. Never redesign, restructure or restyle anything else.
Edit in place; one commit per numbered item; keep `features/landing/home/` as the only homepage.
Every section fits one viewport; titles stay visible in pinned sections; two-column sections share one grid and top line.
QA: 375 / 768 / 1440 / 1920, both themes, no horizontal scroll, demo links → cal.com, reduced motion, no console errors.
Report briefly: one line per item, judgement calls, a few screenshots. No recordings.
Third-party code, effects, fonts, data: record in docs/home/LICENSES.md with commercial-use status. Hyperiux Vault: free effects only.
12. Open questions for Bindu
Exact brand yellow and cobalt hex values (from the main app).
The 15-minute cal.com event URL.
CBAM, battery passport and HS code status.
Does the €100 ten-year option replace or add to the €50?
Volume pricing (a 600-container importer pays about €149k/year at €249).
Hosting/security details and any certification (ISO 27001 / SOC 2).
Real customers or pilots that can be named; filings accepted so far.
Single long page vs multi-page (Austin's research task; leaning: short homepage + separate indexable pages per regulation, pricing and FAQ).
Commercial-use clearance for every animation and asset (Austin's task).
13. Taste notes (what Austin liked and rejected)

Liked:

The dark 5182 build; dot/sunflower intro; world map with yellow shipments.
Full Circle-style "pick an act, it plays itself" storytelling.
The shipment journey animation; scroll-linked motion that replays.
Clean, minimal, editorial layouts (x.ai, Together AI, Apple).
Motion quality bar: Rothfinder; restraint: Walbi (Awwwards).

Rejected (don't bring these back):

Anything that looks AI-generated: card grids, icons in circles, badges, "solved" chips, gradient blobs, glassmorphism everywhere.
Too much text in the hero or intro; long paragraphs over animation.
Many repeated demo buttons; "Estimate your cost" as the main CTA.
Titles sliding out of pinned sections; empty halves; small text next to big animations; left/right misalignment; content popping on alternating sides (use linear chains instead).
EUDR-specific copy or visuals on the homepage.
Big redesigns when only small changes were asked for.
Flat single-colour maps; bright flashy yellow; the old earthy theme.
Busy tab/slider controls (navy track, glow, dot pattern, status dots): too much (r15).
Social-proof avatar rows or "Join N+" lines (we have no customer numbers).
Cool blue-grey light theme (r15 first pass): too cold.
14. References
Design files: github.com/VoltAgent/awesome-design-md (x.ai, together.ai, apple; clickhouse + miro for the light theme).
Motion: awwwards.com/sites/rothfinder; awwwards.com/inspiration/ scroll-animation-walbi-2; awwwards.com/inspiration/ map-interaction-sweeping-corp; Hanwha Ocean ship scroll animations; Stripe's sunflower-dot globe (stripe.com/blog/globe); Madar route lines.
Section patterns: trajectory.ai (product mock + steps), mailerbot.com (process, "tailored for you"), belli.ai (one rotating module section).
Effects library: Hyperiux Vault (free effects only, marked commercial-friendly).
Free MIT libraries (ideas rebuilt in our code; record any copied code in LICENSES.md): Magic UI, Uiverse, HyperUI, Flowbite core. Check Aceternity and Preline licences first.
Galleries (look only; maxibestof is personal-viewing only): maxibestof.one, unsection.com, Awwwards inspiration (pricing: Finsight, Klub, Good Fella, HeyOrca; buttons: Strakk, Edifis, Modulus).
Licences: see docs/home/LICENSES.md (created r15): GSAP standard no-charge, Lenis MIT, three.js MIT (replaced OGL, Unlicense), React MIT, Inter and IBM Plex Mono OFL 1.1.
Skills installed in the repo: frontend-design, bindu-design, polish / impeccable, Unslop, UI/UX Pro Max (layout only, not its palettes), strategic-narrative.
15. Later: SEO

Not now. After the design is final: pre-render pages (SSG), text in HTML not only in canvas, keep existing URLs/blog rankings with redirects, per-page titles/meta/H1, structured data (Organization, SoftwareApplication with Offer, FAQPage), sitemap, Lighthouse in both themes. Suraj accepts a 2–3% score hit only for deliberate creative choices.

16. Recent rounds
19 Nov 2026 · r14: pinned shipment journey with own routes per story; Sound familiar? one row of three; pricing two equal columns; light-theme yellow edges.
19 Nov 2026 · r15: warm ivory light theme; How it works alignment; Four documents navy panel + animated beams; Sound familiar? pain→answer rows; one title style; journey colours + fits one window; pricing split card (time.fyi) + border beam; smaller Estimate popup; dot-to-arrow buttons and underline links; minimalist tabs; EUDR line removed from step 03; LICENSES.md. Open: reduced-motion gap in Four documents, pause control doesn't cover the pricing beam, check phone map size (~236×162).
19 Nov 2026 · r16: fonts swapped from Geist to Inter (sans) + IBM Plex Mono; display tracking retuned; Four documents panel now uses theme surfaces instead of navy.

## Since round 15
This brief was last fully updated around round 15. The standing decisions from `docs/home/DECISIONS.md` rounds 17 to 35 are below, one line each. Where this brief and DECISIONS.md disagree, DECISIONS.md is the newer truth.

- **One story, with the ink ship guide.** Hero, statement, before and after, how it works, the journey, pricing, FAQ, then the wordmark finale. A small container ship drawn in ink sails a dashed lane in the gutter and guides the reader down the page (r17, r18-1, r22-2). On phones it is a 10px yellow dot with an ink ring where the gutter is under 50px.
- **Straight dashes.** Every dash of the lane is its own straight 4px segment with a 6px gap, and the ticks are straight and perpendicular to the lane (r25-1b, r21-3).
- **Hand-offs follow the scroll position.** The map to gutter-ship hand-off and the ship to ı-dot hand-off are pure functions of the scroll position, not timed tweens, so they play at any scroll speed and reverse on scroll up (r30-1, r32-1).
- **Departures board, no colour band.** The board sits on the page canvas, not on a navy band, in both themes. One row per scroll step, each with its story; tiles use theme tokens, with `--board-pass` and `--board-stop` for the verdicts (r31-1, r33-1, r33-2).
- **Button jiggle, still label.** Primary buttons keep the magnetic pull, the arrow nudge, the click dot-burst and the yellow colour on hover. The letter roll is removed, so the label stays still and its accessible name is unchanged (r34-1). (DECISIONS.md does not use the word "jiggle"; this line lists the motion it says was kept.)
- **Ending: the photo through the wordmark, then the footer.** The letters of "bindu" are a mask over the cargo photo, which zooms through as you scroll. The final view is the photo and the footer only, with no closing title, no ship and no demo button (r28-3R, r29-1 to r29-6, r34-2, r34-4). The brief's "demo CTA in nav, hero, final section" rule is not edited; r34-4 departs from it at Austin's request.
- **The ı dot is a sunflower made of dots.** The dot of the dotless ı is an inline SVG of 34 dots on a golden-angle disc, yellow in the middle and cobalt at the rim. The guide ship is built from the same 34 dots and lands in it (r30-2).
- **Sounds off by default.** Web Audio, off until the reader turns it on, the context created only from a user gesture, recorded Kenney "Interface Sounds" (CC0) clips (r21-1, r22-1, r28-5). In this repo the sound system, the nav sound button and the "Skip intro" button were removed after the port, so the homepage has no sound.
- **No hero selector.** The hero is the headline, the sub-line and the demo button. The "See what applies" selector and its result card were removed (r34-3).
- **Phone rules (round 35).** Everything is behind `@media (max-width: 767px)` or the shared `isPhone()`; 768px and up is untouched. The guide draws only its dot and the proof dots, and the pins are shorter (how it works 200svh, journey 220svh, finale 285svh). The journey map is full width, showing the current step's title and sentence. The departures board is a two-column grid showing five rows at a time. Particles are lighter and canvases use DPR 1. Gutter 20px, section padding 96px, body-small 16px, tap targets at least 44px, safe-area padding. The wordmark is 84% of the screen width up to 600px (r35-1 to r35-7, `docs/home/mobile-critique.md`).
