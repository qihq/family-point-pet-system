import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ensureChildInitialResources(childId: string) {
  let account = await prisma.pointAccount.findUnique({ where: { childId } });
  if (!account) account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });
  let pet = await prisma.pet.findUnique({ where: { childId } });
  if (!pet) pet = await prisma.pet.create({ data: { childId, name: '小暖暖' } as any });
  return { account, pet };
}

export async function ensureFamilyChildrenResources(familyId: string) {
  const children = await prisma.user.findMany({ where: { familyId, role: 'child' as any } });
  const results = [] as Array<{ childId: string; accountId: string; petId: string }>;
  for (const child of children) {
    const { account, pet } = await ensureChildInitialResources(child.id);
    results.push({ childId: child.id, accountId: account.id, petId: pet.id });
  }
  return results;
}
