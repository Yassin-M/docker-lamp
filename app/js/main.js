window.addEventListener('DOMContentLoaded', () => {
  // HTML elementuak lortu
  const el = document.getElementById('saioa_hasita');
  const btnEditProfile = document.getElementById('btn-edit-profile');

  try {
    // NAN-a lortu sessionStorage-tik
    const nan = sessionStorage.getItem('userNAN');

    // NAN-a badago izkinan erakutsi (bestela kendu)
    if (el) {
      if (nan) {
        el.textContent = 'NAN: ' + nan;
        el.classList.add('session-logged');
      } else {
        el.textContent = '';
        el.classList.remove('session-logged');
      }
    }

    // Erabiltzailea ikusteko/aldatzeko botoia eguneratu
    if (btnEditProfile) {
      if (!nan) {
        btnEditProfile.classList.add('disabled');
        btnEditProfile.setAttribute('aria-disabled', 'true');
        btnEditProfile.removeAttribute('href');
      } else {
        btnEditProfile.classList.remove('disabled');
        btnEditProfile.setAttribute('aria-disabled', 'false');
        btnEditProfile.setAttribute('href', 'show_user/');

        // Botoian klik egitean nan-a bideratu
        btnEditProfile.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = `/show_user?user=${encodeURIComponent(nan)}`;
        });
      }
    }
  } catch (err) {
    console.error('Errorea:', err);
  }
});