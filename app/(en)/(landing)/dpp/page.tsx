import { redirect } from "next/navigation";

// The DPP framework overview was retired. The Textile Passport is the default
// DPP surface (2026-08-17): it is the vertical actually shipped, so /dpp
// forwards to it. The other verticals live at /dpp/{battery,others}.
export default function Page() {
  redirect("/dpp/textiles");
}
