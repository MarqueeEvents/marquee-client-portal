# Installing on DJ Event Planner

Do not install until Bob approves. Until `LIVE_FOR_EVERYONE` is `true` in `src/config.js`, only test clients (and anyone who opens a portal page with `?mqpreview=on`) see the new design. Everyone else keeps the stock DJEP portal.

1. In DJEP admin, go to **Website Tools > Client Portal > Appearance**.
2. Open **Advanced Settings** and find **Custom Scripting Code**.
3. Paste the two lines below, then save.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/styles/portal.css">
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/dist/marquee-portal.js"></script>
```

`dist/marquee-portal.js` is built from `src/` with `./build.sh`. Rebuild and commit it after any change in `src/`.

## Turning it off
Delete those two lines from Custom Scripting Code and save. The portal immediately goes back to stock DJEP.

## Request to Add
`REQUEST_MODE` in `src/config.js` starts as `'test'`: couples (test clients) can pick add-ons and press Request to Add, and the page shows the exact message Bob would get, but nothing is sent. Switch to `'live'` to send requests through DJEP's Request Changes form. Nothing is ever added to an event automatically; Bob reviews each request in DJEP.

## Note on caching
jsDelivr caches `@main` for up to 12 hours. For instant updates during testing, pin to a commit (`@<commit id>` instead of `@main`), or purge: `https://purge.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/dist/marquee-portal.js`.

## Local testing without DJEP
`node test/mock-server.js`, then open `http://localhost:8787/clients/home.asp`. Fake pages use the Teddi & Kevin test events only. `SINGLE=1` shows a one-event couple; `TODAY=2028-12-16` pretends it is a different day.
