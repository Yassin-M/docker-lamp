// Datuen formatua egiaztatzen du
function datuakegiaztatu(pIzena, pKostua, pBizitza, pErasoa, pMota) {
    let erroreak = [];

    if (!validText(pIzena)) erroreak.push("Izena ez da onargarria");
    if (!validKostua(pKostua)) erroreak.push("Kostua ez da onargarria (1-9 artean egon behar)");
    if (!validNumber(pBizitza)) erroreak.push("Bizitza ez da onargarria");
    if (!validNumber(pErasoa)) erroreak.push("Erasoa ez da onargarria");
    if (!validText(pMota)) erroreak.push("Mota ez da onargarria");

    if (erroreak.length > 0) {
        alert("Erroreak:\n- " + erroreak.join("\n- "));
        return false;
    } else {
        return true;
    }
}

// Funtzio laguntzaileak formatua egiaztatzeko
function validText(text) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}
function validNumber(number) {
    return /^\d+$/.test(number);
}  
function validKostua(kostua) {
    return /^[1-9]$/.test(kostua);
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("item_add_form");
    const mezuaDiv = document.getElementById("mezua");
    const csrfInput = form.querySelector('input[name="csrf_token"]');

    try {
        // CSRF tokena eskuratu
        const response = await fetch("../config/csrf.php");
        const data = await response.json();

        if (data.csrf_token) {
            csrfInput.value = data.csrf_token; // CSRF tokena formularioan ezarri
        } else {
            console.error("CSRF tokena eskuratzea ezinezkoa izan da.");
        }
    } catch (error) {
        console.error("Errorea CSRF tokena eskuratzean:", error);
    }

    // Formularioa bidaltzean
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const izena = document.getElementById("izena").value;
        const kostua = document.getElementById("kostua").value;
        const bizitza = document.getElementById("bizitza").value;
        const erasoa = document.getElementById("erasoa").value;
        const mota = document.getElementById("mota").value;

        // Formatua ez bada egokia, ezer ez egin
        if (!datuakegiaztatu(izena, kostua, bizitza, erasoa, mota)) {
            return;
        }

        const datuak = new FormData(form);

        try {
            // Datuak bidali datu-basera
            const response = await fetch("../config/add_item.php", {
                method: "POST",
                body: datuak,
            });

            const result = await response.text();

            if (response.ok) {
                // Ondo badago
                mezuaDiv.textContent = "Elementua ondo gehitu da!";
                mezuaDiv.className = "zuzena-mezua";
                
                // Bueltatu hasierako orrira
                setTimeout(() => {
                window.location.href = "../";
                }, 2000);
            } else {
                // Errorea badago
                mezuaDiv.textContent = "Errorea: " + result;
                mezuaDiv.className = "errore-mezua";
            }
        } catch (error) {
            // Bestelako erroreak badaude
            console.error("Errorea:", error);
            mezuaDiv.textContent = "Errorea: ezin izan da zerbitzariarekin konektatu.";
            mezuaDiv.className = "errore-mezua";
        }
    });
});

