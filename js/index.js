/* ═══════════════════════════════════════════
   r2X — index.js  (Homepage)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── PROJECT DATA ── */
  const PROJECTS = [
    {
      name: 'BRILLIANT WEBSITES',
      bg: '#E8A020',
      textColor: 'rgba(50,22,0,0.15)',
      cardBg: '#C07810',
      cardTop: 'WEB',
      cardBot: 'DESIGNS',
      paperLight: 'rgba(255,230,140,0.92)',
      paperMid:   'rgba(210,160,40,0.78)',
      paperDark:  'rgba(160,110,10,0.70)',
      icon: `<div style="font-size:48px">🌐</div>`,
    },
    {
      name: "E-COMMERCE STORES",
      bg: '#C8A460',
      textColor: 'rgba(255,255,255,0.17)',
      cardBg: '#A07830',
      cardTop: "E-COM",
      cardBot: "MERCE",
      paperLight: 'rgba(255,248,220,0.94)',
      paperMid:   'rgba(210,185,120,0.80)',
      paperDark:  'rgba(155,125,55,0.72)',
      icon: `<div style="font-size:48px">🛒</div>`,
    },
    {
      name: 'PORTFOLIO',
      bg: '#D05828',
      textColor: 'rgba(60,10,0,0.16)',
      cardBg: '#A83A10',
      cardTop: 'PORT',
      cardBot: 'FOLIO',
      paperLight: 'rgba(255,210,170,0.92)',
      paperMid:   'rgba(210,110,60,0.78)',
      paperDark:  'rgba(155,60,20,0.70)',
      icon: `<div style="font-size:48px">🎨</div>`,
    },
    {
      name: 'BRANDING AND IDENTITY',
      bg: '#2870A0',
      textColor: 'rgba(0,15,40,0.16)',
      cardBg: '#165880',
      cardTop: 'BRAND',
      cardBot: 'IDENTITY',
      paperLight: 'rgba(180,225,255,0.92)',
      paperMid:   'rgba(80,160,210,0.78)',
      paperDark:  'rgba(20,90,150,0.70)',
      icon: `<div style="font-size:48px">💎</div>`,
    },
    {
      name: 'UI/UX DESIGN',
      bg: '#208870',
      textColor: 'rgba(0,25,15,0.16)',
      cardBg: '#106850',
      cardTop: 'UI/UX',
      cardBot: 'DESIGN',
      paperLight: 'rgba(180,255,230,0.92)',
      paperMid:   'rgba(60,185,145,0.78)',
      paperDark:  'rgba(10,120,85,0.70)',
      icon: `<div style="font-size:48px">✦</div>`,
    },
  ];

  /* ── STATE ── */
  let current   = 0;
  let isAnimating = false;
  let lastWheel = 0;
  let touchStartY = 0;
  let bgOffset  = 0;
  let mouseNorm = 0; // -1..1

  /* ── ELEMENTS ── */
  const slider    = document.getElementById('slider');
  const bgText    = document.getElementById('bg-text');
  const stage     = document.getElementById('stage');
  const projCard  = document.getElementById('proj-card');
  const cardTop   = document.getElementById('card-title-top');
  const cardBot   = document.getElementById('card-title-bot');
  const cardIcon  = document.getElementById('card-icon');
  const barName   = document.getElementById('bar-name');
  const progFill  = document.getElementById('prog-fill');
  const progDots  = document.querySelectorAll('.prog-dot');

  /* ── APPLY PROJECT (instant, no transition) ── */
  function applyProject(idx) {
    const p = PROJECTS[idx];

    // Background
    slider.style.backgroundColor = p.bg;

    // Giant text
    bgText.style.color = p.textColor;
    const rep = p.name + '\u00A0\u00A0\u00A0\u00A0';
    bgText.textContent = rep + rep + rep + rep;

    // Card
    projCard.style.backgroundColor = p.cardBg;
    cardTop.textContent = p.cardTop;
    cardBot.textContent = p.cardBot;
    cardIcon.innerHTML  = p.icon;

    // Bar label — with fade swap
    barName.classList.add('fade');
    setTimeout(() => {
      barName.textContent = p.name;
      barName.classList.remove('fade');
    }, 200);

    // Progress
    const pct = ((idx + 1) / PROJECTS.length) * 100;
    progFill.style.height = pct + '%';
    progDots.forEach((d, i) => d.classList.toggle('active', i === idx));

    // Paper colours
    updatePaperSVG(p);
  }

  /* ── UPDATE PAPER SVG GRADIENTS ── */
  function updatePaperSVG(p) {
    // Top paper
    const tSvg = document.getElementById('svg-paper-top');
    if (tSvg) {
      const g1 = tSvg.getElementById('gtop1');
      const g2 = tSvg.getElementById('gtop2');
      if (g1) {
        g1.children[0].setAttribute('stop-color', p.paperLight);
        g1.children[1].setAttribute('stop-color', p.paperMid);
      }
      if (g2) {
        g2.children[0].setAttribute('stop-color', p.paperMid);
        g2.children[1].setAttribute('stop-color', p.paperDark);
      }
    }
    // Bottom paper
    const bSvg = document.getElementById('svg-paper-bot');
    if (bSvg) {
      const g3 = bSvg.getElementById('gbot1');
      const g4 = bSvg.getElementById('gbot2');
      if (g3) {
        g3.children[0].setAttribute('stop-color', p.paperLight);
        g3.children[1].setAttribute('stop-color', p.paperMid);
      }
      if (g4) {
        g4.children[0].setAttribute('stop-color', p.paperMid);
        g4.children[1].setAttribute('stop-color', p.paperDark);
      }
    }
  }

  /* ── NAVIGATE ── */
  function goTo(nextIdx, direction) {
    if (isAnimating) return;
    if (nextIdx < 0 || nextIdx >= PROJECTS.length) return;

    isAnimating = true;

    const exitClass  = direction === 'up' ? 'exit-up'   : 'exit-down';
    const enterClass = direction === 'up' ? 'enter-up'  : 'enter-down';

    // Exit
    stage.classList.add(exitClass);

    setTimeout(() => {
      stage.classList.remove(exitClass);
      current = nextIdx;
      applyProject(current);

      // Force reflow then enter
      void stage.offsetWidth;
      stage.classList.add(enterClass);

      setTimeout(() => {
        stage.classList.remove(enterClass);
        isAnimating = false;
      }, 680);
    }, 520);
  }

  /* ── BG TEXT MARQUEE ── */
  document.addEventListener('mousemove', e => {
    mouseNorm = (e.clientX / window.innerWidth - 0.5) * 2;
  });

  (function animBgText() {
    bgOffset -= (1.6 + mouseNorm * 1.4);
    // Wrap: reset when scrolled past 1/4 of the text
    if (bgText.scrollWidth > 0) {
      const quarter = bgText.scrollWidth / 4;
      if (Math.abs(bgOffset) >= quarter) bgOffset = 0;
    }
    bgText.style.transform = `translateY(-50%) translateX(${bgOffset}px)`;
    requestAnimationFrame(animBgText);
  })();

  /* ── WHEEL ── */
  window.addEventListener('wheel', e => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheel < 850) return;
    lastWheel = now;
    if (e.deltaY > 0) goTo(current + 1, 'up');
    else              goTo(current - 1, 'down');
  }, { passive: false });

  /* ── TOUCH ── */
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 45) {
      if (dy > 0) goTo(current + 1, 'up');
      else        goTo(current - 1, 'down');
    }
  }, { passive: true });

  /* ── KEYBOARD ── */
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown')
      goTo(current + 1, 'up');
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft'  || e.key === 'PageUp')
      goTo(current - 1, 'down');
  });

  /* ── PROGRESS DOT CLICK ── */
  progDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === current) return;
      goTo(i, i > current ? 'up' : 'down');
    });
  });

  /* ── INIT ── */
  applyProject(0);

})();
