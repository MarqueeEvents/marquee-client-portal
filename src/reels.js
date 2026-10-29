/* Latest Reels from the Behold feed. Only posts that mention @marqueeohio or #marqueeohio show.
 * Covers on many Reels are black, so each tile shows a frame from inside the video instead.
 */
window.MQ = window.MQ || {};

MQ.reels = (function () {
  var U = MQ.util;

  function load() {
    return fetch(MQ.config.REELS_FEED).then(function (r) { return r.json(); }).then(function (j) {
      var posts = Array.isArray(j) ? j : (j.posts || []);
      var tags = MQ.config.REELS_FILTER.map(function (t) { return t.toLowerCase(); });
      return posts.filter(function (p) {
        var hay = [(p.caption || ''), (p.mentions || []).join(' '), (p.hashtags || []).join(' ')].join(' ').toLowerCase();
        return tags.some(function (t) { return hay.indexOf(t) >= 0; });
      }).slice(0, 4);
    });
  }

  function tile(p) {
    var video = p.mediaType === 'VIDEO' && p.mediaUrl;
    var poster = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || p.thumbnailUrl || '';
    var media = video
      ? '<video src="' + U.esc(p.mediaUrl) + '#t=2" muted playsinline preload="metadata"></video>'
      : '<img src="' + U.esc(poster || p.mediaUrl) + '" alt="" loading="lazy">';
    return '<a class="mq-reel" href="' + U.esc(p.permalink) + '" target="_blank" rel="noopener" aria-label="Watch on Instagram">' + media +
      '<span class="sh"></span><span class="pl">' + U.icon('play', 14) + '</span><span class="cp">' + U.esc(p.prunedCaption || '') + '</span></a>';
  }

  function render(container) {
    container.innerHTML = '<div class="mq-sechead"><div><span class="mq-eyebrow">Fresh From The Floor</span>' +
      '<h2 class="mq-h2">Latest Reels <span class="mq-serif">from @marqueeohio.</span></h2></div>' +
      '<a class="mq-livepill" href="https://www.instagram.com/marqueeohio/" target="_blank" rel="noopener"><i></i>Live Feed</a></div>' +
      '<div class="mq-reel-grid"></div>';
    var grid = container.querySelector('.mq-reel-grid');
    load().then(function (posts) {
      if (!posts.length) { container.style.display = 'none'; return; }
      grid.innerHTML = posts.map(tile).join('');
    }).catch(function () { container.style.display = 'none'; });
  }

  return { render: render, load: load };
})();
