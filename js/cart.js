export function getCart() {
  let cartItems = localStorage.getItem("items");
  if (cartItems) return JSON.parse(cartItems);
  else return { items: {} };
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
}
export function deleteFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    delete cart.items[product.id];
    localStorage.setItem("items", JSON.stringify(cart));
  }
}
export function increaseFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    const item = cart.items[product.id];
    const unitPrice = item.qty ? item.price / item.qty : 0;
    item.qty++;
    item.price += unitPrice;
    localStorage.setItem("items", JSON.stringify(cart));
  }
}
export function decreaseFromCart(product) {
  let cart = getCart();
  if (cart.items[product.id]) {
    const item = cart.items[product.id];
    const unitPrice = item.qty ? item.price / item.qty : 0;

    if (item.qty <= 1) {
      delete cart.items[product.id];
      localStorage.setItem("items", JSON.stringify(cart));
      return;
    }

    item.qty--;
    item.price -= unitPrice;
    localStorage.setItem("items", JSON.stringify(cart));
  }
}
