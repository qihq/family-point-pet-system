import { promises as fs } from "node:fs";
import { extname, join } from "node:path";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPin, requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function ensureChildScope(request: NextRequest, childId: string) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return auth;

  const child = await prisma.user.findFirst({
    where: {
      id: childId,
      role: Role.child,
      familyId: auth.payload.role === Role.admin ? undefined : auth.payload.familyId,
    },
    select: { id: true, familyId: true },
  });
  if (!child) {
    return { ok: false as const, status: 404, error: "孩子不存在" };
  }
  return { ok: true as const, payload: auth.payload, child };
}

async function saveAvatar(childId: string, avatarFile?: File | null, avatarBase64?: string) {
  if (!avatarFile && !avatarBase64) return null;

  let buffer: Buffer;
  let ext = ".png";
  if (avatarFile) {
    buffer = Buffer.from(await avatarFile.arrayBuffer());
    ext = (extname(avatarFile.name) || ".png").toLowerCase();
  } else {
    const match = avatarBase64?.match(/^data:(.*?);base64,(.*)$/);
    const mime = match?.[1] || "";
    const base64 = match?.[2] || avatarBase64 || "";
    if (mime.includes("jpeg") || mime.includes("jpg")) ext = ".jpg";
    if (mime.includes("webp")) ext = ".webp";
    buffer = Buffer.from(base64, "base64");
  }

  const dir = join(process.cwd(), "public", "uploads", "avatars");
  await fs.mkdir(dir, { recursive: true });
  const filename = `${childId}${ext}`;
  await fs.writeFile(join(dir, filename), buffer);
  return `/uploads/avatars/${filename}`;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureChildScope(request, params.id);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, avatarUrl: true, familyId: true },
  });
  return NextResponse.json({ success: true, data: user });
}

async function updateChild(request: NextRequest, id: string) {
  const auth = await ensureChildScope(request, id);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const contentType = request.headers.get("content-type") || "";
  let name: string | undefined;
  let pin: string | undefined;
  let avatarFile: File | null = null;
  let avatarBase64: string | undefined;

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    name = form.get("name") ? String(form.get("name")) : undefined;
    pin = form.get("pin") ? String(form.get("pin")) : undefined;
    avatarFile = form.get("avatar") instanceof File ? (form.get("avatar") as File) : null;
    avatarBase64 = form.get("avatarBase64") ? String(form.get("avatarBase64")) : undefined;
  } else {
    const body = await request.json().catch(() => ({}));
    name = body.name != null ? String(body.name) : undefined;
    pin = body.pin != null ? String(body.pin) : undefined;
    avatarBase64 = body.avatarBase64 != null ? String(body.avatarBase64) : undefined;
  }

  const data: { name?: string; pin?: string | null; avatarUrl?: string | null } = {};
  if (name !== undefined) data.name = name.trim();
  if (pin !== undefined) data.pin = pin.trim() ? hashPin(pin.trim()) : null;

  const avatarUrl = await saveAvatar(id, avatarFile, avatarBase64);
  if (avatarUrl) data.avatarUrl = avatarUrl;

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, avatarUrl: true },
  });
  return NextResponse.json({ success: true, data: updated });
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  return updateChild(request, context.params.id);
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  return updateChild(request, context.params.id);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureChildScope(request, params.id);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  await prisma.user.update({
    where: { id: params.id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
