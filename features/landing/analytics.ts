// Plausible custom-event helper for landing surfaces. The script is loaded
// globally on the marketing pages; the call no-ops when it isn't there
// (dev, ad blockers). Client modules only: it touches `window`.
//
// Events emitted from the landing surface, all sharing a `source` prop that
// names the placement clicked:
//   demo_cta_click    { source, page }        every demo booking anchor
//   file_cta_click    { regulation, source }  the filing doors
//   journey_cta_click { regulation, source }  the hero's in-page "show me" door
//   lookup_submitted  { code, source }        the tariff lookup
//   obligation_shown  { regulation, scope, source }
//   detail_cta_click  { code, source }
export function trackPlausible(event: string, props: Record<string, string>) {
  const w = window as {
    plausible?: (event: string, options?: { props: Record<string, string> }) => void;
  };
  w.plausible?.(event, { props });
}
