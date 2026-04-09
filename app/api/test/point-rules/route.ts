import { NextRequest, NextResponse } from 'next/server';
import { 
  createPointRule, 
  listPointRules, 
  updatePointRule, 
  togglePointRuleEnabled, 
  duplicatePointRule 
} from '@/server/services/point-rule.service';
import { PointsType, Frequency } from '@prisma/client';

// GET 测试 listPointRules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const familyId = searchParams.get('familyId') || 'default-family-id';
    
    const result = await listPointRules({
      familyId,
      page: 1,
      pageSize: 10,
    });
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST 测试 createPointRule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const rule = await createPointRule({
      name: body.name || 'Test Rule',
      description: body.description || 'Test description',
      category: body.category || 'test',
      pointsType: body.pointsType || PointsType.fixed,
      points: body.points || 10,
      frequency: body.frequency || Frequency.daily,
      familyId: body.familyId || 'default-family-id',
      ...body,
    });
    
    return NextResponse.json({ success: true, data: rule, action: 'create' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PATCH 测试 updatePointRule 和 togglePointRuleEnabled
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const ruleId = searchParams.get('id') || '';
    const familyId = searchParams.get('familyId') || 'default-family-id';
    
    if (action === 'toggle') {
      const rule = await togglePointRuleEnabled(ruleId, familyId);
      return NextResponse.json({ success: true, data: rule, action: 'toggle' });
    }
    
    if (action === 'duplicate') {
      const rule = await duplicatePointRule(ruleId, familyId);
      return NextResponse.json({ success: true, data: rule, action: 'duplicate' });
    }
    
    // 默认 update
    const body = await request.json();
    const rule = await updatePointRule(ruleId, body);
    return NextResponse.json({ success: true, data: rule, action: 'update' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
