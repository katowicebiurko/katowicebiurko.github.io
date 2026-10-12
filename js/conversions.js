// Google Ads conversion: a click on a contact link (data-conv)
document.querySelectorAll('[data-conv]').forEach(a => a.addEventListener('click', () =>
  gtag('event', 'conversion', { send_to: 'AW-17781826631/NGt1CLjzrswbEMfIhJ9C', value: 1, currency: 'PLN' })));
