const items = ["Apple", "Banana", "Orange", "Grape", "Mango"];
const itemListEl = document.querySelector("#itemList");

function displayItems() {
  itemListEl.innerHTML = "";
  for (let item of items) {
    itemListEl.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
  }
}

displayItems();
