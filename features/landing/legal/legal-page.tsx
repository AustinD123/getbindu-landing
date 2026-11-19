import type { ReactNode } from "react";
import Link from "next/link";
import { IslandHeader } from "@/features/landing/chrome/island-header";
import { LandingFooter } from "@/features/landing/chrome/landing-footer";
import "@/features/landing/blog/blog.css";

// Shared shell for the legal pages (/terms, /privacy). Same marketing chrome
// as the blog, and it reuses the blog prose styles (.lp-blog-body) so the
// reading measure, headings, and links match the rest of the site instead of
// growing a second prose dialect.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <IslandHeader pinnedMode="light" />
      <main id="main">
        <article className="mx-auto max-w-2xl px-5 pt-24 pb-20">
          <nav className="mb-8 text-sm text-[var(--stage-fg-subtle)]">
            <Link href="/" className="hover:text-[var(--brand)]">
              Home
            </Link>
          </nav>
          <h1 className="text-4xl font-normal leading-tight tracking-tight text-[var(--stage-fg)]">
            {title}
          </h1>
          <p className="mt-4 text-sm text-[var(--stage-fg-subtle)]">
            Last updated {updated}
          </p>
          <div className="lp-blog-body mt-10">{children}</div>
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}
