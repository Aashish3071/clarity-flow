/* ============================================================
   CREDSTACKS | ANIMATIONS JS v1.0
   IntersectionObserver Scroll Reveal & Counter Triggers
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealObserverOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, revealObserverOptions);

  function initReveal () {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     STAGGER CHILDREN
     ============================================================ */
  function initStagger () {
    const staggerContainers = document.querySelectorAll('.stagger');
    staggerContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach(child => {
        child.classList.add('reveal', 'reveal--up');
        revealObserver.observe(child);
      });
    });
  }

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          if (window.CS && window.CS.animateCounter) {
            window.CS.animateCounter(el);
          }
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  function initCounters () {
    document.querySelectorAll('[data-counter]').forEach(el => {
      counterObserver.observe(el);
    });
  }

  /* ============================================================
     PROGRESS BAR ANIMATION
     ============================================================ */
  const progressObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  function initProgressBars () {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      progressObserver.observe(bar);
    });
  }

  /* ============================================================
     PARALLAX
     ============================================================ */
  let parallaxElements = [];

  function initParallax () {
    parallaxElements = Array.from(document.querySelectorAll('[data-parallax]'));
  }

  function updateParallax () {
    if (!parallaxElements.length) return;
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax || '0.3');
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  let parallaxTicking = false;
  window.addEventListener('scroll', function () {
    if (!parallaxTicking) {
      requestAnimationFrame(function () {
        updateParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  /* ============================================================
     DASHBOARD BAR ANIMATION
     ============================================================ */
  function initDashboardBars () {
    const bars = document.querySelectorAll('.db-bar');
    const barsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
      bar.style.animationPlayState = 'paused';
      barsObserver.observe(bar);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init () {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    initReveal();
    initStagger();
    initCounters();
    initProgressBars();
    initParallax();
    initDashboardBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
