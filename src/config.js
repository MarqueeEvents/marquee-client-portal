/* Marquee Client Portal configuration.
 * Everything Bob may want to change lives here.
 */
window.MQ = window.MQ || {};

MQ.config = {
  // SAFETY SWITCH. false = new design only for TEST_CLIENTS below. true = everyone.
  LIVE_FOR_EVERYONE: false,

  // Test clients (matched against event names on the page). Add more as needed.
  TEST_CLIENTS: ['Teddi Price', 'Kevin Garrity', 'Tony', 'Liana'],

  // Anyone can preview by visiting a portal page once with ?mqpreview=on (and ?mqpreview=off to stop).
  PREVIEW_PARAM: 'mqpreview',

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
      key: 'bob', name: 'Bob Hickman', first: 'Bob', tier: 'Marquee Luxury', role: 'Owner, Lead DJ & MC',
      photo: '', logo: '', phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    },
    'BRADON_ID': {
      key: 'bradon', name: 'Bradon Smith', first: 'Bradon', tier: 'Executive Headliner', role: 'Lead DJ & MC',
      photo: '', logo: '', phone: '330.432.4143', email: 'bradon@marqueeohio.com', instagram: 'dj_bradon',
      calendly: { creative: '', final: '' }
    },
    'DAN_ID': {
      key: 'dan', name: 'Daniel Sanatore', first: 'Dan', tier: 'Headliner', role: 'Lead DJ & MC',
      photo: '', logo: '', phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    },
    'JAMES_ID': {
      key: 'james', name: 'James Stevenson', first: 'James', tier: 'Headliner', role: 'Lead DJ & MC',
      photo: '', logo: '', phone: '', email: '', instagram: '',
      calendly: { creative: '', final: '' }
    }
  },

  // Add-on catalog (2027-2028 wedding guide pricing). TODO: replace with Bob's final options and pricing document.
  CATALOG: [
    { id: 'clouds', cat: 'Atmosphere & Effects', name: 'Dancing on the Clouds', price: 350 },
    { id: 'spark', cat: 'Atmosphere & Effects', name: 'Sparkler Fountains', price: 395, unit: '/pr' },
    { id: 'co2', cat: 'Atmosphere & Effects', name: 'CO2 Cryo Jets', price: 450, unit: '/pr' },
    { id: 'coolburst', cat: 'Atmosphere & Effects', name: 'Cool Burst LED CO2 Gun', price: 350 },
    { id: 'snow', cat: 'Atmosphere & Effects', name: 'Snow Machine', price: 550 },
    { id: 'foam', cat: 'Atmosphere & Effects', name: 'LED Foam Party Favors', price: 275 },
    { id: 'astera', cat: 'Lighting & Visuals', name: 'Astera LED Light Tubes', price: 400 },
    { id: 'mono', cat: 'Lighting & Visuals', name: 'Standard Monogram Projection', price: 300 },
    { id: 'amono', cat: 'Lighting & Visuals', name: 'Animated Monogram Projection', price: 350 },
    { id: 'classic', cat: 'Photo Booths', name: 'Classic Photo Booth', price: 795 },
    { id: 'roamer', cat: 'Photo Booths', name: 'Roamer Photo Booth', price: 595 },
    { id: 'scrap', cat: 'Photo Booths', name: 'Keepsake Scrapbook', price: 150 },
    { id: 'sax', cat: 'Live Music', name: 'Saxy Rob', price: 1800 },
    { id: 'ceremony', cat: 'Ceremony & More Time', name: 'Ceremony Package', price: 400 }
  ]
};
