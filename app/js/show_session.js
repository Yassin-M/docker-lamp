window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('saioa_hasita');
  if (!el) return;
  try {
    const nan = sessionStorage.getItem('userNAN') || localStorage.getItem('userNAN');
    if (nan) {
      el.textContent = 'NAN: ' + nan;
      el.classList.add('session-logged');
    } else {
      el.textContent = '';
      el.classList.remove('session-logged');
    }
  } catch (err) {
    console.error('show_session error', err);
  }
});