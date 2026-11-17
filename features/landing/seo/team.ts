/**
 * Team members credited on knowledge-base articles. Single source of truth
 * for the visible byline, the per-article "About the author" block, the
 * author page at /blog/authors/<slug>, and the Person JSON-LD (with a profile
 * URL / @id resolving to that author page) that strengthens E-E-A-T signals.
 *
 * Adding a new author: add an entry here. The byline, the about block, the
 * author page (generateStaticParams over TEAM), and the JSON-LD all read from
 * this record via its `slug`.
 */

export type TeamMember = {
  /** URL-safe id used as the author key / JSON-LD reference suffix. */
  slug: string;
  name: string;
  jobTitle: string;
  /** One-sentence credibility line (Person.description in JSON-LD). */
  bio: string;
  /** Initials for the byline avatar circle (fallback when `avatar` is unset). */
  initials: string;
  /** Portrait photo, a path under /public (e.g. "/images/team/<slug>.jpg").
   *  Rendered in place of the initials circle on the byline, the about block,
   *  and the author page, and emitted as Person.image in JSON-LD. */
  avatar?: string;
  /** Optional contact — rendered as a mailto byline link + Person.email. */
  email?: string;
  /** Topical expertise — emitted as Person.knowsAbout in JSON-LD. AI engines
   *  use this to resolve "who is the authority on CBAM?" queries to the
   *  named team member behind those articles. */
  knowsAbout: string[];
};

export const TEAM: Record<string, TeamMember> = {
  "raahul-dutta": {
    slug: "raahul-dutta",
    name: "Raahul Dutta",
    jobTitle: "Founder",
    bio: "Founder of Bindu, the trade-compliance OS that turns shipment documents into EUDR, CBAM, and Digital Product Passport filings.",
    initials: "RD",
    avatar: "/images/team/raahul-dutta.jpg",
    email: "raahul@getbindu.com",
    knowsAbout: [
      "EU Deforestation Regulation",
      "EUDR Due Diligence Statement",
      "Carbon Border Adjustment Mechanism",
      "Digital Product Passport",
      "EU customs and trade compliance",
    ],
  },
};

export function getTeamMember(slug: string): TeamMember {
  const member = TEAM[slug];
  if (!member) throw new Error(`Unknown team member slug: ${slug}`);
  return member;
}

export const SITE_URL = "https://getbindu.com";
