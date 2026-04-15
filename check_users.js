const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
(async ()=>{
  const rows = await p.user.findMany({ select:{ id:true, name:true, role:true } });
  console.log(rows);
  await p.$disconnect();
})().catch(e=>{ console.error("ERR", e); process.exit(1); });