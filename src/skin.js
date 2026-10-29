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
        '<b class="t">' + esc(d.type || '') + ' \u00b7 ' + esc(U.fmtDateLong(date)) + '</b>' +
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
