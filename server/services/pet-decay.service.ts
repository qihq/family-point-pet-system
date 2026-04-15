import { PrismaClient, PetStatus, PetAction } from '@prisma/client';

const prisma = new PrismaClient();

// Default hourly decay configuration
const DECAY_CONFIG = {
  hunger: 2,       // -2 per hour
  thirst: 3,       // -3 per hour
  cleanliness: 1,  // -1 per hour
  mood: 1,         // -1 per hour
  health: {
    threshold: 30, // when any vital < 30, health starts to drop
    decayRate: 5,  // -5 per hour when below threshold
  },
} as const;

export type DecaySummary = {
  decayed: boolean;
  hoursPassed: number;
  changes?: { hunger: number; thirst: number; cleanliness: number; mood: number; health: number };
};

function clamp(v: number, min = 0, max = 100) { return Math.max(min, Math.min(max, v)); }
function hoursBetween(a: Date, b: Date) {
  return Math.max(0, Math.floor((b.getTime() - a.getTime()) / 3600000));
}

export function getDecayConfig() { return { ...DECAY_CONFIG }; }
export function updateDecayConfig(config: Partial<typeof DECAY_CONFIG>) {
  const next: any = { ...DECAY_CONFIG };
  for (const k of Object.keys(config)) {
    // @ts-ignore
    if (k === 'health' && config.health) next.health = { ...DECAY_CONFIG.health, ...config.health };
    // @ts-ignore
    else if (k in DECAY_CONFIG) next[k] = (config as any)[k];
  }
  // @ts-ignore - mutate constants in module scope intentionally
  (DECAY_CONFIG as any).hunger = next.hunger;
  // @ts-ignore
  (DECAY_CONFIG as any).thirst = next.thirst;
  // @ts-ignore
  (DECAY_CONFIG as any).cleanliness = next.cleanliness;
  // @ts-ignore
  (DECAY_CONFIG as any).mood = next.mood;
  // @ts-ignore
  (DECAY_CONFIG as any).health = next.health;
}

export async function applyPetDecay(petId: string): Promise<DecaySummary & { pet?: any }> {
  const pet = await prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) throw new Error('宠物不存在');
  if (pet.status === PetStatus.dead) return { decayed: false, hoursPassed: 0, pet };

  const now = new Date();
  const last = pet.lastDecayAt || pet.updatedAt || pet.createdAt;
  const hours = hoursBetween(last, now);
  if (hours <= 0) return { decayed: false, hoursPassed: 0, pet };

  const cfg = DECAY_CONFIG;
  const hungerLoss = cfg.hunger * hours;
  const thirstLoss = cfg.thirst * hours;
  const cleanLoss = cfg.cleanliness * hours;
  const moodLoss = cfg.mood * hours;

  let newHunger = clamp(pet.hunger - hungerLoss);
  let newThirst = clamp(pet.thirst - thirstLoss);
  let newClean = clamp(pet.cleanliness - cleanLoss);
  let newMood = clamp(pet.mood - moodLoss);

  let healthLoss = 0;
  const belowThreshold = (newHunger < cfg.health.threshold) || (newThirst < cfg.health.threshold) || (newClean < cfg.health.threshold) || (newMood < cfg.health.threshold);
  if (belowThreshold) {
    healthLoss = cfg.health.decayRate * hours;
  }
  let newHealth = clamp(pet.health - healthLoss);
  let newStatus = newHealth <= 0 ? PetStatus.dead : pet.status;

  const updated = await prisma.pet.update({
    where: { id: pet.id },
    data: {
      hunger: newHunger,
      thirst: newThirst,
      cleanliness: newClean,
      mood: newMood,
      health: newHealth,
      status: newStatus,
      lastDecayAt: now,
    },
  });

  // Log decay (no points transaction)
  await prisma.petLog.create({
    data: {
      petId: pet.id,
      action: PetAction.decay,
      oldValue: undefined,
      newValue: undefined,
      pointsCost: 0,
      description: `系统衰减：${hours}h`,
    },
  });

  return {
    decayed: true,
    hoursPassed: hours,
    changes: { hunger: hungerLoss, thirst: thirstLoss, cleanliness: cleanLoss, mood: moodLoss, health: healthLoss },
    pet: updated,
  };
}

export async function applyDecayToAllPets() {
  const pets = await prisma.pet.findMany({ where: { status: PetStatus.alive }, select: { id: true } });
  const results: Array<{ petId: string; success: boolean; error?: string; data?: any }> = [];
  for (const p of pets) {
    try {
      const res = await applyPetDecay(p.id);
      results.push({ petId: p.id, success: true, data: res });
    } catch (e: any) {
      results.push({ petId: p.id, success: false, error: e.message || '操作失败' });
    }
  }
  return results;
}
