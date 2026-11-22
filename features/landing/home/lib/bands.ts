import { getRoot } from "./root";
/* Round 29 item 7: the page reads less pale. Each section sits on a background band (tokens, both themes) and the page background crossfades from one band to the
   next as you scroll (a body background driven by the section positions: about 30vh of overlap, each boundary blending while it moves from 75% to 45% of the
   viewport height), instead of a hard edge. Each section's content also rises in (12px, 60ms apart) as it enters and reverses on the way back.
   Reduced motion: every section simply paints its band (bands.css) and nothing moves. */
import "../styles/bands.css";
import { gsap, ScrollTrigger, reduceMotion } from "./motion";
import { track } from "./pos";
import { tRaf, tCaf } from "./loop";

/* r40-4: canvas and a tint or panel alternate down the page, so no two neighbours share a band */
const BANDS: Record<string, string> = { top: "canvas", statement: "tint", pains: "canvas", how: "panel", ask: "canvas", shipment: "tint", examples: "canvas", pricing: "tint", faq: "canvas", demo: "panel" };

export function startBands(): () => void {
  const secs = Array.from(document.querySelectorAll<HTMLElement>("main > section")).filter((s) => BANDS[s.id]);
  secs.forEach((s) => { s.dataset.band = BANDS[s.id]; });
  const root = getRoot();
  if (reduceMotion() || secs.length < 2) return () => secs.forEach((s) => delete s.dataset.band);
  root.classList.add("bands-fx");
  const tk = secs.map((s) => track(s));   // cached positions pick the boundaries near the viewport; only those are read fresh
  let raf = 0, last = "";
  const paint = () => {
    raf = 0;
    const vh = window.innerHeight;
    // the last boundary that has started to blend decides the colour: from the band above it to the band below, by how far it has moved
    let a = 0, b = 0, u = 0;
    const sy = window.scrollY;
    for (let i = 1; i < secs.length; i++) {
      const cached = tk[i]!.top - sy;
      if (cached > 0.75 * vh + 900) break;                                          // far below: not started
      const top = cached < -900 ? cached : secs[i]!.getBoundingClientRect().top;     // far above: started and done; near: a fresh read (the page above changes height as sections render)
      const w = Math.min(1, Math.max(0, (0.75 * vh - top) / (0.3 * vh)));
      if (w <= 0) break;
      a = i - 1; b = i; u = w;
    }
    const q = Math.round(u * 100);
    const from = `var(--band-${BANDS[secs[a]!.id]})`, to = `var(--band-${BANDS[secs[b]!.id]})`;
    const v = q <= 0 ? from : q >= 100 ? to : `color-mix(in srgb, ${from} ${100 - q}%, ${to})`;
    if (v !== last) {
      last = v; root.style.backgroundColor = v;
    }
  };
  const kick = () => { if (!raf) raf = tRaf(paint); };
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", kick);
  paint();

  // the rise-in: the body of each section (not its headline, which has its own reveal) comes up 12px and in, one block after another, as the section enters
  const kills: (() => void)[] = [];
  const pick = (id: string, sel: string) => { const s = secs.find((x) => x.id === id); return s ? Array.from(s.querySelectorAll<HTMLElement>(sel)) : []; };
  const groups: [string, HTMLElement[]][] = [
    ["pains", pick("pains", ".sec-head > *:not(h2), .container > *:not(.sec-head)")],
    ["examples", pick("examples", ".ex-head > *:not(h2)")],
    ["pricing", pick("pricing", ".sec-head > *:not(h2), .container > *:not(.sec-head)")],
    ["faq", pick("faq", ".sec-head > *:not(h2), .faq-item")],
  ];
  for (const [id, els] of groups) {
    const sec = secs.find((x) => x.id === id);
    const list = els.filter((e) => !els.some((o) => o !== e && o.contains(e)));   // outermost blocks only
    if (!sec || !list.length) continue;
    gsap.set(list, { y: 12, opacity: 0 });
    const tl = gsap.to(list, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: { each: Math.min(0.06, 0.5 / list.length) }, paused: true });
    const st = ScrollTrigger.create({ trigger: sec, start: "top 82%", end: "bottom top", onEnter: () => { tl.play(); }, onEnterBack: () => { tl.play(); }, onLeaveBack: () => { tl.reverse(); } });
    kills.push(() => { st.kill(); tl.kill(); gsap.set(list, { clearProps: "transform,opacity" }); });
  }
  return () => {
    window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); kills.forEach((k) => k());
    root.classList.remove("bands-fx"); root.style.backgroundColor = ""; secs.forEach((s) => delete s.dataset.band);
  };
}
