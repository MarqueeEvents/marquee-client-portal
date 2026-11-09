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
  LIVE_FOR_EVERYONE: true,

  // Test clients (matched against event names on the page). Add more as needed.
  // Full names only, so a real couple who shares a first name never sees the test design.
  TEST_CLIENTS: ['Teddi Price', 'Kevin Garrity'],
  // TODO: add Tony & Liana's full names here once confirmed.
  // DJEP client IDs of test clients (shown on the client's page in DJEP admin as CLIENT ID).
  TEST_CLIENT_IDS: ['387027'],

  // REQUESTS. 'test' = Request to Add shows exactly what would be sent but sends nothing.
  // 'live' = sends the request to Bob through DJEP's Request Changes form. Nothing is ever added to an event automatically.
  REQUEST_MODE: 'live',


  // Payment schedule: 25% at booking, 25% at 9 months, 25% at 6 months, balance 90 days out.
  PAYMENT_PLAN: [
    { label: 'Retainer', pct: 0.25, monthsBefore: null },
    { label: '9 Months Out', pct: 0.25, monthsBefore: 9 },
    { label: '6 Months Out', pct: 0.25, monthsBefore: 6 },
    { label: 'Final Balance', pct: 0.25, daysBefore: 90 }
  ],

  // School dances and private events (corporate, fundraiser, parties). Bob, Nov 9.
  // Schools: 50% to book, balance the night of the dance. Private: 50% to book, 50% due 60 days out.
  PAYMENT_PLANS: {
    school: [
      { label: 'Booking Deposit', pct: 0.5, monthsBefore: null },
      { label: 'Balance', pct: 0.5, daysBefore: 0 }
    ],
    private: [
      { label: 'Booking Deposit', pct: 0.5, monthsBefore: null },
      { label: 'Final Payment', pct: 0.5, daysBefore: 60 }
    ]
  },

  // Planning session windows
  CREATIVE_SESSION: { fromMonthsBefore: 6, toMonthsBefore: 3, optional: true },
  FINAL_PLANNING: { fromDaysBefore: 28, toDaysBefore: 14 },
  // School dances and private events: one optional call about 2 to 3 weeks out (Bob's Final Planning link for now).
  EVENT_CALL: { fromDaysBefore: 21, toDaysBefore: 14 },
  // School dances: music requests and do-not-play list due this many days before the dance.
  MUSIC_REQUESTS_DAYS_BEFORE: 21,

  // Event kind from the DJEP event type. Anything that is not a wedding, photo booth or school dance is a private event.
  KIND_TESTS: { booth: /photo\s*booth/i, wedding: /wedding/i, school: /school|prom|homecoming/i },

  // Wording by kind. Weddings keep today's wording exactly (booth uses the wedding words).
  WORDS: {
    wedding: { night: 'your night', Night: 'Night', serif: 'your night, by design.', guests: 'guests', featured: 'Couples Love These',
      drop: "Let's<br>Dance", dropTag: 'Wedding Night', footer: 'Luxury Wedding Entertainment', who: 'couple' },
    school: { night: 'your dance', Night: 'Dance', serif: 'your dance, by design.', guests: 'students', featured: 'Students Love These',
      drop: 'Dance<br>Night', dropTag: 'Showtime', footer: 'School Dance Entertainment', who: 'school' },
    'private': { night: 'your event', Night: 'Event', serif: 'your event, by design.', guests: 'guests', featured: 'Guests Love These',
      drop: 'Event<br>Night', dropTag: 'Showtime', footer: 'Luxury Event Entertainment', who: 'host' }
  },

  // Non-wedding add-ons: same catalog, minus wedding-only items, with these names and descriptions swapped in.
  WEDDING_ONLY: ['ceremony'],
  NON_WEDDING_SWAPS: {
    mono: { name: 'Logo Projection', sub: { school: 'Your school logo in lights, on the wall or dance floor.', 'private': 'Your company or event logo in lights, on the wall or dance floor.' } },
    ledbooth: { sub: 'Our LED mirror DJ booth with a built-in 65" screen for your logo or visuals.' },
    wrap: { sub: 'Your logo or artwork wrapped across the entire dance floor.' },
    clouds: { sub: 'A thick, low cloud rolls across the floor for a slow song or big moment.' },
    spark: { sub: 'For a grand entrance, a big announcement or the last song. Built for indoor use.' },
    snow: { sub: 'Soft falling snow for a slow song or special moment.' },
    sax: { sub: 'Live sax by Saxy Rob, played right over the DJ set. Ask about his availability.' }
  },
  // Picks for non-weddings: same as the wedding list without the ceremony; logo projection first.
  FEATURED_NON_WEDDING: ['mono', 'clouds', 'co2', 'spark', 'gatling', 'foam', 'floorlights', 'sax'],

  // Behold Instagram feed (from @bob_hickman). Only Reels mentioning @marqueeohio or #marqueeohio show.
  REELS_FEED: 'https://feeds.behold.so/WKarKAnpmHuUeM2c6jkt',
  REELS_FILTER: ['marqueeohio'],

  // Vibo planning app
  // Empty = the Open Vibo button shows but does not link anywhere (Bob, Oct 29). Put a link back here to turn it on.
  VIBO_URL: '',

  // Team, keyed by DJEP primary employee ID (found in each event block on the portal home page).
  // TODO: fill in IDs, contact info and Calendly links from Bob's checklist.
  TEAM: {
    '43180': {
      key: 'bob', cardTier: 'Luxury Headliner', cardLogoH: 58, cardPhotoFile: 'bob-card-2.jpg', cardPos: 'center 8%', photoFile: 'bob-photo-2.jpg', logoFile: 'bob-logo.png', logoH: 58, name: 'Bob Hickman', first: 'Bob', tier: 'Luxury Headliner', role: 'Founder, DJ & MC', price: 3500,
      phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'bob_hickman',
      calendly: { creative: '', final: '' }
    },
    '43269': {
      key: 'bradon', cardTier: 'Executive Headliner', cardLogoH: 46, cardPhotoFile: 'bradon-card-4.jpg', cardPos: 'center 0%', photoFile: 'bradon-photo.jpg', logoFile: 'bradon-logo.png', logoH: 64, name: 'Bradon Smith', first: 'Bradon', tier: 'Executive Headliner', role: 'Lead DJ & MC', price: 2700,
      phone: '330.432.4143', email: 'bradon@marqueeohio.com', instagram: 'dj_bradon',
      calendly: { creative: '', final: '' }
    },
    '43300': {
      key: 'dan', cardTier: 'Headliner', cardLogoH: 56, cardPhotoFile: 'dan-card-5.jpg', cardPos: 'center 0%', photoFile: 'dan-photo-2.jpg', logoFile: 'dan-logo.png', logoH: 58, name: 'Daniel Sanatore', first: 'Dan', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '330.440.5509', email: 'daniel@marqueeohio.com', instagram: 'dj_sanatore',
      calendly: { creative: '', final: '' }
    },
    '43299': {
      key: 'james', cardTier: 'Headliner', cardLogoH: 54, cardPos: 'center 0%', photoFile: 'james-photo.jpg', logoFile: 'james-logo-2.png', logoH: 58, name: 'James Stevenson', first: 'James', tier: 'Headliner', role: 'Lead DJ & MC', price: 2200,
      phone: '330.407.9572', email: 'james@marqueeohio.com', instagram: 'jamessmu',
      calendly: { creative: '', final: '' }
    },
    '43301': {
      key: 'jake', cardTier: 'Headliner', cardPhotoFile: 'silhouette-card-2.jpg', cardPos: 'center 0%', photoFile: 'silhouette-2.jpg', logoFile: '', logoH: 58, name: 'Jake Kinsey', first: 'Jake', tier: 'Headliner', role: 'DJ, Production Assistant',
      phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
      calendly: { creative: '', final: '' }
    },
    '43302': {
      key: 'mike', cardTier: 'Headliner', cardPhotoFile: 'mike-card.jpg', cardPos: 'center 0%', photoFile: 'mike-photo.jpg', pos: 'center 15%', logoFile: '', logoH: 58, name: 'Mike Bishman', first: 'Mike', tier: 'Headliner', role: 'DJ & MC',
      phone: '740.350.7922', email: 'info@marqueeohio.com', instagram: 'marqueeohio',
      calendly: { creative: '', final: '' }
    }
  },

  // Booking links used for any DJ whose own Calendly links are not filled in yet (Bob's for now).
  CALENDLY_DEFAULT: {
    creative: 'https://calendly.com/marqueedj/wedding-creative-session',
    final: 'https://calendly.com/marqueedj/wedding-final-planning-meeting'
  },

  // Anyone staffed on a DJ event who is not in TEAM yet (for example Jake, 43301): a neutral Marquee card with Bob's contact info.
  FALLBACK_HEADLINER: {
    key: 'marquee', cardTier: 'Headliner', cardPhotoFile: 'silhouette-card-2.jpg', cardPos: 'center 0%', photoFile: 'silhouette-2.jpg', logoFile: '../brand/marquee-logo-white.png', logoH: 46, cardLogoH: 34,
    name: 'Your Marquee Headliner', first: 'Marquee', tier: 'Headliner', role: 'DJ & MC',
    phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
    calendly: { creative: '', final: '' }
  },

  // Client-friendly names for DJEP fee lines. A DJ's first name at the start of a line is dropped first,
  // then any exact match below is renamed. Lines not listed show as written in DJEP.
  LINE_NAMES: {
    'Wedding Talent Fee': 'Headliner Talent Fee',
    'Ceremony Package w/o Rehearsal': 'Ceremony Sound & Music',
    'Ceremony Package': 'Ceremony Sound & Music'
  },
  LINE_NAME_PREFIXES: ['Bob', 'Bradon', 'Dan', 'Daniel', 'James', 'Mike', 'Jake'],

  // Photo booth print design: when couples should send their template choice and wording.
  PRINT_DESIGN_DAYS_BEFORE: 30,
  // Link to the photo booth template examples (Bob's Dropbox) until the built-in designer exists. Empty = "coming soon" note.
  PRINT_TEMPLATES_URL: 'https://www.dropbox.com/scl/fo/1rra6vk7hbodugn516rx0/AO7yIynKPa7MJRA7tn5NjqY?rlkey=f28xl12sjfwbzvn5r2gnrtxkh&dl=0',

  // Photo booth events show this general Marquee contact instead of whoever is staffed on the booth.
  COMPANY_CONTACT: {
    key: 'marquee', name: 'Marquee Events', first: 'Bob', tier: 'Photo Booth Team', role: 'Questions about your booth?',
    note: 'Call or text Bob directly and we will take care of you.',
    phone: '330.432.0798', email: 'bob@marqueeohio.com', instagram: 'marqueeohio',
    logoFile: '../brand/marquee-logo-white.png', logoH: 46
  },

  // Add-on catalog: the approved 2027-2028 pricing (Marquee Pricing Export, Nov 2, 2026), items marked Portal = Yes.
  // match: a case-insensitive pattern for this item on a DJEP fee line, so already-booked items are hidden.
  // bobPrice: the price when Bob is the headliner.
  CATALOG: [
    { id: 'hour', cat: 'Event Add-Ons', name: 'Extra Hour', price: 300, bobPrice: 500, unit: 'hour', match: 'extra hour|additional hour', repeatable: true, sub: 'Keep the party going one more hour with your headliner.' },
    { id: 'half', cat: 'Event Add-Ons', name: 'Extra Half Hour', price: 150, bobPrice: 250, match: 'half hour', repeatable: true, sub: '30 more minutes with your headliner.' },
    { id: 'ceremony', cat: 'Event Add-Ons', name: 'Ceremony Sound & Music', price: 400, match: 'ceremony', sub: 'Ceremony sound, wireless mics and live-cued music. Works anywhere on the property.' },
    { id: 'second', cat: 'Event Add-Ons', name: 'Second Sound System', price: 300, match: 'second sound', sub: 'Separate sound for a second space, like dinner in another room.' },
    { id: 'cocktail', cat: 'Event Add-Ons', name: 'Cocktail Hour: Second Location', price: 300, match: 'cocktail hour', sub: 'Separate sound and setup so cocktail hour can happen in a different space.' },
    { id: 'speakers', cat: 'Event Add-Ons', name: 'Additional Speakers', price: 75, match: 'additional speaker', sub: 'Full, even sound for a large or split room.' },
    { id: 'floorlights', cat: 'Lighting & Visuals', name: 'Extra Dance Floor Lights (2nd Pair)', price: 350, match: '2nd pair|second pair|extra dance floor light', sub: 'A second pair of intelligent dance floor lights, for 4 total.' },
    { id: 'spots', cat: 'Lighting & Visuals', name: 'Moving Spot Lights', price: 350, unit: 'pair', match: 'moving spot', sub: 'Programmable moving lights on totems for beams and patterns across the room.' },
    { id: 'tubes', cat: 'Lighting & Visuals', name: 'LED Light Tubes', price: 400, match: 'light tubes|astera', sub: 'Wireless LED tubes for a modern, festival-style glow.' },
    { id: 'mono', cat: 'Lighting & Visuals', name: 'Monogram Projection', price: 300, match: 'monogram', sub: 'Your names and date in lights, on the wall or dance floor.' },
    { id: 'tv', cat: 'Lighting & Visuals', name: '65" TV Display', price: 300, unit: 'TV', match: 'tv display|65"', sub: 'A 65" screen on a stand for slideshows, videos or visuals.' },
    { id: 'ledbooth', cat: 'Lighting & Visuals', name: 'LED Video DJ Booth', price: 400, match: 'video dj booth', sub: 'Our LED mirror DJ booth with a built-in 65" screen for your monogram or visuals.' },
    { id: 'clouds', cat: 'Atmosphere & Effects', name: 'Dancing on the Clouds', price: 350, match: 'clouds', sub: 'A thick, low cloud rolls across the floor for your first dance.' },
    { id: 'spark', cat: 'Atmosphere & Effects', name: 'Sparkler Fountains', price: 400, unit: 'pair', match: 'sparkler', sub: 'For your grand entrance, first dance or Impact Moment. Built for indoor use.' },
    { id: 'co2', cat: 'Atmosphere & Effects', name: 'CO2 Jets', price: 400, unit: 'pair', match: 'co2 jet|cryo', sub: 'Lighted, floor-mounted CO2 jets that fire on the drop.' },
    { id: 'gatling', cat: 'Atmosphere & Effects', name: 'CO2 Gatling Cannon', price: 350, match: 'gatling|cool burst', sub: 'A rapid-fire LED CO2 cannon your headliner fires over the crowd.' },
    { id: 'snow', cat: 'Atmosphere & Effects', name: 'Snowfall Effect', price: 550, match: 'snow', sub: 'Soft falling snow for your first dance or special moment.' },
    { id: 'tank', cat: 'Atmosphere & Effects', name: 'Extra CO2 Tank', price: 175, match: 'co2 tank', repeatable: true, sub: 'An extra 50 lb tank for more blasts. Add to a cannon or jets.' },
    { id: 'foam', cat: 'Atmosphere & Effects', name: 'LED Foam Sticks', price: 275, match: 'foam', sub: 'Light-up foam sticks for the whole crowd at the biggest moment.' },
    { id: 'sax', cat: 'Live Musicians', name: 'Marquee Fusion: Saxy Rob', price: 1800, match: 'sax', sub: 'Live sax by Saxy Rob, played right over your DJ set. Ask about his availability.' },
    { id: 'wrap', cat: 'Dance Floor & Production', name: 'Custom Dance Floor Wrap', price: 4500, match: 'floor wrap', sub: 'Your monogram or artwork wrapped across the entire dance floor.' },
    { id: 'classic', cat: 'Photo Booths', name: 'The Classic', price: 795, match: 'classic photo booth|the classic(?! mirror)', booth: true, sub: 'Backdrop, props, unlimited prints and an attendant. Up to 3 hours.' },
    { id: 'roamer', cat: 'Photo Booths', name: 'The Roamer', price: 595, match: 'roamer', booth: true, sub: 'A booth that moves through your party. Photos sent by text or email.' },
    { id: 'pbguest', cat: 'Photo Booths', name: 'Photo Booth Guest Book', price: 150, match: 'guest book|scrapbook', booth: true, sub: 'Guests add a copy of their photo and a note to an album you keep.' },
    { id: 'pbhour', cat: 'Photo Booths', name: 'Extra Photo Booth Time', price: 100, unit: 'hour', match: 'hour: photo booth|hour for photo booth', booth: true, sub: 'Keep the booth going past the standard 3 hours.' }
  ],

  // Photo booth add-ons, shown under Total Investment on photo booth pages.
  BOOTH_ADDONS: [
    { id: 'bhour', name: 'Extra Hour', price: 100, unit: 'hour', repeatable: true, match: 'extra hour|additional (time|hour)', sub: 'One more hour of photo booth time.' },
    { id: 'bhalf', name: 'Extra Half Hour', price: 50, repeatable: true, match: 'half hour', sub: '30 more minutes of photo booth time.' },
    { id: 'bguest', name: 'Photo Booth Guest Book', price: 150, match: 'guest book|scrapbook', sub: 'Guests add a copy of their strip and a note to an album you keep.' },
    { id: 'b4x6', name: '4"x6" Single Print Upgrade', price: 125, match: '4\\s*"?\\s*x\\s*6|print upgrade', classicOnly: true, sub: 'Upgrade The Classic to 4"x6" single prints.' }
  ],

  // The "Couples Love These" picks: Bob's most requested wedding add-ons, in his order. All of them show; anything already booked is skipped.
  FEATURED: ['ceremony', 'clouds', 'mono', 'spark', 'co2', 'sax', 'floorlights', 'gatling', 'foam']
};
