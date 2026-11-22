import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { how } from "../content";
import { useReducedMotion } from "../lib/motion";
import { rng } from "../lib/guide";

/* Round 21, item 5: How it works as kinetic typography (replaces the r19 app window). One pinned section; Describe, Prove, File on the left.
   On the right, big type on the page canvas, no frame and no fake UI. Describe: one large sentence types in at an uneven rhythm; its key
   words highlight one by one and each one lifts out into a labelled slot of one clean record (Goods, Origin, Destination); the HS code then
   computes into its slot (6109, 6109 10, 6109 10 00, each part rolling up like the price odometer); the rule appears. Prove: four evidence
   lines write into the record, each ending with a cobalt signature tick (tick cue). File: the record closes into one yellow dot seal (seal
   cue) and "Product passport record created". Everything is a pure function of the pin's scroll progress, so it reverses; the typed text is
   the only thing written from script. Reduced motion: no pin, everything shown. */

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const sm = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };

const SEG = ["1,200 ", "cotton T-shirts", " from ", "Tiruppur, India", " to ", "Rotterdam", "."];
const SENTENCE = SEG.join("");
/* an uneven typing rhythm: every character takes a different time; CUM[i] = share of the typing time at which character i is in */
const CUM = (() => {
  const r = rng(21), w: number[] = [];
  for (let i = 0; i < SENTENCE.length; i++) w.push((0.5 + r() * 1.1) * (SENTENCE[i] === " " ? 1.9 : 1) * (SENTENCE[i] === "," ? 2.4 : 1) * (r() < 0.07 ? 3 : 1));
  const sum = w.reduce((a, b) => a + b, 0);
  let c = 0;
  return w.map((x) => (c += x / sum));
})();

/* the made-up event log (Illustration): relative time, event, subject, and who signed it */
const LOG = [
  { t: "00:02", req: "request → mill (WhatsApp)", what: "fibre composition", by: "mill", via: "WhatsApp" },
  { t: "00:44", req: "request → dye house (email)", what: "mill and dye house", by: "dye house", via: "email" },
  { t: "01:20", req: "request → mill (WhatsApp)", what: "care and repair data", by: "mill", via: "WhatsApp" },
  { t: "02:07", req: "request → supplier (email)", what: "supplier declaration", by: "supplier", via: "email" },
];
const GOT = ["00:41", "01:18", "02:05", "03:12"];

/* a made-up QR-style pattern (21 x 21, three finder squares) for a fake URL, not a real code. Each dot gets a start point on one of the
   log lines of the Prove step and a random place in the order they snap in (r28-1). */
type QDot = { x: number; y: number; k: "f" | "d" | "y"; sx: number; sy: number; o: number };
const QR: QDot[] = (() => {
  const r = rng(5), N = 21, out: QDot[] = [];
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
  const add = (x: number, y: number, k: QDot["k"]) => out.push({ x, y, k, sx: r() * 30 - 4, sy: -2 - Math.floor(r() * 8) * 2.4 - 1.2, o: r() });
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (Math.abs(x - 10) <= 1 && Math.abs(y - 10) <= 1) continue;   // clear ring round the yellow centre dot
    if (finder(x, y)) {
      const fx = x < 7 ? x : x - (N - 7), fy = y < 7 ? y : y - (N - 7);
      if (fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4)) add(x, y, "f");
    } else if (r() < 0.48) add(x, y, "d");
  }
  add(10, 10, "y");
  return out;
})();
const TICKS = [0.2, 0.4, 0.6, 0.8];   // where each evidence line's signature tick lands (tick cue)

const at = (a: number, b = 0.08): CSSProperties => ({ "--a": a, "--b": b } as CSSProperties);
const Tick = ({ a }: { a: number }) => (
  <svg className="tick" viewBox="0 0 16 16" aria-hidden="true" style={at(a, 0.06)}><path pathLength={1} d="M3 8.5l3.2 3.2L13 4.8" /></svg>
);

export function HowItWorks() {
  const pin = useRef<HTMLDivElement>(null);
  const segs = useRef<(HTMLSpanElement | null)[]>([]);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const qr = useRef<(SVGCircleElement | null)[]>([]);
  const isStatic = useReducedMotion();
  const [step, setStep] = useState(0);
  /* r36-5: which record line is pointed at (hover or focus) and which is pinned (click or tap); the readout shows the pointed one first */
  const [hov, setHov] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  const shown = hov ?? sel;
  const tr = how.trace;

  useEffect(() => {
    const type = (d: number) => {
      const p = clamp((d - 0.03) / 0.35);
      let n = 0;
      while (n < SENTENCE.length && CUM[n]! <= p + 1e-6) n++;
      let left = n;
      SEG.forEach((t, i) => { const el = segs.current[i]; if (el) el.textContent = t.slice(0, Math.max(0, Math.min(t.length, left))); left -= t.length; });
    };
    let lastQ = -1;
    /* the dots fly in from the evidence lines (above and left) and snap onto the grid, one by one, then the yellow dot lands last */
    const dots = (d: number) => {
      if (Math.abs(d - lastQ) < 0.0005) return;
      lastQ = d;
      QR.forEach((q, i) => {
        const c = qr.current[i];
        if (!c) return;
        const t = q.k === "y" ? clamp((d - 0.62) / 0.2) : clamp((d - 0.06 - q.o * 0.42) / 0.3);
        const e = 1 - Math.pow(1 - t, 3), u = 1 - e;
        c.setAttribute("transform", `translate(${((q.sx - q.x) * u).toFixed(2)} ${((q.sy - q.y) * u + Math.sin(t * Math.PI) * -1.5).toFixed(2)})${q.k === "y" ? ` scale(${(0.4 + 0.6 * e).toFixed(3)})` : ""}`);
        c.style.opacity = String(q.k === "y" ? t : clamp(t * 3));
      });
    };
    if (isStatic) { type(1); return; }
    const el = pin.current!;
    let raf = 0, visible = false, lastStep = -1;
    const tk = track(el);
    const update = () => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - (window.innerHeight - 64);
      const p = range > 0 ? clamp((64 - tk.rectTop()) / range) : 0;
      const f = Math.min(2.999, p * 3);
      cards.current.forEach((c, i) => {
        if (!c) return;
        const t = clamp(f - i), enter = i === 0 ? 1 : sm(t / 0.15), exit = i === 2 ? 0 : sm((f - (i + 1)) / 0.15);
        const d = clamp((t - 0.1) / 0.8);
        c.style.opacity = String(enter * (1 - exit));
        c.style.transform = `translateY(${((1 - enter) * 10 - exit * 10).toFixed(1)}px)`;
        c.style.setProperty("--d", d.toFixed(3));
        c.style.visibility = enter * (1 - exit) > 0.01 ? "visible" : "hidden";
        if (i === 0) type(d);
        else if (i === 2) dots(d);
      });
      const s = Math.floor(f);
      if (s !== lastStep) { lastStep = s; setStep(s); }
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    const io = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    io.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => { io.disconnect(); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); };
  }, [isStatic]);

  const hl = (i: number, a: number) => <span key={i} ref={(el) => { segs.current[i] = el; }} className="kt-hl" style={at(a, 0.08)} />;
  const panels = [
    <div key="d" className="kt kt-describe">
      <p className="kt-say">
        <span ref={(el) => { segs.current[0] = el; }} />{hl(1, 0.42)}<span ref={(el) => { segs.current[2] = el; }} />{hl(3, 0.5)}<span ref={(el) => { segs.current[4] = el; }} />{hl(5, 0.58)}<span ref={(el) => { segs.current[6] = el; }} />
      </p>
      <dl className="kt-rec">
        <div className="st" style={at(0.46)}><dt>Goods</dt><dd>Cotton T-shirts, knitted</dd></div>
        <div className="st" style={at(0.54)}><dt>Origin</dt><dd>Tiruppur, India</dd></div>
        <div className="st" style={at(0.62)}><dt>Destination</dt><dd>Rotterdam, Netherlands</dd></div>
        <div className="st kt-hs" style={at(0.66, 0.04)}>
          <dt>HS code</dt>
          <dd><span className="kt-roll" style={at(0.68, 0.08)}><b>6109</b></span><span className="kt-roll" style={at(0.76, 0.08)}><b> 10</b></span><span className="kt-roll" style={at(0.84, 0.08)}><b> 00</b></span></dd>
        </div>
        <div className="st" style={at(0.92, 0.06)}><dt>Rule</dt><dd>Textile passport <span className="kt-live"><i aria-hidden="true" />Live</span></dd></div>
      </dl>
    </div>,
    <div key="p" className="kt kt-prove">
      <p className="kt-h st" style={at(0.02)}>log · illustration</p>
      <ul className="kt-log">
        {LOG.map((l, i) => (
          <li key={l.what} className="kt-ln-wrap">
            <p className="kt-ln st" style={at(TICKS[i]! - 0.16, 0.06)}><time>{l.t}</time><span>{l.req}</span><b>{l.what}</b></p>
            <p className="kt-ln st" style={at(TICKS[i]! - 0.06, 0.06)}><time>{GOT[i]}</time><span>received</span><b>{l.what}</b><em><Tick a={TICKS[i]!} />signed by {l.by}</em></p>
          </li>
        ))}
      </ul>
    </div>,
    <div key="f" className="kt kt-file">
      <ul className="kt-log kt-collapse" aria-hidden="true">
        {LOG.flatMap((l, i) => [
          <li key={l.what + "a"} className="kt-ln st" style={at(0, 0.001)}><time>{l.t}</time><span>{l.req}</span><b>{l.what}</b></li>,
          <li key={l.what + "b"} className="kt-ln st" style={at(0, 0.001)}><time>{GOT[i]}</time><span>received</span><b>{l.what}</b><em>✓ signed by {l.by}</em></li>,
        ])}
      </ul>
      <div className="kt-trace" onKeyDown={(e) => { if (e.key === "Escape") { setSel(null); setHov(null); } }}>
        <ul className="kt-tr-list" aria-label={tr.label}>
          {tr.lines.map((l, i) => (
            <li key={l.line} className={`kt-tr st${shown === i ? " is-on" : ""}`} style={at(0.4 + i * 0.06, 0.06)}>
              <button
                type="button"
                className="kt-tr-btn"
                aria-pressed={sel === i}
                aria-describedby="kt-tr-out"
                tabIndex={isStatic || step === 2 ? 0 : -1}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                onFocus={() => setHov(i)}
                onBlur={() => setHov(null)}
                onClick={() => setSel(sel === i ? null : i)}
              >
                <svg className="kt-tr-doc" viewBox="0 0 12 14" aria-hidden="true"><path d="M1 1h6.5L11 4.5V13H1z M7.5 1v3.5H11" /></svg>
                <span className="kt-tr-thread" aria-hidden="true" style={at(0.44 + i * 0.06, 0.12)} />
                <span className="kt-tr-line">{l.line}</span>
              </button>
            </li>
          ))}
        </ul>
        <p id="kt-tr-out" className="kt-tr-out st" style={at(0.68)} role="status" aria-live="polite">
          {shown === null ? (
            <span className="kt-mute">{tr.hint}</span>
          ) : (
            <><span>{tr.from} <b>{tr.lines[shown]!.doc}</b> · {tr.lines[shown]!.by}</span><span className="chip chip-illus">{tr.illus}</span></>
          )}
        </p>
      </div>
      <div className="kt-card">
        <svg className="kt-qr" viewBox="-0.5 -0.5 22 22" aria-hidden="true">
          {QR.map((q, i) => (
            <circle key={i} ref={(el) => { qr.current[i] = el; }} className={`qd-${q.k}`} cx={q.x + 0.5} cy={q.y + 0.5} r={q.k === "y" ? 0.62 : 0.4} />
          ))}
        </svg>
        <div className="kt-card-t st" style={at(0.5, 0.2)}>
          <p className="kt-card-h">Product passport record</p>
          <p className="kt-rule">Textile passport <span className="kt-live"><i aria-hidden="true" />Live</span></p>
          <p className="kt-sig">signed · did:web:example.invalid (illustration)</p>
          <p className="kt-mute">Made-up code · Illustration</p>
        </div>
      </div>
      <p className="kt-done st" style={at(0.62, 0.1)}>Product passport record created</p>
      <p className="kt-mute st" style={at(0.8)}>Other rules use the same flow; some are in build.</p>
    </div>,
  ];

  return (
    <section className="band-dark sec how" id="how" aria-labelledby="how-h" data-guide-anchor="how" data-guide-side="r">
      <div ref={pin} className={`how-pin${isStatic ? " is-static" : ""}`}>
        <div className="how-stage container" data-step={step}>
          <div className="how-left">
            <h2 id="how-h" className="t-display-md">{how.title}</h2>
            <ol className="how-steps">
              {how.steps.map((s, i) => (
                <li key={s.t} className={`how-step${i === step ? " is-on" : ""}`}>
                  <h3 className="t-display-sm">{s.t}</h3>
                  <p className="t-body t-soft">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure className="how-right">
            <div className="kt-body">
              {how.steps.map((s, i) => (
                <div key={s.t} ref={(el) => { cards.current[i] = el; }} className="how-card" data-i={i}>{panels[i]}</div>
              ))}
            </div>
            <figcaption className="how-cap">Illustration. Not a real customer or filing.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
