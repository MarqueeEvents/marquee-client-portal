/* Local test harness: fake DJEP client pages built from the Teddi & Kevin test events (no real client data).
 * Run: node test/mock-server.js  then open http://localhost:8787/clients/home.asp
 */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const EVENTS = [
  { id: '435927', type: 'Classic Photo Booth', pkg: 'The Classic Photo Booth', lines: [['The Classic Photo Booth', 795], ['Photo Booth Scrapbook', 150]], total: 945, deposit: 236.25, staff: 'Photo Booth Attendant' },
  { id: '435926', type: 'Ceremony & Reception', pkg: 'Marquee Luxury', lines: [['Bob Wedding Talent Fee', 3500], ['Bob Additional Hour', 500], ['Ceremony Package w/o Rehearsal', 395], ['Dancing on the Clouds', 350], ['Animated Monogram Projection', 350]], total: 5095, deposit: 1273.75, staff: 'DJ Bob' }
];
const single = process.env.SINGLE === '1';
const NAME = 'Teddi Price & Kevin Garrity';
function shell(body) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Client Portal</title>
<link rel="stylesheet" href="/styles/portal.css"></head><body><div id="djep-page"><div id="djep-header">OLD HEADER</div><div id="djep-navbar"><a href="home.asp">Home</a> <a href="javascript:void(0)">Logout</a></div>
<div id="djep-content">${body}</div><div id="footer">old footer</div></div>
${['config', 'gate', 'util', 'djep-reader', 'model', 'requests', 'reels', 'shell', 'render-chooser', 'render-event', 'main'].map(f => `<script src="/src/${f}.js"></script>`).join('\n')}
<script>${process.env.TODAY ? `MQ.util.overrideToday='${process.env.TODAY}';` : ''}</script></body></html>`;
}
function eventBlock(e) {
  return `<div class="djep-singleeventdiv"><div class="hidden_event_information" style="display:none"><span class="primary_employee_id">43180</span><span class="event_date_${e.id}">12/30/2028</span><span class="event_name_${e.id}">${NAME} ${e.type}</span><span class="event_status_${e.id}">Booked</span></div>
Event Type: ${e.type}<br>Package: ${e.pkg}<br><a class="djep-planeventbutton" href="planmyevent.asp?eventid=${e.id}">Plan</a><a class="djep-eventdetailsbutton" href="eventdetails.asp?eventid=${e.id}">Details</a><a class="djep-paymentbutton" href="makeapayment.asp?action=choose_payment_gateway&eventid=${e.id}">Pay</a></div>`;
}
function details(e) {
  return `<div class="djep-eventdatetimesbox">Event Date: 12/30/2028<br>Start Time: 5:00 PM<br>End Time: 11:00 PM</div>
<div class="djep-eventdescriptionbox">Event ID: ${e.id}<br>Event Name: ${NAME} ${e.type}<br>Event Type: ${e.type}<br>Booking Status: Booked</div>
<div class="djep-venueinfobox"><b>Venue Information</b><br>Bella Amore<br>New Philadelphia, OH</div>
<div class="djep-staffingbox"><b>Staffing</b><br>${e.staff}<br>Attire: Formal</div>
<div class="djep-feedetailsbox"><table>${e.lines.map(l => `<tr><td>${l[0]}</td><td>$${l[1].toFixed(2)}</td></tr>`).join('')}</table></div>
<div class="djep-totalfeebox">TOTAL FEE: $${e.total.toFixed(2)}<br>DEPOSIT: $${e.deposit.toFixed(2)}<br>Payments: $0.00<br>BALANCE DUE: $${e.total.toFixed(2)}</div>`;
}
const types = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const id = u.searchParams.get('eventid');
  const ev = EVENTS.find(e => e.id === id);
  const evs = single ? [EVENTS[1]] : EVENTS;
  if (/\/clients\/(home|events)\.asp$/.test(u.pathname)) return res.end(shell(`<div class="djep-eventlistbox">${evs.map(eventBlock).join('')}</div><div class="djep-latestemailsbox"><p class="djep-titlebarsmall">Latest Emails</p><div>No Emails Found</div></div>`));
  if (u.pathname === '/clients/eventdetails.asp' && ev) return res.end(shell(details(ev)));
  if (u.pathname === '/clients/requestchanges.asp') return res.end(shell(`<form method="post" action="requestchanges.asp?eventid=${id}"><input type="hidden" name="eventid" value="${id}"><textarea name="request_change_comments"></textarea><input type="submit" name="submit_other" value="Submit"></form>`));
  if (u.pathname === '/clients/makeapayment.asp') return res.end(shell(`<div class="djep-titlebar">Make a Payment</div><div class="djep-paymentbox">Choose a payment method<br><input type="submit" value="Pay with Card"></div>`));
  const f = path.join(ROOT, u.pathname);
  if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) { res.setHeader('content-type', types[path.extname(f)] || 'text/plain'); return fs.createReadStream(f).pipe(res); }
  res.statusCode = 404; res.end('not found');
}).listen(process.env.PORT || 8787, () => console.log('mock DJEP on', process.env.PORT || 8787));
