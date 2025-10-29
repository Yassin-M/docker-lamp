window.addEventListener("DOMContentLoaded", async () => {
  try {
    // URL-tik erabiltzailearen NAN-a lortu
    const urlParams = new URLSearchParams(window.location.search);
    const nan = urlParams.get("user");

    // Erabiltzailearen datuak zerbitzaritik lortu
    const response = await fetch(`../config/show_user.php?user=${encodeURIComponent(nan)}`);
    if (!response.ok) throw new Error("Errorea datuak lortzean");

    const data = await response.json();

    // Erabiltzailearen datuak erakutsi
    document.getElementById("user-id").textContent = data.id || "--";
    document.getElementById("user-name").textContent = data.nombre || "--";
    document.getElementById("user-email").textContent = data.email || "--";
    document.getElementById("user-dob").textContent = data.dob || "--";
    document.getElementById("user-phone").textContent = data.phone || "--";

    // Editazeko botoia konfiguratu
    const btnEditProfile = document.getElementById("btn-edit-profile");
    if (nan && btnEditProfile) {
      btnEditProfile.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `/modify_user?user=${encodeURIComponent(nan)}`;
      });
    }
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen profila kargatu");
  }
});
