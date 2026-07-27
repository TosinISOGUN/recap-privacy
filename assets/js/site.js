(function () {
  // Nav shadow/shrink on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile hamburger drawer
  var burger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.drawer-overlay');
  var drawer = document.querySelector('.drawer');
  if (burger && overlay && drawer) {
    var closeBtn = drawer.querySelector('.d-close');
    var setOpen = function (open) {
      burger.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
    overlay.addEventListener('click', function () { setOpen(false); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal-on-scroll
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Sidebar active-section highlight (docs page)
  var sidenav = document.getElementById('sidenav');
  if (sidenav) {
    var links = Array.prototype.slice.call(sidenav.querySelectorAll('a'));
    var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var onDocScroll = function () {
      var pos = window.scrollY + 120;
      var currentIndex = 0;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] && sections[i].offsetTop <= pos) currentIndex = i;
      }
      links.forEach(function (a, i) { a.classList.toggle('active', i === currentIndex); });
    };
    window.addEventListener('scroll', onDocScroll, { passive: true });
    window.addEventListener('resize', onDocScroll);
    onDocScroll();
  }
})();
