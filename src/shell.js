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
