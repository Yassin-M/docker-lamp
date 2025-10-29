// Datuen formatua egiaztatzen du
function datuakegiaztatu(izena, email, telefonoa) {
  let erroreak = [];

  if (!validText(izena)) {
    erroreak.push("Izena ez da baliozkoa (Hizkiak bakarrik onartzen dira).");
  }
  if (izena.length > 15) {
    erroreak.push("Izen luzeegia duzu (15 karaktere gehienez ipin daitezke).");
  }
  if (!validEmail(email)) {
    erroreak.push("Email-a ez da baliozkoa (izena@domeinua.com).");
  }
  if (!validZenbakia(telefonoa)) {
    erroreak.push("Zenbakia ez da baliozkoa (9 digitu izan behar ditu).");
  }

  if (erroreak.length > 0) {
    return erroreak;
  } else {
    return null;
  }
}

// Funtzio laguntzaileak formatua egiaztatzeko
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validText(text) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}
function validZenbakia(zenbakia) {
  return /^\d{9}$/.test(zenbakia);
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("user_modify_form");
  const mezuaDiv = document.getElementById("mezua");

  // Erabiltzailearen datuak kargatu eta datuak bete
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const nan = urlParams.get("user");

    const url = nan ? `../config/show_user.php?user=${encodeURIComponent(nan)}` : `../config/show_user.php`;

    const response = await fetch(url, { credentials: 'same-origin' });
    if (!response.ok) throw new Error("Errorea datuak lortzean: HTTP " + response.status);

    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Ezin izan da erabiltzailea lortu');

    // Formularioa datuekin bete
    document.getElementById("user-id").value = data.id || "--";
    document.getElementById("user-name").value = data.nombre || "--";
    document.getElementById("user-email").value = data.email || "--";
    document.getElementById("user-dob").value = data.dob || "--";
    document.getElementById("user-phone").value = data.phone || "--";
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen datuak kargatu: " + (err.message || err));
  }

  // Formularioa bidaltzean
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = new FormData(form);
    const izena = datos.get("izena");
    const email = datos.get("email");
    const telefonoa = datos.get("telefonoa");

    // Balioak egiaztatu
    const erroreak = datuakegiaztatu(izena, email, telefonoa);
    if (erroreak) {
      mezuaDiv.textContent = "Erroreak:" + erroreak.join(" - ");
      mezuaDiv.className = "errore-mezua";
      return;
    }

    // Datuak bidali
    try {
      const response = await fetch("../config/modify_user.php", {
        method: "POST",
        body: datos
      });

      const result = await response.json();

      if (result.success) {
        // Zuzena bada
        mezuaDiv.textContent = result.message;
        mezuaDiv.className = "zuzena-mezua";

        setTimeout(() => {
          const nan = new URLSearchParams(window.location.search).get("user");
          window.location.href = `../show_user/?user=${encodeURIComponent(nan)}`;
        }, 2000);
      } else {
        // Errorea badago
        mezuaDiv.textContent = "Errorea: " + result.message;
        mezuaDiv.className = "errore-mezua";
      }
    } catch (err) {
      // Bestelako erroreak badaude
      console.error("Errorea:", err);
      mezuaDiv.textContent = "Errorea: ezin izan da datuak bidali.";
      mezuaDiv.className = "errore-mezua";
    }
  });

  // Atzera botoia
  const atzeraLink = document.getElementById("atzera_modify_user");
  if (atzeraLink) {
    atzeraLink.addEventListener("click", (e) => {
      e.preventDefault();
      const nan = new URLSearchParams(window.location.search).get("user");
      const redirectUrl = `../show_user/?user=${encodeURIComponent(nan)}`;
      window.location.href = redirectUrl;
    });
  }
});