"use client";

/**
 * Bindu story landing — the dayos-pattern rebuild, animated with GSAP only.
 *
 * Sections, in render order (see BinduLandingStory):
 *  1  Hero (Rotterdam film)      — SplitText mask reveal, scrubbed parallax;
 *                                  sticky inside .st-stage so the slab rides over it
 *  2  The thesis / Bindu OS       — Ditto-pattern centred statement (the old
 *                                  five-regulations grid was cut 2026-08-11),
 *                                  then a montage of real product surfaces (os-gallery.tsx)
 *  4  Full Circle theatre         — see theatre.tsx (own timelines + plugins)
 *  5  The dots (secured layer)    — grid stagger + DrawSVG links
 *  5.5 Ask your supply chain      — federated Q&A stage (questions-theatre.tsx)
 *  6  The dream (circular economy)— DrawSVG sunflower loops
 *  7  Ten worked examples         — seamless horizontal loop, next/prev
 *  8  Conversations               — bubble stagger + GSAP marquee
 * 10  Pricing (#pricing)          — Ditto stats banner in marker yellow,
 *                                  last act before the footer; footer links here
 *
 * Every element is authored in its FINAL state so no-JS, reduced-motion and
 * crawlers see the complete page; GSAP animates *from* hidden states inside
 * matchMedia contexts only. MotionPath/TextPlugin live in theatre.tsx, not here.
 */

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cdnAsset } from "@/lib/cdn";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { LandingFooter } from "../chrome/landing-footer";
import { IslandHeader } from "../chrome/island-header";
import { StTheatre } from "./theatre";
import { StQuestions } from "./questions-theatre";
import { StOsGallery } from "./os-gallery";
import { BtnLabel, DemoButton } from "./story-shared";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
import { PRICE_TABS, PRICING_NOTE } from "../pricing/price-data";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

/**
 * Full choreography: desktop pointer devices, motion allowed.
 *
 * Below 901px the homepage is deliberately still. Every reveal here is a
 * `gsap.from()` over markup authored in its FINAL state, so not registering
 * the tween leaves the finished page on screen - the same guarantee that
 * already serves reduced-motion and crawlers. The decorative blocks the
 * motion existed to show off are dropped outright in story.css at the same
 * breakpoint; the theatre, which authors its content HIDDEN and would go
 * blank if merely un-animated, is removed in theatre.css rather than gated.
 */
const FULL = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

/* =============================================================
   ACT 1 — HERO
   ============================================================= */

/** Sections the hero's "Assign to" chip cycles through (Ditto's assignee
    pill, retold: a shipment gets filed under the right regulation). */
const ASSIGN_SECTIONS = [
  "EUDR",
  "CBAM",
  "DPP",
  "REACH",
  "HS code",
];

function StHero() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = (q: string) => window.matchMedia(q).matches;
    // Poster only for reduced-motion and Data Saver: both are explicit
    // signals from the person using the page, so they still win.
    //
    // Width is NOT one of them any more. The clip used to be skipped below
    // 901px to save the download, but the poster it falls back to is 465K
    // against 613K for the AV1 clip, so the phone was already paying for
    // most of it. The element carries muted + loop + playsInline, which is
    // what iOS needs to autoplay inline, and preload="none" plus the
    // JS-attached sources mean nothing is fetched until this runs.
    if (media("(prefers-reduced-motion: reduce)")) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    // Attach the sources here rather than in the SSR markup so crawlers and
    // no-JS clients never fetch the clip. AV1 first (smaller); the VP9 file is
    // the fallback for Safari/iOS, which can't decode AV1.
    for (const [path, type] of [
      ["/videos/rotterdam-port-hero.av1.webm", 'video/webm; codecs="av01.0.05M.08"'],
      ["/videos/rotterdam-port-hero.webm", 'video/webm; codecs="vp9"'],
    ] as const) {
      const source = document.createElement("source");
      source.src = cdnAsset(path);
      source.type = type;
      video.appendChild(source);
    }
    video.muted = true;
    video.load();
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        // Split once the real glyphs are in. Deliberately outside the gsap
        // context: strict-mode's revert of the first effect run would kill a
        // context-tracked tween the moment the font promise resolves, leaving
        // the masked lines stranded off-screen. The cancelled flag handles
        // teardown instead; the split markup dies with the DOM on unmount.
        let cancelled = false;
        void document.fonts.ready.then(() => {
          if (cancelled) return;
          const h1 = document.querySelector<HTMLElement>(".st-hero h1");
          if (!h1 || h1.dataset.split === "done") return;
          h1.dataset.split = "done";
          const split = SplitText.create(h1, {
            type: "lines",
            mask: "lines",
            linesClass: "st-hero-line",
          });
          gsap.from(split.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.1,
          });
        });

        gsap.from(".st-hero-sub", {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.85,
        });

        // The "Assign to" chip cycles through the regulation sections,
        // operated by the hand cursor (Ditto's hero actor): the cursor
        // rides in, presses the value box, the current name slides out and
        // the next slides in, then the cursor drifts back to rest.
        // Reduced-motion users see the chip pinned on EUDR, no cursor.
        const assignName = document.querySelector<HTMLElement>(
          ".st-hero-assign-name"
        );
        const assignCursor = document.querySelector<HTMLElement>(
          ".st-hero-cursor"
        );
        const assignValue = document.querySelector<HTMLElement>(
          ".st-hero-assign-value"
        );
        if (assignName && assignCursor && assignValue) {
          let section = 0;
          gsap
            .timeline({ repeat: -1, repeatDelay: 1.2, delay: 2.2 })
            // ride in over the value box...
            .to(assignCursor, {
              x: -38,
              y: -30,
              duration: 0.5,
              ease: "power2.out",
            })
            // ...press (cursor and box dip together)...
            .to(assignCursor, {
              scale: 0.85,
              transformOrigin: "25% 12%",
              duration: 0.12,
              yoyo: true,
              repeat: 1,
            })
            .to(
              assignValue,
              {
                scale: 0.96,
                transformOrigin: "50% 50%",
                duration: 0.12,
                yoyo: true,
                repeat: 1,
              },
              "<"
            )
            // ...the section swaps...
            .to(assignName, {
              yPercent: -110,
              duration: 0.24,
              ease: "power2.in",
            })
            .add(() => {
              section = (section + 1) % ASSIGN_SECTIONS.length;
              assignName.textContent = ASSIGN_SECTIONS[section] ?? "EUDR";
            })
            .fromTo(
              assignName,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.28, ease: "power2.out" }
            )
            // ...and the cursor drifts back to rest.
            .to(assignCursor, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.inOut",
            }, "+=0.35");
        }

        // Slow push-in on the film while the copy drifts out. Scale only:
        // the hero is pinned under the slab, so a yPercent drift would
        // peel the film off the viewport top.
        gsap.to(".st-hero-media", {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".st-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".st-hero-inner", {
          autoAlpha: 0,
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ".st-hero",
            start: "35% top",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          cancelled = true;
        };
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Introduction" className="st-hero" ref={ref}>
      <div aria-hidden="true" className="st-hero-media">
        <Image
          alt=""
          className="st-hero-poster"
          fill
          priority
          sizes="100vw"
          src="/images/hero-ship-sketch.webp"
        />
        {/* No <source> in SSR: the effect attaches AV1/VP9 sources only for
            capable, motion-OK, non-metered desktop clients. Everyone else —
            crawlers, no-JS, reduced-motion, mobile, Data Saver — sees the
            poster alone and never downloads the clip. */}
        <video
          className="st-hero-video"
          loop
          muted
          playsInline
          poster={cdnAsset("/images/hero-ship-sketch.webp")}
          preload="none"
          ref={videoRef}
        />
      </div>

      <div className="st-container st-hero-inner">
        <h1>
          <span className="st-hero-h1-lead">The first intelligent end-to-end</span>
          <span className="st-hero-h1-mark">trade compliance OS</span>
        </h1>
        <div className="st-hero-sub">
          {/* Ditto's "Assign to" live-chip, retold for compliance: one pill
              that files the shipment under a section, the value cycling
              through the regulations (see ASSIGN_SECTIONS). Decorative —
              the paragraph below carries the message for readers. */}
          <div aria-hidden="true" className="st-hero-assign">
            <span className="st-hero-assign-label">
              <svg
                fill="none"
                height="14"
                viewBox="0 0 14 14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3.5c0-.55.45-1 1-1h3l1.2 1.4h4.8c.55 0 1 .45 1 1v5.6c0 .55-.45 1-1 1h-9c-.55 0-1-.45-1-1v-7Z"
                  fill="currentColor"
                />
              </svg>
              Assign to
            </span>
            <span className="st-hero-assign-value">
              <span className="st-hero-assign-mask">
                <span className="st-hero-assign-name">EUDR</span>
              </span>
              <svg
                aria-hidden="true"
                fill="none"
                height="7"
                viewBox="0 0 11 7"
                width="11"
              >
                <path
                  d="M1 1.25 5.5 5.75 10 1.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            {/* The hand cursor that "operates" the chip (Ditto's hero
                actor): rides in, presses the value box, the section
                swaps. Purely decorative; hidden for reduced motion. */}
            <svg
              aria-hidden="true"
              className="st-hero-cursor"
              fill="none"
              viewBox="0 0 24 26"
            >
              <path
                d="M8.5 2.2c0-.94.76-1.7 1.7-1.7.94 0 1.7.76 1.7 1.7v8h.7V5.4c0-.94.76-1.7 1.7-1.7.94 0 1.7.76 1.7 1.7v5.4h.7v-3c0-.94.76-1.7 1.7-1.7.94 0 1.7.76 1.7 1.7v7.4c0 4.6-3 7.6-7.4 7.6h-1c-2.9 0-4.7-1.2-6-3.4l-3-5c-.5-.85-.2-1.95.68-2.42.76-.4 1.7-.18 2.2.52l1.22 1.7V2.2Z"
                fill="#fff"
                stroke="#17140f"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <p>
            One window: describe your shipment and Bindu finds the
            regulations that apply. HS code, evidence, filings. You ship,
            Bindu keeps the paperwork straight, whether you import six
            containers a year or six hundred.
          </p>
          <div className="st-hero-ctas">
            <DemoButton />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 2 — THE THESIS (the first ivory sheet; Ditto pattern)
   The curved sheet rides up over the sticky hero film and opens
   with Ditto's centred statement block: one big calm heading, one
   supporting paragraph, nothing else. It carries the chrome-flip
   sentinel (the header watches this sheet's top edge). Below it
   the Bindu OS intro sits centred, over a montage of real product
   surfaces (os-gallery.tsx), each captioned for what it does.
   ============================================================= */
function StGuard() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        // Intro copy rises in as one centred column.
        gsap.from(".st-guard-copy > *", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".st-guard-intro", start: "top 74%" },
        });

        // The slider fades up once as it enters — one shot, never a
        // scrub, so the section stays calm on the way down.
        gsap.from(".osl", {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".osl", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Why Bindu exists" className="st-guard" id="film" ref={ref}>
      {/* Chrome flip marker: the hero is sticky and never leaves the
          viewport, so the header watches this sheet's top edge instead —
          bar ink turns dark once the ivory passes under it. */}
      <div aria-hidden="true" className="lp-island-sentinel" />
      <div className="st-container">
        <div className="st-guard-intro">
          <div className="st-guard-copy">
            <span className="st-eyebrow">The operating system</span>
            <h2 className="st-guard-h2">
              Introducing
              <br />
              Bindu OS
            </h2>
            <p className="st-guard-lead">You ship. Bindu files.</p>
            <DemoButton />
          </div>
        </div>

        {/* The montage: real product surfaces, each captioned for what it
            does. Screens span several example shipments, so it reads as a
            capability tour rather than one linear flow. */}
        <StOsGallery />
      </div>
    </section>
  );
}

/* =============================================================
   ACT 9. TEN WORKED EXAMPLES (seamless horizontal loop)
   Rendered after "Where the dots lead": the story returns from
   the dream to the border. A horizontal strip of worked examples,
   written from the regulations themselves, across EUDR, DPP and
   battery. These are NOT customer filings and must never be
   written as if they were: no named customer, no outcome we have
   not shipped, and no line in which Bindu renders the verdict
   (applicability and risk are the rules engine's call, per
   CLAUDE.md). Next/prev advance the strip via horizontalLoop
   (GSAP's official seamless-loop helper): the departing card wraps
   around to the far end.
   ============================================================= */
type ShipmentStory = {
  reg: string;
  verdict: "cleared" | "refused";
  route: string;
  title: string;
  text: string;
};

const SHIPMENTS: ShipmentStory[] = [
  {
    reg: "EUDR · Coffee",
    verdict: "cleared",
    route: "Chikkamagaluru → Rotterdam",
    title: "Draw the map once.",
    text: "An estate maps its plots before harvest. The coordinates sit outside the forest cover cleared after 2020, so the dossier can carry the plot file, the operator's risk assessment and the statement reference the buyer needs.",
  },
  {
    reg: "EUDR · Coffee",
    verdict: "refused",
    route: "Chikkamagaluru → Hamburg",
    title: "Papers lie. Maps don't.",
    text: "Good beans, but one field sits on land the paperwork never covered. With no plot the estate can stand behind, there is nothing to put in the statement, and the buyer goes to the estate next door.",
  },
  {
    reg: "DPP · Silk",
    verdict: "cleared",
    route: "Kanchipuram → Paris",
    title: "Weave the proof in.",
    text: "A sari carries its GI certificate in the product record: the co-op, the loom, the zari. A boutique in Paris scans the code and reads the file the weaver filled in.",
  },
  {
    reg: "Battery · EV",
    verdict: "cleared",
    route: "Ulsan → Bratislava",
    title: "Cells that carry their own file.",
    text: "Cells leave the plant with their chemistry, carbon footprint and recycled content already recorded. The line downstream reads the file instead of emailing for it.",
  },
  {
    reg: "EUDR · Cocoa",
    verdict: "cleared",
    route: "Kumasi → Amsterdam",
    title: "Do it once. Never again.",
    text: "Forty smallholders, mapped once. The next shipment reuses the same plots and the same evidence, so most of the second dossier is already written.",
  },
  {
    reg: "DPP · Pashmina",
    verdict: "cleared",
    route: "Srinagar → Milan",
    title: "One scan settles it.",
    text: "A shawl with its GI certificate inside the passport. A thousand lookalikes hang in the same street, and one of them can show where the wool came from.",
  },
  {
    reg: "EUDR · Rubber",
    verdict: "refused",
    route: "Sumatra → Antwerp",
    title: "The satellite has a long memory.",
    text: "One plot overlaps forest cleared after 2020. The images are dated and the boundary is not in dispute, so that lot cannot go into the dossier.",
  },
  {
    reg: "Battery · Hybrid",
    verdict: "cleared",
    route: "Nagoya → second life",
    title: "Nothing is wasted in Nagoya.",
    text: "A retired pack still carries its full history. The recycler reads it, pulls the nickel and the cobalt, and the chemistry goes round again.",
  },
  {
    reg: "DPP · Textiles",
    verdict: "refused",
    route: "Unknown mill → delisted",
    title: "Cheap needs an alibi.",
    text: "A “pashmina” lot with no passport and no trail. The lab finds polyester, and the marketplace has nothing to put behind the listing.",
  },
  {
    reg: "Battery",
    verdict: "refused",
    route: "No QR → held at customs",
    title: "2027 doesn't negotiate.",
    text: "A pack with no code, no chemistry and no carbon number. From 18 February 2027 the passport is what lets it on the EU market, so it waits in the warehouse.",
  },
];

/**
 * GSAP's official seamless-loop helper (docs "horizontalLoop"), trimmed to
 * what the strip needs. All items live on one infinite band driven by a
 * single paused timeline; next()/previous() tween to the adjacent card and
 * items wrap via xPercent, so the row can never run out on either side.
 */
type HorizontalLoop = gsap.core.Timeline & {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
};

function horizontalLoop(
  items: HTMLElement[],
  config: { paddingRight?: number; speed?: number }
): HorizontalLoop {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
    onReverseComplete: () =>
      void tl.totalTime(tl.rawTime() + tl.duration() * 100),
  }) as HorizontalLoop;
  const length = items.length;
  const firstItem = items[0];
  const lastItem = items[length - 1];
  if (!firstItem || !lastItem) return tl;
  const startX = firstItem.offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed ?? 1) * 100;
  const snap = gsap.utils.snap(1);
  gsap.set(items, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string
      ));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  const lastWidth = widths[length - 1] ?? 0;
  const lastXPercent = xPercents[length - 1] ?? 0;
  const totalWidth =
    lastItem.offsetLeft +
    (lastXPercent / 100) * lastWidth -
    startX +
    lastItem.offsetWidth * (gsap.getProperty(lastItem, "scaleX") as number) +
    (config.paddingRight ?? 0);
  for (let i = 0; i < length; i++) {
    const item = items[i];
    if (!item) continue;
    const width = widths[i] ?? 1;
    const curX = ((xPercents[i] ?? 0) / 100) * width;
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + width * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / width) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / width) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add(`label${i}`, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  const toIndex = (index: number, vars: gsap.TweenVars = {}) => {
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex] ?? 0;
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  };
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.progress(1, true).progress(0, true);
  return tl;
}

function StShipments() {
  const ref = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<HorizontalLoop | null>(null);

  const step = (forward: boolean) => {
    const loop = loopRef.current;
    if (!loop) return;
    const vars = { duration: 0.55, ease: "power2.inOut" };
    if (forward) {
      loop.next(vars);
    } else {
      loop.previous(vars);
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The loop owns every card transform, so it must not run on phones:
      // below 901px the strip is a native scroll-snap rail (story.css) and
      // the Prev/Next buttons it drives are hidden. Running both would leave
      // the cards transformed out from under the scroller.
      //
      // This goes through gsap.matchMedia, not a one-shot matchMedia read: a
      // plain read is taken once at mount and never again, so a tablet
      // rotated from 834 portrait to 1112 landscape crossed the breakpoint,
      // the CSS revealed Prev/Next, and the buttons did nothing because the
      // loop had never been built. matchMedia builds it on the way up and
      // reverts on the way down.
      mm.add("(min-width: 901px)", () => {
        const strip = stripRef.current;
        if (!strip) return;
        loopRef.current = horizontalLoop(
          gsap.utils.toArray<HTMLElement>(".st-ship-card", strip),
          { paddingRight: 16 } // keep the flex gap when a card wraps around
        );
        return () => {
          loopRef.current?.kill();
          loopRef.current = null;
        };
      });
      const reveal = () => {
        gsap.from(".st-ship-head > *", {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".st-ship-head", start: "top 82%" },
        });
        // Reveal the wrapper, never the cards: the loop owns every card
        // transform, and a scroll-in stagger on the same cards would
        // contend for the same channels when a click lands mid-reveal.
        gsap.from(".st-ship-viewport, .st-ship-nav", {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".st-ship-viewport", start: "top 85%" },
        });
      };
      // LITE is left unregistered: below 901px the section is static.
      mm.add(FULL, reveal);
    },
    { scope: ref }
  );

  return (
    <section
      aria-label="Worked examples"
      className="st-section st-ship"
      ref={ref}
    >
      <div className="st-container">
        <div className="st-ship-head">
          <span className="st-eyebrow">Worked examples</span>
          <h2 className="st-h2">What the rules let through, and what they stop.</h2>
          <p className="st-sub">
            Ten of them, written from the regulations themselves.
            Illustrations, not customer filings: the verdict on a real
            shipment belongs to the rules and to the authority that reads
            them.
          </p>
        </div>
      </div>
      <div className="st-ship-viewport">
        <div className="st-ship-strip" ref={stripRef}>
          {SHIPMENTS.map((s) => (
            <article
              className="st-ship-card"
              data-verdict={s.verdict}
              key={s.title}
            >
              <div className="st-ship-top">
                <span className="st-ship-reg">{s.reg}</span>
                <span className="st-ship-verdict">
                  {s.verdict === "cleared" ? "Cleared" : "Refused"}
                </span>
              </div>
              <h3 className="st-ship-title">{s.title}</h3>
              <p className="st-ship-text">{s.text}</p>
              <span className="st-ship-route">{s.route}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="st-ship-nav">
        <button
          aria-label="Previous story"
          className="st-btn st-btn-ghost"
          onClick={() => step(false)}
          type="button"
        >
          <ArrowRight style={{ transform: "rotate(180deg)" }} />
          Prev
        </button>
        <button
          aria-label="Next story"
          className="st-btn st-btn-ghost"
          onClick={() => step(true)}
          type="button"
        >
          Next
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 7 — THE DOTS (the secured layer)
   ============================================================= */
const DOT_GRID = { cols: 15, rows: 6, x0: 34, y0: 30, dx: 44, dy: 48 };
const DOT_HUBS = [17, 24, 37, 52, 66, 71] as const;
const DOT_LINKS: Array<[number, number]> = [
  [17, 24],
  [24, 37],
  [37, 52],
  [52, 66],
  [17, 37],
  [24, 52],
  [37, 71],
  [52, 71],
  [66, 71],
  [17, 52],
  [5, 24],
  [66, 84],
];

function dotPos(index: number) {
  const col = index % DOT_GRID.cols;
  const row = Math.floor(index / DOT_GRID.cols);
  return { x: DOT_GRID.x0 + col * DOT_GRID.dx, y: DOT_GRID.y0 + row * DOT_GRID.dy };
}

function StDots() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        gsap.from(".st-dot", {
          scale: 0,
          autoAlpha: 0,
          transformOrigin: "center",
          ease: "power2.out",
          stagger: {
            grid: [DOT_GRID.rows, DOT_GRID.cols],
            from: "center",
            amount: 1.1,
          },
          scrollTrigger: { trigger: ".st-dots-stage", start: "top 78%" },
        });
        gsap.from(".st-dot-line", {
          drawSVG: "0%",
          ease: "none",
          stagger: 0.35,
          scrollTrigger: {
            trigger: ".st-dots-stage",
            start: "top 65%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        });
        // The bigger sunflowers breathe: a gentle high/low float, each on
        // its own phase so the wired hubs rise and fall like a field. The
        // amplitude stays under the hub radius, so the links keep touching.
        gsap.fromTo(
          ".st-dot-hub",
          { y: 7 },
          {
            y: -7,
            duration: 1.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.35, from: "random" },
          }
        );
        gsap.from(".st-dots-head > *, .st-dot-card, .st-dots-rails", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".st-dots-head", start: "top 80%" },
        });
      });
    },
    { scope: ref }
  );

  const totalDots = DOT_GRID.cols * DOT_GRID.rows;

  return (
    <section
      aria-label="The secured layer"
      className="st-dots"
      ref={ref}
    >
      <div className="st-container">
        {/* Same stacked head pattern as every other act (eyebrow, statement,
            tough sub), and the sub picks up the OS section's last sentence:
            "…goes and gets it from the people who hold it." */}
        <div className="st-dots-head">
          <span className="st-eyebrow">The layer underneath</span>
          <h2 className="st-h2">How the proof will move between companies.</h2>
          <p className="st-sub">
            The people who hold the proof are farmers, co-ops, traders and
            mills, each inside their own company. Bindu (the word means dot)
            is building the layer that lets them hand proof over without
            handing over their data. The identity half runs today. The
            exchange half is next.
          </p>
        </div>

        <div aria-hidden="true" className="st-dots-stage">
          <svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg">
            {DOT_LINKS.map(([a, b]) => {
              const pa = dotPos(a);
              const pb = dotPos(b);
              return (
                <line
                  className="st-dot-line"
                  key={`${a}-${b}`}
                  stroke="var(--st-accent)"
                  strokeOpacity="0.45"
                  x1={pa.x}
                  x2={pb.x}
                  y1={pa.y}
                  y2={pb.y}
                />
              );
            })}
            {Array.from({ length: totalDots }, (_, i) => {
              const { x, y } = dotPos(i);
              const hub = (DOT_HUBS as readonly number[]).includes(i);
              // Every dot is a person, drawn as the Bindu sunflower. The
              // wired hubs are larger and float (see the GSAP bob); the rest
              // are a quiet field faded back so the hubs read as the story.
              const size = hub ? 24 : 12;
              return (
                <image
                  className={hub ? "st-dot st-dot-hub" : "st-dot"}
                  height={size}
                  href="/bindu-logo.png"
                  key={i}
                  width={size}
                  x={x - size / 2}
                  y={y - size / 2}
                />
              );
            })}
          </svg>
        </div>

        {/* Same tile anatomy as the act-2 regulation cards (word, mono
            label, body) so the story keeps one visual language. */}
        <div className="st-dots-cards">
          {/* Outcome-first bodies (workplan 16): the buyer reads what the
              layer does for them; the protocol names stay in the mono label,
              which is exactly what that slot is for. Statuses unchanged. */}
          <article className="st-dot-card">
            <span className="st-reg-word">Signed.</span>
            <span className="st-reg-law">Identity · W3C DID · Live</span>
            <p>
              Every answer your workspace gives carries proof of who gave it.
              Each company gets its own cryptographic identity the day it
              joins, and signs its own audit trail. This part runs today.
            </p>
          </article>
          <article className="st-dot-card">
            <span className="st-reg-word">Sealed.</span>
            <span className="st-reg-law">Transport · mTLS + OAuth2 · In build</span>
            <p>
              When compliance data moves between companies, it travels sealed,
              readable only by the party it is addressed to. The design is set
              and the identity it depends on is already minted. The transport
              itself is not live yet.
            </p>
          </article>
          <article className="st-dot-card">
            <span className="st-reg-word">Settled.</span>
            <span className="st-reg-law">Agents · A2A + x402 · In build</span>
            <p>
              Where this is going: your systems and your partners&apos; systems
              settle routine paperwork between themselves, every step signed
              and accounted for. Nothing on this row is live yet.
            </p>
          </article>
        </div>

        <div className="st-dots-rails">
          <p>
            The rails we are building on are Eclipse Tractus-X, the same
            open-source components the German auto industry runs its
            supply-chain data on. We are not inventing the plumbing. Today
            every workspace is single-tenant and your data stays inside it;
            nothing crosses to another company until this layer ships.
          </p>
          {/* Real .st-btn buttons: the page-level hover choreography
              (magnetic follow + slot-machine label roll) picks up every
              .st-btn, so these get the Book-a-demo treatment for free. */}
          <div className="st-dots-links">
            <a
              className="st-btn st-btn-ghost"
              href="https://github.com/GetBindu/Bindu"
              rel="noreferrer"
              target="_blank"
            >
              <BtnLabel text="GitHub" />
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="st-btn st-btn-ghost"
              href="https://github.com/eclipse-tractusx"
              rel="noreferrer"
              target="_blank"
            >
              <BtnLabel text="Tractus-X" />
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 8 — THE DREAM
   dayos pattern: artwork over bare columns. Each column carries a
   line-drawn sunflower in a different geometry, stroked with a
   gradient and drawn in/out on a DrawSVG loop (GSAP pen OJeOewJ).
   ============================================================= */
const polar = (r: number, a: number) =>
  `${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`;

function circleSeg(r: number) {
  return `M ${100 + r} 100 A ${r} ${r} 0 1 1 ${100 - r} 100 A ${r} ${r} 0 1 1 ${100 + r} 100 `;
}

/** Prove — the classic head-on sunflower: petal rosette + seed disc. */
function rosettePath() {
  let d = "";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    d += `M 100 100 Q ${polar(52, a - 0.34)} ${polar(88, a)} Q ${polar(52, a + 0.34)} 100 100 `;
  }
  return d + circleSeg(26);
}

/** Pass — the seed head unwound: a phyllotaxis spiral ringed by petals. */
function spiralPath() {
  const max = 4.2 * Math.PI * 2;
  let d = "";
  for (let t = 0; t <= max; t += 0.18) {
    d += `${t === 0 ? "M" : "L"} ${polar(2 + (t / max) * 58, t)} `;
  }
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    d += `M ${polar(66, a)} Q ${polar(84, a - 0.16)} ${polar(93, a)} Q ${polar(84, a + 0.16)} ${polar(66, a)} `;
  }
  return d;
}

/** Return — the loop: a circle with flow chevrons around a small bloom. */
function loopPath() {
  let d = circleSeg(80);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
    d += `M ${polar(90, a)} L ${polar(80, a + 0.13)} L ${polar(70, a)} `;
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    d += `M 100 100 Q ${polar(26, a - 0.4)} ${polar(46, a)} Q ${polar(26, a + 0.4)} 100 100 `;
  }
  return d + circleSeg(12);
}

const DREAM_ITEMS = [
  {
    word: "Prove.",
    body: "Satellite-checked, signed, dated. Evidence a border guard accepts on sight.",
    path: rosettePath(),
    grad: ["#ff8709", "#ffd84d"],
  },
  {
    word: "Pass.",
    body: "Every product carries its passport. Scan the label, read its life.",
    path: spiralPath(),
    grad: ["#5865f2", "#9fd8ff"],
  },
  {
    word: "Return.",
    body: "The passport outlives the sale. The battery comes back, and its chemistry comes back with it. The loop closes. The books balance.",
    path: loopPath(),
    grad: ["#35c46f", "#ffd84d"],
  },
];

function StDream() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        // The pen's loop: draw in from nothing, hold, then draw out through
        // the tail. One timeline per bloom, offset so the three never sync,
        // paused whenever the section is off screen.
        gsap.utils.toArray<SVGPathElement>(".st-dream-art path").forEach((path, i) => {
          gsap
            .timeline({
              repeat: -1,
              repeatDelay: 0.5,
              delay: i * 0.7,
              defaults: { duration: 3, ease: "power1.inOut" },
              scrollTrigger: {
                trigger: ".st-dream-items",
                start: "top 90%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            })
            .from(path, { drawSVG: "0% 0%" })
            .to(path, { drawSVG: "100% 100%" }, "+=0.6");
        });

        gsap.from(".st-dream-item", {
          autoAlpha: 0,
          y: 56,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".st-dream-items", start: "top 80%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="The dream" className="st-section st-dream" ref={ref}>
      <div className="st-container">
        <span className="st-eyebrow">Where the dots lead</span>
        <h2 className="st-h2">Where all this paperwork is heading.</h2>
        <p className="st-sub">
          The EU calls it the circular economy. At the border, it&apos;s the
          law. Your folder is how you get in.
        </p>
        <div className="st-dream-items">
          {DREAM_ITEMS.map((item, i) => (
            <article className="st-dream-item" key={item.word}>
              <svg
                aria-hidden="true"
                className="st-dream-art"
                fill="none"
                viewBox="-8 -8 216 216"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id={`st-dream-grad-${i}`}
                    x1="0"
                    x2="200"
                    y1="0"
                    y2="200"
                  >
                    <stop offset="0.2" stopColor={item.grad[0]} />
                    <stop offset="0.8" stopColor={item.grad[1]} />
                  </linearGradient>
                </defs>
                <path
                  d={item.path}
                  stroke={`url(#st-dream-grad-${i})`}
                  strokeLinecap="round"
                  strokeWidth="2.4"
                />
              </svg>
              <h3>{item.word}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 10 — CONVERSATIONS
   ============================================================= */
const MARQUEE = [
  "India",
  "Uganda",
  "Ecuador",
  "Brazil",
  "Mexico",
  "Bangladesh",
  "Netherlands",
];

const BUBBLES: Array<{ meta: string; text: string; out?: boolean }> = [
  { meta: "Co-op manager · Uganda", text: "Plot maps for lot 7 attached. All 41 farms are inside the co-op." },
  { meta: "Bindu", text: "Received. 41 plots verified. Dossier updated.", out: true },
  { meta: "Exportador · Brazil", text: "Segue o CAR da fazenda. Colheita de julho." },
  { meta: "Bindu", text: "Recebido. CAR anexado ao lote 12.", out: true },
  { meta: "Corredor · Ecuador", text: "Adjunto el permiso de la finca. ¿Falta algo para el embarque?" },
  { meta: "Bindu", text: "Nada más. Expediente completo.", out: true },
  { meta: "ब्रोकर · India", text: "इनवॉइस INV-2214 के साथ प्लॉट का नक्शा भेज दिया है।" },
  { meta: "Bindu", text: "Received. Plot 12 verified against INV-2214.", out: true },
  { meta: "সরবরাহকারী · Bangladesh", text: "ডাইং ইউনিটের সার্টিফিকেট পাঠিয়ে দিলাম।" },
  { meta: "Bindu", text: "Received. Certificate filed to the passport.", out: true },
];

function StTalk() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        gsap.to(".st-talk-marquee-track", {
          xPercent: -50,
          ease: "none",
          duration: 26,
          repeat: -1,
        });
        gsap.from(".st-bubble", {
          autoAlpha: 0,
          scale: 0.88,
          y: 26,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".st-talk-wall", start: "top 80%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Conversations" className="st-section st-talk" ref={ref}>
      <div className="st-container">
        <span className="st-eyebrow">And you&apos;re not doing it alone</span>
        <h2 className="st-h2">Who we&apos;re building this with.</h2>
        {/* Finale: continues from the pricing beat ("you pay for the filing,
            not an army") into who's building this, and closes the story on the
            folder metaphor — reabsorbing the old bookend now that the separate
            closer section is gone. Only claims we can stand behind: the named
            countries match the marquee, and the pilot line is the owner's
            approved proof (workplan 16, D1). */}
        <p className="st-sub">
          We&apos;re building Bindu in the open, in conversation with customs
          brokers and exporters in India, Uganda, Ecuador, Brazil, Mexico,
          Bangladesh and the Netherlands, with trade ministries and customs
          authorities, and with the large importers piloting Bindu today.
          Published pricing, no sales calls, and the demo runs on your own
          shipments. Bring your next shipment. We&apos;ll keep the folder.
        </p>
      </div>

      <div aria-hidden="true" className="st-talk-marquee">
        <div className="st-talk-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((c, i) => (
            <span className="st-talk-chip" key={`${c}-${i}`}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="st-container">
        {/* Same disclosure pattern as the worked examples: staged
            conversations must never read as real customer chats. */}
        <p className="st-talk-note">Illustrations of how the conversations run.</p>
        <div className="st-talk-wall">
          {BUBBLES.map((b) => (
            <div
              className={b.out ? "st-bubble st-bubble-out" : "st-bubble st-bubble-in"}
              key={`${b.meta}-${b.text}`}
            >
              <span className="st-bubble-meta">{b.meta}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   ACT 11 — PRICING (#pricing — the footer links here)
   Ditto's boxed-stat banner, now a five-tab switcher on the orange
   band: one tab per surface of the rail (HS classify, EUDR, CBAM,
   DPP, Reach). Each panel is a white-blocked hero price, a rounded
   badge saying how the price behaves, the payment split, and how
   the alternatives charge in mono fine print. The badge used to
   carry unsourced "~90% cheaper" claims; only figures with a source
   a reader can check go back in. Renders directly before the dark
   footer. Price data lives in ../pricing/price-data.ts, the single
   source shared with the per-regulation price blocks; edit a number
   there and both surfaces move together.
   ============================================================= */
function StPricing() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState("eudr");
  const tab = PRICE_TABS.find((t) => t.id === active) ?? PRICE_TABS[1]!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL, () => {
        gsap.from(".st-pricing-head > *, .st-pricing-tabs, .st-pricing-note", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".st-pricing", start: "top 80%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Pricing" className="st-pricing" id="pricing" ref={ref}>
      <div className="st-container">
        <div className="st-pricing-head">
          <div>
            <span className="st-pricing-eyebrow">Pricing</span>
            <h2>What each filing costs.</h2>
            <p className="st-pricing-sub">
              One platform for five regulations. You pay per filing, not per
              seat.
            </p>
          </div>
          <DemoCtaLink className="st-pricing-cta" source="pricing">
            {DEMO_CTA_LABEL}
            <ArrowRight aria-hidden="true" />
          </DemoCtaLink>
        </div>

        <div className="st-pricing-tabs" role="tablist" aria-label="Pricing by regulation">
          {PRICE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`price-tab-${t.id}`}
              aria-selected={t.id === active}
              aria-controls="price-panel"
              className="st-pricing-tab"
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="st-price-panel"
          role="tabpanel"
          id="price-panel"
          aria-labelledby={`price-tab-${tab.id}`}
          key={tab.id}
        >
          <div className="st-price-hero">
            <p className="st-price-eyebrow">{tab.eyebrow}</p>
            <span className="st-price-num">{tab.price}</span>
            <p className="st-price-unit">{tab.unit}</p>
            <div className="st-price-badge">
              <span className="st-price-badge-pct">{tab.pct}</span>
              <span className="st-price-badge-vs">{tab.vs}</span>
            </div>
          </div>
          <div className="st-price-detail">
            <ul className="st-price-lines">
              {tab.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="st-price-industry">Industry: {tab.industry}</p>
          </div>
        </div>

        <p className="st-pricing-note">
          One platform files EUDR, CBAM, battery and textile passports.{" "}
          {PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   PAGE
   ============================================================= */
export function BinduLandingStory() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fraunces loads late; re-measure pins and SplitText line boxes once
    // the real glyphs are in.
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Button hover choreography for every .st-btn on the page, after the two
  // classic GSAP hover demos: the magnetic button (quickTo follow + elastic
  // overwrite release) and the slot-machine label roll (SplitText chars).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];

        gsap.utils.toArray<HTMLElement>(".st-btn").forEach((btn) => {
          const label = btn.querySelector(".st-btn-text:not(.st-btn-text-dup)");
          const dup = btn.querySelector(".st-btn-text-dup");
          const arrow = btn.querySelector("svg");

          let roll: gsap.core.Timeline | undefined;
          if (label && dup) {
            const out = new SplitText(label, { type: "chars" });
            const inn = new SplitText(dup, { type: "chars" });
            // The chars carry the offset now. GSAP reads the container's CSS
            // translateY(115%) as a pixel `y`, so clear both axes explicitly
            // or the clone stays parked below the mask.
            gsap.set(dup, { y: 0, yPercent: 0 });
            gsap.set(inn.chars, { yPercent: 115 });
            roll = gsap
              .timeline({ paused: true })
              .to(
                out.chars,
                {
                  yPercent: -115,
                  duration: 0.35,
                  ease: "power2.in",
                  stagger: 0.016,
                },
                0
              )
              .to(
                inn.chars,
                {
                  yPercent: 0,
                  duration: 0.35,
                  ease: "power2.out",
                  stagger: 0.016,
                },
                0.12
              );
            if (arrow) {
              roll.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" }, 0);
            }
            cleanups.push(() => {
              out.revert();
              inn.revert();
            });
          }

          const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3" });

          // Elastic hover pop, after GreenSock's easeReverse UI-interactions
          // demo: springy elastic.out entrance; the exit reverses through
          // power2.out at 2.5× so the spring never plays backwards.
          const pop = gsap.timeline({ paused: true }).to(btn, {
            scale: 1.12,
            duration: 1.2,
            ease: "elastic.out(1.2, 0.3)",
            easeReverse: "power2.out",
          });

          const enter = () => {
            roll?.play();
            pop.timeScale(1).play();
          };
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const leave = () => {
            roll?.reverse();
            pop.timeScale(2.5).reverse();
            // Overwrite the quickTo followers for the springy release.
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.9,
              ease: "elastic.out(1, 0.4)",
              overwrite: "auto",
            });
          };

          btn.addEventListener("mouseenter", enter);
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("mouseenter", enter);
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", leave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: pageRef }
  );

  return (
    <div className="lp-page st-page st-home" ref={pageRef}>
      {/* Chrome lives outside the stage AND outside <main>: inside the hero
          its fixed elements are trapped in the hero's stacking context and the
          slab (z-index 1) would paint over them, and inside <main> the banner
          landmark is buried in the main landmark with nothing for a skip link
          to target. Mode flips are driven by the .lp-island-sentinel at the
          slab's top edge. */}
      <IslandHeader active="home" />
      <main id="main">
        {/* .st-stage scopes the sticky hero: the film pins under the
            regulations slab, then gets pushed away when the stage ends. */}
        <div className="st-stage">
          <StHero />
        </div>
        <StGuard />
        <StTheatre />
        <StDots />
        <StQuestions />
        <StDream />
        <StShipments />
        <StTalk />
        <StPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
