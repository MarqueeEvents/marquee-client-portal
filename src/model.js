/* Turns raw DJEP data (from MQ.reader) into everything the event page needs:
 * payment schedule, journey steps, add-on options. No DOM work here, so it is easy to test.
 */
window.MQ = window.MQ || {};

MQ.model = (function () {
  var U = MQ.util;

  function team(employeeId, isBooth) {
    var t = isBooth ? MQ.config.COMPANY_CONTACT : (MQ.config.TEAM[employeeId] || MQ.config.TEAM['43180']);
    var base = MQ.ASSET_BASE + 'team/';
    var digits = (t.phone || '').replace(/\D/g, '');
    return Object.assign({}, t, {
      photo: t.photoFile ? base + t.photoFile : '',
      cardPhoto: base + (t.cardPhotoFile || t.photoFile),
      logo: base + t.logoFile,
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

  function journey(eventDate, sched, isBooth, signed) {
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
      steps.push({ num: '05', title: 'Creative Sessions', date: creativeFrom, optional: true,
        when: U.MONTHS[creativeFrom.getMonth()] + ' to ' + U.fmtDate(creativeTo),
        note: 'Optional. Love planning together? Book one. Happy in Vibo? You are all set.',
        done: cs === 'past', status: cs === 'open' ? 'Open' : (cs === 'past' ? 'Window Closed' : 'Optional'), book: 'creative' });
    }
    steps.push(payStep(isBooth ? '04' : '06', 'Final Payment', sched[3], 'Balance due 90 days before your event.'));
    if (!isBooth) {
      var fs = st(finalFrom, finalTo);
      steps.push({ num: '07', title: 'Final Planning', date: finalFrom, when: U.fmtDate(finalFrom) + ' to ' + U.fmtDate(finalTo),
        note: 'Walk through every detail with your headliner, 2 to 4 weeks out.', done: fs === 'past', status: fs === 'open' ? 'Book Now' : (fs === 'past' ? 'Done' : 'Upcoming'), book: 'final' });
    }
    var daysOut = U.daysBetween(t, eventDate);
    var lvl = daysOut <= 0 ? 4 : daysOut <= 14 ? 3 : daysOut <= 60 ? 2 : daysOut <= 180 ? 1 : 0;
    steps.push({ num: isBooth ? '05' : '08', title: "Let's Dance", date: eventDate, isFinal: true, lvl: lvl,
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
      journey: journey(eventDate, sched, isBooth, signedDate(details.history)),
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
