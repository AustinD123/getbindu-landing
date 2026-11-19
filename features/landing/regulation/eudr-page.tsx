import { IslandHeader } from "../chrome/island-header";
import { LandingFooter } from "../chrome/landing-footer";
import { RegHero } from "./reg-hero";
import { RegulationPrice } from "../pricing/regulation-price";
import { RegulationFaq } from "./regulation-faq";
import { RegBlogBand } from "./reg-blog-band";
import { LanguageSwitcher } from "./language-switcher";
import { renderRich } from "./eudr-rich";
import { type EudrContent, eudrContentEN } from "./eudr-content";
import {
  EudrProblem,
  EudrJourney,
  EudrChain,
  EudrScan,
  EudrFlag,
  EudrCalendar,
  EudrDeeper,
  EudrClose,
} from "./eudr-story";

export function EudrPage({
  content = eudrContentEN,
}: {
  content?: EudrContent;
}) {
  return (
    <div className="lp-page lp-os-page">
      {/* The header is a sibling of <main>, not a child of it. It used to be
          nested inside, which left the page with the banner landmark buried in
          the main landmark, no main landmark to skip to, and nothing for a
          skip link to target. Its fixed chrome still clears the z-index:1
          slabs: landing.css exempts `.lp-os-page > .lp-nav` explicitly. */}
      <IslandHeader
        active="eudr"
        leftSlot={<LanguageSwitcher current={content.lang} />}
      />
      <main id="main">
        <RegHero
          active="eudr"
          showHeader={false}
          label={content.hero.label}
          code={content.hero.code}
          title={content.hero.title}
          cta={content.hero.cta}
          /* The secondary door is an in-page anchor, not a second booking link.
             It used to read "Walk through an EUDR filing" and open the same
             cal.com page as the button beside it: two labels, one destination,
             and the label promised a product walkthrough the click did not
             deliver. It now points at the act that shows the five screens, and
             every locale gets it rather than English alone. */
          secondaryCta={{
            label: content.hero.ctaSecondary,
            href: "#journey",
            event: {
              name: "journey_cta_click",
              props: { regulation: "EUDR", source: "eudr-pillar" },
            },
          }}
          poster="/images/eudr-forest-hero.webp"
          video="/videos/eudr-forest-hero.webm"
          sub={renderRich(content.hero.sub)}
        />

        {/* Narrative order: stakes → the shape of the risk → the solution →
            logistics → the deadline. The risk model (Scan: which origins are
            risky; Flag: what a satellite alert means) is explained BEFORE the
            five-screen filing, matching the product's own loop — screen risk,
            then file — rather than showing the solution before the reader
            knows what the law actually asks of them. */}
        <EudrProblem content={content.problem} />
        <EudrScan content={content.scan} />
        <EudrFlag content={content.flag} />
        <EudrJourney content={content.journey} />
        <EudrChain content={content.chain} />
        <EudrCalendar content={content.calendar} />
        {/* Deep-dive index (hub → spoke internal links) sits BEFORE the close,
            so the Book-a-demo close is the page's ending — matching the spoke
            pages, where SpokeRelated links precede SpokeClose. */}
        {content.deeper ? <EudrDeeper content={content.deeper} /> : null}
        {/* Blog band sits between the spoke index and the FAQ, before the
            locked FAQ → pricing → close tail. Gated to English: the blog
            corpus is English-only, so localized pages skip it rather than
            show English cards. */}
        {content.lang === "en" ? <RegBlogBand reg="eudr" /> : null}
        {/* Order is FAQ → pricing → demo close, uniform across every
            regulation page: answer the objections, then show the number,
            then ask for the demo. */}
        {/* The same eight answers the FAQPage schema emits, rendered for
            people. They used to exist only in the script tag. */}
        <RegulationFaq
          ariaLabel={content.faqBand.ariaLabel}
          heading={content.faqBand.heading}
          items={content.seo.jsonLd.faq}
        />
        <RegulationPrice
          reg="eudr"
          heading={content.pricing?.heading ?? "What an EUDR dossier costs."}
          strings={content.pricing}
        />
        <EudrClose content={content.close} />
      </main>

      <LandingFooter />
    </div>
  );
}
