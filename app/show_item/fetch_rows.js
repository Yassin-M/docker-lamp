// fetch_rows.js
// Polling loader: fetch rows HTML from the PHP endpoint and inject into tbody.
// Externalized so the logic is reusable and cacheable.

(function () {
  const tbody = document.getElementById('users-tbody');
  const endpoint = '../config/show_items.php';
  let polling = true; // set to false to pause
  let intervalId = null;

  async function loadRows() {
    if (!tbody) return;
    try {
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      tbody.innerHTML = html;
    } catch (err) {
      console.error('Error cargando filas:', err);
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--danger);padding:1rem;">Error al cargar datos: ${err.message}</td></tr>`;
    }
  }

  function startPolling(ms = 5000) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => { if (polling) loadRows(); }, ms);
  }

  function stopPolling() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  // Pause polling when page is hidden
  document.addEventListener('visibilitychange', () => {
    polling = !document.hidden;
  });

  document.addEventListener('DOMContentLoaded', () => {
    loadRows();
    startPolling(5000);
  });

  // Expose controls for debugging if needed
  window.__fetchRows = { startPolling, stopPolling, loadRows };
})();
