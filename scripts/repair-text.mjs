import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function decodeUnicodeEscapes(s){
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_,h)=> String.fromCharCode(parseInt(h,16)));
}

function fixMojibake(s){
  if(!s) return s;
  let out = s;
  // try unicode escapes first
  if(/\\u[0-9a-fA-F]{4}/.test(out)) out = decodeUnicodeEscapes(out);
  // latin1->utf8 heuristic when contains typical mojibake markers
  if(/[ÃÂ]/.test(out)){
    try{
      const buf = Buffer.from(out, 'latin1');
      const utf8 = buf.toString('utf8');
      // only accept if it introduces visible CJK
      if(/[\u4e00-\u9fff]/.test(utf8)) out = utf8;
    }catch{}
  }
  return out;
}

async function repairPointRule(){
  const rows = await prisma.pointRule.findMany({});
  let changed = 0;
  for(const r of rows){
    const name = fixMojibake(r.name||'');
    const desc = fixMojibake(r.description||'');
    if(name !== r.name || desc !== (r.description||'')){
      await prisma.pointRule.update({ where:{ id: r.id }, data:{ name, description: desc || null } });
      changed++;
    }
  }
  return changed;
}

async function repairRewardItem(){
  const rows = await prisma.rewardItem.findMany({});
  let changed = 0;
  for(const r of rows){
    const name = fixMojibake(r.name||'');
    const desc = fixMojibake(r.description||'');
    if(name !== r.name || desc !== (r.description||'')){
      await prisma.rewardItem.update({ where:{ id: r.id }, data:{ name, description: desc || null } });
      changed++;
    }
  }
  return changed;
}

async function repairUser(){
  const rows = await prisma.user.findMany({});
  let changed = 0;
  for(const u of rows){
    const name = fixMojibake(u.name||'');
    if(name !== u.name){
      await prisma.user.update({ where:{ id: u.id }, data:{ name } });
      changed++;
    }
  }
  return changed;
}

async function main(){
  const dry = process.env.DRY === '1' || process.env.DRY === 'true';
  const stats = { pointRule:0, rewardItem:0, user:0 };
  if(dry){
    const pr = await prisma.pointRule.findMany({});
    const ri = await prisma.rewardItem.findMany({});
    const us = await prisma.user.findMany({});
    for(const r of pr){ if(fixMojibake(r.name)!==r.name || fixMojibake(r.description||'') !== (r.description||'')) stats.pointRule++; }
    for(const r of ri){ if(fixMojibake(r.name)!==r.name || fixMojibake(r.description||'') !== (r.description||'')) stats.rewardItem++; }
    for(const u of us){ if(fixMojibake(u.name)!==u.name) stats.user++; }
    console.log('[DRY RUN] would fix:', stats);
  }else{
    stats.pointRule = await repairPointRule();
    stats.rewardItem = await repairRewardItem();
    stats.user = await repairUser();
    console.log('Repaired rows:', stats);
  }
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=> prisma.$disconnect());

async function repairTaskPlan(){
  const rows = await prisma.taskPlan.findMany({});
  let changed = 0;
  for(const r of rows){
    const title = fixMojibake(r.title||'');
    const desc = fixMojibake(r.description||'');
    if(title !== r.title || desc !== (r.description||'')){
      await prisma.taskPlan.update({ where:{ id: r.id }, data:{ title, description: desc || null } });
      changed++;
    }
  }
  return changed;
}

(async()=>{
  const dry = process.env.DRY === '1' || process.env.DRY === 'true';
  if(!dry){
    const n = await repairTaskPlan();
    console.log('Repaired TaskPlan rows:', n);
  }
})();
// codex-ok: 2026-04-14T12:35:00+08:00