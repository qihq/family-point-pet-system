import fs from 'fs/promises';
import path from 'path';

export type PetActionCost = { feed: number; water: number; clean: number; play: number };
const DEFAULT_COSTS: PetActionCost = {
  feed: Number(process.env.PET_COST_FEED ?? 5),
  water: Number(process.env.PET_COST_WATER ?? 3),
  clean: Number(process.env.PET_COST_CLEAN ?? 2),
  play: Number(process.env.PET_COST_PLAY ?? 1),
};

const FILE = path.join(process.cwd(), 'data', 'pet-config.json');

export async function getCosts(): Promise<PetActionCost> {
  try {
    const buf = await fs.readFile(FILE);
    const json = JSON.parse(buf.toString());
    return { ...DEFAULT_COSTS, ...json } as PetActionCost;
  } catch {
    return DEFAULT_COSTS;
  }
}

export async function saveCosts(costs: Partial<PetActionCost>) {
  const merged = { ...DEFAULT_COSTS, ...costs };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(merged, null, 2), 'utf8');
  return merged as PetActionCost;
}