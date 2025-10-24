window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('saioa_hasita');
  if (!el) return;
  try {
    const nan = localStorage.getItem('userNAN');
    if (nan) {
      el.textContent = 'Erabiltzailearen NAN: ' + nan;
      el.classList.add('session-logged');
    } else {
      el.textContent = '';
    }
  } catch (err) {
    console.error('show_session error', err);
  }
});