import { NextRequest, NextResponse } from 'next/server';
import { earnPoints, spendPoints, getPointAccount } from '@/server/services/points.service';
import { SourceType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    if (action === 'earn') {
      const result = await earnPoints({
        childId: body.childId || 'child-1-id',
        amount: body.amount || 50,
        sourceType: body.sourceType || SourceType.manual,
        description: body.description || '手动加分',
      });
      return NextResponse.json({ ...result, action: 'earn' });
    }

    if (action === 'spend') {
      const result = await spendPoints({
        childId: body.childId || 'child-1-id',
        amount: body.amount || 20,
        sourceType: body.sourceType || SourceType.pet,
        description: body.description || '宠物消费',
      });
      return NextResponse.json({ ...result, action: 'spend' });
    }

    return NextResponse.json({ success: false, error: '未知操作' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId') || 'child-1-id';
    
    const account = await getPointAccount(childId);
    return NextResponse.json({ success: true, data: account });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
