import { NextRequest, NextResponse } from 'next/server';
import { applyPetDecay, applyDecayToAllPets, getDecayConfig } from '@/server/services/pet-decay.service';

export async function GET(request: NextRequest) {
  try {
    const config = getDecayConfig();
    return NextResponse.json({ success: true, data: config });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    if (action === 'all') {
      const results = await applyDecayToAllPets();
      return NextResponse.json({ success: true, data: results, action: 'all' });
    }

    // 默认单个宠物衰减
    const result = await applyPetDecay(body.petId);
    return NextResponse.json({ success: true, data: result, action: 'single' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
