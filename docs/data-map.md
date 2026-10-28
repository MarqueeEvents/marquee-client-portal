# DJEP Client Portal Data Map

Mapped Oct 28, 2026 from test client Teddi Price & Kevin Garrity (DJ wedding + separate Classic Photo Booth event, Dec 30, 2028). Read only.

## Pages
| Page | Address | What it has |
|---|---|---|
| Home | /clients/home.asp | One `.djep-singleeventdiv` block per upcoming event, countdown, latest emails, meetings |
| My Events | /clients/events.asp | Upcoming and past event blocks |
| Event Details | /clients/eventdetails.asp?eventid=ID | Full details for one event |
| Make a Payment | /clients/makeapayment.asp?...eventid=ID | Per-event payment (Square +3.5%, Venmo, Cash App) |
| Request Changes | /clients/requestchanges.asp?eventid=ID | Four forms; "something else" posts `request_change_comments` |
| Plan My Event | /clients/planmyevent.asp?eventid=ID | DJEP planner (we link to Vibo instead) |

## Event block (home, events)
`.hidden_event_information` contains `.primary_employee_id`, `.event_date_ID`, `.event_name_ID`, `.event_status_ID`. Visible text has `Event Type:` and `Package:`. Buttons: `a.djep-planeventbutton`, `a.djep-eventdetailsbutton`, `a.djep-paymentbutton`.

## Event Details boxes
`.djep-eventdatetimesbox`, `.djep-eventdescriptionbox`, `.djep-servicedetailsbox`, `.djep-venueinfobox`, `.djep-staffingbox`, `.djep-feedetailsbox` (package and add-on rows with prices), `.djep-paymenthistorybox`, `.djep-totalfeebox` (TOTAL FEE, DEPOSIT, Payments, BALANCE DUE), `.djep-documentsbox`, `.djep-requestchangesbox`.

## Verified reader output (Teddi & Kevin)
- Wedding 435926: Bob Wedding Talent Fee $3,500, Bob Additional Hour $500, Ceremony Package w/o Rehearsal $395, Dancing on the Clouds $350, Animated Monogram Projection $350. Total $5,095, deposit $1,273.75, balance $5,095. Venue "Bella Amore, New Philadelphia, OH". Staff "DJ Bob". Employee ID 43180.
- Photo booth 435927: The Classic Photo Booth $795, Photo Booth Scrapbook $150. Total $945.

## Other DJEP date fields (not yet on client pages)
Date Booked, Scheduled Payment #2, Scheduled Payment #3, Custom Event Dates 1 to 4. To try via merge tags in the Custom Scripting box.

## Open questions
- Merge tags available in Custom Scripting (Date Booked, scheduled payments, employee custom fields)
- Employee IDs for Bradon, Dan, James
- Single-event view (Tony & Liana)
