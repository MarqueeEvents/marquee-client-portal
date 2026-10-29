# Marquee Client Portal

The new Marquee Events client portal design, layered on top of DJ Event Planner (DJEP).

DJEP still runs everything behind the scenes: events, payments, staff and change requests. This project only changes what couples **see** after they log in at `marqueeeventplanner.com/clientlogon.asp`.

## How it works

1. DJEP has a **Custom Scripting Code** box (Website Tools > Client Portal > Appearance > Advanced Settings) that runs on every client portal page.
2. That box holds one short loader line (see `docs/djep-install.md`) that pulls in `dist/marquee-portal.js` and `styles/portal.css` from this repository.
3. The script reads the data DJEP already puts on each page (see `docs/data-map.md`) and rebuilds the page in the Marquee design.
4. **Safety switch:** the new design only turns on for test clients until `LIVE_FOR_EVERYONE` in `src/config.js` is set to `true`. Real couples keep seeing the current portal until then.

## Undo

- Roll back: revert the last commit in this repository.
- Emergency off: delete the loader line from the DJEP Custom Scripting box. The portal instantly returns to stock DJEP.

## Project layout

| Path | What it is |
|---|---|
| `src/config.js` | Team list (by DJEP employee ID), test clients, options and pricing, safety switch, request mode |
| `src/gate.js` | Decides whether the new design runs for the current visitor |
| `src/djep-reader.js` | Reads event data from DJEP's client pages |
| `src/model.js` | Payment schedule, journey steps and add-on options from DJEP data |
| `src/shell.js` | Marquee header and footer on every portal page |
| `src/render-chooser.js` | "Your Events" page for couples with 2+ events (DJ + photo booth) |
| `src/render-event.js` | The event page |
| `src/requests.js` | Request to Add (goes to Bob for review, never straight onto the event) |
| `src/reels.js` | Latest Reels from the Behold feed |
| `src/main.js` | Entry point and page routing |
| `styles/portal.css` | Marquee brand styles (black, hot pink, Inter Tight, Lora italic) |
| `assets/` | Team photos and logos, brand logo, event images |
| `dist/marquee-portal.js` | One-file bundle that DJEP loads (built by `build.sh`) |
| `test/` | Local mock of DJEP pages and screenshot scripts |
| `docs/` | Install steps, data map, decisions |

## Status

Home and My Events are rebuilt (events chooser + full event page) and running against the test clients. Not yet installed in DJEP. See `docs/roadmap.md`.
