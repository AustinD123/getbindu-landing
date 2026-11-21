/* Round 24 item 1: one animation loop. Every per-frame callback in the site runs from gsap.ticker (which is the single
   requestAnimationFrame the page owns, shared with Lenis and ScrollTrigger). tRaf / tCaf are drop-in replacements for
   requestAnimationFrame / cancelAnimationFrame. */
import { gsap } from "gsap";

type Cb = (t: number) => void;
let next = 1;
let queue = new Map<number, Cb>();
let hooked = false;

function run() {
  if (!queue.size) return;
  const q = queue;
  queue = new Map();
  const now = performance.now();
  q.forEach((cb) => cb(now));
}

export function tRaf(cb: Cb): number {
  if (!hooked) { hooked = true; gsap.ticker.add(run); }
  const id = next++;
  queue.set(id, cb);
  return id;
}
export function tCaf(id: number) { queue.delete(id); }
