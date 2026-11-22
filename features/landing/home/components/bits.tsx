import { getRoot } from "../lib/root";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { sunflowerCircles } from "../lib/phyllotaxis";
import { gsap, lockScroll, reduceMotion } from "../lib/motion";

/* r25-2b: the site mark is the golden-angle sunflower drawn as dots in two colours: yellow in the inner part, cobalt toward the outside, blended over the middle rings
   (colour-mix of two tokens, so it follows both themes). Same box and spiral as before. This is the site's mark, not Bindu's official logo file; the colour change needs
   Bindu's approval before production (v3/DECISIONS.md). The white variant (the statement chip) stays one colour. */
const MARK_N = 61;
const MARK_DOTS = sunflowerCircles(MARK_N, 100, 4).map((d, i) => {
  const t = i / (MARK_N - 1), p = Math.round(Math.min(1, Math.max(0, (t - 0.3) / 0.45)) * 5) * 20;   // 0 = all yellow, 100 = all cobalt, in steps of 20
  return { x: d.x.toFixed(1), y: d.y.toFixed(1), r: (d.r * 1.25).toFixed(2), fill: p === 0 ? "var(--sun)" : p === 100 ? "var(--cobalt-signal)" : `color-mix(in srgb, var(--cobalt-signal) ${p}%, var(--sun))` };
});
export function Mark({ size = 28, white = false, label = false }: { size?: number; white?: boolean; label?: boolean }) {
  return (
    <span className={`mark${white ? " mark-white" : ""}`} style={{ width: size, height: size }} aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined} aria-label={label ? "Bindu" : undefined}>
      <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
        {MARK_DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={white ? "currentColor" : d.fill} />)}
      </svg>
    </span>
  );
}

/* r36-3: Bindu's official sunflower logo (public/home/bindu-logo-*.webp, PNG fallback), the brand mark in the nav and the footer. The dot-built Mark above stays for the statement chip.
   64px copy for the nav (2x at 24px), 128px for the footer (2x at 40px). The link around it carries the accessible name, so the image itself is decorative. */
export function Logo({ size = 24 }: { size?: number }) {
  const n = size > 32 ? 128 : 64;
  return (
    <picture>
      <source srcSet={`/home/bindu-logo-${n}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo" src={`/home/bindu-logo-${n}.png`} width={size} height={size} alt="" decoding="async" />
    </picture>
  );
}

/* round 22 item 9, r34-1: the filled pill's label stays still (the letter roll is removed). The label is one plain span; the link keeps its accessible name (aria-label).
   On hover the magnetic pull (within about 80px, max 6px, the label 3px further) and the arrow's 4px nudge (CSS) stay, and the click sends a tiny burst of 6 to 8 yellow and
   cobalt dots from the arrow. Those need a fine pointer without reduced motion. The yellow never changes on hover. */
export function BtnLabel({ children }: { children: string }) {
  const host = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = host.current;
    const link = el?.closest<HTMLElement>("a,button");
    if (!el || !link) return;
    if (!link.hasAttribute("aria-label")) link.setAttribute("aria-label", children);
    if (reduceMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // r22-17: a tiny burst of 6 to 8 yellow and cobalt dots from the arrow on click (pointer devices, never under reduced motion)
    const burst = () => {
      const ar = link.querySelector<HTMLElement>(".btn-arrow"); if (!ar) return;
      const r = ar.getBoundingClientRect(), n = 7;
      for (let k = 0; k < n; k++) {
        const d = document.createElement("i"); d.setAttribute("aria-hidden", "true");
        d.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:4px;height:4px;margin:-2px;border-radius:50%;pointer-events:none;z-index:300;background:${k % 2 ? "var(--cobalt-signal)" : "var(--proof-dot)"}`;
        document.body.appendChild(d);
        const a = (k / n) * 6.283 + Math.random() * 0.6, dist = 26 + Math.random() * 18;
        gsap.to(d, { x: Math.cos(a) * dist, y: Math.sin(a) * dist, opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => d.remove() });
      }
    };
    link.addEventListener("click", burst);
    const st = { x: 0, y: 0 };
    const apply = () => { link.style.translate = `${st.x.toFixed(2)}px ${st.y.toFixed(2)}px`; el.style.translate = `${(st.x * 0.5).toFixed(2)}px ${(st.y * 0.5).toFixed(2)}px`; };
    const isPrimary = link.classList.contains("bh-btn-primary");
    const move = (e: PointerEvent) => {
      const r = link.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy, near = Math.abs(dx) < r.width / 2 + 80 && Math.abs(dy) < r.height / 2 + 80;
      const tx = near ? Math.max(-6, Math.min(6, dx * 0.12)) : 0, ty = near ? Math.max(-6, Math.min(6, dy * 0.12)) : 0;
      gsap.to(st, { x: tx, y: ty, duration: near ? 0.35 : 0.8, ease: near ? "power3.out" : "elastic.out(1, 0.45)", overwrite: true, onUpdate: apply });
    };
    if (isPrimary) window.addEventListener("pointermove", move, { passive: true });
    return () => { link.removeEventListener("click", burst); window.removeEventListener("pointermove", move); gsap.killTweensOf(st); link.style.translate = ""; el.style.translate = ""; };
  }, [children]);
  return (
    <>
      <span ref={host} className="btn-l">{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      </span>
    </>
  );
}

/* round 15 item 11: the label of a text link (underline grows from the left, text wipes to cobalt, arrow nudges 4px) */
export function LinkLabel({ children, arrow = true }: { children: string; arrow?: boolean }) {
  return (
    <>
      <span className="tlink-l" data-label={children}>{children}</span>
      {arrow && <span className="tlink-a" aria-hidden="true" />}
    </>
  );
}

/* the completed sunflower as precise dots (static): the hero/finale fallback and reduced-motion end state */
export function SunflowerArt({ n = 377, size = 600, className = "" }: { n?: number; size?: number; className?: string }) {
  const dots = useMemo(() => sunflowerCircles(n, size, 6), [n, size]);
  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
      {dots.map((d, i) => <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} />)}
    </svg>
  );
}

/* spiral progress: `on` dots lit in cobalt; complete = every dot yellow */
export function Spiral({ n = 34, on, size = 56, label }: { n?: number; on: number; size?: number; label?: string }) {
  const dots = useMemo(() => sunflowerCircles(n, size, 2), [n, size]);
  const lit = Math.round(on * n);
  return (
    <svg className={`spiral${on >= 1 ? " is-complete" : ""}`} viewBox={`0 0 ${size} ${size}`} width={size} height={size}
      role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} className={i < lit ? "on" : undefined} />)}
    </svg>
  );
}

export function Status({ s }: { s: string }) {
  return s === "live" ? <span className="chip chip-live">Live</span> : <span className="chip chip-build">In build</span>;
}

/* Native modal dialog: background inert, Esc closes, focus moves in and returns to the opener.
   Opens with a scale-in from the button that opened it. */
export function Dialog({ open, onClose, opener, title, label, children, id }:
  { open: boolean; onClose: () => void; opener: HTMLElement | null; title: string; label?: string; children: ReactNode; id: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);   // the portal target is in the document, which the server does not have
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) {
      if (opener) {
        const r = opener.getBoundingClientRect();
        d.style.setProperty("--ox", `${r.left + r.width / 2}px`); d.style.setProperty("--oy", `${r.top + r.height / 2}px`);
      }
      d.showModal(); lockScroll(true);
      d.classList.remove("is-in"); void d.offsetWidth; d.classList.add("is-in");
    } else if (!open && d.open) d.close();
  }, [open, opener, mounted]);
  useEffect(() => {   // Tab wraps inside the dialog (native modal focus can leave to the browser UI)
    const d = ref.current; if (!d) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = [...d.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1], at = document.activeElement;
      if (e.shiftKey && (at === first || !d.contains(at))) { e.preventDefault(); last!.focus(); }
      else if (!e.shiftKey && (at === last || !d.contains(at))) { e.preventDefault(); first!.focus(); }
    };
    d.addEventListener("keydown", trap);
    return () => d.removeEventListener("keydown", trap);
  }, []);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    const onClosed = () => { lockScroll(false); onClose(); opener?.focus(); };
    const onClick = (e: MouseEvent) => { if (e.target === d) d.close(); };
    d.addEventListener("close", onClosed); d.addEventListener("click", onClick);
    return () => { d.removeEventListener("close", onClosed); d.removeEventListener("click", onClick); };
  }, [onClose, opener, mounted]);
  if (!mounted) return null;
  return createPortal(
    <dialog ref={ref} className={`dlg${reduceMotion() ? " no-motion" : ""}`} aria-modal="true" aria-labelledby={`${id}-h`}>
      <div className="dlg-in band-dark">
        <div className="dlg-head">
          <h2 id={`${id}-h`} className="t-display-sm">{title}</h2>
          <button type="button" className="btn-icon dlg-x" onClick={() => ref.current?.close()} aria-label="Close">×</button>
        </div>
        {label && <p className="chip chip-illus dlg-label">{label}</p>}
        {children}
      </div>
    </dialog>,
    getRoot(),
  );
}
