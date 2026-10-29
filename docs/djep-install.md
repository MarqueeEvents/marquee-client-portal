# Installing on DJ Event Planner

Do not install until Bob approves. Until `LIVE_FOR_EVERYONE` is `true` in `src/config.js`, only test clients (matched by DJEP client ID or full name in `src/config.js`) see the new design. There is no URL preview switch. Everyone else keeps the stock DJEP portal.

1. In DJEP admin, go to **Website Tools > Client Portal > Appearance**.
2. Open **Advanced Settings** and find **Custom Scripting Code**.
3. Paste the two lines below, then save.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@initial-scaffold/styles/portal.css">
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@initial-scaffold/dist/marquee-portal.js"></script>
```

Test install (Oct 29, 2026) points at the `initial-scaffold` branch. For launch, merge to `main` and change `@initial-scaffold` to `@main`.
After each push, purge the cache so test clients see the change within minutes:
`https://purge.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@initial-scaffold/dist/marquee-portal.js` and the same for `styles/portal.css`.

`dist/marquee-portal.js` is built from `src/` with `./build.sh`. Rebuild and commit it after any change in `src/`.

## Turning it off
Delete those two lines from Custom Scripting Code and save. The portal immediately goes back to stock DJEP.

## Request to Add
`REQUEST_MODE` in `src/config.js` starts as `'test'`: couples (test clients) can pick add-ons and press Request to Add, and the page shows the exact message Bob would get, but nothing is sent. Switch to `'live'` to send requests through DJEP's Request Changes form. Nothing is ever added to an event automatically; Bob reviews each request in DJEP.

## Note on caching
jsDelivr caches branch links for up to 12 hours unless purged. For instant updates during testing, pin to a commit (`@<commit id>` instead of `@main`), or purge: `https://purge.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/dist/marquee-portal.js`.

## Local testing without DJEP
`node test/mock-server.js`, then open `http://localhost:8787/clients/home.asp`. Fake pages use the Teddi & Kevin test events only. `SINGLE=1` shows a one-event couple; `TODAY=2028-12-16` pretends it is a different day.
