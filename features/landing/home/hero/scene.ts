import { tRaf, tCaf } from "../lib/loop";
/* Hero scene (three.js; the mockup used OGL, same shaders, same look). "Every proof is a dot; together they make the filing."
   A cobalt globe of dots; six shipment routes arc into Antwerp as dotted light trails. Each landing fires a
   yellow pulse (a filing completes) and a sixth of the globe's dots flow into a yellow golden-angle sunflower.
   After the sixth filing the sunflower is complete and the scene stops (no endless loop).
   Paused off-screen, in hidden tabs and by the user. Never started under reduced motion. */
import { BufferAttribute, BufferGeometry, CustomBlending, OneFactor, OrthographicCamera, Points, RawShaderMaterial, Scene, WebGLRenderer } from "three";
import { fibSphere, latLon, sunflower } from "../lib/phyllotaxis";
import { isPhone } from "../lib/phone";

export type SceneOpts = { final?: boolean; onState?: (s: "playing" | "paused" | "done") => void; colors: { cobalt: string; yellow: string } };
export type SceneApi = { play: () => void; pause: () => void; replay: () => void; destroy: () => void; isDone: () => boolean;
  recolour: (colors: { cobalt: string; yellow: string }) => void };

const EU: [number, number] = [51.2, 4.4];                          // Antwerp
const ORIGINS: [number, number][] = [[-1.8, -78.2], [6.8, -5.5], [-10, -52], [9.1, 40.5], [14, 108], [-0.8, 113.9]];
const START = 0.6, GAP = 1.5, DUR = 1.6, SETTLE = 1.4;              // seconds
const LAND = (i: number) => START + i * GAP + DUR;
const END = LAND(ORIGINS.length - 1) + SETTLE + 0.4;

function hexToVec(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", ""); const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const ROT = /* glsl */ `
  uniform float uRot; uniform float uTilt;
  vec3 turn(vec3 g) {
    float cy = cos(uRot), sy = sin(uRot);
    g = vec3(cy * g.x + sy * g.z, g.y, -sy * g.x + cy * g.z);
    float ct = cos(uTilt), st = sin(uTilt);
    return vec3(g.x, ct * g.y - st * g.z, st * g.y + ct * g.z);
  }
  uniform vec2 uCenter; uniform float uScale; uniform float uAspect; uniform float uDpr;
  vec4 place(vec3 p) { vec2 xy = p.xy * uScale * (1.0 + p.z * 0.1); return vec4(xy.x / uAspect + uCenter.x, xy.y + uCenter.y, 0.0, 1.0); }
`;

const DOTS_VS = /* glsl */ `
  attribute vec3 globe; attribute vec2 flower; attribute float order; attribute float seed;
  uniform float uMorph; uniform float uFlowerRot; uniform float uSize;
  varying float vA; varying float vMix;
  ${ROT}
  void main() {
    vec3 g = turn(globe);
    float t = smoothstep(order, order + 0.16, uMorph);
    float e = t * t * (3.0 - 2.0 * t);
    float cf = cos(uFlowerRot), sf = sin(uFlowerRot);
    vec3 f = vec3(cf * flower.x - sf * flower.y, sf * flower.x + cf * flower.y, 0.0);
    vec3 p = mix(g, f, e);
    p.xy += (seed - 0.5) * 0.35 * sin(e * 3.14159) * vec2(cos(seed * 40.0), sin(seed * 40.0));
    gl_Position = place(p);
    float front = smoothstep(-0.7, 1.0, g.z);
    gl_PointSize = mix(1.8 + 1.9 * front, 1.8 + 3.2 * length(flower), e) * uDpr * uSize;
    vA = mix(0.22 + 0.78 * front, 0.95, e);
    vMix = e;
  }`;
const DOTS_FS = /* glsl */ `
  precision mediump float;
  uniform vec3 uCobalt; uniform vec3 uYellow; uniform float uGlobeDim;
  varying float vA; varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vA * mix(uGlobeDim, 1.0, vMix);
    vec3 c = mix(uCobalt, uYellow, vMix);
    gl_FragColor = vec4(c * a, a);
  }`;

const ROUTE_VS = /* glsl */ `
  attribute vec3 position; attribute float u;
  uniform float uHead; uniform float uDone; uniform float uFade;
  varying float vA; varying float vHot;
  ${ROT}
  void main() {
    vec3 p = turn(position);
    gl_Position = place(p);
    float k = uHead - u;
    float trail = (k >= 0.0 && k < 0.38) ? (1.0 - k / 0.38) : 0.0;
    float front = smoothstep(-0.25, 0.4, p.z);
    vA = max(trail * 1.4, uDone * 0.32 * step(u, uHead)) * front * uFade;
    vHot = (k >= 0.0 && k < 0.04) ? 1.0 : 0.0;
    gl_PointSize = (2.0 + 3.0 * trail) * uDpr;
  }`;
const ROUTE_FS = /* glsl */ `
  precision mediump float;
  uniform vec3 uCobalt; varying float vA; varying float vHot;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d) * vA;
    vec3 c = mix(uCobalt, vec3(1.0), vHot * 0.8);
    gl_FragColor = vec4(c * a, a);
  }`;

const PULSE_VS = /* glsl */ `
  attribute vec3 position; uniform float uPulse; varying float vA;
  ${ROT}
  void main() {
    vec3 p = turn(position);
    gl_Position = place(p);
    gl_PointSize = (8.0 + 90.0 * uPulse) * uDpr;
    vA = (uPulse > 0.0 && uPulse < 1.0) ? pow(1.0 - uPulse, 2.0) * smoothstep(-0.3, 0.3, p.z) : 0.0;
  }`;
const PULSE_FS = /* glsl */ `
  precision mediump float;
  uniform vec3 uYellow; varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float ring = smoothstep(0.5, 0.42, d) * smoothstep(0.30, 0.42, d);
    float core = smoothstep(0.12, 0.0, d);
    float a = (ring * 0.9 + core) * vA;
    gl_FragColor = vec4(uYellow * a, a);
  }`;

function arc(a: [number, number, number], b: [number, number, number], n: number) {
  const pos = new Float32Array(n * 3), u = new Float32Array(n);
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(dot), so = Math.sin(om) || 1;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), w1 = Math.sin((1 - t) * om) / so, w2 = Math.sin(t * om) / so, lift = 1 + 0.22 * Math.sin(Math.PI * t) * Math.min(1, om);
    pos[i * 3] = (a[0] * w1 + b[0] * w2) * lift; pos[i * 3 + 1] = (a[1] * w1 + b[1] * w2) * lift; pos[i * 3 + 2] = (a[2] * w1 + b[2] * w2) * lift;
    u[i] = t;
  }
  return { pos, u };
}

export function createScene(canvas: HTMLCanvasElement, opts: SceneOpts): SceneApi {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const N = isPhone() ? 1000 : small ? 1500 : 3200;   // r35: fewer particles and DPR 1 on phones
  const dpr = isPhone() ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  const box = () => { const el = canvas.parentElement || canvas; return [el.clientWidth || 1, el.clientHeight || 1]; };
  const [W0, H0] = box();
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(dpr);
  renderer.setSize(W0!, H0!);
  renderer.setClearColor(0x000000, 0);
  const gl = renderer.getContext();
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);   // unused: the shaders place every point themselves
  const cobalt = hexToVec(opts.colors.cobalt), yellow = hexToVec(opts.colors.yellow);

  // shared uniforms
  const U = {
    uRot: { value: 0 }, uTilt: { value: 0.42 }, uCenter: { value: [0.38, 0] }, uScale: { value: 0.62 }, uAspect: { value: 1 }, uDpr: { value: dpr },
    uCobalt: { value: cobalt }, uYellow: { value: yellow },
  };
  const disposables: { dispose(): void }[] = [];
  const material = (vertexShader: string, fragmentShader: string, uniforms: Record<string, { value: unknown }>) => {
    const m = new RawShaderMaterial({
      vertexShader, fragmentShader, uniforms, transparent: true, depthTest: false, depthWrite: false,
      blending: CustomBlending, blendSrc: OneFactor, blendDst: OneFactor, blendSrcAlpha: OneFactor, blendDstAlpha: OneFactor,
    });
    disposables.push(m);
    return m;
  };
  const points = (geometry: BufferGeometry, m: RawShaderMaterial) => {
    const pts = new Points(geometry, m);
    pts.frustumCulled = false;
    disposables.push(geometry);
    scene.add(pts);
  };
  const attr = (g: BufferGeometry, name: string, data: Float32Array, size: number) => g.setAttribute(name, new BufferAttribute(data, size));

  // dots: globe slots shuffled so dots leave from all over the globe; flower slots fill from the centre out
  const globe = fibSphere(N), flower = sunflower(N, 1.0), order = new Float32Array(N), seed = new Float32Array(N);
  const perm = Array.from({ length: N }, (_, i) => i);
  let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j]!, perm[i]!]; }
  const globeShuf = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const k = perm[i]; globeShuf.set(globe.subarray(k! * 3, k! * 3 + 3), i * 3); order[i] = (i / N) * 0.84; seed[i] = rnd(); }
  const dotsProg = material(DOTS_VS, DOTS_FS, { ...U, uMorph: { value: 0 }, uFlowerRot: { value: 0 }, uSize: { value: 1 }, uGlobeDim: { value: 1 } });
  const dotsGeo = new BufferGeometry();
  attr(dotsGeo, "position", globeShuf, 3);   // three counts the points from `position`; the shader reads `globe`
  attr(dotsGeo, "globe", globeShuf, 3); attr(dotsGeo, "flower", flower, 2); attr(dotsGeo, "order", order, 1); attr(dotsGeo, "seed", seed, 1);
  points(dotsGeo, dotsProg);

  // routes
  const eu = latLon(EU[0], EU[1]);
  const routes = ORIGINS.map((o) => {
    const { pos, u } = arc(latLon(o[0], o[1]), eu, small ? 60 : 90);
    const prog = material(ROUTE_VS, ROUTE_FS, { ...U, uHead: { value: 0 }, uDone: { value: 0 }, uFade: { value: 1 } });
    const g = new BufferGeometry(); attr(g, "position", pos, 3); attr(g, "u", u, 1);
    points(g, prog);
    return prog;
  });
  const pulseProg = material(PULSE_VS, PULSE_FS, { ...U, uPulse: { value: -1 } });
  const pulseGeo = new BufferGeometry(); attr(pulseGeo, "position", new Float32Array(eu), 3);
  points(pulseGeo, pulseProg);

  // layout: desktop = right half, phones = below the words
  let W = 1, H = 1;
  const layout = () => {
    [W, H] = box() as [number, number];
    renderer.setSize(W, H);
    U.uAspect.value = W / H;
    const narrow = W < 860;
    if (opts.final) { U.uCenter.value = narrow ? [0, -0.36] : [0.42, 0]; U.uScale.value = narrow ? 0.42 : 0.66; }
    else { U.uCenter.value = narrow ? [0.1, -0.45] : [0.5, -0.02]; U.uScale.value = narrow ? 0.5 : 0.58; }
    if (narrow) U.uScale.value = Math.min(U.uScale.value, (0.9 * W) / H);   // never wider than the screen
  };
  layout();

  // pointer lean (gentle)
  let px = 0, tx = 0;
  const onMove = (e: PointerEvent) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; };
  window.addEventListener("pointermove", onMove, { passive: true });

  // clock: advances only while playing
  const speed = opts.final ? 3 : 1;
  let T = 0, last = 0, raf = 0, playing = false, visible = true, done = false;
  const frame = (t: number) => {
    px += (tx - px) * 0.04;
    U.uRot.value = 0.28 * Math.sin(t * 0.16) - 0.06 + px * 0.12;
    let morph = 0, pulse = -1;
    routes.forEach((r, i) => {
      const st = START + i * GAP;
      const head = clamp01((t - st) / DUR) + Math.max(0, (t - LAND(i)) / DUR) * 0.4;
      r.uniforms.uHead!.value = Math.min(head, 1.4);
      r.uniforms.uDone!.value = t >= LAND(i) ? 1 : 0;
      const since = t - LAND(i);
      if (since >= 0 && since < 1.1) pulse = since / 1.1;
      morph += easeIO(clamp01(since / SETTLE));
    });
    morph /= routes.length;
    const fade = 1 - clamp01((morph - 0.65) / 0.35);
    routes.forEach((r) => (r.uniforms.uFade!.value = fade));
    dotsProg.uniforms.uMorph!.value = morph;
    dotsProg.uniforms.uGlobeDim!.value = 1 - 0.55 * morph;
    dotsProg.uniforms.uFlowerRot!.value = t * 0.035;
    pulseProg.uniforms.uPulse!.value = pulse;
    renderer.render(scene, camera);
  };
  const tick = (now: number) => {
    raf = 0;
    if (last) T += (Math.min(64, now - last) / 1000) * speed;
    last = now;
    if (T >= END) { T = END; frame(T); done = true; playing = false; last = 0; opts.onState?.("done"); return; }
    frame(T);
    if (playing && visible && !document.hidden) raf = tRaf(tick); else last = 0;
  };
  const kick = () => { if (!raf && playing && visible && !document.hidden) raf = tRaf(tick); };

  const io = new IntersectionObserver((es) => { visible = es[0]!.isIntersecting; kick(); }, { threshold: 0.05 });
  io.observe(canvas);
  const onVis = () => kick();
  document.addEventListener("visibilitychange", onVis);
  const onResize = () => { layout(); frame(T); };
  window.addEventListener("resize", onResize);

  frame(0);
  const api: SceneApi = {
    play: () => { if (done) return api.replay(); playing = true; opts.onState?.("playing"); kick(); },
    pause: () => { playing = false; if (raf) tCaf(raf); raf = 0; last = 0; opts.onState?.("paused"); },
    replay: () => { T = 0; done = false; playing = true; opts.onState?.("playing"); kick(); },
    destroy: () => {
      tCaf(raf); io.disconnect(); document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => d.dispose()); renderer.dispose(); renderer.forceContextLoss(); void gl;
    },
    isDone: () => done,
    // a theme change: the shared colour uniforms are read by every program, so one write recolours the scene
    recolour: (c) => { U.uCobalt.value = hexToVec(c.cobalt); U.uYellow.value = hexToVec(c.yellow); },
  };
  return api;
}
