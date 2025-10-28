function datuakegiaztatu(pIzena, pKostua, pBizitza, pErasoa, pMota) {
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
    const endpoint = '../config/modify_item.php';
    const title = document.getElementById('form-title');
    if (!itemName) return;

    try {
        const res = await fetch(`${endpoint}?item=${encodeURIComponent(itemName)}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        title.textContent = `KARTA EDITATU - ${itemName}`;

    } catch (err) {
        console.error('Error cargando carta:', err);
    }
}

// Asociar la función al submit del formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("modify-item-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const kostua = document.getElementById("kostua").value;
        const bizitza = document.getElementById("bizitza").value;
        const erasoa = document.getElementById("erasoa").value;
        const mota = document.getElementById("mota").value;

        if (datuakegiaztatu(kostua, bizitza, erasoa, mota)) {
            form.submit();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const item = getItemFromURL();
    loadItem(item);
});