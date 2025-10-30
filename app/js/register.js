// Datuen formatua egiaztatu
function datuakegiaztatu(izena, nan, zenbakia, email, data) {
  let errorea = false;
  let mezuak = [];

  // Aurreko erroreak garbitu
  document.getElementById("error-izena").textContent = "";
  document.getElementById("error-nan").textContent = "";
  document.getElementById("error-zenbaki").textContent = "";
  document.getElementById("error-email").textContent = "";
  document.getElementById("error-data").textContent = "";

  if (!validText(izena)) {
    mezuak.push("Izena ez da baliozkoa (Ezin dituzu zenbakiak ipini).");
  }
  if (izena.length > 15) {
    mezuak.push("Izen luzeegia duzu (15 karaktere gehienez ipin daitezke).");
  }
  if (mezuak.length > 0) {
    document.getElementById("error-izena").textContent = mezuak.join(" ");
    errorea = true;
  }
  if (!validDni(nan)) {
    document.getElementById("error-nan").textContent = "NAN-a ez da baliozkoa (Gogoratu: NAN batek 8 zenbaki eta letra 1 ditu eta letra baliozkoa izan behar da).";
    errorea = true;
  }
  if (!validZenbakia(zenbakia)) {
    document.getElementById("error-zenbaki").textContent = "Zenbakia ez da baliozkoa (Gogoratu: telefono zenbaki batek 9 digitu izan behar ditu).";
    errorea = true;
  }
  if (!validEmail(email)) {
    document.getElementById("error-email").textContent = "email-a ez da baliozkoa (izena@domeinua.com).";
    errorea = true;
  }
  if (!validDate(data)) {
    document.getElementById("error-data").textContent = "Data ez da baliozkoa. UUUU-HH-EE formatua erabili eta data erreala sartu.";
    errorea = true;
  }

  if (errorea) {
    return false;
  } else {
    return true;
  }
}

// Funtzio laguntzaileak formatua egiaztatzeko
function validDni(dni) {
  if (!/^\d{8}[A-Za-z]$/.test(dni)) return false;
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni.slice(0, 8), 10);
  const letra = dni[8].toUpperCase();
  return letras[numero % 23] === letra;
}
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validText(text) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}
function validZenbakia(zenbakia) {
  return /^\d{9}$/.test(zenbakia);
}
function validDate(data) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  if (!datePattern.test(data)) return false;

  const [year, month, day] = data.split("-").map(Number);
  const date = new Date(year, month - 1, day); // Meses en JavaScript van de 0 a 11
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register_form");
  const mezuaDiv = document.getElementById("mezua");

  // Formularioa bidaltzean
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const izena = document.getElementById("izena").value;
    const nan = document.getElementById("nan").value;
    const zenbakia = document.getElementById("zenbakia").value;
    const email = document.getElementById("email").value;
    const data = document.getElementById("data").value;

    // Formatua ez bada egokia, ezer ez egin
    if (!datuakegiaztatu(izena, nan, zenbakia, email, data)) {
      return;
    }

    const datuak = new FormData(form);

    try {
      // Datuak bidali datu-basera
      const response = await fetch("../config/register.php", {
        method: "POST",
        body: datuak,
      });

      const result = await response.json();

      if (result.success) {
        // Ondo badago
        mezuaDiv.textContent = "Erregistroa burutu da!";
        mezuaDiv.className = "zuzena-mezua";

        // Bueltatu hasierako orrira
        setTimeout(() => {
          window.location.href = "../";
        }, 2000);
      } else {
        // Errorea badago
        mezuaDiv.textContent = "Errorea: " + result.message;
        mezuaDiv.className = "errore-mezua";
      }
    } catch (error) {
      // Bestelako erroreak badaude
      console.error("Errorea:", error);
      mezuaDiv.textContent = "Errorea: ezin izan da zerbitzariarekin konektatu.";
      mezuaDiv.className = "errore-mezua";
    }
  });
});