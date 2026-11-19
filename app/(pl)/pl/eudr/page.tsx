import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentPL } from "@/features/landing/regulation/eudr-content.pl";

export const metadata: Metadata = eudrMetadata(eudrContentPL);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentPL} />
      <EudrPage content={eudrContentPL} />
    </>
  );
}
