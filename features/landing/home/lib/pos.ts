import { getRoot } from "./root";
/* Round 24 item 1: cached element positions, so scroll handlers and per-frame code never read layout. A tracker measures
   once (document top, height) and again only after the layout may have changed (resize, body size change, fonts, load).
   Use: const t = track(el); t.top (document y), t.h, t.rectTop(scrollY) (viewport y). */
let ver = 0;
let hooked = false;
function hook() {
  if (hooked || typeof window === "undefined") return;
  hooked = true;
  const bump = () => { ver++; };
  window.addEventListener("resize", bump);
  window.addEventListener("load", bump);
  document.fonts?.ready.then(bump);
  if (typeof ResizeObserver !== "undefined") {
    let t = 0;
    new ResizeObserver(() => { window.clearTimeout(t); t = window.setTimeout(bump, 120); }).observe(getRoot());
  }
}
export const invalidatePositions = () => { ver++; };
export function track(el: HTMLElement) {
  hook();
  let v = -1, top = 0, h = 0;
  const m = () => {
    if (v === ver) return;
    const r = el.getBoundingClientRect();
    top = r.top + window.scrollY; h = r.height; v = ver;
  };
  return {
    get top() { m(); return top; },
    get h() { m(); return h; },
    rectTop: (sy: number = window.scrollY) => { m(); return top - sy; },
  };
}
