import { getRoot } from "./root";
/* Round 25 item 1: the ship and the colours for the canvas drawings (the guide and the journey map). The ship is drawn from cached Path2D objects built once
   from shipDraw() (the r22 art, 56 units long, origin on the waterline). Strokes stay 1.25px at any size (lineWidth is divided by the scale). */
import { shipDraw } from "./guide";

/* a CSS colour as [r, g, b] in 0..1 */
/* a CSS colour as [r, g, b] in 0..1 */
export function toRgb(css: string): [number, number, number] {
  const c = document.createElement("canvas").getContext("2d");
  if (!c) return [1, 1, 1];
  c.fillStyle = "#000"; c.fillStyle = css;
  const h = String(c.fillStyle);
  if (h[0] === "#") return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
  const m = h.match(/[\d.]+/g) || ["255", "255", "255"];
  return [+m[0] / 255, +m[1]! / 255, +m[2]! / 255];
}

export type Cols = { ink: string; route: string; rr: number; rg: number; rb: number; yellow: string; yOut: string; fill: string; outline: string; canvas: string; cobalt: string; onDark: string };

export function readCols(): Cols {
  const cs = getComputedStyle(getRoot()), g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
  const route = g("--route-line", "#3D7BFF"), [r, gg, b] = toRgb(route);
  return {
    ink: g("--line-ink", "#EDE8DA"), route, rr: Math.round(r * 255), rg: Math.round(gg * 255), rb: Math.round(b * 255),
    yellow: g("--proof-dot", "#FFD400"), yOut: g("--yellow-outline", "#FFD400"), fill: g("--ship-fill", "#FFD400"), outline: g("--ship-outline", "transparent"),
    canvas: g("--canvas", "#000"), cobalt: g("--cobalt-signal", "#3D7BFF"), onDark: g("--on-dark", "#fff"),
  };
}

type SP = { water: Path2D; wake: Path2D; hull: Path2D; boot: Path2D; house: Path2D; windows: Path2D; funnel: Path2D; boxes: Path2D[]; yellow: Path2D };
let sp: SP | null = null;
const paths = (): SP => {
  if (sp) return sp;
  const d = shipDraw();
  sp = { water: new Path2D(d.water), wake: new Path2D(d.wake), hull: new Path2D(d.hull), boot: new Path2D(d.boot), house: new Path2D(d.house), windows: new Path2D(d.windows), funnel: new Path2D(d.funnel), boxes: d.boxes.map((b) => new Path2D(b)), yellow: new Path2D(d.yellow) };
  return sp;
};

/* r29-3: the ship made of dots. The same 34 slots on the ship (12 along the hull outline, 12 along the bridge, 10 container centres, in this order) are where the dots of
   the hand-offs land (building) or leave (breaking up). A Build says how much of each part exists: 0 to 1 for the hull and the bridge outlines (drawn in along their
   length), per container, and for the water line and wake. Every dot that lands adds to the parts it belongs to, so the ship draws itself in segment by segment. */
export const NB = 34;
export type Build = { hull: number; house: number; boxes: number[]; rest: number };
const HULL: [number, number][] = [[-28, -6], [26, -6], [31, -9.5], [22.5, 2], [-26, 2]];
const HOUSE: [number, number][] = [[-26, -21], [-15, -21], [-15, -6], [-26, -6]];
const perim = (pts: [number, number][]) => pts.reduce((a, q, i) => a + Math.hypot(pts[(i + 1) % pts.length]![0] - q[0], pts[(i + 1) % pts.length]![1] - q[1]), 0);
const HULL_L = perim(HULL), HOUSE_L = perim(HOUSE);
const along = (pts: [number, number][], n: number): [number, number][] => {
  const L = perim(pts), out: [number, number][] = [];
  for (let k = 0; k < n; k++) {
    let d = (k / n) * L, i = 0;
    for (;; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], l = Math.hypot(b![0] - a![0], b![1] - a![1]); if (d <= l || i === pts.length - 1) { const w = l ? d / l : 0; out.push([a![0] + (b![0] - a![0]) * w, a![1] + (b![1] - a![1]) * w]); break; } d -= l; }
  }
  return out;
};
/* slot positions in art units; the last box is the yellow one */
export const SLOTS: { x: number; y: number; yel: boolean }[] = (() => {
  const out: { x: number; y: number; yel: boolean }[] = [];
  for (const [x, y] of along(HULL, 12)) out.push({ x, y, yel: false });
  for (const [x, y] of along(HOUSE, 12)) out.push({ x, y, yel: false });
  const bw = 7.4, x0 = -12.5;
  for (let t = 0; t < 2; t++) for (let b = 0; b < 5; b++) if (!(t === 1 && b === 3)) out.push({ x: x0 + b * bw + 3.7, y: -6 - (t + 1) * 8 + 3.7, yel: false });
  out.push({ x: x0 + 3 * bw + 3.7, y: -6 - 2 * 8 + 3.7, yel: true });
  return out;
})();
/* land: 0 to 1 per slot (1 = this slot's dot is part of the ship) */
export function buildFrom(land: ArrayLike<number>): Build {
  let h = 0, o = 0, a = 0;
  for (let i = 0; i < 12; i++) h += land[i]!;
  for (let i = 12; i < 24; i++) o += land[i]!;
  for (let i = 0; i < NB; i++) a += land[i]!;
  return { hull: h / 12, house: o / 12, boxes: Array.from({ length: 10 }, (_, i) => land[24 + i]!), rest: a / NB };
}

/* sc: pixels per art unit; flip mirrors it; rock is a rotation in degrees about the bottom middle of the hull; bd: how much of the ship exists (omitted: all of it) */
export function drawShip(ctx: CanvasRenderingContext2D, c: Cols, x: number, y: number, rot: number, sc: number, flip: number, alpha: number, rock = 0, bd?: Build) {
  if (alpha <= 0.002 || sc <= 0) return;
  const p = paths();
  if (bd) {
    const sm = (v: number) => { const t = v < 0 ? 0 : v > 1 ? 1 : v; return t * t * (3 - 2 * t); };
    const any = bd.hull > 0.002 || bd.house > 0.002 || bd.rest > 0.002 || bd.boxes.some((v) => v > 0.002);
    if (!any) return;
    ctx.save();
    ctx.translate(x, y); ctx.rotate((rot * Math.PI) / 180); ctx.scale(sc * flip, sc);
    if (rock) { ctx.translate(0, 6); ctx.rotate((rock * Math.PI) / 180); ctx.translate(0, -6); }
    ctx.lineWidth = 1.25 / sc; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = c.ink;
    const rest = sm((bd.rest - 0.4) / 0.6);
    ctx.globalAlpha = alpha * 0.55 * rest; if (rest > 0.002) { ctx.stroke(p.water); ctx.stroke(p.wake); }
    ctx.globalAlpha = alpha;
    if (bd.hull > 0.002) { ctx.setLineDash([HULL_L * Math.min(1, bd.hull), HULL_L * 2]); ctx.stroke(p.hull); ctx.setLineDash([]); }
    ctx.globalAlpha = alpha * 0.7 * sm((bd.hull - 0.3) / 0.7); if (bd.hull > 0.3) ctx.stroke(p.boot);
    ctx.globalAlpha = alpha;
    if (bd.house > 0.002) { ctx.setLineDash([HOUSE_L * Math.min(1, bd.house), HOUSE_L * 2]); ctx.stroke(p.house); ctx.setLineDash([]); }
    const hw = sm((bd.house - 0.5) / 0.5); ctx.globalAlpha = alpha * hw; if (hw > 0.002) { ctx.stroke(p.windows); ctx.stroke(p.funnel); }
    ctx.strokeStyle = c.route;
    p.boxes.forEach((b, i) => { const v = bd.boxes[i]; if (v! > 0.002) { ctx.globalAlpha = alpha * v!; ctx.stroke(b); } });
    const yv = bd.boxes[9];
    if (yv! > 0.002) { ctx.globalAlpha = alpha * yv!; ctx.fillStyle = c.yellow; ctx.fill(p.yellow); ctx.strokeStyle = c.ink; ctx.stroke(p.yellow); }
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.translate(x, y); ctx.rotate((rot * Math.PI) / 180); ctx.scale(sc * flip, sc);
  if (rock) { ctx.translate(0, 6); ctx.rotate((rock * Math.PI) / 180); ctx.translate(0, -6); }
  ctx.lineWidth = 1.25 / sc; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.strokeStyle = c.ink;
  ctx.globalAlpha = alpha * 0.55; ctx.stroke(p.water); ctx.stroke(p.wake);
  ctx.globalAlpha = alpha; ctx.stroke(p.hull);
  ctx.globalAlpha = alpha * 0.7; ctx.stroke(p.boot);
  ctx.globalAlpha = alpha; ctx.stroke(p.house); ctx.stroke(p.windows); ctx.stroke(p.funnel);
  ctx.strokeStyle = c.route; for (const b of p.boxes) ctx.stroke(b);
  ctx.fillStyle = c.yellow; ctx.fill(p.yellow); ctx.strokeStyle = c.ink; ctx.stroke(p.yellow);
  ctx.restore();
}
