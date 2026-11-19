/**
 * Root layout for the English tree. In shelley this tree also holds the auth
 * screens and the workspace app; here it only holds the landing. Locale roots
 * (app/(de) … app/(pl)) use app/locale-root-layout.tsx.
 */

import { RootShell } from "../root-shell";

export { metadata, viewport } from "../root-metadata";

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
