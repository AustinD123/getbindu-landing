"use client";

/**
 * Language switcher for the /eudr page family (en · de · pl · it · nl · fr · es).
 *
 * Only the EUDR pages are localized, so this lives on the EUDR page rather than
 * in the global IslandHeader. A frosted-glass pill fixed top-left, mirroring the
 * GitHub/Sign-in chrome pills top-right; the glass reads on both the dark hero
 * and the light sections without a colour flip. Each option is a real <a> to the
 * locale's route (hrefLang set), so it works without JS. <html lang> comes from
 * the per-locale root layout (app/(de)/layout.tsx and its siblings), which
 * serves the correct lang attribute in the HTML itself.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { EUDR_LOCALE_PATHS } from "./eudr-content";
import "./language-switcher.css";

type LocaleCode = keyof typeof EUDR_LOCALE_PATHS;

const LOCALES: { code: LocaleCode; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "pl", label: "Polski", short: "PL" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
];

/**
 * The switcher's own labels, in the language of the page it sits on. They are
 * the only text a screen reader gets from this control, so leaving them in
 * English put an English landmark inside an otherwise German or Polish
 * document. Keyed off `current`, so no caller has to pass them.
 */
const A11Y: Record<LocaleCode, { change: string; menu: string }> = {
  en: { change: "Change language. Current language", menu: "Language" },
  de: { change: "Sprache wechseln. Aktuelle Sprache", menu: "Sprache" },
  pl: { change: "Zmień język. Bieżący język", menu: "Język" },
  it: { change: "Cambia lingua. Lingua corrente", menu: "Lingua" },
  nl: { change: "Taal wijzigen. Huidige taal", menu: "Taal" },
  fr: { change: "Changer de langue. Langue actuelle", menu: "Langue" },
  es: { change: "Cambiar de idioma. Idioma actual", menu: "Idioma" },
};

export function LanguageSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const cur = LOCALES.find((l) => l.code === current) ?? LOCALES[0]!;
  const a11y = A11Y[cur.code];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Escape used to close the panel and leave focus on <body>, so a
      // keyboard user was dropped back to the top of the document. Hand it
      // back to the control they opened.
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="ed-lang" data-open={open} ref={ref}>
      <button
        aria-controls="ed-lang-menu"
        aria-expanded={open}
        aria-label={`${a11y.change}: ${cur.label}`}
        className="ed-lang-btn"
        onClick={() => setOpen((o) => !o)}
        ref={triggerRef}
        type="button"
      >
        <Globe aria-hidden="true" className="ed-lang-globe" />
        <span className="ed-lang-label">{cur.label}</span>
        <span className="ed-lang-label-short">{cur.short}</span>
        <ChevronDown aria-hidden="true" className="ed-lang-chev" />
      </button>

      {/* A disclosure holding plain links, not an ARIA menu. role="menu" and
          role="menuitem" promise arrow-key traversal that this control does
          not implement, and a screen reader announcing "menu" then finding no
          menu behaviour is worse than no role at all. */}
      {open ? (
        <ul aria-label={a11y.menu} className="ed-lang-menu" id="ed-lang-menu">
          {LOCALES.map((l) => {
            const active = l.code === current;
            return (
              <li key={l.code}>
                <Link
                  aria-current={active ? "true" : undefined}
                  className={`ed-lang-item${active ? " is-active" : ""}`}
                  href={EUDR_LOCALE_PATHS[l.code]}
                  hrefLang={l.code}
                  onClick={() => setOpen(false)}
                >
                  <span className="ed-lang-code">{l.short}</span>
                  <span className="ed-lang-name">{l.label}</span>
                  {active ? (
                    <Check aria-hidden="true" className="ed-lang-check" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
