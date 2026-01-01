import {
  getCart,
  deleteFromCart,
  decreaseFromCart,
  increaseFromCart,
} from "./cart.js";

function renderCart() {
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  if (!cartContainer) return;
  cartContainer.innerHTML = ""
  let cartData = getCart();
  let cartProducts = Object.values(cartData.items || {});
  let fragment = document.createDocumentFragment();
  const total = cartProducts.reduce((sum, item) => sum + (item?.price ?? 0), 0);
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
    let buttonsDiv = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let increaseBtn = document.createElement("button");
    let decreaseBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    increaseBtn.textContent = "+";
    decreaseBtn.textContent = "-";
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(increaseBtn);
    buttonsDiv.appendChild(decreaseBtn);
    info.appendChild(img);
    info.appendChild(itemQuantity);
    info.appendChild(subPrice);
    fragment.appendChild(info);
    fragment.appendChild(buttonsDiv);
    deleteBtn.addEventListener("click", () => {
      deleteFromCart(item);
      renderCart();
    });
    increaseBtn.addEventListener("click", () => {
      increaseFromCart(item);
      renderCart();
    });
    decreaseBtn.addEventListener("click", () => {
      decreaseFromCart(item);
      renderCart();
    });
  });
  let totalPriceEl = document.createElement("p");
  totalPriceEl.textContent = Math.floor(total);
  cartContainer.appendChild(fragment);
  cartContainer.appendChild(totalPriceEl);
}
renderCart();
