import type { Metadata } from "next";
import { EudrPage } from "@/features/landing/regulation/eudr-page";
import {
  eudrMetadata,
  EudrJsonLd,
} from "@/features/landing/regulation/eudr-route";
import { eudrContentES } from "@/features/landing/regulation/eudr-content.es";

export const metadata: Metadata = eudrMetadata(eudrContentES);

export default function Page() {
  return (
    <>
      <EudrJsonLd content={eudrContentES} />
      <EudrPage content={eudrContentES} />
    </>
  );
}
