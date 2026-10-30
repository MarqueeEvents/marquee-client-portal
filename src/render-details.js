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
      (vm.isBooth ? '' : U.viboButton('mq-btn mq-btn-ghost', 15)) + '</div></section>';

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
    var svcName = U.lineName((svc.service || [])[0] || '');
    var included = svc.description || [];
    var addons = (svc.addons || []).join(', ').split(/\s*,\s*/).filter(Boolean).map(U.lineName);
    var pkg = (svcName ? '<div class="mq-pkg-name">' + esc(svcName) + '</div>' : '') +
      (included.length ? '<ul class="mq-incl">' + included.map(function (l) { return '<li><span class="ck">' + icon('check', 12) + '</span>' + esc(U.lineName(l)) + '</li>'; }).join('') + '</ul>' : '') +
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
