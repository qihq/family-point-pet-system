import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { PetStage, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: { childId: string } }) {
  try {
    const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
    if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const childId = params.childId;
    if (auth.payload.role === Role.child && auth.payload.userId !== childId) {
      return NextResponse.json({ success: false, error: "越权操作" }, { status: 403 });
    }
    if (auth.payload.role === Role.parent) {
      const child = await prisma.user.findFirst({
        where: { id: childId, role: Role.child, familyId: auth.payload.familyId },
        select: { id: true },
      });
      if (!child) return NextResponse.json({ success: false, error: "越权操作" }, { status: 403 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "缺少文件" }, { status: 400 });
    }

    const url = `/uploads/pets/${childId}.glb`;
    const target = join(process.cwd(), "public", url.replace(/^\//, ""));
    await fs.mkdir(dirname(target), { recursive: true });
    await fs.writeFile(target, Buffer.from(await file.arrayBuffer()));

    await prisma.pet.upsert({
      where: { childId },
      create: { childId, name: "小暖暖", stage: PetStage.baby, modelUrl: url },
      update: { modelUrl: url },
    });

    return NextResponse.json({ success: true, data: { url } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "上传失败" }, { status: 500 });
  }
}
