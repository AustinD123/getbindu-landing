import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { theatre as c } from "../content";
import { gsap, SplitText, getLenis, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { THEATRE_STAGES_HTML } from "../lib/theatre-stages";
import type { Theatre as Controller } from "../lib/theatre-fx";

/* Round 39 (r39-2): "Full Circle", in the slot How it works had (id `how`). Ported from the older story page's theatre and restyled to the home tokens.
   Round 40 (r40-1): it is scroll-driven now. One pin; the three acts (The Fabric, The Bean, The Circle) play in order, every scene a pure function of
   the scroll position (it reverses on scroll up). Nothing plays by itself, so there is no play button and the site's pause control has nothing to stop.
   Round 41 (r41-2): the pin plays ONE act at a time (the tabs swap it; The Fabric is the default), 100svh of scroll per scene, scrub smoothed.
   Each scene owns an equal share of the pin (PER svh); the motion plays through the first two thirds of it, the last third holds. The tab row is the
   progress indicator and the jump links (a click scrolls to that act's first scene). The layout differs from the Ask section next to it: the head
   (title and lead left, tabs right), the stage across the whole container, then the current caption in one line with a row of scene dots.
   The motion lives in lib/theatre-fx.ts and is loaded on demand. Phones (767px and under) and reduced motion do not pin: the stage is the composed
   final frame of the current act, every caption is listed, and the tabs still swap the act. */
const SCENES = c.acts.map((a) => a.beats.length);
const MAX = Math.max(...SCENES);   // r41-2: the pin covers ONE act, as long as the longest one; shorter acts hold their last scene
const PER = 100;   // svh of scroll for each scene
const TAU = 0.3;   // s: the smoothed scrub (about 1s to settle), so a small wheel tick moves the scene a little
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
  /* r44-2: the heading and the lead are per act (a buyer question each). The shown act lags the chosen one by the out-animation: the old lines mask out (0.25s), the text
     swaps, the new lines mask in (about 0.5s, the same line mask as lib/headings.ts) and the lead crossfades. Reduced motion: an instant swap. This h2 is skipped by
     lib/headings.ts (data-own), and nothing here runs before hydration. */
  const [shown, setShown] = useState(0);
  const titleEl = useRef<HTMLSpanElement>(null);
  const leadEl = useRef<HTMLParagraphElement>(null);
  const swap = useRef<{ tl: gsap.core.Timeline | null; split: SplitText | null; first: boolean }>({ tl: null, split: null, first: true });
  const swapTo = (i: number) => {
    const s = swap.current, span = titleEl.current, lead = leadEl.current;
    s.tl?.kill(); s.split?.revert(); s.split = null;
    if (isStatic || !span || !lead) { setShown(i); return; }
    s.split = SplitText.create(span, { type: "lines", mask: "lines", maskClass: "h-mask", aria: "none" });
    s.tl = gsap.timeline({ onComplete: () => setShown(i) })
      .to(s.split.lines, { yPercent: -110, duration: 0.25, ease: "power2.in", stagger: 0.04 }, 0)
      .to(lead, { opacity: 0, duration: 0.25, ease: "power1.in" }, 0);
  };
  useLayoutEffect(() => {
    const s = swap.current, span = titleEl.current, lead = leadEl.current;
    if (s.first) { s.first = false; return; }
    if (isStatic || !span || !lead) return;
    s.tl?.kill(); s.split?.revert();
    s.split = SplitText.create(span, { type: "lines", mask: "lines", maskClass: "h-mask", aria: "none" });
    s.tl = gsap.timeline()
      .fromTo(s.split.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "expo.out", stagger: 0.06 }, 0)
      .fromTo(lead, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.1);
  }, [shown, isStatic]);
  useEffect(() => () => { swap.current.tl?.kill(); swap.current.split?.revert(); }, []);

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

  /* the pin: one coalesced reader of the scroll position, eased (r41-2) toward the target so a small wheel tick never runs a whole scene.
     It plays the chosen act only; the tabs swap the act. */
  const actRef = useRef(0);
  const prog = useRef({ cur: 0, last: 0 });
  useEffect(() => { actRef.current = act; }, [act]);
  useEffect(() => {
    const el = pin.current;
    if (!el || !ready || flat) return;
    const tk = track(el);
    let raf = 0, visible = true, lastA = -1, lastS = -1, lastQ = -1;
    const st = prog.current;
    const update = (now: number) => {
      raf = 0;
      if (!visible) return;
      const range = tk.h - (window.innerHeight - 64);
      const target = range > 0 ? clamp((64 - tk.rectTop()) / range) : 0;
      const dt = st.last ? Math.min(0.1, (now - st.last) / 1000) : 0.016;
      st.last = now;
      st.cur += (target - st.cur) * (1 - Math.exp(-dt / TAU));
      if (Math.abs(target - st.cur) < 0.0002) st.cur = target;
      const ai = actRef.current, n = SCENES[ai]!;
      const x = st.cur * MAX, idx = Math.min(MAX - 1, Math.floor(x));
      const si = Math.min(n - 1, idx), local = idx >= n ? 1 : x - idx;
      const q = si + clamp(local / HOLD_AT);
      if (Math.abs(q - lastQ) > 0.0002 || ai !== lastA) { lastQ = q; ctl.current?.at(ai, si, local); }
      lastA = ai;
      if (si !== lastS) { lastS = si; setStep(si); }
      if (st.cur !== target) raf = tRaf(update); else st.last = 0;
    };
    const kick = () => { if (!raf) raf = tRaf(update); };
    const obs = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    obs.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kickRef.current = () => { lastQ = -1; lastS = -1; st.cur = 0; kick(); };
    kick();
    return () => { kickRef.current = () => {}; obs.disconnect(); window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); tCaf(raf); };
  }, [ready, flat]);

  /* a tab: swap the stage to that act's first scene at once, and put the scroll at the pin's start (or, flat, just swap the act) */
  const kickRef = useRef<() => void>(() => {});
  const pick = (i: number) => {
    setAct(i); setStep(0); actRef.current = i;
    if (i !== act || shown !== i) swapTo(i);
    if (flat) return;
    const el = pin.current;
    if (!el) return;
    const tk = track(el);
    const y = tk.top - 64 + 2;
    const l = getLenis();
    if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo({ top: y });
    kickRef.current();
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
      <div ref={pin} className={`th-pin${flat ? " is-flat" : ""}`} style={{ "--th-n": MAX, "--th-per": PER } as CSSProperties}>
        <div className="th-win container">
          <div className="th-head">
            <div className="th-title">
              <p className="th-kicker">{c.title}</p>
              <h2 id="how-h" className="t-display-md" data-own=""><span key={shown} ref={titleEl} className="th-h">{c.acts[shown]!.title}</span></h2>
              <p key={`lead-${shown}`} ref={leadEl} className="t-body-lg t-soft th-lead">{c.acts[shown]!.lead}</p>
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
