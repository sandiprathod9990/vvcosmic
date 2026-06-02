(function () {
  'use strict';

  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const successPanel = document.getElementById('inquiry-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = document.getElementById('submit-inquiry');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.errors?.[0]?.msg || 'Submission failed');
      }

      form.classList.add('hidden');
      successPanel.classList.remove('hidden');
      document.getElementById('inquiry-ref').textContent = result.inquiryId.toUpperCase();
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
      alert(err.message || 'Something went wrong. Please try again.');
    }
  });
})();
