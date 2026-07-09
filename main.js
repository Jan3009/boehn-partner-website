document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  var toggle = document.querySelector('.nav-toggle');

  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    header.querySelectorAll('nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  var CONSENT_KEY = 'bp-cookie-consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
  }

  function applyConsent(consent) {
    if (consent.statistics) {
      // TODO: Google Analytics einbinden, sobald die Property angelegt ist, z. B.:
      // var s = document.createElement('script');
      // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
      // s.async = true;
      // document.head.appendChild(s);
    }
    if (consent.marketing) {
      // TODO: Google Ads Remarketing-Tag / Meta Pixel einbinden, sobald IDs vorhanden sind.
    }
  }

  function saveConsent(choice) {
    var consent = { necessary: true, statistics: !!choice.statistics, marketing: !!choice.marketing, ts: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
  }

  function buildBanner(prefill) {
    var existing = document.querySelector('.cookie-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<div class="cookie-banner-main">' +
        '<p>Wir nutzen Cookies für Statistik (Google Analytics) und Marketing (Google/Meta Ads), um unsere Website und Werbeanzeigen zu verbessern. Notwendige Cookies sind immer aktiv. Mehr dazu in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn-ghost cookie-btn-settings">Einstellungen</button>' +
          '<button type="button" class="btn-ghost cookie-btn-reject">Nur notwendige</button>' +
          '<button type="button" class="btn-primary cookie-btn-accept">Alle akzeptieren</button>' +
        '</div>' +
      '</div>' +
      '<div class="cookie-settings-panel" hidden>' +
        '<label class="cookie-category">' +
          '<input type="checkbox" checked disabled>' +
          '<span><strong>Notwendig</strong><br>Für den Betrieb der Website erforderlich, z. B. um deine Cookie-Auswahl zu speichern.</span>' +
        '</label>' +
        '<label class="cookie-category">' +
          '<input type="checkbox" class="cookie-cat-statistics">' +
          '<span><strong>Statistik</strong><br>Google Analytics, hilft uns zu verstehen, wie die Website genutzt wird.</span>' +
        '</label>' +
        '<label class="cookie-category">' +
          '<input type="checkbox" class="cookie-cat-marketing">' +
          '<span><strong>Marketing</strong><br>Google/Meta Ads, misst die Wirkung unserer Werbeanzeigen.</span>' +
        '</label>' +
        '<button type="button" class="btn-primary cookie-btn-save">Auswahl speichern</button>' +
      '</div>';
    document.body.appendChild(banner);

    var panel = banner.querySelector('.cookie-settings-panel');
    var statCb = banner.querySelector('.cookie-cat-statistics');
    var markCb = banner.querySelector('.cookie-cat-marketing');
    if (prefill) {
      statCb.checked = !!prefill.statistics;
      markCb.checked = !!prefill.marketing;
      panel.hidden = false;
    }

    banner.querySelector('.cookie-btn-settings').addEventListener('click', function () {
      panel.hidden = !panel.hidden;
    });
    banner.querySelector('.cookie-btn-reject').addEventListener('click', function () {
      saveConsent({ statistics: false, marketing: false });
      banner.remove();
    });
    banner.querySelector('.cookie-btn-accept').addEventListener('click', function () {
      saveConsent({ statistics: true, marketing: true });
      banner.remove();
    });
    banner.querySelector('.cookie-btn-save').addEventListener('click', function () {
      saveConsent({ statistics: statCb.checked, marketing: markCb.checked });
      banner.remove();
    });

    return banner;
  }

  var consent = getConsent();
  if (!consent) {
    buildBanner(null);
  } else {
    applyConsent(consent);
  }

  document.querySelectorAll('.footer-cookie-settings').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      buildBanner(getConsent() || {});
    });
  });
});
