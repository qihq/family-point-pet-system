import { PrismaClient, Role, PointsType, Frequency, PetStage } from "@prisma/client";
import { logger } from "../lib/logger";

const prisma = new PrismaClient();

function randomPin(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return String(n);
}

async function ensureSystemConfigTable() {
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "SystemConfig" (id SERIAL PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW())'
  );
}

async function isSeedCompleted(): Promise<boolean> {
  try {
    const rows = await prisma.$queryRawUnsafe<any[]>(
      'SELECT value FROM "SystemConfig" WHERE key = $1 LIMIT 1',
      'seed_completed'
    );
    return Array.isArray(rows) && rows.length > 0;
  } catch (e) {
    return false;
  }
}

async function markSeedCompleted() {
  await prisma.$executeRawUnsafe(
    'INSERT INTO "SystemConfig" (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
    'seed_completed',
    String(Date.now())
  );
}

async function main() {
  logger.info("Seeding: start");

  await ensureSystemConfigTable();
  if (await isSeedCompleted()) {
    logger.info("Seed already completed. Skipping.");
    return;
  }

  // 1.1) Admin (system)
  const sysFamily = await prisma.family.upsert({
    where: { id: 'system-family-id' },
    update: {},
    create: { id: 'system-family-id', name: 'System' },
  });
  const adminName = process.env.ADMIN_NAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const existingAdmin = await prisma.user.findFirst({ where: { name: adminName } });
  if (!existingAdmin) {
    await prisma.user.create({ data: { name: adminName, role: Role.admin, password: adminPass, familyId: sysFamily.id } });
  } else if (existingAdmin.role !== Role.admin) {
    await prisma.user.update({ where: { id: existingAdmin.id }, data: { role: Role.admin, familyId: sysFamily.id, password: adminPass } });
  }

  // 1) Family
  const family = await prisma.family.upsert({
    where: { id: 'default-family-id' },
    update: {},
    create: { id: 'default-family-id', name: 'My Family' },
  });
  logger.info('Family:', family.name);

  // 2) Parent + Children (random 6-digit PINs for children)
  const existingParent = await prisma.user.findFirst({ where: { name: 'parent' } });
  const parent = existingParent
    ? await prisma.user.update({ where: { id: existingParent.id }, data: { familyId: family.id, role: Role.parent, password: 'parent123' } })
    : await prisma.user.create({ data: { name: 'parent', role: Role.parent, password: 'parent123', familyId: family.id } });

  const pin1 = randomPin();
  const pin2 = randomPin();

  const existingChild1 = await prisma.user.findFirst({ where: { name: 'child1' } });
  const child1 = existingChild1
    ? await prisma.user.update({ where: { id: existingChild1.id }, data: { familyId: family.id, role: Role.child, pin: pin1 } })
    : await prisma.user.create({ data: { name: 'child1', role: Role.child, pin: pin1, familyId: family.id } });

  const existingChild2 = await prisma.user.findFirst({ where: { name: 'child2' } });
  const child2 = existingChild2
    ? await prisma.user.update({ where: { id: existingChild2.id }, data: { familyId: family.id, role: Role.child, pin: pin2 } })
    : await prisma.user.create({ data: { name: 'child2', role: Role.child, pin: pin2, familyId: family.id } });

  logger.info('Users: parent, child1, child2');

  // 3) Point accounts
  for (const c of [child1, child2]) {
    await prisma.pointAccount.upsert({
      where: { childId: c.id },
      update: {},
      create: { childId: c.id, balance: 50 },
    });
  }
  logger.info('Accounts: initialized with 50 points each');

  // 4) Pets
  for (const c of [child1, child2]) {
    await prisma.pet.upsert({
      where: { childId: c.id },
      update: {},
      create: {
        childId: c.id,
        name: c.name === 'child1' ? '小火' : '小蜥',
        stage: PetStage.baby,
        level: 1,
        exp: 0,
        hunger: 80,
        thirst: 80,
        cleanliness: 80,
        mood: 80,
        health: 100,
      },
    });
  }
  logger.info('Pets: created for child1 & child2');

  // 5) Point rules (examples)
  const rules = [
    { id: 'rule-brush-teeth', name: '刷牙', description: '早晚刷牙各一次', category: '自理', points: 5, needApproval: false, frequency: Frequency.daily },
    { id: 'rule-tidy-toys', name: '收拾玩具', description: '整理玩具与书桌', category: '家务', points: 10, needApproval: true, frequency: Frequency.daily },
    { id: 'rule-reading', name: '阅读', description: '阅读 20 分钟', category: '学习', points: 15, needApproval: false, frequency: Frequency.daily },
    { id: 'rule-early-sleep', name: '早睡', description: '22:00 前入睡', category: '自理', points: 10, needApproval: true, frequency: Frequency.daily },
  ];
  for (const r of rules) {
    await prisma.pointRule.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description, category: r.category, points: r.points, needApproval: r.needApproval, frequency: r.frequency },
      create: { ...r, pointsType: PointsType.fixed, enabled: true, familyId: family.id },
    });
  }
  logger.info('Rules: upserted');

  // One-time credentials banner
  logger.info('=== FIRST RUN CREDENTIALS ===');
  logger.info(`Admin: ${adminName} / ${adminPass}`);
  logger.info('Parent: parent / parent123');
  logger.info(`Child1: child1 / PIN ${pin1}`);
  logger.info(`Child2: child2 / PIN ${pin2}`);
  logger.info('=== FIRST RUN CREDENTIALS ===');

  await markSeedCompleted();
  logger.info('Seed complete.');
}

main()
  .catch((e) => {
    logger.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// codex-ok: 2026-04-13T09:47:50+08:00