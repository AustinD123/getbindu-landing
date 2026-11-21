# Homepage licences and sources

Third-party code and assets used by the homepage (`features/landing/home/`,
`public/home/`). Carried over from the mockup's `v3/LICENSES.md`, trimmed to
what ships here.

## Code
| Item | Licence | Commercial use |
|---|---|---|
| GSAP, ScrollTrigger, SplitText | GSAP Standard "no charge" licence | Yes, free for commercial use since 30 Apr 2025 |
| Lenis (`lenis`) | MIT | Yes. Added for the homepage only; no other route imports it |
| three.js | MIT | Yes (already a dependency). Replaces OGL, which the mockup used |
| Inter, IBM Plex Mono (via `next/font/google`) | SIL OFL 1.1 | Yes |
| Map coastlines (`lib/worldmap.ts`, `lib/shipmap.ts`) | Own work, hand-typed, simplified | Yes |

## Data
| Item | Licence | Commercial use |
|---|---|---|
| Natural Earth 1:50m land (naturalearthdata.com), simplified and quantised into `lib/landdata.ts` | Public domain | Yes, no attribution required |

## Photo
| Item | Licence | Commercial use |
|---|---|---|
| Unsplash photo 1605732562742 (shipping containers): the finale photo `public/home/images/port-cargo.webp`, shown through the mask of the wordmark and under the closing line | Unsplash Licence | Commercial use is allowed. **Swap for an unbranded photo before production:** the small "Hapag-Lloyd" door text and container IDs still show. |

## Own work
The container ship, the product walk-through frame, the QR-style pattern (made
up, not a real code), the worked-example tags, the ink strike, the dot wipe
between pages and the finale wordmark mask (`lib/maskdata.ts`, Inter 600
converted to SVG paths) are our own SVG, CSS and canvas code.

Ideas from MIT libraries rebuilt in our own code, no code copied: Magic UI
(Animated Beam, Border Beam, Shiny Button). The dot wipe is inspired by
Hyperiux Vault's dot transition (MPL-2.0); the code here is written fresh.
