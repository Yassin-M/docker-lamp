window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Llama al endpoint PHP
    const response = await fetch("../config/get_user.php?json=1");
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    // Rellena los campos del HTML
    document.getElementById("user-id").textContent = data.id || "--";
    document.getElementById("user-name").textContent = data.nombre || "--";
    document.getElementById("user-email").textContent = data.email || "--";
    document.getElementById("user-dob").textContent = data.dob || "--";
    document.getElementById("user-phone").textContent = data.phone || "--";
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar el perfil del usuario");
  }
});
