import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ask } from "../content";
import { useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";

/* Round 36 (r36-4): "Ask your supply chain", ported from the older story page into the homepage theme. One pinned window: the heading,
   the lead and the five captions on the left edge, the stage on the right. The stage is one idea told in five beats (you ask, the
   question goes out, their data stays with them, a person approves, the signed answer comes back), and it is a pure function of the
   pin's scroll progress, so it reverses on scroll up. Nothing in it runs on its own, so the site's pause control has nothing to stop.
   Yellow = the question and the signed answer; cobalt = the pipes, the relay and the supplier nodes.
   Phones (767px and under): no pin and no stage; the heading, the tabs, one example and the three answer cards (mobile.css).
   Reduced motion: no pin; the stage is the composed final frame as authored below, and the tabs still swap the words.
   The markup is authored in that final frame, so no script, a crawler or reduced motion all get the whole scene. */

/* each beat owns an equal fifth of the pin: the scene plays through the first two thirds of it, then holds (the last third) before the next beat starts */
const HOLD_AT = 2 / 3;
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const frame = (p: number) => { const b = Math.min(4, Math.floor(p * 5)); return (b + clamp((p * 5 - b) / HOLD_AT)) * 0.2; };
const sm = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const io = (x: number) => { const t = clamp(x); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };

/* pipes: the asker's cube at the left, three supplier cubes at the right */
const OUT = ["M 158 190 Q 420 132 678 78", "M 158 190 Q 420 190 708 190", "M 158 190 Q 420 248 678 302"];
const BACK = ["M 678 78 Q 420 132 158 190", "M 708 190 Q 420 190 158 190"];
const NODES = [{ x: 720, y: 70 }, { x: 748, y: 190 }, { x: 720, y: 310 }];

function Env({ cls, answer = false }: { cls: string; answer?: boolean }) {
  return (
    <g className={`qa-env ${cls}`} opacity="0">
      <rect x="-13" y="-8" width="26" height="16" rx="3" />
      <path d="M -13 -8 L 0 4 L 13 -8" fill="none" />
      {answer ? <circle cx="0" cy="0" r="3.6" fill="none" /> : null}
    </g>
  );
}

function Cube({ cls, x, y, children }: { cls: string; x: number; y: number; children?: React.ReactNode }) {
  return (
    <g className={cls} transform={`translate(${x} ${y})`}>
      <polygon className="qa-fl" points="-30,-23 0,-8 0,28 -30,13" />
      <polygon className="qa-fr" points="30,-23 0,-8 0,28 30,13" />
      <polygon className="qa-ft" points="0,-38 30,-23 0,-8 -30,-23" />
      {children}
    </g>
  );
}

export function Ask() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<SVGSVGElement>(null);
  const beats = useRef<HTMLOListElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const isStatic = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(4);
  const prog = useRef(1);
  const redraw = useRef<(() => void) | null>(null);
  const s = ask.scenarios[idx]!;

  useEffect(() => { setPhone(isPhone()); return onPhoneChange(() => setPhone(isPhone())); }, []);

  /* a new scenario changes the words, so the chip is measured again and the frame is redrawn at the same scroll position */
  useLayoutEffect(() => {
    const svg = stage.current;
    if (!svg) return;
    const fit = () => {
      const t = svg.querySelector<SVGTextElement>(".qa-qtext"), r = svg.querySelector<SVGRectElement>(".qa-chip-rect");
      if (t && r && t.getBBox().width > 0) r.setAttribute("width", String(Math.round(t.getBBox().width + 36)));
      redraw.current?.();
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [idx]);

  useEffect(() => {
    const svg = stage.current, el = pin.current;
    if (!svg || !el || isStatic || phone) return;
    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel)!;
    const qa = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll<T>(sel));
    const chip = q<SVGGElement>(".qa-chip"), why = q<SVGTextElement>(".qa-why"), relay = q<SVGGElement>(".qa-relay");
    const approve = q<SVGGElement>(".qa-approve"), decline = q<SVGGElement>(".qa-decline"), answer = q<SVGGElement>(".qa-answer");
    const pipes = qa<SVGPathElement>(".qa-pipe"), backs = qa<SVGPathElement>(".qa-back");
    const outEnv = qa<SVGGElement>(".qa-env-out"), backEnv = qa<SVGGElement>(".qa-env-back");
    const datas = qa<SVGGElement>(".qa-data"), nodeC = q<SVGGElement>(".qa-node-c");
    const clipRect = q<SVGRectElement>("#ask-clip rect");
    const lens = pipes.map((p) => p.getTotalLength()), blens = backs.map((p) => p.getTotalLength());
    pipes.forEach((p) => { p.setAttribute("pathLength", "1"); p.style.strokeDasharray = "1"; });
    chip.setAttribute("clip-path", "url(#ask-clip)");
    const fly = (g: SVGGElement, path: SVGPathElement, len: number, t: number) => {
      const pt = path.getPointAtLength(t * len);
      g.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      g.setAttribute("opacity", (t > 0 && t < 1 ? Math.min(1, t * 10, (1 - t) * 10) : 0).toFixed(2));
    };

    /* one frame, from the scroll progress p alone (0 to 1, five beats of 0.2 each; frame() holds the end of each beat) */
    const draw = (p: number) => {
      // beat 1: the question is written out in the chip
      const w = parseFloat(q<SVGRectElement>(".qa-chip-rect").getAttribute("width") || "0");
      clipRect.setAttribute("width", String((w + 24) * clamp((p - 0.02) / 0.13)));
      why.setAttribute("opacity", String(sm((p - 0.14) / 0.05).toFixed(3)));
      // beat 2: the pipes draw outward with an envelope at the head of each; Bindu appears on the pipe, a relay that stays dark
      pipes.forEach((pp, i) => {
        const t = io((p - 0.2 - i * 0.012) / 0.14);
        pp.style.strokeDashoffset = String((1 - t).toFixed(4));
        fly(outEnv[i]!, pp, lens[i]!, t);
      });
      relay.setAttribute("opacity", String(sm((p - 0.27) / 0.05).toFixed(3)));
      // beat 3: each supplier's data cube nudges at the cube's edge and comes back, it never leaves
      const bt = clamp((p - 0.4) / 0.2);
      datas.forEach((d, i) => d.setAttribute("transform", `translate(${(26 * Math.sin(Math.PI * clamp(bt * 1.25 - i * 0.08))).toFixed(1)} -23)`));
      // beat 4: a person approves what leaves; one supplier says no
      const ap = sm((p - 0.6) / 0.04) * (1 - sm((p - 0.76) / 0.04));
      approve.setAttribute("opacity", ap.toFixed(3));
      approve.setAttribute("transform", `translate(0 ${((1 - ap) * 6).toFixed(1)})`);
      const dc = sm((p - 0.68) / 0.04);
      decline.setAttribute("opacity", dc.toFixed(3));
      nodeC.setAttribute("opacity", (1 - 0.6 * dc).toFixed(3));
      // beat 5: the signed answers come back along the same pipes and compose in the asker's card
      backs.forEach((b, i) => {
        b.setAttribute("opacity", sm((p - 0.8) / 0.02).toFixed(3));
        fly(backEnv[i]!, b, blens[i]!, io((p - 0.8 - i * 0.02) / 0.12));
      });
      const an = sm((p - 0.9) / 0.05);
      answer.setAttribute("opacity", an.toFixed(3));
      answer.setAttribute("transform", `translate(0 ${((1 - an) * 10).toFixed(1)})`);
    };

    const tk = track(el);
    let raf = 0, visible = false, last = -1, lastStep = -1;
    const update = () => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - (window.innerHeight - 64);
      const p = range > 0 ? clamp((64 - tk.rectTop()) / range) : 0;
      prog.current = p;
      const b = Math.min(4, Math.floor(p * 5)), q = frame(p);
      if (Math.abs(q - last) > 0.0002) { last = q; draw(q); }
      beats.current?.style.setProperty("--qa-fill", p.toFixed(4));
      if (b !== lastStep) { lastStep = b; setStep(b); }
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    redraw.current = () => { last = -1; draw(frame(prog.current)); };
    const obs = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    obs.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      obs.disconnect(); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); redraw.current = null;
      // leave the composed final frame behind (reduced motion, a phone, or a remount)
      draw(1); chip.removeAttribute("clip-path"); beats.current?.style.removeProperty("--qa-fill");
      setStep(4);
    };
  }, [isStatic, phone]);

  // the ARIA tab pattern: arrow keys, Home and End move the selection and the focus
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = ask.scenarios.length;
    const moves: Record<string, number> = { ArrowRight: (idx + 1) % n, ArrowLeft: (idx + n - 1) % n, Home: 0, End: n - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    setIdx(moves[e.key]!);
    tabs.current[moves[e.key]!]?.focus();
  };

  return (
    <section className="band-dark sec ask" id="ask" aria-labelledby="ask-h" data-guide-anchor="ask" data-guide-side="r">
      <div ref={pin} className={`qa-pin${isStatic ? " is-static" : ""}`}>
        <div className="qa-win container">
          <div className="qa-head">
            <h2 id="ask-h" className="t-display-md">{ask.title}</h2>
            <p className="t-body-lg t-soft qa-lead">{ask.lead}</p>
          </div>
          <ol ref={beats} className="qa-beats" aria-label="The five steps">
            {ask.beats.map((b, i) => (
              <li key={b} className={`qa-beat${i === step ? " is-on" : i < step ? " is-past" : " is-next"}`} aria-current={i === step ? "step" : undefined}><h3>{b}</h3></li>
            ))}
          </ol>
          <div className="qa-right">
            <div className="seg-track qa-seg">
              <div className="seg-in" role="tablist" aria-label={ask.tabsLabel} onKeyDown={onTabKey} style={{ "--n": ask.scenarios.length, "--i": idx } as CSSProperties}>
                <span className="seg-ind" aria-hidden="true" />
                {ask.scenarios.map((t, i) => (
                  <button
                    key={t.id}
                    ref={(el) => { tabs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`ask-tab-${t.id}`}
                    aria-selected={i === idx}
                    aria-controls="ask-panel"
                    tabIndex={i === idx ? 0 : -1}
                    className={`seg-opt${i === idx ? " is-on" : ""}`}
                    onClick={() => setIdx(i)}
                  >{t.tab}</button>
                ))}
              </div>
            </div>
            <div id="ask-panel" role="tabpanel" aria-labelledby={`ask-tab-${s.id}`} className="qa-panel">
              <svg ref={stage} className="qa-stage" viewBox="0 0 900 380" preserveAspectRatio="xMinYMid meet" role="img" aria-label={ask.stageLabel}>
                <defs>
                  <clipPath id="ask-clip"><rect x="30" y="60" width="520" height="70" /></clipPath>
                </defs>
                {OUT.map((d) => <path key={d} className="qa-pipe" d={d} />)}
                {BACK.map((d) => <path key={d} className="qa-back" d={d} />)}

                <g className="qa-relay">
                  <circle className="qa-puck" cx="420" cy="190" r="23" />
                  <image href="/home/bindu-logo-64.webp" x="400" y="170" width="40" height="40" />
                </g>

                <g>
                  <Cube cls="qa-cube qa-asker" x={110} y={186} />
                  <text className="qa-name" textAnchor="middle" x="110" y="238">{ask.asker}</text>
                  <text className="qa-role" textAnchor="middle" x="110" y="256">{s.asker}</text>
                </g>

                <g className="qa-chip">
                  <rect className="qa-chip-rect" x="44" y="70" width={Math.min(36 + s.q.length * 9.4, 480)} height="38" rx="19" />
                  <text className="qa-qtext" x="62" y="95">{s.q}</text>
                </g>
                <text className="qa-why" x="62" y="134">{s.why}</text>

                {NODES.map((n, i) => (
                  <g key={i} className={`qa-node qa-node-${"abc"[i]}`}>
                    <Cube cls="qa-cube qa-sup" x={n.x} y={n.y}>
                      <g className="qa-data" transform="translate(0 -23)">
                        <polygon className="qa-dl" points="-9,-7.5 0,-3 0,8 -9,3.5" />
                        <polygon className="qa-dr" points="9,-7.5 0,-3 0,8 9,3.5" />
                        <polygon className="qa-dt" points="0,-12 9,-7.5 0,-3 -9,-7.5" />
                      </g>
                    </Cube>
                    <text className="qa-role" textAnchor="middle" x={n.x} y={n.y + 60}>{s.nodes[i]}</text>
                  </g>
                ))}

                <Env cls="qa-env-out" /><Env cls="qa-env-out" /><Env cls="qa-env-out" />
                <Env cls="qa-env-back" answer /><Env cls="qa-env-back" answer />

                <g className="qa-card qa-approve" opacity="0">
                  <rect x="410" y="12" width="262" height="96" rx="12" />
                  <text className="qa-why" x="426" y="38">{ask.learn}</text>
                  <rect className="qa-yes" x="606" y="20" width="52" height="26" rx="13" />
                  <text className="qa-yes-t" textAnchor="middle" x="632" y="38">{ask.yes}</text>
                  <text className="qa-fact" x="426" y="66">{s.ap[0]}</text>
                  <text className="qa-fact" x="426" y="90">{s.ap[1]}</text>
                </g>
                <g className="qa-decline">
                  <circle cx="780" cy="268" r="11" fill="none" />
                  <path d="M 775 263 L 785 273 M 785 263 L 775 273" fill="none" />
                  <text className="qa-why" x="798" y="273">{ask.no}</text>
                </g>

                <g className="qa-card qa-answer">
                  <rect x="40" y="268" width="340" height="106" rx="12" />
                  <text className="qa-fact" x="58" y="294">{s.aw[0]}</text>
                  <text className="qa-ref" x="58" y="318">{s.aw[1]}</text>
                  <text className="qa-ref" x="58" y="338">{s.aw[2]}</text>
                  <text className="qa-signed" x="58" y="362">{ask.signed}</text>
                  <g className="qa-seal"><circle cx="120" cy="358" r="9" /><path d="M 115.5 358 L 119 361.5 L 125 354.5" fill="none" /></g>
                </g>
              </svg>

              {/* the same example as words: for phones (where the stage is dropped) and for screen readers */}
              <div className="qa-ex">
                <p className="qa-ex-q">{s.q}</p>
                <p className="qa-ex-why">{s.why}</p>
                <ul className="qa-ex-a">{s.aw.map((l) => <li key={l}>{l}</li>)}<li>{ask.signed}</li></ul>
              </div>
            </div>
            <p className="cargo-cap qa-cap"><span className="chip chip-illus">{ask.illus}</span><span className="t-caption t-muted">{ask.caption}</span></p>
          </div>
          <div className="qa-cards">
            {ask.cards.map((c) => (
              <article key={c.w} className="qa-card-m">
                <h3 className="t-display-sm">{c.w}</h3>
                <p className="qa-card-l">{c.l}</p>
                <p className="t-body-sm t-soft">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
