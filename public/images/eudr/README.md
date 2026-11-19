# /eudr journey vignettes — capture manifest

The PNGs in this folder are **solid-color placeholders**. Replace each with a
real product capture of the same filename (PNG, same rough aspect ratio) and
the page picks it up with zero code changes. Update the `w`/`h` values in
`features/landing/regulation/eudr-story.tsx` (`JOURNEY_STEPS`, `FLAG_SHOT`,
`CLOSE_SHOT`) if your final crops differ meaningfully in aspect.

## Capture spec (all shots)

- Browser window **1440 px** wide, 100% zoom, retina (2× DPR), light theme, EN
- Demo workspace fully staged and **saved** — no `unsaved` chips, no amber
  warnings, no `0` counters, no "missing" notes anywhere in frame
- Story canon: **5 plots (4 points + 1 traced polygon ~0.87 ha)**, estate
  names (not "Farm 1"), varied kilo amounts, one coherent shipment
- Crop out OS chrome and the "Chrome on macOS" footer
- Keep the Google attribution line **in frame** on any map crop (required)

## Files

| File | Screen | Crop |
| --- | --- | --- |
| `journey-1-farms.png` | Farm mapping | Map + named plot rows; search bar out; Google attribution in |
| `journey-2-forest.png` | Forest-check results | Results table: 1–2 green Clear rows visible + the flagged row |
| `journey-3-legality.png` | Legality step | Stat strip (`8/8`, proof docs ≥ 1) + first 2 questions, one with an attached proof |
| `journey-4-declaration.png` | Declaration | The generated summary card alone (species + country recorded) |
| `journey-5-file.png` | File with the EU | "Ready to file" card with the TRACES submit button |
| `flag-resolve.png` | Flagged-plot resolution | Flagged row + "Why should this plot still be filed?" card, reason selected, evidence attached, proper explanation text |
| `close-receipt.png` | TRACES receipt | "Filed successfully · accepted" header, both number cards, customs / 5-years row |
