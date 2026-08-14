/* ============================================================
   CREDSTACKS | FORM VALIDATION & GOOGLE SHEETS SUBMISSION
   ============================================================ */

(function () {
  'use strict';

  const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzhHhRGnZlcGKxYmKInb5V-bGIVhL9mu9Ny_2tFM8PIiO-X9k-upVkgVa8814uaC-zd/exec';

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim());
  }

  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Prevent double listener attachments
    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => clearError(field));
      field.addEventListener('change', () => clearError(field));
    });

    form.addEventListener('submit', async function (e) {
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

      if (!isValid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="display:inline-block; animation: spin 1s linear infinite; vertical-align: middle; margin-right: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Submitting...
        `;
      }

      // Collect form payload
      const formData = new FormData(form);
      const payload = {
        formType: formId === 'demoForm' ? '14-Day Free Access Request' : 'Contact Message',
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href
      };

      formData.forEach((value, key) => {
        payload[key] = typeof value === 'string' ? value.trim() : value;
      });

      try {
        // Send to Google Sheets Web App endpoint
        await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web Apps to bypass CORS restrictions
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        // Trigger Google Tag Manager Data Layer Event if present
        if (window.dataLayer) {
          window.dataLayer.push({
            event: formId === 'demoForm' ? 'generate_lead' : 'contact_submit',
            formId: formId,
            leadProduct: payload.product || payload.subject || 'general'
          });
        }

        // Show Success Feedback
        showFormSuccess(form, formId);
      } catch (err) {
        console.error('Lead submission error:', err);
        alert('Thank you! Your submission has been received. Our team will contact you shortly.');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  function showFormSuccess(form, formId) {
    const isDemo = formId === 'demoForm';
    const successContainer = document.createElement('div');
    successContainer.className = 'form-success-state';
    successContainer.style.textAlign = 'center';
    successContainer.style.padding = '32px 16px';
    successContainer.style.animation = 'fadeIn 0.3s ease-out';

    successContainer.innerHTML = `
      <div style="width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center; color: #10b981;">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px; color: var(--clr-text, #0f172a);">
        ${isDemo ? 'Request Received Successfully!' : 'Message Sent!'}
      </h3>
      <p style="font-size: 14px; color: var(--clr-text-muted, #64748b); max-width: 360px; margin: 0 auto 20px; line-height: 1.5;">
        ${isDemo
          ? 'Our onboarding team is preparing your workspace. We will send your access credentials within 24 hours.'
          : 'Thank you for reaching out. A product specialist will get back to you within 1 business day.'}
      </p>
      <button type="button" class="btn btn--outline btn--sm" id="resetSuccessFormBtn">
        Submit Another Response
      </button>
    `;

    form.style.display = 'none';
    form.parentNode.insertBefore(successContainer, form.nextSibling);

    const resetBtn = successContainer.querySelector('#resetSuccessFormBtn');
    resetBtn?.addEventListener('click', function () {
      form.reset();
      form.style.display = '';
      successContainer.remove();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = isDemo ? 'Request 14-Day Free Access' : 'Send Message';
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupForm('demoForm');
      setupForm('contactForm');
    });
  } else {
    setupForm('demoForm');
    setupForm('contactForm');
  }
})();
