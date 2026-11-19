import Image from "next/image";
import Link from "next/link";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";

// The public repo, matching every other GitHub link on the site. This used to
// point at getbindu/shelley, which is the private application repo, so the one
// GitHub link on the public /verify page was the one that 404s for a visitor.
const GITHUB_URL = "https://github.com/GetBindu/Bindu";

/**
 * Compact site footer used by surfaces that aren't full marketing pages
 * (currently the public /verify page). Uses the same `.site-foot-compact`
 * class tree as the kit; styles ship via globals.css → bindu-product.css
 * and are available everywhere without an explicit stylesheet import.
 *
 * Internal links use next/link so chrome stays in the SPA shell. GitHub is
 * external and opens in a new tab.
 */
export function SiteFootCompact({ version }: { version?: string }) {
  return (
    <footer className="site-foot-compact">
      <Link className="foot-brand" href="/">
        <span className="mark">
          {/* The logo is the only content of this home link, so it must carry
              the link's accessible name; an empty alt would leave the link
              unnamed. Decorative logo marks inside diagrams stay alt="". */}
          <Image src="/bindu-logo.png" alt="Bindu" width={22} height={22} />
        </span>
        {version && (
          <>
            <span className="sep" />
            <span className="foot-tag">{version}</span>
          </>
        )}
      </Link>
      <nav className="foot-links" aria-label="Site">
        <Link href="/">Platform</Link>
        <Link href="/cbam">CBAM</Link>
        {/* External so the SPA shell hands off to the Go backend's Scalar docs
            page via the /api/:path* rewrite, same target as both full footers. */}
        <a href="/api/v1/docs" target="_blank" rel="noopener noreferrer">
          API docs ↗
        </a>
        <DemoCtaLink source="verify-footer">{DEMO_CTA_LABEL}</DemoCtaLink>
        {/* The repo is the agent layer, not this compliance platform; named
            in the title for parity with the header and footer badges. No star
            count here, so nothing reads as product proof. */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Bindu agent layer on GitHub"
        >
          GitHub ↗
        </a>
      </nav>
      {/* No status claim here: this footer renders on public/marketing
          surfaces that don't poll the backend. The live status dot lives
          in the console footer (AppFooter), wired to /health/ready. */}
      <div className="foot-meta">
        <span>© {new Date().getFullYear()} GetBindu</span>
      </div>
    </footer>
  );
}
