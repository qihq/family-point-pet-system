import puppeteer from "puppeteer";
import fs from "node:fs/promises";

const base = process.env.SNAP_BASE_URL || (process.argv.includes('--base') ? process.argv[process.argv.indexOf('--base')+1] : 'http://localhost:3100');
const outDir = 'outputs/screens';
await fs.mkdir(outDir, { recursive: true });

async function snapFull(url, file){
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('.max-w-6xl');
  await page.evaluate(() => new Promise(r => requestAnimationFrame(()=>requestAnimationFrame(r))));
  await page.screenshot({ path: file, fullPage: true });
  await browser.close();
}

async function snapSelector(url, selector, file){
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector(selector, { timeout: 20000 });
  const el = await page.$(selector);
  const box = await el.boundingBox();
  await page.screenshot({ path: file, clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: Math.min(1440, box.width + 16), height: Math.min(9000, box.height + 16) } });
  await browser.close();
}

const before = `${outDir}/calendar-mock-before.png`;
const after = `${outDir}/calendar-mock-after.png`;
const childOnly = `${outDir}/calendar-child-only.png`;
const parentOnly = `${outDir}/calendar-parent-only.png`;
await snapFull(base + '/dev/calendar-mock', before);
await snapFull(base + '/dev/calendar-mock-after', after);
await snapSelector(base + '/dev/calendar-mock', '.max-w-6xl > div:nth-child(1)', childOnly);
await snapSelector(base + '/dev/calendar-mock', '.max-w-6xl > div:nth-child(2)', parentOnly);
console.log(JSON.stringify({ before, after, childOnly, parentOnly }));
