window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("../config/get_user.php?json=1");
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    document.getElementById("user-id").value = data.id || "--";
    document.getElementById("user-name").value = data.nombre || "--";
    document.getElementById("user-email").value = data.email || "--";
    document.getElementById("user-dob").value = data.dob || "--";
    document.getElementById("user-phone").value = data.phone || "--";
  } catch (err) {
    console.error(err);
    alert("Ezin izan da erabiltzailearen datuak kargatu");
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