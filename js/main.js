/* ============================================================
   CREDSTACKS | MAIN JS v2.0
   Navigation, Mobile Menu, Smooth Cross-Page Scroll, Accordions
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     NAV | SCROLL DETECTION & ELEVATION
     ============================================================ */
  const nav = document.getElementById('mainNav');
  let ticking = false;

  function updateNav() {
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  updateNav();

  /* ============================================================
     MOBILE MENU TOGGLE
     ============================================================ */
  const hamburger = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !navMenu?.classList.contains('open');
    hamburger?.classList.toggle('open', isOpen);
    navMenu?.classList.toggle('open', isOpen);
    navOverlay?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger?.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger?.addEventListener('click', () => toggleMobileMenu());
  navOverlay?.addEventListener('click', () => toggleMobileMenu(false));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      toggleMobileMenu(false);
      closeAllDropdowns();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      toggleMobileMenu(false);
      closeAllDropdowns();
    }
  });

  /* ============================================================
     DROPDOWN MENUS
     ============================================================ */
  const dropdownItems = document.querySelectorAll('.nav__item.has-dropdown');

  function closeAllDropdowns() {
    dropdownItems.forEach(item => {
      item.classList.remove('open');
      const toggle = item.querySelector('.nav__dropdown-toggle');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  }

  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.nav__dropdown-toggle');

    item.addEventListener('mouseenter', function () {
      if (window.innerWidth > 1024) {
        closeAllDropdowns();
        item.classList.add('open');
        toggle?.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', function () {
      if (window.innerWidth > 1024) {
        item.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });

    toggle?.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          item.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item.has-dropdown')) {
      closeAllDropdowns();
    }
  });

  /* ============================================================
     ACTIVE NAV HIGHLIGHT & SMOOTH HOME SCROLL
     ============================================================ */
  const rawPath = window.location.pathname.split('/').pop();
  const currentPath = rawPath === '' ? 'index.html' : rawPath;

  document.querySelectorAll('.nav__link, .nav__logo').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Highlight active nav item
    if (link.classList.contains('nav__link')) {
      if (href === currentPath || href === './' + currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    }

    // If clicking Home link or Logo while already on index.html, scroll smoothly to top
    if ((href === 'index.html' || href === './' || href === '/') && (currentPath === 'index.html' || currentPath === '')) {
      link.addEventListener('click', function (e) {
        // If no hash in target href
        if (!href.includes('#')) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          toggleMobileMenu(false);
        }
      });
    }
  });

  /* ============================================================
     SMOOTH SCROLL | HASH & ANCHOR LINKS
     ============================================================ */
  function scrollToHash(hash) {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) {
      const navHeight = nav ? nav.offsetHeight : 64;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }

  // Handle in-page anchor links (#section)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash !== '#') {
        e.preventDefault();
        scrollToHash(hash);
        toggleMobileMenu(false);
      }
    });
  });

  // Handle incoming hash on page load (e.g. index.html#products)
  if (window.location.hash) {
    window.addEventListener('load', function () {
      setTimeout(() => scrollToHash(window.location.hash), 150);
    });
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(fi => {
        fi.classList.remove('open');
        const ans = fi.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

})();
