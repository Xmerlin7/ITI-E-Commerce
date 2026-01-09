export function getCart() {
  let cartItems = localStorage.getItem("items");
  if (cartItems) return JSON.parse(cartItems);
  else return { items: {} };
}

function notifyCartChanged() {
  // minimal: allows navbar/cart count to update in the same tab
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart:changed"));
  }
}

export function addToCart(product) {
  const cart = getCart();
  if (!cart.items[product.id]) {
    cart.items[product.id] = {
      id: product.id,
      price: product.price,
      title: product?.title ?? "",
      img: product?.image,
      qty: 1,
    };
  } else {
    cart.items[product.id].qty++;
    cart.items[product.id].price += product.price;
  }

  localStorage.setItem("items", JSON.stringify(cart));
  notifyCartChanged();
}
export function deleteFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    delete cart.items[product.id];
    localStorage.setItem("items", JSON.stringify(cart));
    notifyCartChanged();
  }
}
export function increaseFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    const item = cart.items[product.id];
    const unitPrice = item.price / item.qty;
    item.qty++;
    item.price += unitPrice;
    localStorage.setItem("items", JSON.stringify(cart));
    notifyCartChanged();
  }
}
export function decreaseFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    const item = cart.items[product.id];
    const unitPrice = item.price / item.qty;

    if (item.qty <= 1) {
      delete cart.items[product.id];
      localStorage.setItem("items", JSON.stringify(cart));
      notifyCartChanged();
      return;
    }

    item.qty--;
    item.price -= unitPrice;
    localStorage.setItem("items", JSON.stringify(cart));
    notifyCartChanged();
  }
}
