import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useSyncExternalStore } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduceMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* For render. Server and first client render say false, so the markup always hydrates cleanly; a reduced-motion reader
   then gets true on the next render. Use this in markup and state; reduceMotion() stays for effects and handlers. */
const noop = () => () => {};
export const useReducedMotion = (): boolean => useSyncExternalStore(noop, reduceMotion, () => false);

export const finePointer = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

let lenis: Lenis | null = null;
let stopLenis: (() => void) | null = null;

/* Inertial scroll (Lenis) driven by GSAP's ticker so ScrollTrigger scenes stay in sync.
   Off under reduced motion: native scroll, no hijack. Returns a cleanup that puts everything back, so leaving the
   homepage (or a dev remount) leaves no Lenis, ticker callback or click handler behind. */
export function startSmoothScroll(): () => void {
  if (reduceMotion() || lenis) return () => {};
  const l = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false });
  lenis = l;
  l.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => l.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  // in-page anchors scroll through Lenis
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    l.scrollTo(el as HTMLElement, { offset: -64 });
    history.replaceState(null, "", id);
  };
  document.addEventListener("click", onClick);
  stopLenis = () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    l.destroy();
    lenis = null;
    stopLenis = null;
  };
  return () => stopLenis?.();
}

export function lockScroll(lock: boolean) {
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

export { gsap, ScrollTrigger };

export { SplitText };

export const getLenis = () => lenis;
