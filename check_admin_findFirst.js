const { PrismaClient, Role } = require("@prisma/client");
const p = new PrismaClient();
(async ()=>{
  const name = "admin";
  const user = await p.user.findFirst({ where: { name: { equals: name, mode: 'insensitive' } }, select: { id:true, name:true, role:true, familyId:true, password:true } });
  console.log('user=', user);
  console.log('isAdmin=', user && user.role === Role.admin);
  await p.$disconnect();
})();
