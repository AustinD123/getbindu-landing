import type { Metadata } from "next";

/** Must match the `template` in app/root-metadata.ts. */
const SUFFIX = " | Bindu";
/** Roughly what a Google result shows before truncating the title. */
const MAX_TITLE = 60;

/**
 * The page title with the root " | Bindu" template applied, unless that
 * would push it past ~60 characters. Then the bare title is emitted as
 * `absolute`, since Google already shows the site name above each result
 * and a truncated suffix just costs space.
 */
export function seoTitle(title: string): Metadata["title"] {
  return title.length + SUFFIX.length > MAX_TITLE ? { absolute: title } : title;
}
