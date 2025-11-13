// Datuen formatua egiaztatu
function datuakegiaztatu(pKostua, pBizitza, pErasoa, pMota) {
    let erroreak = [];

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

// URL-tik kartaren izena lortu
function getItemFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('item');
}

// Kartaren datuak kargatu
async function loadItem(itemName) {
    const endpoint = '../config/show_item.php';
    const title = document.getElementById('form-title');
    if (!itemName) return;

    try {
        const res = await fetch(`${endpoint}?item=${encodeURIComponent(itemName)}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Itema ezin izan da kargatu');

        // Titulua aldatu
        title.textContent = `KARTA EDITATU - ${itemName}`;

        // Formularioaren sarrerak datuekin bete
        document.getElementById("kostua").value = data.kostua || '';
        document.getElementById("bizitza").value = data.bizitza || '';
        document.getElementById("erasoa").value = data.erasoa || '';
        document.getElementById("mota").value = data.mota || '';

    } catch (err) {
        console.error('Errorea karta kargatzean:', err);
        alert("Errorea karta kargatzean: " + (err.message || err));
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("item_modify_form");
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

        const kostua = document.getElementById("kostua").value;
        const bizitza = document.getElementById("bizitza").value;
        const erasoa = document.getElementById("erasoa").value;
        const mota = document.getElementById("mota").value;

        // Formatua ez bada egokia, ezer ez egin
        if (!datuakegiaztatu(kostua, bizitza, erasoa, mota)) {
            return;
        }

        try {
            const datos = new FormData(form);
            const response = await fetch(`../config/modify_item.php?item=${encodeURIComponent(getItemFromURL())}`, {
                method: "POST",
                body: datos
            });

            const result = await response.json();

            if (result.success) {
                // Ondo badago
                mezuaDiv.textContent = result.message;
                mezuaDiv.className = "zuzena-mezua";

                setTimeout(() => {
                    window.location.href = `../show_item/?item=${encodeURIComponent(getItemFromURL())}`;
                }, 2000);
            } else {
                // Errorea badago
                mezuaDiv.textContent = "Errorea: " + result.message;
                mezuaDiv.className = "errore-mezua";
            }
        } catch (err) {
            console.error("Errorea:", err);
            mezuaDiv.textContent = "Errorea: ezin izan da datuak bidali.";
            mezuaDiv.className = "errore-mezua";
        }
    });

    // Atzera botoia
    const atzeraLink = document.getElementById("atzera_modify_item");
    if (atzeraLink) {
        atzeraLink.addEventListener("click", (e) => {
            e.preventDefault();
            const redirectUrl = `../show_item/?item=${encodeURIComponent(getItemFromURL())}`;
            window.location.href = redirectUrl;
        });
    }

    // Kartaren datuak kargatu
    const item = getItemFromURL();
    loadItem(item);
});