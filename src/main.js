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
