import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { theatre as c } from "../content";
import { useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { isPaused, subscribePause } from "../lib/pause";
import { THEATRE_STAGES_HTML } from "../lib/theatre-stages";
import type { Theatre as Controller, TheatreState } from "../lib/theatre-fx";

/* Round 39 (r39-2): "Full Circle", in the slot How it works had (id `how`). Ported from the older story page's theatre and restyled to the home tokens.
   Three acts as a tab row (The Fabric, The Bean, The Circle); pick one and it plays itself while the section is in view. It pauses off screen, with
   the site's pause control (the hero's) and with its own button; a row of scene dots under the stage shows progress and jumps. The captions are one
   column on the left, one per scene, the current one in full ink with the yellow proof dot on a 2px cobalt line (the Ask section's pattern).
   The motion lives in lib/theatre-fx.ts and is loaded on demand. Phones (767px and under) and reduced motion do not play: the stage is the composed
   final frame of the current act, every caption is shown, and the tabs still swap the act. */
export function Theatre() {
  const win = useRef<HTMLDivElement>(null);
  const stages = useRef<HTMLDivElement>(null);
  const beats = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ctl = useRef<Controller | null>(null);
  const isStatic = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState(0);
  const [step, setStep] = useState(0);
  const [st, setSt] = useState<TheatreState>({ playing: false, done: false });
  const flat = isStatic || phone;
  const a = c.acts[act]!;

  useEffect(() => { setPhone(isPhone()); return onPhoneChange(() => setPhone(isPhone())); }, []);

  /* build the timelines once the section is near the screen: the plugins load then, not with the first paint */
  useEffect(() => {
    const el = win.current, host = stages.current;
    if (!el || !host) return;
    let dead = false, watch: IntersectionObserver | null = null, unPause = () => {};
    const load = new IntersectionObserver(([e]) => {
      if (!e!.isIntersecting) return;
      load.disconnect();
      import("../lib/theatre-fx").then(({ buildTheatre }) => {
        if (dead) return;
        const t = buildTheatre(host, {
          onStep: (_a, s) => setStep(s),
          onFill: (f) => { beats.current?.style.setProperty("--th-fill", f.toFixed(4)); if (bar.current) bar.current.style.transform = `scaleX(${f.toFixed(4)})`; },
          onState: setSt,
        });
        ctl.current = t;
        watch = new IntersectionObserver(([w]) => t.setVisible(w!.isIntersecting), { threshold: 0.3 });
        watch.observe(el);
        unPause = subscribePause(() => t.setSitePaused(isPaused()));
        t.setSitePaused(isPaused());
        setReady(true);
      });
    }, { rootMargin: "1200px 0px" });
    load.observe(el);
    return () => {
      dead = true; load.disconnect(); watch?.disconnect(); unPause();
      ctl.current?.destroy(); ctl.current = null; setReady(false);
    };
  }, []);

  /* a new act, or reduced motion or a phone: show it from its first frame (playing) or as its composed final frame (still) */
  useEffect(() => { if (ready) ctl.current?.show(act, flat); }, [ready, act, flat]);

  // the ARIA tab pattern: arrow keys, Home and End move the selection and the focus
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = c.acts.length;
    const moves: Record<string, number> = { ArrowRight: (act + 1) % n, ArrowLeft: (act + n - 1) % n, Home: 0, End: n - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    setAct(moves[e.key]!);
    tabs.current[moves[e.key]!]?.focus();
  };

  return (
    <section className="band-dark sec how th" id="how" aria-labelledby="how-h" data-guide-anchor="how" data-guide-side="r">
      <div ref={win} className={`th-win container${flat ? " is-flat" : ""}`}>
        <div className="th-head">
          <h2 id="how-h" className="t-display-md">{c.title}</h2>
          <p className="t-body-lg t-soft th-lead">{c.lead}</p>
        </div>
        <ol ref={beats} className="th-beats" aria-label={c.stepsLabel}>
          {a.beats.map((b, i) => (
            <li key={b} className={`th-beat${flat ? "" : i === step ? " is-on" : i < step ? " is-past" : " is-next"}`}>
              {flat ? <span>{b}</span> : (
                <button type="button" className="th-beat-btn" aria-current={i === step ? "step" : undefined} onClick={() => ctl.current?.jump(i)}>{b}</button>
              )}
            </li>
          ))}
        </ol>
        <div className="th-right">
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
                  onClick={() => setAct(i)}
                >{t.tab}</button>
              ))}
            </div>
          </div>
          <div id="th-panel" role="tabpanel" aria-labelledby={`th-tab-${a.id}`} className="th-panel">
            <div className="th-stage" data-ready={ready ? "true" : "false"}>
              {/* the stage art is a constant string (lib/theatre-stages.ts); GSAP animates it by id */}
              <div ref={stages} className="th-stages" dangerouslySetInnerHTML={{ __html: THEATRE_STAGES_HTML }} />
            </div>
          </div>
          {flat ? null : (
            <div className="th-controls">
              <button type="button" className="btn btn-outline th-play" onClick={() => ctl.current?.toggle()}>{st.done ? c.replay : st.playing ? c.pause : c.play}</button>
              <div className="th-dots" role="group" aria-label={c.dotsLabel}>
                {a.beats.map((b, i) => (
                  <button key={b} type="button" className={`th-dot${i === step ? " is-on" : ""}`} aria-label={`Scene ${i + 1} of ${a.beats.length}: ${b}`} aria-current={i === step ? "step" : undefined} onClick={() => ctl.current?.jump(i)} />
                ))}
              </div>
              <span className="th-bar" aria-hidden="true"><span ref={bar} /></span>
            </div>
          )}
          <p className="cargo-cap th-cap">
            <span className="chip chip-illus">{c.illus}</span>
            {act === 2 ? <span className="chip chip-build">{c.build}</span> : null}
            <span className="t-caption t-muted">{act === 2 ? `${c.buildNote} ` : ""}{c.caption}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
