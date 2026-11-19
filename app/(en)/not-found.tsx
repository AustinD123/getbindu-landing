import type { Metadata } from "next";
import Link from "next/link";

// Root not-found boundary. Every notFound() raised below the root layout lands
// here and Next serves it with a real HTTP 404. Without this file — and without
// the callers that now raise notFound() — unknown URLs fell through to the
// /{workspaceSlug} app shell and answered 200 with the root layout's
// "index, follow" metadata, so crawlers indexed junk paths as real pages.
// Everything here overrides a root-layout default that is wrong on a 404: the
// homepage title, `index, follow`, and `canonical: "/"` — the last of which had
// every missing page telling crawlers it was the homepage.
export const metadata: Metadata = {
  title: { absolute: "Page not found — Bindu" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

// Where a lost visitor most plausibly meant to go. Mirrors the public surface
// listed in app/robots.ts.
const DESTINATIONS = [
  { href: "/", label: "Home" },
  { href: "/eudr", label: "EUDR" },
  { href: "/dpp", label: "Digital Product Passport" },
  { href: "/cbam", label: "CBAM" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="max-w-md text-muted-foreground">
          The link may be out of date, or the address was mistyped.
        </p>
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="text-sm underline underline-offset-4 hover:text-muted-foreground"
          >
            {d.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
