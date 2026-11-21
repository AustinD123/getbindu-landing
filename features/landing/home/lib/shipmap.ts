/* Simplified map geometry for the example shipments (ShipmentJourney): five illustrative routes, one per regulation.
   Hand-drawn in our own code from rough coordinates (no copied assets, no survey data). Illustration, not to scale.
   Projection: equirectangular, scaled by cos(25°) so shapes look right at this latitude band.
   Coastline provenance: typed by hand from memory of the coast's rough shape (round 14, item 6); not traced from any map. */
import { sunflower } from "./phyllotaxis";
import { landRings } from "./landdata";

const WEST = -84, NORTH = 56;
const COS0 = Math.cos((25 * Math.PI) / 180);
const K = 10;                                  // map units per degree
// the viewport the SVG shows, in screen-independent map units (the framing fits each story's route into it)
export const MAP_W = 888;
export const MAP_H = 610;

export type Pt = [number, number];

export function project(lon: number, lat: number): Pt {
  return [(lon - WEST) * COS0 * K, (NORTH - lat) * K];
}

/* r22-4: land from Natural Earth 1:50m (public domain), simplified; see lib/landdata.ts and LICENSES.md. COAST_D draws the crisp 1px coastlines and
   the same closed outlines are filled with a light land wash. GRAT_D is a faint graticule every 30 degrees. */
const ringD = (r: [number, number][]) => r.map(([lo, la], i) => { const [x, y] = project(lo, la); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join("") + "Z";
export const COAST_D = landRings().map(ringD).join("");
export const GRAT_D = (() => {
  let d = "";
  for (let lo = -180; lo <= 180; lo += 30) { const [x0, y0] = project(lo, 75), [x1, y1] = project(lo, -60); d += `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`; }
  for (let la = -60; la <= 75; la += 30) { const [x0, y0] = project(-180, la), [x1, y1] = project(180, la); d += `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`; }
  return d;
})();

// the drawn world, so the dot field and the grid cover every framing (world units)
export const WORLD = { x: -420, y: -260, w: 2500, h: 1000 };

// the five routes, [lon, lat] in order along the sea: each one is a list of waypoints kept off the land
const ROUTE_EUDR: Pt[] = [
  [-80.0, -2.2], [-81.2, -2.5], [-81.5, 1.0], [-80.2, 6.0], [-79.55, 8.8], [-79.9, 9.35],
  [-79.2, 9.9], [-76.5, 11.3], [-70.0, 12.8], [-65.5, 17.2], [-61.5, 19.8], [-55.0, 25.0], [-45.0, 33.0],
  [-32.0, 40.0], [-22.0, 45.0], [-13.0, 48.5], [-6.5, 49.8], [-3.0, 49.5], [-0.5, 49.7], [1.2, 50.9], [2.5, 51.2], [3.6, 51.35], [4.35, 51.25],
];
// Suez and the Mediterranean, shared by the Asian routes
const RED_SEA: Pt[] = [
  [42.0, 14.5], [41.0, 18.0], [39.0, 21.5], [38.2, 24.0], [35.5, 28.0], [33.2, 28.5], [32.6, 29.9], [32.4, 31.1], [32.2, 31.6],
];
const MED: Pt[] = [
  [27.0, 33.2], [24.5, 34.5], [21.5, 35.8], [18.0, 35.5], [15.5, 35.0], [11.8, 36.0], [9.0, 37.5], [5.0, 37.5], [2.5, 38.5], [0.5, 38.4],
];
const MED_TO_GIBRALTAR: Pt[] = [[-1.5, 37.0], [-4.0, 36.4], [-5.6, 36.0]];
const ATLANTIC_NORTH: Pt[] = [
  [-7.0, 36.0], [-9.6, 37.0], [-10.2, 39.5], [-9.8, 43.5], [-6.0, 47.5], [-6.5, 49.0], [-3.0, 49.6], [-0.5, 49.7], [1.2, 50.9], [2.5, 51.2], [3.6, 51.35],
];
const NORTH_SEA_TO_HAMBURG: Pt[] = [[3.0, 52.9], [4.8, 54.0], [7.8, 54.2], [8.7, 53.95], [9.5, 53.7], [9.95, 53.52]];
const ROUTE_CBAM: Pt[] = [
  [72.2, 18.6], [68.5, 19.5], [64.5, 19.5], [61.0, 18.5], [57.5, 15.8], [52.5, 14.0], [49.0, 12.0], [45.0, 11.0], [43.3, 12.0],
  ...RED_SEA, ...MED, ...MED_TO_GIBRALTAR, ...ATLANTIC_NORTH, [4.05, 51.95],
];
const ROUTE_DPP: Pt[] = [
  [122.3, 29.6], [121.5, 27.5], [120.5, 25.0], [119.0, 23.8], [116.0, 21.5], [112.0, 19.5], [110.0, 14.5], [109.0, 11.0], [107.0, 8.5],
  [104.5, 6.5], [104.0, 4.0], [104.2, 1.2], [102.0, 2.8], [100.0, 4.3], [98.0, 6.0], [95.3, 6.5], [92.0, 7.5], [88.0, 6.5], [82.0, 5.5],
  [78.0, 6.0], [74.0, 9.5], [73.0, 10.5], [70.0, 15.0], [68.0, 18.0], [64.0, 20.5], [60.5, 19.5], [57.5, 15.8], [52.5, 14.0], [49.0, 12.0],
  [45.0, 11.0], [43.3, 12.0], ...RED_SEA, ...MED, ...MED_TO_GIBRALTAR, ...ATLANTIC_NORTH, ...NORTH_SEA_TO_HAMBURG,
];
const ROUTE_REACH: Pt[] = [
  [-94.9, 29.4], [-94.6, 29.2], [-93.0, 28.8], [-90.0, 28.5], [-88.0, 28.8], [-86.5, 25.5], [-84.5, 24.0], [-82.0, 24.2], [-81.0, 24.0],
  [-79.0, 28.0], [-76.5, 31.0], [-73.5, 35.5], [-70.0, 38.0], [-66.0, 40.5], [-60.0, 43.0], [-50.0, 44.0], [-40.0, 45.0], [-30.0, 46.5],
  [-20.0, 48.0], [-12.0, 48.8], [-8.5, 49.6], [-6.0, 49.8], [-3.0, 49.6], [-0.5, 49.7], [1.2, 50.9], [2.5, 51.2], [3.6, 51.35], [4.35, 51.25],
];
const ROUTE_PPWR: Pt[] = [
  [107.6, 10.2], [106.5, 8.5], [104.5, 7.0], [103.5, 5.0], [102.0, 2.8], [100.0, 4.3], [98.0, 6.0], [95.3, 6.5], [92.0, 7.5], [88.0, 6.5],
  [82.0, 5.5], [78.0, 6.0], [74.0, 9.5], [73.0, 10.5], [70.0, 15.0], [68.0, 18.0], [64.0, 20.5], [60.5, 19.5], [57.5, 15.8], [52.5, 14.0],
  [49.0, 12.0], [45.0, 11.0], [43.3, 12.0], ...RED_SEA, ...MED, [-0.1, 39.2], [-0.32, 39.45],
];

// the framing: fit the route's box (with a margin) into the viewport; the camera zooms in on the ship from there
export type Frame = { cx: number; cy: number; s: number };
function frameOf(pts: Pt[]): Frame {
  const xs = pts.map(([lo, la]) => project(lo, la)[0]), ys = pts.map(([lo, la]) => project(lo, la)[1]);
  const pad = 40;
  const x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad, y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
  const s = Math.min(MAP_W / (x1 - x0), MAP_H / (y1 - y0), 3);
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, s };
}

// the milestones sit on each route (0 to 1 of the route length): the round-13 copy, the same for each story
export const MILESTONES = [
  { t: 0, label: "Origin plots mapped", detail: "Each farm plot is recorded with its geolocation." },
  { t: 0.07, label: "Supplier proof received", detail: "The supplier sends the plot data and its proof." },
  { t: 0.27, label: "Plots checked against forest data", detail: "Land cleared after 31 December 2020 fails the check." },
  { t: 0.5, label: "DDS filed to TRACES", detail: "The due diligence statement goes into the EU's TRACES system." },
  { t: 0.74, label: "Reference number sent", detail: "The TRACES reference number goes to the customs agent." },
  { t: 1, label: "Customs clears it on arrival", detail: "Customs decides on arrival. Bindu does not control this step." },
];

// the trail of small dots: the ship drops one every so often along the route (route fraction for dot i)
export const DOTS = 34;
export const dropAt = (i: number) => 0.02 + (0.96 * i) / (DOTS - 1);
const SUN = sunflower(DOTS, 13);

export type Cargo = "pod" | "steel" | "roll" | "flask" | "box";
export type Label = { text: string; at: Pt; off?: [number, number, "start" | "end"] };
export type Geo = {
  route: { pts: Pt[]; cum: number[]; length: number };
  frame: Frame;
  dest: Pt;
  sun: Pt[];          // the filing: the dots gather at the destination into a sunflower
  labels: { text: string; p: Pt; off?: [number, number, "start" | "end"] }[];
  cargo: Cargo;
};

function geoFor(pts: Pt[], cargo: Cargo, labels: Label[]): Geo {
  const p = pts.map(([lo, la]) => project(lo, la));
  const cum = [0];
  for (let i = 1; i < p.length; i++) cum.push(cum[i - 1]! + Math.hypot(p[i]![0] - p[i - 1]![0], p[i]![1] - p[i - 1]![1]));
  const dest = p[p.length - 1];
  return {
    route: { pts: p, cum, length: cum[cum.length - 1]! },
    frame: frameOf(pts),
    dest: dest!,
    sun: Array.from({ length: DOTS }, (_, i) => [dest![0] + SUN[i * 2]!, dest![1] + SUN[i * 2 + 1]!] as Pt),
    labels: labels.map((l) => ({ text: l.text, p: project(l.at[0], l.at[1]), off: l.off })),
    cargo,
  };
}

// one set of geometry per story (ids match content.ts journey.stories)
export const SHIP_GEO: Record<string, Geo> = {
  eudr: geoFor(ROUTE_EUDR, "pod", [
    { text: "Guayaquil", at: [-80.0, -2.2] },
    { text: "Panama Canal", at: [-79.9, 9.35] },
    { text: "Atlantic", at: [-38.0, 36.0] },
    { text: "English Channel", at: [-9.5, 45.6] },
    { text: "Antwerp", at: [4.35, 51.25], off: [-26, -18, "end"] },
  ]),
  cbam: geoFor(ROUTE_CBAM, "steel", [
    { text: "Mumbai", at: [72.8, 19.0] },
    { text: "Suez Canal", at: [32.5, 30.4] },
    { text: "Mediterranean", at: [17.0, 33.0] },
    { text: "Rotterdam", at: [4.05, 51.95], off: [-26, -18, "end"] },
  ]),
  dpp: geoFor(ROUTE_DPP, "roll", [
    { text: "Ningbo", at: [121.9, 29.9] },
    { text: "Singapore", at: [104.2, 1.2] },
    { text: "Suez Canal", at: [32.5, 30.4] },
    { text: "Hamburg", at: [9.95, 53.52], off: [-26, -18, "end"] },
  ]),
  reach: geoFor(ROUTE_REACH, "flask", [
    { text: "Houston", at: [-94.9, 29.4] },
    { text: "Atlantic", at: [-50.0, 42.0] },
    { text: "English Channel", at: [-9.5, 45.6] },
    { text: "Antwerp", at: [4.35, 51.25], off: [-26, -18, "end"] },
  ]),
  ppwr: geoFor(ROUTE_PPWR, "box", [
    { text: "Cai Mep", at: [107.0, 10.5] },
    { text: "Singapore", at: [104.2, 1.2] },
    { text: "Suez Canal", at: [32.5, 30.4] },
    { text: "Valencia", at: [-0.32, 39.45], off: [-26, -18, "end"] },
  ]),
};

// the inverse of project(): map units back to [lon, lat] (for the HUD readout)
export function unproject(x: number, y: number): Pt {
  return [x / (COS0 * K) + WEST, NORTH - y / K];
}

export type Route = Geo["route"];

// position and heading at distance d along the route
export function routeAt(route: Route, d: number) {
  const dd = Math.min(Math.max(d, 0), route.length);
  let i = 1;
  while (i < route.cum.length - 1 && route.cum[i]! < dd) i++;
  const [ax, ay] = route.pts[i - 1]!, [bx, by] = route.pts[i]!;
  const seg = route.cum[i]! - route.cum[i - 1]! || 1;
  const f = (dd - route.cum[i - 1]!) / seg;
  return { x: ax + (bx - ax) * f, y: ay + (by - ay) * f, angle: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI };
}

// SVG path of the route between distances d0 and d1
export function routeSlice(route: Route, d0: number, d1: number): string {
  if (d1 <= d0) return "";
  const a = routeAt(route, d0), b = routeAt(route, d1);
  let s = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}`;
  for (let i = 0; i < route.pts.length; i++) {
    if (route.cum[i]! > d0 && route.cum[i]! < d1) s += `L${route.pts[i]![0].toFixed(1)} ${route.pts[i]![1].toFixed(1)}`;
  }
  return s + `L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

// the SVG path of a whole route (the faint route line)
export const routeD = (route: Route) => route.pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
