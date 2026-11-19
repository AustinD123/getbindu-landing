import type { Metadata } from "next";
import Link from "next/link";
import { metadata as rootMetadata } from "@/app/root-metadata";
import { LegalPage } from "@/features/landing/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Bindu, the trade-compliance software operated by The73 B.V.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  // Spread the root openGraph (type/siteName/locale/images) and add only og:url,
  // which the root default omits. og:title and og:description fall back to this
  // page's own title/description, so nothing is duplicated or left to drift.
  openGraph: { ...rootMetadata.openGraph, url: "/terms" },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="24 August 2026">
      <p>
        These terms are an agreement between you and The73 B.V. (&quot;Bindu&quot;,
        &quot;we&quot;, &quot;us&quot;), the company that operates the Bindu
        service at getbindu.com and app.getbindu.com. By creating an account or
        using the service, you accept these terms. If you are using Bindu for an
        organisation, you accept them on that organisation&apos;s behalf.
      </p>

      <h2>1. The service</h2>
      <p>
        Bindu is trade-compliance software. It helps you describe what you ship,
        collect the evidence a regulation asks for, and assemble the artifact
        that satisfies it, such as an EU Deforestation Regulation due-diligence
        statement, a product passport, or an HS classification memo. We add and
        change features over time.
      </p>

      <h2>2. Compliance outputs are not legal advice</h2>
      <p>
        Bindu is a tool, not a law firm or a customs broker. Classifications,
        applicability results, checklists, and assembled filings are provided to
        help you meet your obligations, but they are not legal, customs, or tax
        advice, and they do not guarantee acceptance by any authority. You are
        responsible for reviewing every output and for the accuracy of what you
        file. Where the stakes warrant it, consult a qualified professional.
      </p>

      <h2>3. Your account</h2>
      <p>
        You must give accurate information and keep it up to date. You are
        responsible for activity under your account and for keeping your
        credentials safe. Tell us promptly at raahul@getbindu.com if you believe
        your account has been used without your permission. One account is for
        one person; do not share credentials.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>break the law, or use Bindu to help someone else break it;</li>
        <li>
          upload content you have no right to share, or that infringes another
          party&apos;s rights;
        </li>
        <li>
          probe, scrape, overload, or interfere with the service or the
          infrastructure behind it;
        </li>
        <li>
          try to access another customer&apos;s data, or defeat the isolation
          between workspaces.
        </li>
      </ul>

      <h2>5. Your content</h2>
      <p>
        The documents and data you upload remain yours. You grant us the limited
        rights we need to host and process that content in order to provide the
        service to you, and nothing more. How we handle personal data is set out
        in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. Your business content stays
        scoped
        to your workspace; we do not sell it, and we do not share it with other
        customers.
      </p>

      <h2>6. Availability and changes</h2>
      <p>
        We work to keep Bindu available and reliable, but we do not promise it
        will be uninterrupted or error-free. We may change, suspend, or retire
        features, and we may schedule maintenance. When a change materially
        reduces the service, we will make a reasonable effort to let you know.
      </p>

      <h2>7. Fees</h2>
      <p>
        Some features are free and some are paid. Where a feature is paid, its
        price and terms are shown before you buy. Paid amounts are stated
        exclusive of VAT unless noted otherwise.
      </p>

      <h2>8. Termination</h2>
      <p>
        You may stop using Bindu and close your account at any time. We may
        suspend or close an account that breaks these terms or that poses a risk
        to the service or to other customers. On closure you can request an
        export of your data as described in the Privacy Policy, subject to any
        record we must keep by law.
      </p>

      <h2>9. Warranties and liability</h2>
      <p>
        The service is provided &quot;as is&quot; and &quot;as available&quot;,
        without warranties of any kind except those that cannot be excluded by
        law. To the extent the law allows, we are not liable for indirect or
        consequential loss, for lost profits or data, or for a filing being
        rejected by an authority. Where we are found liable, our total liability
        is limited to the amount you paid us for the service in the twelve months
        before the event that gave rise to the claim. Nothing here limits
        liability that cannot be limited by law.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the law of the Netherlands. Disputes will be
        brought before the competent court in the Netherlands, unless mandatory
        consumer law gives you another forum.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms. When we make a material change, we will update
        the date above and, where appropriate, tell you in the product or by
        email. Continuing to use Bindu after a change means you accept the
        updated terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        The73 B.V., The Stack - Jacob Bontiusplaats 9, 1018 LL Amsterdam, The Netherlands. Chamber of
        Commerce (KvK) 92797911. Questions about these terms:{" "}
        <a href="mailto:raahul@getbindu.com">raahul@getbindu.com</a>.
      </p>
    </LegalPage>
  );
}
