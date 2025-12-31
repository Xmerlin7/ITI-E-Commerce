import { getProducts } from "./products.js";
async function main() {
  let data = await getProducts();
  console.log(data);
}
main();
