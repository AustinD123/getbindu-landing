/* The homepage's wrapper element. Everything that v3 put on <html> (data-theme, data-intro, the fx / rm / bands-fx /
   g-over state classes, the --cw variable, the token reads) lives on this element instead, so no other route is
   touched and a client-side navigation away leaves nothing behind. */
export const HOME_CLASS = "bindu-home";

export function getRoot(): HTMLElement {
  return document.querySelector<HTMLElement>(`.${HOME_CLASS}`) ?? document.documentElement;
}
