# Web quality report: homepage perf pass

Lighthouse 12, production build, local. Mobile numbers are noisy: the machine was busy with other builds, and TBT
swung from 680 ms to 2.5 s between identical runs. JS KB and observed LCP are the stable signals.

| Run | Perf | LCP | TBT | CLS | JS (transfer) |
|---|---|---|---|---|---|
| Mobile, baseline | 57 | 6.2 s | 810 ms | 0 | ~492 KB |
| Mobile, after fonts | 69 | 4.2 s | 680 ms | 0 | 464 KB |
| Mobile, final (3 runs) | 53-58 | 4.2-4.6 s | 1.7-2.6 s (noisy) | 0 | 282 KB |
| Desktop, final (earlier fixes only) | 98 | 0.9 s | 60 ms | 0.003 | 464 KB |

Observed (non-simulated) mobile LCP after the intro skip: about 0.4 to 0.75 s.

## Commits
- Phones (under 768px) skip the intro, so the hero text paints at once (layout.tsx pre-paint script, Intro.tsx).
- Stop preloading Geist, JetBrains Mono, Source Serif and Newsreader (10 font preloads down to 4, about 560 KB to 110 KB).
- Phones never load three.js for the intro dust (MapLayer.tsx): -182 KB JS on mobile.
- Ask logo uses the webp, not the png.

## Left
- Simulated mobile LCP is still ~4.2 s: hydration of one big client tree (home-page.tsx) dominates. Next: split below-the-fold sections, defer Lenis and SplitText until first scroll, per-section GSAP plugin imports.
- Inter italic is still preloaded (same next/font call as normal); split it to drop ~50 KB.
- Desktop still loads three.js for the intro (unchanged on purpose).
- Finale image and Closing.tsx belong to the other agent. 17 stylesheets not consolidated.
- Fonts: size-adjust fallbacks not changed (next/font already generates them; CLS is 0).
- Document-shell font change also affects other pages (their fonts now load on use, not preload).

## Pass 2 (medians of 3, clean machine, production build)

| Run | Perf | LCP | TBT | CLS | JS (transfer) |
|---|---|---|---|---|---|
| Mobile, start of pass 2 | 64 | 4.2 s | 1090 ms | 0 | 282 KB |
| Mobile, after Lenis deferral | 75 | 4.2 s | 460 ms | 0 | 284 KB |
| Desktop, after | 96 | 1.3 s | 60 ms | 0.003 | 465 KB |

- `perf(home): load Lenis dynamically, on idle after load on phones` (kept: TBT roughly halved).
- Tried and reverted: phone-idle SplitText for headings (no median change).
- Not done: below-the-fold section lazy chunks. headings, bands and Guide query the whole `main` DOM at mount, so lazy sections would need those rewritten per section; too risky for the look and pins. Theatre already imports its GSAP plugins lazily. Inter italic preload is in the shared document-shell (affects other pages); left.
- Desktop measured 96 here, not 88; three.js (OGL) is already its own chunk, loaded inside the intro, left as is. Simulated mobile LCP (4.2 s) is 89% render delay from hydration; observed LCP is ~0.5 s.
