# Round 60 findings

Priorities: P0 blocks, P1 major, P2 minor, P3 polish. "Conflict" = a skill finding that clashes with DESIGN.md v4 or one of Austin's keeps (not fixed). Method for every pass: single context (no isolated sub-agents were spawned: this run is itself a sub-agent), code read plus screenshots of the running page at 1440x900 light (scroll positions per section) and the reduced-motion full page at 1440 and 375, light and dark.

## Pass 1: critique-impeccable

Method: degraded single-context critique (the impeccable detect engine is not installed here; avoid-ai-design's detect.mjs is run in pass 6). Design specificity: the page is authored for Bindu (a dot map under every section, the ship, the departures board, the cobalt/yellow pair, real shipment vocabulary). Not interchangeable with another product. Heuristic scores (landing surface, 7 and 10 n/a): visibility of status 3, match to real world 4, user control 3 (pause, replay, tabs, keys), consistency 3, error prevention 3, recognition 3, aesthetics 3, error recovery 3: 25/32, Good (78%).

| # | Sev | Finding | Where | Status |
|---|---|---|---|---|
| 1 | P2 | "What buyers say." title is left-aligned while every other section title is centred | styles/r44.css:174 (.vc-head), Voices.tsx:186 | fixed (centred) |
| 2 | P2 | Rules tiles: the ghost regulation number (12%) runs under the name and the body copy ("1781", "2006", "40" behind body text), costs legibility | styles/r44.css:227 (.rl-ghost) | fixed (8%); concept kept |
| 3 | P3 | Hero "Pause animation" reads as plain text (ghost button on the map), low affordance | styles/site.css:75 | left: hero control is part of the kept hero, change would be visual redesign |
| 4 | P3 | Map labels in the shipment map (Atlantic, English Channel, Antwerp) are 10 to 11px mono and collide with the caption veil at some zooms | lib/shipcanvas.ts, lib/shipmap.ts | left (r59-0: labels inside a drawing) |
| 5 | P3 | Full Circle act stage is mostly empty space at the first scene (The Fabric): the drawing sits in the right 60% | lib/theatre-stages.ts | left (drawing content, Austin's keep: structure and acts) |
| 6 | P3 | Story step 1 shows only a typing field in a large empty frame before the sentence is typed | components/Flow.tsx | left (motion start state; end state is composed) |
| 7 | info | Section titles are weight 500, hero 600 (open question, left at 500 per Austin) | tokens.css `--display-weight` | not touched |

Persona walk (first-time EU importer, customs broker): both reach "Book a demo" from the nav, the hero and the finale; the broker finds EUR-Lex sources on every rule tile. No blockers found.

Not verified: dark theme by eye in this pass, Safari, real GPU.

## Pass 2: bolder

Reading: the hero, statement and finale carry the conviction (120px title, 40px statement, full-bleed photo); the middle sections announce themselves with a 36px/500 title and then drop to pale grey lead lines that read as footnotes. Within the system the move is contrast, not effects.

| # | Sev | Finding | Where | Status |
|---|---|---|---|---|
| 1 | P2 | Section lead lines (story, Full Circle, shipment, rules) are body grey #737373 at 20px, lighter than the hero sub-line which r59-1 already moved to charcoal | styles/r44.css:20, theatre.css:20, shipment.css:170, r44.css:215 | fixed: charcoal on light, 85% white on dark (styles/r59.css) |
| 2 | P2 | "Full Circle." label is mute grey | styles/r44.css:140 | fixed: body colour |
| 3 | P2 | Rules tiles away from the focus dim to the mute grey, so most of the row reads washed out | styles/r44.css:229 | fixed: dim stops at the body colour; the focused tile stays ink |
| 4 | conflict | Raising section titles to weight 600 would add the most presence | tokens.css `--display-weight` | conflict, not fixed (Austin's open question, titles stay 500) |
| 5 | conflict | Pricing lead and card, FAQ, finale and footer read quieter than the rest | components/Pricing.tsx:46 | conflict, not fixed (keep) |
| 6 | P3 | Story and Full Circle frames start sparse (one field, one line) before the motion fills them | Flow.tsx, theatre-stages.ts | left (not an effect problem; composed end states are full) |

No new colour, font, radius, effect or element added.

## Pass 3: 12-principles-of-animation

Checked: every GSAP timeline and tween, every CSS transition and keyframe in features/landing/home (durations, easing, stagger, exits, press states, reduced motion). Reduced motion: lib/motion.ts `reduceMotion()` gates scenes, headings, hero, flow, theatre, rules, voices and the board; CSS transitions are zeroed by components.css:125.

| # | Sev | Finding | Where | Status |
|---|---|---|---|---|
| 1 | P1 | Two reveals ran on every `.sec-head h2`: the old r20 masked reveal (class `rv`, a CSS `clip-path: inset(0 0 100% 0)` hidden state with a 1200ms transition) and the r54 GSAP SplitText fade. A CSS hidden state on a GSAP target (hard rule) and a double reveal | lib/scenes.ts:14-27, styles/site.css:204-206 | fixed: the `rv` path and its CSS are deleted; lib/headings.ts is the one heading reveal |
| 2 | P3 | Heading reveals are 0.7s expo.out, over the 300ms ceiling (timing-under-300ms) and stagger 0.08s over 50ms | lib/headings.ts:31, Hero.tsx:94, Theatre.tsx:61 | not fixed: scroll-triggered reveals, not user-initiated feedback; Austin's r54 reveal |
| 3 | P3 | No `:active` press scale on buttons (physics-active-state) | styles/components.css, tokens.css:129 `--press-scale: 1` | conflict, not fixed: DESIGN.md v4 (Ollama is static, "no movement of any kind" on buttons) |
| 4 | P3 | Nav wordmark collapse animates `max-width` (a layout property) over 700ms | styles/site.css:202 | not fixed: nav is a keep; it is one 90px span, scroll-triggered |
| 5 | P3 | Theatre timelines stagger 0.15 to 0.4s between nodes (physics-no-excessive-stagger) | lib/theatre-fx.ts:85-171 | not fixed: narrative drawing timeline in the Full Circle acts (structure keep), not a UI list |
| 6 | P3 | Hero: the sheet-lift tween on `.hero-in` (-18%, opacity 0.25) and the title parallax both run over the same scroll | lib/scenes.ts:35, Hero.tsx:89 | not fixed: composed by hand in r59-1; both are transform/opacity scrubs |
| 7 | ok | Linear easing only on typing ticks, belt and day counter (time representation); exits and presence handled by React state, not AnimatePresence; hover/press 160 to 250ms; dialog 320ms | various | no change |

Not verified: the heading reveal by eye after removing the mask (checked by code and computed style only).

## Pass 4: apple-design

Checked: gestures (testimonials drag, rules loop drag, tabs), interruptibility, springs, typography optics, materials, reduced motion / transparency / contrast.

| # | Sev | Finding | Where | Status |
|---|---|---|---|---|
| 1 | P2 | Only `prefers-reduced-motion` was honoured; `prefers-reduced-transparency` (the 10px backdrop blur behind each section window) and `prefers-contrast: more` (hairlines and mute greys) were not | styles/story.css:199-206 | fixed: both media queries added (styles/r59.css): blur becomes the plain canvas fill; hairlines go to hairline-strong and mute greys to the body grey |
| 2 | P3 | Testimonials drag: 1:1 tracking, release velocity projects the landing card (good), but the settle is a Lenis scroll of 0.9s cubic, so release velocity is not handed to it | components/Voices.tsx:128-145 | not fixed: needs a spring-based rebuild of a keep; frame loop already approaches the target exponentially and can be grabbed again |
| 3 | P3 | Large display type has tracking 0 (36px titles, 40px statement); Apple tightens large text | tokens.css:93 `--track-*` | conflict, not fixed: DESIGN.md v4 (Ollama letter-spacing 0 everywhere; hero is the one tightened title, adaptation 8) |
| 4 | P3 | No press-down scale or instant pointer-down feedback on pills | components/ | conflict, not fixed: DESIGN.md v4 static buttons (colour change on :active exists) |
| 5 | P3 | Rules loop drag and the departures board were not re-tested by hand for interrupt and reverse | components/Rules.tsx | unverified |
| ok | | Fast hover/press colour transitions 200ms; dialog scales from its trigger (--ox/--oy origin, spatial consistency); no hard dividers under the nav | | |
