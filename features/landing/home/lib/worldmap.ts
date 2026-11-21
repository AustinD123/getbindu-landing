/* World map for the intro and the hero background. Illustration only, not survey data.
   Land is a handful of coarse, hand-drawn lon/lat outlines (our own simplified shapes), rasterised once to a dot
   grid. Equirectangular, latitude 75 to -56 (Antarctica left out). Routes are light curves in screen space. */

export type LonLat = [number, number];
export type Frame = { x0: number; y0: number; w: number; h: number };

const SHAPES: LonLat[][] = [
  // North America (incl. Central America) and Greenland, Iceland, Ireland, Great Britain, Cuba
  [[-168, 66], [-160, 71], [-140, 70], [-125, 70], [-110, 68], [-95, 72], [-85, 69], [-80, 63], [-94, 59], [-90, 57], [-82, 53], [-78, 58], [-77, 62], [-70, 61], [-62, 58], [-56, 52], [-66, 45], [-70, 42], [-76, 38], [-76, 35], [-81, 31], [-80, 26], [-82, 27], [-84, 30], [-89, 30], [-95, 29], [-97, 26], [-98, 22], [-96, 18], [-91, 19], [-87, 21], [-88, 16], [-84, 15], [-83, 10], [-79, 9], [-77, 8], [-80, 7], [-84, 9], [-86, 12], [-92, 15], [-96, 16], [-105, 20], [-109, 25], [-114, 31], [-117, 32], [-121, 35], [-124, 40], [-124, 47], [-127, 51], [-131, 55], [-137, 59], [-146, 61], [-152, 59], [-158, 57], [-164, 55], [-158, 58], [-162, 61], [-165, 62], [-164, 64]],
  [[-73, 78], [-60, 82], [-30, 83], [-20, 80], [-20, 70], [-30, 68], [-40, 65], [-44, 60], [-50, 64], [-54, 68], [-58, 75], [-68, 77]],
  [[-24, 65], [-14, 66], [-14, 64], [-22, 63]],
  [[-10, 52], [-6, 52], [-6, 55], [-8, 55], [-10, 54]],
  [[-5, 50], [1, 51], [2, 53], [-1, 55], [-2, 57], [-4, 58], [-6, 57], [-5, 55], [-3, 54], [-5, 52]],
  [[-85, 22], [-80, 23], [-74, 20], [-78, 20]],
  // South America
  [[-80, 9], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-44, -2], [-35, -6], [-39, -14], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -46], [-68, -52], [-70, -55], [-74, -51], [-74, -44], [-73, -36], [-71, -24], [-70, -18], [-76, -14], [-81, -5], [-80, 0], [-78, 3], [-77, 8]],
  // Eurasia (incl. Arabia, India, South-East Asia, Japan is a separate shape below)
  [[-9, 37], [-9, 43], [-2, 44], [-1, 46], [-4, 48], [2, 51], [5, 53], [8, 54], [9, 57], [11, 54], [14, 54], [19, 55], [22, 58], [24, 60], [21, 63], [25, 65], [21, 66], [17, 62], [18, 59], [16, 56], [12, 56], [11, 59], [6, 58], [5, 62], [12, 66], [16, 69], [22, 70], [30, 70], [40, 68], [44, 68], [54, 69], [60, 70], [68, 72], [72, 73], [80, 73], [87, 75], [100, 78], [112, 74], [130, 72], [140, 72], [150, 71], [160, 70], [170, 70], [180, 68], [180, 65], [178, 62], [170, 60], [163, 58], [160, 53], [156, 51], [156, 57], [162, 61], [155, 59], [143, 59], [137, 54], [141, 52], [140, 47], [133, 43], [129, 41], [127, 38], [126, 35], [129, 35], [126, 34], [125, 39], [121, 40], [122, 37], [119, 35], [121, 30], [118, 24], [110, 21], [106, 18], [109, 12], [105, 9], [100, 13], [100, 8], [103, 1], [101, 3], [98, 8], [98, 16], [94, 18], [92, 22], [89, 22], [86, 20], [80, 15], [78, 8], [76, 10], [73, 17], [72, 21], [68, 23], [62, 25], [57, 25], [56, 27], [50, 30], [48, 29], [50, 25], [52, 24], [56, 26], [58, 23], [59, 22], [55, 17], [43, 13], [39, 20], [35, 28], [33, 30], [35, 32], [36, 36], [30, 36], [27, 37], [26, 40], [23, 40], [22, 37], [20, 40], [19, 42], [13, 45], [12, 44], [16, 41], [18, 40], [16, 38], [12, 42], [8, 44], [3, 43], [0, 39], [-1, 37], [-5, 36]],
  [[130, 31], [132, 34], [136, 34], [140, 35], [141, 40], [142, 44], [145, 44], [141, 45], [140, 41], [139, 38], [135, 36], [131, 34]],
  [[120, 18], [122, 18], [124, 12], [126, 7], [122, 7], [120, 14]],
  // Africa and Madagascar
  [[-17, 21], [-16, 28], [-10, 30], [-6, 36], [0, 36], [10, 37], [11, 33], [20, 31], [32, 31], [34, 28], [37, 22], [39, 17], [43, 12], [51, 12], [49, 6], [41, -2], [40, -10], [40, -15], [35, -22], [33, -26], [32, -29], [27, -34], [20, -35], [18, -32], [12, -18], [13, -12], [12, -5], [9, -1], [9, 4], [5, 6], [-2, 5], [-8, 4], [-13, 8], [-17, 14]],
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17], [43, -22]],
  // South-East Asia islands
  [[95, 5], [98, 4], [104, -2], [106, -6], [102, -4], [95, 2]],
  [[109, 2], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[105, -6], [114, -8], [114, -7], [106, -6]],
  [[131, -1], [141, -3], [150, -10], [141, -9], [137, -5]],
  // Australia and New Zealand
  [[114, -22], [114, -34], [118, -35], [124, -33], [131, -31], [137, -34], [141, -38], [147, -39], [150, -37], [153, -28], [153, -25], [146, -19], [142, -11], [141, -17], [137, -12], [131, -11], [126, -14], [122, -18], [116, -21]],
  [[172, -34], [178, -38], [175, -42], [170, -46], [167, -46], [172, -41]],
];

export const LAT_TOP = 75, LAT_BOTTOM = -56;
export const ASPECT = 360 / (LAT_TOP - LAT_BOTTOM);

/* where the shipments start (Ecuador, Ivory Coast, Brazil, Ethiopia, Vietnam, Indonesia) */
export const ORIGINS: LonLat[] = [[-79.9, -2.2], [-4.0, 5.3], [-46.3, -23.9], [40.5, 9.1], [106.7, 10.8], [109.3, 0]];
/* where they file: the EU ports */
export const PORTS: { name: string; at: LonLat }[] = [
  { name: "Antwerp", at: [4.4, 51.2] },
  { name: "Rotterdam", at: [4.1, 51.9] },
  { name: "Hamburg", at: [10.0, 53.5] },
  { name: "Le Havre", at: [0.1, 49.5] },
];

const BOXES = SHAPES.map((s) => {
  const xs = s.map((p) => p[0]), ys = s.map((p) => p[1]);
  return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
});

function inside(poly: LonLat[], lon: number, lat: number): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!, [xj, yj] = poly[j]!;
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

import { isPhone } from "./phone";
let dots: Float32Array | null = null;
let dotsPhone = false;
/* land cell centres (2.5 degree grid) as [lon, lat, lon, lat, ...]; built once */
export function landDots(): Float32Array {
  const ph = isPhone();   // r35: half the land dots on phones (a checkerboard of the 2.5 degree grid); the dots are drawn a little larger there
  if (dots && dotsPhone === ph) return dots;
  const out: number[] = [];
  for (let lat = 72.5; lat > LAT_BOTTOM; lat -= 2.5) {
    for (let lon = -177.5; lon < 180; lon += 2.5) {
      for (let k = 0; k < SHAPES.length; k++) {
        const [x0, x1, y0, y1] = BOXES[k]! as [number, number, number, number];
        if (lon < x0 || lon > x1 || lat < y0 || lat > y1) continue;
        if (ph && (Math.round((lon + 177.5) / 2.5) + Math.round((72.5 - lat) / 2.5)) % 2) break;
        if (inside(SHAPES[k]!, lon, lat)) { out.push(lon, lat); break; }
      }
    }
  }
  dots = Float32Array.from(out); dotsPhone = ph;
  return dots;
}

/* the map fills the screen (cover), centred on focusLon (Europe by default); never shows empty edges */
export function frame(W: number, H: number, focusLon = 10): Frame {
  const w = Math.max(W, H * ASPECT), h = w / ASPECT;
  const cx = W / 2 - ((focusLon + 180) / 360) * w;
  return { x0: Math.min(0, Math.max(W - w, cx)), y0: (H - h) / 2, w, h };
}

export function project(f: Frame, lon: number, lat: number): [number, number] {
  return [f.x0 + ((lon + 180) / 360) * f.w, f.y0 + ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * f.h];
}

/* a shipment route: quadratic curve lifted above the straight line; t runs 0 (origin) to 1 (port) */
export function routeFn(f: Frame, from: LonLat, to: LonLat): (t: number) => [number, number] {
  const [ax, ay] = project(f, from[0], from[1]), [bx, by] = project(f, to[0], to[1]);
  const cx = (ax + bx) / 2, cy = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * 0.3;
  return (t) => {
    const u = 1 - t;
    return [u * u * ax + 2 * u * t * cx + t * t * bx, u * u * ay + 2 * u * t * cy + t * t * by];
  };
}

/* a fading light trail behind a point on a route: from head - length up to head (0 to 1) */
export function paintTrail(ctx: CanvasRenderingContext2D, at: (t: number) => [number, number], head: number, length: number, color: string, width: number, steps = 8, alpha = 1) {
  const h = Math.min(1, head), start = Math.max(0, h - length);
  let [px, py] = at(start);
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round";
  for (let i = 1; i <= steps; i++) {
    const [x, y] = at(start + ((h - start) * i) / steps);
    ctx.globalAlpha = (i / steps) * alpha;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
    px = x; py = y;
  }
  ctx.globalAlpha = 1;
}

/* a route: a soft glow under a thin core, both on the same fading trail. alpha sets the intensity (varies per route) */
export function paintRoute(ctx: CanvasRenderingContext2D, at: (t: number) => [number, number], head: number, length: number, color: string, width: number, alpha: number) {
  paintTrail(ctx, at, head, length, color, width * 4, 8, alpha * 0.18);
  paintTrail(ctx, at, head, length, color, width, 8, alpha);
}

/* a route's whole curve, faint: the line is on the map before its shipment flies it */
export function paintRouteArc(ctx: CanvasRenderingContext2D, f: Frame, from: LonLat, to: LonLat, color: string, alpha: number) {
  const at = routeFn(f, from, to), steps = 48;
  ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const [x, y] = at(i / steps);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/* land as round dots, the bindu look: one dot per land cell (one path, one fill). MapLayer draws it once per size */
export function paintLandDots(ctx: CanvasRenderingContext2D, f: Frame, color: string, alpha: number) {
  const d = landDots(), r = Math.max(0.8, (f.w / 360) * 2.5 * 0.14) * (isPhone() ? 1.3 : 1);
  ctx.fillStyle = color; ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (let i = 0; i < d.length; i += 2) {
    const [x, y] = project(f, d[i]!, d[i + 1]!);
    ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.globalAlpha = 1;
}

/* the same round dots as paintLandDots, swept: sweep(xNorm) gives 0 to 1 for each dot and the dot is drawn at
   sweep * maxAlpha. Dots are bucketed by alpha (10 steps) so a frame is ten fills, not one per dot. Used by the intro,
   so its land matches the hero map's dots at the hand-off. */
export function paintLandDotsSweep(ctx: CanvasRenderingContext2D, f: Frame, color: string, maxAlpha: number, sweep: (xNorm: number) => number) {
  const d = landDots(), r = Math.max(0.8, (f.w / 360) * 2.5 * 0.14) * (isPhone() ? 1.3 : 1), steps = 10;
  const paths = Array.from({ length: steps }, () => new Path2D());
  for (let i = 0; i < d.length; i += 2) {
    const a = sweep((d[i]! + 180) / 360);
    if (a <= 0) continue;
    const k = Math.min(steps - 1, Math.floor(clamp01(a) * steps));
    const [x, y] = project(f, d[i]!, d[i + 1]!);
    paths[k]!.moveTo(x + r, y); paths[k]!.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fillStyle = color;
  for (let k = 0; k < steps; k++) {
    ctx.globalAlpha = maxAlpha * (k + 0.5) / steps;
    ctx.fill(paths[k]!);
  }
  ctx.globalAlpha = 1;
}
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* a HUD graticule: thin lines every 20 degrees, faint, drawn behind the dots */
export function paintGraticule(ctx: CanvasRenderingContext2D, f: Frame, color: string, alpha: number) {
  ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let lon = -180; lon <= 180; lon += 20) {
    const [x, y0] = project(f, lon, LAT_TOP), [, y1] = project(f, lon, LAT_BOTTOM);
    ctx.moveTo(Math.round(x) + 0.5, y0); ctx.lineTo(Math.round(x) + 0.5, y1);
  }
  for (let lat = -40; lat <= 60; lat += 20) {
    const [x0, y] = project(f, -180, lat), [x1] = project(f, 180, lat);
    ctx.moveTo(x0, Math.round(y) + 0.5); ctx.lineTo(x1, Math.round(y) + 0.5);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/* a faint vertical scan band; xNorm runs 0 (west edge) to 1 (east edge). The gradient fades to transparent at both ends */
export function paintSweep(ctx: CanvasRenderingContext2D, W: number, H: number, xNorm: number, color: string) {
  const half = W * 0.06, x = xNorm * W;
  const g = ctx.createLinearGradient(x - half, 0, x + half, 0);
  g.addColorStop(0, "transparent"); g.addColorStop(0.5, color); g.addColorStop(1, "transparent");
  ctx.fillStyle = g; ctx.globalAlpha = 0.06;
  ctx.fillRect(x - half, 0, half * 2, H);
  ctx.globalAlpha = 1;
}
