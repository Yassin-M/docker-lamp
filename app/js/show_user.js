window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("../config/get_user.php?json=1");
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    document.getElementById("user-id").textContent = data.id || "--";
    document.getElementById("user-name").textContent = data.nombre || "--";
    document.getElementById("user-email").textContent = data.email || "--";
    document.getElementById("user-dob").textContent = data.dob || "--";
    document.getElementById("user-phone").textContent = data.phone || "--";
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen profila kargatu");
  }
});
