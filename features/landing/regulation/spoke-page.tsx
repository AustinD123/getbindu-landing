/**
 * SpokePage — the shell every regulation spoke is built from.
 *
 * A spoke is a reference page: /eudr/deadlines, /eudr/geolocation,
 * /eudr/commodities/coffee. It answers one question precisely and links back to
 * its hub. Presentation rules live in spoke.css; this file is the composition.
 *
 * Server component by design — no "use client", no GSAP, no film. Everything a
 * reader (or a crawler, or an AI engine) needs is in the first server response.
 * The masthead, the ivory weld, the accent, the container and the ink bookend
 * are the hub's, so the page reads as a sibling of /eudr rather than as
 * documentation parked next to it.
 *
 * The composition is built from internal building blocks (SpokeShell,
 * SpokeMasthead, SpokeRelated, SpokeClose) so the middle band can be swapped
 * for pages whose body is not a prose stack.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { IslandHeader, type NavId } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { DemoCtaLink } from "../demo-cta-link";
import { DEMO_CTA_LABEL } from "@/lib/demo-url";
import type { FaqItem } from "../seo/regulation-schema";
import { RegSpine } from "./reg-spine";
import { RegulationFaq } from "./regulation-faq";
import "./spoke.css";

/**
 * Default supporting line under the closer's one action. EUDR-shaped, because
 * six of the seven spokes are EUDR; any page whose subject is not a supply
 * chain of commodities and origins passes its own `close.demoNote`.
 */
const DEFAULT_DEMO_NOTE =
  "Thirty minutes on your own supply chain, with your own commodities and origins.";

/** A hop in the visible breadcrumb. The last hop renders as the current page. */
export type SpokeCrumb = { label: string; href?: string };

/** A row in the vertical date rail. `hard` marks a binding date. */
export type SpokeTimelineRow = { date: string; event: ReactNode; hard?: boolean };

export type SpokeSection = { heading: string; body: ReactNode };

export type SpokeSource = { label: string; href: string };

/** A card in the ivory related band, or an entry in the rail's sibling list. */
export type SpokeLink = { label: string; href: string; note?: string };

export type SpokeShellProps = {
  active: NavId;
  children: ReactNode;
  /** Cards in the ivory band above the bookend. */
  related: { heading: string; links: SpokeLink[] };
  /**
   * The ink bookend. `subtitle` is one sentence. `secondary` is the sibling
   * page this one hands off to; it is rendered as a card in the related band
   * above, not as a second panel in the closer. `demoNote` is the supporting
   * line under the one action, and defaults to the EUDR wording, so a page
   * about batteries or carbon must pass its own.
   */
  close: {
    title: string;
    subtitle: string;
    secondary: SpokeLink;
    demoNote?: string;
  };
};

export type SpokeMastheadProps = {
  crumbs: SpokeCrumb[];
  /** Mono stamp above the H1 — the instrument and article this page reads. */
  code: string;
  title: string;
  standfirst: ReactNode;
  /** Left cell of the hairline meta strip, e.g. "Regulation (EU) 2023/1115". */
  instrument: string;
  /** ISO-ish human date, e.g. "4 August 2026". */
  lastReviewed: string;
};

/** The article shape builds its own middle, so `children` is not accepted. */
export type SpokePageProps = Omit<SpokeShellProps, "children"> &
  SpokeMastheadProps & {
    /** Optional action band between the masthead and the body (e.g. the EUDR
     *  filing door on commodity spokes). */
    verdict?: ReactNode;
    /** Opening paragraph, set in the reading face. */
    lede: ReactNode;
    /** The editorial factbox pinned in the rail. */
    facts?: { title: string; items: string[] };
    /** Optional sibling list under the factbox. */
    railNav?: { title: string; links: SpokeLink[] };
    timeline?: { caption: string; rows: SpokeTimelineRow[] };
    sections: SpokeSection[];
    /**
     * The page's questions, rendered as a visible band between the body and
     * the Sources block. Pass the SAME array the route gives RegulationJsonLd:
     * these answers used to exist only as FAQPage structured data, so the page
     * shipped its objection handling to Google and not to the reader.
     */
    faq?: readonly FaqItem[];
    sources: SpokeSource[];
  };

/* -------------------------------------------------------------------------
 * Pieces
 * ----------------------------------------------------------------------- */

function SpokeMasthead({
  crumbs,
  code,
  title,
  standfirst,
  instrument,
  lastReviewed,
}: SpokeMastheadProps) {
  return (
    <div className="sp-mast-wrap">
      <div className="sp-mast">
        <div className="st-container">
          <nav aria-label="Breadcrumb" className="sp-crumbs">
            {crumbs.map((crumb, i) => (
              <span key={crumb.label}>
                {i > 0 ? (
                  <span aria-hidden="true" className="sp-crumbs-sep">
                    /{" "}
                  </span>
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <span className="sp-code">{code}</span>
          <h1 className="sp-title">{title}</h1>
          <p className="sp-standfirst">{standfirst}</p>
          <div className="sp-mast-meta">
            <span>
              Instrument <strong>{instrument}</strong>
            </span>
            <span>
              Reviewed <strong>{lastReviewed}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpokeTimeline({
  caption,
  rows,
}: {
  caption: string;
  rows: SpokeTimelineRow[];
}) {
  return (
    <div className="sp-timeline">
      {/* Visual spine (client island). The full text below is the source of
          truth and stays entirely in the server HTML for search; the spine is
          the at-a-glance overview that rolls to the entry you read or click. */}
      <RegSpine
        ariaLabel="Regulation deadline timeline"
        nodes={rows.map((row) => ({ label: row.date, hard: row.hard }))}
        targetPrefix="sp-tl-row-"
      />
      <div className="sp-tl-list">
        {rows.map((row, i) => (
          <div
            className={`sp-tl-row${row.hard ? " is-hard" : ""}`}
            id={`sp-tl-row-${i}`}
            key={row.date}
          >
            <span className="sp-tl-date">{row.date}</span>
            <p className="sp-tl-event">{row.event}</p>
          </div>
        ))}
      </div>
      <p className="sp-tl-caption">{caption}</p>
    </div>
  );
}

function SpokeSources({ sources }: { sources: SpokeSource[] }) {
  return (
    <ul className="sp-sources">
      {sources.map((source) => (
        <li key={source.href + source.label}>
          <a href={source.href} rel="noopener noreferrer" target="_blank">
            <span>{source.label}</span>
            <span aria-hidden="true" className="sp-sources-mark">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SpokeRelated({
  heading,
  links,
}: {
  heading: string;
  links: SpokeLink[];
}) {
  return (
    <div className="sp-related-wrap">
      <section aria-label={heading} className="sp-related">
        <div className="st-container">
          <p className="sp-related-head">{heading}</p>
          <div className="sp-related-grid">
            {links.map((link) => (
              <Link className="sp-related-card" href={link.href} key={link.href}>
                <span className="sp-related-name">{link.label}</span>
                {link.note ? (
                  <span className="sp-related-note">{link.note}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * The closer, with one action in it.
 *
 * It used to be a `.sp-close-grid` of two equally weighted panels, the second
 * of which sent the reader to a different regulation page. The reader who has
 * reached the closer is the most convertible visitor the page has, and half of
 * them were being handed a lateral link. The sibling link is not deleted, it
 * moves up into the related band in SpokeShell, which is where the spokes
 * already put lateral navigation.
 *
 * No new CSS: the single panel keeps `.sp-close-panel.is-primary` and simply
 * stops being wrapped in the two-column `.sp-close-grid`, so it lays out full
 * width on its own (`.sp-close-panel` is display:block).
 */
function SpokeClose({
  title,
  subtitle,
  demoNote = DEFAULT_DEMO_NOTE,
}: Omit<SpokeShellProps["close"], "secondary">) {
  return (
    <section aria-label="Book a demo" className="sp-close">
      <div className="st-container">
        <h2 className="sp-close-h2">{title}</h2>
        <p className="sp-close-sub">{subtitle}</p>
        <DemoCtaLink className="sp-close-panel is-primary" source="spoke-close">
          <h3>{DEMO_CTA_LABEL}</h3>
          <p>{demoNote}</p>
          <span aria-hidden="true" className="sp-close-arrow">
            →
          </span>
        </DemoCtaLink>
      </div>
    </section>
  );
}

/** Page chrome + the two closing bands. The middle is whatever you pass. */
function SpokeShell({ active, children, related, close }: SpokeShellProps) {
  // The closer's old second panel, demoted to a card in the related band.
  // Pages whose related band already carries that href (e.g. /cbam/software
  // links /cbam twice) keep the list they wrote.
  const relatedLinks = related.links.some(
    (link) => link.href === close.secondary.href
  )
    ? related.links
    : [...related.links, close.secondary];

  return (
    <div className="lp-page lp-os-page sp-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader active={active} pinnedMode="light" />
      <main id="main">
        {children}
        <SpokeRelated heading={related.heading} links={relatedLinks} />
        <SpokeClose
          demoNote={close.demoNote}
          subtitle={close.subtitle}
          title={close.title}
        />
      </main>
      <LandingFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * The default article shape
 * ----------------------------------------------------------------------- */

export function SpokePage({
  active,
  crumbs,
  code,
  title,
  standfirst,
  instrument,
  lastReviewed,
  verdict,
  lede,
  facts,
  railNav,
  timeline,
  sections,
  faq,
  sources,
  related,
  close,
}: SpokePageProps) {
  return (
    <SpokeShell active={active} close={close} related={related}>
      <SpokeMasthead
        code={code}
        crumbs={crumbs}
        instrument={instrument}
        lastReviewed={lastReviewed}
        standfirst={standfirst}
        title={title}
      />

      {verdict}

      <section aria-label={title} className="sp-body">
        <div className="st-container">
          <div className="sp-body-grid">
            <div>
              <p className="sp-lede">{lede}</p>

              {timeline ? <SpokeTimeline {...timeline} /> : null}

              {sections.map((section) => (
                <section className="sp-section" key={section.heading}>
                  <h2 className="sp-h2">{section.heading}</h2>
                  <div className="sp-prose">{section.body}</div>
                </section>
              ))}

              <section className="sp-section">
                <h2 className="sp-h2">Sources</h2>
                <SpokeSources sources={sources} />
              </section>
            </div>

            <aside className="sp-rail">
              {facts ? (
                <div className="sp-card">
                  <p className="sp-card-title">{facts.title}</p>
                  <ul className="sp-card-list">
                    {facts.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {railNav ? (
                <nav aria-label={railNav.title} className="sp-rail-nav">
                  <p className="sp-rail-nav-title">{railNav.title}</p>
                  <ul>
                    {railNav.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {/* The FAQ is the same full-width dark accordion band every hub page
          uses (RegulationFaq): one visible, styled FAQ treatment across the
          whole site rather than a plain in-column list on the spokes. The
          answers stay in the DOM whatever the open state, matching the schema
          the route emits. */}
      {faq && faq.length > 0 ? <RegulationFaq items={faq} /> : null}
    </SpokeShell>
  );
}
