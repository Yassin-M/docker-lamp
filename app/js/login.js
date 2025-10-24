const form = document.getElementById("login_form");
const mensajeDiv = document.createElement("div");
mensajeDiv.style.marginTop = "20px";
form.after(mensajeDiv);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = new FormData(form);

    const response = await fetch("../config/login.php", {
        method: "POST",
        body: datos
    });

    const result = await response.json();

     if(result.success){
        localStorage.setItem("userNAN", result.nan);
        mensajeDiv.textContent = "Saioa hasita!";
        mensajeDiv.style.backgroundColor = "#c8f7c5";
        mensajeDiv.style.color = "#2e7d32";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";
        mensajeDiv.style.marginTop = "10px";
    } else {
        mensajeDiv.textContent = "Error: " + result.message;
        mensajeDiv.style.backgroundColor = "#f8d7da";
        mensajeDiv.style.color = "#842029";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";
        mensajeDiv.style.marginTop = "10px";
    }
});
