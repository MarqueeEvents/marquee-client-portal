/* Reads event data from DJ Event Planner's client portal pages.
 * Built from the data map in docs/data-map.md (mapped Oct 28, 2026).
 * Every reader returns plain objects and never throws; missing data comes back as null.
 */
window.MQ = window.MQ || {};

MQ.reader = (function () {
  function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : null; }
  function money(str) {
    if (!str) return null;
    var n = parseFloat(String(str).replace(/[^0-9.\-]/g, ''));
    return isNaN(n) ? null : n;
  }
  function eventIdFromHref(href) {
    var m = /eventid=(\d+)/i.exec(href || '');
    return m ? m[1] : null;
  }
  /* Text with line breaks preserved. Works on live pages and on fetched (unrendered) pages. */
  function blockText(el) {
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('br'), function (b) { b.replaceWith('\n'); });
    Array.prototype.forEach.call(c.querySelectorAll('p,div,tr,li,b,strong'), function (b) { b.append('\n'); });
    return c.textContent.replace(/[ \t\u00a0]+/g, ' ');
  }
  /* Non-empty lines of a box, minus its title and any lines matching skip. */
  function boxLines(container, skip) {
    if (!container) return [];
    return blockText(container).split('\n').map(function (s) { return s.trim(); })
      .filter(function (s) { return s && !(skip && skip.test(s)); })
      .filter(function (s, i, a) { return a.indexOf(s) === i; });
  }
  function labelValue(container, label) {
    if (!container) return null;
    /* Value on the same line only, so an empty "Setup Time:" does not swallow the next line. */
    /* If the label sits alone on its line (bold labels do), use the next line unless it is another label. */
    var m = new RegExp(label + ':[ \\t]*([^\\n]*)(?:\\n\\s*([^\\n]*))?', 'i').exec(blockText(container));
    if (!m) return null;
    if (m[1].trim()) return m[1].trim();
    var next = (m[2] || '').trim();
    return next && !/^[A-Za-z][A-Za-z /#]{1,30}:/.test(next) ? next : null;
  }

  /* Home page and My Events: one block per event (.djep-singleeventdiv). */
  function readEventList(root) {
    root = root || document;
    return Array.prototype.map.call(root.querySelectorAll('.djep-singleeventdiv'), function (block) {
      var hidden = block.querySelector('.hidden_event_information');
      var details = block.querySelector('a.djep-eventdetailsbutton');
      var id = eventIdFromHref(details && details.getAttribute('href'));
      return {
        id: id,
        employeeId: text(hidden && hidden.querySelector('.primary_employee_id')),
        date: text(hidden && hidden.querySelector('[class^="event_date_"]')),
        name: text(hidden && hidden.querySelector('[class^="event_name_"]')),
        status: text(hidden && hidden.querySelector('[class^="event_status_"]')),
        type: labelValue(block, 'Event Type'),
        package: labelValue(block, 'Package'),
        links: {
          plan: (block.querySelector('a.djep-planeventbutton') || {}).href || null,
          details: (details || {}).href || null,
          payment: (block.querySelector('a.djep-paymentbutton') || {}).href || null
        },
        isPhotoBooth: /photo\s*booth/i.test(labelValue(block, 'Event Type') || '')
      };
    });
  }

  /* Event Details page (eventdetails.asp?eventid=ID). */
  function readEventDetails(root) {
    root = root || document;
    var feeBox = root.querySelector('.djep-feedetailsbox');
    var lines = [], group = null;
    if (feeBox) {
      Array.prototype.forEach.call(feeBox.querySelectorAll('tr'), function (tr) {
        var cells = tr.querySelectorAll('td');
        if (!cells.length) return;
        var name = text(cells[0]);
        var price = cells.length >= 2 ? money(text(cells[cells.length - 1])) : null;
        if (name && price !== null) lines.push({ name: name, price: price, group: group });
        else if (name && !/^description$/i.test(name)) group = name;
      });
    }

    /* Service details: fieldsets with a legend (Service, Description, Addons). */
    var service = {};
    Array.prototype.forEach.call(root.querySelectorAll('.djep-servicedetailsbox fieldset'), function (fs) {
      var legend = fs.querySelector('legend');
      var key = text(legend);
      if (!key) return;
      var c = fs.cloneNode(true);
      var lg = c.querySelector('legend');
      if (lg) lg.remove();
      service[key.toLowerCase()] = boxLines(c);
    });

    /* Payment history rows (date, method, amount...). */
    var payBox = root.querySelector('.djep-paymenthistorybox');
    var history = [];
    if (payBox) {
      Array.prototype.forEach.call(payBox.querySelectorAll('tr'), function (tr) {
        var cells = Array.prototype.map.call(tr.querySelectorAll('td'), text).filter(Boolean);
        if (cells.length >= 2 && !cells.every(function (c) { return /^(date|amount|method|type|description|payment)s?$/i.test(c); })) history.push(cells);
      });
    }

    var docs = Array.prototype.map.call(root.querySelectorAll('.djep-documentsbox a[href]'), function (a) {
      return { name: text(a), href: a.href };
    }).filter(function (d) { return d.name; });

    var desc = root.querySelector('.djep-eventdescriptionbox');
    var times = root.querySelector('.djep-eventdatetimesbox');
    var totals = root.querySelector('.djep-totalfeebox');
    var req = root.querySelector('.djep-requestchangesbox a[href]');
    var pay = root.querySelector('a.djep-paymentbutton');
    return {
      id: labelValue(desc, 'Event ID'),
      name: labelValue(desc, 'Event Name'),
      type: labelValue(desc, 'Event Type'),
      status: labelValue(desc, 'Booking Status'),
      date: labelValue(times, 'Event Date'),
      setup: labelValue(times, 'Setup Time'),
      start: labelValue(times, 'Start Time'),
      end: labelValue(times, 'End Time'),
      venueLines: boxLines(root.querySelector('.djep-venueinfobox'), /^venue information$/i),
      venue: boxLines(root.querySelector('.djep-venueinfobox'), /^venue information$/i).join(', ') || null,
      staff: boxLines(root.querySelector('.djep-staffingbox'), /^staffing$|^attire:/i),
      attire: labelValue(root.querySelector('.djep-staffingbox'), 'Attire'),
      service: service,
      lines: lines,
      history: history,
      documents: docs,
      subtotal: money(labelValue(totals, 'Subtotal')),
      totalFee: money(labelValue(totals, 'TOTAL FEE')),
      deposit: money(labelValue(totals, 'DEPOSIT')),
      payments: money(labelValue(totals, 'Payments')),
      balanceDue: money(labelValue(totals, 'BALANCE DUE')),
      links: { request: req ? req.href : null, payment: pay ? pay.href : null }
    };
  }

  /* Fetch another portal page (same login session) and read it without leaving the current page. */
  function fetchPage(url) {
    return fetch(url, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) { return new DOMParser().parseFromString(html, 'text/html'); });
  }

  function loadEventDetails(eventId) {
    return fetchPage('/clients/eventdetails.asp?eventid=' + encodeURIComponent(eventId)).then(readEventDetails);
  }

  return { readEventList: readEventList, readEventDetails: readEventDetails, loadEventDetails: loadEventDetails, fetchPage: fetchPage };
})();
