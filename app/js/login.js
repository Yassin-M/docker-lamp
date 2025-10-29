document.addEventListener("DOMContentLoaded", () => {
    // HTML-tik elementuak hartu
    const form = document.getElementById("login_form");
    const mezuaDiv = document.getElementById("mezua");

    // Datuak bidaltzean:
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datuak = new FormData(form);

        try {
            // Login eskaera bidali
            const response = await fetch("../config/login.php", {
                method: "POST",
                body: datuak,
            });

            const result = await response.json();

            if (result.success) {
                sessionStorage.setItem("userNAN", result.nan);   // NAN-a sessionStorage-an gorde
                mezuaDiv.textContent = "Saioa hasita!";
                mezuaDiv.className = "zuzena-mezua";

                // Bueltatu hasierako orrira
                setTimeout(() => {
                window.location.href = "../";
                }, 2000);
            } else {
                // Login-a ez bada zuzena
                mezuaDiv.textContent = "Errorea: " + result.message;
                mezuaDiv.className = "errore-mezua";

                // NAN-a ezabatu
                try {
                    localStorage.removeItem("userNAN");
                    sessionStorage.removeItem("userNAN");
                } catch (e) {
                    console.error("Errorea NAN-a ezabatzean:", e);
                }
            }
        } catch (error) {
            // Sareko erroreak edo bestelakoak
            console.error("Errorea:", error);
            mezuaDiv.textContent = "Errorea: ezin izan da zerbitzariarekin konektatu.";
            mezuaDiv.className = "errore-mezua";
        }
    });
});