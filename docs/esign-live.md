# E-sign page styling (live Nov 27, 2026)

Where: DJEP > Website Tools > Styling Options > Custom Scripting (`styling_tools_custom_scripting`).
What: a second `<style>` block appended at the end of that box: a Google Fonts `@import` line, then `src/esign.css` exactly as of commit 9eedfcf (signing panel under the contract on every screen).
Why CSS only: DJEP rejects `<script` in that box ("Error Code: NW-A1-1:0"), so `src/esign.js` is not used.
Undo: delete that last `<style>...</style>` block (it starts with the fonts `@import` and the comment "Marquee e-signature page").
