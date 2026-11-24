import { tRaf, tCaf } from "../lib/loop";
import { useEffect, useRef } from "react";
import { statement } from "../content";
import { reduceMotion } from "../lib/motion";
import { Mark } from "./bits";
import { track } from "../lib/pos";

/* Round 19, item 3: the statement lights up with the scroll (scrubbed, so it reverses on scroll up; nothing is a one-way trigger).
   Words go from muted to full ink one by one; the Bindu chip's outline goes from hairline to a yellow fill and the dots of the
   mark inside it brighten one by one. Progress = where the sentence sits on the screen: 0 when it enters the lower part, 1 at the
   middle. Only custom properties and opacity are written per frame. Reduced motion: lit at once. */
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export function Statement() {
  const sec = useRef<HTMLElement>(null);
  const words = [...statement.before.split(" "), "\u0000", ...statement.after.split(" ")];
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>(".stmt-w"));
    const chip = el.querySelector<HTMLElement>(".stmt-chip")!;
    const dots = Array.from(chip.querySelectorAll<SVGElement>("svg > *"));
    const apply = (t: number) => {
      const N = ws.length + 2;
      ws.forEach((w, i) => w.style.setProperty("--l", clamp01(t * N - i).toFixed(3)));
      const c = clamp01((t - 0.2) / 0.5);
      chip.style.setProperty("--c", c.toFixed(3));
      dots.forEach((d, i) => { d.style.opacity = String(0.2 + 0.8 * clamp01(c * dots.length * 1.4 - i)); });
    };
    if (reduceMotion()) { apply(1); return; }
    let raf = 0, lastP = -1;
    const tk = track(el);
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const p = clamp01((vh * 0.9 - (tk.rectTop() + tk.h / 2)) / (vh * 0.45));
      if (Math.abs(p - lastP) < 0.002 || (p === lastP)) return;   // nothing to write while it is far above or below
      lastP = p; apply(p);
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    update();
    return () => { window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); };
  }, []);
  return (
    <section ref={sec} className="band-dark sec stmt" id="statement" aria-label="What Bindu does" data-guide-anchor="statement" data-guide-side="r">
      <div className="container">
        <p className="stmt-t t-display-lg">
          {words.map((w, i) => w === "\u0000"
            ? <span key={i}><span className="stmt-chip"><Mark size={26} white /><span className="stmt-w">Bindu</span></span>{" "}</span>
            : <span key={i}><span className="stmt-w">{w}</span>{" "}</span>)}
        </p>
      </div>
    </section>
  );
}

/* r44-1: "Sound familiar?" (BeforeAfter, #pains) is gone; "What Bindu does" (components/Flow.tsx, #story) replaced it. */
