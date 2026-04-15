import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, Frequency } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  return { ok: true as const, payload };
}

export async function PATCH(request: NextRequest, { params }:{ params:{ id:string } }){
  try{
    const auth = await ensureAuth(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const { payload } = auth;
    const id = params.id;
    const task = await prisma.taskPlan.findUnique({ where:{ id }, include:{ child:true } });
    if(!task) return NextResponse.json({ success:false, error:'任务不存在' }, { status:404 });
    if(payload.role !== Role.admin && task.child.familyId !== payload.familyId){
      return NextResponse.json({ success:false, error:'越权操作' }, { status:403 });
    }
    const body = await request.json().catch(()=>({}));
    const data: any = {};
    if(body.title !== undefined) data.title = String(body.title||'').trim();
    if(body.description !== undefined) data.description = (body.description||'')||null;
    if(body.points !== undefined) data.points = Number(body.points||0);
    if(body.scheduledAt !== undefined) data.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null;
    if(body.dueAt !== undefined) data.dueAt = body.dueAt ? new Date(body.dueAt) : null;
    if(body.frequency !== undefined){ const v=String(body.frequency||'').toLowerCase(); if(["daily","weekly","monthly","once","unlimited"].includes(v)){ (data as any).frequency = v as any; } }
    
    if(body.category !== undefined) data.category = body.category || null;
    if(body.durationMin !== undefined) data.durationMin = (body.durationMin===null||body.durationMin==='')? null : Number(body.durationMin);
    if(body.needApproval !== undefined) data.needApproval = !!body.needApproval;
    if(body.enabled !== undefined) data.enabled = !!body.enabled;
    if(Object.keys(data).length===0){ return NextResponse.json({ success:false, error:'无更新字段' }, { status:400 }); }
    const updated = await prisma.taskPlan.update({ where:{ id }, data });
    return NextResponse.json({ success:true, data: updated });
  }catch(e:any){
    return NextResponse.json({ success:false, error: e.message||'服务器错误' }, { status:500 });
  }
}

export async function DELETE(request: NextRequest, { params }:{ params:{ id:string } }){
  try{
    const auth = await ensureAuth(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const { payload } = auth;
    const id = params.id;
    const task = await prisma.taskPlan.findUnique({ where:{ id }, include:{ child:true } });
    if(!task) return NextResponse.json({ success:false, error:'任务不存在' }, { status:404 });
    if(payload.role !== Role.admin && task.child.familyId !== payload.familyId){
      return NextResponse.json({ success:false, error:'越权操作' }, { status:403 });
    }
    const updated = await prisma.taskPlan.update({ where:{ id }, data:{ enabled:false } });
    return NextResponse.json({ success:true, data: updated });
  }catch(e:any){
    return NextResponse.json({ success:false, error: e.message||'服务器错误' }, { status:500 });
  }
}
// codex-ok: 2026-04-13T10:36:49+08:00
