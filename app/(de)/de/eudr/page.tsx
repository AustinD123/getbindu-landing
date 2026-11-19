import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentDE } from "@/features/landing/regulation/eudr-content.de";

export const metadata: Metadata = eudrMetadata(eudrContentDE);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentDE} />
      <EudrPage content={eudrContentDE} />
    </>
  );
}
