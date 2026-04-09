"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Category = "study" | "exercise" | "chore" | string;

function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function endOfDay(d: Date) { const x = new Date(d); x.setHours(23,59,59,999); return x; }
function isYesterday(last: Date | null, now = new Date()) {
  if (!last) return false; const a = startOfDay(last); const b = startOfDay(now);
  return Math.floor((b.getTime() - a.getTime())/86400000) === 1;
}
function isToday(last: Date | null, now = new Date()) {
  if (!last) return false; return startOfDay(last).getTime() === startOfDay(now).getTime();
}
function weekendMultiplier(date = new Date()) { const d = date.getDay(); return (d===0 || d===6) ? 1.5 : 1.0; }
function streakMultiplier(n: number) { if(n>=30) return 2.0; if(n>=7) return 1.5; if(n>=3) return 1.2; return 1.0; }
function roundPoints(n: number){ return Math.max(0, Math.round(n)); }
function catTag(category?: Category){ return category ? `category=${category}` : ""; }
async function ensurePointAccount(childId: string){ let acc = await prisma.pointAccount.findUnique({ where:{ childId }}); if(!acc) acc = await prisma.pointAccount.create({ data:{ childId, balance: 0 } }); return acc; }

// Internal helpers used by exported functions
async function _checkComboBonus(args: { childId: string; date?: Date }): Promise<{ applied: boolean; bonus?: number }>{
  const now = args.date ? new Date(args.date) : new Date();
  const s = startOfDay(now), e = endOfDay(now);
  const [logs, existingCombo] = await Promise.all([
    prisma.taskLog.findMany({ where: { childId: args.childId, createdAt: { gte: s, lte: e } }, select: { note: true } }),
    prisma.taskLog.findFirst({ where: { childId: args.childId, createdAt: { gte: s, lte: e }, note: { contains: "combo-bonus" } } }),
  ]);
  if (existingCombo) return { applied: false };
  const has = (cat: string) => logs.some(l => (l.note || "").includes(`category=${cat}`));
  const ok = has("study") && has("exercise") && has("chore");
  if (!ok) return { applied: false };
  const bonus = 20;
  await prisma.$transaction(async (tx) => {
    await tx.taskLog.create({ data: { childId: args.childId, points: bonus, note: "combo-bonus", createdAt: now } });
    await tx.user.update({ where: { id: args.childId }, data: { totalEarnedPoints: { increment: bonus } } });
    await tx.pointAccount.update({ where: { childId: args.childId }, data: { balance: { increment: bonus }, totalEarned: { increment: bonus } } });
  });
  return { applied: true, bonus };
}
async function _checkLevelUp(args: { childId: string }): Promise<{ level: number }>{
  const child = await prisma.user.findUnique({ where: { id: args.childId }, select: { totalEarnedPoints: true, level: true } });
  if (!child) throw new Error("孩子不存在");
  const t = child.totalEarnedPoints || 0; const ths = [100,300,600,1000];
  let target = 1; for(const th of ths){ if(t>=th) target++; }
  if (target !== child.level) await prisma.user.update({ where:{ id: args.childId }, data:{ level: target } });
  return { level: target };
}

export async function completeTask(args: { childId: string; taskPlanId?: string; basePoints?: number; category?: Category; note?: string; when?: Date; }): Promise<{ points: number; appliedMultipliers: { streak: number; weekend: number; first: number }; comboApplied: boolean; newLevel: number; }>{
  const now = args.when ? new Date(args.when) : new Date();
  const child = await prisma.user.findUnique({ where: { id: args.childId } }); if(!child) throw new Error('孩子不存在');
  const base = await (async()=>{ if(typeof args.basePoints==='number') return args.basePoints; if(args.taskPlanId){ const tp = await prisma.taskPlan.findUnique({ where:{ id: args.taskPlanId }}); if(tp) return tp.points; } return 0; })();
  const streakBefore = isYesterday(child.lastCheckIn, now) ? child.streak : (isToday(child.lastCheckIn, now) ? child.streak : 0);
  const mStreak = streakMultiplier(streakBefore); const mWeekend = weekendMultiplier(now);
  let mFirst = 1.0; if(args.taskPlanId){ const first = await prisma.taskLog.findFirst({ where:{ childId: args.childId, taskPlanId: args.taskPlanId }, select:{ id:true }}); if(!first) mFirst = 2.0; }
  const gained = roundPoints(base * mStreak * mWeekend * mFirst);

  await prisma.$transaction(async (tx)=>{
    await ensurePointAccount(args.childId);
    const noteParts = [ catTag(args.category), `base=${base}`, `streakMul=${mStreak}`, `weekendMul=${mWeekend}`, `firstMul=${mFirst}` ].filter(Boolean);
    if(args.note) noteParts.push(args.note);
    await tx.taskLog.create({ data:{ childId: args.childId, taskPlanId: args.taskPlanId, points: gained, note: noteParts.join(';'), createdAt: now } });
    let newStreak = 1; if(isToday(child.lastCheckIn, now)) newStreak = child.streak; else if(isYesterday(child.lastCheckIn, now)) newStreak = child.streak + 1; else newStreak = 1;
    await tx.user.update({ where:{ id: args.childId }, data:{ totalEarnedPoints: (child.totalEarnedPoints||0)+gained, lastCheckIn: now, streak: newStreak } });
    await tx.pointAccount.update({ where:{ childId: args.childId }, data:{ balance: { increment: gained }, totalEarned: { increment: gained } } });
  });

  const combo = await _checkComboBonus({ childId: args.childId, date: now });
  const lvl = await _checkLevelUp({ childId: args.childId });
  return { points: gained, appliedMultipliers: { streak: mStreak, weekend: mWeekend, first: mFirst }, comboApplied: combo.applied, newLevel: lvl.level };
}

export async function deductPoints(args: { childId: string; amount: number; reason?: string; when?: Date }): Promise<{ deducted: number; balance?: number }>{
  const now = args.when ? new Date(args.when) : new Date(); if(args.amount<=0) return { deducted: 0 };
  const s = startOfDay(now), e = endOfDay(now);
  const [account, agg] = await Promise.all([
    ensurePointAccount(args.childId),
    prisma.taskLog.aggregate({ where:{ childId: args.childId, createdAt:{ gte: s, lte: e }, points:{ gt: 0 } }, _sum:{ points:true } })
  ]);
  const earnedToday = agg._sum.points || 0; const maxDeduct = Math.floor(earnedToday*0.1);
  const want = Math.min(args.amount, maxDeduct, account.balance); if(want<=0) return { deducted: 0 };
  await prisma.$transaction(async (tx)=>{
    await tx.pointAccount.update({ where:{ childId: args.childId }, data:{ balance:{ decrement: want }, totalSpent:{ increment: want } } });
    await tx.taskLog.create({ data:{ childId: args.childId, points: -want, note: ('deduct=' + String(want) + ';' + (args.reason || '')).trim(), createdAt: now } });
  });
  const after = await prisma.pointAccount.findUnique({ where:{ childId: args.childId }, select:{ balance:true } });
  return { deducted: want, balance: after?.balance ?? 0 };
}

export async function checkComboBonus(args: { childId: string; date?: Date }): Promise<{ applied: boolean; bonus?: number }>{ return _checkComboBonus(args); }
export async function checkLevelUp(args: { childId: string }): Promise<{ level: number }>{ return _checkLevelUp(args); }

export async function getWeeklyCalendar(args: { childId: string; weekStart?: Date | string }): Promise<{ weekStart: string; days: Array<{ date: string; count: number; points: number }> }>{
  const base = args.weekStart ? new Date(args.weekStart) : new Date();
  const weekday = ((base.getDay()+6)%7); const ws = startOfDay(new Date(base.getFullYear(), base.getMonth(), base.getDate()-weekday)); const we = endOfDay(new Date(ws.getFullYear(), ws.getMonth(), ws.getDate()+6));
  const logs = await prisma.taskLog.findMany({ where:{ childId: args.childId, createdAt:{ gte: ws, lte: we } }, select:{ createdAt:true, points:true }, orderBy:{ createdAt: 'asc' } });
  const days: Array<{ date: string; count: number; points: number }> = [];
  for(let i=0;i<7;i++){ const d=new Date(ws); d.setDate(ws.getDate()+i); const key=d.toISOString().slice(0,10); days.push({ date:key, count:0, points:0 }); }
  for(const l of logs){ const key = l.createdAt.toISOString().slice(0,10); const slot = days.find(x=>x.date===key)!; slot.count+=1; slot.points += l.points || 0; }
  return { weekStart: days[0].date, days };
}
