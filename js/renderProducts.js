import { addToCart } from "./cart.js";

export function renderProducts(data) {
  const productsContainer = document.querySelector(".product-container");
  if (!productsContainer) {
    throw new Error("Missing element: .product-container (check index.html)");
  }

  if (!Array.isArray(data)) {
    throw new TypeError("renderProducts expected an array");
  }

  productsContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    if (product?.id != null) card.dataset.id = String(product.id);

    const img = document.createElement("img");
    img.classList.add("product-img");
    img.src = product?.image ?? "";
    img.alt = product?.title ? String(product.title) : "Product image";
    card.appendChild(img);

    const info = document.createElement("div");
    info.classList.add("product-info");

    const name = document.createElement("p");
    name.classList.add("product-title");
    name.textContent = product?.title ? String(product.title) : "";

    const category = document.createElement("p");
    category.classList.add("product-category");
    category.textContent = product?.category ? String(product.category) : "";

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = product?.price != null ? `$${product.price}` : "";

    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = product?.description
      ? String(product.description)
      : "";

    info.appendChild(name);
    info.appendChild(category);
    info.appendChild(price);
    info.appendChild(description);
    card.appendChild(info);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("product-add", "btn", "btn-primary");

    addToCartBtn.addEventListener("click", (e) => {
      addToCart(product);
    });

    card.appendChild(addToCartBtn);
    fragment.appendChild(card);
  });
  productsContainer.appendChild(fragment);
}
