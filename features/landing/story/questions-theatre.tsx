"use client";

/**
 * ACT 7.5 — ASK YOUR SUPPLY CHAIN (the AI layer, docs/AI-LAYER.md)
 *
 * One self-playing SVG stage telling the federated-Q&A story in five beats:
 * you ask → the question fans out (through a relay that stays dark, because
 * Bindu can't read it) → each node computes at home (the data dot bounces
 * off the node boundary — data never leaves) → a person approves the actual
 * disclosure (and one node says no) → signed answers compose asker-side.
 *
 * Three real scenarios rotate through the same choreography — EUDR DDS
 * references, a GRS transaction certificate, a battery carbon footprint —
 * only the labels change. That IS the claim: one pipe, any regulation.
 *
 * Same projector as theatre.tsx: paused master timeline, auto-plays in
 * view, pauses off screen; reduced-motion shows the composed final frame
 * and the scenario pills still swap content statically. Everything is
 * authored in its final state so no-JS/crawlers see a complete scene.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

/** Full choreography: desktop pointer devices, motion allowed. Mirrors the
 *  constant in bindu-landing-story.tsx - below 901px this stage is dropped in
 *  story.css and the section renders as its heading, tabs and three cards. */
const FULL = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

type Scenario = {
  tag: string;
  asker: string;
  nodes: [string, string, string];
  q: string;
  why: string;
  ap: [string, string];
  aw: [string, string, string];
};

/** Three questions the law (or the label) already forces buyers to ask. */
const SCENARIOS: Scenario[] = [
  {
    tag: "Coffee · EUDR",
    asker: "importer",
    nodes: ["co-op", "trader", "mill"],
    q: "“DDS reference numbers for order PO-2214?”",
    why: "your own filing must cite them, checked in TRACES",
    ap: ["DDS ref 25NL7K3X9M", "verification nr V-99DK2"],
    aw: [
      "Answer · order PO-2214",
      "DDS 25NL7K3X9M · V-99DK2 · co-op",
      "DDS 25DE4Q8V2C · V-84HF1 · trader",
    ],
  },
  {
    tag: "Textiles · recycled claim",
    asker: "brand",
    nodes: ["spinner", "fabric mill", "garment maker"],
    q: "“Valid GRS transaction certificate for lot F-88?”",
    why: "no valid certificate, no recycled claim on the label",
    ap: ["TC GRS-2026-4471 · valid", "65% recycled polyester"],
    aw: [
      "Answer · lot F-88",
      "TC GRS-2026-4471, valid · spinner",
      "65% rPET · 35% cotton · fabric mill",
    ],
  },
  {
    tag: "Batteries · CO₂",
    asker: "carmaker",
    nodes: ["refinery", "cathode plant", "cell maker"],
    q: "“Carbon footprint of cell model NC-811?”",
    why: "declaration mandatory since Feb 2025",
    ap: ["61 kg CO₂e per kWh", "third-party verified"],
    aw: [
      "Answer · cell NC-811",
      "61 kg CO₂e/kWh, verified · cell maker",
      "cathode share 38 kg · cathode plant",
    ],
  },
];

const CAPTIONS = [
  "You ask.",
  "The question goes out.",
  "Their data stays with them.",
  "A person approves the answer.",
  "You get it back, signed.",
];

/** Envelope glyph, authored at the origin and flown via MotionPath.
    Bold-outline weight so it reads on the thick pipes (Ditto language). */
function Envelope({ id, answer = false }: { id: string; answer?: boolean }) {
  return (
    <g className={answer ? "qa-env qa-env-answer" : "qa-env"} id={id}>
      <rect height="16" rx="3" width="26" x="-13" y="-8" />
      <path d="M -13 -8 L 0 4 L 13 -8" fill="none" />
      {answer ? (
        <>
          <circle cx="0" cy="0" fill="none" r="3.8" />
          <path d="M 0 -3.8 L 0 0" fill="none" />
        </>
      ) : null}
    </g>
  );
}

/** One isometric cube, Ditto's block language: three flat faces, bold ink
    outline. The group carries stroke + stroke-width as presentation
    attributes so GSAP can pulse the outline via attr tweens. */
function IsoCube({
  className,
  id,
  x,
  y,
  children,
}: {
  className: string;
  id?: string;
  x: number;
  y: number;
  children?: React.ReactNode;
}) {
  return (
    <g
      className={className}
      id={id}
      strokeWidth={3}
      transform={`translate(${x} ${y})`}
    >
      <polygon className="qa-face-l" points="-30,-23 0,-8 0,28 -30,13" />
      <polygon className="qa-face-r" points="30,-23 0,-8 0,28 30,13" />
      <polygon className="qa-face-t" points="0,-38 30,-23 0,-8 -30,-23" />
      {children}
    </g>
  );
}

export function StQuestions() {
  const ref = useRef<HTMLElement | null>(null);
  /** Set inside the motion context; pills fall back to a static swap. */
  const goRef = useRef<((i: number) => void) | null>(null);
  const scenarioRef = useRef(0);

  /** Write one scenario's strings into the authored stage. */
  const applyScenario = (i: number) => {
    const root = ref.current;
    const s = SCENARIOS[i];
    if (!root || !s) return;
    scenarioRef.current = i;
    const put = (sel: string, text: string) => {
      const el = root.querySelector<SVGTextElement>(sel);
      if (el) el.textContent = text;
    };
    put("#qa-asker-role", s.asker);
    put("#qa-lbl-a", s.nodes[0]);
    put("#qa-lbl-b", s.nodes[1]);
    put("#qa-lbl-c", s.nodes[2]);
    put("#qa-chip-text", s.q);
    put("#qa-chip-why", s.why);
    put("#qa-ap-1", s.ap[0]);
    put("#qa-ap-2", s.ap[1]);
    put("#qa-aw-t", s.aw[0]);
    put("#qa-aw-1", s.aw[1]);
    put("#qa-aw-2", s.aw[2]);
    // Size the chip to the actual rendered text (16px padding each side),
    // measured from the glyph box so it never spills past the pill.
    const chipRect = root.querySelector("#qa-chip-rect");
    const chipTextEl = root.querySelector<SVGTextElement>("#qa-chip-text");
    if (chipRect && chipTextEl) {
      const tw = chipTextEl.getBBox().width;
      chipRect.setAttribute("width", String(Math.round(tw + 32)));
    }
    root.querySelectorAll<HTMLButtonElement>(".st-qa-tab").forEach((b, j) => {
      b.classList.toggle("active", j === i);
    });
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      // Correct the SSR width estimate against real glyph metrics on mount.
      applyScenario(scenarioRef.current);
      const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);

      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        const captionEl = q<HTMLElement>("#qa-caption");
        const beatDots = gsap.utils.toArray<HTMLElement>(".st-qa-beat");
        const chipTextEl = q<SVGTextElement>("#qa-chip-text");
        const beat = (i: number) => {
          if (captionEl) {
            captionEl.textContent = CAPTIONS[i] ?? "";
            gsap.fromTo(
              captionEl,
              { autoAlpha: 0.2 },
              { autoAlpha: 1, duration: 0.35 }
            );
          }
          beatDots.forEach((d, j) => d.classList.toggle("active", j === i));
        };

        // Head reveal, same entrance as every other act.
        gsap.from(".st-qa-head > *, .st-qa-tabs, .st-qa-card", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".st-qa-head", start: "top 80%" },
        });

        const typer = { p: 0 };
        const tl = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 0.9,
          defaults: { ease: "power2.inOut" },
          onRepeat: () => {
            const next = (scenarioRef.current + 1) % SCENARIOS.length;
            applyScenario(next);
          },
        });

        /* Beat 1 — you ask: the question types itself out. */
        tl.call(() => beat(0))
          .set(
            [
              "#qa-env-a",
              "#qa-env-b",
              "#qa-env-c",
              "#qa-ans-a",
              "#qa-ans-b",
              "#qa-approve",
              "#qa-decline",
              "#qa-answer",
              "#qa-chip-why",
              "#qa-relay",
            ],
            { autoAlpha: 0 }
          )
          .set(["#qa-r-a", "#qa-r-b"], { autoAlpha: 0 })
          .set([".qa-draw-a", ".qa-draw-b", ".qa-draw-c"], { drawSVG: "0%" })
          .set("#qa-n-c", { autoAlpha: 1 })
          .set(typer, { p: 0 })
          .fromTo("#qa-chip", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
          .to(typer, {
            p: 1,
            duration: 1.3,
            ease: "none",
            onUpdate: () => {
              const s = SCENARIOS[scenarioRef.current];
              if (chipTextEl && s)
                chipTextEl.textContent = s.q.slice(
                  0,
                  Math.round(typer.p * s.q.length)
                );
            },
          })
          .to("#qa-chip-why", { autoAlpha: 1, duration: 0.4 })
          .to({}, { duration: 0.5 });

        /* Beat 2 — fan out: envelopes fly, and Bindu appears on the pipe
           once the line is drawn (it relays but stays dark). */
        tl.call(() => beat(1)).addLabel("fan");
        tl.to("#qa-relay", { autoAlpha: 1, duration: 0.4 }, "fan+=0.7");
        (["a", "b", "c"] as const).forEach((k, i) => {
          tl.to(`.qa-draw-${k}`, { drawSVG: "100%", duration: 1.4, ease: "power1.inOut" }, `fan+=${i * 0.15}`)
            .to(`#qa-env-${k}`, { autoAlpha: 1, duration: 0.2 }, `fan+=${i * 0.15}`)
            .to(
              `#qa-env-${k}`,
              {
                motionPath: {
                  path: `#qa-p-${k}`,
                  align: `#qa-p-${k}`,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 1.4,
                ease: "power1.inOut",
              },
              `fan+=${i * 0.15}`
            )
            .to(`#qa-env-${k}`, { autoAlpha: 0, duration: 0.25 }, ">-0.1");
        });

        /* Beat 3 — computed at home: the data dot bounces off the ring. */
        tl.call(() => beat(2))
          .to(".qa-ring", {
            attr: { "stroke-width": 5.5 },
            duration: 0.35,
            yoyo: true,
            repeat: 3,
            stagger: 0.12,
          })
          .to(".qa-data", { x: 30, duration: 0.5, ease: "power2.in" }, "<")
          .to(".qa-data", { x: 0, duration: 0.9, ease: "elastic.out(1.1, 0.4)" }, ">")
          .to({}, { duration: 0.3 });

        /* Beat 4 — a person approves the disclosure; the mill says no. */
        tl.call(() => beat(3))
          .fromTo(
            "#qa-approve",
            { autoAlpha: 0, scale: 0.82, transformOrigin: "50% 50%" },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }
          )
          .fromTo(
            "#qa-approve-btn",
            { scale: 1, transformOrigin: "50% 50%" },
            { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 },
            "+=0.9"
          )
          .fromTo("#qa-decline", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, "<")
          .to("#qa-n-c", { autoAlpha: 0.35, duration: 0.4 }, "<")
          .to("#qa-approve", { autoAlpha: 0, duration: 0.3 }, "+=0.7");

        /* Beat 5 — sealed answers return and compose, signed. */
        tl.call(() => beat(4)).set(["#qa-r-a", "#qa-r-b"], { autoAlpha: 0.5 });
        tl.addLabel("ret");
        (["a", "b"] as const).forEach((k, i) => {
          tl.to(`#qa-ans-${k}`, { autoAlpha: 1, duration: 0.2 }, `ret+=${i * 0.2}`)
            .to(
              `#qa-ans-${k}`,
              {
                motionPath: {
                  path: `#qa-r-${k}`,
                  align: `#qa-r-${k}`,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 1.3,
                ease: "power1.inOut",
              },
              `ret+=${i * 0.2}`
            )
            .to(`#qa-ans-${k}`, { autoAlpha: 0, duration: 0.2 }, ">-0.1");
        });
        tl.to("#qa-asker-ring", {
          attr: { "stroke-width": 5.5 },
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        })
          .fromTo(
            "#qa-answer",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "<"
          )
          .to({}, { duration: 2 })
          .to(["#qa-r-a", "#qa-r-b"], { autoAlpha: 0, duration: 0.4 })
          .to(["#qa-chip", "#qa-chip-why", "#qa-answer"], { autoAlpha: 0, duration: 0.4 }, "<");

        goRef.current = (i: number) => {
          applyScenario(i);
          tl.restart();
        };

        // Play while on screen, pause off screen (theatre pattern).
        const st = ScrollTrigger.create({
          trigger: ".st-qa-stage",
          start: "top 85%",
          end: "bottom 10%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeave: () => tl.pause(),
          onLeaveBack: () => tl.pause(),
        });
        if (st.isActive) tl.play();

        return () => {
          goRef.current = null;
          st.kill();
        };
      });
    },
    { scope: ref }
  );

  const s0 = SCENARIOS[0]!;

  return (
    <section aria-label="Ask your supply chain" className="st-qa" ref={ref}>
      <div className="st-container">
        <div className="st-qa-head">
          <span className="st-eyebrow">Ask your supply chain</span>
          <h2 className="st-h2">Stop chasing documents. Just ask.</h2>
          <p className="st-sub">
            Type a question. Your suppliers&apos; own systems work out the
            answer, a real person on their side hits approve, and you get it
            back signed. Nobody emails files around.
          </p>
        </div>

        <div className="st-qa-tabs" role="group" aria-label="Example questions">
          {SCENARIOS.map((s, i) => (
            <button
              className={i === 0 ? "st-qa-tab active" : "st-qa-tab"}
              key={s.tag}
              onClick={() => (goRef.current ?? applyScenario)(i)}
              type="button"
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Authored in the loop's final frame: full question + signed answer
            visible, so no-JS, crawlers and reduced-motion get the whole
            story. The timeline hides pieces only inside its motion context. */}
        <div aria-hidden="true" className="st-qa-stage">
          <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
            {/* Ditto's halftone backdrop: a quiet dotted grid behind the
                whole stage. */}
            <defs>
              <pattern
                height="16"
                id="qa-dotgrid"
                patternUnits="userSpaceOnUse"
                width="16"
              >
                <rect className="qa-dot" height="2.4" width="2.4" x="0" y="0" />
              </pattern>
            </defs>
            <rect fill="url(#qa-dotgrid)" height="380" width="900" x="0" y="0" />

            {/* Pipes: each route is an ink underlay + a marker-yellow core,
                drawn together (both carry .qa-draw-*). The yellow core keeps
                the qa-p-* id — it is the MotionPath rail. */}
            <path className="qa-pipe-ink qa-draw-a" d="M 158 190 Q 420 132 678 78" />
            <path className="qa-pipe-ink qa-draw-b" d="M 158 190 Q 420 190 708 190" />
            <path className="qa-pipe-ink qa-draw-c" d="M 158 190 Q 420 248 678 302" />
            <path className="qa-pipe qa-draw-a" d="M 158 190 Q 420 132 678 78" id="qa-p-a" />
            <path className="qa-pipe qa-draw-b" d="M 158 190 Q 420 190 708 190" id="qa-p-b" />
            <path className="qa-pipe qa-draw-c" d="M 158 190 Q 420 248 678 302" id="qa-p-c" />
            <path className="qa-return" d="M 678 78 Q 420 132 158 190" id="qa-r-a" />
            <path className="qa-return" d="M 708 190 Q 420 190 158 190" id="qa-r-b" />

            <g className="qa-relay" id="qa-relay">
              {/* Bindu sits on the pipe as the relay — a clean puck so the
                  mark reads on the yellow core, not the old placeholder box. */}
              <circle className="qa-relay-puck" cx="420" cy="190" r="23" />
              <image height="42" href="/bindu-logo.png" width="42" x="399" y="169" />
            </g>

            <g>
              <IsoCube
                className="qa-cube qa-cube-asker"
                id="qa-asker-ring"
                x={110}
                y={186}
              />
              <text className="qa-name" textAnchor="middle" x="110" y="236">
                You
              </text>
              <text className="qa-role" id="qa-asker-role" textAnchor="middle" x="110" y="252">
                {s0.asker}
              </text>
            </g>

            <g id="qa-chip">
              <rect
                className="qa-chip-rect"
                height="34"
                id="qa-chip-rect"
                rx="17"
                width={Math.min(32 + s0.q.length * 8.6, 440)}
                x="44"
                y="74"
              />
              <text className="qa-q" id="qa-chip-text" x="60" y="96">
                {s0.q}
              </text>
            </g>
            <text className="qa-why" id="qa-chip-why" x="60" y="126">
              {s0.why}
            </text>

            {(["a", "b", "c"] as const).map((k, i) => {
              const pos = [
                { x: 720, y: 70 },
                { x: 748, y: 190 },
                { x: 720, y: 310 },
              ][i]!;
              return (
                <g className="qa-node" id={`qa-n-${k}`} key={k}>
                  <IsoCube className="qa-cube qa-ring" x={pos.x} y={pos.y}>
                    {/* The supplier's data: a small green cube that lives on
                        the block and never leaves it. */}
                    <g className="qa-data" transform="translate(0 -23)">
                      <polygon className="qa-data-l" points="-9,-7.5 0,-3 0,8 -9,3.5" />
                      <polygon className="qa-data-r" points="9,-7.5 0,-3 0,8 9,3.5" />
                      <polygon className="qa-data-t" points="0,-12 9,-7.5 0,-3 -9,-7.5" />
                    </g>
                  </IsoCube>
                  <text
                    className="qa-role"
                    id={`qa-lbl-${k}`}
                    textAnchor="middle"
                    x={pos.x}
                    y={pos.y + 58}
                  >
                    {s0.nodes[i]}
                  </text>
                </g>
              );
            })}

            <Envelope id="qa-env-a" />
            <Envelope id="qa-env-b" />
            <Envelope id="qa-env-c" />
            <Envelope answer id="qa-ans-a" />
            <Envelope answer id="qa-ans-b" />

            <g className="qa-card" id="qa-approve">
              <rect height="86" rx="10" width="238" x="430" y="14" />
              <text className="qa-why" x="446" y="38">
                They will learn:
              </text>
              <text className="qa-fact" id="qa-ap-1" x="446" y="58">
                {s0.ap[0]}
              </text>
              <text className="qa-fact" id="qa-ap-2" x="446" y="76">
                {s0.ap[1]}
              </text>
              <g id="qa-approve-btn">
                <rect className="qa-yes" height="24" rx="12" width="54" x="600" y="64" />
                <text className="qa-yes-label" textAnchor="middle" x="627" y="80">
                  Yes
                </text>
              </g>
            </g>

            <g className="qa-card qa-decline" id="qa-decline">
              <circle cx="768" cy="278" fill="none" r="11" />
              <path d="M 763 273 L 773 283 M 773 273 L 763 283" fill="none" />
              <text className="qa-why" x="784" y="283">
                said no
              </text>
            </g>

            <g className="qa-card qa-answer" id="qa-answer">
              <rect height="96" rx="12" width="286" x="40" y="258" />
              <text className="qa-fact" id="qa-aw-t" x="56" y="282">
                {s0.aw[0]}
              </text>
              <text className="qa-ref" id="qa-aw-1" x="56" y="304">
                {s0.aw[1]}
              </text>
              <text className="qa-ref" id="qa-aw-2" x="56" y="322">
                {s0.aw[2]}
              </text>
              <text className="qa-signed" x="238" y="344">
                signed
              </text>
              <g className="qa-seal">
                <circle cx="298" cy="340" r="10" />
                <path d="M 293 340 L 297 344 L 304 335" fill="none" />
              </g>
            </g>
          </svg>

          <div className="st-qa-strip">
            <div className="st-qa-beats">
              {CAPTIONS.map((c, i) => (
                <span
                  className={i === CAPTIONS.length - 1 ? "st-qa-beat active" : "st-qa-beat"}
                  key={c}
                />
              ))}
            </div>
            <p id="qa-caption">{CAPTIONS[CAPTIONS.length - 1]}</p>
          </div>
        </div>

        <div className="st-qa-cards">
          <article className="st-qa-card">
            <span className="st-reg-word">Unread.</span>
            <span className="st-reg-law">Sealed to you</span>
            <p>
              Answers are sealed to the asker. Bindu carries the envelope and
              can&apos;t open it. Not won&apos;t. Can&apos;t.
            </p>
          </article>
          <article className="st-qa-card">
            <span className="st-reg-word">Allowed.</span>
            <span className="st-reg-law">They stay in control</span>
            <p>
              Before anything leaves, your supplier sees exactly what
              you&apos;ll learn, and can say no. Their files never move.
            </p>
          </article>
          <article className="st-qa-card">
            <span className="st-reg-word">Provable.</span>
            <span className="st-reg-law">Signed at the source</span>
            <p>
              Every answer is signed by the company that gave it. Paste it in
              your filing, show it to your auditor.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
