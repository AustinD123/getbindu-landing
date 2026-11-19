import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentEN } from "@/features/landing/regulation/eudr-content";

export const metadata: Metadata = eudrMetadata(eudrContentEN);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentEN} />
      <EudrPage content={eudrContentEN} />
    </>
  );
}
