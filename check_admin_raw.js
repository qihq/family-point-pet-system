const { PrismaClient, Role } = require("@prisma/client");
const p = new PrismaClient();
(async ()=>{
  const name = "admin";
  const rows = await p.$queryRaw`SELECT "id","name","role","familyId","password" FROM "User" WHERE lower("name")=lower(${name}) LIMIT 1;`;
  console.log('rows=', rows);
  const user = Array.isArray(rows) && rows.length>0 ? rows[0] : null;
  console.log('user=', user);
  if(!user) console.log('no user');
  else console.log('role compare', user.role, '==', Role.admin, user.role===Role.admin);
  await p.$disconnect();
})();
