/* Decides whether the new Marquee design should run for this visitor.
 * Real couples keep the stock DJEP portal until MQ.config.LIVE_FOR_EVERYONE is true.
 */
window.MQ = window.MQ || {};

MQ.gate = (function () {
  var KEY = 'mq-portal-preview';

  function readPreviewParam() {
    try {
      var p = new URLSearchParams(window.location.search).get(MQ.config.PREVIEW_PARAM);
      if (p === 'on') localStorage.setItem(KEY, 'on');
      if (p === 'off') localStorage.removeItem(KEY);
      return localStorage.getItem(KEY) === 'on';
    } catch (e) {
      return false;
    }
  }

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
      return readPreviewParam() || isTestClient();
    }
  };
})();
