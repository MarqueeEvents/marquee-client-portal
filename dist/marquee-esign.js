/* Marquee e-sign skin. Built 2026-11-27T17:09Z. Source: src/esign.js */
/* Marquee e-signature page skin (DJEP esign.asp).
 * Loaded from DJEP > Website Tools > Styling Options > Custom Scripting, which DJEP also prints on
 * its public request / availability pages, so this does nothing unless it is on esign.asp.
 * The real DJEP form, fields and Submit button are kept and moved into the new layout, so signing
 * works exactly as before. Approved render: Nov 27, 2026.
 */
(function () {
  if (!/\/esign\.asp/i.test(location.pathname)) return;

  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/dist\/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/MarqueeEvents/marquee-client-portal@main/';
  })();
  var LOGO = BASE + 'assets/brand/marquee-logo-white.png';

  var CSS = [
    ':root{--es-ink:#08080A;--es-panel:#111115;--es-pn:#1A0D14;--es-pink:#FF2E88;--es-pink-hot:#FF4F9B;--es-fg:#F4F5F7;--es-body:#C9C9D2;--es-muted:#A3A3AF;--es-line:rgba(255,255,255,.12);',
    '--es-display:"Inter Tight","Arial Black",Arial,sans-serif;--es-sans:"Inter",Arial,Helvetica,sans-serif;--es-serif:"Lora",Georgia,serif}',
    'html.mq-es,html.mq-es body{background:var(--es-ink)!important;color:var(--es-body)!important;font-family:var(--es-sans)!important;margin:0}',
    'html.mq-es body{background:radial-gradient(900px 420px at 50% -120px,rgba(255,46,136,.22),transparent 70%),var(--es-ink)!important}',
    'html.mq-es body>br,html.mq-es #logo_p{display:none!important}',
    '.mq-es-top{display:flex;align-items:center;justify-content:space-between;padding:22px 40px;border-bottom:1px solid var(--es-line);background:rgba(8,8,10,.78);position:sticky;top:0;z-index:20;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}',
    '.mq-es-top img{height:40px;width:auto;display:block}',
    '.mq-es-secure{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.22em;color:var(--es-muted);text-transform:uppercase}.mq-es-secure svg{color:var(--es-pink)}',
    'html.mq-es form[name=djep_form]{max-width:1180px;margin:0 auto;padding:46px 40px 60px;box-sizing:border-box}',
    'html.mq-es .newpages{max-width:none!important;margin:0!important;padding:0!important;background:none!important}',
    '.mq-es-eyebrow{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:700;letter-spacing:.3em;color:var(--es-pink);text-transform:uppercase}',
    '.mq-es-eyebrow:before{content:"";width:32px;height:2px;background:var(--es-pink)}',
    '.mq-es-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:end}',
    '.mq-es-hero h1{font-family:var(--es-display);font-weight:900;font-size:64px;line-height:.92;letter-spacing:-.01em;margin:16px 0 0;color:var(--es-fg);text-transform:uppercase}',
    '.mq-es-acc{font-family:var(--es-serif);font-style:italic;color:var(--es-pink);font-size:30px;margin-top:8px}',
    '.mq-es-intro{max-width:560px;margin:18px 0 0;font-size:16px;line-height:26px;color:var(--es-body)}',
    '.mq-es-facts{background:var(--es-panel);border:1px solid var(--es-line);border-radius:18px;padding:22px 24px;display:grid;grid-template-columns:1fr 1fr;gap:16px 20px}',
    '.mq-es-facts span{display:block;font-size:10px;font-weight:700;letter-spacing:.24em;color:var(--es-pink);text-transform:uppercase;margin-bottom:5px}',
    '.mq-es-facts b{color:var(--es-fg);font-size:15px;font-weight:600}',
    '.mq-es-steps{display:flex;gap:10px;margin:34px 0 26px}',
    '.mq-es-step{flex:1;display:flex;align-items:center;gap:12px;padding:14px 18px;border:1px solid var(--es-line);border-radius:14px;background:var(--es-panel)}',
    '.mq-es-step i{font-style:normal;flex:0 0 30px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:13px;border:1px solid var(--es-line);color:var(--es-muted)}',
    '.mq-es-step b{display:block;color:var(--es-fg);font-size:14px}.mq-es-step small{color:var(--es-muted);font-size:12px}',
    '.mq-es-step.on{border-color:var(--es-pink);background:var(--es-pn)}.mq-es-step.on i{background:var(--es-pink);border-color:var(--es-pink);color:#fff;box-shadow:0 0 22px rgba(255,46,136,.5)}',
    '.mq-es-grid{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:26px;align-items:start}',
    /* Document card (DJEP's first .divtable) */
    'html.mq-es .mq-es-doc{background:var(--es-panel)!important;border:1px solid var(--es-line)!important;border-radius:18px!important;overflow:hidden;margin:0!important}',
    'html.mq-es .mq-es-doc>.divheader{display:flex;flex-direction:row-reverse;justify-content:space-between;align-items:center;background:transparent!important;color:var(--es-fg)!important;font-family:var(--es-sans)!important;font-size:14px!important;font-weight:700!important;padding:16px 20px!important;border-bottom:1px solid var(--es-line)!important}',
    'html.mq-es .mq-es-doc>.divheader .metro-button-small{float:none!important;margin:0!important;background:transparent!important;border:1px solid var(--es-line)!important;border-radius:10px!important;color:var(--es-fg)!important;font:800 11px/1 var(--es-sans)!important;letter-spacing:.18em!important;padding:11px 14px!important;text-transform:uppercase;cursor:pointer}',
    'html.mq-es .mq-es-doc>.divheader .metro-button-small:hover{border-color:var(--es-pink)!important}',
    'html.mq-es .mq-es-doc>.divcell{background:#0d0d10!important;padding:22px!important;border:0!important;max-height:820px;overflow:auto}',
    'html.mq-es .mq-es-doc>.divcell>div{border-radius:6px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5)}',
    '.mq-es-hint{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;color:var(--es-muted);font-size:12px;border-top:1px solid var(--es-line)}',
    /* Signing panel (DJEP's second .divtable) */
    'html.mq-es .mq-es-sign{position:sticky;top:110px;background:var(--es-pn)!important;border:1px solid var(--es-pink)!important;border-radius:18px!important;padding:26px!important;box-shadow:0 0 40px rgba(255,46,136,.12);margin:0!important}',
    'html.mq-es .mq-es-sign>.divheader{display:none!important}',
    'html.mq-es .mq-es-sign>.divcell{background:transparent!important;border:0!important;padding:0!important}',
    '.mq-es-sign h2{font-family:var(--es-display);font-weight:900;color:var(--es-fg);font-size:28px;line-height:.95;text-transform:uppercase;margin:12px 0 4px}',
    '.mq-es-sign .mq-es-acc{font-size:20px;margin:0 0 6px}',
    'html.mq-es .mq-es-sign .metro-table,html.mq-es .mq-es-sign .col-xs-12,html.mq-es .mq-es-sign .col-md-6{width:100%!important;float:none!important;padding:0!important;margin:0!important;display:block}',
    'html.mq-es .mq-es-sign .margin-all-3{margin:0!important}',
    'html.mq-es .mq-es-sign .metro-label{float:none!important;width:auto!important;display:block;font-size:10px!important;font-weight:700;letter-spacing:.22em;color:var(--es-muted)!important;text-transform:uppercase;margin:14px 0 7px;padding:0!important}',
    'html.mq-es .mq-es-sign input[type=text]{width:100%!important;max-width:none!important;box-sizing:border-box;background:var(--es-ink)!important;border:1px solid var(--es-line)!important;border-radius:12px!important;padding:13px 14px!important;height:auto!important;color:var(--es-fg)!important;font:400 15px var(--es-sans)!important;outline:none}',
    'html.mq-es .mq-es-sign input[type=text]:focus{border-color:var(--es-pink)!important;box-shadow:0 0 0 3px rgba(255,46,136,.18)}',
    'html.mq-es .mq-es-sign input[type=text]::placeholder{color:#6f6f7a}',
    '.mq-es-sig{margin-top:14px;padding:14px;border:1px dashed rgba(255,46,136,.5);border-radius:12px;text-align:center}',
    '.mq-es-sig small{display:block;font-size:10px;letter-spacing:.22em;color:var(--es-muted);text-transform:uppercase;margin-bottom:6px}',
    '.mq-es-sig div{font-family:var(--es-serif);font-style:italic;font-size:26px;color:var(--es-fg);min-height:34px}',
    'html.mq-es .mq-es-sign .padding-all-10{padding:0!important;margin:18px 0!important}',
    'html.mq-es .mq-es-sign label{display:flex!important;gap:12px;align-items:flex-start;cursor:pointer}',
    'html.mq-es .mq-es-sign label .col-xs-1,html.mq-es .mq-es-sign label .col-xs-11{width:auto!important;float:none!important;padding:0!important}',
    'html.mq-es .mq-es-sign label i{font-style:normal;font-size:13px;line-height:20px;color:var(--es-body)}',
    'html.mq-es .mq-es-sign input[type=checkbox]{accent-color:#FF2E88;width:20px!important;height:20px!important;margin:0!important}',
    'html.mq-es .mq-es-sign p[align=center]{margin:0}',
    'html.mq-es #submitbutton{display:block;width:100%;background:var(--es-pink)!important;color:#fff!important;border:0!important;border-radius:12px!important;padding:17px!important;font:800 13px var(--es-sans)!important;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 34px rgba(255,46,136,.45);-webkit-appearance:none;appearance:none}',
    'html.mq-es #submitbutton:hover{background:var(--es-pink-hot)!important}',
    '.mq-es-fine{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--es-muted);margin-top:14px;line-height:18px}',
    '.mq-es-help{margin-top:16px;padding:18px 20px;background:var(--es-panel);border:1px solid var(--es-line);border-radius:18px;font-size:13px;line-height:20px;color:var(--es-body)}',
    '.mq-es-help b{color:var(--es-fg)}.mq-es-help a{color:var(--es-pink);text-decoration:none;font-weight:600}',
    '.mq-es-foot{text-align:center;padding:30px 20px 40px;border-top:1px solid var(--es-line);font-size:10px;letter-spacing:.3em;color:var(--es-muted);text-transform:uppercase}',
    '.mq-es-foot img{height:26px;display:block;margin:0 auto 12px;opacity:.85}',
    '@media (max-width:860px){.mq-es-top{padding:16px}.mq-es-top img{height:30px}.mq-es-secure span{display:none}',
    'html.mq-es form[name=djep_form]{padding:30px 16px 40px}.mq-es-hero,.mq-es-grid{grid-template-columns:1fr}.mq-es-hero h1{font-size:44px}.mq-es-acc{font-size:24px}',
    '.mq-es-steps{gap:6px}.mq-es-step{padding:10px;flex-direction:column;text-align:center;gap:6px}.mq-es-step small{display:none}.mq-es-step b{font-size:12px}',
    'html.mq-es .mq-es-doc>.divcell{padding:10px!important;max-height:560px}html.mq-es .mq-es-sign{position:static}}'
  ].join('\n');

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var LOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  var SHIELD = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF2E88" stroke-width="2.4" style="flex:0 0 14px;margin-top:2px"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>';
  var DOWN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';

  /* "Label<TAB>Value" rows from the document (Marquee contract layout). */
  function field(text, label) {
    var m = new RegExp('(^|\\n)\\s*' + label + '\\s*\\t\\s*([^\\n\\t]+)', 'i').exec(text);
    return m ? m[2].trim() : '';
  }
  function couple(name) {
    if (!name) return '';
    var parts = name.split(/\s+(?:&|and)\s+/i);
    if (parts.length === 2) return parts[0].split(/\s+/)[0] + ' & ' + parts[1].split(/\s+/)[0];
    return name;
  }
  function shortDate(s) {
    var d = new Date(s);
    if (isNaN(d)) return s;
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  function fillFacts(box) {
    var f = document.getElementById('main_iframe_id');
    var doc; try { doc = f && f.contentDocument; } catch (e) { doc = null; }
    var text = doc && doc.body ? doc.body.innerText : '';
    if (!text) return false;
    var items = [
      ['Couple', couple(field(text, 'Event For'))],
      ['Date', shortDate(field(text, 'Event Date'))],
      ['Venue', field(text, 'Venue')],
      ['Your Headliner', field(text, 'Your Headliner')]
    ].filter(function (x) { return x[1]; });
    if (items.length < 2) return false;
    box.innerHTML = items.map(function (x) { return '<div><span>' + x[0] + '</span><b>' + esc(x[1]) + '</b></div>'; }).join('');
    box.style.display = '';
    return true;
  }

  function start() {
    var form = document.querySelector('form[name=djep_form]');
    var tables = form ? form.querySelectorAll('.newpages > .divtable') : [];
    var name = form && form.querySelector('input[name=esign_full_name]');
    if (!form || tables.length < 1) return;
    var html = document.documentElement;

    /* DJEP's page has no viewport tag, so phones show it zoomed out. */
    if (!document.querySelector('meta[name=viewport]')) { var vp = el('meta'); vp.name = 'viewport'; vp.content = 'width=device-width, initial-scale=1'; document.head.appendChild(vp); }
    var fonts = el('link'); fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@1,400;1,500&display=swap';
    document.head.appendChild(fonts);
    var st = el('style'); st.textContent = CSS; document.head.appendChild(st);
    html.classList.add('mq-es');

    var docBox = tables[0], signBox = name ? name.closest('.divtable') : null;
    var head = docBox.querySelector('.divheader');
    var docName = head ? Array.prototype.filter.call(head.childNodes, function (n) { return n.nodeType === 3; }).map(function (n) { return n.textContent; }).join('').trim() : '';
    var isContract = /contract|agreement/i.test(docName) && !/cancel|terminat/i.test(docName);
    if (!docName) docName = 'Your Document';

    /* Top bar and footer */
    var top = el('div', 'mq-es-top', '<img src="' + LOGO + '" alt="Marquee Events"><div class="mq-es-secure">' + LOCK + '<span>Secure Document Signing</span></div>');
    document.body.insertBefore(top, document.body.firstChild);
    document.body.appendChild(el('div', 'mq-es-foot', '<img src="' + LOGO + '" alt="">Marquee Events &middot; New Philadelphia, Ohio'));

    var pages = form.querySelector('.newpages');
    var hero = el('div', 'mq-es-hero',
      '<div><div class="mq-es-eyebrow">' + esc(isContract ? 'Your Marquee Agreement' : docName) + '</div>' +
      '<h1>Review &amp; Sign.</h1><div class="mq-es-acc">' + (isContract ? 'your night, locked in.' : 'your night, by design.') + '</div>' +
      '<p class="mq-es-intro">' + (signBox ? 'Read through your ' + (isContract ? 'agreement' : 'document') + ' below. When everything looks right, add your signature' +
        (isContract ? ' and your date is officially on our calendar.' : ' and send it back to us.') : 'This document has already been signed. Thank you!') + '</p></div>');
    var facts = el('div', 'mq-es-facts'); facts.style.display = 'none';
    hero.appendChild(facts);
    var steps = el('div', 'mq-es-steps',
      '<div class="mq-es-step on"><i>1</i><div><b>Review</b><small>Read your ' + (isContract ? 'agreement' : 'document') + '</small></div></div>' +
      '<div class="mq-es-step' + (signBox ? ' on' : ' on') + '"><i>2</i><div><b>Sign</b><small>Type your name, agree</small></div></div>' +
      '<div class="mq-es-step' + (signBox ? '' : ' on') + '"><i>3</i><div><b>' + (isContract ? 'Locked In' : 'All Set') + '</b><small>' + (isContract ? 'Your date is on our calendar' : 'We take it from here') + '</small></div></div>');

    var grid = el('div', 'mq-es-grid');
    var left = el('div'), right = el('div');
    pages.insertBefore(hero, pages.firstChild);
    pages.insertBefore(steps, hero.nextSibling);
    pages.insertBefore(grid, steps.nextSibling);
    grid.appendChild(left);
    docBox.classList.add('mq-es-doc');
    left.appendChild(docBox);
    docBox.appendChild(el('div', 'mq-es-hint', DOWN + 'Scroll to read the full ' + (isContract ? 'agreement' : 'document')));

    if (signBox) {
      grid.appendChild(right);
      signBox.classList.add('mq-es-sign');
      right.appendChild(signBox);
      var cell = signBox.querySelector('.divcell');
      cell.insertBefore(el('div', null, '<div class="mq-es-eyebrow">Electronic Signature</div><h2>' + (isContract ? 'Lock In Your Date' : 'Sign Document') + '</h2>' +
        '<div class="mq-es-acc">one signature away.</div>'), cell.firstChild);
      /* Shorter labels and placeholders */
      Array.prototype.forEach.call(signBox.querySelectorAll('.metro-label'), function (l) {
        l.textContent = { 'Your Name': 'Your Full Name', 'Telephone': 'Phone' }[l.textContent.trim()] || l.textContent;
      });
      var ph = { esign_full_name: 'Your full name', esign_email: 'you@email.com', esign_telephone: '(330) 555-0123' };
      Object.keys(ph).forEach(function (k) { var i = signBox.querySelector('input[name=' + k + ']'); if (i) i.placeholder = ph[k]; });
      /* Live signature preview under the fields */
      var sig = el('div', 'mq-es-sig', '<small>Your signature</small><div></div>');
      var tel = signBox.querySelector('input[name=esign_telephone]');
      var after = (tel || name).closest('.col-xs-12');
      after.parentNode.insertBefore(sig, after.nextSibling);
      var show = function () { sig.lastChild.textContent = name.value; };
      name.addEventListener('input', show); show();
      var agree = signBox.querySelector('input[name=esign_agreement_checkbox]');
      var agreeText = agree && agree.closest('label') && agree.closest('label').querySelector('i');
      if (agreeText) agreeText.textContent = "I agree to the terms in the " + (isContract ? 'agreement' : 'document') + " above. I understand I'm entering a binding contract.";
      var btn = document.getElementById('submitbutton');
      if (btn) {
        btn.value = isContract ? 'Sign & Lock In My Date' : 'Sign & Submit';
        btn.parentNode.parentNode.insertBefore(el('div', 'mq-es-fine', SHIELD + '<span>Secure e-signature. Your signature, email and the time you signed are recorded with this document.</span>'), btn.parentNode.nextSibling);
      }
      right.appendChild(el('div', 'mq-es-help', '<b>Questions before you sign?</b><br>Text Bob at <a href="sms:+13304003003">330-400-3003</a> or email <a href="mailto:bob@marqueeohio.com">bob@marqueeohio.com</a>. Happy to walk through anything.'));
    } else {
      grid.style.gridTemplateColumns = '1fr';
    }

    var tries = 0;
    (function waitFacts() { if (fillFacts(facts) || ++tries > 20) return; setTimeout(waitFacts, 300); })();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
