import type { Metadata } from "next";
import {
  BlogIndexPage,
  blogIndexMetadata,
} from "@/features/landing/blog/blog-index-page";

export const metadata: Metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
