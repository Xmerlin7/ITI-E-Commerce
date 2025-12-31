export function getCart() {
  let cartItems = localStorage.getItem("items");
  if (cartItems) return JSON.parse(cartItems);
  else return { items: {} };
}
export function addToCart(product) {
  const cart = getCart();
  if (! cart.items[product.id]) {
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
}
export function deleteFromCart(it) {}
