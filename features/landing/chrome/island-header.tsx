"use client";

/**
 * Site header shared by every landing-family page (/, /eudr,
 * /cbam, /dpp/*, /login, /forgot-password): a FLAT top nav (Ditto pattern,
 * dittowords.com) — a big blocky "Bindu." wordmark on the left, every nav
 * link laid out in the open, and the right-side actions (GitHub star ·
 * Sign in · Book a demo). This replaced the old frosted-glass "dynamic
 * island" pill: no glass, nothing hidden behind a hamburger on desktop.
 *
 * The bar is transparent over a dark hero and solid over the light sections
 * below, so its ink stays readable everywhere. Only the text/border colours
 * flip: data-mode turns the whole bar white over a dark hero and dark once
 * the hero scrolls above it. Pages with no dark hero pin the mode instead.
 *
 * Below 900px the links collapse into a slide-down drawer behind a
 * hamburger; the wordmark and the primary CTA stay in the bar.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuthStore } from "@shelley/core/auth";
import {
  GitHubMark,
  githubBadgeLabel,
  githubRepoLabel,
  githubUrl,
  useGithubStars,
} from "../shared";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";

gsap.registerPlugin(useGSAP);

export type NavId =
  | "home"
  | "eudr"
  | "cbam"
  | "reach"
  | "ppwr"
  | "dpp-battery"
  | "dpp-textiles"
  | "dpp-others"
  | "blog";

/** Top-level links rendered flat in the bar. DPP is a dropdown group. */
const PRIMARY_LINKS: { id: NavId; label: string; href: string }[] = [
  // The public /tariffs directory was removed entirely on 2026-08-31 — a
  // low-value SEO surface (0 organic traffic) that only spent the domain's
  // crawl budget. No tariff nav slot, no tariff pages.
  { id: "eudr", label: "EUDR", href: "/eudr" },
  { id: "cbam", label: "CBAM", href: "/cbam" },
  { id: "reach", label: "REACH", href: "/reach" },
  { id: "ppwr", label: "PPWR", href: "/ppwr" },
];

const DPP_LINKS: {
  id: NavId;
  label: string;
  href: string;
  desc: string;
  /** The one that is actually shipped — flagged Live and listed first. */
  live?: boolean;
}[] = [
  {
    id: "dpp-textiles",
    label: "Textiles",
    href: "/dpp/textiles",
    desc: "ESPR textile passports",
    live: true,
  },
  {
    id: "dpp-battery",
    label: "Batteries",
    href: "/dpp/battery",
    desc: "EU battery regulation passports",
  },
  {
    id: "dpp-others",
    label: "Others",
    href: "/dpp/others",
    desc: "Every other product group",
  },
];

/** The DPP group's flagship destination: tapping "DPP" lands on the shipped
 *  vertical (textiles), not a framework overview. */
const DPP_FLAGSHIP_HREF = "/dpp/textiles";

const DPP_IDS: NavId[] = DPP_LINKS.map((d) => d.id);

/** The Blog link — single-sourced so the bar and the drawer never drift. */
const BLOG_LINK: { id: NavId; label: string; href: string } = {
  id: "blog",
  label: "Blog",
  href: "/blog",
};

/** External product docs — the Mintlify guides on doc.getbindu.com (NOT the
 *  docs.getbindu.com framework/agent site). Opens in a new tab; rendered as a
 *  plain <a> in both the bar and the drawer since Next's <Link> is for internal
 *  routes only. */
const DOCS_LINK = {
  label: "Docs",
  href: "https://doc.getbindu.com/guides/overview",
};

/** Flat list used inside the mobile drawer (everything, in reading order).
 *  Derived from the same arrays the desktop bar renders, so every href lives
 *  in exactly one place. */
const ALL_LINKS: { id: NavId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  ...PRIMARY_LINKS,
  ...DPP_LINKS.map((d) => ({
    id: d.id,
    label: `DPP · ${d.label}`,
    href: d.href,
  })),
  BLOG_LINK,
];

// "dark"  = white bar/links over a dark hero
// "light" = dark bar/links over the light sections below
type Mode = "dark" | "light";

function Brand() {
  // The sunflower is the single logo — no wordmark text beside it
  // (owner decision 2026-08-11: "we do have only single logo").
  return (
    <Link aria-label="Bindu, home" className="lp-nav-brand" href="/">
      <Image
        alt="Bindu"
        className="lp-nav-mark"
        height={38}
        priority
        src="/bindu-logo.png"
        width={38}
      />
    </Link>
  );
}

export function IslandHeader({
  active,
  pinnedMode,
  hideSignIn = false,
  leftSlot,
}: {
  active?: NavId;
  pinnedMode?: Mode;
  // Auth pages (/login, /forgot-password) are themselves the sign-in
  // funnel — the chrome's Sign-in link would just bounce the user to the
  // page they're already on.
  hideSignIn?: boolean;
  // Optional node rendered inline right after the logo, inside the bar's
  // left group — e.g. the EUDR language switcher. Part of the flow, so it
  // tracks the scroll-shrink and never floats out of alignment.
  leftSlot?: ReactNode;
} = {}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [mode, setMode] = useState<Mode>(pinnedMode ?? "dark");
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((s) => s.user);
  const stars = useGithubStars();

  // Sign-in destination + label, derived once and shared by the bar and the
  // drawer so the two copies can never drift.
  const showSignIn = Boolean(user) || !hideSignIn;
  const signInHref = user ? "/" : "/login";
  const signInLabel = user ? "Dashboard" : "Sign in";

  // Scroll-shrink: the bar is tall at the very top of the page and
  // compresses once real scrolling starts. Runs on every page (pinned-mode
  // pages too) — it is independent of the colour mode flip below.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 80);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dppActive = active ? DPP_IDS.includes(active) : false;

  useEffect(() => {
    // Standalone pages (e.g. /login) have no hero to scroll
    // over: pin the mode and skip the observer.
    if (pinnedMode) return;

    // Sticky heroes never scroll above the bar, so watching the hero
    // would leave the bar white forever. Such pages place
    // .lp-island-sentinel markers at section boundaries: the bar takes the
    // mode of the last sentinel that has crossed under it. A single dataless
    // sentinel (the homepage) flips dark→light once; the story pages, which
    // alternate dark/ivory acts, place one per boundary with data-island-mode
    // so the bar flips back and forth and stays readable on every section. A
    // scroll check (not an IntersectionObserver) because instant jumps can
    // skip the viewport band without ever producing an intersection change.
    const sentinels = Array.from(
      document.querySelectorAll<HTMLElement>(".lp-island-sentinel")
    );
    if (sentinels.length) {
      let ticking = false;
      const update = () => {
        ticking = false;
        // Document order: the last sentinel above the bar names the section
        // now under the header. A dataless sentinel means "light".
        let next: Mode = "dark";
        for (const s of sentinels) {
          // 64px: just under the compressed bar height — by the time any
          // sentinel crosses here, the bar has already shrunk to 60px.
          if (s.getBoundingClientRect().top < 64) {
            next = (s.dataset.islandMode as Mode) || "light";
          } else {
            break;
          }
        }
        setMode(next);
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const root =
      rootRef.current?.closest<HTMLElement>(".lp-os-hero, .st-hero") ?? null;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMode((entry?.isIntersecting ?? true) ? "dark" : "light"),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(root);

    return () => observer.disconnect();
  }, [pinnedMode]);

  // The wordmark is deliberately static — no per-glyph shutter. A JS letter
  // animation is exactly the kind of thing that gets frozen half-drawn (a
  // background-tab load, a screenshotter, strict-mode's double effect) and
  // then the brand reads as broken. The bar's only GSAP is the mobile drawer;
  // link and pill hovers are plain CSS.
  const lockedAtRef = useRef(0);

  const lockScroll = () => {
    lockedAtRef.current = window.scrollY;
    const body = document.body.style;
    body.position = "fixed";
    body.top = `-${lockedAtRef.current}px`;
    body.left = "0";
    body.right = "0";
    body.width = "100%";
  };

  const releaseScroll = () => {
    const body = document.body.style;
    if (body.position !== "fixed") return;
    body.position = "";
    body.top = "";
    body.left = "";
    body.right = "";
    body.width = "";
    // Jump straight back, with no smooth-scroll easing in between.
    window.scrollTo({ top: lockedAtRef.current, behavior: "instant" as ScrollBehavior });
  };

  // Never strand the scroll lock: if the header unmounts while the drawer is
  // open, the body would stay pinned on whatever page renders next.
  useEffect(
    () => () => {
      releaseScroll();
    },
    []
  );

  const { contextSafe } = useGSAP(() => {}, { scope: rootRef });

  const setOpenState = contextSafe((next: boolean) => {
    const drawer = drawerRef.current;
    if (openRef.current === next) return;
    openRef.current = next;
    setOpen(next);
    if (!drawer) return;
    const instant = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Hold the page still behind the open drawer, WITHOUT losing the
    // reader's place. overflow:hidden on the scrolling element does stop
    // the scroll, but it also resets scrollTop to 0, so opening the menu
    // half way down a 9,800px page threw the reader back to the top and
    // closing it did not bring them back. Pinning the body at a negative
    // offset holds the same position on screen, and releaseScroll()
    // restores the exact scrollY.
    if (next) lockScroll();
    else releaseScroll();
    gsap.killTweensOf(drawer);
    if (next) {
      gsap.set(drawer, { display: "block", pointerEvents: "auto" });
      gsap.fromTo(
        drawer,
        { autoAlpha: 0, y: -12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: instant ? 0 : 0.42,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        ".lp-nav-drawer-link",
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: instant ? 0 : 0.34,
          ease: "power2.out",
          stagger: instant ? 0 : 0.045,
          delay: instant ? 0 : 0.06,
        }
      );
    } else {
      gsap.to(drawer, {
        autoAlpha: 0,
        y: -12,
        duration: instant ? 0 : 0.26,
        ease: "power2.in",
        onComplete: () => gsap.set(drawer, { display: "none" }),
      });
    }
  });

  return (
    <header
      className="lp-nav"
      data-mode={mode}
      // Localized pages pass a language switcher in the left group. It needs
      // real horizontal room, so those pages collapse the flat links into the
      // hamburger earlier (see landing.css) rather than letting the switcher
      // ride onto the centred nav.
      data-has-leftslot={leftSlot ? "true" : undefined}
      data-scrolled={scrolled ? "true" : undefined}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (openRef.current) {
          setOpenState(false);
          burgerRef.current?.focus();
        }
      }}
      ref={rootRef}
    >
      <div className="lp-nav-inner">
        <div className="lp-nav-left">
          <Brand />
          {leftSlot}
        </div>

        <nav aria-label="Primary" className="lp-nav-links">
          {PRIMARY_LINKS.map((item) => (
            <Link
              aria-current={item.id === active ? "page" : undefined}
              className="lp-nav-link"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          {/* "DPP" is a real link to the shipped vertical (textiles), with the
              full passport line-up in a panel below it. The panel opens on
              hover (pointer) and focus-within (keyboard); on touch, tapping the
              link lands on the flagship rather than toggling a menu, so the DPP
              surface is never a dead end. Plain links in a panel — not an ARIA
              menu, which would promise arrow-key traversal this does not do. */}
          <div className="lp-nav-group">
            <Link
              aria-current={dppActive ? "page" : undefined}
              className="lp-nav-link lp-nav-group-trigger"
              data-active={dppActive ? "true" : undefined}
              href={DPP_FLAGSHIP_HREF}
            >
              DPP
            </Link>
            <div
              aria-label="Digital Product Passport"
              className="lp-nav-menu"
              id="lp-nav-dpp-menu"
            >
              <p className="lp-nav-menu-head">Digital Product Passport</p>
              {DPP_LINKS.map((item) => (
                <Link
                  aria-current={item.id === active ? "page" : undefined}
                  className="lp-nav-menu-link"
                  href={item.href}
                  key={item.href}
                >
                  <span className="lp-nav-menu-text">
                    <b>
                      {item.label}
                      {item.live ? (
                        <span className="lp-nav-menu-live">Live</span>
                      ) : null}
                    </b>
                    <small>{item.desc}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <Link
            aria-current={active === "blog" ? "page" : undefined}
            className="lp-nav-link"
            href={BLOG_LINK.href}
          >
            {BLOG_LINK.label}
          </Link>
        </nav>

        <div className="lp-nav-actions">
          {/* The count is omitted, not substituted, when the api.github.com
              fetch fails or has not landed yet: the pill previously read
              "Star", which parses as a broken widget rather than as a number
              that is still loading. Mark plus ★ still reads as the repo link.
              The footer and the drawer already degraded this way.

              The badge is attributed to the agent layer in its accessible
              name and its title. The count is that repo's, not the compliance
              platform's, so a bare number beside compliance copy would read as
              proof it is not. */}
          <a
            aria-label={githubBadgeLabel(stars)}
            className="lp-nav-github"
            href={githubUrl}
            rel="noopener noreferrer"
            target="_blank"
            title={githubRepoLabel}
          >
            <GitHubMark className="lp-nav-github-mark" />
            {stars ? <span>{stars}</span> : null}
            <span aria-hidden="true" className="lp-nav-github-star">
              ★
            </span>
          </a>
          {/* Docs is a right-side action (ghost pill like Sign in), not a
              primary nav item — it points at the external product-docs site,
              not a marketing page. */}
          <a
            className="lp-nav-docs"
            href={DOCS_LINK.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {DOCS_LINK.label}
          </a>
          {showSignIn && (
            <Link className="lp-nav-signin" href={signInHref}>
              {signInLabel}
            </Link>
          )}
          {/* The full label is the site-wide standard, but at 375px it
              collided with the language switcher, so the duration drops out
              below 560px and the pill reads "Book a demo". The accessible
              name stays the full label at every width. */}
          <DemoCtaLink
            ariaLabel={DEMO_CTA_LABEL}
            className="lp-nav-demo"
            source="header"
          >
            {/* One wrapper span, so the label is a single flex item. Left as
                bare text nodes, the anchor's display:inline-flex blockifies
                each fragment and drops the spaces between them: the primary
                CTA on every page read "Book a30-minutedemo". */}
            <span>
              Book a<span className="lp-nav-demo-long"> 30-minute</span> demo
            </span>
          </DemoCtaLink>

          <button
            aria-controls="lp-nav-drawer"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="lp-nav-burger"
            onClick={() => setOpenState(!openRef.current)}
            ref={burgerRef}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Disclosure (not a modal dialog): a slide-down nav panel toggled by the
          burger's aria-expanded/aria-controls. Escape closes it and returns
          focus to the burger; it deliberately does not trap focus. */}
      <div className="lp-nav-drawer" id="lp-nav-drawer" ref={drawerRef}>
        <nav aria-label="All pages">
          {ALL_LINKS.map((item) => (
            <Link
              aria-current={item.id === active ? "page" : undefined}
              className="lp-nav-drawer-link"
              href={item.href}
              key={item.href}
              onClick={() => setOpenState(false)}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="lp-nav-drawer-foot">
          <a
            aria-label={githubBadgeLabel(stars)}
            className="lp-nav-drawer-foot-link"
            href={githubUrl}
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            target="_blank"
            title={githubRepoLabel}
          >
            <GitHubMark className="lp-nav-github-mark" />
            {stars ?? "GitHub"} ★
          </a>
          <a
            className="lp-nav-drawer-foot-link"
            href={DOCS_LINK.href}
            onClick={() => setOpenState(false)}
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            target="_blank"
          >
            {DOCS_LINK.label}
          </a>
          {showSignIn && (
            <Link
              className="lp-nav-drawer-foot-link"
              href={signInHref}
              tabIndex={open ? 0 : -1}
            >
              {signInLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
