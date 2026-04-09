import { NextRequest, NextResponse } from 'next/server';
import { submitPointRecord } from '@/server/services/point-record.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await submitPointRecord({
      childId: body.childId || 'child-1-id',
      pointRuleId: body.pointRuleId,
      description: body.description,
      submitNote: body.submitNote,
    });
    
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
