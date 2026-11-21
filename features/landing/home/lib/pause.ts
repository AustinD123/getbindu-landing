/* The site's one pause control (the hero map's button) also freezes the ink guide (round 17). */
let paused = false;
const subs = new Set<() => void>();
export const isPaused = () => paused;
export function setPaused(v: boolean) { paused = v; subs.forEach((f) => f()); }
export function subscribePause(f: () => void) { subs.add(f); return () => { subs.delete(f); }; }
