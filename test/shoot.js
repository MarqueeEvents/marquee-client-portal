const { chromium } = require('playwright');
(async () => {
  const [,, url, out, w = '1440', h = '900'] = process.argv;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url); await p.waitForTimeout(1500);
  await p.screenshot({ path: out, fullPage: true }); console.log(out, errs.filter(e => !/behold|Failed to load resource|fonts/i.test(e)).join(' | ') || 'no errors');
  await b.close();
})();
