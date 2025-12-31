import { getProducts } from "./products.js";
import { renderProducts } from "./renderProducts.js";
async function main() {
  let data = await getProducts();
  renderProducts(data);
}
main();
