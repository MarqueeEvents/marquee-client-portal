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

  /* Payment amounts from DJEP's payment history rows, oldest first. Null when the rows can't be read
   * cleanly (no amounts, refunds), so the schedule falls back to applying the paid total in order. */
  function paymentsFrom(history) {
    if (!history || !history.length) return null;
    var rows = history.map(function (cells, i) {
      var amt = parseFloat(String(cells[cells.length - 1]).replace(/[$,\s]/g, ''));
      var date = null;
      cells.forEach(function (c) { var m = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.exec(c); if (!date && m) date = U.parseDate(m[0]); });
      return { amt: amt, date: date, i: i };
    });
    if (rows.some(function (r) { return !(r.amt > 0); })) return null;
    rows.sort(function (a, b) { return (a.date && b.date ? a.date - b.date : 0) || a.i - b.i; });
    return rows.map(function (r) { return r.amt; });
  }

  /* 25 / 25 / 25 / balance (or the school / private plan).
   * Installments a client has already paid are locked at what they actually paid. Whatever is left
   * (including add-ons booked later) is split evenly across the installments still to come.
   * So an add-on spread over the remaining payments never makes an earlier payment look short.
   * The first payment is always the retainer / booking deposit. After that, payments add up toward the
   * current installment and lock it once they reach 90% of it; less than that shows as a partial payment. */
  function schedule(eventDate, total, paid, kind, payments, lockTotal) {
    /* lockTotal: the event's current total. Pass it when previewing a new total (add-ons) so the
     * payments already made stay locked exactly as they are today. */
    var base = lockTotal != null ? lockTotal : total;
    var plan = (MQ.config.PAYMENT_PLANS || {})[kind] || MQ.config.PAYMENT_PLAN;
    var t = U.today();
    var n = plan.length;
    var dueOf = function (p) { return p.monthsBefore ? U.addMonths(eventDate, -p.monthsBefore) : (p.daysBefore != null ? U.addDays(eventDate, -p.daysBefore) : null); };
    var statusOf = function (left, due) { return left <= 0.005 ? 'paid' : (!due || U.daysBetween(t, due) <= 0) ? 'due' : 'upcoming'; };
    var weight = function (from) { return plan.slice(from).reduce(function (a, p) { return a + p.pct; }, 0) || 1; };

    /* Lock the installments covered by real payments. */
    var locked = [], lockedSum = 0, acc = 0;
    if (payments && Math.abs(U.round2(payments.reduce(function (a, b) { return a + b; }, 0)) - (paid || 0)) < 0.02) {
      payments.forEach(function (amt) {
        if (locked.length >= n - 1) { acc = U.round2(acc + amt); return; }
        acc = U.round2(acc + amt);
        var target = U.round2((base - lockedSum) * plan[locked.length].pct / weight(locked.length));
        if (locked.length === 0 || acc >= target * 0.9 - 0.005) { locked.push(acc); lockedSum = U.round2(lockedSum + acc); acc = 0; }
      });
    } else {
      /* No usable history: apply the paid total to installments in order (original behavior). */
      var running = 0, applied = paid || 0;
      return plan.map(function (p, i) {
        var amount = i === n - 1 ? U.round2(total - running) : U.round2(total * p.pct);
        running = U.round2(running + amount);
        var due = dueOf(p);
        var covered = Math.min(amount, Math.max(0, applied));
        applied = U.round2(applied - covered);
        var left = U.round2(amount - covered);
        return { label: p.label, amount: amount, paid: U.round2(covered), left: left, due: due, status: statusOf(left, due) };
      });
    }

    /* Spread what is left over the remaining installments; a partial payment counts toward the next one. */
    var rest = Math.max(0, U.round2(total - lockedSum)), assigned = 0, extra = acc;
    return plan.map(function (p, i) {
      var due = dueOf(p);
      if (i < locked.length) return { label: p.label, amount: locked[i], paid: locked[i], left: 0, due: due, status: 'paid' };
      var amount = i === n - 1 ? U.round2(rest - assigned) : U.round2(rest * p.pct / weight(locked.length));
      assigned = U.round2(assigned + amount);
      var covered = Math.min(amount, Math.max(0, extra));
      extra = U.round2(extra - covered);
      var left = U.round2(amount - covered);
      return { label: p.label, amount: amount, paid: U.round2(covered), left: left, due: due, status: statusOf(left, due) };
    });
  }

  /* Which catalog items are already on this event (or covered by a separate photo booth event). */
  function bookedIds(lines, hasBoothEvent) {
    var names = lines.map(function (l) { return l.name.toLowerCase(); });
    return MQ.config.CATALOG.filter(function (c) {
      if (c.repeatable) return false;
      if (c.booth && hasBoothEvent) return true;
      var re = new RegExp(c.match, 'i');
      return names.some(function (n) { return re.test(n); });
    }).map(function (c) { return c.id; });
  }

  function addOptions(lines, hasBoothEvent, isBoothEvent, djKey, kind) {
    var booked = bookedIds(lines, hasBoothEvent);
    var nonWedding = kind === 'school' || kind === 'private';
    var swaps = MQ.config.NON_WEDDING_SWAPS || {};
    var avail = MQ.config.CATALOG.filter(function (c) {
      if (booked.indexOf(c.id) >= 0) return false;
      if (nonWedding && (MQ.config.WEDDING_ONLY || []).indexOf(c.id) >= 0) return false;
      return isBoothEvent ? c.booth : true;
    }).map(function (c) {
      /* Bob's own rate for extra time when he is the headliner. */
      var o = (c.bobPrice && djKey === 'bob') ? Object.assign({}, c, { price: c.bobPrice }) : c;
      /* School dances and private events: logo instead of monogram, no wedding moments in the descriptions. */
      var sw = nonWedding && swaps[c.id];
      if (sw) o = Object.assign({}, o, { name: sw.name || o.name, sub: typeof sw.sub === 'object' ? (sw.sub[kind] || o.sub) : (sw.sub || o.sub) });
      return o;
    });
    var featured = [];
    (nonWedding ? (MQ.config.FEATURED_NON_WEDDING || MQ.config.FEATURED) : MQ.config.FEATURED).forEach(function (id) {
      var c = avail.filter(function (a) { return a.id === id; })[0];
      if (c) featured.push(c);
    });
    /* Photo booths get their own always-visible spot on DJ events (a popular add-on); not shown on booth events or when a booth is already booked. */
    var booths = isBoothEvent ? [] : avail.filter(function (c) { return c.booth && featured.indexOf(c) < 0; });
    var rest = avail.filter(function (c) { return featured.indexOf(c) < 0 && booths.indexOf(c) < 0; });
    var groups = [];
    rest.forEach(function (c) {
      var g = groups.filter(function (x) { return x.label === c.cat; })[0];
      if (!g) { g = { label: c.cat, items: [] }; groups.push(g); }
      g.items.push(c);
    });
    return { featured: featured, booths: booths, groups: groups, all: avail };
  }

  function journey(eventDate, sched, isBooth, signed, designSent, kind) {
    var t = U.today();
    var cfg = MQ.config;
    if (kind === 'school' || kind === 'private') return progress(eventSteps(eventDate, sched, kind, t), eventDate, t);
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

    return progress(steps, eventDate, t);
  }

  /* School dance: Booked > Booking Deposit > Music Requests > Final Details Call > Dance Night (balance due).
   * Private event: Booked > Booking Deposit > Final Payment (60 days out) > Event Planning Call > Event Night. */
  function eventSteps(eventDate, sched, kind, t) {
    var cfg = MQ.config, w = U.words(kind), school = kind === 'school';
    function st(date, endDate) {
      var d = U.daysBetween(t, date);
      if (endDate && d <= 0 && U.daysBetween(t, endDate) >= 0) return 'open';
      return d <= 0 ? 'past' : 'future';
    }
    function payStep(num, title, p, note) {
      var status = p.status === 'paid' ? 'Paid' : (p.status === 'due' ? 'Due Now' : 'Upcoming');
      return {
        num: num, title: title, date: p.due, when: p.due ? 'Due ' + U.fmtDate(p.due) : 'At booking',
        note: note, amount: p.status === 'paid' ? U.money(p.amount) + ' paid' : U.money(p.left) + (p.left < p.amount ? ' remaining' : ''),
        done: p.status === 'paid', status: status, pay: p.status !== 'paid'
      };
    }
    var dep = sched[0], bal = sched[1];
    var steps = [{ num: '01', title: 'Booked', date: null, when: 'Date on hold', note: 'Your date is on the Marquee calendar.', done: true, status: 'Done' }];
    steps.push(payStep('02', 'Booking Deposit', dep, '50% of your total locks in your date.'));
    var cf = U.addDays(eventDate, -cfg.EVENT_CALL.fromDaysBefore), ct = U.addDays(eventDate, -cfg.EVENT_CALL.toDaysBefore);
    var cs = st(cf, ct);
    var call = { date: cf, optional: true, when: U.fmtDate(cf) + ' to ' + U.fmtDate(ct), done: cs === 'past',
      status: cs === 'open' ? 'Book Now' : (cs === 'past' ? 'Done' : 'Optional'), book: 'final' };
    if (school) {
      var md = U.addDays(eventDate, -(cfg.MUSIC_REQUESTS_DAYS_BEFORE || 21));
      steps.push({ num: '03', title: 'Music in Vibo', date: md, when: 'Ready by ' + U.fmtDate(md),
        note: 'Build your must-play and do-not-play lists in Vibo. Clean edits only, always.', done: U.daysBetween(t, md) < 0,
        status: U.daysBetween(t, md) < 0 ? 'Done' : (U.daysBetween(t, md) <= 30 ? 'Open' : 'Upcoming') });
      steps.push(Object.assign(call, { num: '04', title: 'Final Details Call', note: 'Optional. Times, load-in and your school contact for the night. Music stays in Vibo.' }));
    } else {
      steps.push(payStep('03', 'Final Payment', bal, '50% due 60 days before your event.'));
      steps.push(Object.assign(call, { num: '04', title: 'Event Planning Call', note: 'Optional. Walk through the timeline and details with your headliner, 2 to 3 weeks out.' }));
    }
    var daysOut = U.daysBetween(t, eventDate);
    var lvl = daysOut <= 0 ? 4 : daysOut <= 14 ? 3 : daysOut <= 60 ? 2 : daysOut <= 180 ? 1 : 0;
    steps.push({ num: '05', title: w.Night + ' Night', date: eventDate, isFinal: true, lvl: lvl, when: U.fmtDateLong(eventDate),
      due: school && bal.status !== 'paid' ? 'Balance ' + U.money(bal.left) + ' due the night of the dance' : '',
      away: daysOut === 0 ? 'Tonight' : (daysOut < 0 ? 'What a night' : U.away(daysOut)) });
    return steps;
  }

  /* Away labels, the next step, and the progress marker. */
  function progress(steps, eventDate, t) {
    var daysOut = U.daysBetween(t, eventDate);
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
    var kind = U.kindOf(listItem.type || details.type);
    var hasBoothEvent = allEvents.some(function (e) { return e.isPhotoBooth; });
    var payments = paymentsFrom(details.history);
    var sched = schedule(eventDate, total, paid, kind, payments);
    var next = sched.filter(function (p) { return p.status !== 'paid'; })[0] || null;
    var couple = U.coupleFromName(listItem.name || details.name, listItem.type || details.type, listItem.package);
    /* School dances and private events greet the school, company or host by the full name. */
    if (kind === 'school' || kind === 'private') couple = { couple: couple.couple, first: couple.couple };
    return {
      id: listItem.id,
      list: listItem,
      details: details,
      isBooth: isBooth,
      kind: kind,
      words: U.words(kind),
      dj: team(listItem.employeeId, isBooth),
      eventDate: eventDate,
      couple: couple,
      total: total, paid: paid, balance: balance, payments: payments,
      schedule: sched, next: next,
      journey: journey(eventDate, sched, isBooth, signedDate(details.history), isBooth && U.store('mq-design-' + listItem.id), kind),
      options: addOptions(details.lines || [], hasBoothEvent, isBooth, (MQ.config.TEAM[listItem.employeeId] || {}).key, kind),
      venue: venueShort(details.venue)
    };
  }

  /* Just the venue name and city, no street address. */
  function venueShort(v) {
    if (!v) return '';
    var parts = v.split(/,\s*/).filter(function (p) { return !/^\d+\s/.test(p) && !/^\d{5}/.test(p) && !/^(ph|phone)[:\s]/i.test(p); });
    return parts.slice(0, 2).join(' \u00b7 ');
  }

  return { build: build, schedule: schedule, paymentsFrom: paymentsFrom, team: team, addOptions: addOptions, journey: journey };
})();
