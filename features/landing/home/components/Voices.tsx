import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { TESTIMONIALS_PLACEHOLDER as QUOTES, voices as c } from "../content";
import { gsap, getLenis, useReducedMotion } from "../lib/motion";
import { isPhone, onPhoneChange } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";

/* Round 44 (r44-5): "What buyers say" (id `voices`). Large quote cards on a curved 3D track. The front card is full ink at display-sm size; the ones behind recede in depth,
   turn away and dim. The card transforms and opacity are written by GSAP (gsap.set from one coalesced frame), nothing else moves.
   The one source of truth is the scroll position: the section is a sticky window (like Full Circle), each quote owns 70svh of scroll, and the position is eased toward it
   (so a wheel tick moves it a little). Dragging moves the page scroll (so it works with the pin and reverses with it) and on release throws the position by its velocity
   and snaps to a card; when the wheel stops, it settles on the nearest card. Arrow keys step one card. The dots show (and jump to) the active card.
   Before hydration, on reduced motion and without JS the quotes are a plain vertical list; phones get one card at a time, swiped natively (scroll snap).
   The quotes are PLACEHOLDERS (content.ts, TESTIMONIALS_PLACEHOLDER), so the visible "Placeholder" chip stays until approved quotes replace them. */
const N = QUOTES.length;
const PER = 70;     // svh of scroll for each step
const TAU = 0.16;   // s: how fast the shown position follows the scroll
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

/* r47: country codes for the route line under each quote (the speaker's country to the EU), and the 13-dot sunflower used for the index dots */
const CC: Record<string, string> = { Netherlands: "NL", Uganda: "UG", Belgium: "BE", Switzerland: "CH", Germany: "DE" };
const SEEDS = Array.from({ length: 13 }, (_, k) => { const a = (k + 1) * 2.399963, r = 1.9 * Math.sqrt(k + 1); return { x: +(12 + r * Math.cos(a)).toFixed(2), y: +(12 + r * Math.sin(a)).toFixed(2) }; });

type Mode = "list" | "swipe" | "arc";

export function Voices() {
  const reduced = useReducedMotion();
  const [phone, setPhone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const goRef = useRef<(i: number) => void>(() => {});
  const mode: Mode = !mounted || reduced ? "list" : phone ? "swipe" : "arc";

  useEffect(() => { setMounted(true); setPhone(isPhone()); return onPhoneChange(() => setPhone(isPhone())); }, []);

  /* the swiped list on phones: the active dot follows the card that is in view */
  useEffect(() => {
    if (mode !== "swipe") return;
    const host = stage.current;
    if (!host) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(cards.current.indexOf(e.target as HTMLLIElement)); }), { root: host, threshold: 0.6 });
    cards.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  useEffect(() => {
    if (mode !== "arc") return;
    const el = pin.current, host = stage.current;
    if (!el || !host) return;
    const tk = track(el);
    let w = host.clientWidth, raf = 0, visible = false, shown = 0, last = 0, lastKey = "", dragging = false, idle = 0, programmatic = 0;
    const els = cards.current.slice() as HTMLLIElement[];   // a snapshot: the ref slots go null on unmount, before this cleanup runs
    const range = () => tk.h - (window.innerHeight - 64);
    const posOf = () => { const r = range(); return r > 0 ? clamp((64 - tk.rectTop()) / r) * (N - 1) : 0; };
    const yOf = (p: number) => tk.top - 64 + (p / (N - 1)) * range();
    const scrollTo = (y: number, smooth: boolean) => {
      const l = getLenis();
      programmatic = performance.now() + (smooth ? 1000 : 0);
      if (l) l.scrollTo(y, smooth ? { duration: 0.9, easing: (t: number) => 1 - Math.pow(1 - t, 3) } : { immediate: true });
      else window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
    };
    // one card's place on the arc: d is its distance from the shown position, in cards
    const place = (d: number) => {
      const k = clamp(w / 1200, 0.55, 1), R = 760 * k, th = d * 0.62, a = Math.abs(d);
      return { x: R * Math.sin(th), z: -R * (1 - Math.cos(th)), ry: -th * 57.2958 * 0.9, s: 1 - 0.06 * Math.min(a, 2), o: clamp(1 - 0.55 * a) };
    };
    const paint = () => {
      const key = shown.toFixed(3) + "|" + w;
      if (key === lastKey) return;
      lastKey = key;
      els.forEach((c, i) => {
        const d = i - shown, p = place(d);
        gsap.set(c, { xPercent: -50, x: p.x, z: p.z, rotationY: p.ry, scale: p.s, opacity: p.o, zIndex: 10 - Math.round(Math.abs(d) * 2), pointerEvents: p.o > 0.3 ? "auto" : "none" });
      });
      const a = Math.round(shown);
      setActive((v) => (v === a ? v : a));
    };
    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
      last = now;
      const target = posOf();
      shown += (target - shown) * (1 - Math.exp(-dt / TAU));
      if (Math.abs(target - shown) < 0.0005) shown = target;
      paint();
      if (shown !== target) raf = tRaf(frame); else last = 0;
    };
    const kick = () => { if (!raf) raf = tRaf(frame); };
    const settle = () => {   // the wheel has stopped: rest on the nearest card (only inside the pin, never while dragging or already travelling)
      const p = posOf();
      if (dragging || performance.now() < programmatic || p <= 0 || p >= N - 1) return;
      const r = Math.round(p);
      if (Math.abs(p - r) > 0.01) scrollTo(yOf(r), true);
    };
    const onScroll = () => { kick(); window.clearTimeout(idle); idle = window.setTimeout(settle, 140); };
    const io = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) kick(); });
    io.observe(el);
    const onResize = () => { w = host.clientWidth; lastKey = ""; kick(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    goRef.current = (i) => { scrollTo(yOf(clamp(i, 0, N - 1)), true); };

    // drag: the page scroll follows the pointer, a throw on release, then a snap
    let sx = 0, sp = 0, moved = 0, vp = 0, lx = 0, lt = 0, down = false, pid = -1;
    const spacing = () => 440 * clamp(w / 1200, 0.55, 1);
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as HTMLElement).closest("a,button")) return;
      down = true; moved = 0; sx = lx = e.clientX; lt = performance.now(); vp = 0; sp = posOf(); pid = e.pointerId;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      const dx = e.clientX - sx;
      if (!dragging && Math.abs(dx) < 6) return;
      if (!dragging) { dragging = true; host.setPointerCapture(pid); host.classList.add("is-drag"); }
      moved = Math.max(moved, Math.abs(dx));
      const now = performance.now(), dt = Math.max(1, now - lt);
      vp = vp * 0.6 + (-(e.clientX - lx) / spacing() / (dt / 1000)) * 0.4;
      lx = e.clientX; lt = now;
      scrollTo(yOf(clamp(sp - dx / spacing(), 0, N - 1)), false);
      kick();
    };
    const onUp = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      down = false;
      if (!dragging) return;
      dragging = false; host.classList.remove("is-drag");
      try { host.releasePointerCapture(pid); } catch { /* already released */ }
      const stale = performance.now() - lt > 120;
      const to = clamp(Math.round(posOf() + (stale ? 0 : clamp(vp, -6, 6) * 0.22)), 0, N - 1);
      scrollTo(yOf(to), true);
      window.setTimeout(() => { moved = 0; }, 0);
    };
    const onClickCap = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);
    host.addEventListener("click", onClickCap, true);
    shown = posOf(); lastKey = ""; paint(); kick();
    return () => {
      io.disconnect(); window.clearTimeout(idle); tCaf(raf);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
      host.removeEventListener("pointerdown", onDown); host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerup", onUp); host.removeEventListener("pointercancel", onUp); host.removeEventListener("click", onClickCap, true);
      goRef.current = () => {};
      gsap.set(els.filter(Boolean), { clearProps: "transform,opacity,zIndex,pointerEvents" });
    };
  }, [mode]);

  /* r47: the one motion idea. The quote that comes to the front lights up word by word, dim to full ink, and the yellow dot travels its route line to the EU. */
  useEffect(() => {
    if (mode === "list") return;
    const card = cards.current[active];
    if (!card) return;
    const words = card.querySelectorAll(".vc-w"), dot = card.querySelector<HTMLElement>(".vc-travel"), lane = card.querySelector<HTMLElement>(".vc-lane");
    gsap.fromTo(words, { opacity: 0.26 }, { opacity: 1, duration: 0.35, ease: "power2.out", stagger: 0.03, overwrite: "auto" });
    if (dot && lane) gsap.fromTo(dot, { x: -(lane.clientWidth - 10) }, { x: 0, duration: 0.9, ease: "power2.inOut", overwrite: "auto", delay: 0.15 });
    return () => { gsap.killTweensOf(words); if (words.length) gsap.set(words, { clearProps: "opacity" }); if (dot) { gsap.killTweensOf(dot); gsap.set(dot, { clearProps: "transform" }); } };
  }, [active, mode]);

  const jump = (i: number) => {
    if (mode === "arc") goRef.current(i);
    else if (mode === "swipe") cards.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (mode !== "arc") return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); jump(Math.min(N - 1, active + 1)); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); jump(Math.max(0, active - 1)); }
    else if (e.key === "Home") { e.preventDefault(); jump(0); }
    else if (e.key === "End") { e.preventDefault(); jump(N - 1); }
  };
  const onCard = (i: number) => () => { if (mode === "arc" && i !== active) jump(i); };

  return (
    <section className="band-dark sec vc" id="voices" aria-labelledby="vc-h">
      <div ref={pin} className={`vc-pin is-${mode}`} style={{ "--vc-n": N - 1, "--vc-per": PER } as CSSProperties}>
        <div className="vc-win container">
          <div className="vc-head">
            <h2 id="vc-h" className="t-display-md">{c.title}</h2>
            <span className="chip chip-neutral vc-chip" title={c.note}>{c.placeholder}</span>
          </div>
          <div
            ref={stage}
            className="vc-stage"
            role="group"
            aria-roledescription="carousel"
            aria-label={c.label}
            tabIndex={mode === "arc" ? 0 : undefined}
            onKeyDown={onKey}
          >
            <ul className="vc-cards">
              {QUOTES.map((q, i) => (
                <li
                  key={q.name}
                  ref={(el) => { cards.current[i] = el; }}
                  className={`vc-card${i === active ? " is-front" : ""}`}
                  aria-current={mode === "arc" && i === active ? "true" : undefined}
                  onClick={onCard(i)}
                >
                  <svg className="vc-map" viewBox="0 0 120 80" aria-hidden="true" focusable="false">
                    <defs><pattern id={`vc-pat-${i}`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.1" /></pattern></defs>
                    <rect width="120" height="80" fill={`url(#vc-pat-${i})`} />
                  </svg>
                  <blockquote className="vc-q">{q.q.split(" ").map((w, k, a) => <span key={k}><span className="vc-w">{w}</span>{k < a.length - 1 ? " " : ""}</span>)}</blockquote>
                  <p className="vc-who"><b>{q.name}</b><span>{q.role}, {q.company}, {q.country}</span></p>
                  <div className="vc-route" aria-hidden="true"><b>{CC[q.country] ?? q.country}</b><span className="vc-lane"><i className="vc-end" /><i className="vc-travel" /></span><b>EU</b></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="vc-foot">
            <ol className="vc-dots" aria-label={c.label}>
              {QUOTES.map((q, i) => (
                <li key={q.name}>
                  <button type="button" className={`vc-dot${i === active ? " is-on" : ""}`} aria-label={`${c.label}: ${i + 1} of ${N}`} aria-current={i === active ? "true" : undefined} onClick={() => jump(i)} tabIndex={mode === "list" ? -1 : 0}>
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">{SEEDS.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r="1.35" />)}</svg>
                  </button>
                </li>
              ))}
            </ol>
            <p className="t-caption t-muted vc-hint">{c.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
