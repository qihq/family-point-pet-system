import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import RecurringTasksManager from "@/components/parent/RecurringTasksManager";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getInitialTasks() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || (payload.role !== Role.parent && payload.role !== Role.admin)) {
    redirect("/login");
  }

  return prisma.recurringTask.findMany({
    where: { familyId: payload.familyId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function Page() {
  const initial = await getInitialTasks();

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pb-20 pt-4">
      <div className="mx-auto max-w-5xl">
        <RecurringTasksManager initial={initial.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))} />
      </div>
    </div>
  );
}
