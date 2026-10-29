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
    var d = o ? new Date(o) : new Date();
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
    esc: esc, parseDate: parseDate, today: today, addMonths: addMonths, addDays: addDays, daysBetween: daysBetween,
    fmtDate: fmtDate, fmtDateLong: fmtDateLong, away: away, money: money, round2: round2, coupleFromName: coupleFromName,
    icon: icon, wave: wave, store: store, MONTHS: MONTHS, DAYS: DAYS
  };
})();
