import { NextRequest } from 'next/server';

import { withAction } from '@/server/services/pet-actions-lite';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { childId: string } }){
  const { childId } = params;
  let pet = await prisma.pet.findFirst({ where: { childId } });
  if(!pet) pet = await prisma.pet.create({ data: { childId, name: '小暖暖' } as any });
  return withAction(request, pet.id, 'feed');
}