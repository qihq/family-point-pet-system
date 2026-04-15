import { PrismaClient, TransactionType, SourceType } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAccount(childId: string) {
  let account = await prisma.pointAccount.findUnique({ where: { childId } });
  if (!account) account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });
  return account;
}

export async function earnPoints(args: { childId: string; amount: number; sourceType: SourceType; description: string }) {
  const { childId, amount, sourceType, description } = args;
  if (amount <= 0) throw new Error('入账积分必须大于 0');
  const account = await getAccount(childId);
  const newBalance = account.balance + amount;
  const tx = await prisma.pointTransaction.create({
    data: {
      accountId: account.id,
      type: TransactionType.earn,
      amount,
      balanceAfter: newBalance,
      sourceType,
      description,
    },
  });
  const updated = await prisma.pointAccount.update({
    where: { id: account.id },
    data: { balance: newBalance, totalEarned: account.totalEarned + amount },
  });
  return { balance: updated.balance, transaction: tx };
}

export async function spendPoints(args: { childId: string; amount: number; sourceType: SourceType; description: string }) {
  const { childId, amount, sourceType, description } = args;
  if (amount <= 0) throw new Error('扣减积分必须大于 0');
  const account = await getAccount(childId);
  if (account.balance < amount) throw new Error('积分不足');
  const newBalance = account.balance - amount;
  const tx = await prisma.pointTransaction.create({
    data: {
      accountId: account.id,
      type: TransactionType.spend,
      amount,
      balanceAfter: newBalance,
      sourceType,
      description,
    },
  });
  const updated = await prisma.pointAccount.update({
    where: { id: account.id },
    data: { balance: newBalance, totalSpent: account.totalSpent + amount },
  });
  return { balance: updated.balance, transaction: tx };
}

export const getPointAccount = getAccount;
