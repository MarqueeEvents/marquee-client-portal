/* Entry point. Runs on every DJEP client portal page via the Custom Scripting box.
 * Home and My Events are rebuilt in the Marquee design. Every other portal page keeps DJEP's
 * content and gets the Marquee header and colors.
 */
(function () {
  function isTakeoverPage() {
    return /\/clients\/(home|events)\.asp/i.test(location.pathname) || /\/clients\/?$/i.test(location.pathname);
  }

  function upcoming(events) {
    return events.filter(function (e) { return e.id && !/cancel/i.test(e.status || ''); });
  }

  function start() {
    if (!window.MQ || !MQ.gate || !MQ.gate.shouldRun()) return;
    var html = document.documentElement;
    html.classList.add('mq-portal');
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
