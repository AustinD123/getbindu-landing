import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { reduceMotion } from "../lib/motion";

/* Round 21, item 4 (r31-1 reworked): "What the rules let through, and what they stop." as a split-flap departures board. Eight rows adapted
   from getbindu.com's worked examples (the wording is theirs). The section pins and each scroll step reveals ONE row: it flaps in, settles
   (clack) and becomes the current row (full ink, a yellow dot at the left; earlier rows muted). A pure function of scroll, so scrolling up
   un-reveals in reverse. Under the board a panel (aria-live) shows the current row's verdict, rule, route, headline (flap transition) and
   story. The board is a real table; the flap characters are aria-hidden. Reduced motion: no pin, every row settled, every story listed.
   Illustrations, not customer filings. Battery passports are In build, so those stories say so. */

type Row = { route: string; goods: string; rule: string; verdict: "pass" | "stop"; head: string; story: string; build?: boolean };
const ROWS: Row[] = [
  { route: "Chikkamagaluru → Rotterdam", goods: "Coffee", rule: "EUDR", verdict: "pass", head: "Draw the map once.", story: "An estate maps its plots before harvest. The coordinates sit outside the forest cover cleared after 2020, so the dossier can carry the plot file, the operator's risk assessment and the statement reference the buyer needs." },
  { route: "Chikkamagaluru → Hamburg", goods: "Coffee", rule: "EUDR", verdict: "stop", head: "Papers lie. Maps don't.", story: "Good beans, but one field sits on land the paperwork never covered. With no plot the estate can stand behind, there is nothing to put in the statement, and the buyer goes to the estate next door." },
  { route: "Kanchipuram → Paris", goods: "Silk", rule: "DPP", verdict: "pass", head: "Weave the proof in.", story: "A sari carries its GI certificate in the product record: the co-op, the loom, the zari. A boutique in Paris scans the code and reads the file the weaver filled in." },
  { route: "Unknown mill → delisted", goods: "Textiles", rule: "DPP", verdict: "stop", head: "Cheap needs an alibi.", story: "A “pashmina” lot with no passport and no trail. The lab finds polyester, and the marketplace has nothing to put behind the listing." },
  { route: "Sumatra → Antwerp", goods: "Rubber", rule: "EUDR", verdict: "stop", head: "The satellite has a long memory.", story: "One plot overlaps forest cleared after 2020. The images are dated and the boundary is not in dispute, so that lot cannot go into the dossier." },
  { route: "Srinagar → Milan", goods: "Pashmina", rule: "DPP", verdict: "pass", head: "One scan settles it.", story: "A shawl with its GI certificate inside the passport. A thousand lookalikes hang in the same street, and one of them can show where the wool came from." },
  { route: "Ulsan → Bratislava", goods: "EV", rule: "Battery", verdict: "pass", build: true, head: "Cells that carry their own file.", story: "Cells leave the plant with their chemistry, carbon footprint and recycled content already recorded. The line downstream reads the file instead of emailing for it." },
  { route: "No QR → held at customs", goods: "Pack", rule: "Battery", verdict: "stop", build: true, head: "2027 doesn't negotiate.", story: "A pack with no code, no chemistry and no carbon number. From 18 February 2027 the passport is what lets it on the EU market, so it waits in the warehouse." },
];
const COLS = ["route", "goods", "rule", "verdict"] as const;
const label = (r: Row, c: (typeof COLS)[number]) => (c === "verdict" ? (r.verdict === "pass" ? "Let through" : "Stopped") : r[c]);
const FLAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
/* the character a flap shows at row progress r: blank before the row starts, a few other characters while it flips, then its own */
const flapChar = (ch: string, j: number, len: number, r: number) => {
  if (r <= 0) return "";
  const settle = 0.25 + 0.6 * (j / Math.max(1, len));
  if (r >= settle) return ch;
  if (!/[A-Z0-9]/.test(ch)) return ch;   // arrows and punctuation just appear
  return FLAP[(Math.floor(r * 26) * 7 + j * 5 + ch.charCodeAt(0)) % FLAP.length];
};

const N = ROWS.length;
const STEP = 40;   // svh of scroll per row
const verdictText = (r: Row) => (r.verdict === "pass" ? "Let through" : "Stopped");

/* a tiny route glyph: two dots and a dotted line between them */
const Glyph = () => (
  <svg className="bd-glyph" viewBox="0 0 48 8" width="48" height="8" aria-hidden="true" focusable="false">
    <circle cx="4" cy="4" r="3" /><line x1="10" y1="4" x2="38" y2="4" /><circle cx="44" cy="4" r="3" />
  </svg>
);
const Meta = ({ r }: { r: Row }) => (
  <p className="bd-meta">
    <span className={`bd-verdict is-${r.verdict}`}>{verdictText(r)}</span>
    <span className="bd-rule">{r.rule} · {r.goods}</span>
    <span className="bd-route"><Glyph />{r.route}</span>
  </p>
);

export function Examples() {
  const pin = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLTableElement>(null);
  const headEl = useRef<HTMLSpanElement>(null);
  const [isStatic] = useState(() => reduceMotion());
  const [cur, setCur] = useState(isStatic ? N - 1 : -1);   // the current row (-1: none settled yet)

  useEffect(() => {
    const root = board.current!;
    const rows = Array.from(root.querySelectorAll<HTMLElement>("tbody tr"));
    const chars = rows.map((tr) => Array.from(tr.querySelectorAll<HTMLElement>(".fl")));
    const cache = rows.map((_, i) => chars[i]!.map(() => "\u0000"));
    const paint = (i: number, r: number) => {
      let k = 0;
      COLS.forEach((c) => {
        const t = label(ROWS[i]!, c).toUpperCase();
        Array.from(t).forEach((ch, j) => {
          if (ch === " ") return;
          const el = chars[i]![k], v = flapChar(ch, j, t.length, r);
          if (cache[i]![k] !== v) { cache[i]![k] = v!; el!.textContent = v!; el!.classList.toggle("is-blank", v === ""); }
          k++;
        });
      });
    };
    if (isStatic) { rows.forEach((_, i) => paint(i, 1)); return; }
    rows.forEach((_, i) => paint(i, 0));
    const el = pin.current!;
    let raf = 0, visible = false, last = -2;
    const tk = track(el);
    const settled = rows.map(() => false);
    const update = () => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - window.innerHeight;
      const p = range > 0 ? clamp(-tk.rectTop() / range) : 0;
      const q = p * N;   // one row per unit: it flaps over the first 0.625 of its step and is current from then on
      let c = -1;
      rows.forEach((_, i) => {
        const r = clamp((q - i) * 1.6, 0, 1);
        paint(i, r);
        const done = r >= 1;
        if (done) c = i;
        settled[i] = done;
      });
      if (c !== last) { last = c; setCur(c); }
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    const io = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    io.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => { io.disconnect(); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); };
  }, [isStatic]);

  /* the headline flaps: each letter shows a few other flap characters, then its own, left to right (about 0.4s) */
  useEffect(() => {
    const el = headEl.current;
    if (!el || isStatic || cur < 0) return;
    const text = ROWS[cur]!.head;
    const t0 = performance.now(), D = 420;
    let raf = 0;
    const tick = (now: number) => {
      const r = clamp((now - t0) / D);
      el.textContent = Array.from(text).map((ch, j) => {
        const settle = 0.2 + 0.8 * (j / Math.max(1, text.length));
        if (r >= settle || !/[A-Za-z0-9]/.test(ch)) return ch;
        return FLAP[(Math.floor(r * 30) * 7 + j * 5 + ch.charCodeAt(0)) % FLAP.length];
      }).join("");
      if (r < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.textContent = text; };
  }, [cur, isStatic]);

  const story = cur >= 0 ? ROWS[cur] : null;

  return (
    <section className="sec ex" id="examples" aria-labelledby="ex-h" data-guide-anchor="examples" data-guide-side="r">
      <div ref={pin} className={`ex-pin${isStatic ? " is-static" : ""}`} style={isStatic ? undefined : ({ height: `${100 + N * STEP}svh`, "--ex-n": N } as CSSProperties)}>
        <div className="ex-stage">
          <div className="container ex-head">
            <h2 id="ex-h" className="t-display-md">What the rules let through, and what they stop.</h2>
            <p className="t-body t-soft">Illustrations, not customer filings: the verdict on a real shipment belongs to the rules and to the authority that reads them.</p>
          </div>
          <div className="container">
            <table ref={board} className="bd">
              <caption className="sr">Worked examples: route, goods, rule and verdict</caption>
              <thead className="sr"><tr><th>Route</th><th>Goods</th><th>Rule</th><th>Verdict</th></tr></thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.route} className={`bd-row${i === cur ? " is-cur" : i < cur ? " is-past" : ""}`}>
                    {COLS.map((c) => {
                      const t = label(r, c);
                      return (
                        <td key={c} className={`bd-c bd-${c}`}>
                          <span className="sr">{t}</span>
                          <span className="bd-flaps" aria-hidden="true">
                            {t.toUpperCase().split(" ").map((w, wi) => (
                              <span key={wi} className="bd-word">{Array.from(w).map((_, j) => <span key={j} className={`fl${c === "verdict" ? ` is-${r.verdict}` : ""}`} />)}</span>
                            ))}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {isStatic ? (
              <div className="bd-list">
                {ROWS.map((r) => (
                  <article key={r.route} className="bd-story is-open">
                    <Meta r={r} />
                    <h3 className="bd-h">{r.head}</h3>
                    <p className="t-body t-soft">{r.story}{r.build ? " Battery passports are in build." : ""}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className={`bd-story${story ? " is-open" : ""}`} aria-live="polite">
                {story && (
                  <>
                    <span className="sr">{story.head}. {verdictText(story)}, {story.rule} {story.goods}, {story.route}.</span>
                    <div key={cur} className="bd-fade" aria-hidden="true">
                      <Meta r={story} />
                      <h3 className="bd-h"><span ref={headEl}>{story.head}</span></h3>
                      <p className="t-body t-soft">{story.story}{story.build ? " Battery passports are in build." : ""}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
