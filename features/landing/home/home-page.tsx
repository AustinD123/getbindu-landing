"use client";

/* The homepage, composed in the mockup's section order (v3 App.tsx, minus its hash-route sub-pages and the "Mockup"
   badge). One client boundary: the sections server-render for the text, and everything animated starts in effects. */
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
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
import "./styles/ask.css";
import "./styles/theatre.css";
import { startSmoothScroll } from "./lib/motion";
import { getRoot } from "./lib/root";
import { startScenes } from "./lib/scenes";
import { startHeadings } from "./lib/headings";
import { startBands } from "./lib/bands";
import { useRouteWipe } from "./lib/route";
import { addPending, markReady, gate, guardAnchors, afterSettle } from "./lib/ready";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
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

/* Below-the-fold sections hydrate late. Their HTML is in the page from the start (same height, same text), so nothing shifts and the text stays
   crawlable; only their JS and hydration wait, until the section is within 1.5 viewports or the page is idle (lib/ready.ts). */
/* On the server the section renders for real, inside the same Suspense boundary, so its HTML is inline (not streamed in later); the client side
   swaps in a lazy import that waits for the gate. `sync` is a build-time constant: the require is dropped from the client bundle. */
const late = (id: string, sync: React.ComponentType | null | undefined, load: () => Promise<Record<string, unknown>>, name: string) => {
  const C = sync ?? lazy(() => gate(id).then(load).then((m) => ({ default: m[name] as React.ComponentType })));
  const Late = () => {
    addPending(id);
    return <Suspense fallback={null}><C /><Ready id={id} /></Suspense>;
  };
  return Late;
};
function Ready({ id }: { id: string }) {
  useEffect(() => { markReady(id); }, [id]);
  return null;
}
const Theatre = late("how", typeof window === "undefined" ? (require("./components/Theatre") as Record<string, React.ComponentType>).Theatre : null, () => import("./components/Theatre"), "Theatre");
const Ask = late("ask", typeof window === "undefined" ? (require("./components/Ask") as Record<string, React.ComponentType>).Ask : null, () => import("./components/Ask"), "Ask");
const ShipmentJourney = late("shipment", typeof window === "undefined" ? (require("./components/ShipmentJourney") as Record<string, React.ComponentType>).ShipmentJourney : null, () => import("./components/ShipmentJourney"), "ShipmentJourney");
const Examples = late("examples", typeof window === "undefined" ? (require("./components/Examples") as Record<string, React.ComponentType>).Examples : null, () => import("./components/Examples"), "Examples");
const Pricing = late("pricing", typeof window === "undefined" ? (require("./components/Pricing") as Record<string, React.ComponentType>).Pricing : null, () => import("./components/Pricing"), "Pricing");
const Faq = late("faq", typeof window === "undefined" ? (require("./components/Closing") as Record<string, React.ComponentType>).Faq : null, () => import("./components/Closing"), "Faq");
const Finale = late("demo", typeof window === "undefined" ? (require("./components/Closing") as Record<string, React.ComponentType>).Finale : null, () => import("./components/Closing"), "Finale");

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
    const stopAnchors = guardAnchors();
    // an anchor in the address (/#pricing) scrolls to its section once the page has mounted; otherwise start at the top
    const id = location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    const toTarget = () => window.scrollTo({ top: target!.getBoundingClientRect().top + window.scrollY - 64, behavior: "auto" });
    if (target) { toTarget(); afterSettle(toTarget); }   // sections above hydrate after this and add their pin spacers: land again once they have
    else window.scrollTo(0, 0);
    return () => {
      stop(); stopHeads(); stopBands(); stopAnchors(); stopScroll(); html.style.scrollPaddingTop = "";
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
        {/* round 17: one story. Hero, statement, before and after, Full Circle, ask your supply chain, the night-band journey, pricing, FAQ, wordmark finale. */}
        <Hero />
        <Statement />
        <BeforeAfter />
        <Theatre />
        <Ask />
        <ShipmentJourney />
        <Examples />
        <Pricing />
        <Faq />
        <Finale />
      </main>
    </EstimateProvider>
  );
}
