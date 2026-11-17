/**
 * The booking link behind every demo CTA, and the one label every demo CTA
 * wears.
 *
 * Neutral module (no React, no "use client") so the landing story acts, the
 * regulation pages, the auth chrome and the llms.txt route can all import the
 * one value instead of re-typing the URL. Change the booking handle here.
 */

const BOOKING_URL = "https://cal.com/raahul-dutta-bpcqoa";

/**
 * The bare booking URL, carrying no attribution.
 *
 * Prefer `demoUrl(source, route)` for anything a visitor clicks: cal.com cannot
 * tell which page produced a booking unless the click arrives with UTM
 * parameters on it. This constant stays for the surfaces that are not a click
 * (llms.txt) and for call sites not migrated yet.
 */
export const DEMO_URL = BOOKING_URL;

/**
 * The single primary CTA label across the landing surface.
 *
 * Action plus outcome, and it names the length of the call the visitor is
 * agreeing to, which is the same thirty minutes llms.txt and the spoke closers
 * already promise. It replaces "Get started", "Get your price", "Contact",
 * "Book demo" and "Book a demo", so one wording accumulates recognition from
 * the header to the footer instead of five competing for it.
 */
export const DEMO_CTA_LABEL = "Book a 30-minute demo";

/** Pathname only: no query, no hash, no trailing slash. */
function normaliseRoute(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (!path.startsWith("/")) return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * The booking URL with its own attribution attached.
 *
 * `source` is the placement that was clicked ("header", "footer-closer",
 * "spoke-close", "eudr-coffee"). `route` is the page it was clicked from; it is
 * optional because the shared chrome renders on all 31 routes and only learns
 * which one it is in the browser.
 *
 *   utm_source   getbindu       so cal.com can split site traffic from the rest
 *   utm_medium   landing        the marketing surface
 *   utm_campaign book-a-demo    the one primary CTA
 *   utm_content  <source>       which CTA on the page was clicked
 *   utm_term     <route>        which page it was clicked from
 */
export function demoUrl(source: string, route?: string): string {
  const params = new URLSearchParams({
    utm_source: "getbindu",
    utm_medium: "landing",
    utm_campaign: "book-a-demo",
    utm_content: source,
  });
  if (route) params.set("utm_term", normaliseRoute(route));
  return `${BOOKING_URL}?${params.toString()}`;
}
