/**
 * Blog-repo version of shelley's app/root-shell.tsx.
 *
 * Shelley's shell also loads the consent banner, Plausible, Ahrefs analytics,
 * the theme provider and the app's query providers. None of that belongs in a
 * development copy of the blog (it would send dev traffic to the production
 * analytics), so this shell is the document and nothing else. Do NOT copy this
 * file back into shelley; keep shelley's own root-shell.tsx.
 */

import { DocumentShell } from "./document-shell";

export function RootShell({
  lang,
  children,
}: {
  /** BCP 47 tag for this tree's root layout. */
  lang: string;
  children: React.ReactNode;
}) {
  return <DocumentShell lang={lang}>{children}</DocumentShell>;
}
