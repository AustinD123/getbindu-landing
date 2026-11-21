import { tRaf, tCaf } from "../lib/loop";
import { useEffect, useRef } from "react";
import { beforeAfter, statement } from "../content";
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

/* Round 19, item 4: "Sound familiar?" scrubbed. Each row is one grid line: the pain on the left (7/12), Bindu's answer in cobalt plus one
   supporting line on the right (5/12). The strike draws with the scroll (and un-draws when you scroll up); the answer's left to
   right reveal follows the strike's progress. Reduced motion: strike and answer shown at once.
   Round 28, item 6: the strike is perfectly straight: one 1.5px ink bar per wrapped line of the sentence (square ends, whole pixels), through the middle of the
   x-height, drawn left to right and line after line, in proportion to the line widths. The bars are measured from the text (Range rects and the font's own
   x-height) on load, on resize and when the fonts arrive. The `dash` cue plays when a row's draw progress crosses 2 percent going down (once per crossing;
   never when scrolling up, never on load). */
const c01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* one bar per wrapped line of the row's sentence, as children of .ba-strikes (position: absolute inside .ba-pain) */
function buildStrikes(row: HTMLElement) {
  const box = row.querySelector<HTMLElement>(".ba-strikes"), pain = row.querySelector<HTMLElement>(".ba-pain"), text = row.querySelector<HTMLElement>(".ba-pt");
  if (!box || !pain || !text) return;
  const rg = document.createRange();
  rg.selectNodeContents(text);
  const pr = pain.getBoundingClientRect(), cs = getComputedStyle(text), fs = parseFloat(cs.fontSize);
  // the middle of the x-height above the baseline, from the font itself
  const m = document.createElement("canvas").getContext("2d")!;
  m.font = cs.font;
  const ascent = m.measureText("x").fontBoundingBoxAscent, xh = m.measureText("x").actualBoundingBoxAscent;
  const lines: { l: number; r: number; y: number }[] = [];
  for (const q of Array.from(rg.getClientRects())) {
    if (q.width < 2) continue;
    const y = q.top - pr.top + ascent - xh / 2, hit = lines.find((k) => Math.abs(k.y - y) < fs * 0.3);
    if (hit) { hit.l = Math.min(hit.l, q.left - pr.left); hit.r = Math.max(hit.r, q.right - pr.left); } else lines.push({ l: q.left - pr.left, r: q.right - pr.left, y });
  }
  lines.sort((a, b) => a.y - b.y);
  const total = lines.reduce((t, k) => t + (k.r - k.l), 0) || 1;
  box.textContent = "";
  let acc = 0;
  for (const k of lines) {
    const w = k.r - k.l, bar = document.createElement("i");
    bar.style.left = `${Math.round(k.l - fs * 0.03)}px`; bar.style.width = `${Math.round(w + fs * 0.06)}px`; bar.style.top = `${Math.round(k.y - 0.75)}px`;
    bar.style.setProperty("--a", (acc / total).toFixed(4)); bar.style.setProperty("--w", (w / total).toFixed(4));
    box.appendChild(bar);
    acc += w;
  }
}

export function BeforeAfter() {
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".ba-row"));
    const measure = () => rows.forEach(buildStrikes);
    measure();
    document.fonts?.ready.then(measure);
    const set = (r: HTMLElement, s: number) => {
      r.style.setProperty("--s", s.toFixed(3));
      r.style.setProperty("--r", c01((s - 0.35) / 0.65).toFixed(3));
    };
    if (reduceMotion()) { rows.forEach((r) => set(r, 1)); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }
    let raf = 0;
    const tks = rows.map((r) => track(r)), lastS = rows.map(() => -1);
    const update = () => {
      raf = 0;
      const vh = window.innerHeight, sy = window.scrollY;
      rows.forEach((r, i) => { const s = c01((vh * 0.82 - (tks[i]!.rectTop(sy) + tks[i]!.h * 0.3)) / (vh * 0.22)); if (s === lastS[i]) return; const was = lastS[i]; lastS[i] = s; set(r, s); });
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    window.addEventListener("resize", measure);
    update();
    return () => { window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); window.removeEventListener("resize", measure); tCaf(raf); };
  }, []);
  return (
    <section className="band-dark sec ba" id="pains" aria-labelledby="ba-h" data-guide-anchor="ba" data-guide-side="l">
      <div className="container">
        <h2 id="ba-h" className="t-display-md ba-h">{beforeAfter.title}</h2>
        <ul ref={list} className="ba-list">
          {beforeAfter.cards.map((c) => (
            <li key={c.before} className="ba-row">
              <p className="ba-pain">
                <span className="ba-pt">{c.before}</span>
                <span className="ba-strikes" aria-hidden="true" />
              </p>
              <div className="ba-right">
                <p className="ba-ans"><span>{c.after}</span></p>
                <p className="ba-n">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
