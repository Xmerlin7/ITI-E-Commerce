import {
  getCart,
  clearCart,
  deleteFromCart,
  decreaseFromCart,
  increaseFromCart,
} from "./cart.js";
import { getSession } from "./auth.js";

const buyBtn = document.getElementById("buyBtn");
const orderMessage = document.getElementById("orderMessage");

buyBtn?.addEventListener("click", () => {
  if (buyBtn?.disabled) return;

  const session = getSession();
  if (!session?.email) {
    window.location.href = "login.html";
    return;
  }

  const shippedText = "Your order has been shipped";
  clearCart();
  renderCart();

  if (orderMessage) {
    orderMessage.textContent = shippedText;
    orderMessage.hidden = false;
  } else {
    alert(shippedText);
  }
});

function renderCart() {
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  if (!cartContainer) return;
  cartContainer.innerHTML = "";
  let cartData = getCart();
  let cartProducts = Object.values(cartData.items || {});
  let fragment = document.createDocumentFragment();
  const total = cartProducts.reduce((sum, item) => sum + (item?.price ?? 0), 0);

  if (buyBtn) buyBtn.disabled = cartProducts.length === 0 || total <= 0;
  if (orderMessage) orderMessage.hidden = true;

  cartProducts.forEach((item) => {
    let info = document.createElement("div");
    info.classList.add("cart-item");
    let img = document.createElement("img");
    img.src = item?.img || item?.image || "";
    img.alt = item?.title || "Cart product";
    img.classList.add("cart-img");
    let subPrice = document.createElement("p");
    subPrice.classList.add("cart-price");
    subPrice.textContent = item.price;
    let itemQuantity = document.createElement("p");
    itemQuantity.classList.add("cart-qty");
    itemQuantity.textContent = item.qty;
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("cart-actions");
    let deleteBtn = document.createElement("button");
    let increaseBtn = document.createElement("button");
    let decreaseBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    increaseBtn.textContent = "+";
    decreaseBtn.textContent = "-";

    deleteBtn.classList.add("btn", "btn-danger");
    increaseBtn.classList.add("btn", "btn-ghost");
    decreaseBtn.classList.add("btn", "btn-ghost");

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
  totalPriceEl.classList.add("cart-total");
  totalPriceEl.textContent = Math.floor(total);
  cartContainer.appendChild(fragment);
  cartContainer.appendChild(totalPriceEl);
}
renderCart();
