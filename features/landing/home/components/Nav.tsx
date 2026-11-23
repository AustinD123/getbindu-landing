import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reduceMotion } from "../lib/motion";
import { onReady } from "../lib/ready";
import { DEMO_URL, cta, nav } from "../content";
import { BtnLabel, Logo } from "./bits";
import { getTheme, setTheme, useTheme } from "../lib/theme";
import { NAV_BLOG, NAV_REGULATIONS } from "../links";

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

/* r38-1: the Regulations disclosure. A button (aria-expanded, aria-controls) over a plain list of links. Opens on click, and
   on hover after a short delay for a mouse; closes on Esc (focus returns to the button), a click outside, or focus leaving.
   Arrow keys, Home and End move between the items. */
function RegulationsMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const items = () => Array.from(root.current?.querySelectorAll<HTMLAnchorElement>(".nav-reg-panel a") ?? []);
  const clear = () => window.clearTimeout(timer.current);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);
  useEffect(() => clear, []);
  const onKey = (e: React.KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape" && open) { e.preventDefault(); setOpen(false); btn.current?.focus(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); requestAnimationFrame(() => items()[e.key === "ArrowDown" ? 0 : list.length - 1]?.focus()); return; }
      const next = e.key === "ArrowDown" ? (i + 1) % list.length : (i <= 0 ? list.length - 1 : i - 1);
      list[next]?.focus();
    } else if (open && (e.key === "Home" || e.key === "End") && i >= 0) {
      e.preventDefault(); list[e.key === "Home" ? 0 : list.length - 1]?.focus();
    }
  };
  const hover = (on: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clear();
    timer.current = window.setTimeout(() => setOpen(on), on ? 120 : 200);
  };
  return (
    <div ref={root} className={`nav-reg${open ? " is-open" : ""}`} onKeyDown={onKey}
      onPointerEnter={hover(true)} onPointerLeave={hover(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false); }}>
      <button ref={btn} type="button" className="nav-reg-btn" aria-expanded={open} aria-controls="nav-reg-panel"
        onClick={() => { clear(); setOpen(!open); }}>
        {nav.regulations}
        <svg aria-hidden="true" viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
      </button>
      <div id="nav-reg-panel" className="nav-reg-panel" hidden={!open}>
        {NAV_REGULATIONS.map((l) => <a key={l.u} href={l.u} onClick={() => setOpen(false)}>{l.t}</a>)}
      </div>
    </div>
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
  const links = useRef<HTMLElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);   // the dot and the rail exist only once GSAP can own them (no CSS hidden states)
  const [current, setCurrent] = useState<string | null>(null);   // r42-2: the section in view (an id from nav.links), or null
  useEffect(() => setMounted(true), []);
  useLayoutEffect(() => {
    if (!mounted) return;
    gsap.set(dot.current, { opacity: 0 });
    gsap.set(fill.current, { scaleX: 0, transformOrigin: "0 50%" });
    gsap.set(tip.current, { x: 0 });
  }, [mounted]);
  /* r42-2: scroll-spy. One ScrollTrigger per anchored section; a section that has not hydrated yet is retried when it is ready. */
  useEffect(() => {
    if (!mounted) return;
    const sts: ScrollTrigger[] = [];
    const attach = (id: string) => {
      const el = document.getElementById(id);
      if (!el || sts.some((t) => t.vars.id === id)) return !!el;
      sts.push(ScrollTrigger.create({
        id, trigger: el, start: "top center", end: "bottom center",
        onEnter: () => setCurrent(id), onEnterBack: () => setCurrent(id),
        onLeave: () => setCurrent((c) => (c === id ? null : c)), onLeaveBack: () => setCurrent((c) => (c === id ? null : c)),
      }));
      return true;
    };
    const ids = nav.links.map((l) => l.href.slice(1));
    const missing = ids.filter((id) => !attach(id));
    const off = missing.length ? onReady((id) => { if (missing.includes(id)) attach(id); }) : undefined;
    return () => { off?.(); sts.forEach((t) => t.kill()); };
  }, [mounted]);
  /* the dot slides under the active link (power3.out, 0.45s); with no active link it fades out; reduced motion jumps */
  const placed = useRef(false);
  useEffect(() => {
    if (!mounted) return;
    const d = dot.current, nl = links.current;
    if (!d || !nl) return;
    const at = () => {
      const a = current ? nl.querySelector<HTMLElement>(`a[href="#${current}"]`) : null;
      return a && a.offsetWidth ? { x: a.offsetLeft + a.offsetWidth / 2 - 3, y: a.offsetTop + a.offsetHeight - 9 } : null;
    };
    const p = at(), jump = reduceMotion();
    if (!p) { gsap.killTweensOf(d); if (jump) gsap.set(d, { opacity: 0 }); else gsap.to(d, { opacity: 0, duration: 0.25, ease: "power2.out" }); return; }
    gsap.killTweensOf(d);
    if (!placed.current || jump) gsap.set(d, { ...p, opacity: 1 });
    else gsap.to(d, { ...p, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true });
    placed.current = true;
    const re = () => { const q = at(); if (q) gsap.set(d, q); };
    window.addEventListener("resize", re);
    return () => window.removeEventListener("resize", re);
  }, [current, mounted]);
  /* r42-3: the progress rail. Transform only (scaleX on the fill, x on the tip), scrubbed to page scroll by one ScrollTrigger. */
  useEffect(() => {
    if (!mounted) return;
    const setFill = gsap.quickSetter(fill.current, "scaleX") as (v: number) => void;
    const setTip = gsap.quickSetter(tip.current, "x", "px") as (v: number) => void;
    let w = rail.current?.offsetWidth ?? 0;
    const apply = (p: number) => { setFill(p); setTip(p * Math.max(0, w - 5)); };
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onRefresh: (self) => { w = rail.current?.offsetWidth ?? 0; apply(self.progress); },
      onUpdate: (self) => apply(self.progress),
    });
    return () => st.kill();
  }, [mounted]);
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
        <a className="nav-brand" href="#top" aria-label="Bindu, back to top"><Logo size={24} /><span>Bindu</span></a>
        <nav ref={links} className="nav-links" aria-label="Site sections and pages">
          {nav.links.map((l) => <a key={l.href} href={l.href} aria-current={current === l.href.slice(1) ? "location" : undefined}>{l.t}</a>)}
          <RegulationsMenu />
          <a href={NAV_BLOG.u}>{NAV_BLOG.t}</a>
          {mounted && <span ref={dot} className="nav-dot" aria-hidden="true" />}
        </nav>
        <ThemeToggle />
        <a className="btn bh-btn-primary nav-book" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><BtnLabel>{cta.demoShort}</BtnLabel></a>
        <button ref={btn} type="button" className="btn btn-outline nav-menu" aria-expanded={open} aria-controls="nav-drawer" onClick={() => setOpen(!open)}>
          {open ? nav.close : nav.menu}
        </button>
        {mounted && <div ref={rail} className="nav-rail" aria-hidden="true"><span ref={fill} className="nav-rail-fill" /><span ref={tip} className="nav-rail-tip" /></div>}
      </div>
      <div id="nav-drawer" ref={drawer} className="nav-drawer" hidden={!open}>
        {nav.links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.t}</a>)}
        <p className="nav-drawer-head" id="nav-drawer-reg">{nav.regulations}</p>
        <div role="group" aria-labelledby="nav-drawer-reg" className="nav-drawer-group">
          {NAV_REGULATIONS.map((l) => <a key={l.u} href={l.u} onClick={() => setOpen(false)}>{l.t}</a>)}
        </div>
        <a href={NAV_BLOG.u} onClick={() => setOpen(false)}>{NAV_BLOG.t}</a>
        <a className="btn bh-btn-primary nav-drawer-book" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><BtnLabel>{cta.demoShort}</BtnLabel></a>
      </div>
    </header>
  );
}
