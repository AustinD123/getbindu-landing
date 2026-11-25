/**
 * Layout for the homepage only. The homepage has its own nav and footer, so it
 * is served outside app/(en)/(landing) and never gets LandingChrome. The
 * wrapper's class scopes every homepage style; the head script sets the theme
 * and the intro state on the wrapper before first paint, so nothing flashes.
 */

import { Rubik } from "next/font/google";
import { LandingJsonLd } from "../../landing-chrome";

// r64 (DESIGN.md v4, adaptation 1): Rubik (SIL OFL) for headings and body, chosen by Austin from a 25-font trial.
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

// Light unless the reader chose dark; the intro plays unless reduced motion is on or the screen is a phone (under 768px), where the hero paints at once.
const PRE_PAINT = `(function(){var r=document.currentScript.parentElement;try{r.dataset.theme=localStorage.getItem("bindu-theme")==="dark"?"dark":"light"}catch(e){}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){r.setAttribute("data-rm","")}else if(window.innerWidth<768){r.dataset.intro="off"}else{r.dataset.intro="on"}})()`;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingJsonLd />
      <div
        className={`bindu-home ${rubik.variable}`}
        data-theme="light"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
        {children}
      </div>
    </>
  );
}
