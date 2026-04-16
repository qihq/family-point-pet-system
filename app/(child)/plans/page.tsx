import { redirect } from "next/navigation";

export default function LegacyPlansPage() {
  redirect("/child/plans");
}
