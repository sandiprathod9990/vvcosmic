(function () {
  const phone = document.body.dataset.whatsappPhone || '918140961570';

  const stepChoose = document.getElementById('intake-step-choose');
  const stepAstrology = document.getElementById('intake-step-astrology');
  const stepVastu = document.getElementById('intake-step-vastu');
  const formAstrology = document.getElementById('intake-form-astrology');
  const formVastu = document.getElementById('intake-form-vastu');

  function showStep(step) {
    [stepChoose, stepAstrology, stepVastu].forEach((el) => {
      if (!el) return;
      const active = el === step;
      el.hidden = !active;
      el.classList.toggle('intake-step--active', active);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatDate(value) {
    if (!value) return '';
    try {
      const d = new Date(value + 'T12:00:00');
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return value;
    }
  }

  function formatTime(value) {
    if (!value) return '';
    const [h, m] = value.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }

  function buildWhatsAppUrl(text) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  function openWhatsApp(message) {
    window.location.href = buildWhatsAppUrl(message);
  }

  document.querySelectorAll('[data-intake-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-intake-type');
      if (type === 'astrology') showStep(stepAstrology);
      if (type === 'vastu') showStep(stepVastu);
    });
  });

  document.querySelectorAll('[data-intake-back]').forEach((btn) => {
    btn.addEventListener('click', () => showStep(stepChoose));
  });

  if (formAstrology) {
    formAstrology.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!formAstrology.checkValidity()) {
        formAstrology.reportValidity();
        return;
      }
      const fd = new FormData(formAstrology);
      const lines = [
        'VVCosmic — Consultation intake',
        '',
        'Type: Astrology Consultation',
        `Full name: ${fd.get('fullName')}`,
        `Date of birth: ${formatDate(fd.get('dateOfBirth'))}`,
        `Time of birth: ${formatTime(fd.get('timeOfBirth'))}`,
        `Place of birth: ${fd.get('placeOfBirth')}`,
        `Country based in: ${fd.get('countryBased')}`,
      ];
      const focus = (fd.get('focus') || '').toString().trim();
      if (focus) lines.push(`Focus: ${focus}`);
      lines.push('', 'I would like to know more about your consultation services.');
      openWhatsApp(lines.join('\n'));
    });
  }

  if (formVastu) {
    formVastu.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!formVastu.checkValidity()) {
        formVastu.reportValidity();
        return;
      }
      const fd = new FormData(formVastu);
      const lines = [
        'VVCosmic — Consultation intake',
        '',
        'Type: Vastu Consultation',
        `Full name: ${fd.get('fullName')}`,
        `Property type: ${fd.get('propertyType')}`,
        `Property location: ${fd.get('propertyLocation')}`,
        `Country based in: ${fd.get('countryBased')}`,
      ];
      const focus = (fd.get('focus') || '').toString().trim();
      if (focus) lines.push(`Focus: ${focus}`);
      lines.push('', 'I would like to know more about your consultation services.');
      openWhatsApp(lines.join('\n'));
    });
  }

  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  if (typeParam === 'astrology') showStep(stepAstrology);
  if (typeParam === 'vastu') showStep(stepVastu);
})();
