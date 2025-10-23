function datuakegiaztatu(pIzena, pAbizenak, pDni, pZenbakia, pEmail, pDocument) {
  let errores = [];

  if (!validText(pIzena)) errores.push("El nombre no es válido");
  if (!validText(pAbizenak)) errores.push("Los apellidos no son válidos");
  if (!validDni(pDni)) errores.push("El DNI no es válido");
  if (!validZenbakia(pZenbakia)) errores.push("El número debe tener 9 dígitos");
  if (!validEmail(pEmail)) errores.push("El email no es válido");

  if (errores.length > 0) {
    window.alert("Errores:\n- " + errores.join("\n- "));
  } else {
    pDocument.formularioa.submit();
  }
}

function validDni(dni){
   if (!/^\d{8}[A-Za-z]$/.test(dni)) return false; // comprobar que sigue el formato correcto
   const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
   const zenbakiak = parseInt(dni.slice(0,8), 10);
   const dniletra = dni[8].toUpperCase();
   return letras[zenbakiak % 23] === dniletra;  
}

function validEmail(email){
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validText(text){
   return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto.trim());
}

function validZenbakia(zenbakia){
   return /^\d{9}$/.test(n.trim());
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioa");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("izena").value;
    const apellidos = nombre.split(" ").slice(1).join(" "); // si quieres separar apellidos
    const dni = document.getElementById("nan").value;
    const telefono = document.getElementById("zenbakia").value;
    const email = document.getElementById("email").value;

    datuakegiaztatu(nombre, apellidos, dni, telefono, email, form);
  });
});
