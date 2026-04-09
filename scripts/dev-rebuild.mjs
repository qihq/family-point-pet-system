#!/usr/bin/env node
import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const root = process.cwd();

function log(msg){ console.log(msg); }
function run(cmd, args, opts={}){
  log(`$ ${[cmd, ...args].join(' ')}`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
  if(r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}
function has(cmd, args){ try{ execSync([cmd, ...args].join(' '), { stdio:'ignore', shell: true }); return true; } catch { return false; } }
function detectCompose(){
  if(has('docker compose', ['version'])) return { cmd:'docker', args:['compose'] };
  if(has('docker-compose', ['version'])) return { cmd:'docker-compose', args:[] };
  throw new Error('Docker Compose not available. Please install Docker Desktop.');
}
function rimraf(p){ try{ fs.rmSync(p, { recursive:true, force:true }); }catch{} }

async function probe(url, timeoutMs=8000){
  return new Promise((resolve)=>{
    const req = http.get(url, (res)=>{ res.resume(); resolve(res.statusCode||0); });
    req.setTimeout(timeoutMs, ()=>{ try{ req.destroy(); }catch{} resolve(0); });
    req.on('error', ()=> resolve(0));
  });
}

async function main(){
  log('[1/9] Cleaning host caches (.next/.turbo/node_modules/.cache)…');
  rimraf(path.join(root, '.next'));
  rimraf(path.join(root, '.turbo'));
  rimraf(path.join(root, 'node_modules/.cache'));

  const dc = detectCompose();
  const runC = (args)=> { const full = (dc.args.length? [dc.cmd, ...dc.args, ...args] : [dc.cmd, ...args]); run(full[0], full.slice(1)); };

  log('[2/9] docker compose down --remove-orphans');
  runC(['down','--remove-orphans']);

  log('[3/9] docker compose build --no-cache app');
  runC(['build','--no-cache','app']);

  log('[4/9] docker compose up -d app');
  runC(['up','-d','app']);

  log('[5/9] Clear caches inside container (skipped)');
  // skipped to avoid Windows quoting issues; the rebuild already replaced image

  log('[6/9] Apply Prisma migrations');
  runC(['exec','app','sh','-lc','npx prisma migrate deploy']);

  log('[7/9] Generate Prisma Client');
  runC(['exec','app','sh','-lc','npx prisma generate']);

  log('[8/9] Seed database (optional)');
  runC(['exec','app','sh','-lc','npx prisma db seed || true']);

  log('[9/9] Probing http://localhost:3100 …');
  const code = await probe('http://localhost:3100');
  if(code===200) log('OK: 200'); else log('Probe not 200 (service may still warm up), code='+code);

  log('Done. Open http://localhost:3100 in your browser.');
}

main().catch((e)=>{ console.error(e.message||e); process.exit(1); });
