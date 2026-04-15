import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "connected", ts: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { status: "degraded", db: "error", ts: Date.now() },
      { status: 503 }
    );
  }
}

// codex-ok: 2026-04-10T10:10:00+08:00