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
