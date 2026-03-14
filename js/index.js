/* ═══════════════════════════════════════════
   r2X — index.js  (Homepage)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── PROJECT DATA ── */
  const PROJECTS = [
    {
      name: 'ASOLO PROSECCO',
      bg: '#E8A020',
      textColor: 'rgba(50,22,0,0.15)',
      cardBg: '#C07810',
      cardTop: 'ASOLO',
      cardBot: 'PROSECCO',
      paperLight: 'rgba(255,230,140,0.92)',
      paperMid:   'rgba(210,160,40,0.78)',
      paperDark:  'rgba(160,110,10,0.70)',
      icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="46" height="46" rx="2" stroke="white" stroke-width="1.4" fill="none"/>
        <line x1="7" y1="20" x2="53" y2="20" stroke="white" stroke-width="1"/>
        <path d="M14 38 Q22 30 30 33 Q38 36 46 27" stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <path d="M14 45 Q22 37 30 40 Q38 43 46 34" stroke="white" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.7"/>
        <rect x="20" y="8" width="20" height="11" rx="1" stroke="white" stroke-width="1" fill="rgba(255,255,255,0.12)"/>
      </svg>`,
    },
    {
      name: "COMPASSO D'ORO",
      bg: '#C8A460',
      textColor: 'rgba(255,255,255,0.17)',
      cardBg: '#A07830',
      cardTop: "COMPASSO",
      cardBot: "D'ORO",
      paperLight: 'rgba(255,248,220,0.94)',
      paperMid:   'rgba(210,185,120,0.80)',
      paperDark:  'rgba(155,125,55,0.72)',
      icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 8 L36 22 L52 24 L41 35 L44 51 L30 44 L16 51 L19 35 L8 24 L24 22 Z" stroke="white" stroke-width="1.4" fill="none" stroke-linejoin="round"/>
        <path d="M24 30 L30 16 L36 30" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    {
      name: 'VERONA DESIGN WEEK',
      bg: '#D05828',
      textColor: 'rgba(60,10,0,0.16)',
      cardBg: '#A83A10',
      cardTop: 'VERONA',
      cardBot: 'DESIGN',
      paperLight: 'rgba(255,210,170,0.92)',
      paperMid:   'rgba(210,110,60,0.78)',
      paperDark:  'rgba(155,60,20,0.70)',
      icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="21" stroke="white" stroke-width="1.4" fill="none"/>
        <line x1="30" y1="9"  x2="30" y2="51" stroke="white" stroke-width="0.9" opacity="0.5"/>
        <line x1="9"  y1="30" x2="51" y2="30" stroke="white" stroke-width="0.9" opacity="0.5"/>
        <path d="M14 14 L46 46" stroke="white" stroke-width="0.7" opacity="0.35"/>
        <path d="M46 14 L14 46" stroke="white" stroke-width="0.7" opacity="0.35"/>
        <circle cx="30" cy="30" r="5" stroke="white" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
      </svg>`,
    },
    {
      name: 'FORMA IDENTITÀ',
      bg: '#2870A0',
      textColor: 'rgba(0,15,40,0.16)',
      cardBg: '#165880',
      cardTop: 'FORMA',
      cardBot: 'IDENTITÀ',
      paperLight: 'rgba(180,225,255,0.92)',
      paperMid:   'rgba(80,160,210,0.78)',
      paperDark:  'rgba(20,90,150,0.70)',
      icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="22" width="46" height="30" rx="2" stroke="white" stroke-width="1.4" fill="none"/>
        <line x1="7" y1="31" x2="53" y2="31" stroke="white" stroke-width="1"/>
        <circle cx="30" cy="13" r="9" stroke="white" stroke-width="1.4" fill="none"/>
        <line x1="26" y1="9" x2="34" y2="17" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="34" y1="9" x2="26" y2="17" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
      </svg>`,
    },
    {
      name: 'ACQUA VIVA',
      bg: '#208870',
      textColor: 'rgba(0,25,15,0.16)',
      cardBg: '#106850',
      cardTop: 'ACQUA',
      cardBot: 'VIVA',
      paperLight: 'rgba(180,255,230,0.92)',
      paperMid:   'rgba(60,185,145,0.78)',
      paperDark:  'rgba(10,120,85,0.70)',
      icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 8 C30 8 14 26 14 38 C14 47 21 54 30 54 C39 54 46 47 46 38 C46 26 30 8 30 8Z" stroke="white" stroke-width="1.4" fill="none"/>
        <path d="M20 40 Q26 34 30 38 Q34 42 40 36" stroke="white" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      </svg>`,
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
