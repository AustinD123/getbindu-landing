import { getRoot } from "./root";
/* Page-wide motion pass (MOTION.md effects 2-5). All scrubbed effects are pure functions of scroll.
   Nothing runs under reduced motion. */
import { gsap, ScrollTrigger, reduceMotion } from "./motion";
import { isPending, onReady } from "./ready";

export function startScenes(): () => void {
  if (reduceMotion()) { getRoot().classList.add("rm"); return () => getRoot().classList.remove("rm"); }
  getRoot().classList.add("fx");
  const kills: (() => void)[] = [];

  // 3 masked reveal for section headlines: they rise from behind a mask as they arrive
  // a section that has not hydrated yet is skipped (a class React did not render breaks its hydration) and picked up when it is ready
  const owner = new Map<Element, HTMLElement>();
  const seen = new Set<HTMLElement>();
  // observe each heading's wrapper: a fully clipped element never reports as intersecting
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { owner.get(e.target)?.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  const adopt = () => {
    Array.from(document.querySelectorAll<HTMLElement>(".sec-head h2")).filter((h) => !seen.has(h) && !isPending(h)).forEach((h) => {
      seen.add(h); h.classList.add("rv");
      const wrap = h.parentElement || h;
      owner.set(wrap, h); io.observe(wrap);
    });
  };
  adopt();
  const offAdopt = onReady(adopt);
  kills.push(offAdopt);
  kills.push(() => io.disconnect());

  // 4 sheet lift: the hero's words drift up and dim while the next band slides over the hero
  const heroIn = document.querySelector(".hero-in"), hero = document.querySelector(".hero");
  if (heroIn && hero) {
    const t = gsap.to(heroIn, { yPercent: -18, opacity: 0.25, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    kills.push(() => { t.scrollTrigger?.kill(); t.kill(); });
  }

  ScrollTrigger.refresh();
  return () => kills.forEach((k) => k());
}
