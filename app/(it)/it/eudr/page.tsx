import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentIT } from "@/features/landing/regulation/eudr-content.it";

export const metadata: Metadata = eudrMetadata(eudrContentIT);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentIT} />
      <EudrPage content={eudrContentIT} />
    </>
  );
}
