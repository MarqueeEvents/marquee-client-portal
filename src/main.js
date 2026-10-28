/* Entry point. Runs on every DJEP client portal page via the Custom Scripting box.
 * For now it only reads data and logs it, so we can confirm the reader against the test clients
 * before any visual change ships.
 */
(function () {
  function start() {
    if (!window.MQ || !MQ.gate || !MQ.gate.shouldRun()) return;
    document.documentElement.classList.add('mq-portal');

    var events = MQ.reader.readEventList();
    var team = MQ.config.TEAM;
    var summary = events.map(function (e) {
      return { id: e.id, type: e.type, date: e.date, status: e.status, headliner: (team[e.employeeId] || {}).name || ('unknown employee ' + e.employeeId) };
    });
    console.info('[Marquee portal] events on this page', summary);

    events.forEach(function (e) {
      if (!e.id) return;
      MQ.reader.loadEventDetails(e.id).then(function (d) {
        console.info('[Marquee portal] event details ' + e.id, d);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
