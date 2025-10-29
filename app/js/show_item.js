// URL-tik kartaren izena lortu
function getItemFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("item");
}

// Kartaren datuak kargatu
async function loadItem(itemName, tbody, cardTitle, editButton, endpoint) {
  if (!tbody || !itemName) return;

  try {
    const res = await fetch(`${endpoint}?item=${encodeURIComponent(itemName)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Errorea kartaren datuak kargatzean.");

    // HTML taula sortu eta datuak bete
    const rowHTML = `
      <tr>
        <td>${data.izena || ""}</td>
        <td>${data.kostua || ""}</td>
        <td>${data.bizitza || ""}</td>
        <td>${data.erasoa || ""}</td>
        <td>
          <span class="badge">${data.mota || ""}</span>
        </td>
      </tr>
    `;

    tbody.innerHTML = rowHTML;
    cardTitle.textContent = `Karta - ${data.izena || itemName}`;
    editButton.href = `../modify_item?item=${encodeURIComponent(itemName)}`;
  } catch (err) {
    console.error("Errorea itema kargatzean:", err);
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--danger);padding:1rem;">Errorea itema kargatzean: ${err.message}</td></tr>`;
  }
}

// Orrialdea kargatzean
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("item-tbody");
  const cardTitle = document.getElementById("card-title");
  const editButton = document.getElementById("edit-button");
  const endpoint = "../config/show_item.php";

  // Elementua kargatu
  const item = getItemFromURL();
  loadItem(item, tbody, cardTitle, editButton, endpoint);
});