window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Leer el NAN guardado en login.js (puede ser localStorage o sessionStorage)
    const nan = sessionStorage.getItem("userNAN") || localStorage.getItem("userNAN");
    console.log('modify_user: nan from storage =', nan);

    // Si no hay nan en storage, intentaremos pedir al backend que use la sesión PHP
    const url = nan ? `../config/get_user.php?nan=${encodeURIComponent(nan)}` : `../config/get_user.php`;
    console.log('modify_user: fetching', url);

    const response = await fetch(url, { credentials: 'same-origin' });
    if (!response.ok) throw new Error("Error al obtener datos: HTTP " + response.status);

    const data = await response.json();
    console.log('modify_user: response json =', data);
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
  });
});