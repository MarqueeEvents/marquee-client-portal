/* Request to Add. Sends the couple's picks to Bob through DJEP's own Request Changes form
 * ("something else" box, field request_change_comments). Nothing is added to the event automatically:
 * Bob reviews every request in DJEP and adds approved items himself.
 *
 * MQ.config.REQUEST_MODE = 'test' builds the exact message but does not send it.
 */
window.MQ = window.MQ || {};

MQ.requests = (function () {
  var U = MQ.util;
  var KEY = 'mq-pending-';

  function pending(eventId) { return U.store(KEY + eventId) || []; }
  function setPending(eventId, list) { U.store(KEY + eventId, list); }

  function message(vm, items) {
    var sum = items.reduce(function (a, c) { return a + c.price; }, 0);
    var lines = items.map(function (c) { return '- ' + c.name + ' (' + U.money(c.price) + (c.unit ? ' per ' + c.unit : '') + ')'; });
    return [
      'ADD-ON REQUEST from the client portal (please review before adding)',
      'Event: ' + (vm.list.name || '') + ' on ' + U.fmtDate(vm.eventDate),
      '',
      lines.join('\n'),
      '',
      'Adds: ' + U.money(sum) + '   New total if approved: ' + U.money(vm.total + sum)
    ].join('\n');
  }

  /* Finds the form that holds request_change_comments, copies its hidden fields, fills the message. */
  function buildSubmission(eventId, text) {
    return MQ.reader.fetchPage('/clients/requestchanges.asp?eventid=' + encodeURIComponent(eventId)).then(function (doc) {
      var box = doc.querySelector('[name="request_change_comments"]');
      var form = box && box.closest('form');
      if (!form) throw new Error('Request form not found (session may have timed out).');
      var data = new FormData(form);
      data.set('request_change_comments', text);
      var submit = form.querySelector('[type=submit][name]');
      if (submit) data.set(submit.name, submit.value);
      var action = new URL(form.getAttribute('action') || location.href, location.origin + '/clients/').href;
      return { action: action, method: (form.method || 'post').toUpperCase(), data: data };
    });
  }

  /* Returns a promise of { mode: 'test' | 'sent', text }. */
  function send(vm, items) {
    var text = message(vm, items);
    var live = MQ.config.REQUEST_MODE === 'live';
    return buildSubmission(vm.id, text).then(function (sub) {
      if (!live) {
        console.info('[Marquee portal] TEST MODE request (not sent)', sub.action, text);
        return { mode: 'test', text: text };
      }
      return fetch(sub.action, { method: sub.method, body: sub.data, credentials: 'same-origin' }).then(function (r) {
        if (!r.ok) throw new Error('DJEP returned ' + r.status);
        return { mode: 'sent', text: text };
      });
    }).then(function (res) {
      if (res.mode !== 'sent') return res;
      var list = pending(vm.id);
      items.forEach(function (c) { if (list.indexOf(c.id) < 0) list.push(c.id); });
      setPending(vm.id, list);
      return res;
    });
  }

  function cancel(eventId, id) {
    setPending(eventId, pending(eventId).filter(function (x) { return x !== id; }));
  }

  return { send: send, pending: pending, cancel: cancel, message: message };
})();
