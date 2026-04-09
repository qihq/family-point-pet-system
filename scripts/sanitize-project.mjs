#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [ path.join(root, 'package.json') ];

function stripBOMBuffer(buf){
  if(buf && buf.length >= 3 && buf[0]===0xEF && buf[1]===0xBB && buf[2]===0xBF){
    return buf.slice(3);
  }
  return buf;
}

function ensureUtf8NoBom(file){
  if(!fs.existsSync(file)) return false;
  const buf = fs.readFileSync(file);
  const out = stripBOMBuffer(buf);
  if(out !== buf){
    fs.writeFileSync(file, out);
    console.log('[sanitize] strip BOM:', path.relative(root, file));
    return true;
  }
  return false;
}

let changed = false;
for(const f of targets){ changed ||= ensureUtf8NoBom(f); }
if(!changed){ console.log('[sanitize] ok: no BOM'); }
