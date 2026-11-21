import { useCallback, useState } from "react";
import { EUDR_SOURCE, applies, check } from "../content";
import { Dialog, LinkLabel } from "./bits";

/* Round 6 (follow-up): the EUDR check tool, kept on the Pricing EUDR tab. Its dates are in "Sound familiar?" row 02,
   so only the audience line, the button and the source link stay here. The dialog and its check are unchanged from
   round 5 (the check's own result lines still show the dates for the answer the visitor gets). */
function CheckBody() {
  const [good, setGood] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const covered = good && good !== check.goods[check.goods.length - 1];
  return (
    <div className="check">
      <fieldset>
        <legend className="eyebrow">{check.q1}</legend>
        <div className="check-opts">
          {check.goods.map((g) => (
            <label key={g} className={`opt${good === g ? " is-on" : ""}`}><input type="radio" name="good" value={g} checked={good === g} onChange={() => setGood(g)} />{g}</label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow">{check.q2}</legend>
        <div className="check-opts">
          {check.sizes.map((s) => (
            <label key={s.k} className={`opt${size === s.k ? " is-on" : ""}`}><input type="radio" name="size" value={s.k} checked={size === s.k} onChange={() => setSize(s.k)} />{s.t}</label>
          ))}
        </div>
      </fieldset>
      <div className="check-out" aria-live="polite">
        {good && size && (covered ? (
          <>
            <p className="t-body-lg">{check.resultCovered}</p>
            <p className="t-body t-soft">{size === "small" ? check.dateSmall : size === "large" ? check.dateLarge : check.dateUnsure}</p>
            <p className="t-caption t-muted"><a className="link" href={EUDR_SOURCE} target="_blank" rel="noopener noreferrer">{applies.source}</a></p>
          </>
        ) : (
          <>
            <p className="t-body-lg">{check.resultNot}</p>
            <p className="t-body t-soft">{check.resultNotMore}</p>
          </>
        ))}
        {good && size && <p className="t-caption t-muted">{check.next}</p>}
      </div>
    </div>
  );
}

export function EudrCheck() {
  const [open, setOpen] = useState(false);
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  return (
    <div className="r6-check">
      <p className="eyebrow">{applies.eyebrow}</p>
      <div className="r6-check-row">
        <button type="button" className="tlink link-btn" aria-haspopup="dialog" onClick={(e) => { setOpener(e.currentTarget); setOpen(true); }}><LinkLabel>{applies.check}</LinkLabel></button>
        <a className="tlink r6-source" href={EUDR_SOURCE} target="_blank" rel="noopener noreferrer"><LinkLabel arrow={false}>{applies.source}</LinkLabel></a>
      </div>
      <Dialog id="check" open={open} onClose={close} opener={opener} title={check.title} label={check.label}><CheckBody /></Dialog>
    </div>
  );
}
