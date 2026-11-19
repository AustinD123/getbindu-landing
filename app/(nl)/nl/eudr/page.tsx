import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentNL } from "@/features/landing/regulation/eudr-content.nl";

export const metadata: Metadata = eudrMetadata(eudrContentNL);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentNL} />
      <EudrPage content={eudrContentNL} />
    </>
  );
}
