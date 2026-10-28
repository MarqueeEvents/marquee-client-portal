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

  function isTestClient() {
    var text = document.body ? document.body.innerText : '';
    return MQ.config.TEST_CLIENTS.some(function (name) { return text.indexOf(name) >= 0; });
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
