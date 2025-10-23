function datuakegiaztatu(pIzena, pAbizenak, pDni, pZenbakia, pEmail, form) {
  let errores = [];

  if (!validText(pIzena)) errores.push("El nombre no es válido");
  if (pAbizenak && !validText(pAbizenak)) errores.push("Los apellidos no son válidos");
  if (!validDni(pDni)) errores.push("El DNI no es válido");
  if (!validZenbakia(pZenbakia)) errores.push("El número debe tener 9 dígitos");
  if (!validEmail(pEmail)) errores.push("El email no es válido");

  if (errores.length > 0) {
    alert("Errores:\n- " + errores.join("\n- "));
    return false;
  } else {
    form.submit();
  }
}

function validDni(dni){
  if (!/^\d{8}[A-Za-z]$/.test(dni)) return false;
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni.slice(0,8), 10);
  const letra = dni[8].toUpperCase();
  return letras[numero % 23] === letra;  
}

function validEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validText(text){
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}

function validZenbakia(zenbakia){
  return /^\d{9}$/.test(zenbakia);
}

// Asociar la función al submit del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register_form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreCompleto = document.getElementById("izena").value;
    const dni = document.getElementById("nan").value;
    const telefono = document.getElementById("zenbakia").value;
    const email = document.getElementById("email").value;

    datuakegiaztatu(nombreCompleto, "", dni, telefono, email, form);
  });
});
