/* ═══════════════════════════════════════════
   r2X — shared.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });
  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animCursor() {
    cx = lerp(cx, mx, 0.18);
    cy = lerp(cy, my, 0.18);
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    raf = requestAnimationFrame(animCursor);
  }
  animCursor();

  // Grow on interactive elements
  function addHoverTargets() {
    document.querySelectorAll(
      'a, button, [data-cursor-hover], .person-card, .skill-block, .proj-row, .c-card, .cta-btn, .bar-grid-btn, .bar-arrow-btn, .nav-about'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHoverTargets);
  } else {
    addHoverTargets();
  }

  // ── NAV SCROLL ──
  const nav = document.querySelector('.about-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── HAMBURGER TOGGLE ──
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }
})();
