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
