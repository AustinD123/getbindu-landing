import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";

/* Round 20, item 4: the price rolls like an odometer. Each digit is a column of 0 to 9 that slides to its number, staggered 40ms, expo-out
   (the same motif as the button letter roll). It runs when the section first enters and on every remount (a tab change). Reduced motion:
   the final number at once. The wrapper carries the full value for assistive tech; the columns are aria-hidden. */
export function Odometer({ value }: { value: string }) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = root.current!;
    const strips = Array.from(el.querySelectorAll<HTMLElement>(".od-strip"));
    const target = (s: HTMLElement) => -(Number(s.dataset.d) * 10);
    if (reduceMotion()) { strips.forEach((s) => gsap.set(s, { yPercent: target(s) })); return; }
    gsap.set(strips, { yPercent: 0 });
    let tween: gsap.core.Tween | null = null;
    const run = () => { tween = gsap.to(strips, { yPercent: (_i, s: HTMLElement) => target(s), duration: 0.9, ease: "expo.out", stagger: 0.04 }); };
    const io = new IntersectionObserver(([e]) => {
      if (e!.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); tween?.kill(); };
  }, [value]);
  return (
    <span ref={root} className="od" aria-label={value} role="text">
      {Array.from(value).map((ch, i) => /\d/.test(ch)
        ? <span key={i} className="od-col" aria-hidden="true"><span className="od-strip" data-d={ch}>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}</span></span>
        : <span key={i} aria-hidden="true">{ch}</span>)}
    </span>
  );
}
