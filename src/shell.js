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
    html += '<a href="#" data-mq-logout>' + U.icon('logout', 14) + 'Logout</a>';
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

  /* Puts the Marquee header at the top of every portal page. Returns the app container for takeover pages. */
  function mount(takeover) {
    var page = document.getElementById('djep-page') || document.body;
    var wrap = document.createElement('div');
    wrap.className = 'mq-app';
    wrap.id = 'mq-app';
    wrap.appendChild(header());
    var main = document.createElement('main');
    main.className = 'mq-main';
    if (takeover) wrap.appendChild(main);
    var content = document.getElementById('djep-content');
    if (content && content.parentNode === page) page.insertBefore(wrap, content);
    else page.insertBefore(wrap, page.firstChild);
    if (takeover) wrap.appendChild(footer());
    else {
      var f = document.createElement('div');
      f.className = 'mq-app';
      f.appendChild(footer());
      page.appendChild(f);
    }
    if (!MQ.config.LIVE_FOR_EVERYONE) {
      var b = document.createElement('div');
      b.className = 'mq-test-banner';
      b.textContent = 'Marquee preview \u00b7 test mode';
      wrap.appendChild(b);
    }
    return main;
  }

  return { mount: mount };
})();
