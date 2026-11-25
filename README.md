# getbindu-landing

A standalone copy of the Bindu marketing site: everything a visitor sees
**before signing in** at getbindu.com. It was split out of the `shelley`
monorepo (`frontend/apps/web`) so people can work on the landing without the
product stack: no Go backend, no database, no workspace app.

The **live** site is still served by shelley. This repo is where landing work
happens until it is merged back. Nothing here deploys to getbindu.com.

## What's in it

| Pages | Routes |
|---|---|
| Home | `/` |
| Regulation pages | `/eudr`, `/cbam`, `/cbam/software`, `/dpp`, `/dpp/battery`, `/dpp/textiles`, `/dpp/others`, `/ppwr`, `/reach` |
| Localized EUDR | `/de/eudr`, `/es/eudr`, `/fr/eudr`, `/it/eudr`, `/nl/eudr`, `/pl/eudr` |
| Blog | `/blog`, `/blog/<slug>`, `/blog/authors/<slug>`, `/de/blog`, `/de/blog/<slug>` |
| Legal | `/privacy`, `/terms` |
| Machine-readable | `/sitemap.xml`, `/llms.txt`, `/robots.txt` |

Not in it: `/login` and the other sign-in screens, the workspace app,
`/regulation/<id>` (behind login), and the public EUDR product page
`/eudr/p/<code>` (it reads live data from the backend). Header links to
`/login` 404 here; that is expected.

## Run it

Needs Node 22 and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3010
```

Before you open a PR:

```bash
pnpm typecheck
pnpm test
pnpm build        # prerenders every page and post
pnpm check:dashes # no em or en dashes in any blog post
```

## Where things live

| What | Where |
|---|---|
| Page routes | `app/(en)/(landing)/`, `app/(de)/` … `app/(pl)/` |
| Page content and sections | `features/landing/` (one folder per area: `regulation/`, `story/`, `sections/`, `pricing/`, `blog/`, ...) |
| Header and footer | `features/landing/chrome/` |
| Landing CSS | `features/landing/*.css`, `features/landing/story/*.css` |
| Design tokens and type | `styles/`, `styles/ui/` |
| Images and hero videos | `public/images/`, `public/videos/` |
| Blog posts | `content/blog/<slug>.md`, `content/blog/de/<slug>.md` |
| Blog diagram thumbnails | specs in `scripts/blog-diagrams.data.mjs`, then `pnpm diagrams` |
| Authors | `features/landing/seo/team.ts` |
| Design rules | `docs/DESIGN.md` (marketing register) |

Blog posts have their own rules: `.claude/skills/blog-post/SKILL.md`. With
Claude Code, that skill and the `.claude/hooks/blog-gate.sh` reminder load
automatically in this repo.

Animation is GSAP (`gsap`, `@gsap/react`, ScrollTrigger). Never hand-write a
CSS hidden state for something GSAP animates.

## Layout: mirrors shelley on purpose

Every landing file sits at the **same path** it has in
`shelley/frontend/apps/web/`, so merging back is a copy, not a port.

**Landing-owned (copy these back to shelley):**

- `app/(en)/(landing)/`, `app/(de)/`, `app/(es)/`, `app/(fr)/`, `app/(it)/`, `app/(nl)/`, `app/(pl)/`
- `app/llms.txt/`, `app/sitemap.ts`, `app/landing-chrome.tsx`
- `features/landing/`
- `content/`, `public/images/`, `public/videos/`
- `scripts/blog-diagrams.data.mjs`, `scripts/gen-blog-diagrams.mjs`

**Shared with the app (change only with care, the app uses them too):**
`styles/`, `app/custom.css`, `app/document-shell.tsx`, `app/root-metadata.ts`,
`app/locale-root-layout.tsx`, `app/(en)/error.tsx`, `app/(en)/not-found.tsx`,
`app/global-error.tsx`, `lib/`, `image-loader.ts`.
`styles/ui/` is a copy of shelley's `packages/ui/styles/` (it lives there,
not under `apps/web`).

**Only for this repo (never copy back):** `shims/`, `app/root-shell.tsx`,
`app/providers.tsx`, `app/(en)/layout.tsx`, `app/robots.ts`, `app/globals.css`,
`next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `package.json`.

`shims/` stands in for the few monorepo packages that landing files import
(`@shelley/core/*`, `@shelley/ui/lib/utils`), mapped in `tsconfig.json`, so
those files stay byte-identical to shelley's. See `shims/README.md`.

`features/landing/pricing/pricing-drift.test.ts` is kept but skipped here: it
checks the landing price against shelley's backend, which only exists there.

This copy loads no consent banner and no analytics, and `robots.txt` blocks
all crawlers, so dev traffic stays out of the real numbers and a preview deploy
can never compete with getbindu.com as duplicate content.

## Merging back into shelley

From this repo, with shelley checked out next to it:

```bash
WEB=../shelley/frontend/apps/web
for p in "app/(en)/(landing)" "app/(de)" "app/(es)" "app/(fr)" "app/(it)" \
         "app/(nl)" "app/(pl)" app/llms.txt features/landing content \
         public/images public/videos; do
  rsync -a --delete "$p/" "$WEB/$p/"
done
cp app/sitemap.ts app/landing-chrome.tsx "$WEB/app/"
cp scripts/blog-diagrams.data.mjs scripts/gen-blog-diagrams.mjs "$WEB/scripts/"
```

Then in shelley run `pnpm typecheck`, `pnpm lint`, `pnpm test` and
`pnpm build`. Changes go live once they land in shelley's `main`.

Split from shelley at `a4a096e2` (2026-11-19, branch
`chore/company-address-contact-email`). Landing changes made in shelley after
that are not in this copy; bring them across before a merge-back so `--delete`
does not remove them.
