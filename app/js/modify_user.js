function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validText(text) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}

function validZenbakia(zenbakia) {
  return /^\d{9}$/.test(zenbakia);
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const nan = urlParams.get("user");

    const url = nan ? `../config/show_user.php?user=${encodeURIComponent(nan)}` : `../config/show_user.php`;

    const response = await fetch(url, { credentials: 'same-origin' });
    if (!response.ok) throw new Error("Error al obtener datos: HTTP " + response.status);

    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'No se obtuvo usuario');

    document.getElementById("user-id").value = data.id || "--";
    document.getElementById("user-name").value = data.nombre || "--";
    document.getElementById("user-email").value = data.email || "--";
    document.getElementById("user-dob").value = data.dob || "--";
    document.getElementById("user-phone").value = data.phone || "--";
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen datuak kargatu: " + (err.message || err));
  }

  const form = document.getElementById("modify-user-form");


  const mensajeDiv = document.createElement("div");
  mensajeDiv.style.marginTop = "20px";
  form.after(mensajeDiv);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = new FormData(form);

    if (validText(datos.get("izena")) && validEmail(datos.get("email")) && validZenbakia(datos.get("telefonoa")) && datos.get("izena").length <= 15) {
      try {
        const response = await fetch("../config/modify_user.php", {
          method: "POST",
          body: datos
        }); 
      const result = await response.json();

      mensajeDiv.style.padding = "10px";
      mensajeDiv.style.borderRadius = "8px";
      mensajeDiv.style.textAlign = "center";
      mensajeDiv.style.fontWeight = "bold";
      mensajeDiv.style.width = "fit-content";
      mensajeDiv.style.margin = "20px auto";
      mensajeDiv.style.backgroundColor = result.success ? "#c8f7c5" : "#f7c5c5";
      mensajeDiv.style.color = result.success ? "#2e7d32" : "#7d2e2e";
      mensajeDiv.textContent = result.message;

      } catch (err) {
        console.error("Error:", err);
        mensajeDiv.style.backgroundColor = "#f7c5c5";
        mensajeDiv.style.color = "#7d2e2e";
        mensajeDiv.textContent = "Errorea datuak bidaltzean.";
      }
    } else {
      const izenaVal = datos.get("izena");
      const emailVal = datos.get("email");
      const telefonoVal = datos.get("telefonoa");

      const failed = [];
      if (!validText(izenaVal)) failed.push(`Mesedez, sartu baliozko izen bat`);
      if (!validEmail(emailVal)) failed.push(`Mesedez, sartu baliozko email bat`);
      if (!validZenbakia(telefonoVal)) failed.push(`Mesedez, sartu baliozko telefonoa`);
      if (izenaVal.length > 15) failed.push("Mesedez, sartu izen labur bat (15 karaktere gehienez)");

      mensajeDiv.style.padding = "10px";
      mensajeDiv.style.borderRadius = "8px";
      mensajeDiv.style.textAlign = "center";
      mensajeDiv.style.fontWeight = "bold";
      mensajeDiv.style.width = "fit-content";
      mensajeDiv.style.margin = "20px auto";
      mensajeDiv.style.backgroundColor = "#f7c5c5";
      mensajeDiv.style.color = "#7d2e2e";
      mensajeDiv.textContent = "Erroreak: " + (failed.length ? failed.join(" ; ") : "Balioak ok.");
     }
  });
});