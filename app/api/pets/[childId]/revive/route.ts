import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, { params }: { params: { childId: string } }){
  try{
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
    const payload = token ? (await verifyToken(token)) : null;
    if(!payload) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });

    const { childId } = params;
    let pet = await prisma.pet.findFirst({ where:{ childId } });
    if(!pet) pet = await prisma.pet.create({ data:{ childId, name:'小暖暖' } as any });

    // 复活：恢复部分状态
    pet = await prisma.pet.update({ where:{ id: pet.id }, data:{ status: 'alive' as any, health: 60, hunger: 50, thirst: 50, cleanliness: 50, mood: 60 } });
    return NextResponse.json({ success:true, data:{ pet } });
  }catch(e:any){
    return NextResponse.json({ success:false, error: e.message||'复活失败' }, { status:500 });
  }
}