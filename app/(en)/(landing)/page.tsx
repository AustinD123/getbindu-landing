import { redirect } from "next/navigation";

/** The repo only holds the blog, so the site root goes straight to it. */
export default function Home() {
  redirect("/blog");
}
