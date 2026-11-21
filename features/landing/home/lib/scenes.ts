import { getRoot } from "./root";
/* Page-wide motion pass (MOTION.md effects 2-5). All scrubbed effects are pure functions of scroll.
   Nothing runs under reduced motion. */
import { gsap, ScrollTrigger, reduceMotion } from "./motion";

export function startScenes(): () => void {
  if (reduceMotion()) { getRoot().classList.add("rm"); return () => getRoot().classList.remove("rm"); }
  getRoot().classList.add("fx");
  const kills: (() => void)[] = [];

  // 3 masked reveal for section headlines: they rise from behind a mask as they arrive
  const heads = Array.from(document.querySelectorAll<HTMLElement>(".sec-head h2"));
  heads.forEach((h) => h.classList.add("rv"));
  // observe each heading's wrapper: a fully clipped element never reports as intersecting
  const owner = new Map<Element, HTMLElement>();
  heads.forEach((h) => owner.set(h.parentElement || h, h));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { owner.get(e.target)?.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  owner.forEach((_, wrap) => io.observe(wrap));
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
