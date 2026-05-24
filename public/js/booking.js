(function () {
  'use strict';

  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const successPanel = document.getElementById('booking-success');
  const consultations = window.CONSULTATIONS || [];

  let currentStep = 1;

  function showStep(step) {
    currentStep = step;

    steps.forEach((s) => {
      s.classList.toggle('active', Number(s.dataset.step) === step);
    });

    progressSteps.forEach((ps) => {
      const psStep = Number(ps.dataset.step);
      ps.classList.toggle('active', psStep === step);
      ps.classList.toggle('completed', psStep < step);
    });

    if (step === 4) updatePaymentSummary();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep(step) {
    const stepEl = form.querySelector(`.form-step[data-step="${step}"]`);
    const fields = stepEl.querySelectorAll('input, select, textarea');
    let valid = true;

    fields.forEach((field) => {
      field.classList.remove('invalid');
      if (!field.checkValidity()) {
        valid = false;
        field.classList.add('invalid');
      }
    });

    if (step === 2) {
      const selected = form.querySelector('input[name="consultation"]:checked');
      if (!selected) valid = false;
    }

    return valid;
  }

  function updatePaymentSummary() {
    const selectedId = form.querySelector('input[name="consultation"]:checked')?.value;
    const consultation = consultations.find((c) => c.id === selectedId);

    if (consultation) {
      document.getElementById('summary-consultation').textContent = consultation.name;
      document.getElementById('summary-duration').textContent = consultation.duration;
      document.getElementById('summary-total').textContent = `${consultation.currency} ${consultation.price.toLocaleString('en-IN')}`;
    }
  }

  form.querySelectorAll('.btn-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = Number(btn.dataset.next);
      if (validateStep(currentStep)) {
        showStep(next);
      }
    });
  });

  form.querySelectorAll('.btn-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
      showStep(Number(btn.dataset.prev));
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    const submitBtn = document.getElementById('submit-booking');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing…';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const inquiryRes = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const inquiryResult = await inquiryRes.json();

      if (!inquiryResult.success) {
        throw new Error(inquiryResult.errors?.[0]?.msg || 'Submission failed');
      }

      await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId: data.consultation,
          inquiryId: inquiryResult.inquiryId,
        }),
      });

      form.classList.add('hidden');
      successPanel.classList.remove('hidden');
      document.getElementById('inquiry-ref').textContent = inquiryResult.inquiryId.toUpperCase();
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Complete Inquiry & Payment';
      alert(err.message || 'Something went wrong. Please try again.');
    }
  });

  const preselected = form.querySelector('input[name="consultation"]:checked');
  if (preselected) {
    showStep(2);
  }
})();
