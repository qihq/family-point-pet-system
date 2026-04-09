#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import chokidar from 'chokidar';

const root = process.cwd();
const petsDir = path.join(root, 'public', 'uploads', 'pets');

async function ensureDir(p){ try{ await fsp.mkdir(p, { recursive: true }); }catch{} }

function binGltfpack(){
  const bin = path.join(root, 'node_modules', '.bin', os.platform()==='win32'? 'gltfpack.cmd':'gltfpack');
  return bin;
}

function run(cmd, args){
  return new Promise((resolve, reject)=>{
    const p = spawn(cmd, args, { stdio: 'inherit', shell: os.platform()==='win32' });
    p.on('exit', (code)=> code===0? resolve(0): reject(new Error(`gltfpack exit ${code}`)));
    p.on('error', reject);
  });
}

function baseOf(file){
  // xxx.src.glb -> xxx ; xxx.glb -> xxx ; xxx-lite.glb -> xxx (lite handled by naming below)
  let b = path.basename(file);
  b = b.replace(/\.src\.glb$/i, '').replace(/\.glb$/i, '');
  b = b.replace(/-lite$/i, '');
  return b;
}

async function statSafe(p){ try{ return await fsp.stat(p); }catch{ return null; } }

async function compressOne(input){
  const dir = path.dirname(input);
  const id = baseOf(input);
  const hdOut = path.join(dir, `${id}.glb`);
  const liteOut = path.join(dir, `${id}-lite.glb`);
  const srcStat = await statSafe(input);
  const hdStat = await statSafe(hdOut);
  const liteStat = await statSafe(liteOut);
  const needHD = !hdStat || (srcStat && srcStat.mtimeMs > hdStat.mtimeMs);
  const needLite = !liteStat || (srcStat && srcStat.mtimeMs > liteStat.mtimeMs);
  if(!needHD && !needLite){ console.log(`[skip] ${id} 已是最新`); return; }
  const bin = binGltfpack();
  await ensureDir(dir);
  console.log(`[pack] 源: ${path.relative(root, input)}`);
  if(needHD){
    console.log(`[pack] 生成高清: ${path.relative(root, hdOut)}`);
    await run(bin, ['-i', input, '-o', hdOut, '-c', '-si', '0.95']);
  }
  if(needLite){
    console.log(`[pack] 生成低模: ${path.relative(root, liteOut)}`);
    await run(bin, ['-i', input, '-o', liteOut, '-c', '-si', '0.6']);
  }
}

const queue = new Map();
let working = false;

function enqueue(file){
  const key = path.resolve(file);
  if(queue.has(key)) clearTimeout(queue.get(key));
  queue.set(key, setTimeout(async ()=>{
    queue.delete(key);
    try{ await compressOne(key); }
    catch(e){ console.error('[error]', e.message||e); }
    finally{ process.stdout.write(''); }
  }, 250));
}

async function bootstrap(){
  await ensureDir(petsDir);
  console.log('[watch] 监听: ', path.relative(root, petsDir), ' (*.src.glb)');
  const watcher = chokidar.watch('**/*.src.glb', { cwd: petsDir, ignoreInitial: false, awaitWriteFinish:{ stabilityThreshold: 500, pollInterval: 100 } });
  watcher.on('add', f=> enqueue(path.join(petsDir, f)));
  watcher.on('change', f=> enqueue(path.join(petsDir, f)));
  watcher.on('error', e=> console.error('[watch error]', e));
}

bootstrap().catch(e=>{ console.error(e); process.exit(1); });
