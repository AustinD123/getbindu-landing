import type { Metadata } from "next";
import { metadata as rootMetadata } from "@/app/root-metadata";
import { LegalPage } from "@/features/landing/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bindu, operated by The73 B.V., collects, uses, and protects personal data. EU-hosted and workspace-scoped by default.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  // Spread the root openGraph (type/siteName/locale/images) and add only og:url,
  // which the root default omits. og:title and og:description fall back to this
  // page's own title/description, so nothing is duplicated or left to drift.
  openGraph: { ...rootMetadata.openGraph, url: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="24 August 2026">
      <p>
        This policy explains how The73 B.V. (&quot;Bindu&quot;, &quot;we&quot;,
        &quot;us&quot;) handles personal data when you use the Bindu service at
        getbindu.com and app.getbindu.com. The73 B.V. is the data controller.
      </p>

      <h2>1. Who we are</h2>
      <p>
        The73 B.V., The Stack - Jacob Bontiusplaats 9, 1018 LL Amsterdam, The Netherlands. Chamber of
        Commerce (KvK) 92797911. For any privacy question, contact{" "}
        <a href="mailto:raahul@getbindu.com">raahul@getbindu.com</a>.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> your name, work email, a hashed
          password, and a record of the consents you gave (with the version, the
          time, and the IP address at the moment of consent).
        </li>
        <li>
          <strong>Workspace and company data:</strong> the legal-entity and
          identity details you register for a workspace, and the documents and
          data you upload to work on your filings.
        </li>
        <li>
          <strong>Usage data:</strong> basic product-analytics events and
          technical logs that tell us how the service is used and help us keep it
          working.
        </li>
        <li>
          <strong>Communications:</strong> the emails and messages you exchange
          with us.
        </li>
      </ul>

      <h2>3. How we use it, and our legal basis</h2>
      <ul>
        <li>
          To provide the service and your account, and to verify your email at
          sign-up. Basis: performance of our contract with you.
        </li>
        <li>
          To keep the service secure, prevent abuse, and meet our own legal
          obligations. Basis: legitimate interest and legal obligation.
        </li>
        <li>
          To send product updates, if and only if you opted in. Basis: your
          consent, which you can withdraw at any time.
        </li>
      </ul>
      <p>
        We use automated, machine-assisted extraction and classification to help
        turn your uploaded documents into structured data. A result is a draft
        for you to confirm; it does not make a decision about you on its own.
      </p>

      <h2>4. Who we share it with</h2>
      <p>
        We do not sell your data. Your business content stays scoped to your
        workspace and is not shared with other customers. We use a small set of
        service providers to run Bindu, such as hosting, transactional email,
        and product analytics, each bound by a data-processing agreement. We may
        disclose data where the law requires it. The current list of these
        providers is available on request at{" "}
        <a href="mailto:raahul@getbindu.com">raahul@getbindu.com</a>.
      </p>

      <h2>5. Where your data lives</h2>
      <p>
        Bindu is EU-hosted, and we work to keep personal data processed within
        the European Union. Where a processor operates outside the EU, we rely on
        an approved transfer mechanism, such as the European Commission&apos;s
        standard contractual clauses.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep account and workspace data for as long as your account is active,
        and for a reasonable period afterwards to meet legal, accounting, and
        security needs. You can ask us to delete data sooner, subject to any
        record we must keep by law.
      </p>

      <h2>7. How we protect it</h2>
      <p>
        Passwords are stored only as a salted hash, never in the clear. Sessions
        use a signed, http-only cookie. Every query is scoped to a workspace, so
        one customer&apos;s data is isolated from another&apos;s. We use
        encryption in transit and apply access controls to the systems that hold
        your data.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Under the GDPR you can ask to access, correct, delete, or export your
        personal data, object to or restrict certain processing, and withdraw a
        consent you gave. To exercise a right, email{" "}
        <a href="mailto:raahul@getbindu.com">raahul@getbindu.com</a>. You also have
        the right to complain to a supervisory authority. In the Netherlands that
        is the Autoriteit Persoonsgegevens.
      </p>

      <h2>9. Cookies</h2>
      <p>
        We use a small number of cookies to run the site and, with your consent,
        to measure usage. You choose your preferences in the cookie banner, and
        you can change them at any time from the cookie settings on the site.
      </p>

      <h2>10. Children</h2>
      <p>
        Bindu is a business tool and is not intended for anyone under 16. We do
        not knowingly collect data from children.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy. When we make a material change, we will update
        the date above and, where appropriate, tell you in the product or by
        email.
      </p>

      <h2>12. Contact</h2>
      <p>
        The73 B.V., The Stack - Jacob Bontiusplaats 9, 1018 LL Amsterdam, The Netherlands.{" "}
        <a href="mailto:raahul@getbindu.com">raahul@getbindu.com</a>.
      </p>
    </LegalPage>
  );
}
