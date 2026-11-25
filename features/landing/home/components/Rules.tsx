import { useEffect, useRef, useState } from "react";
import { rules as c } from "../content";
import { NAV_REGULATIONS } from "../links";
import { gsap, ScrollTrigger, getLenis, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { isPending, onReady } from "../lib/ready";
import { BtnLabel } from "./bits";

/* Round 52 item 3: "The rules Bindu covers" (id `rules`). The section pins and the vertical scroll moves the row of five tiles sideways (GSAP ScrollTrigger, scrubbed, so it
   reverses with the scroll). The tile nearest the reading position is full ink, the others sit at the mute colour (text only, the panels stay). One idea, nothing else moves:
   no drag, tilt, snap, arrows, hint, flaps or lane. Phones, reduced motion, short windows and no JS: no pin, a native horizontal scroll-snap row of the same tiles.
   A tile's links stay real links; focusing one scrolls the page so that tile is in view. */
const linkOf = (name: string) => NAV_REGULATIONS.find((l) => l.t === name)?.u ?? "/";
const MIN_H = 680;   // a window shorter than this cannot hold a tile and the heading, so it gets the native row
const DIM = 0.62;

export function Rules() {
  const reduced = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [short, setShort] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pin = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const trk = useRef<HTMLUListElement>(null);
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const pinned = mounted && !reduced && !phone && !short;

  useEffect(() => {
    setMounted(true);
    const sync = () => { setPhone(isPhone()); setShort(window.innerHeight < MIN_H); };
    sync();
    window.addEventListener("resize", sync);
    const off = onPhoneChange(sync);
    return () => { window.removeEventListener("resize", sync); off(); };
  }, []);

  useEffect(() => {
    const p = pin.current, v = view.current, t = trk.current;
    if (!pinned || !p || !v || !t) return;
    const ts = tiles.current.slice() as HTMLLIElement[];   // a snapshot: the ref slots go null on unmount, before cleanup
    const bodies = ts.map((el) => el.querySelector<HTMLElement>(".rl-body")!);
    let travel = 0, act = -1;
    const measure = () => { travel = Math.max(0, t.scrollWidth - v.clientWidth); return -travel; };
    const paint = (prog: number) => {
      const a = Math.round(prog * (ts.length - 1));
      if (a === act) return;
      act = a;
      gsap.to(bodies, { opacity: (i: number) => (i === a ? 1 : DIM), duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    gsap.set(bodies, { opacity: (i: number) => (i === 0 ? 1 : DIM) });
    const tw = gsap.to(t, { x: () => measure(), ease: "none" });
    const st = ScrollTrigger.create({
      animation: tw, trigger: p, start: "top 64px", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true,
      onUpdate: (self) => paint(self.progress),
    });
    // focusing a tile's link brings that tile to the reading position
    const onFocus = (e: FocusEvent) => {
      const i = ts.findIndex((el) => el.contains(e.target as Node));
      if (i < 0 || !travel) return;
      const y = st.start + (i / (ts.length - 1)) * (st.end - st.start);
      const l = getLenis();
      if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo({ top: y, behavior: "auto" });
    };
    t.addEventListener("focusin", onFocus);
    /* r55-7: the trigger is made after the section hydrates, when sections above may still be settling; re-measure once the layout is final (fonts, late sections, the next frame) */
    const refresh = () => { if (!isPending(p)) ScrollTrigger.refresh(); };
    const fonts = document.fonts?.ready.then(refresh);
    void fonts;
    const offReady = onReady(refresh);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      offReady(); cancelAnimationFrame(raf);
      t.removeEventListener("focusin", onFocus);
      st.kill(); tw.kill();
      gsap.killTweensOf(bodies);
      gsap.set([t, ...bodies], { clearProps: "transform,opacity" });
    };
  }, [pinned]);

  return (
    <section className="band-dark sec rl" id="rules" aria-labelledby="rl-h">
      <div ref={pin} className={`rl-pin${pinned ? " is-pinned" : " is-native"}`}>
        <div className="rl-win">
          <div className="container rl-head">
            <h2 id="rl-h" className="t-display-lg">{c.title}</h2>
          </div>
          <div ref={view} className="rl-view" role="group" aria-roledescription="carousel" aria-label={c.label}>
            <ul ref={trk} className="rl-track">
              {c.items.map((r, i) => (
                <li key={r.id} ref={(el) => { tiles.current[i] = el; }} className="rl-tile">
                  <div className="rl-body">
                    <p className="rl-ref">{r.reg}</p>
                    <h3 className="rl-t t-display-sm">{r.t}</h3>
                    <p className="rl-full">{r.full}</p>
                    <p className="rl-d">{r.d}</p>
                    <dl className="rl-dl">
                      <div><dt>{c.covers}</dt><dd>{r.covers}</dd></div>
                    </dl>
                    <ul className="rl-chips">{r.chips.map((k) => <li key={k.t} className={`chip ${k.live ? "chip-live" : "chip-build"}`}>{k.t}</li>)}</ul>
                    {r.date ? <dl className="rl-dl"><div><dt>Dates</dt><dd>{r.date}</dd></div></dl> : null}
                    <a className="rl-src" href={r.src.u} target="_blank" rel="noopener noreferrer">{c.source}: {r.src.t}</a>
                  </div>
                  <a className="btn btn-secondary rl-read" href={linkOf(r.link)} aria-label={`${c.read}: ${r.t}`}><BtnLabel>{c.read}</BtnLabel></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
