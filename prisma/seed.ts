import { PrismaClient, Role, PointsType, Frequency, PetStage } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding: start');

  
  // 1.1) Admin (system)
  const sysFamily = await prisma.family.upsert({ where: { id: 'system-family-id' }, update: {}, create: { id: 'system-family-id', name: 'System' } });
  const adminName = process.env.ADMIN_NAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const existingAdmin = await prisma.user.findFirst({ where: { name: adminName } });
  if(!existingAdmin){
    await prisma.user.create({ data: { name: adminName, role: Role.admin, password: adminPass, familyId: sysFamily.id } });
  } else if(existingAdmin.role !== Role.admin){
    await prisma.user.update({ where: { id: existingAdmin.id }, data: { role: Role.admin, familyId: sysFamily.id, password: adminPass } });
  }
  // 1) Family
  const family = await prisma.family.upsert({
    where: { id: 'default-family-id' },
    update: {},
    create: { id: 'default-family-id', name: 'My Family' },
  });
  console.log('Family:', family.name);
  // 2) Parent + Children
  const existingParent = await prisma.user.findFirst({ where: { name: 'parent' } });
  const parent = existingParent
    ? await prisma.user.update({ where: { id: existingParent.id }, data: { familyId: family.id, role: Role.parent, password: 'parent123' } })
    : await prisma.user.create({ data: { name: 'parent', role: Role.parent, password: 'parent123', familyId: family.id } });

  const existingChild1 = await prisma.user.findFirst({ where: { name: 'child1' } });
  const child1 = existingChild1
    ? await prisma.user.update({ where: { id: existingChild1.id }, data: { familyId: family.id, role: Role.child, pin: '1234' } })
    : await prisma.user.create({ data: { name: 'child1', role: Role.child, pin: '1234', familyId: family.id } });

  const existingChild2 = await prisma.user.findFirst({ where: { name: 'child2' } });
  const child2 = existingChild2
    ? await prisma.user.update({ where: { id: existingChild2.id }, data: { familyId: family.id, role: Role.child, pin: '5678' } })
    : await prisma.user.create({ data: { name: 'child2', role: Role.child, pin: '5678', familyId: family.id } });

  console.log('Users: parent, child1, child2');

  // 3) Point accounts
  for (const c of [child1, child2]) {
    await prisma.pointAccount.upsert({
      where: { childId: c.id },
      update: {},
      create: { childId: c.id, balance: 50 },
    });
  }
  console.log('Accounts: initialized with 50 points each');

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
  console.log('Pets: created for child1 & child2');

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
  console.log('Rules: upserted');

  console.log('\nSeed complete. Login accounts:');
  console.log('  Parent: parent / parent123');
  console.log('  Child1: child1 / PIN 1234');
  console.log('  Child2: child2 / PIN 5678');
}

main()
  .catch((e) => { console.error('Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });


