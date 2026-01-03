import { renderProducts } from "./renderProducts.js";

let filterEl = document.querySelector(".filter-container");

const CATEGORY_OPTIONS = [
  { value: "men's clothing", label: "Men clothes" },
  { value: "women's clothing", label: "Women clothes" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelry" },
];

let allProducts = [];
let selectedCategories = new Set();

let uiBuilt = false;

function ensureFilterUI() {
  if (!filterEl) filterEl = document.querySelector(".filter-container");
  if (!filterEl) return;
  if (uiBuilt) return;

  filterEl.innerHTML = "";

  const filterRoot = document.createElement("section");
  filterRoot.className = "filters";

  const title = document.createElement("p");
  title.className = "filters-title";
  title.textContent = "Category";

  const row = document.createElement("div");
  row.className = "filters-row";

  CATEGORY_OPTIONS.forEach((opt) => {
    const chip = document.createElement("label");
    chip.className = "filter-chip";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = opt.value;
    input.checked = selectedCategories.has(opt.value);

    input.addEventListener("change", (e) => {
      const value = e.target.value;
      if (e.target.checked) selectedCategories.add(value);
      else selectedCategories.delete(value);
      updateProductsView(allProducts);
    });

    const text = document.createElement("span");
    text.textContent = opt.label;

    chip.appendChild(input);
    chip.appendChild(text);
    row.appendChild(chip);
  });

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "btn";
  clearBtn.textContent = "Clear";
  clearBtn.addEventListener("click", () => {
    selectedCategories.clear();
    const inputs = filterRoot.querySelectorAll('input[type="checkbox"]');
    inputs.forEach((input) => {
      input.checked = false;
    });
    updateProductsView(allProducts);
  });

  const actions = document.createElement("div");
  actions.className = "filters-actions";
  actions.appendChild(clearBtn);

  filterRoot.appendChild(title);
  filterRoot.appendChild(row);
  filterRoot.appendChild(actions);
  filterEl.appendChild(filterRoot);

  uiBuilt = true;
}

export function updateProductsView(products) {
  allProducts = Array.isArray(products) ? products : [];
  ensureFilterUI();

  if (selectedCategories.size === 0) {
    renderProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(
    (p) => p && selectedCategories.has(p.category)
  );
  renderProducts(filtered);
}
