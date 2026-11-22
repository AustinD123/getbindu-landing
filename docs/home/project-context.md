Bindu landing page: project context

Read this before planning or writing anything. It is the source of truth for facts, design and rules. Decisions here override older notes, skills and earlier rounds. When something here is wrong or out of date, update this file.

Last updated: 22 Nov 2026 (r36 done; folds in rounds 17 to 36)

1. The project
What: the redesigned Bindu homepage (`/`), designed in a separate mockup repo and ported into this repo in `features/landing/home/` (React + TypeScript in Next.js, GSAP + ScrollTrigger, Lenis, three.js for WebGL). Where this brief mentions sub-pages, those were mockup-only: this repo's real pages are used instead.
Who: built by Austin Dcosta (contractor) for Bindu.
Raahul Dutta: founder, final decisions.
Suraj Biswas (suraj@getbindu.com): reviewer; daily sync at 8 PM IST.
Status: ported into getbindu-landing; the live site is still served by shelley until the merge-back. The mockup badge is not part of the port. Status rule (Austin, 22 Nov 2026): whatever is shown on getbindu.com is live, so "Ask your supply chain" (the questions theatre) is live; round 36-4 ports it into the homepage between How it works and the journey.
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
Main angle (r36): traceability through documents. Every line of the record points back to the supplier document behind it. Not EUDR-specific.
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
Demo CTA only in: nav and hero (r34-4 removed the final-view button at Austin's request). No demo buttons repeated in every section.
"Estimate your cost" is secondary: only in the pricing section and the calculator popup (which ends with the Book a demo button).
cal.com link lives in one config value. TODO: need the 15-minute event URL from Bindu.
9. Design system
Full detail in docs/home/DESIGN.md (including its "Consistency rules"); tokens in `features/landing/home/styles/tokens.css`. Where DESIGN.md's older prose or this brief disagree with the CSS, the CSS and DECISIONS.md (rounds 17 to 35) win.
Look (r17 on): ink-and-paper, in the spirit of Notion. Display weight 600 in Inter, tight negative tracking, body line-height 1.5, no glows or shadows (the tokens are set to `none`/`transparent`), one hairline everywhere. Key numbers are plain text colour (`--key-num`); yellow is for the primary pill, the Live chip and the dots.
Colours: yellow `#FFD400` and cobalt are still placeholders until Bindu sends exact hex. Yellow = the main action, the Live chip, proof dots. Cobalt = the system: lines, links, active states, progress, QR data dots; on dark `--cobalt-signal #3D7BFF`, on light `#1F55C4` for lines and `#08327A` for links and text. "In build" chips: grey dashed outline. Never `#000` or `#fff` as a surface.
Light theme (default, set in tokens.css, r22-13): canvas `#F1ECE1`, panels `#FBF9F4`, nested `#E7E1D3`, hairline `#CFC8B6`, ink `#0E1A30`, body `#2F3A56`, mute `#434E6A`; yellow stays `#FFD400` with `--yellow-outline` as its edge. Dark theme: canvas `#0A0A0A`, panels `#141416`, nested `#1C1D21`, off-white ink lines `#EDE8DA`. Both themes: identical layout; only colour tokens differ. Saved in localStorage, no flash (inline head script).
Ink line: `--line-ink` draws the guide ship, the strike lines and the single-line drawings. Dots: `--proof-dot` (yellow, with `--yellow-outline`) and `--route-line` / `--cobalt-signal`.
Bands (r29-7): the page background is the body colour, crossfaded between `--band-canvas`, `--band-tint` and `--band-panel` as you scroll (`lib/bands.ts`, `bands.css`). Hero canvas, statement tint, Sound familiar canvas, How it works panel, journey canvas, departures board canvas (r33-1: no navy band), pricing canvas, FAQ panel, ending canvas. Fixed tokens: `--navy-*` (same in both themes), `--on-photo*` (white text on the finale photo), `--board-pass #3D7BFF` and `--board-stop #FF6B5E`.
Type: Inter (sans) + IBM Plex Mono, self-hosted, set only through `--font-sans` and `--font-mono`. Display sizes (clamp): xl 48 to 96, lg 40 to 72, md 32 to 48, sm 24 to 32, xs 20; body-lg 19, body 17, body-sm 15, caption 13. Sentence case everywhere: eyebrows, buttons, chips and tabs are sans (r17-2), not mono caps. Mono is for prices, numbers, reference numbers, the event log, map labels and the departures board flaps.
Spacing: 4px base (`--s-1` 4 to `--s-10` 120), container 1200px, gutter 16 to 32px (20px on phones), section padding `clamp(80px, 11vw, 160px)` (96px on phones). Radii: cards and inputs 12px (`--r-sm`), large panels 16px (`--r-lg`), pills 9999px (buttons only), chips 6px.
Buttons: one `.btn` set, 44px tall. Primary = yellow pill, ink sans label 15px/500, a plain arrow after the label that nudges 4px on hover; magnetic pull on fine pointers; a dot burst on click; the label stays still (r34-1); press scales .98; 2px cobalt focus ring. Text links: a cobalt underline grows from the left, the text wipes to cobalt, the arrow nudges 4px. One easing `cubic-bezier(0.22,1,0.36,1)`, 200ms for colour and arrow; reduced motion = instant swaps.
Tabs (journey stories, pricing toggle): one component, `.seg-track`: muted sans labels 15px, active = full contrast with a 2px cobalt underline that slides, one hairline under the row. No fill, glow or dots.
Headings: SplitText line masks on every `main h2` (reveal scrubbed to the scroll, r22-6); the full stop of a heading is a small yellow dot (r22-17); a soft canvas scrim sits behind headings (not on phones).
Motif: "Bindu = dot". The dot of the dotless ı in the finale is a sunflower of 34 dots (yellow centre, cobalt rim); the guide ship is built from the same 34 dots; the nav and footer logo is Bindu's official sunflower (r36-3: `public/home/bindu-logo-*.webp`, from GetBindu/Bindu `assets/bindu_logo.png`); the dot `Mark` stays only on the statement chip.
The ink ship guide (r17 to r30): a small container ship drawn in ink sails a dashed lane in the gutter (straight 4px dashes, 6px gap, perpendicular ticks), tilts up to 3 degrees, bobs up to 2px, and is drawn on one fixed canvas. It stops at each section anchor and drops yellow proof dots. Where the gutter is under 50px it is a 10px yellow dot with an ink ring. The hand-offs (map to gutter ship, ship to the ı dot) are pure functions of the scroll position, so they play at any speed and reverse on scroll up. The scroll-progress dot rail sits in the right gutter from 1100px.
Motion: calm, readable, scroll-linked and reversible; GSAP + ScrollTrigger + Lenis; the hero's pause button freezes the guide and the map; reduced motion = composed end states, no pins; canvases cap DPR at 1.5 (1 on phones); WebGL lazy-loaded. Sounds are not part of this repo (removed after the port). Recreate reference effects in our own code.
Phones (r35): everything behind `@media (max-width: 767px)` in `styles/mobile.css` or the shared `isPhone()`; 768px and up is untouched. Gutter 20px, body-small 16px, display-lg 32px, display-md 28px, tap targets 44px, safe-area padding. Shorter pins: how it works 200svh, journey 220svh, departures board 100svh + 18svh per row, finale 285svh. See `docs/home/mobile-critique.md`.
10. Page structure (current homepage, in order)

Source of truth: `features/landing/home/home-page.tsx`. Update this list when it changes.

Intro (first visit, about one second): one dot blooms into the mark, then hands off to the hero. Returning visits and reduced motion skip it.
Nav (r36-3, ref parallel.ai): fixed, 56px; 24px official logo and wordmark (the wordmark collapses once scrolled), 12px muted mono-caps links grouped together, 36px theme toggle, 36px "Book a demo" pill, a drawer on phones (44px targets). No sound button, no skip-intro button.
1. Hero (`#top`): centred headline word by word, one sub-line, the demo button, a pause button, over the dot-map with yellow shipments that fade out with the hero (r33-3). No selector (r34-3).
2. Statement (`#statement`): "Describe a shipment once. Bindu works out the rules and the HS code, gathers the evidence and prepares the filing." Words, the yellow Bindu chip and the mark light up from the scroll position.
3. Sound familiar? (`#pains`): three rows, pain left struck through, Bindu's answer right; scrubbed, dotted cobalt rule between rows. The third answer carries "For EUDR today."
4. How it works (`#how`): pinned (330svh, 200svh on phones). Left: "One sentence in. The proof comes back.", then Describe, Prove, File (the active step in full contrast, the others muted). Right: kinetic sentence, a streaming event log of made-up events, then a QR passport of 169 dots that fly in (labelled Illustration). Generic, not EUDR. File step (r36-5): four record lines, each with a thin cobalt thread back to its source document; hover, focus or tap shows "from <document> · <supplier>" (Illustration).
4b. Ask your supply chain (r36-4, `Ask.tsx`): "Stop chasing documents. Just ask." Pinned 300svh, scrubbed by scroll; left: heading, lead, five captions; right: scenario tabs (coffee, textiles, batteries) and the stage. Live (it is on getbindu.com). Phones: no pin, tabs and three answer cards.
5. One shipment from origin to customs (`#shipment`): pinned (420svh, 220svh on phones); tab row EUDR, CBAM, DPP, REACH, PPWR; each tab has its own route, cargo and milestones (Illustration). The ship arrives, dissolves into the mark's dots, and the dots stream to the gutter ship. Phones: no hand-off.
6. Departures board (`#examples`): "What the rules let through, and what they stop." Pinned, one row per scroll step (8 rows, 4 let through, 4 stopped; EUDR, DPP, Battery), each with its story; flaps on the page canvas; phones show five rows at a time. Battery stories say "In build". All Illustration.
7. What each filing costs (`#pricing`): centred head + tab row; one bordered card split in two (receipt left, included list and "Estimate your cost" right); odometer price; no beam. Only "Estimate your cost"; the EUDR check is a text link.
8. FAQ (`#faq`): minimal accordion, aligned plus/minus icons; head left, list right.
9. Finale (`#demo`): the photo seen through the letters of "bındu"; the ship breaks into 34 dots that build the sunflower dot of the ı; the mask zooms until the photo fills the screen; then the footer rides up over it. No closing title, no ship, no demo button in the final view (r34-2, r34-4). Footer: link columns, a roles row ("For importers, exporters and co-ops, customs brokers, traders"), legal.

Removed for good: "Start with EUDR"; "Who's behind Bindu" (moved to /about); "Who Bindu is for" role cards (r17-11); "Four documents become one record" (deleted with r17-8; its idea lives in How it works); the hero selector (r34-3); the old earthy theme; sounds (this repo).

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
parallel.ai's compact header; the old "Ask your supply chain" questions theatre.

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
Skills installed in the repo: frontend-design, bindu-design, polish / impeccable, Unslop, UI/UX Pro Max (layout only, not its palettes), strategic-narrative; slop checks (r36-2, MIT, gates only): hallmark, avoid-ai-design (scanner `scripts/detect.mjs`), antislop + antislop-ui, make-interfaces-feel-better.
15. Later: SEO

Not now. After the design is final: pre-render pages (SSG), text in HTML not only in canvas, keep existing URLs/blog rankings with redirects, per-page titles/meta/H1, structured data (Organization, SoftwareApplication with Offer, FAQPage), sitemap, Lighthouse in both themes. Suraj accepts a 2–3% score hit only for deliberate creative choices.


16. Recent rounds
19 Nov 2026 · r14 to r16: pinned journey with own routes; pricing split card; warm ivory light theme; Inter + IBM Plex Mono.
Rounds 17 to 35 (branch v3-story, one story): ink-and-paper restyle with no glows (r17); ink ship guide, straight dashes, staged hand-offs as pure functions of scroll (r18 to r30); How it works with kinetic type, event log and QR passport (r21, r28); departures board, one row per scroll step (r31, r33); page bands that crossfade (r29-7); the finale as a photo through the wordmark with the 34-dot sunflower ı (r28 to r34); performance passes (r24, r25); phone pass (r35). Details: DECISIONS.md.
22 Nov 2026 · r36: brief consolidated + consistency rules (r36-1); slop-check skills (r36-2); official logo + 56px nav (r36-3); Ask your supply chain section (r36-4); traceability threads in the File step + trace copy in hero, statement, Prove, FAQ (r36-5); slop pass, nothing failed (r36-6).
22 Nov 2026 · r37: shorter hero sub-line, console errors, consistency-audit fixes. Spec: `docs/home/rounds/round-37.md`.
