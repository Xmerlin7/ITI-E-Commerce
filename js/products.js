export async function getProducts() {
  let response = await fetch("https://fakestoreapi.com/products");
  return response.json();

}
