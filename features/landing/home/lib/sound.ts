import { useSyncExternalStore } from "react";

/* Round 21, items 1 and 1b; round 28, item 5: the sound system. The cues are recorded sounds, not synthesis: Kenney "Interface Sounds" (CC0, see LICENSES.md),
   trimmed, matched to the same loudness (about -20 dBFS RMS, peaks under -1 dBFS) and stored as small .ogg (with .mp3 as the fallback) in public/sounds, three or
   four files per cue. They are fetched and decoded to AudioBuffers the first time sound is turned on (never before), and played through Web Audio.
   The rules are unchanged. Off by default. The AudioContext is created only from a user gesture and only when sound is on (the toggle in the nav, saved in
   localStorage; a saved "on" is picked up at the first click, tap or key press, never earlier). Nothing plays before that. Everything is muted while the tab is
   hidden. At most about 8 cues a second (the throttle varies a little). Each cue picks one of its files at random, never the one it just played, and varies the
   playback rate by up to 4 percent and the volume a little. The proof chimes climb a pentatonic scale down the page (playNote, by playback rate).
   Cues: chime (proof, the i forms, a settled flap), clack (departures board), dash (the ship enters or leaves
   the map, the course line dips, a strike-through is drawn), horn (click the ship), resolve (the finale). */

export type Cue = "tick" | "chime" | "clack" | "horn" | "dash" | "resolve";
const KEY = "bindu-sound";
const MASTER = 0.5;   // the files are already at about -20 dBFS RMS; this puts them about -26 dBFS under the speakers
/* per-cue level on top of the matched files: the soft ones (tick, dash) sit lower */
const LEVEL: Record<Cue, number> = { tick: 0.5, chime: 0.85, clack: 0.75, horn: 0.8, dash: 0.55, resolve: 0.8 };
const FILES: Record<Cue, number> = { tick: 4, chime: 4, clack: 4, horn: 4, dash: 4, resolve: 3 };

let on = false;
try { on = localStorage.getItem(KEY) === "1"; } catch { /* private mode: off */ }
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let last = 0;
let loading = false;
const buffers: Partial<Record<Cue, AudioBuffer[]>> = {};
const lastVariant: Partial<Record<Cue, number>> = {};
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

/* ogg where the browser plays it, mp3 otherwise */
const ext = () => { try { return document.createElement("audio").canPlayType('audio/ogg; codecs="vorbis"') ? "ogg" : "mp3"; } catch { return "mp3"; } };

/* fetch and decode every file, once, the first time the context exists */
function load(c: AudioContext) {
  if (loading) return;
  loading = true;
  const e = ext();
  (Object.keys(FILES) as Cue[]).forEach((cue) => {
    const got: AudioBuffer[] = [];
    for (let i = 1; i <= FILES[cue]; i++) {
      fetch(`/home/sounds/${cue}-${i}.${e}`)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
        .then((ab) => c.decodeAudioData(ab))
        .then((b) => { got.push(b); buffers[cue] = got; })
        .catch(() => { /* a missing or undecodable file just means one variant fewer */ });
    }
  });
}

function ensure(): AudioContext | null {
  if (!on) return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = MASTER; master.connect(ctx.destination);
    document.addEventListener("visibilitychange", () => { if (!ctx) return; if (document.hidden) void ctx.suspend(); else if (on) void ctx.resume(); });
    load(ctx);
  }
  if (document.hidden) return null;
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// a saved "on" starts the context at the first real gesture (browsers need one anyway)
if (on && typeof window !== "undefined") {
  const first = () => { ensure(); window.removeEventListener("pointerdown", first); window.removeEventListener("keydown", first); };
  window.addEventListener("pointerdown", first); window.addEventListener("keydown", first);
}

const rnd = (a: number) => 1 + (Math.random() * 2 - 1) * a;
const PENT = [0, 2, 4, 7, 9];   // major pentatonic, in semitones

function gate(): AudioContext | null {
  if (!on || !ctx) return null;
  const now = performance.now();
  if (now - last < 110 + Math.random() * 40) return null;   // about 8 cues a second at most, the interval varies a little
  const c = ensure();
  if (!c || !master) return null;
  last = now;
  return c;
}

function shoot(c: AudioContext, cue: Cue, rate: number, vol: number) {
  const bs = buffers[cue];
  if (!bs || !bs.length) return;   // still loading
  let i = Math.floor(Math.random() * bs.length);
  if (bs.length > 1 && i === lastVariant[cue]) i = (i + 1 + Math.floor(Math.random() * (bs.length - 1))) % bs.length;
  lastVariant[cue] = i;
  const s = c.createBufferSource(), g = c.createGain();
  s.buffer = bs[i]!; s.playbackRate.value = rate;
  g.gain.value = vol * LEVEL[cue];
  s.connect(g); g.connect(master!); s.start();
}

/* play a cue. Safe to call anywhere: it does nothing when sound is off, before a gesture, or when the tab is hidden.
   A file is chosen at random, never the one just played; the rate varies by 4 percent. */
export function play(cue: Cue, volume = 1) {
  const c = gate();
  if (!c) return;
  shoot(c, cue, rnd(0.04), volume * rnd(0.1));
}

/* a pentatonic note for the proof chimes: step goes up as the ship moves down the page and down when you scroll up (a rate between about 0.85 and 1.4). */
export function playNote(step: number, _kind: "dot" | "chime" = "chime", volume = 1) {
  const c = gate();
  if (!c) return;
  const k = ((step % 5) + 5) % 5;
  shoot(c, "chime", 0.85 * Math.pow(2, PENT[k]! / 12) * rnd(0.01), volume * rnd(0.1));
}

/* a cue the page plays at most once per page view */
const once = new Set<string>();
export function playOnce(cue: Cue, id: string = cue) { if (once.has(id) || !on || !ctx) return; once.add(id); play(cue); }

export const isOn = () => on;
export function setOn(v: boolean) {
  on = v;
  try { localStorage.setItem(KEY, v ? "1" : "0"); } catch { /* private mode */ }
  if (v) ensure(); else if (ctx) void ctx.suspend();
  emit();
}
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
export function useSound(): boolean { return useSyncExternalStore(subscribe, isOn, () => false); }
