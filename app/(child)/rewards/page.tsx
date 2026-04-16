import { redirect } from "next/navigation";

export default function LegacyRewardsPage() {
  redirect("/child/rewards");
}
