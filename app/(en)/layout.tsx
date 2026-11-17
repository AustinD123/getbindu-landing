/**
 * Root layout for the English tree. In shelley this tree also holds the app;
 * here it only holds the blog. Locale roots (app/(de)) use
 * app/locale-root-layout.tsx.
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
