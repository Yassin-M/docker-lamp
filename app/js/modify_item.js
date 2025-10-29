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

function validText(text) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(text);
}

function validNumber(number) {
    return /^\d+$/.test(number);
}

function validKostua(kostua) {
    return /^[1-9]$/.test(kostua);
}

function getItemFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('item');
}

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
        console.error('Error cargando carta:', err);
        alert("Errorea itema kargatzean: " + (err.message || err));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("item_modify_form");

    const mensajeDiv = document.createElement("div");
    mensajeDiv.style.marginTop = "20px";
    form.after(mensajeDiv);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const kostua = document.getElementById("kostua").value;
        const bizitza = document.getElementById("bizitza").value;
        const erasoa = document.getElementById("erasoa").value;
        const mota = document.getElementById("mota").value;

        if (datuakegiaztatu(kostua, bizitza, erasoa, mota)) {
            try {
                const datos = new FormData(form);
                const response = await fetch(`../config/modify_item.php?item=${encodeURIComponent(getItemFromURL())}`, {
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
        }
    });

    const atzeraLink = document.getElementById("atzera_modify_item");
    if (atzeraLink) {
        atzeraLink.addEventListener("click", (e) => {
            e.preventDefault();
            const redirectUrl = `../show_item/?item=${encodeURIComponent(getItemFromURL())}`;
            window.location.href = redirectUrl;
        });
    }

    const item = getItemFromURL();
    loadItem(item);
});