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
                // NAN-a sessionStorage-an gorde
                sessionStorage.setItem("userNAN", result.nan);
                // Erakutsi NAN-a interfazean
                const sessionEl = document.getElementById('saioa_hasita');
                if(sessionEl){
                    sessionEl.textContent = 'NAN: ' + result.nan;
                    sessionEl.classList.add('session-logged');
                }
        mensajeDiv.textContent = "Saioa hasita!";
        mensajeDiv.style.backgroundColor = "#c8f7c5";
        mensajeDiv.style.color = "#2e7d32";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";
        mensajeDiv.style.marginTop = "10px";
    } else {
                mensajeDiv.textContent = "Error: " + result.message;
                // login-a huts egin badu, ezabatu NAN-a
                try{
                    localStorage.removeItem('userNAN');
                    sessionStorage.removeItem('userNAN');
                } catch(e){ /* ignore */ }
                const sessionEl = document.getElementById('saioa_hasita');
                if(sessionEl){
                    sessionEl.textContent = '';
                    sessionEl.classList.remove('session-logged');
                }
        mensajeDiv.style.backgroundColor = "#f8d7da";
        mensajeDiv.style.color = "#842029";
        mensajeDiv.style.padding = "10px";
        mensajeDiv.style.borderRadius = "8px";
        mensajeDiv.style.textAlign = "center";
        mensajeDiv.style.marginTop = "10px";
    }
});
