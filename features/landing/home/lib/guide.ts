/* The ink guide, geometry only (round 18). Everything here is our own procedural code: a seeded random, a small container ship
   drawn as slightly imperfect ink lines, and a hand-wobbled sea lane. No library. */

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type P = [number, number];
const f = (n: number) => n.toFixed(1);

/* an open Catmull-Rom curve through the points, as cubic Beziers */
export function smoothPath(pts: P[]): string {
  if (pts.length < 2) return "";
  let d = `M${f(pts[0]![0])} ${f(pts[0]![1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += `C${f(p1![0] + (p2![0] - p0![0]) / 6)} ${f(p1![1] + (p2![1] - p0![1]) / 6)} ${f(p2![0] - (p3![0] - p1![0]) / 6)} ${f(p2![1] - (p3![1] - p1![1]) / 6)} ${f(p2![0])} ${f(p2![1])}`;
  }
  return d;
}

/* a closed outline drawn by hand: every corner is off by a fraction of a pixel and the pen overshoots where it closes */
export function inkPoly(pts: P[], r: () => number, j = 0.4): string {
  const q = pts.map(([x, y]) => [x + (r() - 0.5) * 2 * j, y + (r() - 0.5) * 2 * j] as P);
  let d = `M${f(q[0]![0])} ${f(q[0]![1])}`;
  for (let i = 1; i < q.length; i++) d += `L${f(q[i]![0])} ${f(q[i]![1])}`;
  return d + `L${f(q[0]![0] + (r() - 0.25) * 1.1)} ${f(q[0]![1] + (r() - 0.25) * 1.1)}`;
}
export const inkBox = (x: number, y: number, w: number, h: number, r: () => number, j = 0.4) =>
  inkPoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], r, j);

/* r22-2: the container ship, drawn with more care. Side view, 56 units long (about 56px on the page, 28px on the chart), origin on the waterline at
   its middle, bow to the right. A proper hull (raked bow, flat stern) with a boot-topping line, the bridge and funnel aft with windows, containers
   in neat rows (2 tiers, 5 bays, outlined in cobalt) with exactly one yellow, a short white-water wake and a waterline it sits on. Clean 1.25px
   strokes, no wobble on the ship itself. */
export type ShipDraw = { hull: string; boot: string; wake: string; water: string; house: string; windows: string; funnel: string; boxes: string[]; yellow: string };
const poly = (pts: P[]) => "M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z";
const rect = (x: number, y: number, w: number, h: number) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
export function shipDraw(): ShipDraw {
  const hull = poly([[-28, -6], [26, -6], [31, -9.5], [22.5, 2], [-26, 2]]);
  const boot = "M-26.6 -1.6H24.2";
  const wake = "M-30 3.2h-9M-29 5.6h-6M-31 0.8h-4";
  const water = "M-26 2.6H30";
  const house = rect(-26, -21, 11, 15);
  const windows = "M-24.2 -17.6h2M-20.6 -17.6h2M-17.4 -17.6h1.6M-24.2 -13.8h8";
  const funnel = rect(-22.5, -26, 4, 5);
  const boxes: string[] = [];
  const bw = 7.4, x0 = -12.5;
  let yellow = "";
  for (let t = 0; t < 2; t++) for (let b = 0; b < 5; b++) {
    const d = rect(x0 + b * bw + 0.3, -6 - (t + 1) * 8 + 0.3, bw - 0.6, 7.4);
    if (t === 1 && b === 3) yellow = d; else boxes.push(d);
  }
  return { hull, boot, wake, water, house, windows, funnel, boxes, yellow };
}
