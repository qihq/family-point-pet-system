import { NextRequest, NextResponse } from 'next/server';
import { ensureChildInitialResources, ensureFamilyChildrenResources } from '@/server/services/child-init.service';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    if (action === 'family') {
      const results = await ensureFamilyChildrenResources(body.familyId || 'default-family-id');
      return NextResponse.json({ success: true, data: results, action: 'family' });
    }

    // 默认单个孩子初始化
    const result = await ensureChildInitialResources(body.childId || 'child-2-id');
    return NextResponse.json({ success: true, data: result, action: 'single' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
