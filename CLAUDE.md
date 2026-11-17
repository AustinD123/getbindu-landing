# CLAUDE.md

This repo is the Bindu marketing blog, split out of `shelley`
(`frontend/apps/web`) so it can be worked on alone. Read `README.md` for the
layout and the merge-back rule: files keep their shelley paths, and only the
blog-owned paths travel back.

## Blog rules (same as shelley, set 2026-09-25)

Any work on a post (a new `.md`, its frontmatter, diagram, metadata or schema)
goes through two skill layers, in this order:

1. **`blog-post` skill** (`.claude/skills/blog-post/`): the house constitution.
   Frontmatter, cobalt design, SVG flow diagram, author E-E-A-T, no em dash,
   ~1,500 words, "At a glance". It wins on every conflict.
2. **`claude-blog` skill suite** ([AgriciDaniel/claude-blog](https://github.com/AgriciDaniel/claude-blog),
   installed as the `/blog` skills): `blog-write` drafts a new post,
   `blog-rewrite` edits one, `blog-analyze` scores it.

Gates before a post is done: `pnpm check:dashes` prints nothing, and the
RENDERED page scores 90+ on `analyze_blog.py`. The PreToolUse hook
`.claude/hooks/blog-gate.sh` repeats this whenever a call touches
`content/blog/*.md`.

## Grounding EUDR facts

If you have the local EUDR corpus (`~/Documents/eudr/markdown_en/`), grep it
before any web search and ground every EUDR fact, date and figure in it. It is
never the cited source: a post links the public document (EUR-Lex, the
Commission), never a local path.

## Don't

- Don't edit the shared landing snapshots (header, footer, `seo/`, styles) to
  change the live site; that happens in shelley.
- Don't add analytics, a sitemap entry for getbindu.com, or remove the
  `robots.ts` block: this copy must never be indexed.
- Don't hand-write diagram SVGs; edit `scripts/blog-diagrams.data.mjs` and run
  `pnpm diagrams`.
