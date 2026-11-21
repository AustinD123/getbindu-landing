import markSvg from "../assets/bindu-mark";
import { sunflower } from "./phyllotaxis";
import { ORIGINS, PORTS, frame, project } from "./worldmap";
import { isPhone } from "./phone";

/* Intro particle system (components/Intro.tsx). Thousands of bindus arrive from every side, swirl into the
   golden-angle sunflower, resolve into the mark, scatter to the map origins, and the shipments fly to EU ports.
   Every position is a pure function of time. The GPU path runs the same maths in a vertex shader (OGL, loaded
   with a dynamic import so it stays out of the main bundle); the canvas 2D path runs it on the CPU when WebGL
   is unavailable or before OGL has loaded. Kind: 0 = dust, 1 = shipment, 2 = the first dot. */

export const N = isPhone() ? 1600 : 3200;   // r35: half the intro particles on phones
export const SHIP_EVERY = 110;  // one dust grain in 110 is a shipment (about 30 of them: fewer, cleaner routes)

/* the timeline, in seconds from the start of the intro */
export const TM = {
  /* round 17, item 4: about three seconds. One dot, the rest arrive and swirl into the sunflower, the line "Every proof is a
     dot." shows, then every dot collapses into ONE dot at the centre (the "resolve" step now targets a point, not the mark).
     The ink guide's dot grows there and glides to its start in the hero. The scatter, flight and map steps are parked past
     the end (the world map is no longer part of the intro). */
  dot: 0, dotDur: 0.2,                                 // r19: the whole intro is about 1s: one dot blooms into the mark
  arrive: 0.05, arriveSpread: 0.2, arriveDur: 0.55,
  resolve: 0.62, resolveSpread: 0.08, resolveDur: 0.3,
  scatter: 99, scatterSpread: 0.35, scatterDur: 0.8,    // (parked)
  fly: 0.05, flySpread: 0.1, flyDur: 0.55,              // (parked)
  mapAt: 99, mapDur: 1.0,                               // (parked)
  swirl: 0.8, resolveSwirl: 0.3,
  yellowFlash: 0.4,                                     // a shipment files: a yellow flash at the port
};

export type Plan = {
  c: [number, number];                                  // centre, px
  start: Float32Array; sun: Float32Array; logo: Float32Array;
  goal: Float32Array; ctrl: Float32Array; port: Float32Array;
  meta: Float32Array;                                   // per particle: seed, kind (2 values each)
};

const fract = (x: number) => x - Math.floor(x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const sm = (a: number, b: number, x: number) => clamp01((x - a) / (b - a));
const eOut = (x: number) => 1 - Math.pow(1 - x, 3);
const eIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/* the mark's filled area as unit points (0 to 100), sorted by radius from the centre; sampled once */
let markCache: Float32Array | null = null;
function markUnits(): Float32Array {
  if (markCache) return markCache;
  const K = 2.4, S = Math.round(100 * K);
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return (markCache = new Float32Array(0));
  ctx.setTransform(K, 0, 0, K, 0, 0);
  ctx.fillStyle = "#000";
  for (const m of markSvg.matchAll(/transform="rotate\(([\d.]+) 50 50\)" d="([^"]+)"/g)) {
    ctx.save();
    ctx.translate(50, 50); ctx.rotate((+m[1]! * Math.PI) / 180); ctx.translate(-50, -50);
    ctx.fill(new Path2D(m[2]));
    ctx.restore();
  }
  for (const m of markSvg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)) {
    ctx.beginPath(); ctx.arc(+m[1]!, +m[2]!, +m[3]!, 0, Math.PI * 2); ctx.fill();
  }
  const { data } = ctx.getImageData(0, 0, S, S);
  const xy: number[] = [];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (data[(y * S + x) * 4 + 3]! > 127) xy.push(x / K, y / K);
  const n = xy.length / 2, rad = new Float32Array(n);
  for (let i = 0; i < n; i++) rad[i] = Math.hypot(xy[2 * i]! - 50, xy[2 * i + 1]! - 50);
  const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => rad[a]! - rad[b]!);
  markCache = new Float32Array(n * 2);
  order.forEach((j, k) => { markCache![2 * k] = xy[2 * j]!; markCache![2 * k + 1] = xy[2 * j + 1]!; });
  return markCache;
}

/* the particle set for a viewport: sunflower slots matched to the mark's samples, by radius, so the
   resolve moves mostly inward and outward instead of crossing */
export function buildPlan(W: number, H: number): Plan {
  const sU = Math.min(W, H) * 0.0036, cx = W / 2, cy = H / 2;   // the mark is 100 units = 36% of the short side
  const sun = sunflower(N, 50 * sU), mark = markUnits(), L = mark.length / 2;
  const f = frame(W, H), reach = Math.max(W, H) * 0.8;
  const plan: Plan = {
    c: [cx, cy],
    start: new Float32Array(N * 2), sun: new Float32Array(N * 2), logo: new Float32Array(N * 2),
    goal: new Float32Array(N * 2), ctrl: new Float32Array(N * 2), port: new Float32Array(N * 2),
    meta: new Float32Array(N * 2),
  };
  for (let i = 0; i < N; i++) {
    const seed = fract(i * 0.6180339887), sB = fract(seed * 37 + 0.31);
    const kind = i === 0 ? 2 : i % SHIP_EVERY === 0 ? 1 : 0;
    const ux = cx + sun[2 * i]!, uy = cy + sun[2 * i + 1]!;
    const k = Math.min(L - 1, Math.floor(((i + 0.5) * L) / N));
    void k; void mark; void sU;
    const lx = cx, ly = cy;   // round 17: the sunflower collapses to the centre point (was: the mark)
    const a = seed * Math.PI * 2, r = reach * (0.9 + 0.2 * sB);
    const o = ORIGINS[i % ORIGINS.length];
    const [gx, gy] = project(f, o![0] + (((i * 37) % 7) - 3) * 0.9, o![1] + (((i * 17) % 5) - 2) * 0.9);
    plan.start.set(kind === 2 ? [ux, uy] : [cx + Math.cos(a) * r, cy + Math.sin(a) * r], 2 * i);
    plan.sun.set([ux, uy], 2 * i);
    plan.logo.set([lx, ly], 2 * i);
    plan.goal.set([gx, gy], 2 * i);
    if (kind === 1) {
      // the same lifted curve as the map's shipment routes (worldmap.ts routeFn)
      const [px, py] = project(f, PORTS[(i * 3) % PORTS.length]!.at[0], PORTS[(i * 3) % PORTS.length]!.at[1]);
      const mx = (gx + px) / 2, my = (gy + py) / 2;
      plan.ctrl.set([mx, my - Math.hypot(px - gx, py - gy) * 0.3], 2 * i);
      plan.port.set([px, py], 2 * i);
    } else {
      plan.ctrl.set([gx, gy], 2 * i);
      plan.port.set([gx, gy], 2 * i);
    }
    plan.meta.set([seed, kind], 2 * i);
  }
  return plan;
}

export type Pt = { x: number; y: number; a: number; size: number; w: number };

/* the position, alpha, size and yellow weight of particle i at time t (mirrors the vertex shader) */
export function state(p: Plan, i: number, t: number, out: Pt): void {
  const seed = p.meta[2 * i], kind = p.meta[2 * i + 1];
  const dir = seed! < 0.5 ? 1 : -1;
  const sB = fract(seed! * 37 + 0.31), sC = fract(seed! * 13.7), sD = fract(seed! * 91.7 + 0.13);
  const a0 = kind! > 1.5 ? TM.dot : TM.arrive + TM.arriveSpread * seed!;
  const r0 = TM.resolve + TM.resolveSpread * sB;
  const c0 = TM.scatter + TM.scatterSpread * sD;
  const f0 = c0 + TM.scatterDur + TM.fly + TM.flySpread * sC;
  const fEnd = f0 + TM.flyDur;
  const ship = kind! > 0.5 && kind! < 1.5 ? 1 : 0;
  const [cx, cy] = p.c;
  const rot = (x: number, y: number, a: number): [number, number] => {
    const qx = x - cx, qy = y - cy, c = Math.cos(a), s = Math.sin(a);
    return [cx + c * qx - s * qy, cy + s * qx + c * qy];
  };
  const lerp = (a: number, b: number, w: number) => a + (b - a) * w;
  const i2 = 2 * i;

  // arrive: from the edge, swirling in, to the sunflower slot
  const eA = eOut(sm(a0, a0 + TM.arriveDur, t));
  let [x, y] = rot(lerp(p.start[i2]!, p.sun[i2]!, eA), lerp(p.start[i2 + 1]!, p.sun[i2 + 1]!, eA), (1 - eA) * TM.swirl * dir);
  // resolve: the sunflower morphs into the mark
  if (t >= r0) {
    const eB = eIO(sm(r0, r0 + TM.resolveDur, t));
    [x, y] = rot(lerp(p.sun[i2]!, p.logo[i2]!, eB), lerp(p.sun[i2 + 1]!, p.logo[i2 + 1]!, eB), Math.sin(Math.PI * eB) * TM.resolveSwirl * dir);
  }
  // scatter: out to the map origin
  const eC = eIO(sm(c0, c0 + TM.scatterDur, t));
  if (t >= c0) { x = lerp(p.logo[i2]!, p.goal[i2]!, eC); y = lerp(p.logo[i2 + 1]!, p.goal[i2 + 1]!, eC); }
  // shipment: origin to EU port along the lifted curve
  if (ship && t >= f0) {
    const e = eIO(sm(f0, fEnd, t)), u = 1 - e;
    x = u * u * p.goal[i2]! + 2 * u * e * p.ctrl[i2]! + e * e * p.port[i2]!;
    y = u * u * p.goal[i2 + 1]! + 2 * u * e * p.ctrl[i2 + 1]! + e * e * p.port[i2 + 1]!;
  }

  const vis = sm(a0, a0 + 0.25, t);
  const dim = (1 - ship) * eC * 0.65;
  const pop = eOut(sm(TM.dot, TM.dot + TM.dotDur, t));
  out.x = x; out.y = y;
  out.a = vis * (1 - dim) * (1 - ship * sm(fEnd, fEnd + 0.3, t));
  const inFlight = ship && t >= f0 && t < fEnd ? 1 : 0;   // in flight: yellow and a little larger (as the shader)
  out.size = kind! > 1.5 ? 2.6 * pop : (ship ? 2.6 : 1.6) + 1.4 * inFlight;
  const flash = ship * (t >= fEnd ? 1 - sm(fEnd, fEnd + TM.yellowFlash, t) : 0);
  out.w = clamp01(sm(TM.resolve, TM.resolve + 0.3, t) - sm(TM.scatter, TM.scatter + 0.3, t) + flash + inFlight);
}

/* when shipment i leaves its origin and lands at its port (the same timing the shader uses) */
export function flightOf(p: Plan, i: number): [number, number] {
  const seed = p.meta[2 * i], sC = fract(seed! * 13.7), sD = fract(seed! * 91.7 + 0.13);
  const f0 = TM.scatter + TM.scatterSpread * sD + TM.scatterDur + TM.fly + TM.flySpread * sC;
  return [f0, f0 + TM.flyDur];
}

/* a shipment's route point at s (0 origin, 1 port); the same curve the trails are drawn along */
export function routeAt(p: Plan, i: number, s: number): [number, number] {
  const u = 1 - s, i2 = 2 * i;
  return [
    u * u * p.goal[i2]! + 2 * u * s * p.ctrl[i2]! + s * s * p.port[i2]!,
    u * u * p.goal[i2 + 1]! + 2 * u * s * p.ctrl[i2 + 1]! + s * s * p.port[i2 + 1]!,
  ];
}

/* ---- GPU path (three.js; the mockup used OGL, same shaders) ---- */

const f4 = (v: number) => v.toFixed(4);
const CONST = `
const float DOT_AT = ${f4(TM.dot)}, DOT_DUR = ${f4(TM.dotDur)};
const float ARR_AT = ${f4(TM.arrive)}, ARR_SP = ${f4(TM.arriveSpread)}, ARR_DUR = ${f4(TM.arriveDur)};
const float RES_AT = ${f4(TM.resolve)}, RES_SP = ${f4(TM.resolveSpread)}, RES_DUR = ${f4(TM.resolveDur)};
const float SCA_AT = ${f4(TM.scatter)}, SCA_SP = ${f4(TM.scatterSpread)}, SCA_DUR = ${f4(TM.scatterDur)};
const float FLY_GAP = ${f4(TM.fly)}, FLY_SP = ${f4(TM.flySpread)}, FLY_DUR = ${f4(TM.flyDur)};
const float SWIRL = ${f4(TM.swirl)}, RSWIRL = ${f4(TM.resolveSwirl)};
const float FLASH = ${f4(TM.yellowFlash)};
`;

const VERT = `
attribute vec2 position, aSun, aLogo, aGoal, aCtrl, aPort, aMeta;
uniform float uT, uDpr;
uniform vec2 uRes, uC;
uniform vec3 uCobalt, uYellow;
varying vec4 vCol;
varying float vGlow;
${CONST}
float sm(float a, float b, float x) { return clamp((x - a) / (b - a), 0.0, 1.0); }
float eOut(float x) { return 1.0 - pow(1.0 - x, 3.0); }
float eIO(float x) { return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0; }
vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
void main() {
  float seed = aMeta.x, kind = aMeta.y;
  float dir = seed < 0.5 ? 1.0 : -1.0;
  float sB = fract(seed * 37.0 + 0.31), sC = fract(seed * 13.7), sD = fract(seed * 91.7 + 0.13);
  float a0 = kind > 1.5 ? DOT_AT : ARR_AT + ARR_SP * seed;
  float r0 = RES_AT + RES_SP * sB;
  float c0 = SCA_AT + SCA_SP * sD;
  float f0 = c0 + SCA_DUR + FLY_GAP + FLY_SP * sC;
  float fEnd = f0 + FLY_DUR;
  float ship = step(0.5, kind) * (1.0 - step(1.5, kind));

  float eA = eOut(sm(a0, a0 + ARR_DUR, uT));
  vec2 p = uC + rot(mix(position, aSun, eA) - uC, (1.0 - eA) * SWIRL * dir);
  if (uT >= r0) {
    float eB = eIO(sm(r0, r0 + RES_DUR, uT));
    p = uC + rot(mix(aSun, aLogo, eB) - uC, sin(3.14159 * eB) * RSWIRL * dir);
  }
  float eC = eIO(sm(c0, c0 + SCA_DUR, uT));
  if (uT >= c0) p = mix(aLogo, aGoal, eC);
  if (ship > 0.5 && uT >= f0) {
    float e = eIO(sm(f0, fEnd, uT)), u = 1.0 - e;
    p = u * u * aGoal + 2.0 * u * e * aCtrl + e * e * aPort;
  }

  float vis = sm(a0, a0 + 0.25, uT);
  float dim = (1.0 - ship) * eC * 0.65;
  float a = vis * (1.0 - dim) * (1.0 - ship * sm(fEnd, fEnd + 0.3, uT));
  float pop = eOut(sm(DOT_AT, DOT_AT + DOT_DUR, uT));
  float flash = ship * (uT >= fEnd ? 1.0 - sm(fEnd, fEnd + FLASH, uT) : 0.0);
  float inFlight = ship * step(f0, uT) * (1.0 - step(fEnd, uT));   // a shipment in flight is yellow and a little larger
  float size = kind > 1.5 ? 2.6 * pop : mix(1.6, 2.6, ship) + 1.4 * inFlight;
  float w = clamp(sm(RES_AT, RES_AT + 0.3, uT) - sm(SCA_AT, SCA_AT + 0.3, uT) + flash + inFlight, 0.0, 1.0);
  vCol = vec4(mix(uCobalt, uYellow, w), a);
  vGlow = inFlight + flash;   // the soft halo: shipments in flight and the filing flash
  gl_PointSize = size * uDpr;
  gl_Position = vec4(p.x / uRes.x * 2.0 - 1.0, 1.0 - p.y / uRes.y * 2.0, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec4 vCol;
varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = (smoothstep(0.5, 0.2, d) + vGlow * 0.4 * smoothstep(0.5, 0.0, d)) * vCol.a;
  gl_FragColor = vec4(vCol.rgb * a, a);
}
`;

export type GLRig = { resize(W: number, H: number, plan: Plan): void; draw(t: number): void; dispose(): void };

/* Returns null when WebGL is unavailable; the caller keeps the canvas 2D path. three is imported here, so it is
   fetched only when the intro runs. */
export async function createGL(canvas: HTMLCanvasElement, W: number, H: number, plan: Plan, dpr: number,
  cobalt: number[], yellow: number[]): Promise<GLRig | null> {
  // probe on a throwaway canvas first, so a browser without WebGL never downloads OGL
  const probe = document.createElement("canvas");
  const probeGl = probe.getContext("webgl2") || probe.getContext("webgl");
  if (!probeGl) return null;
  probeGl.getExtension("WEBGL_lose_context")?.loseContext();
  const { BufferAttribute, BufferGeometry, OrthographicCamera, Points, RawShaderMaterial, Scene, WebGLRenderer } = await import("three");
  let renderer: InstanceType<typeof WebGLRenderer>;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
  } catch {
    return null;
  }
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.sortObjects = false;   // draw order is the insertion order; sorting would also compute bounding spheres
  const scene = new Scene(), camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);   // unused: the shader places every point itself
  const build = (p: Plan) => {
    const g = new BufferGeometry();
    const data: Record<string, Float32Array> = { position: p.start, aSun: p.sun, aLogo: p.logo, aGoal: p.goal, aCtrl: p.ctrl, aPort: p.port, aMeta: p.meta };
    for (const k of Object.keys(data)) g.setAttribute(k, new BufferAttribute(data[k]!, 2));
    return g;
  };
  const program = new RawShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false, depthWrite: false,
    premultipliedAlpha: true,   // the shader writes premultiplied colour: blend ONE, ONE_MINUS_SRC_ALPHA, as the mockup did
    uniforms: {
      uT: { value: 0 }, uDpr: { value: dpr }, uRes: { value: [W, H] }, uC: { value: plan.c },
      uCobalt: { value: cobalt }, uYellow: { value: yellow },
    },
  });
  const mesh = new Points(build(plan), program);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return {
    resize(w, h, next) {
      renderer.setSize(w, h);
      program.uniforms.uRes!.value = [w, h];
      program.uniforms.uC!.value = next.c;
      mesh.geometry.dispose();
      mesh.geometry = build(next);
    },
    draw(t) {
      program.uniforms.uT!.value = t;
      renderer.render(scene, camera);
    },
    dispose() {
      mesh.geometry.dispose();
      program.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
