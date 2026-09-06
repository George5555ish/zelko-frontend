import { redirect } from "next/navigation";

/** Canonical outfits URL — dashboard reads ?view=outfits. */
export default function DashboardOutfitsPage() {
  redirect("/dashboard?view=outfits");
}
