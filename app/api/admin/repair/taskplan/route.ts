import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

function fixMojibake(s?: string | null){
  if(!s) return s||null;
  let out = s;
  // try unicode escapes
  out = out.replace(/\\u([0-9a-fA-F]{4})/g, (_,h)=> String.fromCharCode(parseInt(h,16)));
  // latin1->utf8 heuristic
  if(/[ÃÂ]/.test(out)){
    try{
      const buf = Buffer.from(out, 'latin1');
      const utf8 = buf.toString('utf8');
      if(/[\u4e00-\u9fff]/.test(utf8)) out = utf8;
    }catch{}
  }
  return out;
}

export async function POST(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token);
  if(!payload || payload.role !== 'admin') return NextResponse.json({ success:false, error:'需要管理员权限' }, { status:403 });
  const rows = await prisma.taskPlan.findMany({});
  let changed = 0;
  for(const r of rows){
    const title = fixMojibake(r.title||'')||'';
    const desc = fixMojibake(r.description||'');
    if(title !== r.title || desc !== (r.description||'')){
      await prisma.taskPlan.update({ where:{ id: r.id }, data:{ title, description: desc } });
      changed++;
    }
  }
  return NextResponse.json({ success:true, changed });
}

// codex-ok: 2026-04-14T12:41:00+08:00