import { NextRequest, NextResponse } from 'next/server';
import { getPetByChildId, addPetLog, resetPet, feedPet, waterPet, cleanPet, playWithPet } from '@/server/services/pet.service';
import { PetAction } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId') || 'child-1-id';
    
    const pet = await getPetByChildId(childId);
    return NextResponse.json({ success: true, data: pet });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    if (action === 'reset') {
      const pet = await resetPet(body.childId || 'child-1-id', {
        name: body.name,
        health: body.health,
        hunger: body.hunger,
        thirst: body.thirst,
        cleanliness: body.cleanliness,
        mood: body.mood,
      });
      return NextResponse.json({ success: true, data: pet, action: 'reset' });
    }

    if (action === 'log') {
      const log = await addPetLog(
        body.petId,
        body.action || PetAction.play,
        body.description || 'Test log'
      );
      return NextResponse.json({ success: true, data: log, action: 'log' });
    }

    if (action === 'feed') {
      const result = await feedPet(body.childId || 'child-1-id');
      return NextResponse.json({ success: true, data: result, action: 'feed' });
    }

    if (action === 'water') {
      const result = await waterPet(body.childId || 'child-1-id');
      return NextResponse.json({ success: true, data: result, action: 'water' });
    }

    if (action === 'clean') {
      const result = await cleanPet(body.childId || 'child-1-id');
      return NextResponse.json({ success: true, data: result, action: 'clean' });
    }

    if (action === 'play') {
      const result = await playWithPet(body.childId || 'child-1-id');
      return NextResponse.json({ success: true, data: result, action: 'play' });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
