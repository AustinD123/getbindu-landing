import { useEffect, useRef, useState } from "react";

/* Round 22, item 13: a thin scroll-progress rail of dots in the right gutter. One dot per section; the dots fill cobalt as you read and the current
   section's dot is yellow. Hidden where the gutter is too narrow (under 1100px). aria-hidden; no dot-grid background anywhere. */
export function Rail() {
  const [n, setN] = useState(0);
  const [cur, setCur] = useState(0);
  const ys = useRef<number[]>([]);
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("main [data-guide-anchor]"));
    setN(secs.length);
    const measure = () => { ys.current = secs.map((s) => s.getBoundingClientRect().top + window.scrollY); };
    let lastCur = -1;
    const on = () => {
      const y = window.scrollY + window.innerHeight * 0.45;
      let c = 0; ys.current.forEach((v, i) => { if (y >= v) c = i; });
      if (c !== lastCur) { lastCur = c; setCur(c); }
    };
    measure(); on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", () => { measure(); on(); });
    const t = window.setTimeout(() => { measure(); on(); }, 1500);
    return () => { window.removeEventListener("scroll", on); window.clearTimeout(t); };
  }, []);
  return (
    <div className="rail" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <i key={i} className={i === cur ? "is-cur" : i < cur ? "is-done" : ""} />)}
    </div>
  );
}
