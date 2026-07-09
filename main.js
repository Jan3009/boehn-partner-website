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
  if (!localStorage.getItem(CONSENT_KEY)) {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p>Diese Website nutzt keine Tracking-Cookies. Zur Darstellung der Schrift wird eine Verbindung zu Google Fonts aufgebaut. Mehr dazu in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<button type="button">Verstanden</button>';
    document.body.appendChild(banner);
    banner.querySelector('button').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, '1');
      banner.remove();
    });
  }
});
