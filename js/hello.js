import { clearSession, getCurrentUser, getSession } from "./auth.js";
import { getCart } from "./cart.js";

const hello = document.getElementById("hello");
if (hello) {
  const user = getCurrentUser();
  if (user?.name) {
    hello.textContent = `Hi, ${user.name}`;
  } else {
    hello.textContent = "";

  }
}

const authLink = document.getElementById("authLink");
if (authLink) {
  const session = getSession();

  if (session?.email) {
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      window.location.href = "index.html";
    });
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
  }
}

function updateCartLink() {
  const cartLink = document.getElementById("cartLink");
  if (!cartLink) return;

  const cart = getCart();
  const count = Object.keys(cart?.items || {}).length;

  if (!cartLink.dataset.baseText) {
    cartLink.dataset.baseText = String(cartLink.textContent || "")
      .replace(/\s*\(\d+\)\s*$/, "")
      .trim();
  }

  cartLink.textContent =
    count > 0
      ? `${cartLink.dataset.baseText} (${count})`
      : cartLink.dataset.baseText;
}

updateCartLink();
window.addEventListener("cart:changed", updateCartLink);
window.addEventListener("storage", updateCartLink);
