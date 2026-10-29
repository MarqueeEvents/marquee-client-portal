#!/bin/sh
# Bundles the portal into one file for the DJEP Custom Scripting box: dist/marquee-portal.js
set -e
cd "$(dirname "$0")"
mkdir -p dist
FILES="config gate util djep-reader model requests reels shell render-chooser render-event main"
{ echo "/* Marquee Client Portal bundle. Built $(date -u +%Y-%m-%dT%H:%MZ). Source: src/ */"; for f in $FILES; do echo; echo "/* ---- src/$f.js ---- */"; cat src/$f.js; done; } > dist/marquee-portal.js
node --check dist/marquee-portal.js
echo "built dist/marquee-portal.js ($(wc -c < dist/marquee-portal.js) bytes)"
