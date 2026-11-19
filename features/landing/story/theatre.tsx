"use client";

/**
 * ACT 3.5 — THE THEATRE ("Full Circle")
 *
 * Ported from the standalone tabbed-theatre file (full-circle-tabs.html) into
 * the story page, sitting between "Introducing Bindu OS" and "Bindu means dot".
 * Three self-playing acts (The Fabric / The Bean / The Circle), each a paused
 * GSAP timeline whose labels drive the scene dots. The stage SVG is injected
 * verbatim (THEATRE_STAGES_HTML) so the hand-tuned geometry never drifts; only
 * the projector changed — scroll-scrub became paused timelines + a controller.
 *
 * Deltas from the standalone file:
 *  - one shared gsap instance (no inlined library), plugins registered here
 *  - autoplay-on-load → play when the section scrolls into view, pause on leave
 *  - reduced-motion: no auto-play; a composed still that plays on demand
 *    (tab / play / dot), so the motion is opt-in rather than gated off
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { THEATRE_STAGES_HTML } from "./theatre-stages";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin,
  TextPlugin,
  ScrambleTextPlugin,
  MorphSVGPlugin
);

const SCRAMBLE = { chars: "upperAndLowerCase", speed: 0.4 } as const;

export function StTheatre() {
  const ref = useRef<HTMLElement | null>(null);

  // Below 901px this section is display:none (theatre.css), so none of the
  // choreography below is ever seen: six GSAP plugins used nowhere else on
  // the page, three master timelines, JS-built QR cells, plots and scene
  // dots, and a ScrollTrigger measuring a 0x0 box. Hiding it in CSS alone
  // still paid for every bit of that on phones.
  //
  // Tracked as state and fed to useGSAP's dependencies rather than read
  // inline, so widening the window past the breakpoint builds the theatre
  // properly instead of revealing an inert stage, and narrowing reverts the
  // context. It starts false so the server and the first client render
  // agree.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !desktop) return;
      const q = <T extends Element>(sel: string) =>
        root.querySelector<T>(sel);

      /* ---------- build the QR (act I) and farmer plots (act II) ---------- */
      const qr = q<SVGGElement>("#a1-qr");
      const qrCells: SVGRectElement[] = [];
      const pattern = [
        1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0,
        1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1,
        1,
      ];
      if (qr) {
        for (let r = 0; r < 7; r++)
          for (let c = 0; c < 7; c++) {
            if (!pattern[r * 7 + c]) continue;
            const cell = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            cell.setAttribute("x", String(996 + c * 5.6));
            cell.setAttribute("y", String(236 + r * 5.6));
            cell.setAttribute("width", "4.6");
            cell.setAttribute("height", "4.6");
            cell.setAttribute("fill", "var(--ink)");
            qr.appendChild(cell);
            qrCells.push(cell);
          }
      }

      const farmers = q<SVGGElement>("#a2-farmers");
      const plots: SVGRectElement[] = [];
      if (farmers) {
        for (let i = 0; i < 48; i++) {
          const px = 70 + (i % 8) * 27 + Math.sin(i * 7) * 6;
          const py = 460 + Math.floor(i / 8) * 18 - (i % 8) * 9;
          const d = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          d.setAttribute("x", String(px));
          d.setAttribute("y", String(py));
          d.setAttribute("width", "9");
          d.setAttribute("height", "9");
          d.setAttribute(
            "transform",
            "rotate(45 " + (px + 4.5) + " " + (py + 4.5) + ")"
          );
          d.setAttribute("fill", "var(--leaf)");
          d.setAttribute("fill-opacity", "0.7");
          farmers.appendChild(d);
          plots.push(d);
        }
      }

      /* ---------- helpers ---------- */
      function slugs(tl: gsap.core.Timeline, id: string, times: number[]) {
        const spans = gsap.utils.toArray<HTMLElement>(
          root!.querySelectorAll("#" + id + " span")
        );
        spans.forEach((s, i) => {
          tl.to(s, { autoAlpha: 1, duration: 0.4 }, times[i] ?? 0);
          if (i < spans.length - 1)
            tl.to(s, { autoAlpha: 0, duration: 0.3 }, (times[i + 1] ?? 0) - 0.35);
        });
      }
      function cap(
        tl: gsap.core.Timeline,
        sel: string,
        at: number,
        out?: number
      ) {
        tl.fromTo(
          sel,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1 },
          at
        );
        if (out !== undefined)
          tl.to(sel, { autoAlpha: 0, y: -14, duration: 0.7 }, out);
      }
      function stamp(tl: gsap.core.Timeline, sel: string, at: number) {
        tl.fromTo(
          sel,
          { autoAlpha: 0, scale: 2.4, rotation: 9 },
          { autoAlpha: 1, scale: 1, rotation: -3, duration: 0.7, ease: "power4.out" },
          at
        );
      }

      const tabBtns = gsap.utils.toArray<HTMLButtonElement>(
        root.querySelectorAll(".tabs button")
      );

      // Reduce-motion: still build everything (so tabs/play/dots work), but
      // don't auto-play. The viewer gets a composed still and opts in to the
      // motion by pressing play or a tab — no unexpected animation on scroll.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ============ ACT I — 5 scenes, t = 0/10/20/30/40 ============ */
      const t1 = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
      t1.addLabel("sc01", 0)
        .addLabel("sc02", 10)
        .addLabel("sc03", 20)
        .addLabel("sc04", 30)
        .addLabel("sc05", 40);
      slugs(t1, "a1-slug", [0, 10, 20, 30, 40]);

      gsap.set(["#a1-routeA", "#a1-b1", "#a1-b2", "#a1-b3"], { drawSVG: "0%" });
      gsap.set("#a1-dataclipr", { attr: { width: 0 } });
      gsap.set("#a1-routeCclipr", { attr: { x: 1020, width: 0 } });
      gsap.set(
        ["#a1-nodeA", "#a1-nodeB", "#a1-nodeC", "#a1-nodeAg", "#a1-mill"],
        { autoAlpha: 0, transformOrigin: "50% 50%" }
      );
      gsap.set([".qcard", "#a1-twin"], { autoAlpha: 0 });

      /* SC01 — routes fan out, quotes fly in */
      t1.to("#a1-routeA", { drawSVG: "100%", duration: 2 }, 0.5)
        .to("#a1-b1", { drawSVG: "100%", duration: 2 }, 0.7)
        .to(
          "#a1-routeCclipr",
          { attr: { x: 340, width: 680 }, duration: 2, ease: "power2.out" },
          0.9
        )
        .to(
          ["#a1-nodeA", "#a1-nodeB", "#a1-nodeC"],
          { autoAlpha: 1, scale: 1.15, duration: 0.4, stagger: 0.15 },
          2.4
        )
        .to(["#a1-nodeA", "#a1-nodeB", "#a1-nodeC"], { scale: 1, duration: 0.3 }, 2.9)
        .fromTo(
          "#a1-cardA",
          { autoAlpha: 0, x: -110, y: 30 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.8 },
          3.2
        )
        .fromTo(
          "#a1-cardB",
          { autoAlpha: 0, x: -110, y: 30 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.8 },
          3.5
        )
        .fromTo(
          "#a1-cardC",
          { autoAlpha: 0, x: -110, y: 30 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.8 },
          3.8
        );
      cap(t1, "#a1-cap1", 4.6, 9.2);

      /* SC02 — questions bounce off trader A */
      gsap.utils
        .toArray<SVGElement>(root.querySelectorAll(".a1-q"))
        .forEach((qq, i) => {
          const at = 10.6 + i * 1.5;
          t1.set(qq, { autoAlpha: 1 }, at)
            .to(
              qq,
              {
                motionPath: {
                  path: "#a1-routeA",
                  align: "#a1-routeA",
                  alignOrigin: [0.5, 0.5],
                  start: 0,
                  end: 0.94,
                },
                duration: 1.6,
                ease: "power1.inOut",
              },
              at
            )
            .to(
              qq,
              {
                motionPath: {
                  path: "#a1-routeA",
                  align: "#a1-routeA",
                  alignOrigin: [0.5, 0.5],
                  start: 0.94,
                  end: 0.72,
                },
                duration: 0.7,
                ease: "power2.out",
              },
              at + 1.6
            )
            .to(qq, { autoAlpha: 0, duration: 0.4 }, at + 2.3);
        });
      t1.to("#a1-frayA", { autoAlpha: 1, duration: 0.5 }, 15.4);
      stamp(t1, "#a1-stampA", 16.6);
      t1.to(
        "#a1-cardA",
        { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.6 },
        17.2
      );
      cap(t1, "#a1-cap2", 11.2, 19.2);

      /* SC03 — the dataspace cascade */
      t1.to("#a1-b2", { drawSVG: "100%", duration: 0.8 }, 20.6)
        .to("#a1-nodeAg", { autoAlpha: 1, duration: 0.3 }, 21.2)
        .to("#a1-b3", { drawSVG: "100%", duration: 0.8 }, 21.6)
        .to("#a1-mill", { autoAlpha: 1, duration: 0.4 }, 22.3)
        .to(".a1-tick", { autoAlpha: 1, duration: 0.3, stagger: 0.4 }, 21.0)
        .to("#a1-twin", { autoAlpha: 1, duration: 0.5 }, 22.8);
      ["#a1-twin1", "#a1-twin2", "#a1-twin3", "#a1-twin4"].forEach((s, i) => {
        const el = q(s);
        t1.to(
          s,
          {
            duration: 0.9,
            scrambleText: Object.assign({ text: el?.textContent ?? "" }, SCRAMBLE),
          },
          23.2 + i * 0.5
        );
      });
      t1.to("#a1-socket", { autoAlpha: 1, duration: 0.3 }, 25.4)
        .to(
          "#a1-dataclipr",
          { attr: { width: 840 }, duration: 1.6, ease: "power1.in" },
          25.6
        )
        .to("#a1-plugB", { autoAlpha: 1, duration: 0.2 }, 27.0)
        .fromTo("#a1-plugB", { x: -14 }, { x: 0, duration: 0.35, ease: "back.out(3)" }, 27.2)
        .fromTo(
          "#a1-desk",
          { scale: 1 },
          { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "50% 50%" },
          27.5
        );
      stamp(t1, "#a1-stampB", 28.0);
      cap(t1, "#a1-cap3", 23.6, 29.2);

      /* SC04 — the walled garden */
      t1.to("#a1-wall", { autoAlpha: 1, duration: 0.6 }, 30.6)
        .to("#a1-plugC", { autoAlpha: 1, duration: 0.3 }, 31.4)
        .to("#a1-plugC", { x: 180, y: -62, duration: 1.2, ease: "power1.inOut" }, 31.6)
        .to("#a1-plugC", { x: 196, duration: 0.35, ease: "power2.in" }, 33.0)
        .to(
          "#a1-plugC",
          { x: 180, rotation: 28, transformOrigin: "50% 50%", duration: 0.5, ease: "elastic.out(1, 0.4)" },
          33.4
        )
        .to("#a1-plugC", { x: 196, duration: 0.35, ease: "power2.in" }, 34.2)
        .to("#a1-plugC", { x: 176, rotation: -18, duration: 0.6, ease: "elastic.out(1, 0.4)" }, 34.6);
      stamp(t1, "#a1-stampC", 35.6);
      cap(t1, "#a1-cap4", 31.2, 39.2);

      /* SC05 — curtain: B wins, QR settles on the tee */
      t1.to(
        ["#a1-routeA", "#a1-nodeA", "#a1-frayA", "#a1-cardA", "#a1-stampA"],
        { opacity: 0.14, duration: 0.8 },
        40.6
      )
        .to(
          ["#a1-routeC", "#a1-nodeC", "#a1-wall", "#a1-plugC", "#a1-cardC", "#a1-stampC"],
          { opacity: 0.14, duration: 0.8 },
          40.6
        )
        .to("#a1-tee", { autoAlpha: 1, duration: 0.7 }, 41.6)
        .to(
          qrCells,
          { autoAlpha: 1, duration: 0.15, stagger: { each: 0.045, from: "random" } },
          42.2
        );
      gsap.set(qrCells, { autoAlpha: 0 });
      cap(t1, "#a1-cap5", 43.4);

      /* ============ ACT II — 4 scenes, t = 0/10/20/30 ============ */
      const t2 = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
      t2.addLabel("sc06", 0).addLabel("sc07", 10).addLabel("sc08", 20).addLabel("sc09", 30);
      slugs(t2, "a2-slug", [0, 10, 20, 30]);

      gsap.set(["#a2-rA", "#a2-rB", "#a2-rC", "#a2-rBcoop"], { drawSVG: "0%" });
      gsap.set(["#a2-nA", "#a2-nB", "#a2-nC", "#a2-coop"], { autoAlpha: 0 });
      gsap.set(plots, { autoAlpha: 0, transformOrigin: "50% 50%" });
      gsap.set(["#a2-reg", "#a2-sat", "#a2-dds"], { autoAlpha: 0 });

      /* SC06 — redress: cutline + three origins */
      t2.to("#a2-cutline", { duration: 1.6, text: "DEFORESTATION-FREE AFTER 31 DEC 2020" }, 0.6)
        .to("#a2-rA", { drawSVG: "100%", duration: 1.6 }, 1.4)
        .to("#a2-rB", { drawSVG: "100%", duration: 1.6 }, 1.7)
        .to("#a2-rC", { drawSVG: "100%", duration: 1.6 }, 2.0)
        .to(["#a2-nA", "#a2-nB", "#a2-nC"], { autoAlpha: 1, duration: 0.4, stagger: 0.2 }, 3.2);
      cap(t2, "#a2-cap1", 4.2, 9.2);

      /* SC07 — the wrong plot */
      t2.set("#a2-plot", { drawSVG: "0%", fillOpacity: 0 }, 0)
        .to("#a2-plotWrap", { autoAlpha: 1, duration: 0.3 }, 10.6)
        .to("#a2-plot", { drawSVG: "100%", duration: 1.2 }, 10.7)
        .to("#a2-plot", { fillOpacity: 0.35, duration: 0.5 }, 11.9)
        .fromTo("#a2-reg", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 12.6)
        .to("#a2-satWipe", { autoAlpha: 1, duration: 0.2 }, 13.4)
        .to("#a2-satRect", { attr: { width: 210 }, duration: 1.4, ease: "power1.inOut" }, 13.5)
        .fromTo("#a2-sat", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 13.8)
        .to("#a2-plot", { stroke: "var(--refuse)", fill: "var(--refuse)", duration: 0.8 }, 14.9);
      stamp(t2, "#a2-stampA", 16.0);
      cap(t2, "#a2-cap2", 11.2, 19.2);

      /* SC08 — the cooperative roll-up */
      t2.to("#a2-rBcoop", { drawSVG: "100%", duration: 0.8 }, 20.5)
        .to("#a2-coop", { autoAlpha: 1, duration: 0.3 }, 21.2)
        .to(
          plots,
          { autoAlpha: 1, scale: 1.2, duration: 0.25, stagger: { each: 0.05, from: "random" } },
          21.4
        )
        .to(plots, { scale: 1, duration: 0.3 }, 24.2)
        .to(
          plots,
          {
            x: (i, el) => 330 - parseFloat(el.getAttribute("x")) - 4.5,
            y: (i, el) => 415 - parseFloat(el.getAttribute("y")) - 4.5,
            autoAlpha: 0,
            duration: 1.1,
            stagger: { each: 0.03, from: "end" },
            ease: "power1.in",
          },
          24.6
        )
        .fromTo(
          "#a2-coop",
          { scale: 1 },
          { scale: 1.6, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: "50% 50%" },
          26.2
        )
        .to("#a2-dds", { autoAlpha: 1, duration: 0.6 }, 26.8)
        .to("#a2-ref", { duration: 1.4, text: "25NLK9QX41" }, 27.4);
      stamp(t2, "#a2-stampB", 28.4);
      cap(t2, "#a2-cap3", 22.0, 29.2);

      /* SC09 — silence */
      const dayObj = { d: 1 };
      const daysEl = q("#a2-days");
      t2.set("#a2-q", { autoAlpha: 1 }, 30.6)
        .to(
          "#a2-q",
          {
            motionPath: { path: "#a2-rC", align: "#a2-rC", alignOrigin: [0.5, 0.5], start: 0, end: 1 },
            autoAlpha: 0,
            duration: 2.4,
            ease: "power1.out",
          },
          30.6
        )
        .to(
          dayObj,
          {
            d: 21,
            duration: 3.2,
            ease: "none",
            onUpdate: () => {
              if (daysEl)
                daysEl.textContent = "DAY " + String(Math.round(dayObj.d)).padStart(2, "0");
            },
          },
          31.0
        )
        .to(["#a2-rC", "#a2-nC"], { opacity: 0.15, duration: 1.2 }, 34.4);
      stamp(t2, "#a2-stampC", 35.4);
      cap(t2, "#a2-cap4", 32.0);

      /* ============ ACT III — 4 scenes, t = 0/10/20/30 ============ */
      const t3 = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
      t3.addLabel("sc10", 0).addLabel("sc11", 10).addLabel("sc12", 20).addLabel("sc13", 30);
      slugs(t3, "a3-slug", [0, 10, 20, 30]);

      gsap.set(["#a3-p1", "#a3-p2", "#a3-p3", "#a3-sort", "#a3-battp"], { autoAlpha: 0 });
      gsap.set([".chip"], { autoAlpha: 0 });

      /* SC10 — the shopper */
      t3.to("#a3-shop", { autoAlpha: 1, duration: 0.8 }, 0.5)
        .fromTo(
          "#a3-teeqr",
          { scale: 2.4, transformOrigin: "50% 50%", opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" },
          1.2
        )
        .to("#a3-beam", { autoAlpha: 1, duration: 0.2 }, 2.4)
        .to("#a3-beam", { y: 60, duration: 1, ease: "power1.inOut" }, 2.5)
        .to("#a3-beam", { autoAlpha: 0, duration: 0.2 }, 3.5)
        .fromTo("#a3-p1", { autoAlpha: 0, x: -30, scaleY: 0.2 }, { autoAlpha: 1, x: 0, scaleY: 1, duration: 0.6 }, 3.8)
        .fromTo("#a3-p2", { autoAlpha: 0, x: -30, scaleY: 0.2 }, { autoAlpha: 1, x: 0, scaleY: 1, duration: 0.6 }, 4.2)
        .fromTo("#a3-p3", { autoAlpha: 0, x: -30, scaleY: 0.2 }, { autoAlpha: 1, x: 0, scaleY: 1, duration: 0.6 }, 4.6);
      cap(t3, "#a3-cap1", 5.4, 9.2);

      /* SC11 — the recycler */
      t3.to(["#a3-p1", "#a3-p2", "#a3-p3"], { autoAlpha: 0, duration: 0.5 }, 10.2)
        .to("#a3-conv", { autoAlpha: 1, duration: 0.6 }, 10.6)
        .to("#a3-belt", { strokeDashoffset: -220, duration: 5, ease: "none" }, 10.6)
        .to("#a3-tee2", { x: 190, duration: 3.4, ease: "none" }, 10.8)
        .to("#a3-batt", { x: 150, duration: 3.4, ease: "none" }, 11.2)
        .to("#a3-beam2", { autoAlpha: 1, duration: 0.2 }, 13.2)
        .to("#a3-beam2", { autoAlpha: 0, duration: 0.3 }, 14.6)
        .to("#a3-sort", { autoAlpha: 1, duration: 0.5 }, 13.6);
      ["#a3-sort1", "#a3-sort2", "#a3-sort3"].forEach((s, i) => {
        const el = q(s);
        t3.to(
          s,
          { duration: 0.8, scrambleText: Object.assign({ text: el?.textContent ?? "" }, SCRAMBLE) },
          14.0 + i * 0.5
        );
      });
      t3.to("#a3-battp", { autoAlpha: 1, duration: 0.4 }, 16.2);
      cap(t3, "#a3-cap2", 12.0, 19.2);

      /* SC12 — customs */
      t3.to(["#a3-conv", "#a3-sort", "#a3-battp"], { autoAlpha: 0, duration: 0.5 }, 20.2)
        .to("#a3-customs", { autoAlpha: 1, duration: 0.6 }, 20.6)
        .to("#a3-hs", { duration: 1.6, text: "HS 6109.10" }, 21.4)
        .fromTo("#a3-ch1", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 23.2)
        .fromTo("#a3-ch2", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 23.6)
        .fromTo("#a3-ch3", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 24.0)
        .fromTo("#a3-ch4", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 24.4);
      cap(t3, "#a3-cap3", 25.0, 29.2);

      /* SC13 — full circle */
      t3.to(["#a3-shop", "#a3-customs", "#a3-hs", ".chip"], { autoAlpha: 0, duration: 0.7 }, 30.2)
        .to("#a3-loop", { autoAlpha: 1, duration: 0.4 }, 30.8);
      t3.set("#a3-loop", { drawSVG: "0%" }, 0)
        .to("#a3-loop", { drawSVG: "100%", duration: 1.6, ease: "power1.inOut" }, 30.9)
        .set("#a3-loop", { strokeDasharray: "none" }, 32.7)
        .to("#a3-loop", { morphSVG: "#a3-c1", duration: 2.2, ease: "power2.inOut" }, 32.8);
      gsap.set(["#a3-c1", "#a3-c2", "#a3-c3"], { drawSVG: "0%" });
      t3.to("#a3-braid", { autoAlpha: 1, duration: 0.3 }, 35.0)
        .to("#a3-c1", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, 35.0)
        .to("#a3-c2", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, 35.3)
        .to("#a3-c3", { drawSVG: "100%", duration: 1.8, ease: "power1.inOut" }, 35.6)
        .to("#a3-loop", { autoAlpha: 0, duration: 0.5 }, 35.8)
        .set("#a3-fiber", { autoAlpha: 1 }, 36.0)
        .to(
          "#a3-fiber",
          { motionPath: { path: "#a3-c2", align: "#a3-c2", alignOrigin: [0.5, 0.5] }, duration: 3.4, ease: "power1.inOut" },
          36.0
        );
      cap(t3, "#a3-cap4", 36.8);

      /* ---------- theatre controller ---------- */
      type Act = {
        tl: gsap.core.Timeline;
        panel: HTMLElement | null;
        labels: { name: string; time: number }[];
      };
      const acts: Act[] = [
        { tl: t1, panel: q<HTMLElement>("#act1"), labels: [] },
        { tl: t2, panel: q<HTMLElement>("#act2"), labels: [] },
        { tl: t3, panel: q<HTMLElement>("#act3"), labels: [] },
      ];
      const dotsBox = q<HTMLElement>("#scene-dots")!;
      const barFill = q<HTMLElement>("#bar-fill")!;
      const playBtn = q<HTMLElement>("#playpause")!;
      let current = 0;

      acts.forEach((a, i) => {
        a.tl.timeScale(1.15);
        a.labels = Object.keys(a.tl.labels)
          .map((k) => ({ name: k, time: a.tl.labels[k] ?? 0 }))
          .sort((x, y) => x.time - y.time);
        a.tl.eventCallback("onUpdate", () => {
          if (i !== current) return;
          barFill.style.width = (a.tl.progress() * 100).toFixed(2) + "%";
          const t = a.tl.time();
          let on = 0;
          a.labels.forEach((l, j) => {
            if (t >= l.time - 0.01) on = j;
          });
          gsap.utils
            .toArray<HTMLElement>(dotsBox.querySelectorAll("button"))
            .forEach((d, j) => d.classList.toggle("active", j === on));
        });
        a.tl.eventCallback("onComplete", () => {
          if (i !== current) return;
          playBtn.textContent = "REPLAY";
          const next = tabBtns[i + 1];
          if (next)
            gsap.fromTo(
              next,
              { scale: 1 },
              { scale: 1.12, duration: 0.35, yoyo: true, repeat: 3, ease: "power1.inOut" }
            );
        });
      });

      function buildDots(i: number) {
        const act = acts[i];
        if (!act) return;
        dotsBox.innerHTML = "";
        act.labels.forEach((l, j) => {
          const b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", l.name);
          b.title = l.name.toUpperCase();
          if (j === 0) b.classList.add("active");
          b.addEventListener("click", () => {
            act.tl.play(l.time);
            playBtn.textContent = "PAUSE";
          });
          dotsBox.appendChild(b);
        });
      }

      // autoplay defaults to true: a tab click is explicit intent to watch,
      // so it always resets to the top and plays. Only the initial mount
      // passes false, leaving act I paused until it scrolls into view.
      function activate(i: number, autoplay = true) {
        const act = acts[i];
        if (!act) return;
        current = i;
        acts.forEach((a, j) => {
          a.panel?.classList.toggle("active", i === j);
          a.tl.pause();
        });
        tabBtns.forEach((b, j) => b.classList.toggle("active", i === j));
        buildDots(i);
        barFill.style.width = "0%";
        act.tl.pause(0);
        if (autoplay) {
          act.tl.play();
          playBtn.textContent = "PAUSE";
        } else {
          playBtn.textContent = "PLAY";
        }
      }

      const tabHandlers = tabBtns.map((b, i) => {
        const h = () => activate(i);
        b.addEventListener("click", h);
        return { b, h };
      });
      const playHandler = () => {
        const act = acts[current];
        if (!act) return;
        const tl = act.tl;
        if (tl.progress() === 1) {
          tl.restart();
          playBtn.textContent = "PAUSE";
          return;
        }
        tl.paused(!tl.paused());
        playBtn.textContent = tl.paused() ? "PLAY" : "PAUSE";
      };
      playBtn.addEventListener("click", playHandler);

      // Auto-play the current act while the section is on screen, pause it
      // off screen so it isn't burned unseen. Generous window: the stage is
      // tall, so keep it "on" for the whole time it's meaningfully visible.
      const resume = () => {
        const act = acts[current];
        if (act && act.tl.progress() < 1) {
          act.tl.play();
          playBtn.textContent = "PAUSE";
        }
      };
      const suspend = () => acts[current]?.tl.pause();
      const st = reduce
        ? null
        : ScrollTrigger.create({
            trigger: root,
            start: "top 85%",
            end: "bottom 15%",
            onEnter: resume,
            onEnterBack: resume,
            onLeave: suspend,
            onLeaveBack: suspend,
          });

      // Start paused on act I's first frame.
      activate(0, false);
      if (reduce) {
        // Show a composed still (final frame), no motion; play on demand.
        acts[0]?.tl.progress(1, true);
        barFill.style.width = "100%";
        playBtn.textContent = "REPLAY";
      } else if (st?.isActive) {
        resume();
      }

      return () => {
        st?.kill();
        tabHandlers.forEach(({ b, h }) => b.removeEventListener("click", h));
        playBtn.removeEventListener("click", playHandler);
      };
    },
    { dependencies: [desktop], scope: ref }
  );

  return (
    <section
      aria-label="Full Circle, the whole picture"
      className="st-theatre"
      id="theatre"
      ref={ref}
    >
      <div className="st-container">
        <div className="st-theatre-head">
          <span className="st-eyebrow">The whole picture</span>
          <h2 className="st-h2">Full Circle.</h2>
          <p className="st-sub">
            Three acts, one operating system. Pick an act. Each one plays
            itself.
          </p>
        </div>

        <div className="fc-theatre">
          <nav aria-label="Acts" className="tabs">
            <button className="active" type="button">
              Act I · The fabric
            </button>
            <button type="button">Act II · The bean</button>
            <button type="button">Act III · The circle</button>
          </nav>
          <div
            className="stages"
            /* Verbatim stage art — animated imperatively by GSAP via ids. */
            dangerouslySetInnerHTML={{ __html: THEATRE_STAGES_HTML }}
          />
          <div className="controls">
            <button id="playpause" type="button">
              PAUSE
            </button>
            <div id="scene-dots" />
            <div className="bar">
              <div id="bar-fill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
