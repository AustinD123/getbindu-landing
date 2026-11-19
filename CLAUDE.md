# CLAUDE.md

This repo is the Bindu marketing site (every page before sign-in), split out
of `shelley` (`frontend/apps/web`) so it can be worked on alone. Read
`README.md` for the layout and the merge-back rule: files keep their shelley
paths, and only the landing-owned paths travel back.

## Rules

- Marketing pages follow `docs/DESIGN.md`'s marketing register (cobalt
  accent, `.landing-light` scope). The app's design system does not apply.
- GSAP owns landing animation. Never hand-write CSS hidden states for GSAP
  targets.
- Copy: no em dashes, no AI-smell words ("Seamless", "Elevate", "Unleash",
  "Next-Gen"), no invented numbers. Every regulation fact cites a public
  primary source (EUR-Lex, the Commission).
- Don't edit `shims/`, `app/root-shell.tsx`, `app/providers.tsx`,
  `app/robots.ts` or `next.config.ts` to change site behaviour: they exist only
  so this copy runs standalone. Never add analytics or unblock `robots.ts`:
  this copy must never be indexed.
- Keep landing-owned files identical in shape to shelley's. Don't rename or
  move them; merge-back is a path-for-path copy.

## Blog posts (same as shelley, set 2026-09-25)

Any work on a post goes through two skill layers, in this order:

1. **`blog-post` skill** (`.claude/skills/blog-post/`): the house constitution.
   It wins on every conflict.
2. **`claude-blog` skill suite** ([AgriciDaniel/claude-blog](https://github.com/AgriciDaniel/claude-blog)):
   `blog-write` drafts, `blog-rewrite` edits, `blog-analyze` scores.

Gates before a post is done: `pnpm check:dashes` prints nothing, and the
RENDERED page scores 90+ on `analyze_blog.py`. Diagram SVGs are generated
(`scripts/blog-diagrams.data.mjs` then `pnpm diagrams`), never hand-written.

If you have the local EUDR corpus (`~/Documents/eudr/markdown_en/`), grep it
before any web search and ground every EUDR fact in it. The published citation
is always the public document, never a local path.
