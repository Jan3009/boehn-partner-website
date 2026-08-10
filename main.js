document.addEventListener('DOMContentLoaded', function () {
  var promoBar = document.querySelector('.promo-bar');
  if (promoBar) {
    if (localStorage.getItem('promoBarClosed') === '1') {
      promoBar.style.display = 'none';
    } else {
      var promoClose = promoBar.querySelector('.promo-close');
      if (promoClose) {
        promoClose.addEventListener('click', function () {
          promoBar.style.display = 'none';
          localStorage.setItem('promoBarClosed', '1');
        });
      }
    }
  }

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

});
