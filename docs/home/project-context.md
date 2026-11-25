Bindu landing page: project context

Read this before planning or writing anything. It is the source of truth for facts, design and rules. Decisions here override older notes, skills and earlier rounds. When something here is wrong or out of date, update this file.

Last updated: 25 Nov 2026 (r54 built: DESIGN.md v3, Sublime; r52 built; r53 cancelled; r51 done, PR #2 open)

1. The project
What: the redesigned Bindu homepage (`/`), designed in a separate mockup repo and ported into this repo in `features/landing/home/` (React + TypeScript in Next.js, GSAP + ScrollTrigger, Lenis, three.js for WebGL). Where this brief mentions sub-pages, those were mockup-only: this repo's real pages are used instead.
Who: built by Austin Dcosta (contractor) for Bindu.
Raahul Dutta: founder, final decisions.
Suraj Biswas (suraj@getbindu.com): reviewer; daily sync at 8 PM IST.
Status: ported into getbindu-landing; the live site is still served by shelley until the merge-back. The mockup badge is not part of the port. Status rule (Austin, 22 Nov 2026): whatever is shown on getbindu.com is live, so Full Circle is live (the "Ask your supply chain" theatre was removed in r44 and folded into the shipment map). Never add "in build" or "Coming" to something that is on getbindu.com.
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
r54: docs/home/DESIGN.md v3 is the one design system (measured from sublime.app on 25 Nov 2026, built in r54). Colours, themes and fonts are frozen (Bindu's); everything else follows Sublime: type ladder in Inter, centred sections, radii 5/10/15/20/25/30/40, flat `--canvas-mid` panels, one soft floating shadow, 36px (44 on phones) buttons with no movement, 30px fade-up reveals. v2 (parallel.ai shapes, kami background) is kept at `rounds/DESIGN-v2-r52.md` and is superseded; the component lines below that describe v1 or v2 (bands, hairlines, pills, mono caps, SplitText masks, the 3D testimonials track) are history. Tokens in `features/landing/home/styles/tokens.css`.
Look (r17 on): ink-and-paper, in the spirit of Notion. Display weight 600 in Inter, tight negative tracking, body line-height 1.5, no glows or shadows (the tokens are set to `none`/`transparent`), one hairline everywhere. Key numbers are plain text colour (`--key-num`); yellow is for the primary pill, the Live chip and the dots.
Colours: yellow `#FFD400` and cobalt are still placeholders until Bindu sends exact hex. Yellow = the main action, the Live chip, proof dots. Cobalt = the system: lines, links, active states, progress, QR data dots; on dark `--cobalt-signal #3D7BFF`, on light `#1F55C4` for lines and `#08327A` for links and text. "In build" chips: grey dashed outline. Never `#000` or `#fff` as a surface.
Light theme (default, set in tokens.css, r22-13): canvas `#F1ECE1`, panels `#FBF9F4`, nested `#E7E1D3`, hairline `#CFC8B6`, ink `#0E1A30`, body `#2F3A56`, mute `#434E6A`; yellow stays `#FFD400` with `--yellow-outline` as its edge. Dark theme: canvas `#0A0A0A`, panels `#141416`, nested `#1C1D21`, off-white ink lines `#EDE8DA`. Both themes: identical layout; only colour tokens differ. Saved in localStorage, no flash (inline head script).
Ink line: `--line-ink` draws the guide ship, the strike lines and the single-line drawings. Dots: `--proof-dot` (yellow, with `--yellow-outline`) and `--route-line` / `--cobalt-signal`.
Bands: retired in r54. One `--canvas` everywhere, no section rules or dividers, sections separated by space only (`lib/bands.ts`, `bands.css` and the `--band-*` tokens are deleted). Fixed tokens: `--navy-*` (same in both themes) stay.
Type (v3): Inter (sans) + IBM Plex Mono, self-hosted, set only through `--font-sans` and `--font-mono`. Hero `clamp(46px, 8.4vw, 120px)` lh .88 -0.045em; section display `clamp(40px, 6vw, 88px)` lh .9 -0.04em; weight 500; lead `clamp(22px, 2vw, 28px)` mute lh 1.07; body 18px (17 on phones); small 15; caption 12.5. Sentence case everywhere; chips, tabs and buttons are Inter. Mono for prices, numbers, reference and regulation numbers, map labels and the departures board flaps. Pinned sections cap the display size by window height (about 6 to 8svh) so head and stage share one window.
Spacing (v3): 4px base, container 1200px, gutter 16 to 32px (20px on phones). Every section is a centred column, `min-height: 80svh`, padding 56px (128px from 1024px), lead to content 56px (80px from 1024px). Radii: `--r-xs` 5 (buttons, chips) / `--r-sm` 10 (nav bar, menus) / `--r-md` 15 / `--r-lg` 20 (panels) / `--r-xl` 25 / `--r-2xl` 30 / `--r-4xl` 40 (full-width panels and the footer card from 1024px); the old names are remapped. Panels: `.v3-panel` (`--canvas-mid`, no border, no shadow); nested surfaces `--canvas-soft`. One soft shadow (`--shadow-float`) for floating things only (nav bar, dialogs, the map question bubble, the Regulations menu).
Buttons (v3): one `.btn` set, 36px (44 on phones), 5px radius, Inter 500 14px, padding 0 14px, no border, colour-only hover (200ms), no movement at all. `bh-btn-primary` (yellow, ink label; Book a demo), `btn-secondary` (`--canvas-mid`, mute label; Estimate your cost, Read the rule, tabs), `btn-ghost` (4% fill; pause, menu, icon buttons). Tabs (`.seg-track`): a centred row of secondary buttons, the active one an ink fill with a canvas label, no indicator. Text links are colour-only (mute to ink); inline links cobalt with a 1px underline, 4px offset. Chips 22px, 5px radius, no border except In build (dashed).
Nav (v3): the floating bar is `--canvas-mid` at 88% with the backdrop blur, 10px corners, no border, the soft shadow; links Inter 15px mute, hover ink; the active section pill is a secondary-button fill, the yellow dot stays; Book a demo (`btn-primary`) at the right of the expanded bar only; the collapsed pill is the logo only.
Headings and motion (v3): every `main h2` and its lead fade up 30px, once on entry (opacity 0 to 1, y 30 to 0, expo-out, 0.7s, lines staggered 0.08s, GSAP, `lib/headings.ts`); the hero headline, sub-line and CTA do the same after the intro (`Hero.tsx`); Full Circle's title swap fades out up (0.2s) then fades up. The full stop of a heading is a small yellow dot. Map readability (r41-1): the map stays sharp; only content blocks past the hero get a feathered `backdrop-filter: blur(8px)` layer behind them. Never blur or dim the whole map.
Motif: "Bindu = dot". The dot of the dotless ı in the finale is a sunflower of 34 dots (yellow centre, cobalt rim); the guide ship is built from the same 34 dots; the nav and footer logo is Bindu's official sunflower (r36-3: `public/home/bindu-logo-*.webp`, from GetBindu/Bindu `assets/bindu_logo.png`); the dot `Mark` stays only on the statement chip.
The ink ship guide (r17 to r30): a small container ship drawn in ink sails a dashed lane in the gutter (straight 4px dashes, 6px gap, perpendicular ticks), tilts up to 3 degrees, bobs up to 2px, and is drawn on one fixed canvas. It stops at each section anchor and drops yellow proof dots. Where the gutter is under 50px it is a 10px yellow dot with an ink ring. The hand-offs (map to gutter ship, ship to the ı dot) are pure functions of the scroll position, so they play at any speed and reverse on scroll up. The scroll-progress dot rail sits in the right gutter from 1100px.
Motion: calm, readable, scroll-linked and reversible; GSAP + ScrollTrigger + Lenis; the hero's pause button freezes the guide and the map; reduced motion = composed end states, no pins; canvases cap DPR at 1.5 (1 on phones); WebGL lazy-loaded. Sounds are not part of this repo (removed after the port). Recreate reference effects in our own code.
Phones (r35, r54): everything behind `@media (max-width: 767px)` in `styles/mobile.css` or the shared `isPhone()`; 768px and up is untouched. Gutter 20px, body 17px, body-small 16px, tap targets 44px, safe-area padding. Section display is the v3 40px floor; pinned heads on phones stay small so the window fits. Phones skip the intro, three.js and the eager Lenis load (speed, r41 web-quality). Shorter pins: journey 220svh, departures board 100svh + 18svh per row, finale 285svh. See `docs/home/mobile-critique.md`.
10. Page structure (current homepage, in order)

Source of truth: `features/landing/home/home-page.tsx`. Update this list when it changes.

Intro (first visit, about one second): one dot blooms into the mark, then hands off to the hero. Returning visits and reduced motion skip it.
Nav: 24px official logo and wordmark; links How it works, Pricing, FAQ, one "Regulations" dropdown (EUDR, CBAM, REACH, PPWR, Passports; r38-1), Blog; theme toggle; Book a demo on the expanded bar (r52); a drawer on phones (44px targets) that keeps "Book a demo". Desktop is the floating bar of section 9 (r42/r43); past the hero it collapses (GSAP, 0.7s) to a 56px round pill with only the logo; hover or focus expands it. No progress rail, no sound button, no skip-intro button.
1. Hero (`#top`): centred headline, one sub-line, the demo button (all fade up 30px after the intro), a pause button, over the dot-map with yellow shipments that fade out with the hero (r33-3). No selector (r34-3).
2. Statement (`#statement`): "Describe a shipment once. Bindu works out the rules and the HS code, gathers the evidence and prepares the filing." Words, the yellow Bindu chip and the mark light up from the scroll position.
3. Story (`#story`, `Flow.tsx`, r44 to r50, panel layout r54; replaced "Sound familiar?"): what Bindu does, in four steps on one pinned, scrubbed stage (500svh): a sentence types in, docks into a filing record, rule chips and the customs code arise, routes fetch proof from two suppliers (email, WhatsApp), a reference is typed and the yellow dot lands on it ("Filed"). r54: a centred head above ONE panel; the held step line (progress dots, step title and sentence, faded up instead of masked) sits inside the panel on the left, the stage on the right. Phones and reduced motion: a stacked list with the finished record.
4. Full Circle (`#how`, `Theatre.tsx`, r39-2, r41-2, r44, r54; replaces How it works, removed in r39-1): "Full Circle." is a small label; the h2 is a buyer question per act (Fabric "Where did the cotton come from?", Bean "Can this coffee prove its farm?", Circle "Who can read this shirt's record?") and fades out up then up on tab change. r54: a centred head (label, title, lead, tab row of secondary buttons) above ONE panel that holds the stage and, under it on the left, the current caption with its yellow dot and scene dots. Pinned and scroll-driven, never a video: only the chosen act plays, 100svh per scene, eased scrub; tabs swap the act. One Illustration chip. Phones and reduced motion: the final frame of the act with every caption listed.
5. One shipment from origin to customs (`#shipment`): pinned (420svh, 220svh on phones); a centred head (title, story line, tab row EUDR, CBAM, DPP, REACH, PPWR, status); each tab has its own route, cargo and milestones (Illustration). At the proof milestone one question bubble and answer (the old Ask, r44) shows on the map as a `--canvas-mid` panel card with the soft shadow. The ship arrives, dissolves into the mark's dots, and the dots stream to the gutter ship. Phones: no hand-off.
6. Departures board (`#examples`): "What the rules let through, and what they stop." Pinned, one row per scroll step (8 rows, 4 let through, 4 stopped; EUDR, DPP, Battery), each with its story; r54: centred head, the board is one panel (max 1200px, 40px corners from 1024px) with the flaps, the story centred under it; phones show five rows at a time. Battery stories say "In build". All Illustration.
6b. Testimonials (`#voices`, `Voices.tsx`, r44, r47, flattened r54): a straight sideways row of panel cards moved by the scroll (sticky, drag + arrow keys, snap; no 3D, no rotation); the row fades up on entry; the words of the front quote light up and a dashed cobalt route from the country code to the EU carries a yellow dot. PLACEHOLDER quotes (`TESTIMONIALS_PLACEHOLDER`) with a visible "Placeholder" chip until Raahul-approved quotes replace them. Phones and reduced motion: a list.
6c. Regulations (`#rules`, `Rules.tsx`; r52-3 finished in r54; ref awwwards cards-horizontal-scroll-the-performance-lab): the section pins (300svh) and the vertical scroll moves a row of five panel tiles sideways (EUDR, CBAM, DPP, REACH, PPWR: mono regulation number, name, description, Covers, Live / In build chips, EUR-Lex source, "Read the rule"); the tile at the reading position is full ink, the others mute. No drag, tilt, flaps or lane. Phones (tiles 85vw), reduced motion, windows under 620px tall and no JS: a native scroll-snap row.
Map blur (r48): one feathered 10px backdrop-blur layer behind each content window past the hero, no tint (Austin: "I shouldn't be able to tell the difference").
7. What each filing costs (`#pricing`): centred head + tab row of secondary buttons; one panel (40px corners from 1024px) split in two (receipt left, included list and "Estimate your cost" right); odometer price; no beam. Only "Estimate your cost"; the EUDR check is a text link.
8. FAQ (`#faq`): a centred head over a centred list (max 768px) in one panel, accordion rows separated by space, aligned plus/minus icons.
9. Finale (`#demo`): the getbindu.com port clip (`rotterdam-port-hero`, poster on phones and reduced motion; r52-2) seen through the letters of "bındu"; it zooms to the end of the scroll; the ship breaks into 34 dots that build the sunflower dot of the ı; the mask zooms until the picture fills the screen; then the footer rides up over it. No closing title, no demo button in the final view (r34-2, r34-4). Footer (r54): Sublime's centred card (`--canvas-mid`, max 780px and 40px corners from 1024px, 400px on phones) with the brand, link columns on 48px gaps, the roles row and the legal line, over the gradient.

Removed for good: How it works with the QR/paperwork window (r39-1); "Start with EUDR"; "Who's behind Bindu" (moved to /about); "Who Bindu is for" role cards (r17-11); "Four documents become one record" (deleted with r17-8; its idea lives in How it works); the hero selector (r34-3); the old earthy theme; sounds (this repo); "Sound familiar?" `#pains` and the Ask theatre `#ask` (r44).

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
A ~3840px ship sketch for the finale (the 1920px source blurs at DPR 2).
Real testimonial quotes (exist; need Raahul's approval) to replace the placeholders.
Footage source and licence of the port clip (`public/videos/rotterdam-port-hero*.webm`, named Rotterdam; Austin calls it the Amsterdam port video).
Verify the `#rules` regulation numbers and EUR-Lex links (written from memory) and CBAM's status.
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
Cool blue-grey light theme (r15 first pass): too cold; same for a blue tint band (r40).
Full Circle as an autoplaying video, or playing every act on scroll, or scrubbing too fast (r41).
Blurring or dimming the whole map (r40-3): blur only behind content.
"In build" or "Coming" on anything live on getbindu.com.
A tinted or colour-washed blur behind content (r48); nested blur layers (they glitch).
Busy nav chrome: section labels, progress rail (r43). Book a demo is back in the expanded bar (r52), never in the collapsed pill.
Mono uppercase button, tab and chip labels (r52, parallel style); any button motion (magnetic pull, dot burst, nudge, press scale).
A different look per section, borrowed from a different site each time (r52: one system, DESIGN.md v2). Changing the colour theme or fonts in a design round.
Stiff, linear or "vibe-coded" story motion (r46 to r49); bland tiles and cards with nothing of the theme (r47).
14. References
Background (r53): open-design.ai kami (open-design.ai/plugins/design-system-kami, from tw93/kami, MIT). Components (r52): parallel.ai, shapes only.
Design files: github.com/VoltAgent/awesome-design-md (x.ai, together.ai, apple; clickhouse + miro for the light theme).
Motion: awwwards.com/sites/rothfinder; awwwards.com/inspiration/ scroll-animation-walbi-2; awwwards.com/inspiration/ map-interaction-sweeping-corp; Hanwha Ocean ship scroll animations; Stripe's sunflower-dot globe (stripe.com/blog/globe); Madar route lines.
Section patterns: trajectory.ai (product mock + steps), mailerbot.com (process, "tailored for you"), belli.ai (one rotating module section).
Effects library: Hyperiux Vault (free effects only, marked commercial-friendly).
Free MIT libraries (ideas rebuilt in our code; record any copied code in LICENSES.md): Magic UI, Uiverse, HyperUI, Flowbite core. Check Aceternity and Preline licences first.
Galleries (look only; maxibestof is personal-viewing only): maxibestof.one, unsection.com, Awwwards inspiration (pricing: Finsight, Klub, Good Fella, HeyOrca; buttons: Strakk, Edifis, Modulus).
Licences: see docs/home/LICENSES.md (created r15): GSAP standard no-charge, Lenis MIT, three.js MIT (replaced OGL, Unlicense), React MIT, Inter and IBM Plex Mono OFL 1.1.
Skills installed in the repo: frontend-design, bindu-design, polish / impeccable, Unslop, UI/UX Pro Max (layout only, not its palettes), strategic-narrative; slop checks (gates only): hallmark, avoid-ai-design (scanner `scripts/detect.mjs`), antislop + antislop-ui, make-interfaces-feel-better, heydamir-unslop (r41-3); web quality (addyosmani, MIT): performance, core-web-vitals, web-quality-audit, best-practices; SEO: seo, squirrelscan, blog-analyze; product-demo (videos in `out/product-demo/`, gitignored). `.mcp.json` adds chrome-devtools-mcp.
15. Speed and SEO (web-quality branch, 23 Nov 2026)
Speed passes: font preloads 10 to 4, Ask logo webp, Lenis on idle on phones, below-the-fold sections hydrate late (a ready registry lets headings, bands, guide and rail pick them up). Numbers in `docs/home/stats.md`; laptop Lighthouse is noisy (mobile 61 to 80, desktop 72 to 96), so judge on PageSpeed Insights from a deployed preview. Remaining levers: react-dom + gsap on phones; on desktop the intro hides `.hero-sub` (LCP ~2.7s), an open decision (shorten intro or show the hero text under it).
SEO: title "Bindu: Trade Compliance Software for EU Import & Export", canonical "/", og image `/bindu-card.jpg`, JSON-LD FAQPage only. No SoftwareApplication node: its rich result needs ratings we don't have (never fabricate). SEO 69 here is the deliberate noindex; `app/robots.ts` is never copied back to shelley, so production indexing is unaffected. Suraj accepts a 2 to 3% score hit only for deliberate creative choices.


16. Recent rounds
19 Nov 2026 · r14 to r16: pinned journey with own routes; pricing split card; warm ivory light theme; Inter + IBM Plex Mono.
Rounds 17 to 35 (branch v3-story, one story): ink-and-paper restyle with no glows (r17); ink ship guide, straight dashes, staged hand-offs as pure functions of scroll (r18 to r30); How it works with kinetic type, event log and QR passport (r21, r28); departures board, one row per scroll step (r31, r33); page bands that crossfade (r29-7); the finale as a photo through the wordmark with the 34-dot sunflower ı (r28 to r34); performance passes (r24, r25); phone pass (r35). Details: DECISIONS.md.
22 Nov 2026 · r36: brief consolidated + consistency rules (r36-1); slop-check skills (r36-2); official logo + 56px nav (r36-3); Ask your supply chain section (r36-4); traceability threads in the File step + trace copy in hero, statement, Prove, FAQ (r36-5); slop pass, nothing failed (r36-6).
22 Nov 2026 · r37: shorter hero sub-line, hydration console errors fixed (`useReducedMotion`), consistency-audit fixes.
22 Nov 2026 · r38: one Regulations dropdown, sans nav type; Ask fits one window, 500svh, clear current step.
22 Nov 2026 · r39: How it works removed; Full Circle ported into `#how`.
23 Nov 2026 · r40: warm light tint, hero-only heading scrim, "Live" chip copy.
23 Nov 2026 · r41: map blur only behind content; Full Circle one act per scroll, slower; heydamir/unslop audit (scheduled headless run).
23 Nov 2026 · web-quality: speed passes 1 to 4, late hydration, finale ship sketch, SEO metadata, SoftwareApplication removed, demo videos + stats.
23 Nov 2026 · r42: floating nav bar, section dot, scroll-progress rail (commit 5373bb2).
24 Nov 2026 · r43: nav collapses to a logo-only pill, rail and bar demo button removed; hydration mismatches on late sections fixed.
24 Nov 2026 · r44 to r50: Story replaces #pains, Full Circle titles per act, Ask folded into the map, departures board fits one window, testimonials + rules carousel, map blur one layer per window, story motion rebuilt (r50).
24 Nov 2026 · r51: scheduled slop audit, 0 P0/P1, 2 P2 (chip sizes) left. PR #2 opened (fork web-quality to raahulrahl main).
25 Nov 2026 · r52 (spec): DESIGN.md v2 (frozen colours and fonts, parallel.ai components everywhere); finale ship sketch to the getbindu.com port clip; #rules as a horizontal card scroll (ref The Performance Lab); controls stay Inter; no button motion; Book a demo back in the expanded nav bar only.
25 Nov 2026 · r53 (spec): one paper background (kami): band crossfade retired, hairline rules between sections, one panel style.
25 Nov 2026 · r54 (in progress): DESIGN.md v3 from sublime.app replaces v2; step 1 foundation approved; r53 cancelled.
25 Nov 2026 · r54 (built): DESIGN.md v3 (Sublime) implemented in four commits (tokens and foundation, components, motion, sections); r52 built with it (r52-3 rules finished); screenshots skipped on request.
