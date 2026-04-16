import { writeFile, mkdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function avatarFilename(id: string, ext: string) {
  return `/uploads/avatars/${id}${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRequestAuth(request, [Role.admin]);
    if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "缺少文件" }, { status: 400 });
    }

    const ext = (extname(file.name) || ".png").toLowerCase().replace(/[^.a-z0-9]/g, "");
    const url = avatarFilename(auth.payload.userId, ext);
    const target = join(process.cwd(), "public", url.replace(/^\//, ""));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await file.arrayBuffer()));

    await prisma.user.update({
      where: { id: auth.payload.userId },
      data: { avatarUrl: url },
    });

    return NextResponse.json({ success: true, data: { url } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}
