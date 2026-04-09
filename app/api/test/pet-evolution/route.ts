import { NextRequest, NextResponse } from 'next/server';
import { checkPetEvolution, getEvolutionProgress, getEvolutionConfig } from '@/server/services/pet-evolution.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const petId = searchParams.get('petId');

    if (!petId) {
      // 返回进化配置
      const config = getEvolutionConfig();
      return NextResponse.json({ success: true, data: config });
    }

    // 返回进化进度
    const progress = await getEvolutionProgress(petId);
    return NextResponse.json({ success: true, data: progress });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await checkPetEvolution(body.petId);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
