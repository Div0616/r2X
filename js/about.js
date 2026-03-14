/* ═══════════════════════════════════════════
   r2X — about.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL SHRINK ── */
  const nav = document.querySelector('.about-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ── SKILL BAR ANIMATE ── */
  const barFills = document.querySelectorAll('.bar-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('go');
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  barFills.forEach(el => barObs.observe(el));

  /* ── ACTIVE NAV LINK (highlight "About us") ── */
  document.querySelectorAll('.about-nav .nav-links a').forEach(a => {
    if (a.getAttribute('href') === 'about.html' || a.textContent.trim() === 'About us') {
      a.classList.add('active');
    }
  });

})();
