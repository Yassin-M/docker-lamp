window.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const nan = urlParams.get("user");

    const response = await fetch(`../config/show_user.php?user=${encodeURIComponent(nan)}`);
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    document.getElementById("user-id").textContent = data.id || "--";
    document.getElementById("user-name").textContent = data.nombre || "--";
    document.getElementById("user-email").textContent = data.email || "--";
    document.getElementById("user-dob").textContent = data.dob || "--";
    document.getElementById("user-phone").textContent = data.phone || "--";

    const btnEditProfile = document.getElementById('btn-edit-profile');

    if (nan && btnEditProfile) {
      btnEditProfile.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `/modify_user?user=${encodeURIComponent(nan)}`;
      });
    }
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen profila kargatu");
  }
});
