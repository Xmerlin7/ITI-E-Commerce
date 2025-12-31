export function getCart() {
  let cartItems = localStorage.getItem("items");
  if (cartItems) return JSON.parse(cartItems);
  else return [];
}
export function addToCart(id) {
  if (id != null) {
    const cart = getCart();
    if (cart.items[id]) cart.items.qty++;
    else cart.items.qty = 1;
  } else {
    return null;
  }

  localStorage.setItem("items", JSON.stringify(cart));
}
export function deleteFromCart(it) {}
