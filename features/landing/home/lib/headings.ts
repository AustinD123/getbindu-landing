import { gsap, ScrollTrigger, SplitText, reduceMotion } from "./motion";

/* Round 20, item 2: one heading system site-wide. Every section heading (h2) reveals line by line: each line slides up 100% inside its own
   mask (60ms stagger, expo-out), tied to the scroll entry and played in reverse when you scroll back above it. GSAP SplitText (lines +
   masks) re-splits on resize (autoSplit). Body text is not touched; the finale wordmark is a mask of its own and is skipped.
   Reduced motion: nothing runs, headings show at once. Only transform is animated. */
export function startHeadings(): () => void {
  if (reduceMotion()) return () => {};
  const splits: SplitText[] = [];
  const tls = new Map<Element, gsap.core.Timeline>();
  let batch: ScrollTrigger[] = [];
  let dead = false;
  const run = () => {
    if (dead) return;
    document.querySelectorAll<HTMLElement>("main h2:not(.wm)").forEach((h) => {
      splits.push(SplitText.create(h, {
        type: "lines", mask: "lines", maskClass: "h-mask", autoSplit: true, aria: "auto",
        // r24: one paused timeline per heading (lines up, then the yellow full stop); a single ScrollTrigger.batch plays it forward when the heading
        // reaches 92% down the viewport and reverses it above that. No scrub, so nothing is written per scroll frame.
        onSplit: (self) => {
          // r22-17: the full stop becomes a small yellow Bindu dot that drops in after the lines
          const ln = self.lines[self.lines.length - 1] as HTMLElement | undefined;
          let dot: HTMLElement | null = null;
          if (ln) {
            const tw = document.createTreeWalker(ln, NodeFilter.SHOW_TEXT);
            let last: Text | null = null;
            while (tw.nextNode()) last = tw.currentNode as Text;
            if (last && /\.$/.test(last.data)) {
              last.data = last.data.slice(0, -1);
              dot = document.createElement("span"); dot.className = "dot-stop"; dot.setAttribute("aria-hidden", "true");
              last.parentNode!.insertBefore(dot, last.nextSibling);
            }
          }
          const tl = gsap.timeline({ paused: true });
          tl.fromTo(self.lines, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 });
          if (dot) tl.fromTo(dot, { scale: 0, yPercent: -80 }, { scale: 1, yPercent: 0, duration: 0.35, ease: "back.out(2)" }, ">-0.25");
          tls.set(h, tl);
          return tl;
        },
      }));
    });
    batch = ScrollTrigger.batch(Array.from(tls.keys()) as HTMLElement[], {
      start: "top 92%",
      onEnter: (els) => els.forEach((e) => tls.get(e)?.play()),
      onLeaveBack: (els) => els.forEach((e) => tls.get(e)?.reverse()),
    });
    ScrollTrigger.refresh();
  };
  (document.fonts?.ready ?? Promise.resolve()).then(run);
  return () => { dead = true; batch.forEach((t) => t.kill()); splits.forEach((s) => s.revert()); };
}
