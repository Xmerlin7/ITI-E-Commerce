import { getCart } from "./cart.js";

let cartContainer = document.getElementsByClassName("cart-container")[0];
let cartData = getCart();
let cartProducts = Object.values(cartData.items || {});
let fragment = document.createDocumentFragment();
const total = cartProducts.reduce((sum, item) => sum + (item?.price ?? 0), 0);
function renderCart() {
  if (!cartContainer) return;

  cartProducts.forEach((item) => {
    let info = document.createElement("div");
    let img = document.createElement("img");
    img.src = item?.img || item?.image || "";
    img.alt = item?.title || "Cart product";
    img.classList.add("car-img");
    let subPrice = document.createElement("p");
    subPrice.textContent = item.price;
    let itemQuantity = document.createElement("p");
    itemQuantity.textContent = item.qty;
    info.appendChild(img);
    info.appendChild(itemQuantity);
    info.appendChild(subPrice);
    fragment.appendChild(info);
  });
  let totalPriceEl = document.createElement("p");
  totalPriceEl.textContent = Math.floor(total);
  cartContainer.appendChild(fragment);
  cartContainer.appendChild(totalPriceEl);
}
renderCart();
