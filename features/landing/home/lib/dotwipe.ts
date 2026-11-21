import { getRoot } from "./root";
import { tRaf } from "./loop";
/* Dot wipe between the homepage and a sub-page (round 8, item 3a).
   The idea comes from Hyperiux Vault's "dot transition" (MPL-2.0, github.com/Hyperiux-Immersion-Labs/hyperiux-components,
   registry/effects/backgrounds/dot-transition). The code here is written fresh for Bindu and copies none of it: a grid of
   cobalt dots grows out from the centre (the far dots start last), the screen holds for a beat under a black cover, the
   route changes under cover, then the dots collapse toward the centre again. About a second, once per navigation.
   Only route changes call it (see route.ts); reduced motion never does. The code sits in the main bundle (the site
   builds as one script so it opens from file://), but it does nothing until a navigation runs it. The canvas is
   removed when the wipe ends, so nothing runs in the background. */

const SPACING = 18;          // px between dot centres
const GROW = 0.42;           // seconds for the cover to form
const HOLD = 0.08;           // seconds the cover holds while the route changes
const SHRINK = 0.42;         // seconds for the cover to clear
const SPREAD = 0.55;         // share of the grow/shrink time the wave takes to travel from the centre to the corners
const MAX_DOT = SPACING * 0.28;   // largest dot radius: a dense matrix, not a solid sheet

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
// cubic in-out: the same feel as --ease-in-out
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Runs the wipe and resolves when it has finished. onCovered runs once, while the screen is fully covered. */
export function dotWipe(onCovered: () => void): Promise<void> {
  return new Promise((resolve) => {
    // the dot and the cover are the theme colours (read per wipe, so the wipe follows the light or dark theme)
    const tokenColour = (name: string) => getComputedStyle(getRoot()).getPropertyValue(name).trim();
    const DOT = tokenColour("--cobalt-signal"), CANVAS = tokenColour("--canvas");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:9000;pointer-events:auto;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) { onCovered(); canvas.remove(); resolve(); return; }

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let delay = new Float32Array(0);   // per dot: when the wave reaches it, 0..SPREAD

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      cols = Math.ceil(w / SPACING);
      rows = Math.ceil(h / SPACING);
      const maxD = Math.hypot(w, h) / 2;
      delay = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * SPACING;
          const y = (r + 0.5) * SPACING;
          delay[r * cols + c] = (Math.hypot(x - w / 2, y - h / 2) / maxD) * SPREAD;
        }
      }
    };

    // p = how much of the screen is covered (0 = page only, 1 = fully covered)
    const draw = (p: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = clamp01(p * 3);   // the page is hidden by the time the dots are a third formed
      ctx.fillStyle = CANVAS;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.fillStyle = DOT;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const local = clamp01((p - delay[i]!) / (1 - SPREAD));
          const radius = MAX_DOT * ease(local);
          if (radius < 0.3) continue;
          const x = (c + 0.5) * SPACING;
          const y = (r + 0.5) * SPACING;
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    size();
    window.addEventListener("resize", size);
    const start = performance.now();
    let covered = false;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      let p: number;
      if (t < GROW) p = ease(t / GROW);
      else if (t < GROW + HOLD) p = 1;
      else p = 1 - ease(clamp01((t - GROW - HOLD) / SHRINK));
      if (!covered && t >= GROW) {
        covered = true;
        onCovered();
      }
      draw(p);
      if (t < GROW + HOLD + SHRINK) {
        tRaf(frame);
      } else {
        window.removeEventListener("resize", size);
        canvas.remove();
        resolve();
      }
    };
    tRaf(frame);
  });
}
