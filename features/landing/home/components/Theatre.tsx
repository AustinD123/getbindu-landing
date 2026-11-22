import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { theatre as c } from "../content";
import { getLenis, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { THEATRE_STAGES_HTML } from "../lib/theatre-stages";
import type { Theatre as Controller } from "../lib/theatre-fx";

/* Round 39 (r39-2): "Full Circle", in the slot How it works had (id `how`). Ported from the older story page's theatre and restyled to the home tokens.
   Round 40 (r40-1): it is scroll-driven now. One pin; the three acts (The Fabric, The Bean, The Circle) play in order, every scene a pure function of
   the scroll position (it reverses on scroll up). Nothing plays by itself, so there is no play button and the site's pause control has nothing to stop.
   Each scene owns an equal share of the pin (PER svh); the motion plays through the first two thirds of it, the last third holds. The tab row is the
   progress indicator and the jump links (a click scrolls to that act's first scene). The layout differs from the Ask section next to it: the head
   (title and lead left, tabs right), the stage across the whole container, then the current caption in one line with a row of scene dots.
   The motion lives in lib/theatre-fx.ts and is loaded on demand. Phones (767px and under) and reduced motion do not pin: the stage is the composed
   final frame of the current act, every caption is listed, and the tabs still swap the act. */
const SCENES = c.acts.map((a) => a.beats.length);
const TOTAL = SCENES.reduce((n, k) => n + k, 0);
const STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((n, k) => n + k, 0));
const PER = 55;   // svh of scroll for each scene
const HOLD_AT = 2 / 3;
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

export function Theatre() {
  const pin = useRef<HTMLDivElement>(null);
  const stages = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ctl = useRef<Controller | null>(null);
  const isStatic = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState(0);
  const [step, setStep] = useState(0);
  const flat = isStatic || phone;
  const a = c.acts[act]!;

  useEffect(() => { setPhone(isPhone()); return onPhoneChange(() => setPhone(isPhone())); }, []);

  /* build the timelines once the section is near the screen: the plugins load then, not with the first paint */
  useEffect(() => {
    const el = pin.current, host = stages.current;
    if (!el || !host) return;
    let dead = false;
    const load = new IntersectionObserver(([e]) => {
      if (!e!.isIntersecting) return;
      load.disconnect();
      import("../lib/theatre-fx").then(({ buildTheatre }) => {
        if (dead) return;
        ctl.current = buildTheatre(host);
        setReady(true);
      });
    }, { rootMargin: "1200px 0px" });
    load.observe(el);
    return () => { dead = true; load.disconnect(); ctl.current?.destroy(); ctl.current = null; setReady(false); };
  }, []);

  /* reduced motion or a phone: the composed final frame of the chosen act */
  useEffect(() => { if (ready && flat) ctl.current?.still(act); }, [ready, flat, act]);

  /* the pin: one coalesced reader of the scroll position, nothing else */
  useEffect(() => {
    const el = pin.current;
    if (!el || !ready || flat) return;
    const tk = track(el);
    let raf = 0, visible = true, lastA = -1, lastS = -1, lastQ = -1;
    const update = () => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - (window.innerHeight - 64);
      const p = range > 0 ? clamp((64 - tk.rectTop()) / range) : 0;
      const x = p * TOTAL, idx = Math.min(TOTAL - 1, Math.floor(x)), local = x - idx;
      let ai = 0;
      STARTS.forEach((s, i) => { if (s <= idx) ai = i; });
      const si = idx - STARTS[ai]!;
      const q = idx + clamp(local / HOLD_AT);
      if (Math.abs(q - lastQ) > 0.0002 || ai !== lastA) { lastQ = q; ctl.current?.at(ai, si, local); }
      if (ai !== lastA) { lastA = ai; setAct(ai); }
      if (si !== lastS) { lastS = si; setStep(si); }
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    const obs = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    obs.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => { obs.disconnect(); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); };
  }, [ready, flat]);

  /* a tab: scroll to that act's first scene (or, flat, swap the act) */
  const pick = (i: number) => {
    if (flat) { setAct(i); setStep(0); return; }
    const el = pin.current;
    if (!el) return;
    const tk = track(el);
    const range = tk.h - (window.innerHeight - 64);
    const y = tk.top - 64 + range * (STARTS[i]! / TOTAL) + 2;
    const l = getLenis();
    if (l) l.scrollTo(y, { duration: 1.2 }); else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // the ARIA tab pattern: arrow keys, Home and End move the focus; Enter or Space (a click) goes to the act
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = c.acts.length;
    const moves: Record<string, number> = { ArrowRight: (act + 1) % n, ArrowLeft: (act + n - 1) % n, Home: 0, End: n - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    tabs.current[moves[e.key]!]?.focus();
  };

  return (
    <section className="band-dark sec how th" id="how" aria-labelledby="how-h" data-guide-anchor="how" data-guide-side="r">
      <div ref={pin} className={`th-pin${flat ? " is-flat" : ""}`} style={{ "--th-n": TOTAL, "--th-per": PER } as CSSProperties}>
        <div className="th-win container">
          <div className="th-head">
            <div className="th-title">
              <h2 id="how-h" className="t-display-md">{c.title}</h2>
              <p className="t-body-lg t-soft th-lead">{c.lead}</p>
            </div>
            <div className="seg-track th-seg">
              <div className="seg-in" role="tablist" aria-label={c.tabsLabel} onKeyDown={onTabKey} style={{ "--n": c.acts.length, "--i": act } as CSSProperties}>
                <span className="seg-ind" aria-hidden="true" />
                {c.acts.map((t, i) => (
                  <button
                    key={t.id}
                    ref={(el) => { tabs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`th-tab-${t.id}`}
                    aria-selected={i === act}
                    aria-controls="th-panel"
                    tabIndex={i === act ? 0 : -1}
                    className={`seg-opt${i === act ? " is-on" : ""}`}
                    onClick={() => pick(i)}
                  >{t.tab}</button>
                ))}
              </div>
            </div>
          </div>
          <div id="th-panel" role="tabpanel" aria-labelledby={`th-tab-${a.id}`} className="th-panel">
            <div className="th-stage" data-ready={ready ? "true" : "false"}>
              {/* the stage art is a constant string (lib/theatre-stages.ts); GSAP animates it by id */}
              <div ref={stages} className="th-stages" dangerouslySetInnerHTML={{ __html: THEATRE_STAGES_HTML }} />
            </div>
          </div>
          {flat ? (
            <ol className="th-beats" aria-label={c.stepsLabel}>
              {a.beats.map((b) => <li key={b} className="th-beat">{b}</li>)}
            </ol>
          ) : (
            <div className="th-capbar">
              <p key={`${act}-${step}`} className="th-now" aria-live="polite">{a.beats[step]}</p>
              <ol className="th-dots" aria-label={c.dotsLabel}>
                {a.beats.map((b, i) => <li key={b} aria-hidden="true" className={`th-dot${i === step ? " is-on" : i < step ? " is-past" : ""}`} />)}
              </ol>
            </div>
          )}
          <p className="cargo-cap th-cap">
            <span className="chip chip-illus">{c.illus}</span>
            {act === 2 ? <span className="chip chip-live">{c.live}</span> : null}
            <span className="t-caption t-muted">{c.caption}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
