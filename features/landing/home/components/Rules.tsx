import { useEffect, useRef, useState } from "react";
import { rules as c } from "../content";
import { NAV_REGULATIONS } from "../links";
import { gsap, ScrollTrigger, getLenis, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { isPending, onReady } from "../lib/ready";
import { BtnLabel } from "./bits";

/* Round 56 item 7: "The rules Bindu covers" (id `rules`) as a filing drawer. The five rules are five document folders standing in a row in a drawer, each with a labelled tab
   (the regulation number, in mono). The section pins; one GSAP ScrollTrigger timeline, scrubbed (so it reverses): each folder in turn lifts up out of the drawer and its card
   (name, what it asks for, goods, status chip, source, "Read the rule") rises out of it and opens above the drawer; as the next folder lifts the card sinks and the folder slides
   back. The last folder stays open. One motion idea only. Cobalt for the drawer lines, yellow only on the Live chip. A folder is a button: it scrolls to its own moment.
   GSAP owns every hidden state (the cards are made visible and hidden by the timeline, never by CSS). Phones, reduced motion, short windows and no JS: no pin, the five folders
   as a stacked list with every card open. Statuses, regulation numbers and source links are the brief's, unchanged. */
const linkOf = (name: string) => NAV_REGULATIONS.find((l) => l.t === name)?.u ?? "/";
const MIN_H = 680;   // a window shorter than this cannot hold the head, a card and the drawer, so it gets the stacked list
const LIFT = 34;     // px a folder lifts out of the drawer

export function Rules() {
  const reduced = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [short, setShort] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pin = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const folders = useRef<(HTMLLIElement | null)[]>([]);
  const pinned = mounted && !reduced && !phone && !short;
  const n = c.items.length;

  useEffect(() => {
    setMounted(true);
    const sync = () => { setPhone(isPhone()); setShort(window.innerHeight < MIN_H); };
    sync();
    window.addEventListener("resize", sync);
    const off = onPhoneChange(sync);
    return () => { window.removeEventListener("resize", sync); off(); };
  }, []);

  useEffect(() => {
    const p = pin.current;
    if (!pinned || !p) return;
    const fs = folders.current.slice() as HTMLLIElement[];   // a snapshot: the ref slots go null on unmount, before cleanup
    const bodies = fs.map((f) => f.querySelector<HTMLElement>(".rl-fbody")!);
    const cards = fs.map((f) => f.querySelector<HTMLElement>(".rl-card")!);
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    fs.forEach((_, i) => {
      const t0 = i;
      tl.fromTo(bodies[i]!, { y: 0 }, { y: -LIFT, duration: 0.3 }, t0);
      tl.fromTo(cards[i]!, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t0 + 0.1);
      if (i < fs.length - 1) {
        tl.to(cards[i]!, { autoAlpha: 0, y: -24, duration: 0.2, ease: "power2.in" }, t0 + 0.8);
        tl.to(bodies[i]!, { y: 0, duration: 0.25, ease: "power2.in" }, t0 + 0.78);
      }
    });
    tl.to({}, { duration: 0.001 }, fs.length - 0.001);   // exactly n units long, so the last folder holds
    let act = -1;
    const mark = (t: number) => {
      const a = Math.min(fs.length - 1, Math.max(0, Math.floor(t + 0.15)));
      if (a === act) return;
      act = a;
      fs.forEach((f, i) => { f.classList.toggle("is-open", i === a); bodies[i]!.setAttribute("aria-pressed", i === a ? "true" : "false"); });
    };
    mark(0);
    const st = ScrollTrigger.create({
      animation: tl, trigger: p, start: "top 64px", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true,
      onUpdate: () => mark(tl.time()),
    });
    // a folder is a button: it scrolls to the moment its card is open
    const go = (i: number) => {
      const y = st.start + ((i + 0.55) / fs.length) * (st.end - st.start);
      const l = getLenis();
      if (l) l.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y, behavior: "smooth" });
    };
    const clicks = bodies.map((b, i) => { const h = () => go(i); b.addEventListener("click", h); return h; });
    // a re-measure once the layout is final (the section hydrates late, with sections above it still settling)
    const refresh = () => { if (!isPending(p)) ScrollTrigger.refresh(); };
    const fonts = document.fonts?.ready.then(refresh);
    void fonts;
    const offReady = onReady(refresh);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      offReady(); cancelAnimationFrame(raf);
      bodies.forEach((b, i) => b.removeEventListener("click", clicks[i]!));
      st.kill(); tl.kill();
      gsap.set([...bodies, ...cards], { clearProps: "transform,opacity,visibility" });
      fs.forEach((f) => f.classList.remove("is-open"));
    };
  }, [pinned]);

  return (
    <section className="band-dark sec rl" id="rules" aria-labelledby="rl-h">
      <div ref={pin} className={`rl-pin${pinned ? " is-pinned" : " is-native"}`} style={pinned ? { height: `calc(100svh + ${n} * 62svh)` } : undefined}>
        <div ref={win} className="rl-win">
          <div className="container rl-head">
            <h2 id="rl-h" className="t-display-lg">{c.title}</h2>
          </div>
          <ul className="rl-drawer" aria-label={c.label}>
            {c.items.map((r, i) => (
              <li key={r.id} ref={(el) => { folders.current[i] = el; }} className="rl-folder" style={{ "--i": i } as React.CSSProperties}>
                <button type="button" className="rl-fbody" tabIndex={pinned ? 0 : -1} aria-label={`${r.t}, ${r.reg}`} aria-pressed="false">
                  <span className="rl-tab">{r.reg}</span>
                  <span className="rl-front" aria-hidden="true">
                    <span className="rl-ft">{r.t}</span>
                    <span className="rl-ff">{r.full}</span>
                  </span>
                </button>
                <article className="rl-card">
                  <div className="rl-main">
                    <p className="rl-ref">{r.reg}</p>
                    <h3 className="rl-t t-display-md">{r.t}</h3>
                    <p className="rl-full">{r.full}</p>
                    <p className="rl-d">{r.d}</p>
                  </div>
                  <div className="rl-side">
                    <dl className="rl-dl">
                      <div><dt>{c.covers}</dt><dd>{r.covers}</dd></div>
                      {r.date ? <div><dt>Dates</dt><dd>{r.date}</dd></div> : null}
                    </dl>
                    <ul className="rl-chips">{r.chips.map((k) => <li key={k.t} className={`chip ${k.live ? "chip-live" : "chip-build"}`}>{k.t}</li>)}</ul>
                    <a className="rl-src" href={r.src.u} target="_blank" rel="noopener noreferrer">{c.source}: {r.src.t}</a>
                    <a className="btn btn-secondary rl-read" href={linkOf(r.link)} aria-label={`${c.read}: ${r.t}`}><BtnLabel>{c.read}</BtnLabel></a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
