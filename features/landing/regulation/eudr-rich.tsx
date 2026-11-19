import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Render an EudrContent string with two inline markups:
 *   **bold**            → <strong>
 *   [label](/path)      → an internal <Link> (or <a> for external hrefs)
 * Everything else is plain text; translations move the spans freely, and a
 * locale that omits the markup just renders plain prose.
 *
 * Links carry `.ed-rich-link` so prose links read as links (underline) on both
 * the dark and light slabs without fighting each slab's colour tokens.
 *
 * Deliberately NOT a "use client" module: it returns plain React elements and
 * is called from both the server component (EudrPage's hero sub) and the
 * client act components. next/link's <Link> is isomorphic, so it is safe in
 * both; a client-only function returning JSX could not be called from the
 * server component.
 */
const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function renderRich(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) {
      out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    }
    if (m[1] !== undefined) {
      out.push(<strong key={key++}>{m[1]}</strong>);
    } else if (m[2] !== undefined && m[3] !== undefined) {
      const label = m[2];
      const href = m[3];
      out.push(
        href.startsWith("/") ? (
          <Link className="ed-rich-link" href={href} key={key++}>
            {label}
          </Link>
        ) : (
          <a className="ed-rich-link" href={href} key={key++}>
            {label}
          </a>
        )
      );
    }
    last = TOKEN.lastIndex;
  }
  if (last < text.length) {
    out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }
  return out;
}
