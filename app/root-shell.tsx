/**
 * Landing-repo version of shelley's app/root-shell.tsx.
 *
 * Shelley's shell also loads the consent banner, Plausible and Ahrefs
 * analytics, the theme provider and the app's providers. A development copy of
 * the landing must not send traffic to production analytics, so this shell is
 * the document plus the one provider the landing needs. Do NOT copy this file
 * back into shelley; keep shelley's own root-shell.tsx.
 */

import { DocumentShell } from "./document-shell";
import { Providers } from "./providers";

export function RootShell({
  lang,
  children,
}: {
  /** BCP 47 tag for this tree's root layout. */
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <DocumentShell lang={lang}>
      <Providers>{children}</Providers>
    </DocumentShell>
  );
}
