(async ()=>{
  const r = await fetch("http://localhost:3000/api/auth/admin-login", { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ name:'admin', password:'admin123' }) });
  const t = await r.text();
  console.log('status=', r.status);
  console.log(t);
})();
