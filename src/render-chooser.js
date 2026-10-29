/* "Your Events" chooser. Shown only when a couple has 2 or more events (for example DJ + photo booth),
 * and it only lists the events they actually have.
 */
window.MQ = window.MQ || {};

MQ.renderChooser = (function () {
  var U = MQ.util, esc = U.esc;

  function render(main, events) {
    var first = U.coupleFromName(events[0].name, events[0].type).first;
    var cards = events.map(function (e) {
      var d = U.parseDate(e.date);
      var dj = MQ.model.team(e.employeeId);
      var img = e.isPhotoBooth ? MQ.ASSET_BASE + 'events/photo-booth.jpg' : dj.photo;
      var label = e.isPhotoBooth ? (e.package || 'Photo Booth') : 'Wedding Entertainment';
      return '<a class="mq-evcard" href="?mqevent=' + e.id + '"><div class="img"><img src="' + esc(img) + '" alt="" style="object-position:center ' + (e.isPhotoBooth ? '70%' : '20%') + '"></div>' +
        '<div class="bd"><span class="mq-eyebrow">' + U.icon(e.isPhotoBooth ? 'camera' : 'music', 13) + ' ' + esc(e.isPhotoBooth ? 'Photo Booth' : 'DJ & MC') + '</span>' +
        '<h3>' + esc(label) + '</h3><span class="meta">' + esc(U.fmtDateLong(d)) + (e.isPhotoBooth ? '' : ' \u00b7 with ' + esc(dj.first)) + '</span>' +
        '<span class="mq-chip mq-chip-ok" style="align-self:flex-start"><span class="mq-dot"></span>' + esc(e.status || 'Booked') + '</span>' +
        '<span class="go">Open This Event ' + U.icon('arrow', 14) + '</span></div></a>';
    }).join('');
    main.innerHTML = '<section class="mq-hero"><span class="mq-eyebrow">Client Portal</span><h1>Welcome back,<br>' + esc(first) + '.</h1>' +
      '<p class="mq-serif">your night, by design.</p><p>You have ' + events.length + ' events with Marquee. Pick one to see its details, payments and add-ons.</p></section>' +
      '<section aria-label="Your events"><div class="mq-sechead" style="margin-bottom:16px"><div><span class="mq-eyebrow">Your Events</span><h2 class="mq-h2">Choose Your Event</h2></div></div>' +
      '<div class="mq-choose">' + cards + '</div></section><section class="mq-reels" data-mq-reels></section>';
    MQ.reels.render(main.querySelector('[data-mq-reels]'));
  }

  return { render: render };
})();
