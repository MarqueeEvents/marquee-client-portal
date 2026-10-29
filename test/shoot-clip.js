const { chromium } = require('playwright');
(async () => { const [,, url, out, w, h, y] = process.argv;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.goto(url); await p.waitForTimeout(1200); await p.evaluate(y => window.scrollTo(0, +y), y || 0); await p.waitForTimeout(300);
  await p.screenshot({ path: out }); await b.close(); })();
