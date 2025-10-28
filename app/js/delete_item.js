document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get("item");
  const itemNameElement = document.getElementById("item-name");
  const deleteButton = document.getElementById("delete-btn");

  if (itemName) {
    itemNameElement.textContent = itemName;

    deleteButton.addEventListener("click", () => {
      fetch(`../config/delete_item.php?item=${encodeURIComponent(itemName)}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Elementua ondo ezabatu da.");
            window.location.href = "/";
          } else {
            alert("Errorea gertatu da: " + data.error);
          }
        })
        .catch((error) => {
          alert("Errorea gertatu da: " + error.message);
        });
    });
  } else {
    alert("Ez da elementurik zehaztu.");
    window.location.href = "/";
  }
});