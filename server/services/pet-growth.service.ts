import { PetStage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ensureChildInitialResources } from "@/server/services/child-init.service";

export type PetGrowthResult = {
  pet: {
    id: string;
    childId: string;
    level: number;
    exp: number;
    stage: PetStage;
    mood: number;
  };
  expGained: number;
  previousLevel: number;
  leveledUp: boolean;
  stageChanged: boolean;
};

function expNeededForLevel(level: number) {
  return Math.max(20, 50 * level);
}

function nextStageForLevel(level: number): PetStage {
  if (level >= 10) return PetStage.final;
  if (level >= 5) return PetStage.growth;
  if (level >= 2) return PetStage.baby;
  return PetStage.egg;
}

export async function applyTaskPetGrowth(args: {
  childId: string;
  points: number;
  moodDelta?: number;
}) {
  const points = Math.max(0, Math.floor(args.points));
  const expGained = Math.max(2, Math.min(36, Math.ceil(points / 5)));

  const { pet } = await ensureChildInitialResources(args.childId);
  const previousLevel = pet.level;
  const previousStage = pet.stage;

  let carryExp = pet.exp + expGained;
  let nextLevel = pet.level;
  while (carryExp >= expNeededForLevel(nextLevel)) {
    carryExp -= expNeededForLevel(nextLevel);
    nextLevel += 1;
  }

  const nextStage = nextStageForLevel(nextLevel);
  const nextMood = Math.max(0, Math.min(100, pet.mood + (args.moodDelta ?? 6)));

  const updated = await prisma.pet.update({
    where: { id: pet.id },
    data: {
      exp: carryExp,
      level: nextLevel,
      stage: nextStage,
      mood: nextMood,
    },
    select: {
      id: true,
      childId: true,
      level: true,
      exp: true,
      stage: true,
      mood: true,
    },
  });

  return {
    pet: updated,
    expGained,
    previousLevel,
    leveledUp: updated.level > previousLevel,
    stageChanged: updated.stage !== previousStage,
  } satisfies PetGrowthResult;
}
