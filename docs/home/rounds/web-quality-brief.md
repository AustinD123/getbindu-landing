Web-quality pass on the Bindu homepage (`/`). Brief for an Antigravity agent session.

Repo: c:\Users\HP\bindu\getbindu-landing (Next.js, pnpm). Start from branch `home-brain`
AFTER the round 41 run has committed (check docs/home/rounds/round-41-report.md exists),
then create and work on a new branch `web-quality`. Never push. Never commit to home-brain.

## Read first (only these)
- CLAUDE.md (hard rules: never add analytics, never unblock app/robots.ts, never edit
  shims/, app/root-shell.tsx, app/providers.tsx, next.config.ts).
- .claude/skills/bindu-design/SKILL.md (design and honesty rules; they win every conflict).
- The method: .claude/skills/web-quality-audit/SKILL.md, then performance/,
  core-web-vitals/ (with references/LCP.md, INP.md, CLS.md), best-practices/.
  They are plain Markdown instructions; follow them as your checklist.

## Measure before changing anything
1. `pnpm build` then `pnpm exec next start --port 3031` (production build, not dev).
2. Lighthouse (mobile and desktop) on http://localhost:3031/ , both themes
   (localStorage key `bindu-theme` = light | dark), plus a performance trace of the first
   load and of scrolling the full page. Record LCP, CLS, INP/TBT, total JS, fonts, largest
   requests, long tasks.
3. Write docs/home/web-quality-baseline.md: the numbers, the LCP element, the top 10
   costs by impact, each with file:line.

## Then fix, highest impact first
Focus areas (this page is heavy on motion): the intro and hero canvas (time to first
paint, LCP element), WebGL/three.js and GSAP plugin chunks (lazy-load what is below the
fold), Lenis, fonts (Inter + IBM Plex Mono, self-hosted: preload only what the first view
needs, font-display, size-adjust to avoid shifts), images and the finale photo (sizes,
formats, priority), the /home logo files, layout shifts from pinned sections, long tasks
while scrolling.
- One commit per fix, message `perf(home): ...`. After each fix, re-measure the one
  metric it targets; revert if it got worse.
- Must NOT change: the look in either theme, copy, motion choreography, reduced-motion
  and phone behaviour. Performance only.

## Report
docs/home/web-quality-report.md, under 50 lines: before/after table (LCP, CLS, INP/TBT,
JS KB, Lighthouse scores mobile/desktop, both themes), one line per commit, anything not
fixed and why.
