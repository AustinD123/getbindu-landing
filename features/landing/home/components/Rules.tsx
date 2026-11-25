import { useEffect, useRef, useState, type CSSProperties } from "react";
import { rules as c } from "../content";
import { NAV_REGULATIONS } from "../links";
import { gsap, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";

/* Round 57: "The rules Bindu covers" (id `rules`), an infinite, minimal gallery (reference: Daydream's infinite scrolling gallery on Awwwards, made quieter). Not pinned. A centred
   title and one line, then ONE endless row of the five type-only rule tiles, shown three times so it never ends (the copies are rendered once when the section hydrates; the loop
   wraps one transform, nothing is cloned while scrolling). The row drifts by itself (DRIFT px/s). The page's scroll velocity is added to the drift (faster scroll, faster row, then it
   eases back) and while the row runs fast every tile bends: skewX up to MAX_BEND degrees (the shape of a page being flicked), a little rotation, and the ghost number slides inside the
   tile. At rest everything is flat. Drag and a sideways wheel move it with momentum. Hovering a tile pauses the drift and lifts its name to ink (the others go mute); focus does the
   same and scrolls the focused tile to the middle; arrow keys step one tile. GSAP ticker, one quickSetter per tile and per ghost, transforms only; the ticker stops off screen. The
   duplicate tiles are aria-hidden with unfocusable links, so a screen reader reads the five rules once. Phones, reduced motion and the first paint: a native horizontal scroll-snap
   row of the five tiles (no loop, no drift, no bend). Content, statuses, regulation numbers, dates and source links are the brief's, unchanged. */
const linkOf = (name: string) => NAV_REGULATIONS.find((l) => l.t === name)?.u ?? "/";
const DRIFT = 20;        // px per second, on its own
const MAX_BEND = 8;      // degrees of skew at full speed
const FULL = 1400;       // px/s of total speed that counts as "full speed" for the bend
const COPIES = 3;        // the row is the five tiles three times

type Item = (typeof c.items)[number];
const ghostLines = (reg: string) => reg.split(/[\s/]+/).filter(Boolean);

function Tile({ r, copy }: { r: Item; copy: boolean }) {
  const lines = ghostLines(r.reg);
  return (
    <li className="rl-tile" aria-hidden={copy ? true : undefined}>
      <span className="rl-ghost" aria-hidden="true">{lines.map((l, i) => <span key={i}>{l}</span>)}</span>
      <div className="rl-over">
        <div className="rl-top">
          <span className="sr">{r.reg}. </span>
          <h3 className="rl-t">{r.t}</h3>
          <p className="rl-full">{r.full}</p>
        </div>
        <div className="rl-bot">
          <p className="rl-d">{r.d}</p>
          <p className="rl-cov"><span>{c.covers}: </span>{r.covers}</p>
          {r.date ? <p className="rl-date">{r.date}</p> : null}
          <ul className="rl-chips">{r.chips.map((k) => <li key={k.t} className={`chip ${k.live ? "chip-live" : "chip-build"}`}>{k.t}</li>)}</ul>
          <p className="rl-links">
            <a className="rl-read" href={linkOf(r.link)} tabIndex={copy ? -1 : undefined} aria-label={`${c.read}: ${r.t}`}>{c.read}</a>
            <a className="rl-src" href={r.src.u} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined}>{c.source}: {r.src.t}</a>
          </p>
        </div>
      </div>
    </li>
  );
}

export function Rules() {
  const reduced = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [stopped, setStopped] = useState(false);   // r61-3: the user's pause for the drift (WCAG 2.2.2)
  const stoppedRef = useRef(false);
  stoppedRef.current = stopped;
  const loop = mounted && !reduced && !phone;

  useEffect(() => {
    setMounted(true);
    const sync = () => setPhone(isPhone());
    sync();
    const off = onPhoneChange(sync);
    return () => off();
  }, []);

  useEffect(() => {
    const v = view.current, t = track.current;
    if (!loop || !v || !t) return;
    const n = c.items.length;
    const tiles = Array.from(t.querySelectorAll<HTMLElement>(".rl-tile"));
    const ghosts = tiles.map((el) => el.querySelector<HTMLElement>(".rl-ghost")!);
    const setX = gsap.quickSetter(t, "x", "px");
    const skew = tiles.map((el) => gsap.quickSetter(el, "skewX", "deg"));
    const rot = tiles.map((el) => gsap.quickSetter(el, "rotation", "deg"));
    const gx = ghosts.map((g) => gsap.quickSetter(g, "x", "px"));
    let step = 0, W = 0, tw = 0, vw = 0;
    const measure = () => { step = tiles[1]!.offsetLeft - tiles[0]!.offsetLeft; tw = tiles[0]!.offsetWidth; W = step * n; vw = v.clientWidth; };
    measure();
    const st = { pos: 0, freeV: 0, bend: 0, hover: false, focus: false, lock: false, drag: false, vis: true };
    let lastY = window.scrollY, sVel = 0, flat = false;
    const wrap = (p: number) => ((p % W) + W) % W;
    const tick = (_t: number, dtMs: number) => {
      if (!W) return;
      const dt = Math.min(dtMs, 64) / 1000;
      const sy = window.scrollY;
      sVel += ((sy - lastY) / Math.max(dt, 0.001) - sVel) * Math.min(1, dt * 10);   // the page's scroll speed, smoothed
      lastY = sy;
      st.freeV *= Math.pow(0.04, dt);                                                  // drag and wheel momentum eases back
      const drift = st.hover || st.focus || stoppedRef.current ? 0 : DRIFT;
      const speed = drift + sVel * 0.45 + st.freeV;
      if (!st.lock && !st.drag) st.pos += speed * dt;
      st.pos = wrap(st.pos);
      setX(-st.pos);
      const b = Math.max(-1, Math.min(1, (st.lock || st.drag ? st.freeV : speed - drift) / FULL));
      st.bend += (b - st.bend) * Math.min(1, dt * 8);
      if (Math.abs(st.bend) < 0.002 && st.bend !== 0) st.bend = 0;
      if (st.bend === 0 && flat) return;
      const wasFlat = flat;
      flat = st.bend === 0;
      if (wasFlat && !flat) v.classList.add("is-bend");   // tiles become their own layers only while they bend, so a bend does not re-rasterise their text every frame
      const k = -st.bend;
      /* only the tiles in (or just next to) the window are written: the other copies of the loop are off screen, and when the bend ends every tile is put back flat */
      for (let i = 0; i < tiles.length; i++) {
        const x = i * step - st.pos;
        if (flat || (x > -tw - 80 && x < vw + 80)) { skew[i]!(k * MAX_BEND); rot[i]!(k * 1.5); gx[i]!(k * 56); }
      }
      if (flat) v.classList.remove("is-bend");
    };
    gsap.ticker.add(tick);
    const io = new IntersectionObserver(([e]) => {
      if (e!.isIntersecting && !st.vis) { st.vis = true; lastY = window.scrollY; gsap.ticker.add(tick); }
      else if (!e!.isIntersecting && st.vis) { st.vis = false; gsap.ticker.remove(tick); }
    });
    io.observe(v);

    // hover: pause the drift, lift this rule's name (every copy of it), mute the others
    const hot = (idx: number) => { v.toggleAttribute("data-hot", idx >= 0); tiles.forEach((el, j) => el.classList.toggle("is-hot", idx >= 0 && j % n === idx)); };
    const enters = tiles.map((el, j) => { const h = () => { st.hover = true; hot(j % n); }; el.addEventListener("pointerenter", h); return h; });
    const leaves = tiles.map((el) => { const h = () => { st.hover = false; if (!st.focus) hot(-1); }; el.addEventListener("pointerleave", h); return h; });

    // bring tile i (a real one) to the middle, along the shortest way round the loop
    const toTile = (i: number, rel = false) => {
      const centre = i * step + tw / 2 - v.clientWidth / 2;
      let tgt = rel ? i : centre;
      if (!rel) { const d = wrap(tgt - st.pos); tgt = st.pos + (d > W / 2 ? d - W : d); }
      st.lock = true; st.freeV = 0;
      gsap.killTweensOf(st);
      gsap.to(st, { pos: tgt, duration: 0.7, ease: "power3.out", onComplete: () => { st.lock = false; } });
    };
    const onFocusIn = (e: FocusEvent) => {
      const i = tiles.findIndex((el, j) => j < n && el.contains(e.target as Node));
      if (i < 0) return;
      st.focus = true; hot(i);
      toTile(i);
    };
    const onFocusOut = () => { st.focus = false; if (!st.hover) hot(-1); };
    t.addEventListener("focusin", onFocusIn);
    t.addEventListener("focusout", onFocusOut);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = (Math.round(st.pos / step) + (e.key === "ArrowRight" ? 1 : -1)) * step;
      toTile(next, true);
    };
    v.addEventListener("keydown", onKey);

    // drag with momentum, and a sideways wheel
    let x0 = 0, tPrev = 0, moved = 0;
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      st.drag = true; moved = 0; x0 = e.clientX; tPrev = performance.now(); st.freeV = 0;
      gsap.killTweensOf(st); st.lock = false;
      v.setPointerCapture(e.pointerId); v.classList.add("is-drag");
    };
    const move = (e: PointerEvent) => {
      if (!st.drag) return;
      const dx = e.clientX - x0, now = performance.now(), dtm = Math.max(1, now - tPrev);
      x0 = e.clientX; tPrev = now; moved += Math.abs(dx);
      st.pos = wrap(st.pos - dx);
      st.freeV += (-(dx / dtm) * 1000 - st.freeV) * 0.4;
    };
    const up = (e: PointerEvent) => { if (!st.drag) return; st.drag = false; v.classList.remove("is-drag"); try { v.releasePointerCapture(e.pointerId); } catch { /* already released */ } };
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } };
    const wheel = (e: WheelEvent) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); st.pos = wrap(st.pos + e.deltaX); st.freeV += e.deltaX * 5; } };
    v.addEventListener("pointerdown", down); v.addEventListener("pointermove", move);
    v.addEventListener("pointerup", up); v.addEventListener("pointercancel", up);
    v.addEventListener("click", click, true); v.addEventListener("wheel", wheel, { passive: false });
    const ro = new ResizeObserver(measure);
    ro.observe(v);
    const fonts = document.fonts?.ready.then(measure);
    void fonts;
    return () => {
      gsap.ticker.remove(tick); io.disconnect(); ro.disconnect(); gsap.killTweensOf(st);
      tiles.forEach((el, j) => { el.removeEventListener("pointerenter", enters[j]!); el.removeEventListener("pointerleave", leaves[j]!); });
      t.removeEventListener("focusin", onFocusIn); t.removeEventListener("focusout", onFocusOut);
      v.removeEventListener("keydown", onKey);
      v.removeEventListener("pointerdown", down); v.removeEventListener("pointermove", move);
      v.removeEventListener("pointerup", up); v.removeEventListener("pointercancel", up);
      v.removeEventListener("click", click, true); v.removeEventListener("wheel", wheel);
      v.removeAttribute("data-hot");
      gsap.set([t, ...tiles, ...ghosts], { clearProps: "transform" });
    };
  }, [loop]);

  const sets = loop ? COPIES : 1;
  return (
    <section className="band-dark sec rl" id="rules" aria-labelledby="rl-h">
      <div className="container rl-head">
        <h2 id="rl-h" className="t-display-lg">{c.title}</h2>
        <p className="t-body-lg rl-lead">{c.lead}</p>
      </div>
      <div
        ref={view}
        className={`rl-view${loop ? " is-loop" : " is-native"}`}
        role="group"
        aria-roledescription="carousel"
        aria-label={c.label}
        tabIndex={loop ? 0 : undefined}
        style={{ "--rl-n": c.items.length } as CSSProperties}
      >
        <ul ref={track} className="rl-track">
          {Array.from({ length: sets }).flatMap((_, s) => c.items.map((r) => <Tile key={`${s}-${r.id}`} r={r} copy={s > 0} />))}
        </ul>
      </div>
      {loop && (
        <div className="rl-ctl">
          <button type="button" className="btn btn-ghost rl-pause" aria-pressed={stopped} onClick={() => setStopped((v) => !v)}>
            {stopped ? c.play : c.pause}
          </button>
        </div>
      )}
    </section>
  );
}
