/* Round 35: the one phone check. Phones are 767px and under (the same limit as the mobile-only CSS in styles/mobile.css); 768px and up never reaches a phone branch.
   isPhone() reads matchMedia every call (cheap, always current); onPhoneChange() lets a component re-measure when the window crosses the limit. */
const Q = "(max-width: 767px)";
export const isPhone = (): boolean => typeof window !== "undefined" && window.matchMedia(Q).matches;
export function onPhoneChange(fn: () => void): () => void {
  const mq = window.matchMedia(Q);
  mq.addEventListener("change", fn);
  return () => mq.removeEventListener("change", fn);
}
