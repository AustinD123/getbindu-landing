import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { TESTIMONIALS_PLACEHOLDER as QUOTES, voices as c } from "../content";
import { gsap, reduceMotion } from "../lib/motion";

/* Round 65 (r65-12, Austin): "What buyers say" (id `voices`) in the shape of legora.com/customers, made endless. One row: the current quote is a large card (the r65
   parallel-style box with a Bindu product screen in its window, then the quote and who said it); the others are small boxes without text, top-aligned, bleeding off both
   edges. Arrows at the sides, a pill of dots in the middle (the current one is a dash), arrow keys and a swipe step one card. It never ends: after the last quote comes the
   first again, so the row comes back to where it was. Each card's place is its circular distance from the current one; a card that wraps round jumps to the far edge
   unseen and slides in from there. Not pinned, no scroll hijack; GSAP moves the cards (x, width and height of the box, text opacity), 0.7s power3.out.
   The quotes are PLACEHOLDERS (content.ts), so the Placeholder chip stays. The windows show real Bindu product screens with example data (public/images/eudr), labelled
   Illustration; no faces, because the people are not real yet. Reduced motion: the same row, moved without tweening. */

const SHOTS = ["/images/eudr/journey-1-farms.webp", "/images/eudr/chain-supplier.webp", "/images/eudr/journey-5-file.webp", "/images/eudr/close-receipt.webp", "/images/eudr/chain-share.webp"];
const N = QUOTES.length;
const circ = (i: number, a: number) => { let d = (((i - a) % N) + N) % N; if (d > N / 2) d -= N; return d; };   // -2..2 for five cards

type Geo = { big: number; small: number; gap: number; h: number; cx: number };
function geo(width: number): Geo {
  const phone = width < 640;
  const big = phone ? Math.round(width * 0.78) : Math.min(560, Math.round(width * 0.42));
  const small = phone ? Math.round(width * 0.42) : Math.min(260, Math.round(width * 0.2));
  return { big, small, gap: phone ? 16 : 40, h: Math.round(big * (phone ? 0.72 : 0.6)), cx: width / 2 };
}
/* the left edge of a card at circular distance d (the current card is centred) */
function xAt(d: number, g: Geo) {
  if (d === 0) return g.cx - g.big / 2;
  const side = Math.sign(d), k = Math.abs(d);
  const inner = g.big / 2 + g.gap + (k - 1) * (g.small + g.gap);
  return side > 0 ? g.cx + inner : g.cx - inner - g.small;
}

export function Voices() {
  const [active, setActive] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const prevD = useRef<number[]>(QUOTES.map((_, i) => circ(i, 0)));
  const placed = useRef(false);
  const swipe = useRef<{ x: number; id: number } | null>(null);

  const layout = useCallback((a: number, instant: boolean) => {
    const r = row.current;
    if (!r) return;
    const g = geo(r.clientWidth);
    r.style.setProperty("--vx-h", `${g.h}px`);
    r.classList.add("is-live");
    cards.current.forEach((el, i) => {
      if (!el) return;
      const d = circ(i, a), was = prevD.current[i]!, wrap = Math.abs(d - was) > 1;
      const box = el.querySelector<HTMLElement>(".pc-box")!, txt = el.querySelector<HTMLElement>(".vx-text")!;
      const to = { x: xAt(d, g), width: d === 0 ? g.big : g.small };
      const boxTo = { height: d === 0 ? g.h : Math.round(g.h * 0.56) };
      const vis = Math.abs(d) <= 2 ? 1 : 0;
      gsap.killTweensOf([el, box, txt]);
      if (instant || reduceMotion()) {
        gsap.set(el, { ...to, opacity: vis }); gsap.set(box, boxTo); gsap.set(txt, { opacity: d === 0 ? 1 : 0 });
      } else {
        if (wrap) gsap.set(el, { x: xAt(d + Math.sign(d), g), opacity: 0 });   // came round the back: start one place further out, unseen
        gsap.to(el, { ...to, opacity: vis, duration: 0.7, ease: "power3.out" });
        gsap.to(box, { ...boxTo, duration: 0.7, ease: "power3.out" });
        gsap.to(txt, d === 0 ? { opacity: 1, duration: 0.45, delay: 0.25, ease: "power2.out" } : { opacity: 0, duration: 0.2, ease: "power2.out" });
      }
      el.setAttribute("aria-hidden", d === 0 ? "false" : "true");
      prevD.current[i] = d;
    });
  }, []);

  useLayoutEffect(() => { layout(active, !placed.current); placed.current = true; }, [active, layout]);
  useEffect(() => {
    const r = row.current;
    if (!r) return;
    const ro = new ResizeObserver(() => layout(active, true));
    ro.observe(r);
    return () => ro.disconnect();
  }, [active, layout]);

  const go = (step: number) => setActive((a) => (((a + step) % N) + N) % N);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  const down = (e: PointerEvent) => { swipe.current = { x: e.clientX, id: e.pointerId }; };
  const up = (e: PointerEvent) => {
    const s = swipe.current; swipe.current = null;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section className="band-dark sec vx" id="voices" aria-labelledby="vc-h">
      <div className="container rl-head vx-head">
        <h2 id="vc-h" className="t-display-lg">{c.title}</h2>
        <span className="chip chip-neutral" title={c.note}>{c.placeholder}</span>
      </div>
      <div ref={row} className="vx-row" role="group" aria-roledescription="carousel" aria-label={c.label} tabIndex={0} onKeyDown={onKey}
        onPointerDown={down} onPointerUp={up} onPointerCancel={() => { swipe.current = null; }}>
        <ul className="vx-track">
          {QUOTES.map((q, i) => (
            <li key={q.name} ref={(el) => { cards.current[i] = el; }} className="pc vx-card" aria-roledescription="slide" aria-label={`${i + 1} of ${N}`}
              onClick={() => { if (i !== active) setActive(i); }}>
              <div className="pc-box">
                <div className="pc-tray" aria-hidden="true" />
                <div className="pc-win">
                  <div className="pc-bar"><span className="pc-url">Illustration</span></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="pc-media vx-img" src={SHOTS[i % SHOTS.length]} alt="" loading="lazy" decoding="async" draggable={false} />
                </div>
              </div>
              <div className="vx-text">
                <span className="vx-mark" aria-hidden="true">&rdquo;</span>
                <blockquote className="vx-q">{q.q}</blockquote>
                <p className="vx-who"><b>{q.name}</b><span>{q.role}, {q.company}, {q.country}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container vx-ctl">
        <button type="button" className="btn btn-icon vx-arrow" aria-label={c.prev} onClick={() => go(-1)}>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4 3 8l4 4" /></svg>
        </button>
        <ol className="vx-dots" aria-label={c.label}>
          {QUOTES.map((q, i) => (
            <li key={q.name}>
              <button type="button" className={`vx-dot${i === active ? " is-on" : ""}`} aria-label={`${c.label}: ${i + 1} of ${N}`} aria-current={i === active ? "true" : undefined} onClick={() => setActive(i)} />
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-icon vx-arrow" aria-label={c.next} onClick={() => go(1)}>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </button>
      </div>
      <p className="sr" aria-live="polite">{`${QUOTES[active]!.q} ${QUOTES[active]!.name}`}</p>
    </section>
  );
}
