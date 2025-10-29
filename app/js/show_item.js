(function () {
  const tbody = document.getElementById('item-tbody');
  const cardTitle = document.getElementById('card-title');
  const editButton = document.getElementById('edit-button');
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

      const data = await res.json(); // Cambiado para procesar JSON
      if (!data.success) throw new Error(data.message || 'Errorea itema kargatzean.');

      // Generar el HTML dinámicamente
      const rowHTML = `
        <tr>
          <td>${data.izena || ''}</td>
          <td>${data.kostua || ''}</td>
          <td>${data.bizitza || ''}</td>
          <td>${data.erasoa || ''}</td>
          <td>
            <span class="badge">${data.mota || ''}</span>
          </td>
        </tr>
      `;

      tbody.innerHTML = rowHTML;
      cardTitle.textContent = `Karta - ${data.izena || itemName}`;
      editButton.href = `../modify_item?item=${encodeURIComponent(itemName)}`;
    } catch (err) {
      console.error('Error cargando carta:', err);
      tbody.innerHTML = `<tr><td colspan="5">Errorea itema kargatzean: ${err.message}</td></tr>`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const item = getItemFromURL();
    loadItem(item);
  });
})();
