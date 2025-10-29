document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("users-tbody");
  const endpoint = "../config/items.php";
  let eguneratuAuto = true;
  let intervalId = null;

  // Elementuen zerrenda kargatu
  async function loadRows() {
    if (!tbody) return;
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();
      tbody.innerHTML = html; // Zerrenda eguneratu
    } catch (err) {
      console.error("Errorea elementuak kargatzean:", err);
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--danger);padding:1rem;">Errorea datuak kargatzean: ${err.message}</td></tr>`;
    }
  }

  // Zerrenda automatikoki eguneratu 5 segundoro
  function startPolling(ms = 5000) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (eguneratuAuto) loadRows();
    }, ms);
  }

  // Zerrendaren eguneratzea gelditu
  function stopPolling() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  // Orrialdearen ikusgarritasunaren aldaketak kudeatu
  document.addEventListener("visibilitychange", () => {
    eguneratuAuto = !document.hidden;
  });

  // Zerrenda kargatu eta eguneratze automatikoa hasi
  loadRows();
  startPolling(5000);
});
