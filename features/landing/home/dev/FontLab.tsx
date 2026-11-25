"use client";

/* r63: a font trial switcher for Austin. Dev only (or any load with ?fontlab); it is never mounted for visitors (see FontLabGate in home-page.tsx).
   Picking a family loads it from Google Fonts on demand (one <link> per family) and sets --font-display (Headings) and --font-sans (Body) on the
   homepage wrapper. The pair is kept in localStorage; Reset removes it. Not part of merge-back. */
import { useEffect, useState, type CSSProperties } from "react";
import { getRoot } from "../lib/root";

type F = { name: string; serif?: boolean; weights?: string; note?: string };
const FONTS: F[] = [
  { name: "Nunito", note: "current headings" }, { name: "Inter", note: "current body" }, { name: "Manrope" }, { name: "DM Sans" }, { name: "Plus Jakarta Sans" },
  { name: "Outfit" }, { name: "Space Grotesk" }, { name: "Sora" }, { name: "Figtree" }, { name: "Onest" }, { name: "Geist" }, { name: "Instrument Sans" },
  { name: "Bricolage Grotesque" }, { name: "Hanken Grotesk" }, { name: "Schibsted Grotesk" }, { name: "Public Sans" }, { name: "IBM Plex Sans" },
  { name: "Work Sans" }, { name: "Rubik" }, { name: "Lexend" }, { name: "Albert Sans" },
  { name: "Fraunces", serif: true }, { name: "Instrument Serif", serif: true, weights: "" }, { name: "Newsreader", serif: true }, { name: "Source Serif 4", serif: true },
];
const KEY = "bindu-fontlab";
const DEFAULT = "";   // an empty choice means the site's own font
type Pick = { h: string; b: string };

const load = (f: F) => {
  const id = `fontlab-${f.name.replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;
  const l = document.createElement("link");
  l.id = id; l.rel = "stylesheet";
  l.href = `https://fonts.googleapis.com/css2?family=${f.name.replace(/\s+/g, "+")}${f.weights === "" ? "" : ":wght@400;500;600;700"}&display=swap`;
  document.head.appendChild(l);
};
const apply = (p: Pick) => {
  const root = getRoot();
  for (const [prop, name] of [["--font-display", p.h], ["--font-sans", p.b]] as const) {
    const f = FONTS.find((x) => x.name === name);
    if (!f) { root.style.removeProperty(prop); continue; }
    load(f);
    root.style.setProperty(prop, `"${f.name}", ${f.serif ? "Georgia, serif" : "ui-sans-serif, system-ui, sans-serif"}`);
  }
};

const box: CSSProperties = { position: "fixed", left: 16, bottom: 16, zIndex: 2147483000, font: "500 14px/1.3 system-ui, sans-serif", color: "#111" };
const btn: CSSProperties = { minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid rgba(0,0,0,.2)", background: "rgba(255,255,255,.95)", color: "#111", font: "inherit", cursor: "pointer" };
const sel: CSSProperties = { width: "100%", minHeight: 36, borderRadius: 8, border: "1px solid rgba(0,0,0,.25)", padding: "0 8px", font: "inherit", background: "#fff", color: "#111" };

export function FontLab() {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<Pick>({ h: DEFAULT, b: DEFAULT });
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) { const p = JSON.parse(s) as Pick; setPick(p); apply(p); } } catch { /* storage may be blocked */ }
  }, []);
  const set = (p: Pick) => {
    setPick(p); apply(p);
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  };
  const reset = () => {
    const p = { h: DEFAULT, b: DEFAULT };
    setPick(p); apply(p);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  };
  const opts = (def: string) => [<option key="d" value="">{`Site default (${def})`}</option>, ...FONTS.map((f) => <option key={f.name} value={f.name}>{f.name}{f.note ? ` (${f.note})` : ""}{f.serif ? " (serif)" : ""}</option>)];
  return (
    <div style={box} data-fontlab>
      {open && (
        <div role="group" aria-label="Font trial" style={{ width: 280, marginBottom: 8, padding: 14, borderRadius: 12, border: "1px solid rgba(0,0,0,.2)", background: "rgba(255,255,255,.97)", display: "grid", gap: 10 }}>
          <label>Headings<select style={sel} value={pick.h} onChange={(e) => set({ ...pick, h: e.target.value })}>{opts("Nunito")}</select></label>
          <label>Body<select style={sel} value={pick.b} onChange={(e) => set({ ...pick, b: e.target.value })}>{opts("Inter")}</select></label>
          <div aria-live="polite">Headings: {pick.h || "Nunito"} / Body: {pick.b || "Inter"}</div>
          <button type="button" style={{ ...btn, minHeight: 36 }} onClick={reset}>Reset</button>
        </div>
      )}
      <button type="button" style={btn} aria-expanded={open} onClick={() => setOpen((o) => !o)}>Fonts</button>
    </div>
  );
}
