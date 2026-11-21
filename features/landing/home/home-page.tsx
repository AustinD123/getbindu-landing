"use client";

/* The homepage, composed in the mockup's section order (v3 App.tsx, minus its hash-route sub-pages and the "Mockup"
   badge). One client boundary: the sections server-render for the text, and everything animated starts in effects. */
import { useEffect, useLayoutEffect } from "react";
import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/components.css";
import "./styles/site.css";
import "./styles/r2-cobalt.css";
import "./styles/r2-hero-cta.css";
import "./styles/r10-hero.css";
import "./styles/r13-hero.css";
import "./styles/r13-cta.css";
import "./styles/r13-pricing.css";
import "./styles/guide.css";
import "./styles/story.css";
import { startSmoothScroll } from "./lib/motion";
import { getRoot } from "./lib/root";
import { startScenes } from "./lib/scenes";
import { startHeadings } from "./lib/headings";
import { startBands } from "./lib/bands";
import { useRouteWipe } from "./lib/route";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ShipmentJourney } from "./components/ShipmentJourney";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Faq, Finale } from "./components/Closing";
import { Examples } from "./components/Examples";
import { Statement, BeforeAfter } from "./components/Story";
import { Intro } from "./components/Intro";
import { Guide } from "./components/Guide";
import { Rail } from "./components/Rail";
import { EstimateProvider } from "./components/Estimate";
import "./styles/subpages.css";
// last, so the shared states win over the section sheets (equal specificity)
import "./styles/states.css";
// round 35: phones only (767px and under), after everything else
import "./styles/mobile.css";

export function HomePage() {
  useRouteWipe();
  // a client-side return to / skips the head script: restore the saved theme before paint
  useLayoutEffect(() => {
    try { getRoot().dataset.theme = localStorage.getItem("bindu-theme") === "dark" ? "dark" : "light"; } catch { /* private mode: light */ }
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollPaddingTop = "72px";   // native anchor jumps (reduced motion) clear the fixed nav
    const stopScroll = startSmoothScroll();
    const stop = startScenes();
    const stopHeads = startHeadings();
    const stopBands = startBands();
    // an anchor in the address (/#pricing) scrolls to its section once the page has mounted; otherwise start at the top
    const id = location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: "auto" });
    else window.scrollTo(0, 0);
    return () => {
      stop(); stopHeads(); stopBands(); stopScroll(); html.style.scrollPaddingTop = "";
    };
  }, []);
  return (
    <EstimateProvider>
      <Intro />
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <Guide />
      <Rail />
      <main id="main">
        {/* round 17: one story. Hero, statement, before and after, how it works, the night-band journey, pricing, FAQ, wordmark finale. */}
        <Hero />
        <Statement />
        <BeforeAfter />
        <HowItWorks />
        <ShipmentJourney />
        <Examples />
        <Pricing />
        <Faq />
        <Finale />
      </main>
    </EstimateProvider>
  );
}
