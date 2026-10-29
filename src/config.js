/* Marquee Client Portal configuration.
 * Everything Bob may want to change lives here.
 */
window.MQ = window.MQ || {};

/* Photos and logos load from the same place this file was loaded from (GitHub via jsDelivr). */
MQ.ASSET_BASE = (function () {
  var src = (document.currentScript && document.currentScript.src) || '';
  return src ? src.replace(/(src\/config|dist\/marquee-portal(\.min)?)\.js.*$/, 'assets/') : 'assets/';
})();

MQ.config = {
  // SAFETY SWITCH. false = new design only for TEST_CLIENTS below. true = everyone.
  LIVE_FOR_EVERYONE: false,

  // Test clients (matched against event names on the page). Add more as needed.
  // Full names only, so a real couple who shares a first name never sees the test design.
  TEST_CLIENTS: ['Teddi Price', 'Kevin Garrity'],
  // TODO: add Tony & Liana's full names here once confirmed.
  // DJEP client IDs of test clients (shown on the client's page in DJEP admin as CLIENT ID).
  TEST_CLIENT_IDS: ['387027'],

  // REQUESTS. 'test' = Request to Add shows exactly what would be sent but sends nothing.
  // 'live' = sends the request to Bob through DJEP's Request Changes form. Nothing is ever added to an event automatically.
  REQUEST_MODE: 'test',


  // Payment schedule: 25% at booking, 25% at 9 months, 25% at 6 months, balance 90 days out.
  PAYMENT_PLAN: [
    { label: 'Retainer', pct: 0.25, monthsBefore: null },
    { label: '9 Months Out', pct: 0.25, monthsBefore: 9 },
    { label: '6 Months Out', pct: 0.25, monthsBefore: 6 },
    { label: 'Final Balance', pct: 0.25, daysBefore: 90 }
  ],

  // Planning session windows
  CREATIVE_SESSION: { fromMonthsBefore: 6, toMonthsBefore: 3, optional: true },
  FINAL_PLANNING: { fromDaysBefore: 28, toDaysBefore: 14 },

  // Behold Instagram feed (from @bob_hickman). Only Reels mentioning @marqueeohio or #marqueeohio show.
  REELS_FEED: 'https://feeds.behold.so/WKarKAnpmHuUeM2c6jkt',
  REELS_FILTER: ['marqueeohio'],

  // Vibo planning app
  VIBO_URL: 'https://web.vibodj.com/',

  // Team, keyed by DJEP primary employee ID (found in each event block on the portal home page).
  // TODO: fill in IDs, contact info and Calendly links from Bob's checklist.
  TEAM: {
    '43180': {
      key: 'bob', cardPhotoFile: 'bob-card-2.jpg', cardPos: 'center 8%', photoFile: 'bob-photo-2.jpg', logoFile: 'bob-logo.png', logoH: 58, name: 'Bob Hickman', first: 'Bob', tier: 'Marquee Luxury', role: 'Owner, Lead DJ & MC', price: 3500,
      phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    },
    'BRADON_ID': {
      key: 'bradon', cardPos: 'center 30%', photoFile: 'bradon-photo.jpg', logoFile: 'bradon-logo.png', logoH: 64, name: 'Bradon Smith', first: 'Bradon', tier: 'Executive Headliner', role: 'Lead DJ & MC', price: 2700,
      phone: '330.432.4143', email: 'bradon@marqueeohio.com', instagram: 'dj_bradon',
      calendly: { creative: '', final: '' }
    },
    'DAN_ID': {
      key: 'dan', cardPhotoFile: 'dan-card-2.jpg', cardPos: 'center 0%', photoFile: 'dan-photo-2.jpg', logoFile: 'dan-logo.png', logoH: 58, name: 'Daniel Sanatore', first: 'Dan', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    },
    'JAMES_ID': {
      key: 'james', cardPos: 'center 0%', photoFile: 'james-photo.jpg', logoFile: 'james-logo.png', logoH: 58, name: 'James Stevenson', first: 'James', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    }
  },

  // Photo booth events show this general Marquee contact instead of whoever is staffed on the booth.
  COMPANY_CONTACT: {
    key: 'marquee', name: 'Marquee Events', first: 'Bob', tier: 'Photo Booth Team', role: 'Questions about your booth?',
    note: 'Call or text Bob directly and we will take care of you.',
    phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
    logoFile: '../brand/marquee-logo-white.png', logoH: 46
  },

  // Add-on catalog (2027-2028 wedding guide pricing). TODO: replace with Bob's final options and pricing document.
  // match: words that identify this item on a DJEP fee line, so already-booked items are hidden.
  CATALOG: [
    { id: 'clouds', cat: 'Atmosphere & Effects', name: 'Dancing on the Clouds', price: 350, match: 'clouds', sub: 'Low-lying cloud effect for your first dance.' },
    { id: 'spark', cat: 'Atmosphere & Effects', name: 'Sparkler Fountains', price: 395, unit: 'pair', match: 'sparkler', sub: 'Cold spark fountains for the big moments.' },
    { id: 'co2', cat: 'Atmosphere & Effects', name: 'CO2 Cryo Jets', price: 450, unit: 'pair', match: 'cryo', sub: 'Blasts of cold fog when the beat drops.' },
    { id: 'coolburst', cat: 'Atmosphere & Effects', name: 'Cool Burst LED CO2 Gun', price: 350, match: 'cool burst', sub: 'Handheld LED CO2 bursts on the dance floor.' },
    { id: 'snow', cat: 'Atmosphere & Effects', name: 'Snow Machine', price: 550, match: 'snow', sub: 'A winter-wonderland finish.' },
    { id: 'foam', cat: 'Atmosphere & Effects', name: 'LED Foam Party Favors', price: 275, match: 'foam', sub: 'Glow sticks and wands for every guest.' },
    { id: 'astera', cat: 'Lighting & Visuals', name: 'Astera LED Light Tubes', price: 400, match: 'astera', sub: 'Wireless light tubes that move with the music.' },
    { id: 'mono', cat: 'Lighting & Visuals', name: 'Standard Monogram Projection', price: 300, match: 'standard monogram', sub: 'Your names or initials in light.' },
    { id: 'amono', cat: 'Lighting & Visuals', name: 'Animated Monogram Projection', price: 350, match: 'monogram', sub: 'Your monogram, animated on the floor or wall.' },
    { id: 'classic', cat: 'Photo Booths', name: 'Classic Photo Booth', price: 795, match: 'classic photo booth', booth: true, sub: 'Unlimited prints and a digital gallery.' },
    { id: 'roamer', cat: 'Photo Booths', name: 'Roamer Photo Booth', price: 595, match: 'roamer', booth: true, sub: 'A roaming booth that comes to your guests.' },
    { id: 'scrap', cat: 'Photo Booths', name: 'Keepsake Scrapbook', price: 150, match: 'scrapbook', booth: true, sub: 'Guests sign a book of your photo strips.' },
    { id: 'sax', cat: 'Live Music', name: 'Saxy Rob', price: 1800, match: 'sax', sub: 'Live sax over the DJ set.' },
    { id: 'ceremony', cat: 'Ceremony & More Time', name: 'Ceremony Package', price: 400, match: 'ceremony', sub: 'Sound, mics and music for your ceremony.' },
    { id: 'hour', cat: 'Ceremony & More Time', name: 'Additional Hour', price: 500, match: 'additional hour', repeatable: true, sub: 'Keep the party going an extra hour.' }
  ],

  // The "Couples Love These" picks, in order. Anything already booked is skipped and the next item fills in.
  FEATURED: ['clouds', 'spark', 'co2', 'amono', 'astera', 'sax']
};
