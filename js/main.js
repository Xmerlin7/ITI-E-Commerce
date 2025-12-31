import { getProducts } from "./products.js";
async function allProducts() {
  let data = await getProducts();
  console.log(data);
}
allProducts();
