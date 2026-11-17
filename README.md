# getbindu-blog

A standalone copy of the Bindu trade-compliance blog (getbindu.com/blog and
/de/blog), split out of the `shelley` monorepo so people can work on the blog
without the whole product stack: no Go backend, no database, no workspace app.

The **live** blog is still served by shelley. This repo is where blog work
happens until it is merged back. Nothing here deploys to getbindu.com.

## Run it

Needs Node 22 and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3010/blog
```

Before you open a PR:

```bash
pnpm typecheck
pnpm build        # prerenders every post; a broken frontmatter fails here
pnpm check:dashes # no em or en dashes in any post
```

Header and footer links to the rest of the site (/eudr, /cbam, /login, ...)
404 locally. They are real pages on getbindu.com, not part of this repo.

## Add or edit a post

The full rules are in `.claude/skills/blog-post/SKILL.md`; read them first.
The short version:

| What | Where |
|---|---|
| English post | `content/blog/<slug>.md` (file name = URL slug) |
| German post | `content/blog/de/<slug>.md` |
| Flow-diagram thumbnail | add a spec to `scripts/blog-diagrams.data.mjs`, run `pnpm diagrams` (never hand-write the SVG) |
| Diagram output | `public/images/blog/<slug>.svg` |
| Authors | `features/landing/seo/team.ts` |
| Rendering, index, schema | `features/landing/blog/` |
| Routes | `app/(en)/(landing)/blog/`, `app/(de)/de/blog/` |
| Design rules | `docs/DESIGN.md` |

With Claude Code, the `blog-post` skill and the `.claude/hooks/blog-gate.sh`
reminder load automatically in this repo.

## Layout: mirrors shelley on purpose

Every blog file sits at the **same path** it has in
`shelley/frontend/apps/web/`, so merging back is a copy, not a port.

**Blog-owned (copy these back to shelley):**

- `content/blog/`
- `public/images/blog/`
- `features/landing/blog/`
- `scripts/blog-diagrams.data.mjs`, `scripts/gen-blog-diagrams.mjs`
- `app/(en)/(landing)/blog/`, `app/(de)/de/blog/`

**Snapshots of shelley's shared landing code (edit these in shelley, not
here):** the header and footer in `features/landing/chrome/`,
`features/landing/seo/`, `features/landing/*.css`, `features/landing/story/`,
`styles/`, `app/landing-chrome.tsx`, `app/document-shell.tsx`,
`app/root-metadata.ts`, `app/locale-root-layout.tsx`.

**Only for this repo (never copy back):** `shims/`, `app/root-shell.tsx`,
`app/(en)/layout.tsx`, `app/(en)/(landing)/page.tsx`, `app/robots.ts`,
`app/globals.css`, `next.config.ts`, `tsconfig.json`, `package.json`.

`shims/` stands in for the two monorepo packages the header and the document
shell import (`@shelley/core/auth`, `@shelley/ui/lib/utils`), mapped in
`tsconfig.json`, so those files stay byte-identical to shelley's.

This copy loads no analytics or consent scripts, and `robots.txt` blocks all
crawlers, so a preview deploy can never compete with the live pages.

## Merging back into shelley

From this repo, with shelley checked out next to it:

```bash
WEB=../shelley/frontend/apps/web
for p in content/blog public/images/blog features/landing/blog \
         "app/(en)/(landing)/blog" "app/(de)/de/blog"; do
  rsync -a --delete "$p/" "$WEB/$p/"
done
cp scripts/blog-diagrams.data.mjs scripts/gen-blog-diagrams.mjs "$WEB/scripts/"
```

Then in shelley run `pnpm typecheck` and `pnpm build`. The sitemap reads
`content/blog` at build time, so new posts need no extra wiring. Posts only go
live once they land in shelley's `main`.

Split from shelley at commit `3aec4250` (2026-11-17). Posts added to shelley
after that are not in this copy; pull them across before a merge-back so
`--delete` does not remove them.
