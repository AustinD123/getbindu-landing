/* Bindu = dot. Dot n of a sunflower sits at angle n x golden angle, radius c*sqrt(n). */
export const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export function sunflower(n: number, radius = 1): Float32Array {
  const out = new Float32Array(n * 2), c = radius / Math.sqrt(n);
  for (let i = 0; i < n; i++) {
    const r = c * Math.sqrt(i + 0.5), th = (i + 1) * GOLDEN;
    out[i * 2] = r * Math.cos(th);
    out[i * 2 + 1] = r * Math.sin(th);
  }
  return out;
}

/* evenly spread points on a unit sphere (Fibonacci sphere): the globe */
export function fibSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * GOLDEN;
    out[i * 3] = Math.cos(th) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(th) * r;
  }
  return out;
}

/* lat/lon (degrees) to a unit-sphere point; the globe is turned so Europe faces the viewer */
export function latLon(lat: number, lon: number): [number, number, number] {
  const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

/* SVG helper: circles for a static sunflower (fallback art, spiral progress) */
export function sunflowerCircles(n: number, size: number, pad = 2): { x: number; y: number; r: number }[] {
  const R = size / 2 - pad, pts = sunflower(n, R), dotR = Math.max(0.8, (R / Math.sqrt(n)) * 0.42);
  const res: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < n; i++) res.push({ x: size / 2 + pts[i * 2]!, y: size / 2 + pts[i * 2 + 1]!, r: dotR * (0.75 + 0.5 * Math.sqrt((i + 1) / n)) });
  return res;
}
