import { PetStage, PetStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { addPetLog } from './pet.service';

export async function getEvolutionProgress(petId: string) {
  const pet = await prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) throw new Error('宠物不存在');
  if (pet.stage === PetStage.final) return { stage: pet.stage, isFinal: true, progress: 100 };
  const config = EVOLUTION_CONFIG[pet.stage];
  if (!config || !config.nextStage) return { stage: pet.stage, isFinal: true, progress: 100 };
  const levelProgress = Math.min(100, (pet.level / config.minLevel) * 100);
  const expProgress = Math.min(100, (pet.exp / config.minExp) * 100);
  const careProgress = Math.min(100, (pet.totalCareCount / config.minCareCount) * 100);
  const overallProgress = Math.floor((levelProgress + expProgress + careProgress) / 3);
  return { stage: pet.stage, nextStage: config.nextStage, isFinal: false, progress: overallProgress };
}

export async function tryEvolve(petId: string) {
  const pet = await prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) throw new Error('宠物不存在');
  if (pet.status === PetStatus.dead) return { canEvolve: false, reason: '宠物已死亡', pet };
  if (pet.stage === PetStage.final) return { canEvolve: false, reason: '已是最终阶段', pet };

  const config = EVOLUTION_CONFIG[pet.stage];
  if (!config || !config.nextStage) return { canEvolve: false, reason: '不可进化', pet };

  const checks = {
    level: pet.level >= config.minLevel,
    exp: pet.exp >= config.minExp,
    careCount: pet.totalCareCount >= config.minCareCount,
  };
  const canEvolve = checks.level && checks.exp && checks.careCount;
  if (!canEvolve) return { canEvolve: false, reason: '条件未满足', requirements: checks, pet } as any;

  const updatedPet = await prisma.pet.update({ where: { id: petId }, data: { stage: config.nextStage } });
  await addPetLog(petId, 'evolve' as any, '进化成功');
  return { canEvolve: true, pet: updatedPet };
}

const EVOLUTION_CONFIG: Record<PetStage, { nextStage?: PetStage; minLevel: number; minExp: number; minCareCount: number }> = {
  [PetStage.egg]: { nextStage: PetStage.baby, minLevel: 1, minExp: 0, minCareCount: 0 },
  [PetStage.baby]: { nextStage: PetStage.growth, minLevel: 3, minExp: 100, minCareCount: 10 },
  [PetStage.growth]: { nextStage: PetStage.final, minLevel: 5, minExp: 300, minCareCount: 24 },
  [PetStage.final]: { minLevel: 0, minExp: 0, minCareCount: 0 },
};

export function getEvolutionConfig(){
  return { ...EVOLUTION_CONFIG };
}

export async function checkPetEvolution(petId: string){
  return tryEvolve(petId);
}
