/**
 * Layout for the homepage only. The homepage has its own nav and footer, so it
 * is served outside app/(en)/(landing) and never gets LandingChrome. The
 * wrapper's class scopes every homepage style; the head script sets the theme
 * and the intro state on the wrapper before first paint, so nothing flashes.
 */

import { IBM_Plex_Mono } from "next/font/google";
import { LandingJsonLd } from "../../landing-chrome";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // the arrow (U+2192) is not in the Latin subset; let it fall to the system mono face, as the mockup does, not to a metric-adjusted Arial
  adjustFontFallback: false,
});

// Light unless the reader chose dark; the intro plays unless reduced motion is on.
const PRE_PAINT = `(function(){var r=document.currentScript.parentElement;try{r.dataset.theme=localStorage.getItem("bindu-theme")==="dark"?"dark":"light"}catch(e){}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){r.setAttribute("data-rm","")}else{r.dataset.intro="on"}})()`;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingJsonLd />
      <div
        className={`bindu-home ${plexMono.variable}`}
        data-theme="light"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
        {children}
      </div>
    </>
  );
}
