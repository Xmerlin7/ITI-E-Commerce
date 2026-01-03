import { getProducts } from "./data/products.js";
import { updateProductsView } from "./renderFilter.js";

import { renderSlider } from "./renderSlider.js";
async function main() {
  try {
    const data = await getProducts();

    renderSlider(data);
    updateProductsView(data);
  } catch (err) {
    console.error("Failed to load/render products:", err);
  }
}
main();
