/* Decides whether the new Marquee design should run for this visitor.
 * Real couples keep the stock DJEP portal until MQ.config.LIVE_FOR_EVERYONE is true.
 */
window.MQ = window.MQ || {};

MQ.gate = (function () {
  /* No URL back door: only test clients (or LIVE_FOR_EVERYONE) see the new design.
   * Clears the old preview flag from earlier testing builds. */
  try { localStorage.removeItem('mq-portal-preview'); } catch (e) {}

  /* Test client check. Most pages carry DJEP's client ID (#clientIDspan); Event Details carries the names;
   * Make a Payment carries neither, so a confirmed test client is remembered for this browser tab only.
   * A page showing a different client ID clears it right away. */
  var SESSION_KEY = 'mq-test-client';
  function isTestClient() {
    var idEl = document.getElementById('clientIDspan');
    var id = idEl ? idEl.textContent.trim() : '';
    var text = document.body ? document.body.textContent : '';
    var ok = (id && (MQ.config.TEST_CLIENT_IDS || []).indexOf(id) >= 0) ||
      MQ.config.TEST_CLIENTS.some(function (name) { return text.indexOf(name) >= 0; });
    try {
      if (ok) { sessionStorage.setItem(SESSION_KEY, '1'); return true; }
      if (id) { sessionStorage.removeItem(SESSION_KEY); return false; }
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) { return ok; }
  }

  function isClientPortal() {
    return /\/clients\//i.test(window.location.pathname);
  }

  return {
    shouldRun: function () {
      if (!isClientPortal()) return false;
      if (MQ.config.LIVE_FOR_EVERYONE) return true;
      return isTestClient();
    }
  };
})();
