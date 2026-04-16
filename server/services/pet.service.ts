import { PetAction, PetStatus, PetStage } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function addPetLog(
  petId: string,
  action: PetAction,
  description: string,
  oldValue?: number,
  newValue?: number,
  pointsCost?: number,
) {
  await prisma.petLog.create({ data: { petId, action, description, oldValue, newValue, pointsCost } });
}

export function clampValue(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function calculateDecay(lastDecayAt: Date, decayRate: number): number {
  const now = new Date();
  const hours = (now.getTime() - lastDecayAt.getTime()) / 3600000;
  return decayRate * hours;
}

export async function revivePetByChildId(childId: string) {
  const pet = await prisma.pet.findUnique({ where: { childId } });
  if (!pet) throw new Error('宠物不存在');
  if (pet.status !== PetStatus.dead) throw new Error('宠物未死亡');

  const revived = await prisma.pet.update({
    where: { childId },
    data: {
      status: PetStatus.alive,
      health: 50,
      hunger: 50,
      thirst: 50,
      cleanliness: 50,
      mood: 50,
      stage: PetStage.baby,
      level: 1,
      exp: 0,
      totalCareCount: 0,
      lastDecayAt: new Date(),
    },
  });
  await addPetLog(pet.id, PetAction.revive, '复活宠物');
  return revived;
}

// --- Test helpers expected by app/api/test/pet/route.ts ---
export async function getPetByChildId(childId: string){
  const pet = await prisma.pet.findUnique({ where: { childId } });
  if (!pet) throw new Error('宠物不存在');
  return pet;
}

export async function resetPet(childId: string, overrides: Partial<{ name: string; health: number; hunger: number; thirst: number; cleanliness: number; mood: number }>) {
  const pet = await prisma.pet.findUnique({ where: { childId } });
  if (!pet) throw new Error('宠物不存在');
  const updated = await prisma.pet.update({ where: { childId }, data: { ...overrides } });
  await addPetLog(updated.id, PetAction.play, '测试-重置宠物');
  return updated;
}

async function updateStat(childId: string, field: keyof Pick<Awaited<ReturnType<typeof getPetByChildId>>, 'hunger'|'thirst'|'cleanliness'|'mood'>, delta: number, action: PetAction, desc: string){
  const pet = await getPetByChildId(childId);
  const oldVal = pet[field] as unknown as number;
  const newVal = clampValue(oldVal + delta);
  const updated = await prisma.pet.update({ where: { id: pet.id }, data: { [field]: newVal, totalCareCount: pet.totalCareCount + 1 } as any });
  await addPetLog(pet.id, action, desc, oldVal, newVal, 0);
  return updated;
}

export async function feedPet(childId: string){ return updateStat(childId, 'hunger', 20, PetAction.feed, '测试-喂食'); }
export async function waterPet(childId: string){ return updateStat(childId, 'thirst', 20, PetAction.water, '测试-喂水'); }
export async function cleanPet(childId: string){ return updateStat(childId, 'cleanliness', 25, PetAction.clean, '测试-清洁'); }
export async function playWithPet(childId: string){ return updateStat(childId, 'mood', 20, PetAction.play, '测试-陪玩'); }
