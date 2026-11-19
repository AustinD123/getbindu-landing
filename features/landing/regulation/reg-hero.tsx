"use client";

/**
 * RegHero — the shared regulation-page hero.
 *
 * Ports the home story landing's Act 1 hero (bindu-landing-story.tsx) to the
 * standalone regulation pages (EUDR/CBAM/DPP · battery/textiles/others): a
 * full-bleed film behind an uppercase masked headline, a decoding mono
 * reg-code line, a fading sub, and a magnetic "Book a demo" .st-btn. The only
 * departure from the story hero is the .st-hero-solo modifier — these pages
 * have no sticky .st-stage for the hero to pin under, so it scrolls normally.
 *
 * Every element is authored in its final state, so no-JS, reduced-motion, and
 * crawlers see the whole hero; GSAP animates from hidden states inside
 * matchMedia contexts only.
 */

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { trackPlausible } from "../analytics";
import { IslandHeader, type NavId } from "../chrome/island-header";
import { DemoCtaLink } from "../demo-cta-link";
import { cdnAsset } from "@/lib/cdn";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

/**
 * Slot-machine label for .st-btn: the visible text rolls out upward while an
 * identical clone rolls in from below. The clone is parked off-slot by CSS so
 * no-JS and reduced-motion users see a plain label.
 */
function BtnLabel({ text }: { text: string }) {
  return (
    <span className="st-btn-roll">
      <span className="st-btn-text">{text}</span>
      <span aria-hidden="true" className="st-btn-text st-btn-text-dup">
        {text}
      </span>
    </span>
  );
}

type RegHeroProps = {
  /** IslandHeader nav highlight. */
  active: NavId;
  /** Mono reg-code line above the headline; decodes in via ScrambleText. */
  code: string;
  /** The headline; reveals line by line behind a SplitText mask. */
  title: string;
  /** The subline copy, right of the CTA on wide screens. */
  sub: ReactNode;
  /** Hero film poster (also the video fallback image). */
  poster: string;
  /** Hero film source (webm). */
  video: string;
  /** Section aria-label. */
  label: string;
  /**
   * CTA button label. Defaults to the site-wide label; localized pages pass
   * their own translation of it. Never a second English wording.
   */
  cta?: string;
  /**
   * Optional second CTA rendered as an outlined ghost button beside the demo
   * button (e.g. the EUDR pillar's self-serve filing door). Kept a ghost so
   * the hero still has a single solid fill.
   */
  // `event` is a declarative Plausible event (name + props) fired on click —
  // declarative because server components pass this prop and can't send
  // functions across the client boundary.
  secondaryCta?: {
    label: string;
    href: string;
    event?: { name: string; props: Record<string, string> };
  };
  /**
   * Render the IslandHeader chrome inside the hero. Default true. Pages that
   * need a header that stays constant while scrolling render their own
   * IslandHeader at the page root (so its fixed chrome isn't trapped in the
   * hero's stacking context) and pass showHeader={false} here.
   */
  showHeader?: boolean;
};

export function RegHero({
  active,
  code,
  title,
  sub,
  poster,
  video,
  label,
  cta = DEMO_CTA_LABEL,
  secondaryCta,
  showHeader = true,
}: RegHeroProps) {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Autoplay the hero film once it can play (muted, motion allowed).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    play();
    el.addEventListener("canplay", play, { once: true });
    return () => el.removeEventListener("canplay", play);
  }, []);

  // Hero choreography, ported from the story hero minus its headline reveal:
  // a decode on the reg-code line, the sub fading up, and a slow parallax
  // push-in on the film as the copy drifts out on scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The headline itself doesn't animate: it is painted in its final
        // state and stays there. Only the code line, the sub and the film
        // move. (The home hero keeps its masked line reveal.)
        gsap.from(".st-hero-code", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        });
        const codeEl = ref.current?.querySelector<HTMLElement>(".st-scramble");
        if (codeEl) {
          gsap.to(codeEl, {
            duration: 1.4,
            delay: 0.6,
            ease: "power2.inOut",
            scrambleText: {
              text: codeEl.textContent ?? "",
              chars: "upperCase",
              revealDelay: 0.2,
              speed: 0.4,
            },
          });
        }

        gsap.from(".st-hero-sub", {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.85,
        });

        gsap.to(".st-hero-media", {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
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
            trigger: ref.current,
            start: "35% top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  // Magnetic follow + slot-machine label roll + elastic pop for the hero's
  // .st-btn, matching the home page's button hover choreography.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups: Array<() => void> = [];
          gsap.utils.toArray<HTMLElement>(".st-btn").forEach((btn) => {
            const labelEl = btn.querySelector(
              ".st-btn-text:not(.st-btn-text-dup)"
            );
            const dup = btn.querySelector(".st-btn-text-dup");
            const arrow = btn.querySelector("svg");

            let roll: gsap.core.Timeline | undefined;
            if (labelEl && dup) {
              const out = new SplitText(labelEl, { type: "chars" });
              const inn = new SplitText(dup, { type: "chars" });
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

            const xTo = gsap.quickTo(btn, "x", {
              duration: 0.45,
              ease: "power3",
            });
            const yTo = gsap.quickTo(btn, "y", {
              duration: 0.45,
              ease: "power3",
            });
            const pop = gsap.timeline({ paused: true }).to(btn, {
              scale: 1.12,
              duration: 1.2,
              ease: "elastic.out(1.2, 0.3)",
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
        }
      );
    },
    { scope: ref }
  );

  return (
    <section className="st-hero st-hero-solo" aria-label={label} ref={ref}>
      {showHeader ? <IslandHeader active={active} /> : null}

      <div className="st-hero-media" aria-hidden="true">
        <Image
          className="st-hero-poster"
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <video
          className="st-hero-video"
          loop
          muted
          playsInline
          poster={cdnAsset(poster)}
          preload="auto"
          ref={videoRef}
        >
          <source src={cdnAsset(video)} type="video/webm" />
        </video>
      </div>

      <div className="st-container st-hero-inner">
        <span className="st-hero-code">
          <span className="st-scramble">{code}</span>
        </span>
        <h1>{title}</h1>
        <div className="st-hero-sub">
          <p>{sub}</p>
          <div className="st-hero-ctas">
            <DemoCtaLink className="st-btn st-btn-primary" source="reg-hero">
              <BtnLabel text={cta} />
              <ArrowRight aria-hidden="true" />
            </DemoCtaLink>
            {secondaryCta ? (
              <a
                className="st-btn st-btn-ghost"
                href={secondaryCta.href}
                onClick={
                  secondaryCta.event
                    ? () => trackPlausible(secondaryCta.event!.name, secondaryCta.event!.props)
                    : undefined
                }
              >
                <BtnLabel text={secondaryCta.label} />
                <ArrowRight aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
