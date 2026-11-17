"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { trackPlausible } from "./analytics";
import { demoUrl } from "@/lib/demo-url";

/**
 * The demo-booking anchor, instrumented.
 *
 * `Book a demo` renders on all 31 landing routes and used to fire nothing,
 * while the four events that did exist all sat on the filing path that ends at
 * a sign-in wall. This is the counterpart of `FileCtaLink`: one anchor, one
 * event (`demo_cta_click`), and the attribution rides both the Plausible prop
 * and the destination querystring, so cal.com can also answer which page
 * produced a booking.
 *
 * Server components (the spoke closer, the compact footer) render this instead
 * of a bare <a> so the metric is measured on every surface, not only the ones
 * that already happened to be client components.
 *
 * The route is read after mount rather than during render: the same markup has
 * to come out of the server and out of the first client render, and the shared
 * chrome does not know which of the 31 routes it is on until it is in the
 * browser. Until then the href still carries source, campaign and medium.
 */
export function DemoCtaLink({
  source,
  className,
  ariaLabel,
  children,
}: {
  /** Placement being clicked: "header", "footer-closer", "spoke-close". */
  source: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const [route, setRoute] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRoute(window.location.pathname);
  }, []);

  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={demoUrl(source, route)}
      onClick={() =>
        trackPlausible("demo_cta_click", {
          source,
          page: route ?? "unknown",
        })
      }
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
