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

  /* Header used on every request so Bob's Gmail filter can find them ("MARQUEE PORTAL REQUEST"). */
  function header(vm, kind) {
    var what = vm.isBooth ? (vm.list.package || 'Photo Booth') : U.typeName(vm.list.type || vm.details.type);
    return ['MARQUEE PORTAL REQUEST: ' + kind, vm.couple.couple, what + ', ' + U.fmtDate(vm.eventDate)].join('\n');
  }

  function message(vm, items) {
    var sum = items.reduce(function (a, c) { return a + c.price; }, 0);
    var lines = items.map(function (c) { return '- ' + c.name + ' (' + U.money(c.price) + (c.unit ? '/' + c.unit : '') + ')'; });
    return [header(vm, 'ADD-ONS'), lines.join('\n'),
      'Adds ' + U.money(sum) + ' | New total ' + U.money(vm.total + sum),
      'Review in DJEP before adding.'].join('\n');
  }

  /* DJEP has one form per change type (venue, time, date, other). We use the "other" form
   * (action ...?action=request_change&change_type=other). */
  function buildSubmission(eventId) {
    return MQ.reader.fetchPage('/clients/requestchanges.asp?eventid=' + encodeURIComponent(eventId)).then(function (doc) {
      var forms = Array.prototype.filter.call(doc.querySelectorAll('form'), function (f) { return f.querySelector('[name="request_change_comments"]'); });
      var form = forms.filter(function (f) { return /change_type=other/i.test(f.getAttribute('action') || ''); })[0] ||
        forms.filter(function (f) {
          return Array.prototype.every.call(f.elements, function (e) { return !e.name || e.name === 'request_change_comments' || e.type === 'hidden' || e.type === 'submit'; });
        })[0] || null;
      if (!form) throw new Error('Request form not found (you may have been logged out).');
      var action = new URL(form.getAttribute('action') || location.href, location.origin + '/clients/').href;
      var hidden = {};
      Array.prototype.forEach.call(form.querySelectorAll('input[type=hidden][name]'), function (h) { hidden[h.name] = h.value; });
      return { action: action, hidden: hidden };
    });
  }

  /* DJEP's comments box holds 250 characters, so longer messages go as numbered parts. */
  function chunks(text) {
    var max = 240, out = [], rest = text.replace(/\n{2,}/g, '\n').trim();
    if (rest.length <= 250) return [rest];
    while (rest.length) {
      var cut = rest.length <= max ? rest.length : Math.max(rest.lastIndexOf('\n', max), rest.lastIndexOf(' ', max));
      if (cut < 60) cut = max;
      out.push(rest.slice(0, cut).trim()); rest = rest.slice(cut).trim();
    }
    return out.map(function (c, i) { return '(' + (i + 1) + '/' + out.length + ') ' + c; });
  }

  /* Posts one part as a normal form (DJEP's classic ASP pages cannot read multipart uploads)
   * and only counts it as sent when DJEP replies "has been submitted". */
  function post(sub, part) {
    var body = new URLSearchParams();
    Object.keys(sub.hidden).forEach(function (k) { body.set(k, sub.hidden[k]); });
    body.set('request_change_comments', part);
    return fetch(sub.action, { method: 'POST', body: body, credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('DJEP returned ' + r.status + '.');
      return r.text();
    }).then(function (t) {
      if (!/has been submitted/i.test(t)) throw new Error(/logonform/i.test(t) ? 'You were logged out. Please log in again and resend.' : 'DJEP did not confirm the request.');
    });
  }

  function deliver(vm, text) {
    var live = MQ.config.REQUEST_MODE === 'live';
    return buildSubmission(vm.id).then(function (sub) {
      if (!live) {
        console.info('[Marquee portal] TEST MODE (not sent)', text);
        return { mode: 'test', text: text };
      }
      return chunks(text).reduce(function (p, part) { return p.then(function () { return post(sub, part); }); }, Promise.resolve())
        .then(function () { return { mode: 'sent', text: text }; });
    });
  }

  /* Returns a promise of { mode: 'test' | 'sent', text }. */
  function send(vm, items) {
    var text = message(vm, items);
    return deliver(vm, text).then(function (res) {
      if (res.mode !== 'sent') return res;
      var list = pending(vm.id);
      items.forEach(function (c) { if (list.indexOf(c.id) < 0) list.push(c.id); });
      setPending(vm.id, list);
      return res;
    });
  }

  /* Any other message from the portal (for example the photo booth print design). Same test/live switch. */
  function sendText(vm, text) { return deliver(vm, text); }

  function cancel(eventId, id) {
    setPending(eventId, pending(eventId).filter(function (x) { return x !== id; }));
  }

  return { send: send, sendText: sendText, header: header, pending: pending, cancel: cancel, message: message };
})();
