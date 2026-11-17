/**
 * Layout for the English marketing pages. The localized pages get the same
 * chrome from their own root layouts, app/(de) … app/(pl), via
 * app/locale-root-layout.tsx.
 */

import { LandingChrome } from "../../landing-chrome";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingChrome>{children}</LandingChrome>;
}
