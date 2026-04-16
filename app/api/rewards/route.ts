import { access, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function rewardImageUrl(id: string, current?: string | null) {
  if (current) return current;

  const base = join(process.cwd(), "public", "uploads", "rewards");
  for (const ext of [".png", ".jpg"]) {
    const candidate = join(base, `${id}${ext}`);
    try {
      await access(candidate);
      return `/${relative(join(process.cwd(), "public"), candidate).replace(/\\/g, "/")}`;
    } catch {}
  }

  try {
    const files = await readdir(base);
    const found = files.find((file) => file.startsWith(`${id}-`) && (file.endsWith(".png") || file.endsWith(".jpg")));
    return found ? `/uploads/rewards/${found}` : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const items = await prisma.rewardItem.findMany({
    where: {
      familyId: auth.payload.familyId,
      enabled: auth.payload.role === Role.child ? true : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  const data = await Promise.all(items.map(async (item) => ({ ...item, imageUrl: await rewardImageUrl(item.id, item.imageUrl) })));
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const cost = Number(body.cost || 0);
  const stock = body.stock == null || body.stock === "" ? null : Number(body.stock);

  if (!name || cost <= 0) {
    return NextResponse.json({ success: false, error: "invalid_name_or_cost" }, { status: 400 });
  }

  const created = await prisma.rewardItem.create({
    data: {
      familyId: auth.payload.familyId,
      name,
      description: body.description ?? null,
      cost,
      stock,
      enabled: body.enabled !== false,
    },
  });
  return NextResponse.json({ success: true, data: created });
}
