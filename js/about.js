/* ═══════════════════════════════════════════
   r2X — about.js  (Enhanced Scroll Motions)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL SHRINK ── */
  const nav = document.querySelector('.about-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── MOBILE NAV TOGGLE ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.about-nav .nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger lines
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ── SCROLL REVEAL (standard fade-up) ── */
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

  /* ── SCROLL MOTION (slide, scale, rotate, blur) ── */
  const motionEls = document.querySelectorAll(
    '.scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-rotate, .scroll-blur'
  );
  const motionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        motionObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  motionEls.forEach(el => motionObs.observe(el));

  /* ── APPLY SCROLL MOTION CLASSES TO SECTIONS ── */
  // Each section gets a different entry animation
  const sections = [
    { sel: '#people .people-intro', cls: 'scroll-slide-left' },
    { sel: '#people .people-grid .person-card:nth-child(1)', cls: 'scroll-scale' },
    { sel: '#people .people-grid .person-card:nth-child(2)', cls: 'scroll-scale' },
    { sel: '#skills .skills-left', cls: 'scroll-slide-right' },
    { sel: '#skills .skills-blocks', cls: 'scroll-blur' },
    { sel: '#projects .proj-head', cls: 'scroll-slide-left' },
    { sel: '#contact .contact-inner', cls: 'scroll-scale' },
  ];

  sections.forEach(({ sel, cls }) => {
    const el = document.querySelector(sel);
    if (el && !el.classList.contains(cls)) {
      el.classList.add(cls);
      motionObs.observe(el);
    }
  });

  // Stagger project rows with alternating slide animations
  const projRows = document.querySelectorAll('.proj-row');
  projRows.forEach((row, i) => {
    const cls = i % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right';
    row.classList.add(cls);
    row.style.transitionDelay = `${i * 0.08}s`;
    motionObs.observe(row);
  });

  // Stagger skill blocks with scale effect
  const skillBlocks = document.querySelectorAll('.skill-block');
  skillBlocks.forEach((block, i) => {
    block.classList.add('scroll-scale');
    block.style.transitionDelay = `${i * 0.1}s`;
    motionObs.observe(block);
  });

  // Stagger contact cards
  const contactCards = document.querySelectorAll('.c-card');
  contactCards.forEach((card, i) => {
    card.classList.add('scroll-rotate');
    card.style.transitionDelay = `${i * 0.12}s`;
    motionObs.observe(card);
  });

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

  /* ── PARALLAX ON ORBS ── */
  const orbs = document.querySelectorAll('.hero-orb, .skills-orb, .contact-bg-orb');
  let ticking = false;

  function onParallaxScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      orbs.forEach((orb) => {
        const speed = orb.classList.contains('orb-1') ? 0.08 :
                      orb.classList.contains('orb-2') ? -0.05 :
                      orb.classList.contains('skills-orb') ? 0.06 : 0.04;
        const yOffset = scrollY * speed;
        orb.style.transform = orb.style.transform
          ? orb.style.transform.replace(/translateY\([^)]+\)/, `translateY(${yOffset}px)`)
          : `translateY(${yOffset}px)`;
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onParallaxScroll, { passive: true });

  /* ── SECTION DIVIDER ANIMATION ── */
  const dividers = document.querySelectorAll('.section-divider');
  const divObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'dividerGrow 1.2s var(--ease-out-expo) forwards';
        divObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  dividers.forEach(d => divObs.observe(d));

  // Add divider animation keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dividerGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    .section-divider {
      transform: scaleX(0);
      transform-origin: center;
    }
  `;
  document.head.appendChild(style);

  /* ── SMOOTH SCROLL FOR NAV LINKS ── */
  document.querySelectorAll('.about-nav .nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── ACTIVE NAV LINK (highlight "About us") ── */
  document.querySelectorAll('.about-nav .nav-links a').forEach(a => {
    if (a.getAttribute('href') === 'about.html' || a.textContent.trim() === 'About us') {
      a.classList.add('active');
    }
  });

})();
