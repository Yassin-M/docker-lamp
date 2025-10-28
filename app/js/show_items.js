(function () {
  const tbody = document.getElementById('item-tbody');
  const endpoint = '../config/show_item.php';

  function getItemFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('item');
  }

  async function loadItem(itemName) {
    if (!tbody || !itemName) return;

    try {
      const res = await fetch(`${endpoint}?item=${encodeURIComponent(itemName)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      tbody.innerHTML = html;
    } catch (err) {
      console.error('Error cargando carta:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const item = getItemFromURL();
    loadItem(item);
  });
})();
