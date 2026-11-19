import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentFR } from "@/features/landing/regulation/eudr-content.fr";

export const metadata: Metadata = eudrMetadata(eudrContentFR);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentFR} />
      <EudrPage content={eudrContentFR} />
    </>
  );
}
