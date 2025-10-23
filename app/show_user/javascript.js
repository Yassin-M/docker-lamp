document.addEventListener('DOMContentLoaded', function () {
  (function () {
    'use strict';

    function setField(id, value) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = value == null || value === '' ? '--' : value;
    }

    function applyUser(user) {
      if (!user) return;
      setField('user-id', user.id || user.nan || user.NAN || user.id);
      setField('user-name', user.nombre || user.name || user.username);
      setField('user-email', user.email || user.mail || '');
      setField('user-dob', user.dob || user.jaiotze_data || user.birthdate || '');
      setField('user-phone', user.phone || user.telefono || '');
    }

    // 1) window.USER
    if (window.USER && typeof window.USER === 'object') {
      applyUser(window.USER);
      return;
    }

    // 2) busco un script con JSON embebido
    var embedded = document.getElementById('user-data');
    if (embedded) {
      try {
        var parsed = JSON.parse(embedded.textContent);
        applyUser(parsed);
        return;
      } catch (e) {
        // si no es válido, continuar
        console.warn('user-data no es JSON válido', e);
      }
    }

    // 3) modo test via URL ?test=1
    var url = new URL(location.href);
    if (url.searchParams.get('test') === '1') {
      applyUser({ id: 12345678, nombre: 'Usuario Prueba', email: 'prueba@local', dob: '1990-01-01', phone: '+34 600 000 000' });
      return;
    }

    // 4) intentar buscar vía API a ../config/get_user.php
    var api = new URL('../config/get_user.php', location.href).toString();
    fetch(api, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('fetch fallo ' + r.status); return r.json(); })
      .then(function (data) { applyUser(data); })
      .catch(function (err) {
        // no hay backend disponible — dejar los placeholders
        console.info('No se pudieron cargar datos de usuario desde API:', err.message);
      });

  })();
});
