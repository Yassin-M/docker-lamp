console.log('Script show_session.js cargado correctamente');
window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('saioa_hasita');
  const btnEditProfile = document.getElementById('btn-edit-profile');

  try {
    const nan = sessionStorage.getItem('userNAN') || localStorage.getItem('userNAN');

    if (el) {
      if (nan) {
        el.textContent = 'NAN: ' + nan;
        el.classList.add('session-logged');
      } else {
        el.textContent = '';
        el.classList.remove('session-logged');
      }
    }

    if (btnEditProfile) {
      if (!nan) {
        btnEditProfile.classList.add('disabled');
        btnEditProfile.setAttribute('aria-disabled', 'true');
        btnEditProfile.removeAttribute('href');
      } else {
        btnEditProfile.classList.remove('disabled');
        btnEditProfile.setAttribute('aria-disabled', 'false');
        btnEditProfile.setAttribute('href', 'show_user/');
      }
    }
  } catch (err) {
    console.error('show_session error', err);
  }
});