import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, PetAction, TransactionType, SourceType } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

function clamp(n: number) { return Math.max(0, Math.min(100, n)); }

async function ensureAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false, status: 401, error: '未登录' } as const;
  const payload = await verifyToken(token);
  if (!payload) return { ok: false, status: 401, error: '登录已失效' } as const;
  return { ok: true, payload } as const;
}

async function deductPoints(childId: string, amount: number, description: string) {
  let account = await prisma.pointAccount.findUnique({ where: { childId } });
  if (!account) account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });
  if (amount <= 0) return { ok: true as const, account, tx: null };
  if (account.balance < amount) {
    // 积分不足：允许轻度照顾，不扣分
    return { ok: true as const, account, tx: null, freeCare: true as const, message: '积分不足，执行轻度照顾' };
  }
  const newBalance = account.balance - amount;
  const tx = await prisma.pointTransaction.create({
    data: { accountId: account.id, type: TransactionType.spend, amount, balanceAfter: newBalance, sourceType: SourceType.pet, description },
  });
  account = await prisma.pointAccount.update({ where: { id: account.id }, data: { balance: newBalance, totalSpent: (account.totalSpent || 0) + amount } });
  return { ok: true as const, account, tx };
}

async function addPetLog(petId: string, action: PetAction, oldValue?: number, newValue?: number, pointsCost?: number, description?: string) {
  await prisma.petLog.create({ data: { petId, action, oldValue, newValue, pointsCost, description: description || '' } });
}

export async function withAction(
  request: NextRequest,
  petId: string,
  action: 'feed' | 'water' | 'clean' | 'play',
) {
  const auth = await ensureAuth(request);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  const { payload } = auth;

  const pet = await prisma.pet.findUnique({ where: { id: petId }, include: { child: true } });
  if (!pet) return NextResponse.json({ success: false, error: '宠物不存在' }, { status: 404 });

  // 权限：孩子只能操作自己的；家长仅限本家庭；管理员放行
  if (payload.role === Role.child && pet.childId !== payload.userId) {
    return NextResponse.json({ success: false, error: '越权访问' }, { status: 403 });
  }
  if (payload.role === Role.parent && pet.child.familyId !== payload.familyId) {
    return NextResponse.json({ success: false, error: '越权访问' }, { status: 403 });
  }

  // 成本配置
  const { getCosts } = await import('@/lib/pet-config');
  const costs = await getCosts();
  const DESC: Record<typeof action, string> = { feed: '喂食', water: '喂水', clean: '清洁', play: '陪玩' } as const;

  const cost = costs[action] ?? 0;
  const spend = await deductPoints(pet.childId, cost, `宠物互动：${DESC[action]}`);

  // 状态与经验
  const now = new Date();
  let data: any = { totalCareCount: pet.totalCareCount + 1 };
  let oldVal: number | undefined; let newVal: number | undefined;
  let expDelta = 0;

  if (action === 'feed') { oldVal = pet.hunger; newVal = clamp(pet.hunger + 20); data.hunger = newVal; data.lastFedAt = now; expDelta = 2; }
  else if (action === 'water') { oldVal = pet.thirst; newVal = clamp(pet.thirst + 20); data.thirst = newVal; data.lastWateredAt = now; expDelta = 1; }
  else if (action === 'clean') { oldVal = pet.cleanliness; newVal = clamp(pet.cleanliness + 25); data.cleanliness = newVal; data.lastCleanedAt = now; expDelta = 3; }
  else if (action === 'play') { oldVal = pet.mood; newVal = clamp(pet.mood + 20); data.mood = newVal; data.lastPlayedAt = now; expDelta = 5; }

  const curExp = pet.exp + expDelta;
  let newLevel = pet.level;
  let carryExp = curExp;
  function needFor(l:number){ return Math.max(20, 50 * l); }
  while (carryExp >= needFor(newLevel)) { carryExp -= needFor(newLevel); newLevel++; }
  data.exp = carryExp; data.level = newLevel;
  if (newLevel >= 10) data.stage = 'final' as any; else if (newLevel >= 5) data.stage = 'growth' as any; else if (newLevel >= 2) data.stage = 'baby' as any;

  const updated = await prisma.pet.update({ where: { id: pet.id }, data });
  await addPetLog(pet.id, action as any, oldVal, newVal, cost, DESC[action]);

  const account = spend.account!;
  return NextResponse.json({ success: true, data: { pet: updated, account }, message: `${DESC[action]}成功` });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: false, error: '不支持的操作' }, { status: 405 });
}