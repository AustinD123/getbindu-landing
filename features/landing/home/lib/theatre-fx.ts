/* r39-2: Full Circle, the motion. Ported from features/landing/story/theatre.tsx (the original is untouched). Loaded on demand by
   components/Theatre.tsx, so the six GSAP plugins it needs never weigh on the first load.
   Three paused GSAP timelines, one per act, built once. The component drives them through the controller below: tabs, the scene dots, the
   play button, the site's pause control, and whether the section is in view. Every starting state is set here with gsap.set (the markup
   and the CSS carry none), so a reader without script, or one who prefers reduced motion, gets the composed final frame instead.
   Pacing (r39-2): the original scenes were 10s apart with the words on the stage. Here each scene is 13s: every tween keeps its offset
   inside the scene, and T() adds 3s per scene boundary, so the motion settles by about 9s and the words sit for at least 3.5s after. */
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, TextPlugin, ScrambleTextPlugin, MorphSVGPlugin);

const SCRAMBLE = { chars: "upperAndLowerCase", speed: 0.4 } as const;
/* the length of one scene in seconds, and the scene counts of the three acts (the captions in content.ts match) */
export const SCENE = 13;
export const SCENES = [5, 4, 5] as const;
/* an authored time (scenes 10s apart) to the paced time (scenes 13s apart) */
const T = (t: number) => t + Math.floor((t + 1e-6) / 10) * (SCENE - 10);

export type TheatreState = { playing: boolean; done: boolean };
export type TheatreHooks = {
  onStep: (act: number, step: number) => void;
  onFill: (f: number) => void;
  onState: (s: TheatreState) => void;
};
export type Theatre = {
  show: (act: number, still: boolean) => void;
  jump: (scene: number) => void;
  toggle: () => void;
  setVisible: (v: boolean) => void;
  setSitePaused: (v: boolean) => void;
  destroy: () => void;
};

export function buildTheatre(root: HTMLElement, hooks: TheatreHooks): Theatre {
  const q = <E extends Element>(sel: string) => root.querySelector<E>(sel);
  const ctx = gsap.context(() => {}, root);
  const acts: { tl: gsap.core.Timeline; panel: HTMLElement | null; n: number }[] = [];

  ctx.add(() => {
    const set = (sel: gsap.TweenTarget, v: gsap.TweenVars) => gsap.set(sel, v);
    const stamp = (tl: gsap.core.Timeline, sel: string, at: number) => {
      tl.fromTo(sel, { autoAlpha: 0, scale: 2.4, rotation: 9 }, { autoAlpha: 1, scale: 1, rotation: -3, duration: 0.7, ease: "power4.out" }, T(at));
    };
    const scramble = (tl: gsap.core.Timeline, sel: string, at: number, d: number) => {
      const el = q(sel);
      tl.to(sel, { duration: d, scrambleText: Object.assign({ text: el?.textContent ?? "" }, SCRAMBLE) }, T(at));
    };
    const fresh = (n: number) => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
      for (let i = 0; i < n; i++) tl.addLabel("s" + i, i * SCENE);
      tl.to({}, { duration: 0.001 }, n * SCENE);   // the last scene keeps its full length
      return tl;
    };

    /* ---- the farmers' plots of act II (built here, as in the original) ---- */
    const plots: SVGRectElement[] = [];
    const farmers = q<SVGGElement>("#a2-farmers");
    if (farmers) {
      for (let i = 0; i < 48; i++) {
        const px = 70 + (i % 8) * 27 + Math.sin(i * 7) * 6;
        const py = 460 + Math.floor(i / 8) * 18 - (i % 8) * 9;
        const d = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        d.setAttribute("x", String(px)); d.setAttribute("y", String(py));
        d.setAttribute("width", "9"); d.setAttribute("height", "9");
        d.setAttribute("transform", `rotate(45 ${px + 4.5} ${py + 4.5})`);
        d.setAttribute("fill", "var(--th-ok)"); d.setAttribute("fill-opacity", "0.7");
        farmers.appendChild(d);
        plots.push(d);
      }
    }

    /* ============ ACT I: the fabric. Five scenes ============ */
    const t1 = fresh(SCENES[0]);
    set(["#a1-routeA", "#a1-b1", "#a1-b2", "#a1-b3"], { drawSVG: "0%" });
    set("#a1-dataclipr", { attr: { width: 0 } });
    set("#a1-routeCclipr", { attr: { x: 1020, width: 0 } });
    set(["#a1-nodeA", "#a1-nodeB", "#a1-nodeC", "#a1-nodeAg", "#a1-mill"], { autoAlpha: 0, transformOrigin: "50% 50%" });
    set(["#a1-lA", "#a1-lB", "#a1-lC", "#a1-lAg", "#a1-lMill", ".qcard", "#a1-twin", ".stamp", "#a1-socket", "#a1-plugB", "#a1-plugC", "#a1-frayA", ".a1-q", ".a1-tick", "#a1-wall"], { autoAlpha: 0 });

    /* scene 1: three routes fan out from the importer, three quotes come back */
    t1.to("#a1-routeA", { drawSVG: "100%", duration: 2 }, 0.5)
      .to("#a1-b1", { drawSVG: "100%", duration: 2 }, 0.7)
      .to("#a1-routeCclipr", { attr: { x: 340, width: 680 }, duration: 2 }, 0.9)
      .to(["#a1-nodeA", "#a1-nodeB", "#a1-nodeC"], { autoAlpha: 1, scale: 1.15, duration: 0.4, stagger: 0.15 }, 2.4)
      .to(["#a1-lA", "#a1-lB", "#a1-lC"], { autoAlpha: 1, duration: 0.4, stagger: 0.15 }, 2.5)
      .to(["#a1-nodeA", "#a1-nodeB", "#a1-nodeC"], { scale: 1, duration: 0.3 }, 2.9)
      .fromTo("#a1-cardA", { autoAlpha: 0, x: -110, y: 30 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.8 }, 3.2)
      .fromTo("#a1-cardB", { autoAlpha: 0, x: -110, y: 30 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.8 }, 3.5)
      .fromTo("#a1-cardC", { autoAlpha: 0, x: -110, y: 30 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.8 }, 3.8);

    /* scene 2: the importer's questions bounce off supplier A */
    gsap.utils.toArray<SVGElement>(root.querySelectorAll(".a1-q")).forEach((qq, i) => {
      const at = 10.6 + i * 1.5;
      const mp = (start: number, end: number) => ({ path: "#a1-routeA", align: "#a1-routeA", alignOrigin: [0.5, 0.5], start, end });
      t1.set(qq, { autoAlpha: 1 }, T(at))
        .to(qq, { motionPath: mp(0, 0.94), duration: 1.6, ease: "power1.inOut" }, T(at))
        .to(qq, { motionPath: mp(0.94, 0.72), duration: 0.7 }, T(at + 1.6))
        .to(qq, { autoAlpha: 0, duration: 0.4 }, T(at + 2.3));
    });
    t1.to("#a1-frayA", { autoAlpha: 1, duration: 0.5 }, T(15.4));
    stamp(t1, "#a1-stampA", 16.6);
    t1.to("#a1-cardA", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.6 }, T(17.2));

    /* scene 3: Bindu asks supplier B's mill; its documents come back */
    t1.to("#a1-b2", { drawSVG: "100%", duration: 0.8 }, T(20.6))
      .to(["#a1-nodeAg", "#a1-lAg"], { autoAlpha: 1, duration: 0.3 }, T(21.2))
      .to("#a1-b3", { drawSVG: "100%", duration: 0.8 }, T(21.6))
      .to(["#a1-mill", "#a1-lMill"], { autoAlpha: 1, duration: 0.4 }, T(22.3))
      .to(".a1-tick", { autoAlpha: 1, duration: 0.3, stagger: 0.4 }, T(21.0))
      .to("#a1-twin", { autoAlpha: 1, duration: 0.5 }, T(22.8));
    ["#a1-twin1", "#a1-twin2", "#a1-twin3"].forEach((s, i) => scramble(t1, s, 23.2 + i * 0.5, 0.9));
    t1.to("#a1-socket", { autoAlpha: 1, duration: 0.3 }, T(25.4))
      .to("#a1-dataclipr", { attr: { width: 840 }, duration: 1.6, ease: "power1.in" }, T(25.6))
      .to("#a1-plugB", { autoAlpha: 1, duration: 0.2 }, T(27.0))
      .fromTo("#a1-plugB", { x: -14 }, { x: 0, duration: 0.35, ease: "back.out(3)" }, T(27.2))
      .fromTo("#a1-desk", { scale: 1 }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, T(27.5));

    /* scene 4: supplier C keeps its data behind a wall; the plug does not fit */
    t1.to("#a1-wall", { autoAlpha: 1, duration: 0.6 }, T(30.6))
      .to("#a1-plugC", { autoAlpha: 1, duration: 0.3 }, T(31.4))
      .to("#a1-plugC", { x: 180, y: -62, duration: 1.2, ease: "power1.inOut" }, T(31.6))
      .to("#a1-plugC", { x: 196, duration: 0.35, ease: "power2.in" }, T(33.0))
      .to("#a1-plugC", { x: 180, rotation: 28, transformOrigin: "50% 50%", duration: 0.5, ease: "elastic.out(1, 0.4)" }, T(33.4))
      .to("#a1-plugC", { x: 196, duration: 0.35, ease: "power2.in" }, T(34.2))
      .to("#a1-plugC", { x: 176, rotation: -18, duration: 0.6, ease: "elastic.out(1, 0.4)" }, T(34.6));
    stamp(t1, "#a1-stampC", 35.6);

    /* scene 5: the importer picks B; A and C fade back */
    t1.to(["#a1-routeA", "#a1-nodeA", "#a1-frayA", "#a1-cardA", "#a1-stampA", "#a1-lA", "#a1-lC", "#a1-routeC", "#a1-nodeC", "#a1-wall", "#a1-plugC", "#a1-cardC", "#a1-stampC"], { opacity: 0.14, duration: 0.8 }, T(40.6))
      .fromTo("#a1-desk", { scale: 1 }, { scale: 1.5, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, T(41.2));
    stamp(t1, "#a1-stampB", 41.8);

    /* ============ ACT II: the bean. Four scenes ============ */
    const t2 = fresh(SCENES[1]);
    set(["#a2-rA", "#a2-rB", "#a2-rC", "#a2-rBcoop"], { drawSVG: "0%" });
    set(["#a2-nA", "#a2-nB", "#a2-nC", "#a2-coop", "#a2-lA", "#a2-lB", "#a2-lC", "#a2-lCoop"], { autoAlpha: 0 });
    set(plots, { autoAlpha: 0, transformOrigin: "50% 50%" });
    set(["#a2-reg", "#a2-sat", "#a2-dds", ".stamp", "#a2-plotWrap", "#a2-satWipe", "#a2-q"], { autoAlpha: 0 });
    set("#a2-plot", { drawSVG: "0%", fillOpacity: 0 });
    set(["#a2-cutline", "#a2-days", "#a2-ref"], { text: "" });

    /* scene 1: the rule, and three origins */
    t2.to("#a2-cutline", { duration: 1.6, text: "Not cleared of forest after 31 Dec 2020" }, T(0.6))
      .to("#a2-rA", { drawSVG: "100%", duration: 1.6 }, T(1.4))
      .to("#a2-rB", { drawSVG: "100%", duration: 1.6 }, T(1.7))
      .to("#a2-rC", { drawSVG: "100%", duration: 1.6 }, T(2.0))
      .to(["#a2-nA", "#a2-nB", "#a2-nC"], { autoAlpha: 1, duration: 0.4, stagger: 0.2 }, T(3.2))
      .to(["#a2-lA", "#a2-lB", "#a2-lC"], { autoAlpha: 1, duration: 0.4, stagger: 0.2 }, T(3.3));

    /* scene 2: origin A's plot was cleared */
    t2.to("#a2-plotWrap", { autoAlpha: 1, duration: 0.3 }, T(10.6))
      .to("#a2-plot", { drawSVG: "100%", duration: 1.2 }, T(10.7))
      .to("#a2-plot", { fillOpacity: 0.35, duration: 0.5 }, T(11.9))
      .fromTo("#a2-reg", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, T(12.6))
      .to("#a2-satWipe", { autoAlpha: 1, duration: 0.2 }, T(13.4))
      .to("#a2-satRect", { attr: { width: 210 }, duration: 1.4, ease: "power1.inOut" }, T(13.5))
      .fromTo("#a2-sat", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, T(13.8))
      .to("#a2-plot", { stroke: "var(--th-no)", fill: "var(--th-no)", duration: 0.8 }, T(14.9));
    stamp(t2, "#a2-stampA", 16.0);

    /* scene 3: the co-op sends every plot; one statement is filed; a reference number comes back */
    t2.to(["#a2-plotWrap", "#a2-satWipe", "#a2-reg", "#a2-sat"], { autoAlpha: 0.2, duration: 0.6 }, T(20.2))
      .to("#a2-rBcoop", { drawSVG: "100%", duration: 0.8 }, T(20.5))
      .to(["#a2-coop", "#a2-lCoop"], { autoAlpha: 1, duration: 0.3 }, T(21.2))
      .to(plots, { autoAlpha: 1, scale: 1.2, duration: 0.25, stagger: { each: 0.05, from: "random" } }, T(21.4))
      .to(plots, { scale: 1, duration: 0.3 }, T(24.2))
      .to(plots, {
        x: (_i: number, el: Element) => 330 - parseFloat(el.getAttribute("x") || "0") - 4.5,
        y: (_i: number, el: Element) => 415 - parseFloat(el.getAttribute("y") || "0") - 4.5,
        autoAlpha: 0, duration: 1.1, stagger: { each: 0.03, from: "end" }, ease: "power1.in",
      }, T(24.6))
      .fromTo("#a2-coop", { scale: 1 }, { scale: 1.6, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, T(26.2))
      .to("#a2-dds", { autoAlpha: 1, duration: 0.6 }, T(26.8))
      .to("#a2-ref", { duration: 1.4, text: "EXAMPLE-26-0000-0142" }, T(27.4));
    stamp(t2, "#a2-stampB", 28.4);

    /* scene 4: origin C never answers */
    const dayObj = { d: 1 };
    const daysEl = q("#a2-days");
    t2.set("#a2-q", { autoAlpha: 1 }, T(30.6))
      .to("#a2-q", { motionPath: { path: "#a2-rC", align: "#a2-rC", alignOrigin: [0.5, 0.5], start: 0, end: 1 }, autoAlpha: 0, duration: 2.4, ease: "power1.out" }, T(30.6))
      .to(dayObj, { d: 21, duration: 3.2, ease: "none", onUpdate: () => { if (daysEl) daysEl.textContent = "Waiting · day " + String(Math.round(dayObj.d)).padStart(2, "0"); } }, T(31.0))
      .to(["#a2-rC", "#a2-nC", "#a2-lC"], { opacity: 0.15, duration: 1.2 }, T(34.4));
    stamp(t2, "#a2-stampC", 35.4);

    /* ============ ACT III: the circle (in build). Five scenes ============ */
    const t3 = fresh(SCENES[2]);
    set(["#a3-p1", "#a3-p2", "#a3-p3", "#a3-sort", "#a3-battp", ".th-tag", "#a3-shop", "#a3-beam", "#a3-conv", "#a3-beam2", "#a3-customs", "#a3-braid", "#a3-fiber"], { autoAlpha: 0 });
    set("#a3-loop", { autoAlpha: 0, drawSVG: "0%" });
    set(["#a3-c1", "#a3-c2", "#a3-c3"], { drawSVG: "0%" });
    set("#a3-hs", { text: "" });
    const pass = (id: string, at: number) => t3.fromTo(id, { autoAlpha: 0, x: -30, scaleY: 0.2 }, { autoAlpha: 1, x: 0, scaleY: 1, duration: 0.6 }, T(at));

    /* scene 1: a shopper scans the code on the label */
    t3.to("#a3-shop", { autoAlpha: 1, duration: 0.8 }, T(0.5))
      .fromTo("#a3-teeqr", { scale: 2.4, transformOrigin: "50% 50%", opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" }, T(1.2))
      .to("#a3-beam", { autoAlpha: 1, duration: 0.2 }, T(2.4))
      .to("#a3-beam", { y: 60, duration: 1, ease: "power1.inOut" }, T(2.5))
      .to("#a3-beam", { autoAlpha: 0, duration: 0.2 }, T(3.5));
    /* scene 2: the record shows materials, care and where it was made */
    pass("#a3-p1", 10.6); pass("#a3-p2", 11.0); pass("#a3-p3", 11.4);
    /* scene 3: a recycler scans the same code */
    t3.to(["#a3-p1", "#a3-p2", "#a3-p3", "#a3-shop"], { autoAlpha: 0, duration: 0.5 }, T(20.2))
      .to("#a3-conv", { autoAlpha: 1, duration: 0.6 }, T(20.6))
      .to("#a3-belt", { strokeDashoffset: -220, duration: 5, ease: "none" }, T(20.6))
      .to("#a3-tee2", { x: 190, duration: 3.4, ease: "none" }, T(20.8))
      .to("#a3-batt", { x: 150, duration: 3.4, ease: "none" }, T(21.2))
      .to("#a3-beam2", { autoAlpha: 1, duration: 0.2 }, T(23.2))
      .to("#a3-beam2", { autoAlpha: 0, duration: 0.3 }, T(24.6))
      .to("#a3-sort", { autoAlpha: 1, duration: 0.5 }, T(23.6));
    ["#a3-sort1", "#a3-sort2", "#a3-sort3"].forEach((s, i) => scramble(t3, s, 24.0 + i * 0.5, 0.8));
    t3.to("#a3-battp", { autoAlpha: 1, duration: 0.4 }, T(26.2));
    /* scene 4: customs can open the same record */
    t3.to(["#a3-conv", "#a3-sort", "#a3-battp"], { autoAlpha: 0, duration: 0.5 }, T(30.2))
      .to("#a3-customs", { autoAlpha: 1, duration: 0.6 }, T(30.6))
      .to("#a3-hs", { duration: 1.6, text: "HS 6109.10" }, T(31.4))
      .fromTo("#a3-ch1", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, T(33.2))
      .fromTo("#a3-ch2", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, T(33.6))
      .fromTo("#a3-ch3", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, T(34.0));
    /* scene 5: the journey line closes into a circle: every line points back to its document */
    t3.to(["#a3-shop", "#a3-customs", "#a3-hs", ".th-tag"], { autoAlpha: 0, duration: 0.7 }, T(40.2))
      .to("#a3-loop", { autoAlpha: 1, duration: 0.4 }, T(40.8))
      .to("#a3-loop", { drawSVG: "100%", duration: 1.6, ease: "power1.inOut" }, T(40.9))
      .set("#a3-loop", { strokeDasharray: "none" }, T(42.7))
      .to("#a3-loop", { morphSVG: "#a3-c1", duration: 2.2, ease: "power2.inOut" }, T(42.8))
      .to("#a3-braid", { autoAlpha: 1, duration: 0.3 }, T(44.6))
      .to("#a3-c1", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, T(44.6))
      .to("#a3-c2", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, T(44.9))
      .to("#a3-c3", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, T(45.2))
      .to("#a3-loop", { autoAlpha: 0, duration: 0.5 }, T(45.4))
      .set("#a3-fiber", { autoAlpha: 1 }, T(45.6))
      .to("#a3-fiber", { motionPath: { path: "#a3-c2", align: "#a3-c2", alignOrigin: [0.5, 0.5] }, duration: 3.4, ease: "power1.inOut" }, T(45.6));

    acts.push({ tl: t1, panel: q("#act1"), n: SCENES[0] }, { tl: t2, panel: q("#act2"), n: SCENES[1] }, { tl: t3, panel: q("#act3"), n: SCENES[2] });
  });

  /* ---------- the controller ---------- */
  let current = 0, still = false, visible = false, sitePaused = false, userPaused = false, lastStep = -1, ready = true;
  const state = (): TheatreState => {
    const tl = acts[current]!.tl;
    return { playing: !tl.paused() && tl.progress() < 1, done: tl.progress() >= 1 };
  };
  const stepOf = (tl: gsap.core.Timeline, n: number) => Math.min(n - 1, Math.max(0, Math.floor((tl.time() + 0.01) / SCENE)));
  const push = () => hooks.onState(state());

  acts.forEach((a, i) => {
    a.tl.eventCallback("onUpdate", () => {
      if (i !== current || still) return;
      hooks.onFill(a.tl.progress());
      const s = stepOf(a.tl, a.n);
      if (s !== lastStep) { lastStep = s; hooks.onStep(i, s); }
    });
    a.tl.eventCallback("onComplete", () => { if (i === current) push(); });
  });

  /* play only while: the section is in view, the site pause control is off, and the reader has not paused it */
  const sync = () => {
    if (!ready) return;
    const tl = acts[current]!.tl;
    if (still) { tl.pause(); push(); return; }
    if (visible && !sitePaused && !userPaused && tl.progress() < 1) tl.play(); else tl.pause();
    push();
  };

  const show = (i: number, asStill: boolean) => {
    current = i; still = asStill; userPaused = false; lastStep = -1;
    acts.forEach((a, j) => { a.panel?.classList.toggle("active", j === i); a.tl.pause(); });
    const a = acts[i]!;
    if (asStill) { a.tl.progress(1, true); hooks.onFill(1); hooks.onStep(i, a.n - 1); }
    else { a.tl.pause(0); hooks.onFill(0); hooks.onStep(i, 0); lastStep = 0; }
    sync();
  };

  return {
    show,
    jump: (scene) => {
      if (still) return;
      const a = acts[current]!;
      userPaused = false;
      a.tl.play(Math.min(a.n - 1, Math.max(0, scene)) * SCENE + 0.01);
      push();
    },
    toggle: () => {
      if (still) return;
      const tl = acts[current]!.tl;
      if (tl.progress() >= 1) { userPaused = false; lastStep = -1; tl.restart(); push(); return; }
      userPaused = !userPaused; sync();
    },
    setVisible: (v) => { visible = v; sync(); },
    setSitePaused: (v) => { sitePaused = v; sync(); },
    destroy: () => { ready = false; acts.forEach((a) => a.tl.kill()); ctx.revert(); },
  };
}
