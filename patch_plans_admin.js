const fs = require('fs');
const path = 'app/(child)/plans/page.tsx';
let s = fs.readFileSync(path, 'utf8');
let changed = false;
// 1) broaden condition
s = s.split("me?.role==='parent' && (").join("(me?.role==='parent' || me?.role==='admin') && (");
// 2) insert states after childId state
const hardMarker = "const [childId,setChildId] = useState<string>(editing?.childId|| (me?.role==='child'? (me?.userId||'') : (familyKids[0]?.id||'')) );";
const softMarker = "const [childId,setChildId] = useState";
const insertBlock = "\n    const [families,setFamilies] = useState<{id:string;name:string}[]>([]);\n    const [selectedFamilyId,setSelectedFamilyId] = useState<string>('');\n    useEffect(()=>{ if(me?.role==='admin' && families.length===0){ (async()=>{ try{ const fr = await fetch('/api/admin/families',{cache:'no-store',credentials:'include'}); const fd = await fr.json(); if(fr.ok && fd.success) setFamilies(fd.data||[]); }catch{} })(); } }, [me?.role]);\n";
if(s.includes(hardMarker)){
  s = s.replace(hardMarker, hardMarker + insertBlock);
  changed = true;
}else if(s.includes(softMarker)){
  const idx = s.indexOf(softMarker);
  const endLine = s.indexOf("\n", idx);
  if(endLine>0){ s = s.slice(0,endLine+1) + insertBlock + s.slice(endLine+1); changed = true; }
}
// 3) insert admin family selector before child label
const label = '<div className="text-sm text-gray-600">目标孩子</div>';
if(s.includes(label)){
  const adminBlock = `
                {me?.role==='admin' && (
                  <div>
                    <div className="text-sm text-gray-600">目标家庭</div>
                    <select value={selectedFamilyId} onChange={async e=>{ const fid=e.target.value; setSelectedFamilyId(fid); setChildId(''); if(fid){ const kr=await fetch(`/api/family/children?familyId=${fid}`,{cache:'no-store',credentials:'include'}); const kd=await kr.json(); if(kr.ok && kd.success) setFamilyKids((kd.data||[]).map((x:any)=>({id:x.id,name:x.name}))); } }} className="mt-1 w-full border rounded px-3 py-2">
                      <option value="">请选择家庭</option>
                      {families.map(f=> (<option key={f.id} value={f.id}>{f.name}</option>))}
                    </select>
                  </div>
                )}
                `;
  s = s.replace(label, adminBlock + label);
  changed = true;
}
fs.writeFileSync(path, s, { encoding: 'utf8' });
console.log('patched=', changed);
