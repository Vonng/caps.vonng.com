// Report how many line boxes each piece of landing copy occupies.
//
// The landing contract for this site is that everything above the family cards
// stays on one line at 1440px: hero lines, metric labels and descriptions,
// section descriptions, and every capability title, motto, bullet and value.
// This script measures that instead of leaving it to the eye.
//
// Start a dev server, then run it against the page you want:
//
//   make dev &
//   node bin/check_landing_lines.mjs http://127.0.0.1:1313/ 1440
//   node bin/check_landing_lines.mjs http://127.0.0.1:1313/zh/ 1440
//
// Playwright is not a dependency of this repository; the script borrows an
// existing install (`npx playwright` puts one in the npx cache).

import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

function resolveChromium() {
  const require = createRequire(import.meta.url);
  const roots = [process.cwd()];
  try {
    roots.push(execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim());
  } catch {}
  const npx = path.join(process.env.HOME ?? '', '.npm', '_npx');
  if (fs.existsSync(npx)) {
    // Newest cache entry first: an older one may predate the installed browsers.
    const dirs = fs.readdirSync(npx)
      .map(dir => path.join(npx, dir, 'node_modules'))
      .filter(dir => fs.existsSync(path.join(dir, 'playwright')))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    roots.push(...dirs);
  }
  for (const root of roots) {
    const entry = path.join(root, 'playwright', 'index.mjs');
    if (fs.existsSync(entry)) return import(entry);
    try {
      return import(require.resolve('playwright', { paths: [root] }));
    } catch {}
  }
  throw new Error('playwright not found; run `npx playwright --version` once, or npm i playwright');
}

const [url, width = '1440'] = process.argv.slice(2);
if (!url) {
  console.error('usage: node bin/check_landing_lines.mjs <url> [viewport-width]');
  process.exit(2);
}

const { chromium } = await resolveChromium();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
  reducedMotion: 'reduce',
});
await page.goto(url, { waitUntil: 'networkidle' });

const rows = await page.evaluate(() => {
  const out = [];
  // Count line boxes by grouping client rects that overlap vertically. Dividing
  // height by line-height lies when the element has padding, and grouping by
  // exact `top` lies when an inline <code> sits on a slightly different
  // baseline than the text around it.
  const add = (name, el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = [...range.getClientRects()]
      .filter(r => r.height > 0 && r.width > 0)
      .sort((a, b) => a.top - b.top);
    let lines = 0;
    let bottom = -Infinity;
    for (const rect of rects) {
      // A rect belongs to the current line if it starts before that line ends.
      if (rect.top >= bottom - 1) lines += 1;
      bottom = Math.max(bottom, rect.bottom);
    }
    out.push({
      name,
      lines,
      text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 72),
    });
  };
  document.querySelectorAll('.td-landing-hero__title > span').forEach((el, i) => add(`hero line ${i}`, el));
  document.querySelectorAll('.td-landing-hero__lead').forEach(el => add('hero lead', el));
  document.querySelectorAll('.td-landing-metric span').forEach((el, i) => add(`metric ${i} label`, el));
  document.querySelectorAll('.td-landing-metric small').forEach((el, i) => add(`metric ${i} desc`, el));
  document.querySelectorAll('.td-landing-section__description').forEach((el, i) => add(`section ${i} desc`, el));
  document.querySelectorAll('.td-landing-module').forEach((module, m) => {
    module.querySelectorAll('.td-landing-module__copy h3').forEach(el => add(`module ${m} title`, el));
    module.querySelectorAll('.td-landing-module__motto').forEach(el => add(`module ${m} motto`, el));
    module.querySelectorAll('.td-landing-module__copy ul li').forEach((el, i) => add(`module ${m} bullet ${i}`, el));
    module.querySelectorAll('.td-landing-module__value').forEach(el => add(`module ${m} value`, el));
  });
  return out;
});

await browser.close();

for (const row of rows) {
  console.log(`${row.lines}L  ${row.name.padEnd(18)} ${JSON.stringify(row.text)}`);
}
