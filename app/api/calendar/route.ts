import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token); if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });
  // 允许家长与孩子，都只读自己的家庭数据
  const url = new URL(request.url); const from = new Date(url.searchParams.get('from')||''); const to = new Date(url.searchParams.get('to')||'');
  if(!(from instanceof Date) || isNaN(+from) || !(to instanceof Date) || isNaN(+to)) return NextResponse.json({ success:false, error:'参数错误' }, { status:400 });
  const children = await prisma.user.findMany({ where:{ familyId: payload.familyId, role: Role.child }, select:{ id:true, name:true } });
  const ruleMap = await prisma.pointRule.findMany({ where:{ familyId: payload.familyId, enabled: true }, select:{ id:true, name:true, points:true } });
  const row = await prisma.pointRecord.findMany({ where:{ childId:{ in: children.map(c=>c.id) }, createdAt:{ gte: from, lte: to } }, select:{ id:true, createdAt:true, points:true, pointRuleId:true } });
  const rules = new Map(ruleMap.map(r=>[r.id,r] as const));
  const data = row.map(r=>({ id:r.id, date:r.createdAt, title: rules.get(r.pointRuleId)?.name||'未知', points: r.points||0, duration: 30 }));
  return NextResponse.json({ success:true, data });
}
