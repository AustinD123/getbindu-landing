import { useEffect, useRef, useState } from "react";
import { DEMO_URL, cta, nav } from "../content";
import { BtnLabel, Mark } from "./bits";
import { getTheme, setTheme, useTheme } from "../lib/theme";
import { NAV_PAGES } from "../links";
import { setOn, useSound } from "../lib/sound";

/* round 13: the light or dark switch. The icon shows the theme it switches to (a moon in light, a sun in dark). */
function ThemeToggle() {
  const theme = useTheme();
  const toDark = theme === "light";
  return (
    <button type="button" className="btn btn-icon theme-toggle" aria-label={toDark ? nav.theme.toDark : nav.theme.toLight}
      onClick={() => setTheme(getTheme() === "light" ? "dark" : "light")}>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* both icons are always in the DOM and CSS hides one (opacity), so the boxes are the same in both themes */}
        <g className="ic-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></g>
        <path className="ic-moon" d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}

/* round 21: the sound toggle. Off by default; the AudioContext is only ever created after a click (lib/sound.ts). */
function SoundToggle() {
  const on = useSound();
  return (
    <button type="button" className="btn btn-icon sound-toggle" aria-label="Sound" aria-pressed={on} onClick={() => setOn(!on)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
        {on ? <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
      </svg>
    </button>
  );
}

/* x.ai nav: mark + links + the hero treatment (round 3, change 5): an OUTLINE pill for Estimate and a text link for
   the demo. The nav is on every view, so it never adds a filled pill: the filled one belongs to each section's main
   CTA (one filled pill per view). Under 520px the demo link moves into the drawer. Frosted once the page scrolls (Apple). */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    drawer.current?.querySelector("a")?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-in">
        <a className="nav-brand" href="#top" aria-label="Bindu, back to top"><Mark size={28} /><span>Bindu</span></a>
        <nav className="nav-links" aria-label="Site sections and pages">
          {nav.links.map((l) => <a key={l.href} href={l.href}>{l.t}</a>)}
          {NAV_PAGES.map((l) => <a key={l.u} href={l.u}>{l.t}</a>)}
        </nav>
        <SoundToggle />
        <ThemeToggle />
        <a className="btn btn-primary nav-book" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><BtnLabel>{cta.demoShort}</BtnLabel></a>
        <button ref={btn} type="button" className="btn btn-outline nav-menu" aria-expanded={open} aria-controls="nav-drawer" onClick={() => setOpen(!open)}>
          {open ? nav.close : nav.menu}
        </button>
      </div>
      <div id="nav-drawer" ref={drawer} className="nav-drawer" hidden={!open}>
        {nav.links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.t}</a>)}
        {NAV_PAGES.map((l) => <a key={l.u} href={l.u} onClick={() => setOpen(false)}>{l.t}</a>)}
        <a className="btn btn-primary nav-drawer-book" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><BtnLabel>{cta.demoShort}</BtnLabel></a>
      </div>
    </header>
  );
}
