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
})();
