import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function Home() {
  const token = cookies().get("token")?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    redirect("/login");
  }
  if (payload.role === "parent") {
    redirect("/parent");
  }
  if (payload.role === "child") {
    redirect("/child");
  }
  redirect("/admin");
}
