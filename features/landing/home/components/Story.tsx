import { useLayoutEffect, useRef } from "react";
import { statement } from "../content";
import { gsap, ScrollTrigger, reduceMotion, SCRUB_SOFT } from "../lib/motion";
import { subscribeTheme } from "../lib/theme";
import { Mark } from "./bits";

/* Round 19 item 3, rebuilt in r59-2 so the light travels smoothly. One GSAP timeline on one ScrollTrigger, scrubbed with a 0.6s smoothing
   (not raw scroll progress). Every word ramps opacity from its dim value to full over a window three words long, and the windows overlap, so the
   light moves through the sentence as a wave. The Bindu chip's yellow fill, its text and the dots of its mark are on the same timeline with the same
   ease, starting when the wave reaches the chip. Opacity (and colour on the two chip glyphs) only: no CSS transition on the words, no layout read
   while scrolling (ScrollTrigger caches positions), `will-change: opacity` only while the section is on screen. Scrubbed, so it reverses on scroll up.
   The start state is set here; with no JS, or under reduced motion, the sentence is fully lit. */
const DIM = 0.45, SPAN = 3;   // dim opacity of an unlit word; the ramp window in words
export function Statement() {
  const sec = useRef<HTMLElement>(null);
  const words = [...statement.before.split(" "), "\u0000", ...statement.after.split(" ")];
  useLayoutEffect(() => {
    const el = sec.current;
    if (!el || reduceMotion()) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>(".stmt-w"));
    const chip = el.querySelector<HTMLElement>(".stmt-chip")!;
    const chipBg = chip.querySelector<HTMLElement>(".stmt-chip-bg")!;
    const chipInk = [chip.querySelector<HTMLElement>(".stmt-w")!];   // r65-10: the mark keeps its cobalt; only the word goes to black
    const dots = Array.from(chip.querySelectorAll<SVGElement>("svg > *"));
    const ease = "sine.inOut";
    const ci = ws.indexOf(chip.querySelector<HTMLElement>(".stmt-w")!);
    gsap.set(ws, { opacity: DIM });
    gsap.set(chipBg, { opacity: 0 });
    gsap.set(dots, { opacity: 0.2 });
    const build = () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease } });
      ws.forEach((w, i) => tl.to(w, { opacity: 1, duration: SPAN }, i));
      tl.to(chipBg, { opacity: 1, duration: SPAN }, ci);
      tl.fromTo(chipInk, { color: () => getComputedStyle(el).getPropertyValue("--on-dark") || "#000" }, { color: "#000", duration: SPAN }, ci);
      tl.to(dots, { opacity: 1, duration: SPAN, stagger: { each: SPAN / (dots.length * 1.4) } }, ci);
      return tl;
    };
    let tl = build();
    const st = ScrollTrigger.create({ trigger: el, start: "center 90%", end: "center 45%", animation: tl, scrub: SCRUB_SOFT });
    const on = ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top",
      onToggle: (s) => ws.forEach((w) => { w.style.willChange = s.isActive ? "opacity" : ""; }) });
    const unTheme = subscribeTheme(() => tl.invalidate());
    return () => {
      unTheme(); on.kill(); st.kill(); tl.kill();
      gsap.set([...ws, chipBg, ...dots, ...chipInk], { clearProps: "opacity,color,willChange" });
    };
  }, []);
  return (
    <section ref={sec} className="band-dark sec stmt" id="statement" aria-label="What Bindu does" data-guide-anchor="statement" data-guide-side="r">
      <div className="container">
        <p className="stmt-t t-display-lg">
          {words.map((w, i) => w === "\u0000"
            ? <span key={i}><span className="stmt-chip"><span className="stmt-chip-bg" /><Mark size={26} chip /><span className="stmt-w">Bindu</span></span>{" "}</span>
            : <span key={i}><span className="stmt-w">{w}</span>{" "}</span>)}
        </p>
      </div>
    </section>
  );
}

/* r44-1: "Sound familiar?" (BeforeAfter, #pains) is gone; "What Bindu does" (components/Flow.tsx, #story) replaced it. */
