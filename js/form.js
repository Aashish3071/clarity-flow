/* ============================================================
   CREDSTACKS | FORM VALIDATION, ANTI-SPAM DEFENSE & SUBMISSION
   ============================================================ */

(function () {
  'use strict';

  const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwdwDPbovgamKSt8zJocTi5N1UPaR8rAXChkz6eeTfYbJsyy_BJTQSKWoFd4Z2HVFQzSQ/exec';

  // Known disposable / temporary email domains
  const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'tempmail.com',
    'throwawaymail.com', 'yopmail.com', 'sharklasers.com', 'dispostable.com',
    'getairmail.com', 'trashmail.com', 'fakemailgenerator.com', 'temp-mail.org',
    'burnermail.io', 'mytemp.email', 'tempail.com', 'mohmal.com'
  ]);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim());
  }

  function isBotEmailPattern(email) {
    if (!email || !email.includes('@')) return true;
    const parts = email.toLowerCase().trim().split('@');
    if (parts.length !== 2) return true;
    const [user, domain] = parts;

    // Check disposable domain
    if (DISPOSABLE_DOMAINS.has(domain)) return true;

    // Check dot-alias abuse (e.g. a.le.g.ekih.361@gmail.com)
    const dotCount = (user.match(/\./g) || []).length;
    if (dotCount >= 3 && user.length <= 18) return true;
    if (/(?:^|\.)[a-z]\.[a-z]\.[a-z](?:\.|$)/.test(user)) return true;

    return false;
  }

  function isGibberish(text) {
    if (!text || typeof text !== 'string') return false;
    const clean = text.trim();
    if (clean.length < 5) return false;

    // 6+ consecutive consonants without vowel/space (e.g. Usfnrdyvb)
    const consonantClusterRegex = /[bcdfghjklmnpqrstvwxyz]{6,}/i;
    if (consonantClusterRegex.test(clean)) return true;

    // Random mixed case high-entropy token without spaces (e.g. ZXsaVkVFLAMhBDzURBCgL)
    if (clean.length > 15 && !clean.includes(' ') && /[A-Z]/.test(clean) && /[a-z]/.test(clean) && !clean.includes('@') && !clean.includes('.')) {
      return true;
    }

    return false;
  }

  function isDummyPhone(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) return true;
    // All same digits (e.g. 1111111111)
    if (/^(\d)\1+$/.test(digits)) return true;
    // Sequential digits
    if (digits === '1234567890' || digits === '0123456789') return true;
    return false;
  }

  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    // Layer 2: Time-Trap timestamp
    const formRenderTime = Date.now();

    // Layer 3: Human interaction telemetry
    let hasHumanInteraction = false;
    const markInteraction = () => { hasHumanInteraction = true; };
    ['pointerdown', 'keydown', 'touchstart', 'focusin'].forEach(evt => {
      form.addEventListener(evt, markInteraction, { passive: true, once: false });
    });

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
      const isDemo = formId === 'demoForm';
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
        formType: isDemo ? '14-Day Free Access Request' : 'Contact Message',
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href
      };

      formData.forEach((value, key) => {
        payload[key] = typeof value === 'string' ? value.trim() : value;
      });

      // ============================================================
      // MULTI-LAYER ANTI-SPAM EVALUATION
      // ============================================================
      const hpWebsite = (formData.get('website_url') || '').trim();
      const hpFax = (formData.get('business_fax') || '').trim();
      const elapsedSeconds = (Date.now() - formRenderTime) / 1000;
      const emailVal = payload.email || '';
      const nameVal = payload.fullName || '';
      const msgVal = payload.message || '';
      const bizVal = payload.businessName || '';
      const phoneVal = payload.phone || '';

      const isHoneypotTriggered = hpWebsite.length > 0 || hpFax.length > 0;
      const isSpeedTriggered = elapsedSeconds < 3.0;
      const isInteractionMissing = !hasHumanInteraction;
      const isEmailBot = isBotEmailPattern(emailVal);
      const isGibberishLead = isGibberish(nameVal) || isGibberish(msgVal) || isGibberish(bizVal);
      const isFakePhone = phoneVal ? isDummyPhone(phoneVal) : false;

      const isSpamBot = (
        isHoneypotTriggered ||
        isSpeedTriggered ||
        isInteractionMissing ||
        isEmailBot ||
        isGibberishLead ||
        isFakePhone
      );

      // Layer 5: Silent Tarpit (Fake Success for bots)
      if (isSpamBot) {
        console.warn('[Security] Submission filtered by anti-spam heuristics.');
        setTimeout(() => {
          showFormSuccess(form, formId);
        }, 600);
        return;
      }

      // Clean out honeypot decoy fields before sending to Google Sheets
      delete payload.website_url;
      delete payload.business_fax;

      try {
        // Send legitimate payload via query parameters
        const params = new URLSearchParams();
        Object.keys(payload).forEach(key => {
          if (payload[key] !== undefined && payload[key] !== null) {
            params.append(key, payload[key]);
          }
        });

        const targetUrl = `${GOOGLE_SHEETS_ENDPOINT}?${params.toString()}`;

        await fetch(targetUrl, {
          method: 'GET',
          mode: 'no-cors'
        });

        // Trigger Google Tag Manager Data Layer Event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: isDemo ? 'generate_lead' : 'contact_submit',
            formId: formId,
            leadProduct: payload.product || payload.subject || 'general'
          });
        }

        showFormSuccess(form, formId);
      } catch (err) {
        console.error('Lead submission error:', err);
        showFormSuccess(form, formId);
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
