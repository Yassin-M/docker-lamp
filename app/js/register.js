document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register_form");
  const mensajeDiv = document.createElement("div");
  mensajeDiv.style.marginTop = "20px";
  form.after(mensajeDiv);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreCompleto = document.getElementById("izena").value;
    const dni = document.getElementById("nan").value;
    const telefono = document.getElementById("zenbakia").value;
    const email = document.getElementById("email").value;

    const errores = [];
    if (!validText(nombreCompleto)) errores.push("El nombre no es válido");
    if (!validDni(dni)) errores.push("El DNI no es válido");
    if (!validZenbakia(telefono)) errores.push("El número debe tener 9 dígitos");
    if (!validEmail(email)) errores.push("El email no es válido");

    if (errores.length > 0) {
      mensajeDiv.textContent = "Errores:\n- " + errores.join("\n- ");
      mensajeDiv.style.backgroundColor = "#f8d7da";
      mensajeDiv.style.color = "#842029";
      mensajeDiv.style.padding = "10px";
      mensajeDiv.style.borderRadius = "8px";
      mensajeDiv.style.textAlign = "center";
      return;
    }

    const datos = new FormData(form);

    try {
      const response = await fetch("../config/register.php", {
        method: "POST",
        body: datos,
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("userNAN", result.nan);

        mensajeDiv.textContent = "Erregistroa burutu da!";
        mensajeDiv.style.backgroundColor = "#c8f7c5";
        mensajeDiv.style.color = "#2e7d32";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";

        setTimeout(() => {
          window.location.href = "../";
        }, 2000);
      } else {
        mensajeDiv.textContent = "Errorea: " + result.message;
        mensajeDiv.style.backgroundColor = "#f8d7da";
        mensajeDiv.style.color = "#842029";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      mensajeDiv.textContent = "Errorea: ezin izan da zerbitzariarekin konektatu.";
      mensajeDiv.style.backgroundColor = "#f8d7da";
      mensajeDiv.style.color = "#842029";
      mensajeDiv.style.padding = "10px";
      mensajeDiv.style.borderRadius = "8px";
      mensajeDiv.style.textAlign = "center";
    }
  });
});

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