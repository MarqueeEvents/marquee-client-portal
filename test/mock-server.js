/* Local test harness: fake DJEP client pages built from the Teddi & Kevin test events (no real client data).
 * Run: node test/mock-server.js  then open http://localhost:8787/clients/home.asp
 */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const EVENTS = [
  { id: '435927', type: 'Private Photo Booth Rental', nameType: 'Classic Photo Booth', pkg: 'The Classic Photo Booth', lines: [['The Classic Photo Booth', 795], ['Photo Booth Scrapbook', 150]], total: 945, deposit: 236.25, staff: 'Photo Booth Attendant', service: 'The Classic Photo Booth', desc: ['Unlimited Prints', 'Digital Gallery', 'Custom Print Design'] },
  { id: '435926', type: 'Wedding', nameType: 'Ceremony & Reception', pkg: 'Marquee Luxury', lines: [['Bob Wedding Talent Fee', 3500], ['Bob Additional Hour', 500], ['Ceremony Package w/o Rehearsal', 395], ['Dancing on the Clouds', 350], ['Animated Monogram Projection', 350]], total: 5095, deposit: 1273.75, staff: 'DJ Bob', service: 'Marquee Talent Fee', desc: ['Bob Wedding DJ Talent Fee', 'Up to 5 Hour Reception', 'Full Room Uplighting', '1pr. Intelligent Dancefloor Lighting'] }
];
const single = process.env.SINGLE === '1';
const NAME = 'Teddi Price & Kevin Garrity';
function shell(body) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Client Portal</title>
<link rel="stylesheet" href="/styles/portal.css"></head><body><div id="djep-page"><div id="djep-header">OLD HEADER</div><div id="djep-navbar"><a href="home.asp">Home</a> <a href="javascript:void(0)">Logout</a></div>
<div id="djep-content">${body}</div><div id="footer">old footer</div></div>
${['config', 'gate', 'util', 'djep-reader', 'model', 'requests', 'reels', 'skin', 'shell', 'render-chooser', 'render-event', 'render-details', 'main'].map(f => `<script src="/src/${f}.js"></script>`).join('\n')}
<script>${process.env.TODAY ? `MQ.util.overrideToday='${process.env.TODAY}';` : ''}</script></body></html>`;
}
function eventBlock(e, emp) {
  return `<div class="djep-singleeventdiv"><div class="hidden_event_information" style="display:none"><span class="primary_employee_id">${emp || '43180'}</span><span class="event_date_${e.id}">12/30/2028</span><span class="event_name_${e.id}">${NAME} ${e.nameType}</span><span class="event_status_${e.id}">Booked</span></div>
Event Type: ${e.type}<br>Package: ${e.pkg}<br><a class="djep-planeventbutton" href="planmyevent.asp?eventid=${e.id}">Plan</a><a class="djep-eventdetailsbutton" href="eventdetails.asp?eventid=${e.id}">Details</a><a class="djep-paymentbutton" href="makeapayment.asp?action=choose_payment_gateway&eventid=${e.id}">Pay</a></div>`;
}
function details(e) {
  const tb = t => `<p class="djep-titlebarsmall"><span class="djep-titlebarsmallspan"></span>${t}</p>`;
  const paid = process.env.PAID ? Number(process.env.PAID) : 0;
  const pkg = e.lines[0], add = e.lines.slice(1);
  return `<h2 class="djep-h2">Event Details<a class="djep-planeventbutton djep-changebutton" href="planmyevent.asp?eventid=${e.id}">Plan My<br>Event</a></h2>
<div class="djep-eventdatetimesbox">${tb('EVENT DATE / TIMES')}<table><tr><td>Event Date:</td><td>Saturday, December 30, 2028</td></tr><tr><td>Setup Time:</td><td></td></tr><tr><td>Start Time:</td><td>3:00 PM</td></tr><tr><td>End Time:</td><td>10:00 PM</td></tr></table></div>
<div class="djep-eventdescriptionbox">${tb('EVENT DESCRIPTION')}<table><tr><td>Event Name:</td><td>${NAME} ${e.nameType}</td></tr><tr><td>Event Type:</td><td>${e.type}</td></tr><tr><td>Booking Status:</td><td>Booked</td></tr><tr><td>Event ID:</td><td>${e.id}</td></tr></table></div>
<div class="djep-servicedetailsbox">${tb('SERVICE DETAILS')}<table><tr><td><fieldset class="djep-servicedetailsfieldset"><legend class="djep-servicedetailslegend">Service</legend>${e.service}</fieldset></td></tr>
<tr><td><fieldset class="djep-servicedetailsfieldset"><legend class="djep-servicedetailslegend">Description</legend>${e.desc.join('<br>')}</fieldset></td></tr>
<tr><td><fieldset class="djep-servicedetailsfieldset"><legend class="djep-servicedetailslegend">Addons</legend>${add.map(l => l[0]).join(', ')}</fieldset></td></tr></table></div>
<div class="djep-venueinfobox">${tb('VENUE INFORMATION')}Bella Amore<br>New Philadelphia, OH<br></div>
<div class="djep-staffingbox">${tb('STAFFING')}${e.staff}<br>Attire: Formal</div>
<div class="djep-paymentsfinancesbox"><p class="djep-titlebar">PAYMENTS AND FINANCES</p><div class="djep_innerboxtext">Below you will find your event fees, a breakdown of the fees and your payment history.</div></div>
<div class="djep-feedetailsbox">${tb('FEE DETAILS')}<table><tr><td><u>Description</u></td><td><u>Price</u></td></tr><tr><td><b>Package</b></td><td></td></tr><tr><td>${pkg[0]}</td><td>$${pkg[1].toFixed(2)}</td></tr>${add.length ? '<tr><td><b>Addons</b></td><td></td></tr>' + add.map(l => `<tr><td>${l[0]}</td><td>$${l[1].toFixed(2)}</td></tr>`).join('') : ''}</table></div>
<div class="djep-paymenthistorybox">${tb('PAYMENT HISTORY')}${paid ? `<table><tr><td>Date</td><td>Method</td><td>Amount</td></tr><tr><td>10/12/2026</td><td>Venmo</td><td>$${paid.toFixed(2)}</td></tr></table>` : '<div>No Payments Received</div>'}<div><a class="djep-paymentbutton" href="makeapayment.asp?action=choose_payment_gateway&eventid=${e.id}">Make a<br>Payment</a></div></div>
<div class="djep-totalfeebox">${tb('TOTALS')}<table><tr><td>Package And Addons:</td><td>$${e.total.toFixed(2)}</td></tr><tr><td>Subtotal:</td><td>$${e.total.toFixed(2)}</td></tr><tr><td><b>TOTAL FEE:</b></td><td>$${e.total.toFixed(2)}</td></tr><tr><td>DEPOSIT:</td><td>$${e.deposit.toFixed(2)}</td></tr><tr><td>Payments:</td><td>$${paid.toFixed(2)}</td></tr><tr><td><b>BALANCE DUE:</b></td><td>$${(e.total - paid).toFixed(2)}</td></tr></table></div>
<div class="djep-documentsbox">${tb('DOCUMENTS')}</div>
<div class="djep-requestchangesbox"><p class="djep-titlebar"><span class="djep-titlebarspan"></span>REQUEST CHANGES</p><div class="djep_innerboxtext"><p>Please ensure the event details above are correct, should you need to make a change you can click on Request Changes to submit a revision.</p><p class="djep-actionbuttonparagraph"><a class="djep-actionbutton" href="requestchanges.asp?eventid=${e.id}">Request Changes</a></p></div></div>`;
}
const types = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const id = u.searchParams.get('eventid');
  const ev = EVENTS.find(e => e.id === id);
  const evs = single ? [EVENTS[1]] : EVENTS;
  if (/\/clients\/(home|events)\.asp$/.test(u.pathname)) return res.end(shell(`<div class="djep-eventlistbox">${evs.map(e => eventBlock(e, u.searchParams.get('emp'))).join('')}</div><div class="djep-latestemailsbox"><p class="djep-titlebarsmall">Latest Emails</p><div>No Emails Found</div></div>`));
  if (u.pathname === '/clients/eventdetails.asp' && ev) return res.end(shell(details(ev)));
  if (u.pathname === '/clients/requestchanges.asp') return res.end(shell(`<form method="post" action="requestchanges.asp?eventid=${id}"><input type="hidden" name="eventid" value="${id}"><textarea name="request_change_comments"></textarea><input type="submit" name="submit_other" value="Submit"></form>`));
  if (u.pathname === '/clients/makeapayment.asp') return res.end(shell(`<div class="djep-titlebar">Make a Payment</div><div class="djep-paymentbox">Choose a payment method<br><input type="submit" value="Pay with Card"></div>`));
  const f = path.join(ROOT, u.pathname);
  if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) { res.setHeader('content-type', types[path.extname(f)] || 'text/plain'); return fs.createReadStream(f).pipe(res); }
  res.statusCode = 404; res.end('not found');
}).listen(process.env.PORT || 8787, () => console.log('mock DJEP on', process.env.PORT || 8787));
