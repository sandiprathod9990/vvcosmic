(function () {
  'use strict';

  const header = document.getElementById('site-top') || document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.getElementById('nav-overlay');

  function setMenuOpen(isOpen) {
    if (!nav || !menuToggle) return;

    nav.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);

    if (navOverlay) {
      navOverlay.classList.toggle('active', isOpen);
      navOverlay.setAttribute('aria-hidden', String(!isOpen));
    }
  }

  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
      },
      { passive: true }
    );
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      setMenuOpen(!nav.classList.contains('open'));
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => setMenuOpen(false));
    }

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 8 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parallaxLayers = document.querySelectorAll('[data-parallax]');

  if (parallaxLayers.length && !prefersReducedMotion) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;

      parallaxLayers.forEach((layer) => {
        const rate = parseFloat(layer.dataset.parallax) || 0.05;
        const rect = layer.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight * 0.5) * rate;
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateParallax();
  }
})();
