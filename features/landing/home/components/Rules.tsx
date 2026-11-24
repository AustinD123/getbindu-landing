import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { rules as c } from "../content";
import { NAV_REGULATIONS } from "../links";
import { gsap, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";

/* Round 44 (r44-6): "The rules Bindu covers" (id `rules`), a minimal draggable carousel of one typographic tile per rule: no icons, the name, one plain sentence, the goods it
   covers, a status chip exactly as in the brief and "Read the rule" linking to the matching regulation page. The active tile is full contrast, its neighbours peek and dim.
   Without JS, on phones and on reduced motion it is a native scroller with scroll snap (a swipe drags, a tap follows the link, no momentum). Otherwise (wide screens) the
   track is moved by transform from the pointer: weighted momentum on release (the throw is the release velocity), a slight tilt of the tiles while it moves, a snap to a
   tile. A sideways wheel or trackpad swipe moves it too; a vertical wheel is never touched, so the page always scrolls. Arrow buttons and the arrow keys step one tile. */
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const FLAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/* r47: the departures-board flip (same idea as components/Examples.tsx, whose helper is private): a few other characters, then its own, left to right */
const flapChar = (ch: string, j: number, len: number, r: number) => {
  if (r <= 0) return "";
  if (r >= 0.25 + 0.6 * (j / Math.max(1, len))) return ch;
  if (!/[A-Z0-9]/.test(ch)) return ch;
  return FLAP[(Math.floor(r * 26) * 7 + j * 5 + ch.charCodeAt(0)) % FLAP.length]!;
};
const linkOf = (name: string) => NAV_REGULATIONS.find((l) => l.t === name)?.u ?? "/";

export function Rules() {
  const reduced = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const view = useRef<HTMLDivElement>(null);
  const trk = useRef<HTMLUListElement>(null);
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const lane = useRef<HTMLDivElement>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const drag = mounted && !reduced && !phone;

  useEffect(() => { setMounted(true); setPhone(isPhone()); return onPhoneChange(() => setPhone(isPhone())); }, []);

  /* native mode: the active tile is the one at the left edge of the scroller */
  useEffect(() => {
    const v = view.current;
    if (drag || !v) return;
    const onScroll = () => {
      const pad = parseFloat(getComputedStyle(trk.current!).paddingLeft) || 0, ts = tiles.current as HTMLLIElement[];
      let best = 0;
      ts.forEach((t, i) => { if (Math.abs(t.offsetLeft - pad - v.scrollLeft) < Math.abs(ts[best]!.offsetLeft - pad - v.scrollLeft)) best = i; });
      setActive(best);
    };
    v.addEventListener("scroll", onScroll, { passive: true });
    goRef.current = (i) => { tiles.current[i]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "start", block: "nearest" }); };
    return () => { v.removeEventListener("scroll", onScroll); goRef.current = () => {}; };
  }, [drag, reduced]);

  useEffect(() => {
    const v = view.current, t = trk.current;
    if (!drag || !v || !t) return;
    v.scrollLeft = 0;
    const ts = tiles.current.slice() as HTMLLIElement[];   // a snapshot: the ref slots go null on unmount, before cleanup
    const st = { x: 0 };
    let snaps: number[] = [], max = 0, raf = 0, tilt = 0, lastX = 0, lastT = 0, vel = 0, tw: gsap.core.Tween | null = null, idle = 0, act = -1;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(t).paddingLeft) || 0;
      max = Math.max(0, t.scrollWidth - v.clientWidth);
      snaps = ts.map((el) => clamp(el.offsetLeft - pad, 0, max));
      st.x = clamp(st.x, -max, 0);
    };
    const nearest = (x: number) => { let b = 0; snaps.forEach((s, i) => { if (Math.abs(s + x) < Math.abs(snaps[b]! + x)) b = i; }); return b; };
    const paintActive = () => {
      const a = nearest(st.x);
      if (a === act) return;
      act = a; setActive(a);
      gsap.to(ts, { opacity: (i: number) => (i === a ? 1 : 0.62), duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const apply = () => {
      raf = 0;
      const now = performance.now(), dt = Math.max(1, now - lastT);
      vel = (st.x - lastX) / (dt / 1000); lastX = st.x; lastT = now;
      tilt += (clamp(-vel * 0.004, -7, 7) - tilt) * 0.2;   // a slight turn away from the direction of travel
      gsap.set(t, { x: st.x });
      gsap.set(ts, { rotationY: tilt, transformPerspective: 900 });
      paintActive();
      if (Math.abs(tilt) > 0.05 || tw || down) raf = tRaf(apply);
      else gsap.set(ts, { rotationY: 0 });
    };
    const kick = () => { if (!raf) { lastT = performance.now(); raf = tRaf(apply); } };
    const snapTo = (i: number, fast = false) => {
      const to = -snaps[clamp(i, 0, snaps.length - 1)]!;
      tw?.kill();
      tw = gsap.to(st, { x: to, duration: fast ? 0.45 : clamp(Math.abs(to - st.x) / 1600 + 0.45, 0.5, 1.1), ease: "power3.out", onComplete: () => { tw = null; } });
      kick();
    };
    goRef.current = (i) => snapTo(i);

    let down = false, sx = 0, sxx = 0, moved = 0, dragging = false, pid = -1, vx = 0, px = 0, pt = 0;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      down = true; dragging = false; moved = 0; sx = e.clientX; sxx = st.x; px = e.clientX; pt = performance.now(); vx = 0; pid = e.pointerId;
      tw?.kill(); tw = null;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      const dx = e.clientX - sx;
      if (!dragging && Math.abs(dx) < 6) return;
      if (!dragging) { dragging = true; v.setPointerCapture(pid); v.classList.add("is-drag"); }
      moved = Math.max(moved, Math.abs(dx));
      const now = performance.now();
      vx = vx * 0.6 + ((e.clientX - px) / Math.max(1, now - pt)) * 1000 * 0.4;
      px = e.clientX; pt = now;
      // past either end the track gives (a third of the pull), and settles back on release
      const raw = sxx + dx;
      st.x = raw > 0 ? raw / 3 : raw < -max ? -max + (raw + max) / 3 : raw;
      kick();
    };
    const onUp = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      down = false;
      if (!dragging) return;
      dragging = false; v.classList.remove("is-drag");
      try { v.releasePointerCapture(pid); } catch { /* already released */ }
      const stale = performance.now() - pt > 100;
      const proj = st.x + (stale ? 0 : clamp(vx, -3000, 3000) * 0.32);   // the throw: what the release speed would carry it
      snapTo(nearest(clamp(proj, -max, 0)));
      window.setTimeout(() => { moved = 0; }, 0);
    };
    const onClick = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.2) return;   // a vertical wheel is never taken
      e.preventDefault();
      tw?.kill(); tw = null;
      st.x = clamp(st.x - e.deltaX, -max, 0);
      kick();
      window.clearTimeout(idle);
      idle = window.setTimeout(() => snapTo(nearest(st.x), true), 140);
    };
    const onResize = () => { measure(); gsap.set(t, { x: st.x }); paintActive(); };
    measure();
    gsap.set(ts, { opacity: (i: number) => (i === 0 ? 1 : 0.62) });
    act = 0; setActive(0);
    v.addEventListener("pointerdown", onDown); v.addEventListener("pointermove", onMove); v.addEventListener("pointerup", onUp); v.addEventListener("pointercancel", onUp);
    v.addEventListener("click", onClick, true); v.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      tw?.kill(); tCaf(raf); window.clearTimeout(idle);
      v.removeEventListener("pointerdown", onDown); v.removeEventListener("pointermove", onMove); v.removeEventListener("pointerup", onUp); v.removeEventListener("pointercancel", onUp);
      v.removeEventListener("click", onClick, true); v.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      goRef.current = () => {};
      gsap.killTweensOf(ts);
      gsap.set([t, ...ts], { clearProps: "transform,opacity" });
    };
  }, [drag]);

  /* r47: the one motion idea. The active tile's regulation number flips in on split-flap letters, its status dots pulse once, and a cobalt lane under the carousel carries a yellow dot to its place. */
  useEffect(() => {
    if (!mounted) return;
    const ln = lane.current;
    const dot = ln?.querySelector<HTMLElement>(".rl-pos");
    const place = (dur: number) => {
      const tk = ln?.querySelectorAll<HTMLElement>(".rl-tick")[active];
      if (dot && tk) gsap.to(dot, { x: tk.offsetLeft - dot.offsetWidth / 2 + 1, duration: reduced ? 0 : dur, ease: "power3.out", overwrite: "auto" });
    };
    place(0.55);
    const onResize = () => place(0);
    window.addEventListener("resize", onResize);
    const tile = tiles.current[active];
    const chars = Array.from(tile?.querySelectorAll<HTMLElement>(".rl-ref .fl") ?? []);
    const finals = chars.map((el) => el.textContent ?? "");
    const restore = () => chars.forEach((el, j) => { el.textContent = finals[j]!; el.classList.remove("is-blank"); });
    let tw: gsap.core.Tween | null = null;
    if (!reduced && chars.length) {
      const o = { r: 0 };
      tw = gsap.to(o, { r: 1, duration: 0.75, ease: "none", onUpdate: () => chars.forEach((el, j) => { el.textContent = flapChar(finals[j]!, j, chars.length, o.r); }), onComplete: restore });
      gsap.fromTo(tile!.querySelectorAll(".rl-dot"), { scale: 1.9 }, { scale: 1, duration: 0.6, ease: "back.out(2)", delay: 0.35, overwrite: "auto" });
    }
    return () => { window.removeEventListener("resize", onResize); tw?.kill(); restore(); };
  }, [active, mounted, reduced]);

  const step = (d: number) => goRef.current(clamp(active + d, 0, c.items.length - 1));
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  return (
    <section className="band-dark sec rl" id="rules" aria-labelledby="rl-h">
      <div className="container rl-head">
        <h2 id="rl-h" className="t-display-md">{c.title}</h2>
        <div className="rl-ctrl">
          <button type="button" className="rl-btn" aria-label={c.prev} disabled={active <= 0} onClick={() => step(-1)}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M10 3 5 8l5 5" /></svg></button>
          <button type="button" className="rl-btn" aria-label={c.next} disabled={active >= c.items.length - 1} onClick={() => step(1)}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="m6 3 5 5-5 5" /></svg></button>
        </div>
      </div>
      <div ref={view} className={`rl-view${drag ? " is-drag-mode" : ""}`} role="group" aria-roledescription="carousel" aria-label={c.label} tabIndex={0} onKeyDown={onKey}>
        <ul ref={trk} className="rl-track">
          {c.items.map((r, i) => (
            <li key={r.id} ref={(el) => { tiles.current[i] = el; }} className={`rl-tile${i === active ? " is-on" : ""}`}>
              <p className="rl-ref" aria-hidden="true">
                <span className="rl-flaps">{r.reg.split("").map((ch, j) => (ch === " " ? <span key={j} className="fl-sp" /> : <span key={j} className="fl">{ch}</span>))}</span>
                <span className="rl-dots">{r.chips.map((k) => <i key={k.t} className={`rl-dot ${k.live ? "is-live" : "is-build"}`} />)}</span>
              </p>
              <p className="rl-full">{r.full}</p>
              <h3 className="rl-t t-display-sm">{r.t}</h3>
              <p className="rl-d">{r.d}</p>
              <dl className="rl-dl">
                <div><dt>{c.covers}</dt><dd>{r.covers}</dd></div>
                {r.date ? <div><dt>Dates</dt><dd>{r.date}</dd></div> : null}
              </dl>
              <ul className="rl-chips">{r.chips.map((k) => <li key={k.t} className={`chip ${k.live ? "chip-live" : "chip-build"}`}>{k.t}</li>)}</ul>
              <p className="rl-links">
                <a className="rl-read" href={linkOf(r.link)} draggable={false}>{c.read}<span className="sr"> {r.t}</span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M3 8h9M8.5 4 12.5 8 8.5 12" /></svg></a>
                <a className="rl-src" href={r.src.u} target="_blank" rel="noopener noreferrer" draggable={false}>{c.source}: {r.src.t}</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div ref={lane} className="container rl-lane" aria-hidden="true">
        {c.items.map((r) => <span key={r.id} className="rl-tick"><i className="rl-tk" /><b>{r.t.includes("(") ? "DPP" : r.t}</b></span>)}
        <i className="rl-pos" />
      </div>
      <p className="container t-caption t-muted rl-hint">{c.hint}</p>
    </section>
  );
}
