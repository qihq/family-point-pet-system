#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const roots = ['app','components','server','lib','docs'].map(p=> path.join(process.cwd(), p)).filter(fs.existsSync);
const exts = new Set(['.ts','.tsx','.js','.jsx','.md','.css','.json']);

function list(dir){
  const out=[]; const st = fs.statSync(dir); if(!st.isDirectory()) return out;
  for(const f of fs.readdirSync(dir)){
    if(f==='node_modules' || f==='.next' || f.startsWith('.git')) continue;
    const p = path.join(dir,f); const s = fs.statSync(p);
    if(s.isDirectory()) out.push(...list(p)); else out.push(p);
  }
  return out;
}

function likelyMojibake(s){
  return /[ÃÂ]/.test(s) || /å|æ|ç|é|ä/.test(s) && !(/[\u4e00-\u9fff]/.test(s));
}

let changed=0, scanned=0;
for(const root of roots){
  for(const f of list(root)){
    if(!exts.has(path.extname(f))) continue;
    let buf = fs.readFileSync(f);
    // strip BOM
    if(buf.length>=3 && buf[0]===0xEF && buf[1]===0xBB && buf[2]===0xBF){ buf = buf.slice(3); }
    let txt = buf.toString('utf8');
    const orig = txt;
    // try latin1->utf8 if looks mojibake
    if(likelyMojibake(txt)){
      try{
        const tmp = Buffer.from(txt,'latin1').toString('utf8');
        // accept if introduces CJK and reduces mojibake markers
        if((tmp.match(/[\u4e00-\u9fff]/g)||[]).length > (txt.match(/[\u4e00-\u9fff]/g)||[]).length
           && (tmp.match(/[ÃÂ]/g)||[]).length < (txt.match(/[ÃÂ]/g)||[]).length){
          txt = tmp;
        }
      }catch{}
    }
    // normalize CRLF to LF
    txt = txt.replace(/\r\n/g,'\n');
    // remove accidental "\\n" after non-quote tokens eg `){\n  `
    txt = txt.replace(/\)\{\\n/g,'){\n').replace(/;\\n/g,';\n');
    if(txt!==orig){ fs.writeFileSync(f, Buffer.from(txt,'utf8')); changed++; }
    scanned++;
  }
}
console.log(`[fix-source-text] scanned ${scanned} files, fixed ${changed}`);
