---
name: blog-post
description: The rules for adding a new blog post to the Bindu marketing blog so every post keeps the same SEO, structure, and design. Invoke BEFORE creating, writing, or editing ANY blog article — a new .md in content/blog, its frontmatter, its flow-diagram thumbnail, its metadata, or its structured data — and whenever the user says "new blog", "add a blog post", "write an article", "blog SEO", "publish a post", or asks how the blog is set up. It exists so ~3 posts/day all ship with identical SEO tags, on-brand cobalt design, a flow-diagram thumbnail, and valid author E-E-A-T, instead of each post drifting. NOT for the app/console (see shelley-ui) or non-blog landing pages.
---

# Adding a blog post — the SEO + structure constitution

The blog is a **trade compliance** publication (EUDR, CBAM, Digital Product
Passport, HS/HSN classification), ~3 posts/day. Every post MUST ship with the
same SEO tags, the same on-brand design, a flow-diagram thumbnail, and a valid
author. This skill is the enforceable checklist. Design law lives in
[docs/DESIGN.md](../../../docs/DESIGN.md); copy law is [[copy-rules-no-ai-smell]].

## 0. The two rules that resolve most questions

1. **One accent: cobalt `var(--brand)` (#0033cc).** Never green/emerald, never a
   second color. This is the marketing register (docs/DESIGN.md), same as the
   rest of the landing. See [[landing-cobalt-not-green]].
2. **No AI smell, ever.** No em dash (`—`) anywhere visible. No "AI", "Elevate",
   "Seamless", "Unleash", "Next-Gen", fake-perfect numbers. Plain words, real
   legal questions. See [[copy-rules-no-ai-smell]].

## 1. Where everything lives

| Thing | Path |
|---|---|
| Post body (Markdown) | `content/blog/<slug>.md` |
| Post model / frontmatter reader | `features/landing/blog/posts.ts` |
| Index (search/filter/sort/cards) | `features/landing/blog/blog-index.tsx` |
| Article page + byline + hero | `app/(en)/(landing)/blog/[slug]/page.tsx` |
| Article body CSS | `features/landing/blog/blog.css` |
| Per-article JSON-LD | `features/landing/blog/blog-schema.tsx` |
| Author registry (E-E-A-T) | `features/landing/seo/team.ts` |
| Diagram thumbnail SVG | `public/images/blog/<slug>.svg` |
| Diagram generator + specs | `scripts/gen-blog-diagrams.mjs`, `scripts/blog-diagrams.data.mjs` |

The route is `/blog/<slug>`; the filename slug IS the URL. Slugs are
**kebab-case and keyword-led** (`eudr-coffee-importers`, not `post-1`).

## 2. Required frontmatter — every field, every time

```yaml
---
title: "What is an EUDR Due Diligence Statement (DDS)?"   # see §3
description: "An EUDR DDS is the statement an operator files in TRACES..."  # §3
category: "Fundamentals"        # Guide | Fundamentals | Reference (add new if needed)
author: "raahul-dutta"          # a slug in team.ts — never free text. §5
regulations: ["eudr"]           # which pillar pages show this post in RegBlogBand,
                                # and which chip links back. All 27 posts carry it.
image: "/images/blog/<slug>.svg"        # the flow diagram. §4
imageAlt: "A full sentence describing the diagram's flow."  # SEO + a11y. §4
date: "2026-08-11"              # real publish date, YYYY-MM-DD. Drives newest-first sort.
order: 1                        # tiebreak for same-day posts (lower = higher)
updated: "2026-10-12"           # OPTIONAL. Only when facts/recommendations materially change. §3
photo: "https://images.unsplash.com/photo-...?w=1200&q=80"   # hero photo. §4b
photoAlt: "A full sentence describing the photo."
photoCredit: "Photographer Name"
photoCreditUrl: "https://unsplash.com/@handle?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-...?w=1200&q=80"  # second photo, before the FAQ. §4b
photo2Alt: "A full sentence describing the second photo."
photo2Credit: "Photographer Name"
photo2CreditUrl: "https://unsplash.com/@handle?utm_source=bindu&utm_medium=referral"
---
```

Missing `image`/`imageAlt` → the card falls back to a plain category tile (worse
for SEO). Missing `author` → defaults to `raahul-dutta`. Do not skip fields.

## 3. The SEO tags — what "maintain the same SEO" means

- **Title (`title`)**: keyword-led, unique, ~50–60 chars. A real question
  ("What is an EUDR DDS?") or a clear noun phrase ("EUDR for Coffee Exporters").
  It becomes `<title>` (as `<title> | Bindu`), the OG title, and the H1.
- **Description (`description`)**: 140–160 chars, includes the primary keyword,
  plain language, no em dash. It becomes the meta description AND the card
  excerpt AND the OG/JSON-LD description. One sentence, front-load the keyword.
- **date**: the REAL publish date. Sort is newest-first, so a wrong date puts
  the post in the wrong place. Use absolute dates only.
- **updated** (optional): set ONLY when a refresh materially changes facts,
  dates, or recommendations (a retitle or a trimmed paragraph is not a
  refresh). It renders "Updated D Month YYYY" in the byline and becomes
  `BlogPosting.dateModified`, `article:modified_time` and the sitemap
  `lastModified`. Never backdate it; never bump it to look fresh.
- **category**: keeps the filter chips meaningful. Reuse an existing one when it
  fits; a new value automatically becomes a new chip.
- **Internal links**: link to 2+ related posts in the body (`[EUDR DDS](/blog/
  what-is-an-eudr-dds)`). This is a ranking signal and is expected on every post.
- **FAQ (optional but encouraged)**: a `## FAQ` section with each question as a
  whole-line bold `**Question?**` followed by its answer paragraph. `parseFaq`
  in posts.ts turns it into **FAQPage** rich-result JSON-LD automatically — so
  follow that exact shape.

Metadata, canonical, OG tags, and all structured data are generated from the
frontmatter by the article page + `blog-schema.tsx`. You do NOT hand-write
`<meta>` or JSON-LD per post — you get it right by getting the frontmatter right.

### What ships automatically (verify, don't rebuild)
- `<title>`, meta description, canonical `/blog/<slug>`, OG + Twitter tags.
  The share card is the **PNG raster of the diagram** at
  `/images/blog/og/<slug>.png` (1200x630, written by the generator; social
  scrapers do not render SVG), never the generic site card.
- **BlogPosting** JSON-LD (headline, description, `image` = [OG PNG, photo,
  photo2, diagram SVG] in that order, datePublished, dateModified = `updated`
  or `date`, inline **author Person**, publisher, isPartOf)
- **BreadcrumbList** and, when present, **FAQPage**
- The index carries a **Blog** listing schema over all posts
- Author is a **Person** (name, jobTitle, knowsAbout, email) with a profile
  `url`/`@id` resolving to the author page at `/blog/authors/<slug>`. Every
  article also renders an **"About the author"** block (§5) that feeds E-E-A-T
  `trust`.

## 4. The flow diagram — one per post

Every post gets an on-brand SVG flow diagram. It renders in the MIDDLE of the
article body (`injectDiagram` in `posts.ts` places it before the H2 nearest
the midpoint of the page, never the FAQ heading), feeds `BlogPosting.image`,
and its PNG raster is the share card. The card thumbnail and the article hero
are the editorial photo (§4b); a post without a photo falls back to the
diagram in both slots and gets no mid-body copy.

To make one:
1. Add an entry to `scripts/blog-diagrams.data.mjs` with `slug` (= the post
   filename), `eyebrow` ("EUDR · GUIDE"), `heading` (short editorial line),
   `alt` (a full descriptive sentence — mirror it into `imageAlt`), and
   `nodes` (3–4 steps, each `["line one","line two"]`, last node = the outcome).
2. Run: `node scripts/gen-blog-diagrams.mjs` (writes the SVG AND the
   1200x630 OG PNG under `public/images/blog/og/`; commit both).
3. Point the post's `image:` at `/images/blog/<slug>.svg`.

### 4b. Two editorial photos per post (Unsplash, decided 2026-09-25)

Every post ALSO carries two photos. The first is the thumbnail on the blog index
cards and the article hero under the byline, with a "Photo by <name> on
Unsplash" caption (second decision the same day: the photo took the hero and
card slots, the diagram moved mid-body, §4). The diagram stays the share
image, since social scrapers need the PNG raster.
Rules:
- Source ONLY through the **Unsplash MCP connector** (`SearchPhotos`,
  landscape). Hotlink the `urls.regular` (append `?w=1200&q=80`) as `photo:`;
  never download into the repo. Credit = the photographer's name and their
  Unsplash profile URL with `?utm_source=bindu&utm_medium=referral`. This is
  the Unsplash API attribution requirement, not optional.
- Pick documentary, real-world subjects that match the post (a coffee
  drying yard, a rubber tapper, a container terminal, a battery cell line).
  No stock-smell: no handshakes, no laptops-with-charts, no people pointing
  at screens, no AI-looking renders. Muted, natural light suits the cobalt
  and stone palette; avoid images dominated by a strong second colour.
- `photoAlt` is a full descriptive sentence about what is in the photo (not
  the post title). Exactly two photos per post, the hero and `photo2` below,
  and they must not show the same subject.

Every post ALSO carries a second photo (`photo2`, `photo2Alt`, `photo2Credit`,
`photo2CreditUrl`), rendered inside the body right before `## FAQ` by
`injectPhoto` in `posts.ts` (before the last H2 when a post has no FAQ), with
the same "Photo by <name> on Unsplash" caption. Same sourcing rules as the
hero: connector only, landscape, documentary, hotlinked, credited. It must
show a different subject from the hero photo, so the two never read as a pair
of near-duplicates: if the hero is the plantation, the second is the port or
the paperwork, not another plantation.

Never hand-edit the SVG geometry or colors — the generator fixes the house style
(cobalt numbered-step pipeline on off-white) so all diagrams match.

## 5. Author + E-E-A-T

`author:` is a **slug from `team.ts`**, never free text. The slug resolves four
things together, so they never drift: the visible byline, the per-article
**"About the author"** block, the **author page** at `/blog/authors/<slug>`,
and the author **Person JSON-LD** (with a profile `url`/`@id` pointing at that
page). Default and site owner: **`raahul-dutta`** (Raahul Dutta,
raahul@getbindu.com). To add a new author, add a `TeamMember` entry to `team.ts`
(slug, name, jobTitle, bio, initials, email?, knowsAbout) first, then reference
its slug; the byline, about block, author page (`generateStaticParams` over
`TEAM`), and JSON-LD all pick it up. See [[blog-author-and-theme]].

The **"About the author" block** (rendered by `blog/[slug]/page.tsx`, styled
`.lp-blog-author` in `blog.css`) is what earns the analyzer's E-E-A-T `trust`
points (§8): it carries the "About the author" heading, the author bio, a
`Contact:` mailto, and an "Editorial standards" line. It is template-level, so
it lifts every post at once. This deliberately reverses the earlier "no /about
page, no profile URL" stance (decided 2026-08-29); do not remove it without a
new decision.

## 6. Design + copy (marketing register)

- **Product mention = one bold-lead paragraph, no H2.** The product section is
  `**Where Bindu fits.**` followed by two or three sentences and ONE link,
  placed before `## FAQ`. Never a `## How Bindu ...` heading (decided
  2026-09-25 from the blog audit: a fixed promotional H2 in every post is the
  least citable section on the page and trips the self-promotion check).

- Cobalt is the only accent; neutrals (`--stage-*` tokens) + one diagram do the
  rest. White cards on the off-white floor; stone hairlines; no shadows on
  static cards. Headlines are Newsreader (serif, weight 400).
- Body copy: plain words, real questions a filer would type, zero AI smell, no
  em dash. Polish these out of any draft you're handed too.
- If you catch yourself writing `emerald-*` or an em dash, stop — that is the
  exact drift this skill exists to prevent.

## 7. Pre-publish checklist

- [ ] `content/blog/<slug>.md` created, slug is kebab-case + keyword-led
- [ ] All 17 frontmatter fields present and valid (§2), plus `updated` when
      the facts changed
- [ ] Title ~50–60 chars, keyword-led; description 140–160 chars, no em dash
- [ ] `date` is the real publish date; `order` set for same-day tiebreak
- [ ] Diagram spec added to `blog-diagrams.data.mjs`, generator run, SVG exists
- [ ] `image` + `imageAlt` set; `imageAlt` matches the diagram's `alt`;
      `public/images/blog/og/<slug>.png` exists
- [ ] `photo` + `photoAlt` + `photoCredit` + `photoCreditUrl` set from the
      Unsplash connector (§4b); caption renders under the photo. Same for
      `photo2*`: a different subject, rendered before `## FAQ` with its caption
- [ ] `author` is a valid `team.ts` slug
- [ ] 2+ internal links to related posts in the body; `## FAQ` if applicable
- [ ] Written to the §9 recipe: ≥3 answer-first `**Term** is …` defs, ≥1 real
      table, an "At a glance" summary, ~1,500 words, no sentence over 40 words
- [ ] `pnpm typecheck` and `pnpm build` pass
- [ ] Verify in the browser: card renders with the photo, article byline +
      hero photo with its credit line, diagram mid-body, the "About the
      author" block renders, JSON-LD has BlogPosting + author Person + (FAQ
      if present)
- [ ] Drafted via `blog-write` / edited via `blog-rewrite` (claude-blog), then
      normalised to §2 frontmatter (§8 step 2)
- [ ] `claude-blog` gates pass: 0 dashes, `quality_gate.py` passes, and
      `analyze` on the RENDERED page scores 90+ (§8/§9). Do not analyze the raw
      `.md` — it under-scores by ~8.

## 8. Blog QA + methodology: the `claude-blog` repo (the rule)

**Rule (2026-09-25): every Bindu blog post is DRAFTED and SCORED through the
`claude-blog` skill suite, under this constitution.** It is installed as live
skills (`blog`, `blog-write`, `blog-rewrite`, `blog-analyze`, `blog-seo-check`,
`blog-factcheck`, `blog-flow`, …) in `~/.claude/skills/` via its `install.sh`
(v2.2.0, commit `2500d4c`; helper scripts in `~/.claude/scripts/`), and the
source checkout lives at `../claude-blog` (sibling of this repo; MIT, from
`AgriciDaniel/claude-blog`). A PreToolUse hook (`.claude/hooks/blog-gate.sh`,
wired in `.claude/settings.json`) re-injects this rule whenever a tool call
touches `content/blog/*.md`.

The order, every post:

1. **This skill first.** Its rules (§0–§7, §9) win on every conflict with
   claude-blog's defaults: our 17 frontmatter fields (not `tags`/`canonical`),
   ~1,500 words (not 2,000–2,500), `**At a glance:**` (not a "Key Takeaways"
   box), the SVG flow diagram mid-body and as share image plus two Unsplash
   photos, the hero and `photo2` before the FAQ (§4b; never Pixabay/Pexels/
   Gemini renders, no charts, no video embeds), one cobalt accent, zero
   dashes, author slug from `team.ts`.
2. **Draft with `blog-write`** (new post) or **`blog-rewrite`** (edit). Let it
   do the research packet, answer-first structure, sourced statistics, FAQ
   shape, and internal-link zones; then normalise the output to §2 frontmatter.
   `blog-factcheck` on any post carrying figures. `/blog brand init` output
   (`BRAND.md`/`VOICE.md` at the repo root) is optional; the blog-post skill
   plus [[copy-rules-no-ai-smell]] is the voice contract until one exists.
3. **Gates below**, then the §7 checklist.

Run its scripts in an ephemeral `uv` env so nothing installs globally
(`pip3 install` is blocked on this machine by `externally-managed-environment`;
that is expected, ignore the installer's warning):

```bash
S=$HOME/.claude/scripts          # trusted install path (or ../claude-blog/scripts)
uv run --no-project --with textstat --with beautifulsoup4 \
  python3 "$S/analyze_blog.py" <file-or-dir> --format table
uv run --no-project --with textstat --with beautifulsoup4 \
  python3 "$S/quality_gate.py" content/blog/<slug>.md
```

**Gate 1 — prose hygiene (mechanises the §0.2 no-AI-smell rule).** Zero em dash,
en dash, or ` -- `. claude-blog's `lint_prose.py` only walks ITS OWN repo
layout (`--root` with `skills/ agents/ docs/`), so it does not see our content
dir; the canonical gate for Bindu posts is this grep:

```bash
grep -rlE $'—|–| -- ' content/blog/*.md  # prints nothing = pass
```

**Gate 2 — quality score on the RENDERED HTML, never the `.md`.** Raw markdown
under-scores a live post by ~8 points, because the JSON-LD schema, OG tags, and
hero image are injected at render (measured: source 77 becomes live HTML 85).
So score the deployed or preview page:

```bash
curl -fsSL https://getbindu.com/blog/<slug> -o /tmp/<slug>.html
uv run --no-project --with textstat --with beautifulsoup4 \
  python3 "$CB/scripts/analyze_blog.py" /tmp/<slug>.html --format table
```

Target **90+ (Exceptional) on rendered HTML** — a new post is written to hit
this on the first draft (§9), not upgraded after. A `.md` `--batch --sort score`
run is source-floor triage only; its flat `SEO 23/25` and `Tech ~6/15` are
template and render constants, not per-post signal. Two scorer complaints are
ALWAYS source artifacts here, ignore them: "No JSON-LD schema" and empty FAQ
(every post ships FAQPage + BlogPosting JSON-LD, and every post has a `## FAQ`).

The real levers the scorer surfaces (all in §9): **content depth**, **one
table or worked example**, answer-first `**Term** is …` leads, an "At a glance"
summary, sentences under 40 words, and the template-level "About the author"
block (§5) that earns E-E-A-T `trust` on every post.

**Gate 3 — improve with FLOW (optional).** Prompts under
`claude-blog/skills/blog-flow/references/prompts/`: `optimize` for existing posts,
`win` for conversion, `find` for the next cluster. They collapse to one
optimize framework (intent, evidence, gaps, prioritised changes, measurement,
claims-to-verify). Prompts are © Daniel Agrici, CC BY 4.0
(github.com/AgriciDaniel/flow); keep that attribution line when you use them.

## 9. Writing a new post to 90 (the recipe)

A new post should hit **90+ on the rendered analyzer (§8) on its first draft**,
not be upgraded after. These are the levers that get it there, and each one also
makes the post genuinely better for a real reader. Code-grounded from
`claude-blog/scripts/analyze_blog.py` (2026-08-29).

Bake in as you write:
- **Answer-first definitions.** Open the post, and each key section, with a
  `**Term** is …` / `**Terms** are …` sentence (bold term immediately followed
  by is/are/refers to/means). Need **≥3** across the post.
- **One real table.** Every post gets at least one markdown table a reader would
  use: a field/requirement table, a worked example (inputs → outcome), or a
  comparison. This is the single highest-value structural add (it moves
  originality, structure, extraction, and engagement at once).
- **An "At a glance" summary.** Just under the intro: a bold `**At a glance:**`
  (or `**In brief:**`) label + 3–5 bullets of the key facts.
- **Depth ~1,400–1,600 words.** Thin ~800-word posts cap out. Add real
  substance: exceptions, a concrete worked example, edge cases. Never pad.
- **Short sentences.** No sentence over 40 words (hard rule). Prefer plain,
  short words and shorter sentences throughout — the readability lever, the
  hardest one for legal prose and usually the gap between ~87 and 90.
- **Primary-source citations.** ≥2 inline links to EUR-Lex / the Commission.
  Source every `%` figure in the same sentence, or write it out in words.
  Both the fact and the link come from the internal corpus (§10), not from
  memory.

Automatic — do NOT hand-write per post:
- The **"About the author" block** and author page (§5) are template-level and
  earn the E-E-A-T `trust` points on every post.

Do NOT chase points by:
- Inventing any fact, figure, date, or citation to fill a table. **Accuracy
  outranks the score.** If a worked example needs round numbers, label them
  explicitly as illustrative ("round and illustrative, not the real figures").
- Adding a body `# H1` (the page renders the H1 from frontmatter; a second one
  hurts) or a body image that duplicates the diagram or the hero photo (both
  render from frontmatter).

Verify against the **rendered** page (§8), never the `.md`. Target 90; Strong
(80–89) may ship when depth is real and only readability falls short.

## 10. Ground every fact in the internal corpus (rule 2026-09-26)

The EUDR ground truth is a local corpus of **161 source documents converted to
Markdown**:

```
~/Documents/eudr/markdown_en/<document-name>/<document-name>.md
~/Documents/eudr/markdown_en/<document-name>/<document-name>_meta.json
~/Documents/eudr/<document-name>.pdf          # the original, one level up
```

`_meta.json` is the converter's output (table of contents, page stats) — it
carries **no source URL**. The corpus is local, outside the repo, not committed.

What is in there: Regulation (EU) 2023/1115 itself, the Commission's guidance
(`EC_EUDR-Guidance_EN_13112024`) and FAQ, per-country preparedness checks
(Ghana, Côte d'Ivoire, Cameroon, Liberia, Rwanda), commodity factsheets
(cocoa, coffee, palm, rubber, timber), legality due-diligence tools, and
traceability studies.

**The rule, for every post:**
1. **Corpus before web search.** `ls ~/Documents/eudr/markdown_en/` to see what
   exists, then `grep -ril "<term>" ~/Documents/eudr/markdown_en/` and read the
   matching `.md`. Every EUDR fact, date, figure, and article number in a draft
   must trace to a passage you actually read there.
2. **Quote the law from the law.** Article numbers, Annex I scope, DDS fields,
   and the application dates come from the regulation and guidance files in the
   corpus, never from memory and never from an SEO brief (briefs keep supplying
   pre-postponement dates — see [[eudr-application-dates]]).
3. **It is a grounding source, not a citation target.** The published post links
   the **public** URL of that document (EUR-Lex, the Commission). Never a local
   file path, never "internal corpus" as a named source.
4. **No corpus passage, no claim.** If the corpus does not support a figure and
   no public primary source does either, cut the claim — §9's accuracy rule
   outranks the score.

Non-EUDR pillars (CBAM, DPP, HS classification) have no corpus yet: those posts
still run on primary sources found on the web.
