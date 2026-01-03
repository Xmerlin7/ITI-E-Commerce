import { getProducts } from "./data/products.js";
import { renderFilter } from "./renderFilter.js";
import { renderProducts } from "./renderProducts.js";
import { renderSlider } from "./renderSlider.js";

async function main() {
  try {
    const data = await getProducts();
    renderProducts(data);
    renderSlider(data);
    renderFilter(data);
  } catch (err) {
    console.error("Failed to load/render products:", err);
  }
}
main();
