/* ============================================================
   CREDSTACKS | FORM VALIDATION & SUBMISSION
   ============================================================ */

(function () {
  'use strict';

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim());
  }

  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => clearError(field));
      field.addEventListener('change', () => clearError(field));
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const value = (field.value || '').trim();
        if (!value) {
          showError(field, 'This field is required');
          isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
          showError(field, 'Please enter a valid email address');
          isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(value)) {
          showError(field, 'Please enter a valid phone number');
          isValid = false;
        } else {
          clearError(field);
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Submitting...';

          setTimeout(() => {
            alert('Thank you! Your request has been received. Our team will reach out within 1 business day.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }, 600);
        }
      }
    });
  }

  function showError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    field.classList.add('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearError(field) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    field.classList.remove('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupForm('demoForm');
    setupForm('contactForm');
  });

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setupForm('demoForm');
    setupForm('contactForm');
  }
})();
