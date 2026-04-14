import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function contentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

export async function GET(_req: NextRequest, ctx: { params: { path?: string[] } }) {
  const parts = ctx.params?.path || [];
  const base = path.join(process.cwd(), "public", "uploads");
  const joined = path.join(base, ...parts);
  // Prevent path traversal
  if (!joined.startsWith(base)) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  try {
    const data = await fs.readFile(joined);
    const headers = new Headers({
      "Content-Type": contentType(joined),
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    return new NextResponse(data, { status: 200, headers });
  } catch {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}

// codex-ok: 2026-04-14T11:12:00+08:00