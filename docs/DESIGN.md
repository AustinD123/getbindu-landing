---
version: 2
name: bindu-design-system
description: "Bindu is the trade-compliance OS. Its interface is a calm,
  professional editorial register built on a premium-neutral foundation: an
  off-white stage (#f5f5f5), pure-white cards, warm near-black ink (#0c0a09),
  Newsreader serif for every headline, Inter for all UI, and exactly one
  chromatic color — cobalt (oklch(0.42 0.22 264) / #0033cc) — carrying every
  action, link, active state, and focus ring. Atmosphere is a single low-alpha
  cobalt bloom, never a palette; there are no pastel gradients, no mesh, no
  glassmorphism, no stock art. Three registers share this one token table: the
  marketing stage (the brand canon), the app console (dense, Inter-only chrome),
  and the public verify page (the soberest — an EU energy label, not a brand
  page)."

colors:
  # — The one chromatic color: cobalt. Anything not a neutral or a semantic state is this. —
  brand:            "oklch(0.42 0.22 264)"    # cobalt ≈ #0033cc — actions, links, active, focus
  brand-strong:     "oklch(0.36 0.24 264)"    # hover / pressed
  brand-soft:       "rgba(0, 51, 204, 0.06)"  # selected-row wash, idle brand chip fill
  brand-tint:       "rgba(0, 51, 204, 0.12)"  # cobalt active border (the only colored border)
  on-brand:         "#ffffff"                 # text on cobalt
  atmosphere:       "rgba(0, 51, 204, 0.10)"  # the single cobalt bloom — decoration, never a fill/text
  # — Neutrals (warm stone; these are not "color") —
  ink:              "#0c0a09"   # display + primary text (warm near-black)
  body:             "#4e4e4e"   # default running text
  body-strong:      "#292524"   # emphasized body text
  muted:            "#777169"   # subtitles, captions, idle labels
  muted-soft:       "#a8a29e"   # disabled text
  canvas:           "#f5f5f5"   # the off-white page floor
  canvas-soft:      "#fafafa"   # alternating sections, atmosphere cards
  surface-card:     "#ffffff"   # pure-white card on the off-white floor
  surface-strong:   "#f0efed"   # badges, icon plates, idle pills
  hairline:         "#e7e5e4"   # default 1px divider
  hairline-soft:    "#f0efed"   # lighter divider
  hairline-strong:  "#d6d3d1"   # panel / input outline
  # — Dark bookend (one CTA band + footer accents; never a mid-page band) —
  canvas-dark:      "#0c0a09"
  surface-dark:     "#1c1917"   # cards on the dark band
  on-dark:          "#ffffff"
  on-dark-muted:    "#a8a29e"
  # — Semantic states (functional only — never decoration, never brand) —
  success:          "#16a34a"
  warning:          "#b45309"
  error:            "#dc2626"

typography:
  # — Display: Newsreader (serif), weight 400, italic available for emphasis only —
  display-mega:    { fontFamily: "Newsreader", fontSize: "clamp(48px, 6.2vw, 80px)", weight: 400, lineHeight: 1.05, letterSpacing: "-0.01em", note: "homepage hero h1" }
  display-xl:      { fontFamily: "Newsreader", fontSize: "clamp(38px, 4.6vw, 56px)", weight: 400, lineHeight: 1.08, letterSpacing: "-0.01em", note: "subsidiary heroes" }
  display-lg:      { fontFamily: "Newsreader", fontSize: "clamp(30px, 3.4vw, 40px)", weight: 400, lineHeight: 1.12, note: "section heads" }
  display-md:      { fontFamily: "Newsreader", fontSize: "clamp(24px, 2.6vw, 30px)", weight: 400, lineHeight: 1.2, note: "subsection heads" }
  display-sm:      { fontFamily: "Newsreader", fontSize: "22px", weight: 400, lineHeight: 1.25, note: "card titles — the Newsreader floor, never smaller for display" }
  # — UI: Inter, +0.01em tracking on running text (the editorial dialect) —
  title:           { fontFamily: "Inter", fontSize: "20px", weight: 500, lineHeight: 1.35 }
  title-sm:        { fontFamily: "Inter", fontSize: "18px", weight: 500, lineHeight: 1.44 }
  lede:            { fontFamily: "Inter", fontSize: "18px", weight: 400, lineHeight: 1.6, letterSpacing: "0.01em", color: "{colors.muted}" }
  body:            { fontFamily: "Inter", fontSize: "16px", weight: 400, lineHeight: 1.6, letterSpacing: "0.01em" }
  body-strong:     { fontFamily: "Inter", fontSize: "16px", weight: 500, lineHeight: 1.6 }
  button:          { fontFamily: "Inter", fontSize: "15px", weight: 500, lineHeight: 1 }
  caption:         { fontFamily: "Inter", fontSize: "14px", weight: 400, lineHeight: 1.5, color: "{colors.muted}" }
  eyebrow:         { fontFamily: "Inter", fontSize: "12px", weight: 600, lineHeight: 1.4, transform: "uppercase", letterSpacing: "0.08em", note: "OPTIONAL — max 1 per 3 sections, never mandatory" }
  # — Machine values: JetBrains Mono (semantic: 'a system minted this') —
  mono:            { fontFamily: "JetBrains Mono", fontSize: "13px", weight: 500, note: "HS codes, EU regulation IDs, DIDs, hashes" }
  code-chip:       { fontFamily: "JetBrains Mono", fontSize: "11px", weight: 700, lineHeight: 1, note: "codes/IDs inside pills" }
  # — Long-form reading: Source Serif 4 —
  prose:           { fontFamily: "Source Serif 4", fontSize: "18px", weight: 400, lineHeight: 1.7, note: "articles, memos, DDS narrative; italic available" }

rounded:
  xs:   "4px"     # micro inputs
  sm:   "6px"     # small chips
  md:   "8px"     # inputs, small controls
  lg:   "12px"    # default card / panel
  xl:   "16px"    # feature cards, pricing tiers
  2xl:  "24px"    # atmosphere cards, large feature frames
  pill: "9999px"  # every CTA, badge, status chip, avatar

spacing:    # 4px base
  xxs:     "4px"
  xs:      "8px"
  sm:      "12px"
  base:    "16px"
  md:      "20px"
  lg:      "24px"
  xl:      "32px"
  xxl:     "48px"
  section: "96px"   # vertical padding of a marketing section

components:
  button-primary:   { background: "{colors.brand}", color: "{colors.on-brand}", typography: "{typography.button}", padding: "11px 22px", minHeight: "44px", rounded: "{rounded.pill}", hover: "{colors.brand-strong}", active: "translateY(1px)", note: "the only solid cobalt fill; one per viewport" }
  button-outline:   { background: "transparent", color: "{colors.ink}", border: "1px solid {colors.hairline-strong}", typography: "{typography.button}", padding: "10px 21px", minHeight: "44px", rounded: "{rounded.pill}", hover: "border + text {colors.brand}" }
  button-text:      { background: "transparent", color: "{colors.brand}", typography: "{typography.button}", note: "tertiary link-button" }
  top-nav:          { background: "{colors.canvas}", height: "64px", typography: "Inter 500 15px", note: "single line at lg (1024px), height ≤ 80px" }
  card:             { background: "{colors.surface-card}", border: "1px solid {colors.hairline}", rounded: "{rounded.xl}", padding: "{spacing.lg}", note: "white card on the off-white floor IS the elevation" }
  atmosphere-card:  { background: "{colors.canvas-soft}", rounded: "{rounded.2xl}", padding: "{spacing.xl}", note: "holds the single cobalt bloom ({colors.atmosphere}); decoration only" }
  input:            { background: "{colors.surface-card}", color: "{colors.ink}", border: "1px solid {colors.hairline-strong}", rounded: "{rounded.md}", padding: "12px 16px", minHeight: "44px", focus: "1px {colors.brand} ring", note: "label ABOVE input; never placeholder-as-label" }
  badge:            { background: "{colors.surface-strong}", color: "{colors.ink}", typography: "{typography.eyebrow}", rounded: "{rounded.pill}", padding: "4px 10px" }
  badge-brand:      { background: "{colors.brand-soft}", color: "{colors.brand}", note: "active / selected badge" }
  chip-status:      { rounded: "{rounded.pill}", minHeight: "24px", padding: "0 10px", typography: "{typography.code-chip}", note: "semantic states only (success/warning/error + neutral slate); never a brand color, never white text" }
  cta-band:         { background: "{colors.canvas-dark}", color: "{colors.on-dark}", typography: "{typography.display-lg}", padding: "{spacing.section}", note: "the one dark bookend; the CTA inside is the cobalt pill" }
  footer:           { background: "{colors.canvas}", color: "{colors.body}", borderTop: "1px solid {colors.hairline}", padding: "64px 48px" }
---

# Bindu design system

> **The one rule that resolves most arguments:** Bindu is a register of
> signed facts wearing an editorial suit. When the choice is between
> "expressive" and "legible," choose legible. When it is between a fill
> and a hairline, choose the hairline. When it is between decoration and
> a real artifact (a real table, a real regulation code, a real document
> frame), show the artifact.

## Overview

Bindu turns shipment documents into compliance filings (EUDR, CBAM,
product passports). Two audiences must trust the same pixels for
opposite reasons: a compliance officer needs the product to feel
**dense, exact, and inspectable**; a first-time visitor needs the same
brand to feel **calm, editorial, and confident** — closer to a serious
journal than to a SaaS template.

The foundation is a premium-neutral stage adapted from ElevenLabs'
system: an **off-white floor** (`{colors.canvas}`) holding **pure-white
cards**, **warm near-black ink** (`{colors.ink}`), and **warm stone
hairlines**. The contrast of a white card on an off-white floor is the
depth — not shadows, not gradients. Onto that foundation sits one
identity decision: **cobalt is the only chromatic color on the page.**
It carries every action, link, active state, and focus ring; it is the
single atmospheric bloom; it is never decoration. The system is
deliberately counter-positioned against the dark-gradient AI-SaaS
default: no mesh gradients, no neon glow, no glassmorphism, no stock
photography.

Three registers share one token table. **Pick one register per page;
never mix them.**

| Register | Where | Character |
|---|---|---|
| **Marketing stage** | `/`, knowledge base, tariffs, pricing | The brand canon. Newsreader display, white cards on off-white, cobalt actions, one cobalt bloom per section. This document's default subject. |
| **App console** | workspace, dossiers, boards | Dense, light, table-first. Inter-only chrome, mono IDs, hairline rows. Same tokens, tighter rhythm. |
| **Public verify page** | `/verify/:id` | The soberest of all — an EU energy label, not a brand page. When in doubt there, remove. |

**Key characteristics**

- **One chromatic color:** cobalt `{colors.brand}`. Everything chromatic
  that is not a semantic status is this cobalt. Budget: **at most one
  solid cobalt fill per viewport** (a primary CTA *or* an active segment,
  not both shouting).
- **Surface, not shadow.** A white card (`{colors.surface-card}`) on the
  off-white floor (`{colors.canvas}`) reads as elevated on its own. Soft
  shadows are reserved for genuinely floating elements.
- Every headline is **Newsreader weight 400** (italic for emphasis only,
  never bold). UI is **Inter**; machine-minted values are **JetBrains
  Mono**; long-form reading is **Source Serif 4**.
- **Pill geometry is the button signature.** Every CTA and badge is a
  pill (`{rounded.pill}`); cards are 16px, inputs 8px.
- **Atmosphere is one cobalt bloom**, low-alpha, behind content, on a
  fixed `pointer-events: none` layer. Never a pastel palette, never a
  button glow.
- The only dark surface is **one CTA bookend** near the page foot. The
  body of every page is off-white. A mid-page dark band reads as another
  product's template.

**Source of truth:** tokens live in
`frontend/apps/web/features/landing/landing.css` (marketing),
`frontend/apps/web/app/layout.tsx` (fonts: Inter, JetBrains Mono, Source
Serif 4, Newsreader), and `frontend/packages/ui/styles/tokens.css`
(console). **If this document disagrees with the CSS, the CSS wins and
this document gets corrected.** Reference tokens as `{colors.brand}` /
`{typography.display-mega}` in any derived spec — never paraphrase a
value into prose; a hex appears at most once, next to its token.

## Colors

> The stage is **off-white, single-accent**. Cobalt carries action,
> identity, and focus. Color always carries meaning — it is never
> texture.

### Brand & accent — cobalt is the whole palette

- **Cobalt** (`{colors.brand}` — oklch(0.42 0.22 264), the `#0033cc`
  family): primary buttons, links, active tabs, focus rings, selected
  states, the single atmospheric bloom. If a fold has three cobalt fills,
  two of them are wrong.
- **Cobalt Strong** (`{colors.brand-strong}`): hover / pressed of the
  primary action. Nothing else.
- **Cobalt Soft / Tint** (`{colors.brand-soft}`, `{colors.brand-tint}`):
  the selected-row wash and the one *colored* border (active controls).
  All other borders are neutral stone hairlines.
- There is **no second brand color.** No sunflower, no teal, no warm
  accent. Warmth lives in the neutral stone ink, not in a hue.

### Neutrals (the foundation, not "color")

| Token | Hex | Role |
|---|---|---|
| `{colors.canvas}` | #f5f5f5 | the off-white page floor |
| `{colors.canvas-soft}` | #fafafa | alternating sections, atmosphere cards |
| `{colors.surface-card}` | #ffffff | pure-white card — the unit of elevation |
| `{colors.surface-strong}` | #f0efed | badges, icon plates, idle pills |
| `{colors.hairline}` | #e7e5e4 | default 1px divider |
| `{colors.hairline-strong}` | #d6d3d1 | panel / input outline |
| `{colors.ink}` | #0c0a09 | display + primary text |
| `{colors.body}` | #4e4e4e | running body text |
| `{colors.muted}` | #777169 | captions, idle labels |

Never use pure `#000` or pure `#fff` for *text*; ink is warm near-black,
the card is the only pure white and it is a *surface*, not type.

### Dark bookend

One dark band only: the **CTA band** (`{colors.canvas-dark}`) near the
foot, with the cobalt pill inside it and the footer below. No other dark
surface anywhere on the page.

### Semantic states (functional, closed set)

`{colors.success}` / `{colors.warning}` / `{colors.error}` plus a neutral
slate. These mark real state (verified, pending, flagged) and appear only
as tinted pills with dark text of the same family. They are **not brand
color** and never decorate. Do not invent a sixth.

### Atmosphere

A single radial `{colors.atmosphere}` bloom per section, low alpha,
behind content, on a fixed `pointer-events: none` pseudo-element (never
on a scrolling container). It is the only "color moment" and it is
cobalt. No pastel orbs, no gradient text, no glow on interactive
elements.

## Typography

### Four faces, four jobs, no overlap

| Face | Job | Never |
|---|---|---|
| **Newsreader** (`--font-display`, italic available) | Every display headline, metric callouts, article drop caps | never weight ≠ 400, never below 22px, never UI labels |
| **Inter** (`--font-sans`) | All UI: ledes, body, buttons, labels, console chrome | never display headlines |
| **JetBrains Mono** (`--font-mono`) | Codes, regulation/ISO IDs, DIDs, hashes, console machine values | never paragraphs |
| **Source Serif 4** (`--font-serif`, italic) | Long-form reading: articles, memos, DDS narrative | never chrome |

Mono is a **semantic** signal — "a machine minted this value" — not a
styling choice. If a human wrote it, it is Inter or Source Serif; if a
system issued it (EU 2023/1115, an HS code, a DID), it is mono.

### Hierarchy

| Token | Size | Weight | Use |
|---|---|---|---|
| `{typography.display-mega}` | 48–80px | 400 | Hero h1 |
| `{typography.display-xl}` | 38–56px | 400 | Subsidiary heroes |
| `{typography.display-lg}` | 30–40px | 400 | Section h2 (`text-wrap: balance`) |
| `{typography.display-md}` | 24–30px | 400 | Subsection / panel h3 |
| `{typography.display-sm}` | 22px | 400 | Card titles — the Newsreader floor |
| `{typography.title}` | 20px | 500 | Inter component titles |
| `{typography.lede}` | 18px | 400 | Section lede, muted |
| `{typography.body}` | 16px | 400 | Marketing body, +0.01em tracking |
| `{typography.button}` | 15px | 500 | Buttons (sentence case, never uppercase) |
| `{typography.eyebrow}` | 12px | 600 | OPTIONAL uppercase label — see restraint rule |
| `{typography.prose}` | 18px | 400 | Articles (Source Serif 4) |

### Principles

- **Weight ceiling.** Display is Newsreader 400 — full stop. A heavier
  headline turns the editorial voice into a billboard; if something needs
  emphasis, make it bigger or set the accent word in *italic of the same
  face*, never bolder, never a different family.
- **Inter tracking.** Running Inter carries +0.01em (≈ +0.16px) — the
  editorial dialect ElevenLabs uses. Newsreader display runs untracked or
  slightly tight (−0.01em at hero sizes). Never negative-track to fix a
  layout.
- **Eyebrow restraint (replaces the old "kicker is mandatory" rule).**
  An eyebrow is **optional** and capped at **one per three sections**
  (the hero counts as one). The headline alone usually carries the
  section; its position on the page already categorizes it. Do not open
  every section with a label.
- **Two leading worlds.** Marketing reads like prose (1.6–1.7); the
  console reads like a log (1.5). Do not average the two.

## Layout

### Spacing

4px base. Section padding is `{spacing.section}` (96px); inside a card,
`{spacing.lg}` (24px) or `{spacing.xl}` (32px). After any divider, text
gets a real gutter — text touching a hairline is the most common way this
system goes "dirty."

### Grid & container

- Marketing container: **1320px** with 32px page gutters.
- Section heads: centered, max 760px. Article prose: 720px (`72ch` cap).
- Multi-column layouts use CSS Grid, never flexbox percentage math.
  Every multi-column block declares its `< 768px` single-column fallback.

### Hero discipline

The hero **fits the initial viewport**: headline ≤ 2 lines, lede ≤ 20
words and ≤ 4 lines, CTA visible without scroll, top padding ≤ `pt-24`.
Max four text elements (eyebrow? → headline → lede → one primary + one
secondary CTA). No trust micro-strip, no feature bullets, no version
label inside the hero — those move to dedicated sections below. Use
`min-h-[100dvh]`, never `h-screen`.

### Section rhythm

Return to the off-white floor between tinted islands. No layout family
(3-card grid, split text+image, full-width quote) repeats more than once
per page; no more than two consecutive image+text-split sections. A
"trusted by" logo wall lives *under* the hero, never inside it.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | off-white floor (`{colors.canvas}`) | the page |
| 1 | 1px stone hairline (`{colors.hairline}`) | default separation — rows, dividers |
| 2 | white card (`{colors.surface-card}`) on the floor | the unit of elevation; no shadow needed |
| 3 | soft ambient shadow `0 18px 44px rgba(12,10,9,0.06)` | genuinely floating elements only (popover, modal, lifted feature frame) |
| 4 | cobalt atmosphere bloom (`{colors.atmosphere}`) | one per section, behind content |

There are no mesh gradients, no glows on interactive elements, no
glassmorphism. If you reach for a shadow on a static card, you do not
need it — the white-on-off-white surface already separates it.

## Shapes

| Token | px | Use |
|---|---|---|
| `{rounded.xs}` | 4 | micro inputs |
| `{rounded.sm}` | 6 | small chips |
| `{rounded.md}` | 8 | inputs, small controls |
| `{rounded.lg}` | 12 | default card / panel |
| `{rounded.xl}` | 16 | feature cards, pricing tiers |
| `{rounded.2xl}` | 24 | atmosphere cards, large feature frames |
| `{rounded.pill}` | 9999 | **every CTA, badge, status chip, avatar** |

Pill geometry is the button signature — a 0px or 8px CTA breaks it.
Cards are 16, inputs are 8; don't mix radii on sibling elements.

**Iconography:** the marketing stage carries meaning with typographic
glyphs (✓, ✕, ● dots) and one icon family (Phosphor / Tabler at 1.5px
stroke, inheriting ink) where an icon is genuinely needed. Never
hand-roll SVG icon paths. Country flags / commodity emoji appear only
inside code chips and tab badges, never as freestanding icons.

## Components — the marketing vocabulary

- **`button-primary`** — the cobalt pill. The only solid cobalt fill,
  one per viewport. `{components.button-primary}`.
- **`button-outline`** — transparent, ink text, stone hairline border,
  pill; border + text go cobalt on hover. `{components.button-outline}`.
- **`card`** — white surface, stone hairline, 16px radius. The default
  container. `{components.card}`.
- **`atmosphere-card`** — `#fafafa`, 24px radius, holds the one cobalt
  bloom. Decoration only; no text sits on the densest part of the bloom.
- **`input`** — white, 8px radius, stone border, cobalt focus ring.
  Label always *above*; never placeholder-as-label; error text below.
- **`badge` / `badge-brand`** — pill; neutral by default, cobalt-soft
  when active/selected.
- **`chip-status`** — pill, semantic tones only, dark text on tint.
- **`cta-band`** — the one dark bookend; cobalt pill inside.
- **`top-nav`** — off-white, single line at `lg`, ≤ 80px tall.

Every product mockup shown on the marketing stage lives in a real
browser/window frame or is a real screenshot — never a `<div>`-built
fake UI.

## Do's and Don'ts

**Do**

- Keep cobalt as the **only** chromatic color; let neutrals and one
  bloom do everything else.
- Set every headline in **Newsreader 400**; use italic of the same face
  for emphasis.
- Use **pill** geometry for every CTA and badge.
- Build depth from **white-card-on-off-white**, not shadows.
- Put the label **above** inputs; provide loading, empty, and error
  states, not just the happy path.
- Use **real typographic quotes** (" ") and real images (or clearly
  labeled placeholders), never `<div>` fake screenshots.

**Don't**

- **No em-dash (`—`) anywhere visible** — headlines, body, eyebrows,
  pills, buttons, captions, quotes, alt text. Use a period, comma,
  colon, or parentheses. This is the system's single most-violated AI
  tell; the count is zero.
- **No second accent color, no pastel orbs, no gradient text, no neon /
  cobalt glow** on interactive elements. Atmosphere is one low-alpha
  cobalt bloom on a fixed layer.
- **No eyebrow on every section** — cap at one per three sections.
- **No bold or 500+ display** — Newsreader stays 400.
- **No mid-page dark band** — the only dark surface is the one CTA
  bookend.
- **No pure black text / no pure white text on a tint**; no sharp 0px
  CTA; no `h-screen` hero; no `window.addEventListener('scroll')`.
- **No mesh gradients, no glassmorphism, no stock photography, no
  hand-rolled SVG icons, no fake `<div>` product UI.**
- **No generic-AI copy** — "Elevate", "Seamless", "Unleash",
  "Next-Gen", fake-perfect numbers, "Trusted by" poetic variants.
