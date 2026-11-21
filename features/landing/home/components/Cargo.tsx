import { useInView } from "../lib/fx";
import "../styles/cargo.css";

/* Round 2, change 6: one small wireframe cargo motif per section (no ship, no photo, no cartoon). Each plays once
   when it enters the viewport. Reduced motion: useInView sets the end state at once and transitions drop to 0.01ms.
   Every drawing is an illustration and carries an "Illustration" label. */

/* Pricing: a container sealed when the filing is in. The seal closes, then the yellow dot marks it filed. */
export function SealBox({ label }: { label: string }) {
  const [ref, seen] = useInView<HTMLElement>(0.4);
  return (
    <figure ref={ref} className={`cargo cargo-seal${seen ? " is-in" : ""}`}>
      <svg viewBox="0 0 160 96" aria-hidden="true">
        <rect className="cg-body" x="12" y="12" width="136" height="72" rx="3" />
        {Array.from({ length: 9 }, (_, i) => <line key={i} className="cg-rib" x1={24 + i * 14} y1="16" x2={24 + i * 14} y2="80" />)}
        <rect className="cg-seal" x="62" y="38" width="36" height="20" rx="2" />
        <circle className="cg-dot" cx="80" cy="48" r="4.5" />
      </svg>
      <figcaption className="cargo-cap"><span className="chip chip-illus">Illustration</span><span className="t-caption t-muted">{label}</span></figcaption>
    </figure>
  );
}

/* Roles: a thin cobalt route trail as the section divider. It draws left to right; the dots at its ends are CSS. */
export function RouteDivider() {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} className={`route-div${seen ? " is-in" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 16" preserveAspectRatio="none">
        <line className="rd-trail" x1="0" y1="8" x2="1200" y2="8" />
      </svg>
    </div>
  );
}
