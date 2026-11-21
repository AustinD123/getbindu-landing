import { tRaf, tCaf } from "../lib/loop";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DEMO_URL, cta, pricing } from "../content";
import { reduceMotion } from "../lib/motion";
import { BtnLabel, Dialog } from "./bits";

/* Round 2: "Estimate your cost" opens this one popup from the hero, the nav, the pricing section and the
   finale. The popup ends with the only filled pill inside it ("Book a demo"), so estimate -> book is one flow.
   One Dialog instance (not one per button) keeps the id unique and focus returns to whichever button opened it. */

const FILE = 199, KEEP5 = 50, KEEP10 = 100, WORKSPACE_MONTH = 20;
const eur = (v: number) => "€" + Math.round(v).toLocaleString("en-GB");

/* the yearly total ticks to its new value as the slider moves */
function useTicker(target: number) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduceMotion()) { setShown(target); from.current = target; return; }
    const start = performance.now(), a = from.current; let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 320), e = 1 - Math.pow(1 - p, 3), v = a + (target - a) * e;
      setShown(v); from.current = v;
      if (p < 1) raf = tRaf(step);
    };
    raf = tRaf(step);
    return () => tCaf(raf);
  }, [target]);
  return shown;
}

function Calculator() {
  const [n, setN] = useState(24);
  const [ten, setTen] = useState(false);
  const C = pricing.calc;
  const perFiling = FILE + (ten ? KEEP10 : KEEP5), workspace = WORKSPACE_MONTH * 12, total = n * perFiling + workspace;
  const shown = useTicker(total);
  return (
    <div className="calc">
      <label className="calc-row" htmlFor="calc-n">
        <span className="eyebrow">{C.filings}</span>
        <span className="num calc-n">{n}</span>
      </label>
      <input id="calc-n" type="range" min={1} max={200} step={1} value={n} onChange={(e) => setN(+e.target.value)} style={{ ["--fill" as string]: `${((n - 1) / 199) * 100}%` }} />
      <fieldset className="calc-keep">
        <legend className="eyebrow">{C.keep}</legend>
        <label className={`opt${!ten ? " is-on" : ""}`}><input type="radio" name="keep" checked={!ten} onChange={() => setTen(false)} />{C.keep5}</label>
        <label className={`opt${ten ? " is-on" : ""}`}><input type="radio" name="keep" checked={ten} onChange={() => setTen(true)} />{C.keep10}</label>
      </fieldset>
      <dl className="calc-lines">
        <div><dt>{n} {C.lineFilings} × {eur(perFiling)}</dt><dd className="num">{eur(n * perFiling)}</dd></div>
        <div><dt>{C.lineWorkspace}</dt><dd className="num">{eur(workspace)}</dd></div>
      </dl>
      <div className="calc-total" aria-live="polite">
        <span className="eyebrow">{C.total}</span>
        <span className="num num-key calc-sum">{eur(shown)}</span>
        <span className="t-caption t-muted">{C.vat}</span>
      </div>
      <a className="btn btn-primary calc-book" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><BtnLabel>{cta.popupBook}</BtnLabel></a>
    </div>
  );
}

type Estimate = { show: (opener: HTMLElement) => void };
const EstimateCtx = createContext<Estimate>({ show: () => {} });

/* mounted once, at the app root */
export function EstimateProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const show = useCallback((el: HTMLElement) => { setOpener(el); setOpen(true); }, []);
  const value = useMemo(() => ({ show }), [show]);
  return (
    <EstimateCtx.Provider value={value}>
      {children}
      <Dialog id="calc" open={open} onClose={close} opener={opener} title={pricing.calc.title} label={pricing.calc.label}><Calculator /></Dialog>
    </EstimateCtx.Provider>
  );
}

/* call show(event.currentTarget) from the Estimate button */
export function useEstimate() {
  return useContext(EstimateCtx);
}
