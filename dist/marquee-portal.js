/* Marquee Client Portal bundle. Built 2026-10-30T02:41Z. Source: src/ */

/* ---- src/config.js ---- */
/* Marquee Client Portal configuration.
 * Everything Bob may want to change lives here.
 */
window.MQ = window.MQ || {};

/* Photos and logos load from the same place this file was loaded from (GitHub via jsDelivr). */
MQ.ASSET_BASE = (function () {
  var src = (document.currentScript && document.currentScript.src) || '';
  return src ? src.replace(/(src\/config|dist\/marquee-portal(\.min)?)\.js.*$/, 'assets/') : 'assets/';
})();

MQ.config = {
  // SAFETY SWITCH. false = new design only for TEST_CLIENTS below. true = everyone.
  LIVE_FOR_EVERYONE: false,

  // Test clients (matched against event names on the page). Add more as needed.
  // Full names only, so a real couple who shares a first name never sees the test design.
  TEST_CLIENTS: ['Teddi Price', 'Kevin Garrity'],
  // TODO: add Tony & Liana's full names here once confirmed.
  // DJEP client IDs of test clients (shown on the client's page in DJEP admin as CLIENT ID).
  TEST_CLIENT_IDS: ['387027'],

  // REQUESTS. 'test' = Request to Add shows exactly what would be sent but sends nothing.
  // 'live' = sends the request to Bob through DJEP's Request Changes form. Nothing is ever added to an event automatically.
  REQUEST_MODE: 'live',


  // Payment schedule: 25% at booking, 25% at 9 months, 25% at 6 months, balance 90 days out.
  PAYMENT_PLAN: [
    { label: 'Retainer', pct: 0.25, monthsBefore: null },
    { label: '9 Months Out', pct: 0.25, monthsBefore: 9 },
    { label: '6 Months Out', pct: 0.25, monthsBefore: 6 },
    { label: 'Final Balance', pct: 0.25, daysBefore: 90 }
  ],

  // Planning session windows
  CREATIVE_SESSION: { fromMonthsBefore: 6, toMonthsBefore: 3, optional: true },
  FINAL_PLANNING: { fromDaysBefore: 28, toDaysBefore: 14 },

  // Behold Instagram feed (from @bob_hickman). Only Reels mentioning @marqueeohio or #marqueeohio show.
  REELS_FEED: 'https://feeds.behold.so/WKarKAnpmHuUeM2c6jkt',
  REELS_FILTER: ['marqueeohio'],

  // Vibo planning app
  VIBO_URL: 'https://web.vibodj.com/',

  // Team, keyed by DJEP primary employee ID (found in each event block on the portal home page).
  // TODO: fill in IDs, contact info and Calendly links from Bob's checklist.
  TEAM: {
    '43180': {
      key: 'bob', cardTier: 'Luxury Headliner', cardLogoH: 58, cardPhotoFile: 'bob-card-2.jpg', cardPos: 'center 8%', photoFile: 'bob-photo-2.jpg', logoFile: 'bob-logo.png', logoH: 58, name: 'Bob Hickman', first: 'Bob', tier: 'Luxury Headliner', role: 'Founder, DJ & MC', price: 3500,
      phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'bob_hickman',
      calendly: { creative: '', final: '' }
    },
    '43269': {
      key: 'bradon', cardTier: 'Executive Headliner', cardLogoH: 46, cardPhotoFile: 'bradon-card-4.jpg', cardPos: 'center 0%', photoFile: 'bradon-photo.jpg', logoFile: 'bradon-logo.png', logoH: 64, name: 'Bradon Smith', first: 'Bradon', tier: 'Executive Headliner', role: 'Lead DJ & MC', price: 2700,
      phone: '330.432.4143', email: 'bradon@marqueeohio.com', instagram: 'dj_bradon',
      calendly: { creative: '', final: '' }
    },
    '43300': {
      key: 'dan', cardTier: 'Headliner', cardLogoH: 56, cardPhotoFile: 'dan-card-5.jpg', cardPos: 'center 0%', photoFile: 'dan-photo-2.jpg', logoFile: 'dan-logo.png', logoH: 58, name: 'Daniel Sanatore', first: 'Dan', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '330.440.5509', email: 'daniel@marqueeohio.com', instagram: 'dj_sanatore',
      calendly: { creative: '', final: '' }
    },
    '43299': {
      key: 'james', cardTier: 'Headliner', cardLogoH: 54, cardPos: 'center 0%', photoFile: 'james-photo.jpg', logoFile: 'james-logo-2.png', logoH: 58, name: 'James Stevenson', first: 'James', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '330.407.9572', email: 'james@marqueeohio.com', instagram: 'jamessmu',
      calendly: { creative: '', final: '' }
    },
    '43301': {
      key: 'jake', cardTier: 'Headliner', cardPhotoFile: 'silhouette-card-2.jpg', cardPos: 'center 0%', photoFile: 'silhouette-2.jpg', logoFile: '', logoH: 58, name: 'Jake Kinsey', first: 'Jake', tier: 'Headliner', role: 'DJ, Production Assistant',
      phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
      calendly: { creative: '', final: '' }
    },
    '43302': {
      key: 'mike', cardTier: 'Headliner', cardPhotoFile: 'silhouette-card-2.jpg', cardPos: 'center 0%', photoFile: 'silhouette-2.jpg', logoFile: '', logoH: 58, name: 'Mike Bishman', first: 'Mike', tier: 'Headliner', role: 'DJ & MC',
      phone: '740.350.7922', email: 'info@marqueeohio.com', instagram: 'marqueeohio',
      calendly: { creative: '', final: '' }
    }
  },

  // Booking links used for any DJ whose own Calendly links are not filled in yet (Bob's for now).
  CALENDLY_DEFAULT: {
    creative: 'https://calendly.com/marqueedj/wedding-creative-session',
    final: 'https://calendly.com/marqueedj/wedding-final-planning-meeting'
  },

  // Anyone staffed on a DJ event who is not in TEAM yet (for example Jake, 43301): a neutral Marquee card with Bob's contact info.
  FALLBACK_HEADLINER: {
    key: 'marquee', cardTier: 'Headliner', cardPhotoFile: 'silhouette-card-2.jpg', cardPos: 'center 0%', photoFile: 'silhouette-2.jpg', logoFile: '../brand/marquee-logo-white.png', logoH: 46, cardLogoH: 34,
    name: 'Your Marquee Headliner', first: 'Marquee', tier: 'Headliner', role: 'DJ & MC',
    phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
    calendly: { creative: '', final: '' }
  },

  // Client-friendly names for DJEP fee lines. A DJ's first name at the start of a line is dropped first,
  // then any exact match below is renamed. Lines not listed show as written in DJEP.
  LINE_NAMES: {
    'Wedding Talent Fee': 'Wedding Entertainment Package',
    'Ceremony Package w/o Rehearsal': 'Ceremony Package'
  },
  LINE_NAME_PREFIXES: ['Bob', 'Bradon', 'Dan', 'Daniel', 'James', 'Mike', 'Jake'],

  // Photo booth print design: when couples should send their template choice and wording.
  PRINT_DESIGN_DAYS_BEFORE: 30,
  // Link to the photo booth template examples (Bob's Dropbox) until the built-in designer exists. Empty = "coming soon" note.
  PRINT_TEMPLATES_URL: 'https://www.dropbox.com/scl/fo/1rra6vk7hbodugn516rx0/AO7yIynKPa7MJRA7tn5NjqY?rlkey=f28xl12sjfwbzvn5r2gnrtxkh&dl=0',

  // Photo booth events show this general Marquee contact instead of whoever is staffed on the booth.
  COMPANY_CONTACT: {
    key: 'marquee', name: 'Marquee Events', first: 'Bob', tier: 'Photo Booth Team', role: 'Questions about your booth?',
    note: 'Call or text Bob directly and we will take care of you.',
    phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
    logoFile: '../brand/marquee-logo-white.png', logoH: 46
  },

  // Add-on catalog (2027-2028 wedding guide pricing). TODO: replace with Bob's final options and pricing document.
  // match: words that identify this item on a DJEP fee line, so already-booked items are hidden.
  CATALOG: [
    { id: 'clouds', cat: 'Atmosphere & Effects', name: 'Dancing on the Clouds', price: 350, match: 'clouds', sub: 'Low-lying cloud effect for your first dance.' },
    { id: 'spark', cat: 'Atmosphere & Effects', name: 'Sparkler Fountains', price: 395, unit: 'pair', match: 'sparkler', sub: 'Cold spark fountains for the big moments.' },
    { id: 'co2', cat: 'Atmosphere & Effects', name: 'CO2 Cryo Jets', price: 450, unit: 'pair', match: 'cryo', sub: 'Blasts of cold fog when the beat drops.' },
    { id: 'coolburst', cat: 'Atmosphere & Effects', name: 'Cool Burst LED CO2 Gun', price: 350, match: 'cool burst', sub: 'Handheld LED CO2 bursts on the dance floor.' },
    { id: 'snow', cat: 'Atmosphere & Effects', name: 'Snow Machine', price: 550, match: 'snow', sub: 'A winter-wonderland finish.' },
    { id: 'foam', cat: 'Atmosphere & Effects', name: 'LED Foam Party Favors', price: 275, match: 'foam', sub: 'Glow sticks and wands for every guest.' },
    { id: 'astera', cat: 'Lighting & Visuals', name: 'Astera LED Light Tubes', price: 400, match: 'astera', sub: 'Wireless light tubes that move with the music.' },
    { id: 'mono', cat: 'Lighting & Visuals', name: 'Standard Monogram Projection', price: 300, match: 'standard monogram', sub: 'Your names or initials in light.' },
    { id: 'amono', cat: 'Lighting & Visuals', name: 'Animated Monogram Projection', price: 350, match: 'monogram', sub: 'Your monogram, animated on the floor or wall.' },
    { id: 'classic', cat: 'Photo Booths', name: 'Classic Photo Booth', price: 795, match: 'classic photo booth', booth: true, sub: 'Unlimited prints and a digital gallery.' },
    { id: 'roamer', cat: 'Photo Booths', name: 'Roamer Photo Booth', price: 595, match: 'roamer', booth: true, sub: 'A roaming booth that comes to your guests.' },
    { id: 'scrap', cat: 'Photo Booths', name: 'Keepsake Scrapbook', price: 150, match: 'scrapbook', booth: true, sub: 'Guests sign a book of your photo strips.' },
    { id: 'sax', cat: 'Live Music', name: 'Saxy Rob', price: 1800, match: 'sax', sub: 'Live sax over the DJ set.' },
    { id: 'ceremony', cat: 'Ceremony & More Time', name: 'Ceremony Package', price: 400, match: 'ceremony', sub: 'Sound, mics and music for your ceremony.' },
    { id: 'hour', cat: 'Ceremony & More Time', name: 'Additional Hour', price: 500, match: 'additional hour', repeatable: true, sub: 'Keep the party going an extra hour.' }
  ],

  // Photo booth add-ons, shown under Total Investment on photo booth pages. price: null shows "Price on request".
  // TODO: Bob to confirm prices for additional time and the 4x6 upgrade.
  BOOTH_ADDONS: [
    { id: 'bhour', name: 'Additional Time', price: null, unit: 'hour', match: 'additional (time|hour)', sub: 'Keep the booth running longer.' },
    { id: 'bscrap', name: 'Keepsake Scrapbook', price: 150, match: 'scrapbook', sub: 'Guests add a strip and sign a book you keep.' },
    { id: 'b4x6', name: '4x6 Print Upgrade', price: null, match: '4\\s*x\\s*6|print upgrade', classicOnly: true, sub: 'Go from 2x6 strips to larger 4x6 prints, portrait or landscape.' }
  ],

  // The "Couples Love These" picks, in order. Anything already booked is skipped and the next item fills in.
  FEATURED: ['clouds', 'spark', 'co2', 'amono', 'astera', 'sax']
};

/* ---- src/gate.js ---- */
/* Decides whether the new Marquee design should run for this visitor.
 * Real couples keep the stock DJEP portal until MQ.config.LIVE_FOR_EVERYONE is true.
 */
window.MQ = window.MQ || {};

MQ.gate = (function () {
  /* No URL back door: only test clients (or LIVE_FOR_EVERYONE) see the new design.
   * Clears the old preview flag from earlier testing builds. */
  try { localStorage.removeItem('mq-portal-preview'); } catch (e) {}

  /* Test client check. Most pages carry DJEP's client ID (#clientIDspan); Event Details carries the names;
   * Make a Payment carries neither, so a confirmed test client is remembered for this browser tab only.
   * A page showing a different client ID clears it right away. */
  var SESSION_KEY = 'mq-test-client';
  function isTestClient() {
    var idEl = document.getElementById('clientIDspan');
    var id = idEl ? idEl.textContent.trim() : '';
    var text = document.body ? document.body.textContent : '';
    var ok = (id && (MQ.config.TEST_CLIENT_IDS || []).indexOf(id) >= 0) ||
      MQ.config.TEST_CLIENTS.some(function (name) { return text.indexOf(name) >= 0; });
    try {
      if (ok) { sessionStorage.setItem(SESSION_KEY, '1'); return true; }
      if (id) { sessionStorage.removeItem(SESSION_KEY); return false; }
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) { return ok; }
  }

  function isClientPortal() {
    return /\/clients\//i.test(window.location.pathname);
  }

  return {
    shouldRun: function () {
      if (!isClientPortal()) return false;
      if (MQ.config.LIVE_FOR_EVERYONE) return true;
      return isTestClient();
    }
  };
})();

/* ---- src/util.js ---- */
/* Small shared helpers: dates, money, safe HTML, icons. */
window.MQ = window.MQ || {};

MQ.util = (function () {
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* DJEP dates come as M/D/YYYY. */
  /* DJEP writes dates two ways: 12/30/2028 (event lists) and Saturday, December 30, 2028 (event details). */
  function parseDate(s) {
    var m = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(s || '');
    if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    m = /([A-Za-z]{3,9})\.?\s+(\d{1,2}),?\s+(\d{4})/.exec(s || '');
    if (m) {
      var mi = MONTHS.map(function (x) { return x.toLowerCase(); }).indexOf(m[1].slice(0, 3).toLowerCase());
      if (mi >= 0) return new Date(+m[3], mi, +m[2]);
    }
    return null;
  }

  function today() {
    var o = MQ.util.overrideToday;
    var d = o ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(o) ? o + 'T00:00:00' : o) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function addMonths(d, n) {
    var r = new Date(d.getFullYear(), d.getMonth() + n, 1);
    var last = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
    r.setDate(Math.min(d.getDate(), last));
    return r;
  }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

  /* Whole calendar days from a to b. */
  /* Client-friendly fee line name (see LINE_NAMES in config). */
  function lineName(name) {
    var c = MQ.config, n = String(name || '').trim();
    (c.LINE_NAME_PREFIXES || []).some(function (p) {
      var re = new RegExp('^' + p + "('s)?\\s+", 'i');
      if (re.test(n) && n.replace(re, '').length > 3) { n = n.replace(re, ''); return true; }
      return false;
    });
    return (c.LINE_NAMES || {})[n] || n;
  }

  /* Client-friendly event type: drops the "Marquee Test" prefix, shows weddings as Wedding Entertainment. */
  function typeName(type) {
    var t = String(type || '').replace(/^marquee test\s+/i, '').trim();
    if (/photo\s*booth/i.test(t)) return 'Photo Booth';
    if (/wedding/i.test(t)) return 'Wedding Entertainment';
    return t;
  }

  function daysBetween(a, b) {
    var ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((ub - ua) / 86400000);
  }

  function fmtDate(d) { return d ? MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : ''; }
  function fmtDateLong(d) { return d ? MONTHS_LONG[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : ''; }

  function away(days) {
    if (days === 0) return 'Today';
    if (days < 0) return Math.abs(days) + (days === -1 ? ' day ago' : ' days ago');
    if (days < 60) return days + (days === 1 ? ' day away' : ' days away');
    var months = Math.round(days / 30.4);
    return months + ' months away';
  }

  function money(n, cents) {
    if (n == null || isNaN(n)) return '';
    var withCents = cents || Math.round(n) !== n;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: withCents ? 2 : 0, maximumFractionDigits: withCents ? 2 : 0 });
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  /* "Teddi Price & Kevin Garrity Ceremony & Reception" -> { couple, first, rest } */
  /* Event names look like "Teddi Price & Kevin Garrity Ceremony & Reception". Strip the event part. */
  var EVENT_WORDS = /\s+(ceremony\s*&\s*reception|ceremony|reception|wedding|(the\s+)?(classic|roamer|private|open[- ]air|360)?\s*photo\s*booth(\s+rental)?|dj\s+services?)\s*$/i;
  function coupleFromName(name, type, pkg) {
    var n = (name || '').trim();
    [type, pkg, pkg && pkg.replace(/^the\s+/i, '')].forEach(function (t) {
      if (t && n.toLowerCase().slice(-t.length) === t.toLowerCase()) n = n.slice(0, -t.length).trim();
    });
    for (var i = 0; i < 3 && EVENT_WORDS.test(n); i++) n = n.replace(EVENT_WORDS, '').trim();
    var parts = n.split(/\s+(?:&|and)\s+/i);
    var first = parts.map(function (p) { return p.split(/\s+/)[0]; }).filter(Boolean);
    return { couple: n, first: first.length >= 2 ? first[0] + ' & ' + first[1] : (first[0] || 'friends') };
  }

  var P = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  var ICONS = {
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    pin: '<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkbox: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    play: '<path d="M8 5v14l11-7z" fill="currentColor"/>'
  };
  function icon(name, size) {
    var s = size || 16;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" ' + P + '>' + (ICONS[name] || '') + '</svg>';
  }

  /* Deterministic waveform heights (0..1) so bars look the same on every load. */
  function wave(n, seed) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var t = i / Math.max(1, n - 1);
      var w = 0.5 + 0.5 * Math.abs(Math.sin((i + (seed || 0)) * 1.73) * Math.cos(i * 0.51 + 0.4));
      var env = 0.35 + 0.45 * Math.sin(Math.PI * t) + 0.2 * Math.abs(Math.sin(i * 0.21));
      out.push(Math.min(1, 0.18 + env * w));
    }
    return out;
  }

  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  return {
    esc: esc, lineName: lineName, typeName: typeName, parseDate: parseDate, today: today, addMonths: addMonths, addDays: addDays, daysBetween: daysBetween,
    fmtDate: fmtDate, fmtDateLong: fmtDateLong, away: away, money: money, round2: round2, coupleFromName: coupleFromName,
    icon: icon, wave: wave, store: store, MONTHS: MONTHS, DAYS: DAYS
  };
})();

/* ---- src/djep-reader.js ---- */
/* Reads event data from DJ Event Planner's client portal pages.
 * Built from the data map in docs/data-map.md (mapped Oct 28, 2026).
 * Every reader returns plain objects and never throws; missing data comes back as null.
 */
window.MQ = window.MQ || {};

MQ.reader = (function () {
  function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : null; }
  function money(str) {
    if (!str) return null;
    var n = parseFloat(String(str).replace(/[^0-9.\-]/g, ''));
    return isNaN(n) ? null : n;
  }
  function eventIdFromHref(href) {
    var m = /eventid=(\d+)/i.exec(href || '');
    return m ? m[1] : null;
  }
  /* Text with line breaks preserved. Works on live pages and on fetched (unrendered) pages. */
  function blockText(el) {
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('br'), function (b) { b.replaceWith('\n'); });
    Array.prototype.forEach.call(c.querySelectorAll('p,div,tr,li,b,strong'), function (b) { b.append('\n'); });
    return c.textContent.replace(/[ \t\u00a0]+/g, ' ');
  }
  /* Non-empty lines of a box, minus its title and any lines matching skip. */
  function boxLines(container, skip) {
    if (!container) return [];
    return blockText(container).split('\n').map(function (s) { return s.trim(); })
      .filter(function (s) { return s && !(skip && skip.test(s)); })
      .filter(function (s, i, a) { return a.indexOf(s) === i; });
  }
  function labelValue(container, label) {
    if (!container) return null;
    /* Value on the same line only, so an empty "Setup Time:" does not swallow the next line. */
    /* If the label sits alone on its line (bold labels do), use the next line unless it is another label. */
    var m = new RegExp(label + ':[ \\t]*([^\\n]*)(?:\\n\\s*([^\\n]*))?', 'i').exec(blockText(container));
    if (!m) return null;
    if (m[1].trim()) return m[1].trim();
    var next = (m[2] || '').trim();
    return next && !/^[A-Za-z][A-Za-z /#]{1,30}:/.test(next) ? next : null;
  }

  /* Home page and My Events: one block per event (.djep-singleeventdiv). */
  function readEventList(root) {
    root = root || document;
    return Array.prototype.map.call(root.querySelectorAll('.djep-singleeventdiv'), function (block) {
      var hidden = block.querySelector('.hidden_event_information');
      var details = block.querySelector('a.djep-eventdetailsbutton');
      var id = eventIdFromHref(details && details.getAttribute('href'));
      return {
        id: id,
        employeeId: text(hidden && hidden.querySelector('.primary_employee_id')),
        date: text(hidden && hidden.querySelector('[class^="event_date_"]')),
        name: text(hidden && hidden.querySelector('[class^="event_name_"]')),
        status: text(hidden && hidden.querySelector('[class^="event_status_"]')),
        type: labelValue(block, 'Event Type'),
        package: labelValue(block, 'Package'),
        links: {
          plan: (block.querySelector('a.djep-planeventbutton') || {}).href || null,
          details: (details || {}).href || null,
          payment: (block.querySelector('a.djep-paymentbutton') || {}).href || null
        },
        isPhotoBooth: /photo\s*booth/i.test(labelValue(block, 'Event Type') || '')
      };
    });
  }

  /* Event Details page (eventdetails.asp?eventid=ID). */
  function readEventDetails(root) {
    root = root || document;
    var feeBox = root.querySelector('.djep-feedetailsbox');
    var lines = [], group = null;
    if (feeBox) {
      Array.prototype.forEach.call(feeBox.querySelectorAll('tr'), function (tr) {
        var cells = tr.querySelectorAll('td');
        if (!cells.length) return;
        var name = text(cells[0]);
        var price = cells.length >= 2 ? money(text(cells[cells.length - 1])) : null;
        if (name && price !== null) lines.push({ name: name, price: price, group: group });
        else if (name && !/^description$/i.test(name)) group = name;
      });
    }

    /* Service details: fieldsets with a legend (Service, Description, Addons). */
    var service = {};
    Array.prototype.forEach.call(root.querySelectorAll('.djep-servicedetailsbox fieldset'), function (fs) {
      var legend = fs.querySelector('legend');
      var key = text(legend);
      if (!key) return;
      var c = fs.cloneNode(true);
      var lg = c.querySelector('legend');
      if (lg) lg.remove();
      service[key.toLowerCase()] = boxLines(c);
    });

    /* Payment history rows (date, method, amount...). */
    var payBox = root.querySelector('.djep-paymenthistorybox');
    var history = [];
    if (payBox) {
      Array.prototype.forEach.call(payBox.querySelectorAll('tr'), function (tr) {
        var cells = Array.prototype.map.call(tr.querySelectorAll('td'), text).filter(Boolean);
        if (cells.length >= 2 && !cells.every(function (c) { return /^(date|amount|method|type|description|payment)s?$/i.test(c); })) history.push(cells);
      });
    }

    var docs = Array.prototype.map.call(root.querySelectorAll('.djep-documentsbox a[href]'), function (a) {
      return { name: text(a), href: a.href };
    }).filter(function (d) { return d.name; });

    var desc = root.querySelector('.djep-eventdescriptionbox');
    var times = root.querySelector('.djep-eventdatetimesbox');
    var totals = root.querySelector('.djep-totalfeebox');
    var req = root.querySelector('.djep-requestchangesbox a[href]');
    var pay = root.querySelector('a.djep-paymentbutton');
    return {
      id: labelValue(desc, 'Event ID'),
      name: labelValue(desc, 'Event Name'),
      type: labelValue(desc, 'Event Type'),
      status: labelValue(desc, 'Booking Status'),
      date: labelValue(times, 'Event Date'),
      setup: labelValue(times, 'Setup Time'),
      start: labelValue(times, 'Start Time'),
      end: labelValue(times, 'End Time'),
      venueLines: boxLines(root.querySelector('.djep-venueinfobox'), /^venue information$/i),
      venue: boxLines(root.querySelector('.djep-venueinfobox'), /^venue information$/i).join(', ') || null,
      staff: boxLines(root.querySelector('.djep-staffingbox'), /^staffing$|^attire:/i),
      attire: labelValue(root.querySelector('.djep-staffingbox'), 'Attire'),
      service: service,
      lines: lines,
      history: history,
      documents: docs,
      subtotal: money(labelValue(totals, 'Subtotal')),
      totalFee: money(labelValue(totals, 'TOTAL FEE')),
      deposit: money(labelValue(totals, 'DEPOSIT')),
      payments: money(labelValue(totals, 'Payments')),
      balanceDue: money(labelValue(totals, 'BALANCE DUE')),
      links: { request: req ? req.href : null, payment: pay ? pay.href : null }
    };
  }

  /* Fetch another portal page (same login session) and read it without leaving the current page. */
  function fetchPage(url) {
    return fetch(url, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) { return new DOMParser().parseFromString(html, 'text/html'); });
  }

  function loadEventDetails(eventId) {
    return fetchPage('/clients/eventdetails.asp?eventid=' + encodeURIComponent(eventId)).then(readEventDetails);
  }

  return { readEventList: readEventList, readEventDetails: readEventDetails, loadEventDetails: loadEventDetails, fetchPage: fetchPage };
})();

/* ---- src/model.js ---- */
/* Turns raw DJEP data (from MQ.reader) into everything the event page needs:
 * payment schedule, journey steps, add-on options. No DOM work here, so it is easy to test.
 */
window.MQ = window.MQ || {};

MQ.model = (function () {
  var U = MQ.util;

  function team(employeeId, isBooth) {
    var t = isBooth ? MQ.config.COMPANY_CONTACT : (MQ.config.TEAM[employeeId] || MQ.config.FALLBACK_HEADLINER);
    var base = MQ.ASSET_BASE + 'team/';
    var digits = (t.phone || '').replace(/\D/g, '');
    return Object.assign({}, t, {
      photo: t.photoFile ? base + t.photoFile : '',
      cardPhoto: base + (t.cardPhotoFile || t.photoFile),
      logo: t.logoFile ? base + t.logoFile : '',
      tel: digits ? 'tel:+1' + digits : '',
      sms: digits ? 'sms:+1' + digits : '',
      mailto: t.email ? 'mailto:' + t.email : '',
      igUrl: t.instagram ? 'https://www.instagram.com/' + t.instagram + '/' : '',
      handle: t.instagram ? '@' + t.instagram : ''
    });
  }

  /* 25 / 25 / 25 / balance. Paid amount is applied to installments in order. */
  function schedule(eventDate, total, paid) {
    var plan = MQ.config.PAYMENT_PLAN;
    var t = U.today();
    var running = 0, applied = paid || 0;
    return plan.map(function (p, i) {
      var amount = i === plan.length - 1 ? U.round2(total - running) : U.round2(total * p.pct);
      running = U.round2(running + amount);
      var due = p.monthsBefore ? U.addMonths(eventDate, -p.monthsBefore) : (p.daysBefore ? U.addDays(eventDate, -p.daysBefore) : null);
      var covered = Math.min(amount, Math.max(0, applied));
      applied = U.round2(applied - covered);
      var left = U.round2(amount - covered);
      var status;
      if (left <= 0.005) status = 'paid';
      else if (!due || U.daysBetween(t, due) <= 0) status = 'due';
      else status = 'upcoming';
      return { label: p.label, amount: amount, left: left, due: due, status: status };
    });
  }

  /* Which catalog items are already on this event (or covered by a separate photo booth event). */
  function bookedIds(lines, hasBoothEvent) {
    var names = lines.map(function (l) { return l.name.toLowerCase(); });
    return MQ.config.CATALOG.filter(function (c) {
      if (c.repeatable) return false;
      if (c.booth && hasBoothEvent) return true;
      return names.some(function (n) { return n.indexOf(c.match) >= 0; });
    }).map(function (c) { return c.id; });
  }

  function addOptions(lines, hasBoothEvent, isBoothEvent) {
    var booked = bookedIds(lines, hasBoothEvent);
    var avail = MQ.config.CATALOG.filter(function (c) {
      if (booked.indexOf(c.id) >= 0) return false;
      return isBoothEvent ? c.booth : true;
    });
    var featured = [];
    MQ.config.FEATURED.forEach(function (id) {
      var c = avail.filter(function (a) { return a.id === id; })[0];
      if (c && featured.length < 4) featured.push(c);
    });
    var rest = avail.filter(function (c) { return featured.indexOf(c) < 0; });
    var groups = [];
    rest.forEach(function (c) {
      var g = groups.filter(function (x) { return x.label === c.cat; })[0];
      if (!g) { g = { label: c.cat, items: [] }; groups.push(g); }
      g.items.push(c);
    });
    return { featured: featured, groups: groups, all: avail };
  }

  function journey(eventDate, sched, isBooth, signed, designSent) {
    var t = U.today();
    var cfg = MQ.config;
    function st(date, endDate) {
      if (!date) return 'done';
      var d = U.daysBetween(t, date);
      if (endDate && d <= 0 && U.daysBetween(t, endDate) >= 0) return 'open';
      return d <= 0 ? 'past' : 'future';
    }
    var creativeFrom = U.addMonths(eventDate, -cfg.CREATIVE_SESSION.fromMonthsBefore);
    var creativeTo = U.addMonths(eventDate, -cfg.CREATIVE_SESSION.toMonthsBefore);
    var finalFrom = U.addDays(eventDate, -cfg.FINAL_PLANNING.fromDaysBefore);
    var finalTo = U.addDays(eventDate, -cfg.FINAL_PLANNING.toDaysBefore);

    function payStep(num, title, p, note) {
      var status = p.status === 'paid' ? 'Paid' : (p.status === 'due' ? 'Due Now' : 'Upcoming');
      return {
        num: num, title: title, date: p.due, when: p.due ? 'Due ' + U.fmtDate(p.due) : 'At booking',
        note: note, amount: p.status === 'paid' ? U.money(p.amount) + ' paid' : U.money(p.left) + (p.left < p.amount ? ' remaining' : ''),
        done: p.status === 'paid', status: status, pay: p.status !== 'paid'
      };
    }

    var steps = [];
    var retainer = sched[0];
    steps.push({ num: '01', title: 'Date Secured', date: null, when: retainer.status === 'paid' ? 'Retainer paid' : 'Retainer ' + U.money(retainer.left) + ' due',
      note: 'Your date is locked in with Marquee.', done: retainer.status === 'paid', status: retainer.status === 'paid' ? 'Done' : 'Due Now', pay: retainer.status !== 'paid' });
    if (!isBooth) {
      /* Lights up pink 30 days after signing. Signing = first payment (the retainer is paid when the contract is signed). */
      var lit = signed && U.daysBetween(U.addDays(signed, 30), t) >= 0;
      steps.push({ num: '02', title: 'Planning App', date: null, when: '',
        note: 'To be completed with your headliner.', done: false, status: lit ? 'Ready' : 'With Headliner', lit: lit, noAway: true, planApp: true });
    }
    steps.push(payStep(isBooth ? '02' : '03', '9-Month Payment', sched[1], '25% of your total.'));
    steps.push(payStep(isBooth ? '03' : '04', '6-Month Payment', sched[2], '25% of your total.'));
    if (!isBooth) {
      var cs = st(creativeFrom, creativeTo);
      steps.push({ num: '05', title: 'Creative Session', date: creativeFrom, optional: true,
        when: U.fmtDate(creativeFrom) + ' to ' + U.fmtDate(creativeTo),
        note: 'Optional. Love planning together? Book one. Happy in Vibo? You are all set.',
        done: cs === 'past', status: cs === 'open' ? 'Open' : (cs === 'past' ? 'Window Closed' : 'Optional'), book: 'creative' });
    }
    steps.push(payStep(isBooth ? '04' : '06', 'Final Payment', sched[3], 'Balance due 90 days before your event.'));
    if (!isBooth) {
      var fs = st(finalFrom, finalTo);
      steps.push({ num: '07', title: 'Final Planning', date: finalFrom, when: U.fmtDate(finalFrom) + ' to ' + U.fmtDate(finalTo),
        note: 'Walk through every detail with your headliner, 2 to 4 weeks out.', done: fs === 'past', status: fs === 'open' ? 'Book Now' : (fs === 'past' ? 'Done' : 'Upcoming'), book: 'final' });
    }
    if (isBooth) {
      var dd = U.addDays(eventDate, -(cfg.PRINT_DESIGN_DAYS_BEFORE || 30));
      steps.push({ num: '05', title: 'Print Design', date: dd, when: 'Send by ' + U.fmtDate(dd),
        note: 'Pick your template and send us your wording and any changes.', done: !!designSent,
        status: designSent ? 'Sent' : 'Open', design: !designSent, noAway: !!designSent });
    }
    var daysOut = U.daysBetween(t, eventDate);
    var lvl = daysOut <= 0 ? 4 : daysOut <= 14 ? 3 : daysOut <= 60 ? 2 : daysOut <= 180 ? 1 : 0;
    steps.push({ num: isBooth ? '06' : '08', title: "Let's Dance", date: eventDate, isFinal: true, lvl: lvl,
      when: U.fmtDateLong(eventDate), away: daysOut === 0 ? 'Tonight' : (daysOut < 0 ? 'What a night' : U.away(daysOut)) });

    steps.forEach(function (s) {
      if (!s.isFinal && !s.away) s.away = s.done ? (s.status === 'Window Closed' ? 'Closed' : 'Complete') : (s.date ? U.away(U.daysBetween(t, s.date)) : 'Now');
    });
    var firstOpen = steps.filter(function (s) { return !s.done && !s.isFinal && !s.planApp; })[0];
    if (firstOpen) firstOpen.next = true;

    /* Progress: steps are spaced evenly; the marker sits between the last reached step and the next by date. */
    var n = steps.length, idx = 0;
    var anchor = U.addMonths(eventDate, -12);
    var dates = steps.map(function (s, i) { return s.date || (i === 0 ? anchor : null); });
    for (var i = 1; i < n; i++) if (!dates[i]) dates[i] = dates[i - 1];
    for (i = 0; i < n; i++) if (U.daysBetween(dates[i], t) >= 0) idx = i;
    var frac = 0;
    if (idx < n - 1) {
      var span = U.daysBetween(dates[idx], dates[idx + 1]);
      frac = span > 0 ? Math.min(1, U.daysBetween(dates[idx], t) / span) : 0;
    }
    var pct = Math.max(2, Math.min(100, Math.round(((idx + frac) / (n - 1)) * 100)));
    if (daysOut <= 0) pct = 100;
    steps.forEach(function (s, i) { s.left = n > 1 ? (i / (n - 1)) * 100 : 0; s.reached = i <= idx; });
    return { steps: steps, pct: pct };
  }

  /* Earliest payment date in DJEP's payment history, used as the contract signing date. */
  function signedDate(history) {
    var best = null;
    (history || []).forEach(function (cells) {
      cells.some(function (c) {
        var m = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/.exec(c);
        if (!m) return false;
        var d = new Date(+m[3], +m[1] - 1, +m[2]);
        if (!best || d < best) best = d;
        return true;
      });
    });
    return best;
  }

  function build(listItem, details, allEvents) {
    var eventDate = U.parseDate(details.date) || U.parseDate(listItem.date);
    var total = details.totalFee || 0;
    var balance = details.balanceDue != null ? details.balanceDue : total;
    var paid = U.round2(total - balance);
    var isBooth = listItem.isPhotoBooth;
    var hasBoothEvent = allEvents.some(function (e) { return e.isPhotoBooth; });
    var sched = schedule(eventDate, total, paid);
    var next = sched.filter(function (p) { return p.status !== 'paid'; })[0] || null;
    var couple = U.coupleFromName(listItem.name || details.name, listItem.type || details.type, listItem.package);
    return {
      id: listItem.id,
      list: listItem,
      details: details,
      isBooth: isBooth,
      dj: team(listItem.employeeId, isBooth),
      eventDate: eventDate,
      couple: couple,
      total: total, paid: paid, balance: balance,
      schedule: sched, next: next,
      journey: journey(eventDate, sched, isBooth, signedDate(details.history), isBooth && U.store('mq-design-' + listItem.id)),
      options: addOptions(details.lines || [], hasBoothEvent, isBooth),
      venue: venueShort(details.venue)
    };
  }

  /* Just the venue name and city, no street address. */
  function venueShort(v) {
    if (!v) return '';
    var parts = v.split(/,\s*/).filter(function (p) { return !/^\d+\s/.test(p) && !/^\d{5}/.test(p) && !/^(ph|phone)[:\s]/i.test(p); });
    return parts.slice(0, 2).join(' \u00b7 ');
  }

  return { build: build, schedule: schedule, team: team, addOptions: addOptions, journey: journey };
})();

/* ---- src/requests.js ---- */
/* Request to Add. Sends the couple's picks to Bob through DJEP's own Request Changes form
 * ("something else" box, field request_change_comments). Nothing is added to the event automatically:
 * Bob reviews every request in DJEP and adds approved items himself.
 *
 * MQ.config.REQUEST_MODE = 'test' builds the exact message but does not send it.
 */
window.MQ = window.MQ || {};

MQ.requests = (function () {
  var U = MQ.util;
  var KEY = 'mq-pending-';

  function pending(eventId) { return U.store(KEY + eventId) || []; }
  function setPending(eventId, list) { U.store(KEY + eventId, list); }

  /* Header used on every request so Bob's Gmail filter can find them ("MARQUEE PORTAL REQUEST"). */
  function header(vm, kind) {
    var what = vm.isBooth ? (vm.list.package || 'Photo Booth') : U.typeName(vm.list.type || vm.details.type);
    return ['MARQUEE PORTAL REQUEST: ' + kind, vm.couple.couple, what + ', ' + U.fmtDate(vm.eventDate)].join('\n');
  }

  function message(vm, items) {
    var sum = items.reduce(function (a, c) { return a + c.price; }, 0);
    var lines = items.map(function (c) { return '- ' + c.name + ' (' + U.money(c.price) + (c.unit ? '/' + c.unit : '') + ')'; });
    return [header(vm, 'ADD-ONS'), lines.join('\n'),
      'Adds ' + U.money(sum) + ' | New total ' + U.money(vm.total + sum),
      'Review in DJEP before adding.'].join('\n');
  }

  /* DJEP has one form per change type (venue, time, date, other). We use the "other" form
   * (action ...?action=request_change&change_type=other). */
  function buildSubmission(eventId) {
    return MQ.reader.fetchPage('/clients/requestchanges.asp?eventid=' + encodeURIComponent(eventId)).then(function (doc) {
      var forms = Array.prototype.filter.call(doc.querySelectorAll('form'), function (f) { return f.querySelector('[name="request_change_comments"]'); });
      var form = forms.filter(function (f) { return /change_type=other/i.test(f.getAttribute('action') || ''); })[0] ||
        forms.filter(function (f) {
          return Array.prototype.every.call(f.elements, function (e) { return !e.name || e.name === 'request_change_comments' || e.type === 'hidden' || e.type === 'submit'; });
        })[0] || null;
      if (!form) throw new Error('Request form not found (you may have been logged out).');
      var action = new URL(form.getAttribute('action') || location.href, location.origin + '/clients/').href;
      var hidden = {};
      Array.prototype.forEach.call(form.querySelectorAll('input[type=hidden][name]'), function (h) { hidden[h.name] = h.value; });
      return { action: action, hidden: hidden };
    });
  }

  /* DJEP's comments box holds 250 characters, so longer messages go as numbered parts. */
  function chunks(text) {
    var max = 215, out = [], rest = text.trim();
    if (rest.length <= 250) return [rest];
    while (rest.length) {
      var cut = rest.length <= max ? rest.length : Math.max(rest.lastIndexOf(' | ', max), rest.lastIndexOf(' ', max));
      if (cut < 60) cut = max;
      out.push(rest.slice(0, cut).trim()); rest = rest.slice(cut).trim();
    }
    return out.map(function (c, i) { return (i ? 'MARQUEE PORTAL REQUEST (' + (i + 1) + '/' + out.length + ' continued) ' : '(1/' + out.length + ') ') + c; });
  }

  /* Posts one part as a normal form (DJEP's classic ASP pages cannot read multipart uploads)
   * and only counts it as sent when DJEP replies "has been submitted". */
  function post(sub, part) {
    var body = new URLSearchParams();
    Object.keys(sub.hidden).forEach(function (k) { body.set(k, sub.hidden[k]); });
    body.set('request_change_comments', part);
    return fetch(sub.action, { method: 'POST', body: body, credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('DJEP returned ' + r.status + '.');
      return r.text();
    }).then(function (t) {
      if (!/has been submitted/i.test(t)) throw new Error(/logonform/i.test(t) ? 'You were logged out. Please log in again and resend.' : 'DJEP did not confirm the request.');
    });
  }

  /* DJEP silently skips its notification email when the comment has line breaks (and possibly "&"),
   * so every request goes as one line with " | " between parts. */
  function oneLine(text) {
    return String(text).replace(/&/g, 'and').replace(/\s*\n+\s*/g, ' | ').replace(/\s{2,}/g, ' ').trim();
  }

  function deliver(vm, text) {
    text = oneLine(text);
    var live = MQ.config.REQUEST_MODE === 'live';
    return buildSubmission(vm.id).then(function (sub) {
      if (!live) {
        console.info('[Marquee portal] TEST MODE (not sent)', text);
        return { mode: 'test', text: text };
      }
      return chunks(text).reduce(function (p, part) { return p.then(function () { return post(sub, part); }); }, Promise.resolve())
        .then(function () { return { mode: 'sent', text: text }; });
    });
  }

  /* Returns a promise of { mode: 'test' | 'sent', text }. */
  function send(vm, items) {
    var text = message(vm, items);
    return deliver(vm, text).then(function (res) {
      if (res.mode !== 'sent') return res;
      var list = pending(vm.id);
      items.forEach(function (c) { if (list.indexOf(c.id) < 0) list.push(c.id); });
      setPending(vm.id, list);
      return res;
    });
  }

  /* Any other message from the portal (for example the photo booth print design). Same test/live switch. */
  function sendText(vm, text) { return deliver(vm, text); }

  function cancel(eventId, id) {
    setPending(eventId, pending(eventId).filter(function (x) { return x !== id; }));
  }

  return { send: send, sendText: sendText, header: header, pending: pending, cancel: cancel, message: message };
})();

/* ---- src/reels.js ---- */
/* Latest Reels from the Behold feed. Only posts that mention @marqueeohio or #marqueeohio show.
 * Covers on many Reels are black, so each tile shows a frame from inside the video instead.
 */
window.MQ = window.MQ || {};

MQ.reels = (function () {
  var U = MQ.util;

  function load() {
    return fetch(MQ.config.REELS_FEED).then(function (r) { return r.json(); }).then(function (j) {
      var posts = Array.isArray(j) ? j : (j.posts || []);
      var tags = MQ.config.REELS_FILTER.map(function (t) { return t.toLowerCase(); });
      return posts.filter(function (p) {
        var hay = [(p.caption || ''), (p.mentions || []).join(' '), (p.hashtags || []).join(' ')].join(' ').toLowerCase();
        return tags.some(function (t) { return hay.indexOf(t) >= 0; });
      }).slice(0, 4);
    });
  }

  function tile(p) {
    var video = p.mediaType === 'VIDEO' && p.mediaUrl;
    var poster = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || p.thumbnailUrl || '';
    var media = video
      ? '<video src="' + U.esc(p.mediaUrl) + '#t=2" muted playsinline preload="metadata"></video>'
      : '<img src="' + U.esc(poster || p.mediaUrl) + '" alt="" loading="lazy">';
    return '<a class="mq-reel" href="' + U.esc(p.permalink) + '" target="_blank" rel="noopener" aria-label="Watch on Instagram">' + media +
      '<span class="sh"></span><span class="pl">' + U.icon('play', 14) + '</span><span class="cp">' + U.esc(p.prunedCaption || '') + '</span></a>';
  }

  function render(container) {
    container.innerHTML = '<div class="mq-sechead"><div><span class="mq-eyebrow">Fresh From The Floor</span>' +
      '<h2 class="mq-h2">Latest Reels <span class="mq-serif">from @marqueeohio.</span></h2></div>' +
      '<a class="mq-livepill" href="https://www.instagram.com/marqueeohio/" target="_blank" rel="noopener"><i></i>Live Feed</a></div>' +
      '<div class="mq-reel-grid"></div>';
    var grid = container.querySelector('.mq-reel-grid');
    load().then(function (posts) {
      if (!posts.length) { container.style.display = 'none'; return; }
      grid.innerHTML = posts.map(tile).join('');
    }).catch(function () { container.style.display = 'none'; });
  }

  return { render: render, load: load };
})();

/* ---- src/skin.js ---- */
/* Pages we keep from DJEP because they hold live forms (payments, request changes, profile, contact).
 * DJEP's content and its working buttons stay exactly as they are; we move them into the Marquee
 * layout, replace the old title with a Marquee heading, and add a few page-specific touches.
 */
window.MQ = window.MQ || {};

MQ.skin = (function () {
  var U = MQ.util, esc = U.esc, icon = U.icon;

  var PAGES = [
    { key: 'payment', test: /makeapayment\.asp/i, eyebrow: 'Payments', title: 'Make a Payment', serif: 'quick, simple, secure.', enhance: payment },
    { key: 'request', test: /requestchanges\.asp/i, eyebrow: 'Your Event', title: 'Request Changes', serif: 'we\u2019ll take it from here.', enhance: requestChanges,
      intro: 'Pick what you would like to change and send it over. Your headliner reviews every request and confirms with you before anything changes.' },
    { key: 'profile', test: /profile\.asp/i, eyebrow: 'Your Account', title: 'My Profile', serif: 'your info, up to date.', enhance: profile },
    { key: 'contact', test: /contact\.asp/i, eyebrow: 'Get In Touch', title: 'Contact Us', serif: 'we\u2019re here for you.', enhance: contact,
      intro: 'Send us a message anytime. Texts and emails are answered within 24 to 48 hours. Weekends are show days, so replies may come Monday.' },
    { key: 'planner', test: /planmyevent\.asp/i, eyebrow: 'Planning', title: 'Plan Your Event', serif: 'your night, by design.',
      intro: 'Marquee couples plan their music and timeline in the Vibo app.', enhance: planner }
  ];

  function eventId() { return new URLSearchParams(location.search).get('eventid'); }

  function oldTitle(content) {
    var h = content.querySelector('.djep-h2');
    if (!h) return '';
    var t = '';
    Array.prototype.forEach.call(h.childNodes, function (n) { if (n.nodeType === 3) t += n.textContent; });
    if (!t.trim()) { var s = h.querySelector('span'); t = s ? s.textContent : h.textContent; }
    return t.trim();
  }

  function mount(main) {
    var content = document.getElementById('djep-content');
    if (!content) return;
    var page = PAGES.filter(function (p) { return p.test.test(location.pathname); })[0] || {};
    if (page.key) document.documentElement.classList.add('mq-page-' + page.key);
    var title = page.title || oldTitle(content) || 'Client Portal';
    if (/makeapayment/i.test(location.pathname)) {
      var t = oldTitle(content);
      if (t && !/choose a payment gateway/i.test(t)) title = t.replace(/^make a payment$/i, 'Make a Payment');
    }
    var backId = eventId();
    var hero = document.createElement('div');
    hero.className = 'mq-skin-head';
    hero.innerHTML = (backId ? '<nav class="mq-crumb" aria-label="Breadcrumb"><a href="/clients/eventdetails.asp?eventid=' + encodeURIComponent(backId) + '">' +
        icon('arrow', 14).replace('<svg', '<svg style="transform:rotate(180deg)"') + 'Back to event details</a></nav>' : '') +
      '<section class="mq-hero mq-hero-sm"><span class="mq-eyebrow">' + esc(page.eyebrow || 'Client Portal') + '</span><h1>' + esc(title) + '</h1>' +
      '<p class="mq-serif">' + esc(page.serif || 'your night, by design.') + '</p>' + (page.intro ? '<p>' + esc(page.intro) + '</p>' : '') + '</section>';
    main.appendChild(hero);
    var extra = document.createElement('div');
    extra.className = 'mq-skin-extra';
    main.appendChild(extra);
    content.classList.add('mq-skin-content');
    if (page.enhance) {
      try { page.enhance(content, extra); } catch (e) { console.error('[Marquee portal] skin', e); }
    }
  }

  /* Make a Payment: balance summary on top, gateway buttons as cards. */
  function payment(content, extra) {
    var id = eventId();
    var buttons = content.querySelectorAll('a.djep-paywithbutton');
    if (buttons.length) {
      content.classList.add('mq-paychoose');
      var info = {
        'djep-squarebutton': { name: 'Card', sub: 'Visa, Mastercard, Amex, Discover through Square. A 3.5% processing fee applies.' },
        'djep-venmobutton': { name: 'Venmo', sub: 'Pay from your Venmo app.' },
        'djep-cashappbutton': { name: 'Cash App', sub: 'Pay from your Cash App.' }
      };
      var grid = document.createElement('div');
      grid.className = 'mq-paygrid';
      Array.prototype.forEach.call(buttons, function (a) {
        var meta = info[a.id] || { name: a.textContent.trim() || 'Pay', sub: '' };
        var label = document.createElement('span');
        label.className = 'mq-paytext';
        label.innerHTML = '<b>' + esc(meta.name) + '</b><i>' + esc(meta.sub) + '</i><em>Continue ' + icon('arrow', 14) + '</em>';
        a.appendChild(label);
        a.classList.add('mq-paycard');
        grid.appendChild(a);
      });
      var box = content.querySelector('.djep-makepaymentbox') || content;
      box.insertBefore(grid, box.firstChild);
      Array.prototype.forEach.call(box.querySelectorAll(':scope > p, :scope > br'), function (n) { if (!n.querySelector('a')) n.remove(); });
      var introText = content.querySelector('.col-xs-12');
      if (introText && /option to make payments/i.test(introText.textContent)) introText.style.display = 'none';
      var choose = document.createElement('div');
      choose.className = 'mq-rule hot';
      choose.innerHTML = '<span>Choose How To Pay</span>';
      box.insertBefore(choose, grid);
    }
    var gw = (new URLSearchParams(location.search).get('gateway') || '').toLowerCase();
    if (gw === 'venmo' || gw === 'cashapp') {
      var name = gw === 'venmo' ? 'Venmo' : 'Cash App';
      var box2 = content.querySelector('.djep-makepaymentbox') || content;
      var tip = document.createElement('div');
      tip.className = 'mq-gwtip';
      tip.innerHTML = '<span class="mq-eyebrow">Pay With ' + name + '</span><p class="mq-body">Tap the button below to pay from your ' + name +
        ' app.</p>';
      box2.insertBefore(tip, box2.firstChild);
    }
    if (gw) {
      var other = document.createElement('a');
      other.className = 'mq-otherway';
      other.href = '/clients/makeapayment.asp?action=choose_payment_gateway&eventid=' + encodeURIComponent(id || '');
      other.textContent = 'Choose a different way to pay';
      content.appendChild(other);
    }
    if (!id) return;
    MQ.reader.loadEventDetails(id).then(function (d) {
      var date = U.parseDate(d.date);
      if (!date || d.totalFee == null) return;
      var total = d.totalFee, bal = d.balanceDue != null ? d.balanceDue : total;
      var sched = MQ.model.schedule(date, total, U.round2(total - bal));
      var next = sched.filter(function (p) { return p.status !== 'paid'; })[0];
      var pct = total ? Math.round((total - bal) / total * 100) : 0;
      extra.innerHTML = '<section class="mq-card mq-paysum"><div class="c"><span class="mq-sub">' + esc(U.coupleFromName(d.name, d.type).couple) + '</span>' +
        '<b class="t">' + esc(U.typeName(d.type)) + ' \u00b7 ' + esc(U.fmtDateLong(date)) + '</b>' +
        '<div class="mq-meter" style="margin-top:14px"><div style="width:' + pct + '%"></div></div>' +
        '<div class="mq-meter-lbl"><span><b>' + U.money(total - bal, true) + '</b> paid</span><span><b>' + U.money(bal, true) + '</b> remaining</span></div></div>' +
        (next ? '<div class="mq-next"><span>' + (next.status === 'due' ? 'Due Now \u00b7 ' : 'Next Payment \u00b7 ') + esc(next.label) + '</span><b>' + U.money(next.left) +
          '</b><span>' + (next.due ? (next.status === 'due' ? 'Was due ' : 'Due ') + U.fmtDateLong(next.due) : 'Due now') + '</span></div>'
          : '<div class="mq-next paid"><span>All Set</span><b>Paid in full</b><span>Thank you!</span></div>') +
        '</section>';
    }).catch(function () {});
  }

  /* Request Changes: the four choices become cards; DJEP shows the matching form below. */
  function requestChanges(content) {
    var radios = content.querySelectorAll('input[type=radio][name=type_of_change]');
    if (!radios.length) return;
    var wrap = radios[0].closest('.col-xs-12') || radios[0].parentNode.parentNode;
    wrap.classList.add('mq-choices');
    var subs = ['Moving to a new date', 'Start or end times', 'New location', 'Anything else, including add-ons'];
    Array.prototype.forEach.call(radios, function (r, i) {
      var label = r.closest('label');
      if (!label) return;
      label.classList.add('mq-choice');
      var t = label.textContent.trim().replace(/^change of /i, '');
      Array.prototype.forEach.call(label.childNodes, function (n) { if (n.nodeType === 3) n.textContent = ''; });
      var s = document.createElement('span');
      s.innerHTML = '<b>' + esc(t.charAt(0).toUpperCase() + t.slice(1)) + '</b><i>' + esc(subs[i] || '') + '</i>';
      label.appendChild(s);
    });
  }

  function profile(content) { content.classList.add('mq-profile'); }

  function contact(content) {
    var icons = { 'djep-contacttelephone': 'phone', 'djep-contactemail': 'mail', 'djep-contactmail': 'pin', 'djep-contactaddress': 'pin', 'djep-contactwebsite': 'arrow' };
    Array.prototype.forEach.call(content.querySelectorAll('.djep-ourcontactinfobox td[id]'), function (td) {
      var name = icons[td.id] || (/addr/i.test(td.id) ? 'pin' : /web/i.test(td.id) ? 'arrow' : 'chat');
      td.innerHTML = '<span class="mq-ico">' + icon(name, 18) + '</span>';
    });
  }

  function planner(content, extra) {
    extra.innerHTML = '<section class="mq-card mq-dcard" style="align-items:flex-start"><span class="mq-eyebrow">Plan In Vibo</span>' +
      '<p class="mq-body">Build your timeline, must-play and do-not-play lists in the Vibo app. Your headliner sees every change.</p>' +
      '<a class="mq-btn mq-btn-pink" href="' + MQ.config.VIBO_URL + '" target="_blank" rel="noopener">' + icon('music', 16) + 'Open Vibo</a></section>';
  }

  return { mount: mount };
})();

/* ---- src/shell.js ---- */
/* Header, footer and the app container. Our header replaces DJEP's on every portal page. */
window.MQ = window.MQ || {};

MQ.shell = (function () {
  var U = MQ.util;

  function navLinks() {
    var path = location.pathname.toLowerCase();
    var logout = Array.prototype.filter.call(document.querySelectorAll('#djep-navbar a, #djep-header a'), function (a) {
      return /log\s*out/i.test(a.textContent);
    })[0];
    var items = [
      { label: 'Home', href: '/clients/home.asp', on: /home\.asp|\/clients\/?$/.test(path) },
      { label: 'My Events', href: '/clients/events.asp', on: /events\.asp|eventdetails|makeapayment|requestchanges/.test(path) },
      { label: 'My Profile', href: '/clients/profile.asp', on: /profile\.asp/.test(path) },
      { label: 'Contact', href: '/clients/contact.asp', on: /contact\.asp/.test(path) }
    ];
    var html = items.map(function (i) {
      return '<a href="' + i.href + '"' + (i.on ? ' aria-current="page"' : '') + '>' + i.label + '</a>';
    }).join('');
    html += '<a href="#" data-mq-logout aria-label="Logout">' + U.icon('logout', 14) + '<span class="mq-hide-sm">Logout</span></a>';
    return { html: html, logout: logout };
  }

  function header() {
    var n = navLinks();
    var el = document.createElement('header');
    el.className = 'mq-header';
    el.innerHTML = '<div class="mq-header-in"><a href="/clients/home.asp" aria-label="Marquee Events home"><img src="' +
      MQ.ASSET_BASE + 'brand/marquee-logo-white.png" alt="Marquee Events"></a><nav class="mq-nav" aria-label="Client portal">' + n.html + '</nav></div>';
    var lo = el.querySelector('[data-mq-logout]');
    lo.addEventListener('click', function (e) {
      e.preventDefault();
      if (n.logout) n.logout.click(); else location.href = '/clients/logout.asp';
    });
    return el;
  }

  function footer() {
    var el = document.createElement('footer');
    el.className = 'mq-footer';
    el.innerHTML = '<span>Marquee Events \u00b7 Luxury Wedding Entertainment</span><span class="mq-serif">your night, by design.</span>';
    return el;
  }

  /* Puts the Marquee header, main area and footer on the page. On takeover pages DJEP's content is hidden;
   * on other pages MQ.skin moves DJEP's content into the main area. */
  function mount(takeover) {
    var page = document.getElementById('djep-page') || document.body;
    var wrap = document.createElement('div');
    wrap.className = 'mq-app';
    wrap.id = 'mq-app';
    wrap.appendChild(header());
    var main = document.createElement('main');
    main.className = 'mq-main' + (takeover ? '' : ' mq-skin-main');
    page.insertBefore(wrap, page.firstChild);
    var content = document.getElementById('djep-content');
    if (takeover || !content) {
      wrap.appendChild(main);
      wrap.appendChild(footer());
    } else {
      /* DJEP's content must never be moved: moving it reloads Square's secure card frame and breaks payments.
       * The Marquee heading goes right before it and the footer right after it. */
      var head = document.createElement('div');
      head.className = 'mq-app mq-skin-top';
      head.appendChild(main);
      content.parentNode.insertBefore(head, content);
      var foot = document.createElement('div');
      foot.className = 'mq-app';
      foot.appendChild(footer());
      content.parentNode.insertBefore(foot, content.nextSibling);
    }
    if (!MQ.config.LIVE_FOR_EVERYONE) {
      var b = document.createElement('div');
      b.className = 'mq-test-banner';
      b.textContent = 'Marquee preview \u00b7 test mode';
      wrap.appendChild(b);
    }
    if (!takeover) {
      document.documentElement.classList.add('mq-skin');
      MQ.skin.mount(main);
    }
    return main;
  }

  return { mount: mount };
})();

/* ---- src/render-chooser.js ---- */
/* "Your Events" chooser. Shown only when a couple has 2 or more events (for example DJ + photo booth),
 * and it only lists the events they actually have.
 */
window.MQ = window.MQ || {};

MQ.renderChooser = (function () {
  var U = MQ.util, esc = U.esc;

  function render(main, events) {
    var first = U.coupleFromName(events[0].name, events[0].type, events[0].package).first;
    var cards = events.map(function (e) {
      var d = U.parseDate(e.date);
      var dj = MQ.model.team(e.employeeId);
      var img = e.isPhotoBooth ? MQ.ASSET_BASE + 'events/photo-booth-scrapbook.jpg' : dj.cardPhoto;
      var label = e.isPhotoBooth ? (e.package || 'Photo Booth') : 'Wedding Entertainment';
      return '<a class="mq-evcard" href="?mqevent=' + e.id + '"><div class="img"><img src="' + esc(img) + '" alt="" style="object-position:center ' + (e.isPhotoBooth ? '62%' : (dj.cardPos || 'center 6%').replace('center ', '')) + '"></div>' +
        '<div class="bd"><span class="mq-eyebrow">' + U.icon(e.isPhotoBooth ? 'camera' : 'music', 13) + ' ' + esc(e.isPhotoBooth ? 'Photo Booth' : 'DJ & MC') + '</span>' +
        '<h3>' + esc(label) + '</h3><span class="meta">' + esc(U.fmtDateLong(d)) + (e.isPhotoBooth ? '' : ' \u00b7 with ' + esc(dj.first)) + '</span>' +
        '<span class="mq-chip mq-chip-ok" style="align-self:flex-start"><span class="mq-dot"></span>' + esc(e.status || 'Booked') + '</span>' +
        '<span class="go">Open This Event ' + U.icon('arrow', 14) + '</span>' +
        '<span class="mq-evbrand">' + (e.isPhotoBooth ? '' : '<span class="mq-tier">' + esc(dj.cardTier || dj.tier) + '</span>') +
        (e.isPhotoBooth || dj.logo
          ? '<img class="mq-evlogo" src="' + esc(e.isPhotoBooth ? MQ.ASSET_BASE + 'brand/marquee-logo-white.png' : dj.logo) + '" alt="" style="height:' +
            (e.isPhotoBooth ? 34 : (dj.cardLogoH || Math.round((dj.logoH || 58) * 0.78))) + 'px" onerror="this.remove()">'
          : '<span class="mq-evname">' + esc(dj.name) + '</span>') + '</span></div></a>';
    }).join('');
    main.innerHTML = '<section class="mq-hero"><span class="mq-eyebrow">Client Portal</span><h1>Welcome back,<br>' + esc(first) + '.</h1>' +
      '<p class="mq-serif">your night, by design.</p><p>You have ' + events.length + ' events with Marquee. Pick one to see its details, payments and add-ons.</p></section>' +
      '<section aria-label="Your events"><div class="mq-sechead" style="margin-bottom:16px"><div><span class="mq-eyebrow">Your Events</span><h2 class="mq-h2">Choose Your Event</h2></div></div>' +
      '<div class="mq-choose">' + cards + '</div></section>';
  }

  return { render: render };
})();

/* ---- src/render-event.js ---- */
/* The event page: hero, event + headliner card with countdown, journey, planning sessions,
 * your night + where you stand, add to your night, messages and reels.
 */
window.MQ = window.MQ || {};

MQ.renderEvent = (function () {
  var U = MQ.util, esc = U.esc, icon = U.icon;

  function switcher(vm, events) {
    if (events.length < 2) return '';
    var links = events.map(function (e) {
      var label = e.isPhotoBooth ? (e.package || 'Photo Booth') : 'Wedding Entertainment';
      return '<a href="?mqevent=' + e.id + '"' + (e.id === vm.id ? ' aria-current="page"' : '') + '>' +
        icon(e.isPhotoBooth ? 'camera' : 'music', 14) + esc(label) + '</a>';
    }).join('');
    return '<nav class="mq-switch" aria-label="Your events">' + links + '<a class="mq-all" href="?mqevent=all">All Events</a></nav>';
  }

  function hero(vm) {
    var sub = vm.isBooth
      ? 'Your photo booth details, payments and add-ons, all in one place.'
      : 'Track your timeline, payments and every detail of your night, all in one place. Plan your music in Vibo.';
    return '<section class="mq-hero"><span class="mq-eyebrow">Client Portal</span>' +
      '<h1>Welcome back,<br>' + esc(vm.couple.first) + '.</h1><p class="mq-serif">your night, by design.</p><p>' + sub + '</p></section>';
  }

  function miniBars() {
    return U.wave(64, 3).map(function (h) { return '<span style="height:' + Math.round(6 + h * 38) + 'px"></span>'; }).join('');
  }

  function eventCard(vm) {
    var d = vm.eventDate, dj = vm.dj;
    var next = vm.next;
    var nextLine = next ? 'Next: ' + U.money(next.left) + (next.due ? (next.status === 'due' ? ' due now' : ' due ' + U.fmtDate(next.due)) : ' due now') : 'Paid in full';
    var photo = vm.isBooth ? MQ.ASSET_BASE + 'events/photo-booth-scrapbook.jpg' : dj.photo;
    var contacts = [
      dj.tel && '<a href="' + dj.tel + '">' + icon('phone') + '<span>' + esc(dj.phone) + '</span></a>',
      dj.sms && '<a href="' + dj.sms + '">' + icon('chat') + '<span>Send a text</span></a>',
      dj.mailto && '<a href="' + dj.mailto + '">' + icon('mail') + '<span>' + esc(dj.email) + '</span></a>',
      dj.igUrl && '<a href="' + dj.igUrl + '" target="_blank" rel="noopener">' + icon('ig') + '<span>' + esc(dj.handle) + '</span></a>'
    ].filter(Boolean).join('');
    var links = vm.list.links;
    var vibo = vm.isBooth ? '' : '<a class="mq-btn mq-btn-ghost" href="' + MQ.config.VIBO_URL + '" target="_blank" rel="noopener">' + icon('music', 15) + 'Open Vibo</a>';
    return '<section class="mq-event" aria-labelledby="mq-ev-title"><div class="mq-event-row">' +
      '<div class="mq-photo"><img src="' + esc(photo) + '" alt="' + esc(vm.isBooth ? 'Marquee photo booth' : dj.name) + '" style="object-position:' + (vm.isBooth ? 'center 35%' : (dj.pos || 'center 20%')) + '">' +
      '<div class="mq-fade"></div><div class="mq-edge"></div><div class="mq-mini" aria-hidden="true">' + miniBars() + '</div></div>' +
      '<div class="mq-event-body">' +
        '<div class="mq-ev-top">' +
          '<div class="mq-datetile" aria-label="' + esc(U.fmtDateLong(d)) + '"><div class="m">' + U.MONTHS[d.getMonth()] + '</div><div class="b"><div class="d">' + d.getDate() +
          '</div><div class="y">' + d.getFullYear() + '</div><div class="w">' + U.DAYS[d.getDay()] + '</div></div></div>' +
          '<div class="mq-ev-info"><div class="mq-tags"><span class="mq-eyebrow" style="letter-spacing:.28em">Your Upcoming Event</span>' +
          '<span class="mq-chip mq-chip-ok"><span class="mq-dot"></span>' + esc(vm.list.status || 'Booked') + '</span></div>' +
          '<h2 id="mq-ev-title">' + esc(vm.couple.couple) + '<br><span>' + esc(vm.isBooth ? (vm.list.package || U.typeName(vm.list.type || vm.details.type)) : U.typeName(vm.list.type || vm.details.type)) + '</span></h2>' +
          (vm.venue ? '<div class="mq-venue">' + icon('pin', 15) + '<span>' + esc(vm.venue) + '</span></div>' : '') +
          '</div></div>' +
        '<div class="mq-actions">' +
          '<a class="mq-btn mq-btn-pink mq-pay" href="' + esc(links.payment || '#') + '">' + icon('card', 18) + '<span class="t"><b>Make a Payment</b><i>' + esc(nextLine) + '</i></span></a>' +
          vibo +
          '<a class="mq-btn mq-btn-ghost" href="' + esc(links.details || '#') + '">Event Details</a>' +
        '</div>' +
        '<div class="mq-headliner"><span class="mq-eyebrow">' + (vm.isBooth ? 'Your Point Of Contact' : 'Your Headliner') + '</span>' +
          '<div class="mq-hl-row">' + (dj.logo ? '<img src="' + esc(dj.logo) + '" alt="' + esc(dj.name) + ', Marquee Events" style="height:' + dj.logoH + 'px" onerror="this.outerHTML=\'<span class=&quot;mq-hl-name&quot;>' + esc(dj.name) + '</span>\'">' : '<span class="mq-hl-name">' + esc(dj.name) + '</span>') +
          '<span class="mq-tier">' + esc(dj.tier) + '</span></div>' +
          '<span class="mq-role"><b>' + esc(dj.role) + '</b> \u00b7 ' + (vm.isBooth ? esc(dj.note) : 'Your go-to for music, timeline and every big moment of the night.') + '</span>' +
          (contacts ? '<div class="mq-contacts">' + contacts + '</div>' : '') +
          '<p class="mq-note">Texts and emails are answered within 24 to 48 hours. Weekends are show days, so replies may come Monday.</p>' +
        '</div>' +
      '</div></div>' +
      '<div class="mq-countdown" role="timer" aria-label="Countdown to your event"><div class="lbl"><span class="mq-live" aria-hidden="true"></span>The Countdown Is On</div>' +
      '<div class="mq-units" data-mq-countdown></div></div></section>';
  }

  function startCountdown(root, eventDate) {
    var box = root.querySelector('[data-mq-countdown]');
    if (!box) return;
    var target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 17, 0, 0);
    function tick() {
      var now = MQ.util.overrideToday ? new Date(new Date(MQ.util.overrideToday + 'T12:00:00').getTime() + (Date.now() % 1000)) : new Date();
      var ms = Math.max(0, target - now);
      var s = Math.floor(ms / 1000);
      var vals = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      var labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
      box.innerHTML = vals.map(function (v, i) {
        return '<div class="mq-unit"><b>' + (i ? String(v).padStart(2, '0') : v) + '</b><i>' + labels[i] + '</i></div>' + (i < 3 ? '<span class="mq-sep" aria-hidden="true">:</span>' : '');
      }).join('');
    }
    tick();
    setInterval(tick, 1000);
  }

  function journey(vm) {
    var j = vm.journey;
    var bars = U.wave(120, 7).map(function (h, i) {
      var on = (i / 119) * 100 <= j.pct;
      return '<span class="' + (on ? '' : 'off') + '" style="height:' + Math.round(10 + h * 104) + 'px"></span>';
    }).join('');
    var pins = j.steps.map(function (s) {
      return '<div class="mq-pin' + (s.reached ? ' on' : '') + '" style="left:' + s.left + '%"><span>' + s.num + '</span><span></span></div>';
    }).join('');
    var cards = j.steps.map(function (s) {
      if (s.isFinal) {
        return '<li class="mq-step mq-drop lvl' + s.lvl + '"><div class="top"><span class="num">' + s.num + ' \u00b7 The Drop</span><span class="tag"><span class="rec"></span>' +
          (vm.isBooth ? 'Event Night' : 'Wedding Night') + '</span></div><span class="big">Let\'s<br>Dance</span><span class="when">' + esc(s.when) +
          '</span><span class="gd">Trust the Marquee team. Your vision and the party of your dreams come to life.</span><span class="aw">' + esc(s.away) + '</span></li>';
      }
      var chip = s.done ? 'mq-chip-ok' : (s.lit || s.status === 'Due Now' || s.status === 'Open' || s.status === 'Book Now') ? 'mq-chip-pink' : 'mq-chip-dim';
      var extra = '';
      if (s.amount) extra += '<span class="amt">' + esc(s.amount) + '</span>';
      if (s.pay && (s.status === 'Due Now')) extra += '<a class="lnk" href="' + esc(vm.list.links.payment || '#') + '">Pay now</a>';
      if (s.design) extra += '<a class="lnk" href="#mq-design">Choose your design</a>';
      if (s.vibo) extra += '<a class="lnk" href="' + MQ.config.VIBO_URL + '" target="_blank" rel="noopener">Open Vibo</a>';
      return '<li class="mq-step' + (s.done ? ' done' : '') + (s.next ? ' next' : '') + (s.lit ? ' lit' : '') + '"><div class="top"><span class="num">' + s.num +
        '</span><span class="mq-chip ' + chip + '">' + esc(s.status) + '</span></div><span class="ttl">' + esc(s.title) + '</span>' +
        (s.when ? '<span class="when">' + esc(s.when) + '</span>' : '') + '<span class="nt">' + esc(s.note) + '</span>' + extra + (s.noAway ? '' : '<span class="aw">' + esc(s.away) + '</span>') + '</li>';
    }).join('');
    return '<section class="mq-card mq-journey" aria-labelledby="mq-jr"><div class="mq-sechead"><div><span class="mq-eyebrow">Your Journey</span>' +
      '<h2 class="mq-h2" id="mq-jr">The Marquee Process <span class="mq-serif">epic, by design.</span></h2></div>' +
      '<div class="pct">You\'re <b>' + j.pct + '%</b> of the way to the drop.</div></div>' +
      '<div class="mq-track" aria-hidden="true">' + pins + '<div class="mq-bars">' + bars + '</div><div class="mq-now" style="left:' + j.pct + '%"></div></div>' +
      '<ol class="mq-steps">' + cards + '</ol></section>';
  }

  function sessions(vm) {
    if (vm.isBooth) return '';
    var dj = vm.dj;
    var c = MQ.config, t = U.today(), d = vm.eventDate;
    function link(kind, label) {
      var url = (dj.calendly && dj.calendly[kind]) || (MQ.config.CALENDLY_DEFAULT || {})[kind];
      if (url) return '<a class="mq-btn mq-btn-pink" href="' + esc(url) + '" target="_blank" rel="noopener">' + icon('cal', 15) + label + '</a>';
      if (dj.sms) return '<a class="mq-btn mq-btn-pink" href="' + dj.sms + '?&body=' + encodeURIComponent('Hi ' + dj.first + '! We would love to book our ' + (kind === 'final' ? 'final planning meeting' : 'creative session') + '.') + '">' + icon('chat', 15) + 'Text ' + esc(dj.first) + ' To Book</a>';
      if (dj.mailto) return '<a class="mq-btn mq-btn-pink" href="' + dj.mailto + '">' + icon('mail', 15) + 'Email ' + esc(dj.first) + ' To Book</a>';
      return '<span class="soon">Booking link coming soon.</span>';
    }
    var cf = U.addMonths(d, -c.CREATIVE_SESSION.fromMonthsBefore), ct = U.addMonths(d, -c.CREATIVE_SESSION.toMonthsBefore);
    var ff = U.addDays(d, -c.FINAL_PLANNING.fromDaysBefore), ft = U.addDays(d, -c.FINAL_PLANNING.toDaysBefore);
    function chip(from, to) {
      if (U.daysBetween(t, to) < 0) return '<span class="mq-chip mq-chip-dim">Window Closed</span>';
      if (U.daysBetween(t, from) <= 0) return '<span class="mq-chip mq-chip-pink">Open Now</span>';
      return '<span class="mq-chip mq-chip-dim">Opens ' + U.fmtDate(from) + '</span>';
    }
    return '<section class="mq-sessions" aria-labelledby="mq-bk"><div class="mq-sechead"><div><span class="mq-eyebrow">Book With ' + esc(dj.first) + '</span>' +
      '<h2 class="mq-h2" id="mq-bk">Your Planning Sessions</h2></div></div><div class="mq-sess-grid">' +
      '<div class="mq-card mq-sess"><div class="top"><span class="mq-ico">' + icon('music', 20) + '</span>' + chip(cf, ct) + '</div>' +
      '<h3>Creative Session <span class="mq-chip mq-chip-dim" style="vertical-align:middle">Optional</span></h3><p>Love planning together? Sit down with ' + esc(dj.first) +
      ' to dream up your entrances, first dance and the moments that make your night yours. Happy planning in Vibo? You are all set.</p>' +
      '<div class="meta"><span><b>Best window:</b> ' + U.fmtDate(cf) + ' to ' + U.fmtDate(ct) + '</span><span>About 60 minutes</span></div>' +
      link('creative', 'Book Creative Session') + '</div>' +
      '<div class="mq-card mq-sess"><div class="top"><span class="mq-ico">' + icon('checkbox', 20) + '</span>' + chip(ff, ft) + '</div>' +
      '<h3>Final Planning</h3><p>Lock every detail: timeline, introductions, special songs and vendor timing, so the night runs like a show.</p>' +
      '<div class="meta"><span><b>Best window:</b> ' + U.fmtDate(ff) + ' to ' + U.fmtDate(ft) + '</span><span>About 45 minutes</span></div>' +
      link('final', 'Book Final Planning') + '</div></div></section>';
  }

  function invest(vm, pending) {
    var lines = (vm.details.lines || []).map(function (l) {
      return '<li><span class="ck">' + icon('check', 13) + '</span><span class="nm">' + esc(U.lineName(l.name)) + '</span><span class="pr">' + U.money(l.price) + '</span></li>';
    }).join('');
    var pend = pending.map(function (c) {
      return '<li class="pending"><span class="ck">' + icon('clock', 13) + '</span><span class="nm">' + esc(c.name) + '<small>Awaiting Approval</small></span><span class="pr">' + U.money(c.price) + '</span></li>';
    }).join('');
    var pct = vm.total ? Math.round(vm.paid / vm.total * 100) : 0;
    var n = vm.next;
    var nextBox = n
      ? '<div class="mq-next"><span>' + (n.status === 'due' ? 'Due Now \u00b7 ' : 'Next Payment \u00b7 ') + esc(n.label) + '</span><b>' + U.money(n.left) + '</b><span>' +
        (n.due ? (n.status === 'due' ? 'Was due ' : 'Due ') + U.fmtDateLong(n.due) : 'Due now') + '</span></div>'
      : '<div class="mq-next paid"><span>All Set</span><b>Paid in full</b><span>Thank you! Nothing more is due.</span></div>';
    var sched = vm.schedule.map(function (p) {
      var col = p.status === 'paid' ? 'var(--mq-ok)' : p.status === 'due' ? 'var(--mq-pink-soft)' : 'var(--mq-muted)';
      var lbl = p.status === 'paid' ? 'Paid' : p.status === 'due' ? 'Due' : 'Upcoming';
      return '<li><span><b>' + esc(p.label) + '</b><i>' + (p.due ? U.fmtDate(p.due) : 'At booking') + '</i></span><span>' + U.money(p.amount) +
        '<span class="st" style="color:' + col + '">' + lbl + '</span></span></li>';
    }).join('');
    var count = (vm.details.lines || []).length;
    return '<section class="mq-invest" id="mq-payment" aria-labelledby="mq-iv"><div class="mq-sechead"><div><span class="mq-eyebrow">Your Lineup &amp; Investment</span>' +
      '<h2 class="mq-h2" id="mq-iv">Your Night, <span style="color:var(--mq-pink)">As Booked.</span></h2></div>' +
      '<span class="mq-chip mq-chip-ok" style="font-size:11px;padding:6px 12px">' + icon('check', 12) + count + (count === 1 ? ' item' : ' items') + ' booked</span></div>' +
      '<div class="mq-invest-row"><div class="mq-night"><span class="mq-sub">What\'s In Your Night</span><ul class="mq-lines">' + lines + pend + '</ul>' +
      '<div class="mq-total"><span>Total Investment</span><b>' + U.money(vm.total) + '</b></div>' +
      (pending.length ? '<span class="mq-small" style="margin-top:8px">Items awaiting approval are not in your total until ' + esc(vm.dj.first) + ' confirms them.</span>' : '') +
      (vm.isBooth ? '<div class="mq-boothadd" data-mq-boothadd></div>' : '') +
      '<span class="mq-small" style="margin-top:14px">' + (vm.isBooth ? 'Want to change something? Message the Marquee team and we\'ll take care of it.' : 'Want to change something? Message your headliner and they\'ll take care of it.') + '</span></div>' +
      '<div class="mq-stand"><span class="mq-sub">Where You Stand</span><div><div class="mq-meter"><div style="width:' + pct + '%"></div></div>' +
      '<div class="mq-meter-lbl"><span><b>' + U.money(vm.paid) + '</b> paid</span><span><b>' + U.money(vm.balance) + '</b> remaining</span></div></div>' +
      nextBox + (n ? '<a class="mq-btn mq-btn-pink" href="' + esc(vm.list.links.payment || '#') + '">' + icon('card', 16) + 'Make a Payment</a>' : '') +
      '<div><div class="mq-sched-btn">Payment Schedule</div>' +
      '<ul class="mq-sched">' + sched + '</ul></div>' +
      '<p class="mq-small">25% at booking, 25% at 9 months, 25% at 6 months, balance due 90 days before your event.</p></div></div></section>';
  }

  function optCard(c, feat, selected) {
    var on = selected.indexOf(c.id) >= 0;
    return '<div class="mq-opt' + (feat ? ' feat' : '') + (on ? ' sel' : '') + '"><span class="nm">' + esc(c.name) + '</span><span class="ds">' + esc(c.sub || '') + '</span>' +
      '<div class="bt"><span class="pr">' + U.money(c.price) + (c.unit ? ' / ' + esc(c.unit) : '') + '</span>' +
      '<button type="button" data-mq-pick="' + c.id + '" aria-pressed="' + on + '">' + (on ? 'Selected' : 'Select') + '</button></div></div>';
  }

  /* Add To Your Night has its own state (selection, dropdown, status), so it re-renders on its own. */
  function addSection(vm, container, refreshInvest) {
    var state = { selected: [], open: false, status: null, busy: false };
    function avail() {
      var p = MQ.requests.pending(vm.id);
      return { pending: p, list: vm.options.all.filter(function (c) { return p.indexOf(c.id) < 0; }) };
    }
    function draw() {
      var a = avail();
      var ids = a.list.map(function (c) { return c.id; });
      state.selected = state.selected.filter(function (id) { return ids.indexOf(id) >= 0; });
      var feat = vm.options.featured.filter(function (c) { return ids.indexOf(c.id) >= 0; });
      var groups = vm.options.groups.map(function (g) {
        return { label: g.label, items: g.items.filter(function (c) { return ids.indexOf(c.id) >= 0; }) };
      }).filter(function (g) { return g.items.length; });
      var moreCount = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
      if (!feat.length && !moreCount && !state.status) { container.innerHTML = ''; container.style.display = 'none'; return; }
      container.style.display = '';
      var sel = vm.options.all.filter(function (c) { return state.selected.indexOf(c.id) >= 0; });
      var sum = sel.reduce(function (n, c) { return n + c.price; }, 0);
      var html = '<div class="mq-sechead"><div><span class="mq-eyebrow">Then We Turn It Up</span><h2 class="mq-h2" id="mq-ad">Add To Your Night <span class="mq-serif">make it unforgettable.</span></h2></div>' +
        '<span class="intro">Only showing what\'s not already in your lineup. Select what you love and see your new total. Send a request and ' + esc(vm.dj.first) +
        ' reviews it before anything is added to your event.</span></div>';
      if (feat.length) html += '<div><div class="mq-rule hot"><span>Couples Love These</span></div><div class="mq-opts">' + feat.map(function (c) { return optCard(c, true, state.selected); }).join('') + '</div></div>';
      if (moreCount) {
        html += '<button type="button" class="mq-more" aria-expanded="' + state.open + '" data-mq-more>' + (state.open ? 'Show Less' : 'See All ' + moreCount + ' More Options') + icon('chev', 14) + '</button>';
        if (state.open) html += '<div class="mq-groups">' + groups.map(function (g) {
          return '<div><div class="mq-rule"><span>' + esc(g.label) + '</span></div><div class="mq-opts">' + g.items.map(function (c) { return optCard(c, false, state.selected); }).join('') + '</div></div>';
        }).join('') + '</div>';
      }
      if (state.status) {
        var test = state.status.mode === 'test', err = state.status.mode === 'error';
        html += '<div class="mq-status' + (test || err ? ' test' : '') + '" role="status"><span class="ic">' + icon(err ? 'alert' : 'check', 16) + '</span><div><b>' +
          (err ? 'That did not go through.' : test ? 'Test mode: nothing was sent.' : 'Request sent!') + '</b><p>' +
          esc(err ? state.status.text + ' Please text ' + vm.dj.first + ' instead.' : test ? 'This is exactly what ' + vm.dj.first + ' will receive once requests are switched on:\n\n' + state.status.text
            : vm.dj.first + ' will review your request and confirm with you. Your total updates once it is approved.') +
          '</p></div><button type="button" data-mq-dismiss>Got it</button></div>';
      }
      if (sel.length) {
        var plan = MQ.model.schedule(vm.eventDate, vm.total + sum, vm.paid);
        var dueNow = plan.filter(function (p) { return p.status === 'due'; }).reduce(function (n, p) { return n + p.left; }, 0) -
          vm.schedule.filter(function (p) { return p.status === 'due'; }).reduce(function (n, p) { return n + p.left; }, 0);
        var talk = vm.dj.sms ? vm.dj.sms + '?&body=' + encodeURIComponent('Hi ' + vm.dj.first + '! We are thinking about adding ' + sel.map(function (c) { return c.name; }).join(', ') + '. Can we talk it through?')
          : (vm.dj.mailto || '#');
        html += '<div class="mq-tally"><div class="c w"><span>Your Selections \u00b7 ' + sel.length + '</span><b>' + esc(sel.map(function (c) { return c.name; }).join(', ')) + '</b></div>' +
          '<div class="c"><span>Adds</span><b>' + U.money(sum) + '</b></div>' +
          '<div class="c"><span>New Total If Approved</span><b>' + U.money(vm.total + sum) + '</b></div>' +
          '<div class="c"><span>Due Once Approved</span><b style="color:var(--mq-pink-soft)">' + U.money(Math.max(0, U.round2(dueNow))) + '</b><i>' +
          (dueNow > 0.005 ? 'Catch-up to stay on schedule' : 'Spread across your remaining payments') + '</i></div>' +
          '<div class="act"><button type="button" class="mq-btn mq-btn-pink" data-mq-send' + (state.busy ? ' disabled' : '') + '>' + icon('send', 16) + (state.busy ? 'Sending...' : 'Request to Add') + '</button>' +
          '<a class="mq-btn mq-btn-ghost" href="' + esc(talk) + '">' + icon('chat', 14) + 'Talk to ' + esc(vm.dj.first) + ' First</a></div></div>';
      }
      container.innerHTML = html;
    }
    container.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-mq-pick')) {
        var id = b.getAttribute('data-mq-pick');
        var i = state.selected.indexOf(id);
        if (i >= 0) state.selected.splice(i, 1); else state.selected.push(id);
        state.status = null;
        draw();
      } else if (b.hasAttribute('data-mq-more')) { state.open = !state.open; draw(); }
      else if (b.hasAttribute('data-mq-dismiss')) { state.status = null; draw(); }
      else if (b.hasAttribute('data-mq-send') && !state.busy) {
        var items = vm.options.all.filter(function (c) { return state.selected.indexOf(c.id) >= 0; });
        state.busy = true; draw();
        MQ.requests.send(vm, items).then(function (res) {
          state.status = res; state.selected = []; state.busy = false;
          draw(); refreshInvest();
        }).catch(function (err) {
          state.status = { mode: 'error', text: err.message || String(err) }; state.busy = false; draw();
        });
      }
    });
    draw();
  }

  /* Photo booth: pick a print template and send wording and changes. Goes to Bob through DJEP's Request Changes form. */
  function designSection(vm, container) {
    var key = 'mq-design-' + vm.id;
    var saved = U.store(key);
    var upgraded = (vm.details.lines || []).some(function (l) { return /4\s*x\s*6|print upgrade/i.test(l.name); });
    var format = upgraded ? '4x6 prints, portrait or landscape' : '2x6 photo strips';
    var state = { status: null, busy: false };
    function field(id, label, ph, area) {
      return '<label class="mq-field" for="' + id + '"><span>' + label + '</span>' + (area
        ? '<textarea id="' + id + '" rows="4" placeholder="' + esc(ph) + '"></textarea>'
        : '<input id="' + id + '" type="text" placeholder="' + esc(ph) + '">') + '</label>';
    }
    function draw() {
      var html = '<div class="mq-sechead"><div><span class="mq-eyebrow">Your Print Design</span><h2 class="mq-h2" id="mq-dz">Select Your Photo Booth Template <span class="mq-serif">make it yours.</span></h2></div>' +
        '<span class="intro">Browse the templates, pick your favorite, then tell us the wording and any changes you want. Your prints: ' + esc(format) + '.</span></div>';
      if (saved && !state.status) {
        html += '<div class="mq-status" role="status"><span class="ic">' + icon('check', 16) + '</span><div><b>Design choice sent.</b><p>' + esc(saved.text || '') +
          '</p></div><button type="button" data-mq-redo>Send a change</button></div>';
        container.innerHTML = html; return;
      }
      html += '<div class="mq-design"><div class="mq-design-pick"><span class="mq-sub">Step 1 \u00b7 Browse</span>' +
        '<p class="mq-body">See every template we offer and note the name or number of the one you love.</p>' +
        (MQ.config.PRINT_TEMPLATES_URL
          ? '<a class="mq-btn mq-btn-ghost" href="' + esc(MQ.config.PRINT_TEMPLATES_URL) + '" target="_blank" rel="noopener">' + icon('camera', 15) + 'Browse Templates</a>'
          : '<p class="mq-small">Our template gallery is coming to your portal soon. Until then, text Bob at 330.432.0798 and we will send you the current designs.</p>') + '</div>' +
        '<form class="mq-design-form" data-mq-design><span class="mq-sub">Step 2 \u00b7 Tell Us</span>' +
        field('mq-dz-tpl', 'Template name or number', 'Example: Gold Script #12') +
        field('mq-dz-words', 'Wording on your prints', 'Example: Teddi & Kevin \u00b7 12.30.2028') +
        field('mq-dz-notes', 'Changes and notes', 'Colors, fonts, a hashtag, a logo, anything you want changed.', true) +
        '<button type="submit" class="mq-btn mq-btn-pink"' + (state.busy ? ' disabled' : '') + '>' + icon('send', 16) + (state.busy ? 'Sending...' : 'Send My Design') + '</button></form></div>';
      if (state.status) {
        var test = state.status.mode === 'test', err = state.status.mode === 'error';
        html += '<div class="mq-status' + (test || err ? ' test' : '') + '" role="status"><span class="ic">' + icon(err ? 'alert' : 'check', 16) + '</span><div><b>' +
          (err ? 'That did not go through.' : test ? 'Test mode: nothing was sent.' : 'Design choice sent!') + '</b><p>' +
          esc(err ? state.status.text + ' Please text Bob instead.' : test ? 'This is exactly what Bob will receive once requests are switched on:\n\n' + state.status.text
            : 'We will review it and reach out if we have any questions.') + '</p></div><button type="button" data-mq-dismiss>Got it</button></div>';
      }
      container.innerHTML = html;
    }
    container.addEventListener('submit', function (e) {
      e.preventDefault();
      if (state.busy) return;
      var v = function (id) { var el = container.querySelector('#' + id); return el ? el.value.trim() : ''; };
      var tpl = v('mq-dz-tpl');
      if (!tpl) { var t = container.querySelector('#mq-dz-tpl'); t.focus(); t.setAttribute('aria-invalid', 'true'); return; }
      var text = [MQ.requests.header(vm, 'PRINT DESIGN') + ' (' + format + ')',
        'Template: ' + tpl,
        'Wording: ' + (v('mq-dz-words') || '(none given)'),
        'Notes: ' + (v('mq-dz-notes') || '(none)')].join('\n');
      state.busy = true; draw();
      MQ.requests.sendText(vm, text).then(function (res) {
        state.busy = false; state.status = res;
        if (res.mode === 'sent') { saved = { text: text }; U.store(key, saved); }
        draw();
      }).catch(function (err) { state.busy = false; state.status = { mode: 'error', text: err.message || String(err) }; draw(); });
    });
    container.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-mq-dismiss')) { state.status = null; draw(); }
      else if (b.hasAttribute('data-mq-redo')) { saved = null; draw(); }
    });
    draw();
  }

  /* Photo booth add-ons: a short list under Total Investment. Requests go to Bob for review, like DJ add-ons. */
  function boothAddons(vm, box) {
    if (!box) return;
    var booked = (vm.details.lines || []).map(function (l) { return l.name; }).join(' | ');
    var isClassic = /classic/i.test(vm.list.package || booked);
    var list = (MQ.config.BOOTH_ADDONS || []).filter(function (a) {
      if (a.classicOnly && !isClassic) return false;
      return a.unit === 'hour' || !new RegExp(a.match, 'i').test(booked);
    });
    if (!list.length) { box.remove(); return; }
    var state = { sel: [], busy: false, status: null };
    function price(a) { return a.price == null ? 'Price on request' : U.money(a.price) + (a.unit ? ' / ' + a.unit : ''); }
    function draw() {
      var sel = list.filter(function (a) { return state.sel.indexOf(a.id) >= 0; });
      var known = sel.every(function (a) { return a.price != null; });
      var sum = sel.reduce(function (n, a) { return n + (a.price || 0); }, 0);
      var html = '<span class="mq-sub">Add To Your Booth</span><ul class="mq-blist">' + list.map(function (a) {
        var on = state.sel.indexOf(a.id) >= 0;
        return '<li' + (on ? ' class="on"' : '') + '><button type="button" data-mq-bpick="' + a.id + '" aria-pressed="' + on + '"><span class="bx">' + (on ? icon('check', 12) : '') + '</span>' +
          '<span class="tx"><b>' + esc(a.name) + '</b><i>' + esc(a.sub) + '</i></span><span class="pr">' + esc(price(a)) + '</span></button></li>';
      }).join('') + '</ul>';
      if (sel.length) {
        html += '<div class="mq-bsum"><span>' + (known ? 'Adds <b>' + U.money(sum) + '</b> \u00b7 New total if approved <b>' + U.money(vm.total + sum) + '</b>'
          : 'We will confirm pricing before anything is added.') + '</span>' +
          '<button type="button" class="mq-btn mq-btn-pink" data-mq-bsend' + (state.busy ? ' disabled' : '') + '>' + icon('send', 15) + (state.busy ? 'Sending...' : 'Request to Add') + '</button></div>';
      }
      if (state.status) {
        var test = state.status.mode === 'test', err = state.status.mode === 'error';
        html += '<div class="mq-status' + (test || err ? ' test' : '') + '" role="status"><span class="ic">' + icon(err ? 'alert' : 'check', 16) + '</span><div><b>' +
          (err ? 'That did not go through.' : test ? 'Test mode: nothing was sent.' : 'Request sent!') + '</b><p>' +
          esc(err ? state.status.text + ' Please text Bob instead.' : test ? 'This is exactly what Bob will receive once requests are switched on:\n\n' + state.status.text
            : 'We will review your request and confirm with you before anything is added.') + '</p></div><button type="button" data-mq-bdismiss>Got it</button></div>';
      }
      box.innerHTML = html;
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-mq-bpick')) {
        var id = b.getAttribute('data-mq-bpick'), i = state.sel.indexOf(id);
        if (i >= 0) state.sel.splice(i, 1); else state.sel.push(id);
        state.status = null; draw();
      } else if (b.hasAttribute('data-mq-bdismiss')) { state.status = null; draw(); }
      else if (b.hasAttribute('data-mq-bsend') && !state.busy) {
        var sel = list.filter(function (a) { return state.sel.indexOf(a.id) >= 0; });
        var known = sel.every(function (a) { return a.price != null; });
        var sum = sel.reduce(function (n, a) { return n + (a.price || 0); }, 0);
        var text = [MQ.requests.header(vm, 'BOOTH ADD-ONS'),
          sel.map(function (a) { return '- ' + a.name + ' (' + price(a) + ')'; }).join('\n'),
          known ? 'Adds ' + U.money(sum) + ' | New total ' + U.money(vm.total + sum) : 'Pricing to confirm with the couple.',
          'Review in DJEP before adding.'].join('\n');
        state.busy = true; draw();
        MQ.requests.sendText(vm, text).then(function (res) { state.busy = false; state.status = res; if (res.mode === 'sent') state.sel = []; draw(); })
          .catch(function (err) { state.busy = false; state.status = { mode: 'error', text: err.message || String(err) }; draw(); });
      }
    });
    draw();
  }

  function messages() {
    var box = document.querySelector('.djep-latestemailsbox');
    var items = box ? Array.prototype.filter.call(box.querySelectorAll('a'), function (a) { return a.textContent.trim(); }) : [];
    if (!items.length) return '';
    var list = items.slice(0, 4).map(function (a) {
      return '<li class="mq-row"><span class="mq-live" style="animation:none" aria-hidden="true"></span><span class="nm">' + esc(a.textContent.trim()) +
        '</span><a class="mq-btn mq-btn-ghost" style="min-height:44px" href="' + esc(a.href) + '">Read</a></li>';
    }).join('');
    return '<section class="mq-card mq-msgs" aria-labelledby="mq-em"><div class="hd"><div><span class="mq-ico" style="width:40px;height:40px;border-radius:12px">' + icon('mail', 18) +
      '</span><h2 id="mq-em">Latest From Your Team</h2></div><span class="mq-small">' + items.length + (items.length === 1 ? ' message' : ' messages') + '</span></div>' +
      (list ? '<ul>' + list + '</ul>' : '<div class="empty">No messages yet. Updates from your team will land here.</div>') + '</section>';
  }

  function render(main, vm, events) {
    main.innerHTML = switcher(vm, events) + hero(vm) + eventCard(vm) + journey(vm) + sessions(vm) +
      (vm.isBooth ? '<section class="mq-card mq-designsec" id="mq-design" aria-labelledby="mq-dz" data-mq-design-sec></section>' : '') +
      '<div data-mq-invest></div><section class="mq-add" aria-labelledby="mq-ad" data-mq-add></section>' +
      (function () { var m = messages(); return m ? '<div class="mq-duo">' + m + '</div>' : ''; })() + '<section class="mq-reels" data-mq-reels></section>';
    var investBox = main.querySelector('[data-mq-invest]');
    function drawInvest() {
      var p = MQ.requests.pending(vm.id);
      var items = vm.options.all.filter(function (c) { return p.indexOf(c.id) >= 0; });
      investBox.innerHTML = invest(vm, items);
    }
    investBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mq-sched]');
      if (!b) return;
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open);
      b.nextElementSibling.hidden = !open;
    });
    drawInvest();
    if (vm.isBooth) boothAddons(vm, main.querySelector('[data-mq-boothadd]'));
    addSection(vm, main.querySelector('[data-mq-add]'), drawInvest);
    if (vm.isBooth) designSection(vm, main.querySelector('[data-mq-design-sec]'));
    startCountdown(main, vm.eventDate);
    MQ.reels.render(main.querySelector('[data-mq-reels]'));
  }

  return { render: render };
})();

/* ---- src/render-details.js ---- */
/* Event Details page (eventdetails.asp), rebuilt in the Marquee design from the data DJEP puts on the page. */
window.MQ = window.MQ || {};

MQ.renderDetails = (function () {
  var U = MQ.util, esc = U.esc, icon = U.icon;

  function row(label, value, extra) {
    if (!value) return '';
    return '<div class="mq-dl-row"><dt>' + esc(label) + '</dt><dd>' + (extra ? value : esc(value)) + '</dd></div>';
  }

  function card(eyebrow, title, body, cls) {
    return '<section class="mq-card mq-dcard' + (cls ? ' ' + cls : '') + '"><div class="mq-dcard-hd"><span class="mq-eyebrow">' + esc(eyebrow) + '</span>' +
      (title ? '<h2>' + title + '</h2>' : '') + '</div>' + body + '</section>';
  }

  function render(main, vm, events) {
    var d = vm.details, dj = vm.dj, date = vm.eventDate;
    var backHref = '/clients/home.asp' + (events.length > 1 ? '?mqevent=' + vm.id : '');
    var payHref = d.links.payment || vm.list.links.payment || '#';
    var reqHref = d.links.request || '/clients/requestchanges.asp?eventid=' + encodeURIComponent(vm.id);
    var mapHref = d.venueLines.length ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(d.venueLines.join(', ')) : '';

    /* Header */
    var html = '<nav class="mq-crumb" aria-label="Breadcrumb"><a href="' + backHref + '">' + icon('arrow', 14).replace('<svg', '<svg style="transform:rotate(180deg)"') +
      'Back to your event</a></nav>' +
      '<section class="mq-hero mq-hero-sm"><span class="mq-eyebrow">Event Details</span><h1>' + esc(vm.couple.couple) + '</h1>' +
      '<p class="mq-serif">every detail, in one place.</p></section>';

    /* Summary strip: date tile, type, status, quick actions */
    html += '<section class="mq-card mq-dsum"><div class="mq-datetile" aria-label="' + esc(U.fmtDateLong(date)) + '"><div class="m">' + U.MONTHS[date.getMonth()] +
      '</div><div class="b"><div class="d">' + date.getDate() + '</div><div class="y">' + date.getFullYear() + '</div><div class="w">' + U.DAYS[date.getDay()] + '</div></div></div>' +
      '<div class="mq-dsum-info"><div class="mq-tags"><span class="mq-chip mq-chip-ok"><span class="mq-dot"></span>' + esc(d.status || vm.list.status || 'Booked') + '</span>' +
      '<span class="mq-chip mq-chip-dim">Event #' + esc(d.id || vm.id) + '</span></div>' +
      '<h2>' + esc(vm.isBooth ? (vm.list.package || U.typeName(d.type || vm.list.type)) : U.typeName(d.type || vm.list.type)) + '</h2>' +
      (vm.venue ? '<div class="mq-venue">' + icon('pin', 15) + '<span>' + esc(vm.venue) + '</span></div>' : '') + '</div>' +
      '<div class="mq-dsum-act"><a class="mq-btn mq-btn-pink" href="' + esc(payHref) + '">' + icon('card', 16) + 'Make a Payment</a>' +
      (vm.isBooth ? '' : '<a class="mq-btn mq-btn-ghost" href="' + MQ.config.VIBO_URL + '" target="_blank" rel="noopener">' + icon('music', 15) + 'Open Vibo</a>') + '</div></section>';

    /* When & Where */
    var when = '<dl class="mq-dl">' + row('Date', U.fmtDateLong(date) + ' (' + U.DAYS[date.getDay()] + ')') +
      row('Setup', d.setup) + row('Start', d.start) + row('End', d.end) + '</dl>' +
      '<p class="mq-small">Times can shift as your timeline comes together. Your headliner confirms everything at final planning.</p>';
    var where = '<div class="mq-place"><span class="mq-ico">' + icon('pin', 20) + '</span><div><b>' + esc(d.venueLines[0] || 'Venue to be confirmed') + '</b>' +
      (d.venueLines.length > 1 ? '<span>' + esc(d.venueLines.slice(1).join(', ')) + '</span>' : '') + '</div></div>' +
      (mapHref ? '<a class="mq-btn mq-btn-ghost mq-btn-sm" href="' + mapHref + '" target="_blank" rel="noopener">' + icon('arrow', 14) + 'Open in Maps</a>' : '');
    html += '<div class="mq-dgrid">' + card('When', 'Date &amp; Times', when) + card('Where', 'Your Venue', where) + '</div>';

    /* Package + Team */
    var svc = d.service || {};
    var svcName = (svc.service || [])[0] || '';
    var included = svc.description || [];
    var addons = (svc.addons || []).join(', ').split(/\s*,\s*/).filter(Boolean);
    var pkg = (svcName ? '<div class="mq-pkg-name">' + esc(svcName) + '</div>' : '') +
      (included.length ? '<ul class="mq-incl">' + included.map(function (l) { return '<li><span class="ck">' + icon('check', 12) + '</span>' + esc(l) + '</li>'; }).join('') + '</ul>' : '') +
      (addons.length ? '<div class="mq-sub" style="margin-top:18px">Add-Ons</div><div class="mq-addchips">' + addons.map(function (a) { return '<span>' + esc(a) + '</span>'; }).join('') + '</div>' : '');
    var team = '<div class="mq-hl-row">' + (dj.logo ? '<img src="' + esc(dj.logo) + '" alt="' + esc(dj.name) + '" style="height:' + Math.round(dj.logoH * 0.8) + 'px">' : '<span class="mq-hl-name">' + esc(dj.name) + '</span>') +
      '<span class="mq-tier">' + esc(dj.tier) + '</span></div>' +
      (vm.isBooth ? '<p class="mq-body"><b style="color:#fff">' + esc(dj.role) + '</b> ' + esc(dj.note) + '</p>' : '') +
      '<ul class="mq-staff"' + (vm.isBooth ? ' hidden' : '') + '>' + (d.staff.length ? d.staff : [dj.name]).map(function (s) { return '<li>' + icon('music', 14) + esc(s) + '</li>'; }).join('') + '</ul>' +
      (d.attire ? '<dl class="mq-dl">' + row('Attire', d.attire) + '</dl>' : '') +
      '<div class="mq-contacts mq-contacts-sm">' + [
        dj.tel && vm.isBooth && '<a href="' + dj.tel + '">' + icon('phone') + '<span>' + esc(dj.phone) + '</span></a>',
        dj.sms && '<a href="' + dj.sms + '">' + icon('chat') + '<span>Text ' + esc(dj.first) + '</span></a>',
        dj.mailto && '<a href="' + dj.mailto + '">' + icon('mail') + '<span>Email ' + esc(dj.first) + '</span></a>'
      ].filter(Boolean).join('') + '</div>' +
      '<p class="mq-note">Texts and emails are answered within 24 to 48 hours. Weekends are show days, so replies may come Monday.</p>' +
      '<a class="mq-btn mq-btn-ghost mq-btn-sm" href="/clients/contact.asp">' + icon('mail', 14) + 'Message Us</a>';
    html += '<div class="mq-dgrid mq-dgrid-wide">' + card('Your Package', 'What&rsquo;s Included', pkg || '<p class="mq-small">Package details will appear here.</p>') +
      card('Your Team', vm.isBooth ? 'Your Point Of Contact' : 'Your Headliner', team) + '</div>';

    /* Fees + payments */
    var groups = [];
    d.lines.forEach(function (l) {
      var g = groups.filter(function (x) { return x.name === (l.group || 'Fees'); })[0];
      if (!g) { g = { name: l.group || 'Fees', items: [] }; groups.push(g); }
      g.items.push(l);
    });
    var fees = groups.map(function (g) {
      return '<div class="mq-sub" style="margin-top:14px">' + esc(g.name === 'Addons' ? 'Add-Ons' : g.name) + '</div><ul class="mq-feelist">' +
        g.items.map(function (l) { return '<li><span>' + esc(U.lineName(l.name)) + '</span><b>' + U.money(l.price, true) + '</b></li>'; }).join('') + '</ul>';
    }).join('');
    var totals = '<dl class="mq-totals">' +
      (d.subtotal != null && d.subtotal !== d.totalFee ? row('Subtotal', U.money(d.subtotal, true)) : '') +
      row('Total Fee', U.money(d.totalFee, true)) + row('Retainer', U.money(d.deposit, true)) + row('Paid So Far', U.money(d.payments || 0, true)) +
      '</dl><div class="mq-baldue"><span>Balance Due</span><b>' + U.money(d.balanceDue, true) + '</b></div>';
    var hist = d.history.length
      ? '<ul class="mq-hist">' + d.history.map(function (cells) {
          return '<li><span class="ck">' + icon('check', 12) + '</span><span>' + esc(cells.slice(0, -1).join(' \u00b7 ')) + '</span><b>' + esc(cells[cells.length - 1]) + '</b></li>';
        }).join('') + '</ul>'
      : '<p class="mq-empty">No payments yet. Your retainer locks in your date.</p>';
    var n = vm.next;
    var nextBox = n
      ? '<div class="mq-next"><span>' + (n.status === 'due' ? 'Due Now \u00b7 ' : 'Next Payment \u00b7 ') + esc(n.label) + '</span><b>' + U.money(n.left) + '</b><span>' +
        (n.due ? (n.status === 'due' ? 'Was due ' : 'Due ') + U.fmtDateLong(n.due) : 'Due now') + '</span></div>'
      : '<div class="mq-next paid"><span>All Set</span><b>Paid in full</b><span>Thank you! Nothing more is due.</span></div>';
    html += '<section class="mq-invest" aria-labelledby="mq-fees"><div class="mq-sechead"><div><span class="mq-eyebrow">Payments &amp; Finances</span>' +
      '<h2 class="mq-h2" id="mq-fees">Your Investment</h2></div></div><div class="mq-invest-row">' +
      '<div class="mq-night"><span class="mq-sub">Fee Details</span>' + fees + totals + '</div>' +
      '<div class="mq-stand"><span class="mq-sub">Payment History</span>' + hist + nextBox +
      (n ? '<a class="mq-btn mq-btn-pink" href="' + esc(payHref) + '">' + icon('card', 16) + 'Make a Payment</a>' : '') +
      '<p class="mq-small">Pay by card (3.5% processing fee), Venmo or Cash App.</p></div></div></section>';

    /* Documents + Request changes */
    var docs = d.documents.length
      ? '<ul class="mq-docs">' + d.documents.map(function (x) { return '<li><a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + icon('checkbox', 16) + '<span>' + esc(x.name) + '</span>' + icon('arrow', 14) + '</a></li>'; }).join('') + '</ul>'
      : '<p class="mq-empty">Your agreement and any shared files will show up here.</p>';
    var change = '<p class="mq-body">Something not quite right? Venue change, new time, or anything else, send it over and ' + esc(dj.first) +
      ' will update your event and confirm with you.</p><a class="mq-btn mq-btn-ghost" href="' + esc(reqHref) + '">' + icon('send', 15) + 'Request Changes</a>';
    html += '<div class="mq-dgrid">' + card('Documents', 'Your Files', docs) + card('Need A Change?', 'Request Changes', change) + '</div>';

    main.innerHTML = html;
  }

  return { render: render };
})();

/* ---- src/main.js ---- */
/* Entry point. Runs on every DJEP client portal page via the Custom Scripting box.
 * Home and My Events are rebuilt in the Marquee design. Every other portal page keeps DJEP's
 * content and gets the Marquee header and colors.
 */
(function () {
  function isTakeoverPage() {
    return /\/clients\/(home|events)\.asp/i.test(location.pathname) || /\/clients\/?$/i.test(location.pathname);
  }

  function isDetailsPage() { return /\/clients\/eventdetails\.asp/i.test(location.pathname); }

  function upcoming(events) {
    return events.filter(function (e) { return e.id && !/cancel/i.test(e.status || ''); });
  }

  function start() {
    if (!window.MQ || !MQ.gate || !MQ.gate.shouldRun()) return;
    var html = document.documentElement;
    html.classList.add('mq-portal');
    if (isDetailsPage()) return startDetails(html);
    var takeover = isTakeoverPage();
    var events = takeover ? upcoming(MQ.reader.readEventList()) : [];
    if (!takeover || !events.length) { MQ.shell.mount(false); return; }

    html.classList.add('mq-takeover', 'mq-loading');
    var main = MQ.shell.mount(true);
    var want = new URLSearchParams(location.search).get('mqevent');

    if (events.length > 1 && (!want || want === 'all')) {
      MQ.renderChooser.render(main, events);
      html.classList.remove('mq-loading');
      return;
    }
    var pick = events.filter(function (e) { return e.id === want; })[0] || events[0];

    MQ.reader.loadEventDetails(pick.id).then(function (details) {
      var vm = MQ.model.build(pick, details, events);
      MQ.renderEvent.render(main, vm, events);
    }).catch(function (err) {
      console.error('[Marquee portal] could not build event page', err);
      html.classList.remove('mq-takeover');
    }).then(function () { html.classList.remove('mq-loading'); });
  }

  /* Event Details: rebuild from this page's own data; the event list (for the headliner) comes from home. */
  function startDetails(html) {
    var details = MQ.reader.readEventDetails(document);
    if (!details.date) { MQ.shell.mount(false); return; }
    html.classList.add('mq-takeover', 'mq-loading');
    var main = MQ.shell.mount(true);
    var id = new URLSearchParams(location.search).get('eventid') || details.id;
    MQ.reader.fetchPage('/clients/home.asp').then(function (doc) {
      return upcoming(MQ.reader.readEventList(doc));
    }).catch(function () { return []; }).then(function (events) {
      var item = events.filter(function (e) { return e.id === id; })[0] || {
        id: id, employeeId: null, date: details.date, name: details.name, status: details.status, type: details.type, package: null,
        links: { payment: details.links.payment, details: location.href }, isPhotoBooth: /photo\s*booth/i.test(details.type || '')
      };
      var vm = MQ.model.build(item, details, events.length ? events : [item]);
      MQ.renderDetails.render(main, vm, events);
    }).catch(function (err) {
      console.error('[Marquee portal] could not build details page', err);
      html.classList.remove('mq-takeover');
    }).then(function () { html.classList.remove('mq-loading'); window.scrollTo(0, 0); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
