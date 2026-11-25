import { getRoot } from "../lib/root";
import { isPhone } from "../lib/phone";
import { tRaf, tCaf } from "../lib/loop";
import { track } from "../lib/pos";
import { shipHome, mapU } from "../lib/shiphome";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { journey } from "../content";
import { gsap, useReducedMotion } from "../lib/motion";
import { subscribeTheme } from "../lib/theme";
import { readCols, drawShip, buildFrom, SLOTS, NB, type Cols } from "../lib/shipcanvas";
import { toRgb } from "../lib/shipcanvas";
import {
  COAST_D, GRAT_D, DOTS, MAP_H, MAP_W, MILESTONES, SHIP_GEO, dropAt, routeAt,
  type Frame,
} from "../lib/shipmap";
import "../styles/shipment.css";

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const smooth = (t: number) => t * t * (3 - 2 * t);
const ZOOM = 1.6;          // camera zoom while following the ship, on top of the story's framing
const WAKE = 90;           // length of the bright wake behind the ship, in map units
const GATHER = 0.86;       // the trail dots start to gather into the sunflower at this point (the ship nears the port)
const CAM_EASE = 0.14;     // the camera moves a seventh of the way to its framing each frame (about half a second)

// the ship's place along the route: 0 at the origin, 1 at the port; scroll is mapped to this
const shipProgress = (p: number) => clamp((p - 0.04) / 0.92);
/* r30-1: the pin ends with TAIL (a share of the viewport height; the CSS adds the same 80vh to the pin) of pinned scroll after the ship has arrived: the hand-off to the guide ship
   is a pure function of how far into that tail the scroll is, so it plays at any scroll speed while the map is still on screen, and in reverse going back up. */
const tail = () => (isPhone() ? 0.5 : 0.8);   // r35: a shorter tail on phones (the CSS pin is 220svh there: 170 for the route and 50 for the tail)

/* r25-1: the map is two canvases. The coastlines, land wash and graticule are pre-rendered once to an offscreen canvas (per story and frame size, redrawn only on
   resize, theme or story change); the route, the trail, the dots, the markers and the ship are drawn live above it, only when something changed. Milestone notes
   and labels stay real HTML text, positioned with transforms and written only when they change. */
/* built on first use: Path2D does not exist on the server, where this module is also evaluated */
let paths: { LAND: Path2D; GRAT: Path2D } | null = null;
const getPaths = () => (paths ??= { LAND: new Path2D(COAST_D), GRAT: new Path2D(GRAT_D) });

/* r19 item 6: the milestone notes sit beside the route at their points: (dx, dy) in screen pixels, alternating above and below */
const NOTE_OFF: [number, number][] = [[16, -26], [-16, 30], [16, -26], [-16, 30], [16, -26], [-16, 30]];

export function ShipmentJourney() {
  const isStatic = useReducedMotion();
  const pin = useRef<HTMLDivElement>(null);
  const frameEl = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const notes = useRef<(HTMLSpanElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const flip = useRef(1);
  const at = useRef<{ x: number; y: number } | null>(null);
  const brk = useRef({ v: 0 });
  const mapFig = useRef<HTMLElement>(null);
  const originEl = useRef<HTMLSpanElement>(null);
  // round 13 item 6: the regulation story (ARIA tabs). Each story has its own route, framing, cargo and milestones.
  const [idx, setIdx] = useState(0);
  const story = journey.stories[idx];
  const geo = SHIP_GEO[story!.id];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState(isStatic ? MILESTONES.length - 1 : 0);
  /* r44-3: the supply-chain question folded in. At the proof milestone of each story one small question bubble and its answer line appear on the map (and stay for the
     next milestone), driven by the existing `current` milestone, so they reverse with the scroll. GSAP owns the start state, set after hydration; static: always shown. */
  const askEl = useRef<HTMLDivElement>(null);
  const askSeen = useRef(false);
  const ask = story!.ask;
  const askOn = current >= ask.at && current <= ask.at + 1;
  useEffect(() => {
    const el = askEl.current;
    if (!el) return;
    if (isStatic) { gsap.set(el, { clearProps: "opacity,visibility,transform" }); return; }
    const first = !askSeen.current;
    askSeen.current = true;
    if (first) { gsap.set(el, { autoAlpha: askOn ? 1 : 0, y: askOn ? 0 : 10 }); return; }
    gsap.to(el, { autoAlpha: askOn ? 1 : 0, y: askOn ? 0 : 10, duration: 0.45, ease: askOn ? "power2.out" : "power2.in", overwrite: true });
  }, [askOn, story, isStatic]);
  // the camera's framing, eased from one story's framing to the next (so the map animates between them)
  const view = useRef<Frame>({ ...(SHIP_GEO[journey.stories[0]!.id])!.frame });

  useEffect(() => {
    const el = pin.current!, fEl = frameEl.current!, cvs = cv.current!, ctx = cvs.getContext("2d")!;
    const { route, frame: target, sun: sunAt } = geo!;
    const live = story!.live;
    let cols: Cols = readCols();
    let ink = "rgba(237,232,218,", dpr = 1;
    const inkRgb = () => { const [r, g, b] = toRgb(cols.ink); ink = `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},`; };
    inkRgb();
    let ppu = 1;   // screen pixels per map unit, measured on resize
    // round 15 item 10: the frame may be height-limited (the viewBox is letterboxed), so a map unit is min(w / MAP_W, h / MAP_H) pixels
    let vw = MAP_W, vh = MAP_H;
    const tw: number[] = [];   // each label's text width in screen pixels (measured once the font is in)
    const nw: number[] = [], nh: number[] = [];   // the same for the milestone notes (width and height of the label card)
    const lPos: (number[] | undefined)[] = [];   // each label's placed position this pass (x, y, end-anchored)
    const noteOff = NOTE_OFF.map((o) => [o[0], o[1]] as [number, number]);   // r55: the offset each note actually uses (the collision pass below may flip or push it)
    const setCw = () => getRoot().style.setProperty("--cw", `${document.documentElement.clientWidth}px`);   // r22-11: the map bleeds to the right edge
    setCw(); window.addEventListener("resize", setCw);
    // places on the route, computed once per story
    const msPos = MILESTONES.map((m) => routeAt(route, m.t * route.length));
    const dotPos = Array.from({ length: DOTS }, (_, i) => routeAt(route, dropAt(i) * route.length));

    // the pre-rendered base: coastlines, land wash and graticule, for the region the camera can see on this route, at the follow zoom
    let off: HTMLCanvasElement | null = null, reg = { x0: 0, y0: 0, w: 1, h: 1 };
    const paintBase = (c: CanvasRenderingContext2D, px: number) => {   // px: user units per css pixel
      c.lineJoin = "round"; c.lineCap = "round"; c.setLineDash([]);
      c.lineWidth = px; c.strokeStyle = `${ink}0.1)`; c.stroke(getPaths().GRAT);
      c.fillStyle = `${ink}0.05)`; c.fill(getPaths().LAND);
      c.strokeStyle = `${ink}0.7)`; c.stroke(getPaths().LAND);
    };
    const buildBase = () => {
      const pts = route.pts, sf = target.s * ZOOM;
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      const hxF = vw / (2 * ppu * sf), hyF = vh / (2 * ppu * sf), hxO = vw / (2 * ppu * target.s), hyO = vh / (2 * ppu * target.s);
      x0 = Math.min(x0 - hxF, target.cx - hxO); x1 = Math.max(x1 + hxF, target.cx + hxO); y0 = Math.min(y0 - hyF, target.cy - hyO); y1 = Math.max(y1 + hyF, target.cy + hyO);
      let k = ppu * sf * dpr;
      const w0 = (x1 - x0) * k, h0 = (y1 - y0) * k;
      k *= Math.min(1, 4096 / w0, 4096 / h0, Math.sqrt(9e6 / (w0 * h0)));
      off = off ?? document.createElement("canvas");
      off.width = Math.ceil((x1 - x0) * k); off.height = Math.ceil((y1 - y0) * k);
      const oc = off.getContext("2d")!;
      oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, off.width, off.height);
      oc.setTransform(k, 0, 0, k, -x0 * k, -y0 * k);
      paintBase(oc, dpr / k);
      reg = { x0, y0, w: x1 - x0, h: y1 - y0 };
    };

    const measure = () => {
      const r = fEl.getBoundingClientRect();
      vw = r.width || MAP_W; vh = r.height || MAP_H;
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      cvs.width = Math.round(vw * dpr); cvs.height = Math.round(vh * dpr);
      ppu = Math.min(vw / MAP_W, vh / MAP_H) || 1;
      // round 17: where the route start sits in the figure at the start frame (the ink guide's dot lands here and becomes the cargo)
      const fr = mapFig.current?.getBoundingClientRect(), og = originEl.current;
      if (fr && og) {
        const s0 = target.s, [x0, y0] = route.pts[0]!;
        og.style.left = `${(r.left - fr.left + vw / 2 + ppu * s0 * (x0 - target.cx)).toFixed(1)}px`;
        og.style.top = `${(r.top - fr.top + vh / 2 + ppu * s0 * (y0 - target.cy)).toFixed(1)}px`;
        window.dispatchEvent(new Event("guide:refresh"));
      }
      buildBase();
    };

    // the scroll position, 0 to 1 (the ship's place is shipProgress of this). Pinned: the pin's own scroll range.
    const tk = track(el);
    const moveRange = () => tk.h - window.innerHeight - tail() * window.innerHeight;   // the part of the pin the ship sails in
    const progress = () => {
      const range = moveRange();
      return shipProgress(range > 0 ? clamp(-tk.rectTop() / range) : 0);
    };
    // the hand-off (0 to 1): from the moment the ship is at the port (p = 0.96 of the sailing range) through the tail of the pin
    const handoff = () => {
      const range = moveRange();
      return range > 0 ? clamp((-tk.rectTop() - 0.96 * range) / (tail() * window.innerHeight + 0.04 * range)) : 0;
    };
    let lastT = isStatic ? 1 : progress();
    let raf = 0, tween = 0, fadeRaf = 0;

    // what the last render worked out, for the canvas
    const st = { t: 0, s: 1, cx: 0, cy: 0, fx: 0, fy: 0, ang: 0, bob: 0, d: 0, cur: 0, inited: false };
    // note and label fades (eased by hand, so the text and the lines on the canvas fade together)
    const nA = MILESTONES.map(() => 0), nT = MILESTONES.map(() => 0), lA = geo!.labels.map(() => 0), lT = geo!.labels.map(() => 1);
    // write a DOM value only when it changed
    const last = new WeakMap<Element, string>(), lastO = new WeakMap<Element, string>();
    const putText = (sp: HTMLSpanElement | null, x: number, y: number, endAnchor: boolean, a: number) => {
      if (!sp) return;
      const tf = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)${endAnchor ? " translateX(-100%)" : ""}`;
      if (last.get(sp) !== tf) { last.set(sp, tf); sp.style.transform = tf; }
      const o = a.toFixed(2), ko = lastO.get(sp);
      if (ko !== o) { lastO.set(sp, o); sp.style.opacity = o; }
    };

    let formed = false, left = false;
    const sm01 = (x: number) => { const k = clamp(x); return k * k * (3 - 2 * k); };
    // r24-4, r29-3: at the destination port the ship dissolves into the dots of the Bindu mark (b 0 to 0.4, drawn here, on the map's canvas: each ship dot flies into the
    // mark dot it joins), then the mark's dots leave for the gutter ship (b 0.4 to 1) and are drawn by the Guide's canvas, which also draws the ship building itself from them.
    // The mark's dots publish where they are (shipHome.mark) so the beads start exactly there; time-based: one tween of b over 2.4s (the mark takes the first 40%).
    const frOff = { x: 0, y: 0 };
    /* ---------- the live canvas ---------- */
    const circle = (x: number, y: number, r: number) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); };
    const draw = () => {
      if (!st.inited) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, vw, vh);
      const { s, cx, cy, t, d } = st, S = ppu * s, X = (x: number) => vw / 2 + S * (x - cx), Y = (y: number) => vh / 2 + S * (y - cy);
      // the base: the pre-rendered bitmap, moved and scaled with the camera (drawn live only while the camera is outside it, e.g. while easing between stories)
      const covers = off && cx - vw / (2 * S) >= reg.x0 && cx + vw / (2 * S) <= reg.x0 + reg.w && cy - vh / (2 * S) >= reg.y0 && cy + vh / (2 * S) <= reg.y0 + reg.h;
      if (off && covers) ctx.drawImage(off, X(reg.x0), Y(reg.y0), reg.w * S, reg.h * S);
      else { ctx.save(); ctx.translate(vw / 2, vh / 2); ctx.scale(S, S); ctx.translate(-cx, -cy); paintBase(ctx, 1 / S); ctx.restore(); }
      // the route, the trail behind the ship and its bright wake
      const rp = route.pts, trace = (d0: number, d1: number) => {
        const a = routeAt(route, d0), b = routeAt(route, d1);
        ctx.beginPath(); ctx.moveTo(X(a.x), Y(a.y));
        for (let i = 0; i < rp.length; i++) if (route.cum[i]! > d0 && route.cum[i]! < d1) ctx.lineTo(X(rp[i]![0]), Y(rp[i]![1]));
        ctx.lineTo(X(b.x), Y(b.y));
      };
      ctx.lineCap = "butt"; ctx.lineWidth = 1.5; ctx.strokeStyle = `rgba(${cols.rr},${cols.rg},${cols.rb},0.85)`; ctx.setLineDash([6, 6]);
      ctx.beginPath(); rp.forEach(([x, y]: [number, number], i: number) => (i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)))); ctx.stroke();
      ctx.setLineDash([]); ctx.lineCap = "round"; ctx.lineJoin = "round";
      if (d > 0) {
        ctx.strokeStyle = `rgba(${cols.rr},${cols.rg},${cols.rb},0.5)`; trace(0, d); ctx.stroke();
        ctx.lineWidth = 4; ctx.globalAlpha = 0.4; ctx.strokeStyle = cols.route; trace(Math.max(0, d - WAKE), d); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // the trail dots: each is dropped when the ship passes it, then gathers into the sunflower at the port; yellow with a darker edge once filed
      const filed = t >= 0.995 && live;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < DOTS; i++) {
        const f0 = dropAt(i);
        if (t < f0) continue;
        const gather = smooth(clamp((t - GATHER - 0.06 * (i / DOTS)) / 0.08)), p = dotPos[i], [ax, ay] = sunAt[i]!;
        // r28-8, r29-3: the mark's dots are the ones that leave: dot i hides the moment its bead (drawn by the Guide, from this very spot) sets off, so the mark empties into the stream
        const mxp = X(p!.x + (ax - p!.x) * gather), myp = Y(p!.y + (ay - p!.y) * gather);
        if (i < 34 && shipHome.markOn) { shipHome.mark[2 * i] = frOff.x + mxp; shipHome.mark[2 * i + 1] = frOff.y + myp; }
        const bq = (brk.current.v - 0.4) / 0.6;
        if (bq > 0 && i < 34 && mapU(bq, i) > 0.00001) continue;
        circle(mxp, myp, 1.5);
        if (filed) { ctx.fillStyle = cols.fill; ctx.fill(); ctx.strokeStyle = cols.outline; ctx.stroke(); } else { ctx.fillStyle = cols.cobalt; ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      // the milestone markers and the lines of their notes
      MILESTONES.forEach((_, i) => {
        const mx = X(msPos[i]!.x), my = Y(msPos[i]!.y), reached = i <= st.cur, coming = !live && i === MILESTONES.length - 1;
        if (nA[i]! > 0.01 && window.innerWidth > 860) {   // (under 861px the cards are hidden and the list carries the steps, so no leaders)
          const [dx, dy] = noteOff[i]!;
          ctx.lineWidth = 1; ctx.strokeStyle = `${ink}${nA[i]!.toFixed(2)})`; ctx.beginPath(); ctx.moveTo(Math.floor(mx) + 0.5, Math.floor(my) + 0.5); ctx.lineTo(Math.floor(mx + dx) + 0.5, Math.floor(my + dy) + 0.5); ctx.stroke();   // r28-9: a 1px ink leader
        }
        circle(mx, my, 3.2); ctx.lineWidth = 1.5;
        if (reached && coming) { ctx.fillStyle = cols.canvas; ctx.strokeStyle = cols.onDark; ctx.setLineDash([2, 1.6]); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); }
        else if (reached) { ctx.fillStyle = cols.fill; ctx.strokeStyle = cols.outline; ctx.fill(); ctx.stroke(); }
        else { ctx.fillStyle = cols.canvas; ctx.strokeStyle = cols.route; ctx.fill(); ctx.stroke(); }
      });
      // the guide ship (22px, upright, tilts up to 3 degrees, bobs, faces its direction of travel). At the port (b 0 to 0.4) it comes apart a part at a time: its 34 dots fly in short
      // curves into the dots of the mark (quart-out, staggered) and fade into them. The ship is never drawn whole next to its dots.
      const b = brk.current.v;
      if (b <= 0.00001 || b >= 0.4) { if (b <= 0.00001) drawShip(ctx, cols, X(st.fx), Y(st.fy) + st.bob * 0.8, st.ang, 0.4, flip.current, 1); }
      else {
        const q = b / 0.4, sx = X(st.fx), sy = Y(st.fy) + st.bob * 0.8, fl = flip.current, rr = (st.ang * Math.PI) / 180, cr = Math.cos(rr), sr = Math.sin(rr), land = new Float32Array(NB);
        for (let j = 0; j < NB; j++) land[j] = 1 - sm01(mapU(q, j) / 0.15);
        drawShip(ctx, cols, sx, sy, st.ang, 0.4, fl, 1, 0, buildFrom(land));
        for (let j = 0; j < NB; j++) {
          const u = mapU(q, j); if (u <= 0.0001) continue;
          const a0 = SLOTS[j]!.x * 0.4 * fl, b0 = SLOTS[j]!.y * 0.4, x0 = sx + a0 * cr - b0 * sr, y0 = sy + a0 * sr + b0 * cr;
          const [ax, ay] = sunAt[j]!, x1 = X(ax), y1 = Y(ay), v = 1 - u, mx = (x0 + x1) / 2 + ((j % 5) - 2) * 4, my = Math.min(y0, y1) - 14;
          ctx.globalAlpha = sm01(u / 0.1) * (1 - sm01((u - 0.85) / 0.15));
          circle(v * v * x0 + 2 * v * u * mx + u * u * x1, v * v * y0 + 2 * v * u * my + u * u * y1, 2.1 - 0.6 * u);
          ctx.fillStyle = SLOTS[j]!.yel ? cols.yellow : cols.route; ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };
    // the text layer: notes and labels as real text, shown only while all of one is inside the frame (never cut by the edge)
    const text = () => {
      const { s, cx, cy, t } = st, S = ppu * s, X = (x: number) => vw / 2 + S * (x - cx), Y = (y: number) => vh / 2 + S * (y - cy);
      geo!.labels.forEach((l, i) => {
        const sp = labels.current[i];
        if (!sp) return;
        if (!tw[i]) tw[i] = sp.offsetWidth;
        const x = X(l.p[0]), y = Y(l.p[1]), a = l.off?.[2] ?? "start", ox = l.off?.[0] ?? 7, oy = l.off?.[1] ?? -6, lf = x + ox - (a === "end" ? tw[i] : 0), top = y + oy - 9, mg = 4;
        lT[i] = lf >= mg && lf + tw[i] <= vw - mg && top >= mg && top + 12 <= vh - mg ? 1 : 0;
        lPos[i] = [x + ox, y + oy - 8, a === "end" ? 1 : 0];
      });
      /* r55-5: nothing overlaps. Labels and notes are placed in order; a note tries its own offset, then the flipped ones and a few pushed ones, and takes the first
         that is inside the frame and clear of the labels, the notes already placed, the other milestone points and the route line (the route is sampled in screen
         pixels, ignoring the part right at the note's own point, where its leader starts). If none is clear it takes the one that overlaps least. */
      const placed: number[][] = [];
      const lRect: (number[] | null)[] = geo!.labels.map((_, i) => {
        const q = lPos[i];
        if (!q || !tw[i] || lT[i] === 0) return null;
        const lf = q[0]! - (q[2] ? tw[i]! : 0);
        return [lf - 3, q[1]! - 2, lf + tw[i]! + 3, q[1]! + 16];
      });
      const samples: number[][] = [];
      for (let d = 0; d <= route.length; d += 10) { const q = routeAt(route, d); samples.push([X(q.x), Y(q.y)]); }
      const pts = msPos.map((q) => [X(q.x), Y(q.y)]);
      const hit = (r: number[], o: number[]) => r[0]! < o[2]! && r[2]! > o[0]! && r[1]! < o[3]! && r[3]! > o[1]!;
      /* the current note is placed first, then the earlier ones, newest first: if an earlier note finds no clear place it is hidden, so the current one is never covered */
      const order = MILESTONES.map((_, i) => i).sort((a, b) => { const ka = a > st.cur ? 1000 + a : st.cur - a, kb = b > st.cur ? 1000 + b : st.cur - b; return ka - kb; });
      order.forEach((i) => {
        const m = MILESTONES[i]!;
        const sp = notes.current[i];
        if (!sp) return;
        if (!nw[i]) { nw[i] = sp.offsetWidth; nh[i] = sp.offsetHeight; }
        const w = nw[i]!, h = nh[i]!, x = pts[i]![0]!, y = pts[i]![1]!, base = NOTE_OFF[i]!;
        const rect = (dx: number, dy: number) => { const lf = dx > 0 ? x + dx : x + dx - w, top = dy < 0 ? y + dy - h : y + dy; return [lf, top, lf + w, top + h]; };
        const cands: [number, number][] = [
          [base[0], base[1]], [-base[0], base[1]], [base[0], -base[1]], [-base[0], -base[1]],
          [base[0], base[1] * 2.2], [-base[0], base[1] * 2.2], [base[0], -base[1] * 2.2], [-base[0], -base[1] * 2.2],
          [base[0], base[1] * 3.6], [-base[0], base[1] * 3.6], [base[0], -base[1] * 3.6], [-base[0], -base[1] * 3.6],
          [base[0] * 4, base[1]], [-base[0] * 4, base[1]], [base[0] * 4, -base[1]], [-base[0] * 4, -base[1]],
          [base[0] * 4, base[1] * 2.2], [-base[0] * 4, base[1] * 2.2], [base[0] * 4, -base[1] * 2.2], [-base[0] * 4, -base[1] * 2.2],
        ];
        let best = cands[0]!, bestScore = Infinity;
        for (const c of cands) {
          const r = rect(c[0], c[1]);
          let score = 0;
          if (!(r[0]! >= 4 && r[2]! <= vw - 4 && r[1]! >= 4 && r[3]! <= vh - 4)) score += 1000;
          for (const o of placed) if (hit(r, o)) score += 100;
          for (const o of lRect) if (o && hit(r, o)) score += 30;   // a map label is the cheaper thing to lose: if a note has to cover one, that label is hidden
          pts.forEach((p, k) => { if (k !== i && hit(r, [p[0]! - 6, p[1]! - 6, p[0]! + 6, p[1]! + 6])) score += 40; });
          for (const q of samples) {
            if (Math.hypot(q[0]! - x, q[1]! - y) < 26) continue;
            if (q[0]! > r[0]! - 2 && q[0]! < r[2]! + 2 && q[1]! > r[1]! - 2 && q[1]! < r[3]! + 2) score += 4;
          }
          score += (Math.abs(c[0]) + Math.abs(c[1])) * 0.01;   // prefer the short leader
          if (score < bestScore) { bestScore = score; best = c; }
        }
        noteOff[i] = best;
        const [dx, dy] = best, right = dx > 0, above = dy < 0;
        const r = rect(dx, dy), top = r[1]!;
        const inFrame = r[0]! >= 4 && r[2]! <= vw - 4 && top >= 4 && r[3]! <= vh - 4;
        nT[i] = t < m.t - 0.03 || !inFrame || (bestScore >= 100 && i !== st.cur) ? 0 : 1;   // a step shows once it is reached; past steps stay (muted by colour) unless there is no clear place for them
        if (nT[i]) { placed.push(r); lRect.forEach((o, k) => { if (o && hit(r, o)) lT[k] = 0; }); }
        sp.dataset.state = i < st.cur ? "done" : i === st.cur ? "current" : "next";
        putText(sp, x + dx, top, !right, nA[i]!);
      });
      geo!.labels.forEach((_, i) => { const q = lPos[i]; if (q) putText(labels.current[i] ?? null, q[0]!, q[1]!, !!q[2], lA[i]!); });
    };
    const fade = () => {
      fadeRaf = 0;
      let more = false;
      const step = (a: number[], tg: number[]) => a.forEach((v, i) => { const dv = tg[i]! - v; if (Math.abs(dv) < 0.02) a[i] = tg[i]!; else { a[i] = v + dv * 0.25; more = true; } });
      step(nA, nT); step(lA, lT);
      text(); draw();
      if (more) fadeRaf = tRaf(fade);
    };
    const settleFades = () => { if (isStatic) { nA.forEach((_, i) => (nA[i] = nT[i]!)); lA.forEach((_, i) => (lA[i] = lT[i]!)); } else if (!fadeRaf) fadeRaf = tRaf(fade); };

    const paintBreak = (noDraw = false) => {
      const a = at.current;
      if (!a) return;
      const b = brk.current.v;
      if (b >= 0.4 && !formed) { formed = true; } else if (b < 0.34) formed = false;
      if (b >= 0.5 && !left) { left = true; } else if (b < 0.45) left = false;
      shipHome.dock = sm01((b - 0.9) / 0.1) * shipHome.pres;
      shipHome.brk = b; shipHome.markOn = b > 0.4 && !isStatic; shipHome.markFilled = live && lastT >= 0.995;
      if (b > 0.4) { const r = fEl.getBoundingClientRect(); frOff.x = r.left; frOff.y = r.top; }
      if (!noDraw || b > 0.4) draw();   // the map's frame first (it publishes where the mark's dots are and hides the ones that left), then the Guide's, in the same tick
      shipHome.now();
    };

    // one pure function of the ship's place on the route, so it reverses on scroll-up
    const render = (t: number) => {
      lastT = t;
      const v = view.current;
      const d = t * route.length;
      const f = routeAt(route, d);
      const w = smooth(clamp((t - 0.04) / 0.2));                    // overview first, then follow
      const s = v.s * (1 + (ZOOM - 1) * w);
      const cx = v.cx + (f.x - v.cx) * w, cy = v.cy + (f.y - v.cy) * w;
      const hx = Math.cos((f.angle * Math.PI) / 180), hy = Math.sin((f.angle * Math.PI) / 180);
      if (hx > 0.35) flip.current = 1; else if (hx < -0.35) flip.current = -1;
      at.current = { x: f.x, y: f.y };
      let cur = 0;
      MILESTONES.forEach((m, i) => { if (t >= m.t - 1e-6) cur = i; });
      Object.assign(st, { t, s, cx, cy, fx: f.x, fy: f.y, ang: 3 * hy * flip.current, bob: isStatic ? 0 : Math.sin(t * 70) * 2, d, cur, inited: true });
      // r22-5, r30-1: at the destination port the ship breaks into dots as the pin's tail is scrolled (a function of the scroll position: reverses on scroll-up)
      if (!isStatic) brk.current.v = handoff();   // r30-1: by scroll state, not by a timed tween started on a crossing
      text(); settleFades(); if (isStatic) text();
      draw();
      if (!isStatic) paintBreak(true);
      setCurrent(cur);
    };

    // the camera eases from the previous framing to this story's (exponential, so it slows into place)
    const settle = () => {
      const v = view.current, k = isStatic ? 1 : CAM_EASE;
      v.s += (target.s - v.s) * k; v.cx += (target.cx - v.cx) * k; v.cy += (target.cy - v.cy) * k;
      const near = Math.abs(target.s - v.s) < 1e-3 && Math.abs(target.cx - v.cx) < 0.2 && Math.abs(target.cy - v.cy) < 0.2;
      if (near) Object.assign(v, target);
      render(lastT);
      tween = near ? 0 : tRaf(settle);
    };

    const unTheme = subscribeTheme(() => { cols = readCols(); inkRgb(); buildBase(); draw(); });
    const detach = () => { unTheme(); window.removeEventListener("resize", setCw); };

    if (isStatic) {
      // reduced motion: the full route, every milestone, the ship already at the port with the sunflower filed; no easing
      measure(); setCurrent(MILESTONES.length - 1);
      Object.assign(view.current, target);
      render(1);
      return detach;
    }

    let visible = false;
    const update = () => {
      raf = 0;
      if (!visible) return;   // off-screen: no work at all
      render(progress());
    };
    const onScroll = () => { if (!raf) raf = tRaf(update); };
    const onResize = () => { measure(); onScroll(); };
    const io = new IntersectionObserver(([e]) => { visible = e!.isIntersecting; if (visible) onScroll(); gsap.to(shipHome, { pres: visible ? 1 : 0, duration: 0.4, overwrite: true, onUpdate: () => paintBreak() }); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    settle();
    onScroll();
    document.fonts?.ready.then(() => { tw.length = 0; nw.length = 0; measure(); onScroll(); });
    return () => {
      detach(); io.disconnect(); gsap.killTweensOf(shipHome); shipHome.pres = 1; shipHome.dock = 0; shipHome.brk = 0; shipHome.markOn = false; shipHome.kick(); gsap.killTweensOf(brk.current); brk.current.v = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) tCaf(raf);
      if (tween) tCaf(tween);
      if (fadeRaf) tCaf(fadeRaf);
    };
  }, [isStatic, story, geo]);

  // the ARIA tab pattern: arrow keys, Home and End move the selection and the focus
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = journey.stories.length;
    const moves: Record<string, number> = { ArrowRight: (idx + 1) % n, ArrowLeft: (idx + n - 1) % n, Home: 0, End: n - 1 };
    if (!(e.key in moves)) return;
    const next = moves[e.key];
    e.preventDefault();
    setIdx(next!);
    tabs.current[next!]?.focus();
  };

  return (
    <section className="band-dark sec ship" id="shipment" aria-labelledby="ship-h" data-guide-anchor="ship" data-guide-side="l">
      {/* the whole section is pinned: the title, the regulation control and the map share one window while the ship travels */}
      <div ref={pin} className={`ship-pin${isStatic ? " is-static" : ""}`}>
        <div className="ship-stage" data-guide-gutter>
          <div className="sec-head">
            <h2 id="ship-h" className="t-display-lg" suppressHydrationWarning>{journey.title}</h2>
            <p className="t-body-lg ship-sub">{story!.sub}</p>
            <div className="seg-track ship-seg">
              <div
                className="seg-in"
                role="tablist"
                aria-label="Regulation story"
                onKeyDown={onTabKey}
                style={{ "--n": journey.stories.length, "--i": idx } as CSSProperties}
              >
                <span className="seg-ind" aria-hidden="true" />
                {journey.stories.map((s, i) => (
                  <button
                    key={s.id}
                    ref={(el) => { tabs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`ship-tab-${s.id}`}
                    aria-selected={i === idx}
                    aria-controls="ship-panel"
                    tabIndex={i === idx ? 0 : -1}
                    className={`seg-opt${i === idx ? " is-on" : ""}`}
                    onClick={() => setIdx(i)}
                  >
                    {s.tab}
                    <span className="sr"> {s.live ? "Live" : "In build"}</span>
                  </button>
                ))}
              </div>
            </div>
            <ul className="ship-chips" aria-label="Status">
              {story!.chips.map((c) => <li key={c.text} className={`ship-status ${c.live ? "is-live" : "is-build"}`}><b aria-hidden="true" />{c.text}{c.live ? "" : ", coming"}</li>)}
            </ul>
          </div>
          <div id="ship-panel" role="tabpanel" aria-labelledby={`ship-tab-${story!.id}`} className="ship-cols">
            <figure ref={mapFig} className="ship-map">
              <span ref={originEl} className="ship-origin" aria-hidden="true" />
              <div ref={frameEl} className="ship-svg" role="img" aria-label={`Map of the example ${story!.tab} route, with six milestones`}>
                <canvas ref={cv} className="ship-cv" />
                <div className="ship-txt">
                  {MILESTONES.map((_, i) => {
                    const label = (story!.milestones[i])!.label, coming = !story!.live && i === MILESTONES.length - 1;
                    return <span key={`${story!.id}-n${i}`} ref={(el) => { notes.current[i] = el; }} className={`ship-note${coming ? " is-coming" : ""}`}><b>{label}</b><i>{(story!.milestones[i])!.detail}</i></span>;
                  })}
                  {geo!.labels.map((l, i) => <span key={`${story!.id}-${l.text}`} ref={(el) => { labels.current[i] = el; }} className="ship-label">{l.text}</span>)}
                </div>
              </div>
              <figcaption className="ship-cap">
                <span className="chip chip-illus">{journey.illus}</span> {journey.caption}
              </figcaption>
            </figure>
            <ol className="ship-list">
              {story!.milestones.map((m, i) => (
                <li key={`${story!.id}-${i}`} className={`ship-ms${!story!.live && i === story!.milestones.length - 1 ? " is-coming" : ""}`} data-state={i < current ? "done" : i === current ? "current" : "next"}>
                  <div>
                    <h3>{m.label}</h3>
                    <p>{m.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
              <div ref={askEl} className="ship-ask">
                <p className="ship-ask-q"><span className="chip chip-illus">{journey.illus}</span><span>{ask.q}</span></p>
                <p className="ship-ask-a">{ask.a}</p>
              </div>
            {/* phones only (CSS): the current milestone's sentence, once, under the compact index */}
            <p className={`ship-now${!story!.live && current === story!.milestones.length - 1 ? " is-coming" : ""}`} aria-hidden="true">{(story!.milestones[Math.min(current, story!.milestones.length - 1)])!.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
