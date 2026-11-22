---
version: 1
name: Bindu-home
description: Bindu's futuristic marketing system. x.ai's near-black canvas, regular-weight display type, mono labels and outline pills; Together AI's dark/light band rhythm, mono-caps labels and blueprint diagrams; Apple's whitespace, strict scale and product framing. Brand colours yellow (act / live / key number) and cobalt (the system) on black.
sources:
  - awesome-design-md (github.com/VoltAgent/awesome-design-md) @ fcc7028, MIT: design-md/x.ai, design-md/together.ai, design-md/apple

colors:
  brand-yellow: "#FFD400"     # PLACEHOLDER until Raahul sends the app's exact value
  brand-cobalt: "#0047AB"     # PLACEHOLDER until Raahul sends the app's exact value
  yellow-press: "#E6BF00"
  cobalt-signal: "#3D7BFF"    # lines / glows / progress on black (5.2:1)
  cobalt-deep: "#0A1A3D"
  canvas: "#0A0A0A"           # x.ai canvas
  canvas-soft: "#141416"
  canvas-mid: "#1C1D21"
  hairline-dark: "#26282D"
  on-dark: "#FFFFFF"
  on-dark-body: "#DADBDF"     # x.ai body
  on-dark-mute: "#8A8E95"     # 6.0:1 (x.ai #7d8187 nudged up for AA headroom)
  paper: "#FFFFFF"            # dark: Together reading band. Light (round 14): #F8FAFC, a lighter panel
  paper-soft: "#F5F5F7"       # dark: Apple parchment. Light (round 14): #E4EAF2, the alternate band
  hairline-light: "#E6E6E9"   # light (round 14): #CAD2DE
  ink: "#0A0A0A"              # light (round 14): navy #0B1B3A
  ink-body: "#5C5F66"         # 6.4:1 (Together's #959494 fails AA on white, replaced). Light: #3E4A63
  ink-mute: "#6B6E75"         # 5.1:1. Light: #56627A

typography:
  family-sans: Inter, system-ui, sans-serif          # stands in for Universal Sans / The Future / SF Pro
  family-mono: IBM Plex Mono, ui-monospace       # stands in for GeistMono / PP Neue Montreal Mono
  display-xl: { size: 96px, min: 48px, weight: 400, lineHeight: 1.0, tracking: -0.025em }
  display-lg: { size: 72px, min: 40px, weight: 400, lineHeight: 1.0, tracking: -0.025em }
  display-md: { size: 48px, min: 32px, weight: 400, lineHeight: 1.05, tracking: -0.022em }
  display-sm: { size: 32px, min: 24px, weight: 400, lineHeight: 1.12, tracking: -0.018em }
  display-xs: { size: 20px, weight: 400, lineHeight: 1.4 }
  body-lg:    { size: 19px, weight: 400, lineHeight: 1.5 }
  body:       { size: 17px, weight: 400, lineHeight: 1.47 }   # Apple's 17px reading pace
  body-sm:    { size: 15px, weight: 400, lineHeight: 1.45 }
  caption:    { size: 13px, weight: 400, lineHeight: 1.4 }
  mono-eyebrow: { size: 12px, weight: 500, tracking: 0.12em, case: upper }
  mono-button:  { size: 13px, weight: 500, tracking: 0.06em, case: upper }
  mono-chip:    { size: 11px, weight: 500, tracking: 0.08em, case: upper }

rounded: { card: 8px, frame: 18px, pill: 9999px }
spacing: { base: 4px, scale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 120], section: "80px → 160px", container: 1200px, gutter: "16px → 32px" }
motion:
  ease-out: cubic-bezier(0.16, 1, 0.3, 1)
  ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
  durations: [160ms, 320ms, 700ms, 1200ms]
  press-down: 1px          # round 7: pressed = 1px down, not a scale (tokens.css --press-down)
  focus-ring: 2px solid cobalt  # cobalt-signal #3D7BFF on dark (5.2:1), brand cobalt on light (8.4:1)
---

# Bindu homepage design system

Applies to the homepage (`/`). Other pages follow `docs/DESIGN.md`.

Code: `features/landing/home/styles/tokens.css` (tokens) and `features/landing/home/styles/components.css` (components).
Preview: `preview/tokens.html`.

## What comes from where
| Layer | Source | What we take | What we leave |
|---|---|---|---|
| Base | x.ai | Near-black canvas `#0A0A0A`; display at weight 400 with tight negative tracking; uppercase tracked mono eyebrows; **every button a pill**; 1px translucent-white outline (`rgb(255 255 255 / .25)`); a single filled pill as the rare exception; hairline cards (8px, `#191919`-family), no shadows. | x.ai's dark-only rule (we need light reading bands), its sunset/dusk accents, white as the filled pill colour. |
| Structure | Together AI | Dark hero bands alternating with bright white reading bands (no in-between greys); mono-caps button labels and eyebrows; one primary CTA per viewport; code-editor-style dark mock inside light bands; data-table headers in mono caps. The blueprint style for diagrams is ours, built in that spirit: cobalt lines on a faint cobalt grid, dashed for "in build". | Its orange-magenta-periwinkle gradient, 4px rectangle buttons (x.ai pills win), the footer wordmark banner, #959494 body grey (fails AA). |
| Polish | Apple | Generous whitespace (every band ~one viewport of air); strict, short type ladder; 17px body at 1.47; press = 1px down, no scale; frosted blur only on sticky chrome; one shadow, reserved for the framed product (here: the app frame); "the colour change is the divider". | Weight 600 headlines (x.ai's 400 wins), Action Blue (cobalt replaces it), photography-first (we frame product mocks instead). |

## Colour roles (strict)
- **Black and greys: ~90%.**
- **Yellow** = "act / live / the number that matters": the one filled pill (Book a 30-minute demo), Live chips, key numbers (€249, 30 Dec 2026, 30 Jun 2027). Ink text on yellow (13.8:1). Never yellow text on white (1.4:1).
- **Cobalt** = "the system working": app frames, active steps, progress, links, data lines, light trails, glows, the agent-layer blueprint. Brand cobalt for fills (white text 8.4:1) and for links/frames on white (8.4:1). On black use cobalt-signal `#3D7BFF` (5.2:1, graphics only). No cobalt text on black; links on dark are white with a cobalt underline.
- **Never the same job for both.** In-build status is a neutral dashed outline, not yellow and not cobalt.
- Placeholders: `--brand-yellow #FFD400`, `--brand-cobalt #0047AB`. Every derived step (press, signal, deep, glows) is listed in `tokens.css`; recompute and re-check contrast when the real values arrive.

## Measured contrast (WCAG 2.x)
| Pair | Ratio | Use |
|---|---|---|
| Yellow on canvas | 13.8 | key numbers, Live chip on dark |
| Ink on yellow | 13.8 | primary pill label, Live chip |
| Cobalt on canvas | 2.35 | **not for text or thin lines** |
| Cobalt-signal on canvas | 5.16 | lines, trails, progress (needs 3:1) |
| White on cobalt | 8.44 | cobalt fills |
| Cobalt on white | 8.44 | links, frames on light bands |
| Mute #8A8E95 on canvas | 6.02 | captions on dark |
| Body #5C5F66 on white | 6.40 | body on light (dark theme) |
| Mute #6B6E75 on white | 5.11 | captions on light (dark theme) |
| Navy #0B1B3A on canvas #EEF1F5 | 15.04 | text on light (round 14) |
| Navy on paper-soft #E4EAF2 | 14.08 | text on the light alternate band |
| Mute #4F5C75 on canvas | 5.94 | captions on light |
| Brand cobalt #0047AB on canvas | 7.45 | links on light |
| Cobalt-signal #2A63D8 on canvas | 4.78 | lines, trails on light (needs 3:1) |
| Yellow #FFC400 on canvas | 1.41 | fills only; never text. Navy on yellow 10.67 |

### Light theme (round 14)
Colour values only (`[data-theme="light"]` in `tokens.css`). Sizes, spacing and positions are the same as dark, so every box is identical in both themes.
- **Base:** a cool blue-grey, not white: `--canvas #EEF1F5`. Panels are a step lighter (`--canvas-soft #F8FAFC`, `--paper #F8FAFC`); the alternate band is `--paper-soft #E4EAF2`; nested surfaces `--canvas-mid #E2E8F0`.
- **Lines:** light navy-grey hairlines (`--hairline-dark #C5CEDB`, `--hairline-light #CAD2DE`).
- **Text:** navy `#0B1B3A`, body `#2C3852` / `#3E4A63`, mute `#4F5C75` / `#56627A`. Navy on canvas is 15.0:1.
- **Cobalt for the system and links:** brand cobalt `#0047AB` for links and text (7.45:1 on canvas); `--cobalt-signal #2A63D8` for lines and trails (4.78:1).
- **Yellow for the highlights and shipments:** `--brand-yellow #FFC400` (a touch deeper than the dark yellow, so it reads on light). Navy text on yellow is 10.7:1. Yellow is still never text on light (1.41:1 on canvas).
- **Inspiration:** ClickHouse's sparing yellow accent and Miro's yellow and blue pairing on light surfaces (VoltAgent's `awesome-design-md`). Yellow stays scarce; cobalt marks the links and the system.
- **Map:** the hero's routes and dots use the same tokens, and the veil under the copy is the light base, so the copy keeps AA over the map (pixel-sampled in round 14).

## Type
Inter + IBM Plex Mono (both SIL OFL 1.1), self-hosted (r16) in the build. Display 96/72/48/32/20 at weight 400, sentence case, negative tracking; body 19/17/15/13; mono uppercase for eyebrows (12), button labels (13), chips (11) and readouts. Two-face contrast is the voice: sans for narrative, mono for anything technical. Never mono paragraphs; never caps headlines.

## Components
- **Buttons:** `btn-primary` (yellow pill, ink mono-caps label, one per view) · `btn-outline` (transparent, 1px white 25% on dark / black 12% on light) · `btn-icon` (44px circle) · `link`. All ≥44px tall; pressed 1px down (no scale); visible focus is a 2px cobalt ring on dark and light (cobalt-signal on black, brand cobalt on white).
- **Chips:** `chip-live` (yellow, dot) · `chip-build` (dashed outline) · `chip-neutral` · `chip-illus` ("Illustration" on every mock).
- **Cards:** 8px radius, hairline. **App frame:** 18px, cobalt hairline + glow, mono title bar with an Illustration chip; the only element with a shadow.
- **Steps / progress:** cobalt-signal for the active state.
- **Blueprint:** dark `#070B16` panel, 24px cobalt grid at 10%, cobalt-signal solid lines for Live, dashed for In build, mono labels.
- **Bands:** `band-dark` / `band-light` / `band-soft`, full-bleed, no rounded corners, no decorative dividers.

## Sunflower and dot system (Bindu means dot)
The sunflower stays Bindu's brand mark, made futuristic: precise geometric dots and points of light, never illustrated petals or clip-art.
- **Idea:** one dot = one piece of proof. Many dots on the golden-angle (phyllotaxis) spiral = the sunflower = the filing. Dot *n* sits at angle *n* × 137.508° and radius *c*·√*n*.
- **Colour:** dots being gathered are cobalt-signal (the system at work); the completed sunflower is yellow (filed, live). A lone divider dot is neutral white. Never any other colour.
- **The mark** (`src/assets/bindu-mark.svg`, `public/favicon.svg`): a geometric redraw of the sunflower logo, 21 lens petals around an 89-dot golden-angle seed disc, one colour via `currentColor`. Yellow (or white) on black. Nav 28px, footer 40px, favicon. *Proposal: needs Raahul's OK; the photographic logo on getbindu.com is unchanged.*
- **Hero:** the particle globe whose dots flow into the yellow sunflower as filings land (see MOTION.md).
- **Small uses:** spiral progress (dots fill in cobalt, all turn yellow at 100%); loading state (the spiral grows); section divider = one dot; the finale shows the completed sunflower.
- **May not appear:** as petal bullets or decorative flowers; on white reading bands as decoration; more than one sunflower per view; recoloured beyond yellow/white; next to "In build" items as if they were done; as photographic or illustrated petals.
- Tokens: `--golden-angle`, `--sun`, `--seed-pending`, `--dot-neutral`, `--mark-size-nav`, `--mark-size-foot`. Components: `.mark`, `.dot-divider`, `.spiral` (+ `.on`, `.is-complete`).

## Layout
Container 1200px; gutters 16 → 32px; section padding 80 → 160px; 4px spacing base. Hero and finale full-screen (100svh). Six sections only (see brief).

## Motion
See `MOTION.md`. Expo-out reveals, in-out scrubs; transforms and opacity only; scroll scenes are pure functions of scroll progress; WebGL lazy-loaded, paused off-screen; reduced motion = static end states.
