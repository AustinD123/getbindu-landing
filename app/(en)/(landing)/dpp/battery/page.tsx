import type { Metadata } from "next";
import { DppBatteryPage, BATTERY_FAQ } from "@/features/landing/regulation/dpp-battery-page";
import { RegulationJsonLd } from "@/features/landing/seo/regulation-schema";

export const metadata: Metadata = {
  title: "Battery Passport (DPP): scope, data, and 2027 dates",
  description:
    "From 18 February 2027 every EV, LMT and industrial battery placed on the EU market needs a passport. The Annex XIII data, the access tiers, the dates.",
  openGraph: {
    title: "Battery Passport (DPP): scope, data, and 2027 dates",
    description:
      "The first Digital Product Passport to bind. Scope, Annex XIII data, recycled-content floors, and the dates, straight from Regulation (EU) 2023/1542.",
    url: "/dpp/battery",
    type: "website",
    images: [
      {
        url: "/images/dpp-battery-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Battery cells on a production line",
      },
    ],
  },
  alternates: {
    canonical: "/dpp/battery",
  },
};

export default function Page() {
  return (
    <>
      <RegulationJsonLd
        path="dpp/battery"
        headline="The Battery Passport: the first Digital Product Passport (DPP)"
        description="The EU Battery Passport under Regulation (EU) 2023/1542 Article 77: scope, the Annex XIII data buckets, recycled-content floors, and the 18 February 2027 date. The first Digital Product Passport (DPP) to become mandatory."
        image="/images/dpp-battery-hero.jpg"
        datePublished="2026-07-07"
        dateModified="2026-08-16"
        breadcrumb={[
          // /dpp redirects here, so the Battery Passport IS the DPP hub: a
          // single crumb, not a parent + child that resolve to the same URL.
          { name: "Battery Passport", path: "dpp/battery" },
        ]}
        faq={BATTERY_FAQ}
      />
      <DppBatteryPage />
    </>
  );
}
