// Karta ezabatzeko script-a
document.addEventListener("DOMContentLoaded", () => {
  // URL-tik kartaren izena lortu
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get("item");

  // HTML elementuak lortu
  const itemNameElement = document.getElementById("item-name");
  const deleteButton = document.getElementById("item_delete_submit");

  if (itemName) {
    // Kartaren izena pantailan erakutsi
    itemNameElement.textContent = itemName;

    deleteButton.addEventListener("click", async () => {
      try {
        // Karta ezabatzeko eskaera bidali
        const response = await fetch(`../config/delete_item.php?item=${encodeURIComponent(itemName)}`, {
          method: "GET",
        });

        const data = await response.json();

        if (data.success) {
          // Karta ondo ezabatu bada
          alert("Karta ondo ezabatu da.");
          window.location.href = "/";
        } else {
          // Ezabatzean errorea gertatu bada
          alert("Errorea gertatu da: " + data.error);
        }
      } catch (error) {
        // Bestelako erroreak
        alert("Errorea gertatu da: " + error.message);
      }
    });
  } else {
    // Karta izena ez badago zehaztuta
    alert("Ez da kartarik ezabatu.");
  }
});