import { tRaf, tCaf } from "./loop";
import { useEffect, useRef, useState } from "react";
import { reduceMotion } from "./motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789-·";

/* Terminal-style resolve: characters scramble, then settle left to right. Ends on the real text;
   under reduced motion the text is simply shown. Spaces and punctuation stay put. */
export function scrambleTo(el: HTMLElement, text: string, duration = 900): () => void {
  if (reduceMotion()) { el.textContent = text; return () => {}; }
  let raf = 0; const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration), settled = Math.floor(p * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      out += i < settled || /[\s.,:/€]/.test(ch!) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = tRaf(step);
  };
  raf = tRaf(step);
  return () => tCaf(raf);
}

/* true once the element has been on screen (for reveal-on-scroll; immediately true under reduced motion) */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver((es) => { if (es[0]!.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}
