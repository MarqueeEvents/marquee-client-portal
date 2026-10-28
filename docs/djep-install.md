# Installing on DJ Event Planner

Only do this once the files are on GitHub. Until `LIVE_FOR_EVERYONE` is `true` in `src/config.js`, only test clients (and anyone who opens a portal page with `?mqpreview=on`) see the new design.

1. In DJEP admin, go to **Website Tools > Client Portal > Appearance**.
2. Open **Advanced Settings** and find **Custom Scripting Code**.
3. Paste the loader below, then save.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/styles/portal.css">
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/src/config.js"></script>
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/src/gate.js"></script>
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/src/djep-reader.js"></script>
<script src="https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/src/main.js"></script>
```

## Turning it off
Delete those lines from Custom Scripting Code and save. The portal immediately goes back to stock DJEP.

## Note on caching
The file host (jsDelivr) caches files for up to 12 hours. For faster updates during testing we can pin to a specific commit instead of `@main`.
