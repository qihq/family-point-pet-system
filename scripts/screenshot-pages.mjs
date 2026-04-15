import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';

const base = 'http://localhost:3100';
const outDir = 'outputs/screens';
await fs.mkdir(outDir, { recursive: true });

function ts(){ const d=new Date(); return d.toISOString().replace(/[:.]/g,'-'); }

async function login(page, role){
  await page.goto(base + '/login', { waitUntil: 'networkidle0' });
  if(role==='child'){
    await page.click('text=孩子登录').catch(()=>{});
    await page.type('input[placeholder="例如：child1"]', 'child1', { delay: 30 }).catch(async()=>{
      const inputs = await page.$$('input'); if(inputs[0]) await inputs[0].type('child1');
    });
    await page.type('input[placeholder="例如：1234"]', '1234', { delay: 30 }).catch(async()=>{
      const inputs = await page.$$('input'); if(inputs[1]) await inputs[1].type('1234');
    });
  } else if(role==='parent'){
    await page.click('text=家长登录').catch(()=>{});
    await page.type('input[placeholder="例如：parent/admin"]', 'parent', { delay: 30 }).catch(async()=>{
      const inputs = await page.$$('input'); if(inputs[0]) await inputs[0].type('parent');
    });
    await page.type('input[type="password"]', 'parent123', { delay: 30 }).catch(()=>{});
  }
  await page.click('button:has-text("登录")');
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 20000 }).catch(()=>{});
}

async function screenshotChild(){
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await login(page, 'child');
  await page.goto(base + '/child/plans', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1200);
  const p1 = `${outDir}/child-plans-${ts()}.png`;
  await page.screenshot({ path: p1, fullPage: true });
  // 点击本周第一天，若有完成按钮则点一次
  await page.click('text=本周完成', { timeout: 2000 }).catch(()=>{});
  await page.click('text=完成', { timeout: 2000 }).catch(()=>{});
  await page.waitForTimeout(800);
  const p2 = `${outDir}/child-plans-after-${ts()}.png`;
  await page.screenshot({ path: p2, fullPage: true });
  await browser.close();
  return [p1,p2];
}

async function screenshotParent(){
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await login(page, 'parent');
  await page.goto(base + '/parent/plans', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1200);
  const p1 = `${outDir}/parent-plans-${ts()}.png`;
  await page.screenshot({ path: p1, fullPage: true });
  await page.goto(base + '/parent/review', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(800);
  const p2 = `${outDir}/parent-review-${ts()}.png`;
  await page.screenshot({ path: p2, fullPage: true });
  await browser.close();
  return [p1,p2];
}

const childShots = await screenshotChild().catch(e=>{ console.error('child shots failed', e); return []; });
const parentShots = await screenshotParent().catch(e=>{ console.error('parent shots failed', e); return []; });
console.log(JSON.stringify({ childShots, parentShots }));
