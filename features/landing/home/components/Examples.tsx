import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "../lib/motion";

/* Round 21, item 4, rebuilt in r55 (DESIGN.md v4): "What the rules let through, and what they stop." as a plain departures list. Eight rows adapted
   from getbindu.com's worked examples. The section pins and each scroll step makes ONE row current (ink, a cobalt marker at the left); every other
   row is mute. A pure function of scroll, so scrolling up reverses. Each row says the goods, the rule, one outcome ("Let through" or "Stopped") and one
   short reason (10 words at most, cut from the longer stories that used to sit under the board; the facts are the same). The type is the page's body and
   mono stacks at 14px and up (the split-flap letters are gone). A line above the board says how to read it. Reduced motion: no pin, every row shown.
   Illustrations, not customer filings. Battery passports are In build, so those rows say so. */

type Row = { route: string; goods: string; rule: string; verdict: "pass" | "stop"; why: string; build?: boolean };
const ROWS: Row[] = [
  { route: "Chikkamagaluru → Rotterdam", goods: "Coffee", rule: "EUDR", verdict: "pass", why: "Plots sit outside forest cleared after 2020." },
  { route: "Chikkamagaluru → Hamburg", goods: "Coffee", rule: "EUDR", verdict: "stop", why: "One field has no plot for the statement." },
  { route: "Kanchipuram → Paris", goods: "Silk", rule: "DPP", verdict: "pass", why: "The product record carries the GI certificate." },
  { route: "Unknown mill → delisted", goods: "Textiles", rule: "DPP", verdict: "stop", why: "No passport and no trail; the lab finds polyester." },
  { route: "Sumatra → Antwerp", goods: "Rubber", rule: "EUDR", verdict: "stop", why: "One plot overlaps forest cleared after 2020." },
  { route: "Srinagar → Milan", goods: "Pashmina", rule: "DPP", verdict: "pass", why: "The passport carries the GI certificate." },
  { route: "Ulsan → Bratislava", goods: "EV battery", rule: "Battery", verdict: "pass", build: true, why: "Chemistry and carbon footprint already recorded." },
  { route: "No QR → held at customs", goods: "Battery pack", rule: "Battery", verdict: "stop", build: true, why: "No code or data; passport due from 18 February 2027." },
];
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const N = ROWS.length;
const STEP = 40;   // svh of scroll per row
const verdictText = (r: Row) => (r.verdict === "pass" ? "Let through" : "Stopped");

export function Examples() {
  const pin = useRef<HTMLDivElement>(null);
  const isStatic = useReducedMotion();
  const [cur, setCur] = useState(isStatic ? -1 : 0);   // the current row; none highlighted in the static list

  useEffect(() => {
    if (isStatic) return;
    const el = pin.current!;
    let raf = 0, visible = false, last = -2;
    const tk = track(el);
    const update = () => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - window.innerHeight;
      const p = range > 0 ? clamp(-tk.rectTop() / range) : 0;
      const c = Math.min(N - 1, Math.floor(p * N));
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

  return (
    <section className="sec ex" id="examples" aria-labelledby="ex-h" data-guide-anchor="examples" data-guide-side="r">
      <div ref={pin} className={`ex-pin${isStatic ? " is-static" : ""}`} style={isStatic ? undefined : ({ height: `${100 + N * STEP}svh`, "--ex-n": N } as CSSProperties)}>
        <div className="ex-stage">
          <div className="container ex-head">
            <h2 id="ex-h" className="t-display-lg">What the rules let through, and what they stop.</h2>
            <p className="t-body t-soft">Illustrations, not customer filings: the verdict on a real shipment belongs to the rules and to the authority that reads them.</p>
            <p className="bd-how">Each row is a shipment. Scroll to see what the rules decide.</p>
          </div>
          <div className="container">
            <table className="bd">
              <caption className="sr">Worked examples: goods, rule, outcome and reason</caption>
              <thead className="sr"><tr><th>Goods</th><th>Rule</th><th>Outcome</th><th>Reason</th></tr></thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.route} className={`bd-row${i === cur ? " is-cur" : ""}`} aria-current={i === cur ? "true" : undefined}>
                    <td className="bd-c bd-goods">{r.goods}</td>
                    <td className="bd-c bd-rule">{r.rule}{r.build ? <span className="bd-build"> in build</span> : null}</td>
                    <td className="bd-c bd-verdict"><span className={`bd-pill is-${r.verdict}`}>{verdictText(r)}</span></td>
                    <td className="bd-c bd-why">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
