/**
 * Factory for the localized root layouts: app/(de) … app/(pl).
 *
 * One route group per locale, each with its own root layout, because
 * `<html lang>` can only be set by a root layout and /de/eudr must not
 * serve lang="en".
 *
 * Why a group per locale rather than one [lang] segment: the app already has a
 * root-level dynamic segment, app/(en)/[workspaceSlug], for workspace URLs.
 * Next allows only one slug name per path position, even across route groups,
 * so /[lang]/eudr and /[workspaceSlug] cannot coexist. Static locale folders
 * avoid the collision and stay prerendered.
 *
 * Route groups do not appear in the URL: app/(de)/layout.tsx governs /de/*.
 * The six group layouts are otherwise identical, so each one is two exports:
 * the metadata/viewport re-export (Next only reads those as static exports in
 * the layout file itself, so they cannot live here) and
 * `export default makeLocaleRootLayout(lang, locale)`.
 */

import { LandingChrome, type LandingLocale } from "./landing-chrome";
import { RootShell } from "./root-shell";

export function makeLocaleRootLayout(lang: string, locale: LandingLocale) {
  return function LocaleRootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <RootShell lang={lang}>
        <LandingChrome locale={locale}>{children}</LandingChrome>
      </RootShell>
    );
  };
}
