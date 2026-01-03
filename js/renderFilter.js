import { renderProducts } from "./renderProducts.js";

const filterEl = document.querySelector(".filter-container");

const CATEGORY_OPTIONS = [
  { value: "men's clothing", label: "Men clothes" },
  { value: "women's clothing", label: "Women clothes" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelry" },
];

let allProducts = [];
let selectedCategories = new Set();
let searchTerm = "";

function buildFilterUI() {
  if (filterEl.querySelector(".filters")) return;

  const filterRoot = document.createElement("section");
  filterRoot.className = "filters";

  const title = document.createElement("p");
  title.className = "filters-title";
  title.textContent = "Category";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search by title";
  searchInput.className = "filters-search";
  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    updateProductsView(allProducts);
  });

  const row = document.createElement("div");
  row.className = "filters-row";

  CATEGORY_OPTIONS.forEach((opt) => {
    const chip = document.createElement("label");
    chip.className = "filter-chip";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = opt.value;

    input.addEventListener("change", () => {
      input.checked
        ? selectedCategories.add(opt.value)
        : selectedCategories.delete(opt.value);

      updateProductsView(allProducts);
    });

    const text = document.createElement("span");
    text.textContent = opt.label;

    chip.append(input, text);
    row.appendChild(chip);
  });

  const clearBtn = document.createElement("button");
  clearBtn.className = "btn filters-clear";
  clearBtn.textContent = "Clear";
  clearBtn.onclick = () => {
    selectedCategories.clear();
    row.querySelectorAll("input").forEach((i) => (i.checked = false));
    searchTerm = "";
    searchInput.value = "";
    updateProductsView(allProducts);
  };

  filterRoot.append(title, searchInput, row, clearBtn);
  filterEl.appendChild(filterRoot);
}

export function updateProductsView(products) {
  allProducts = Array.isArray(products) ? products : [];

  buildFilterUI();

  const q = String(searchTerm || "")
    .trim()
    .toLowerCase();

  const filtered = allProducts.filter((p) => {
    const inCategory =
      selectedCategories.size === 0 || selectedCategories.has(p.category);
    const titleText = String(p?.title || "").toLowerCase();
    const inSearch = q === "" || titleText.includes(q);
    return inCategory && inSearch;
  });

  renderProducts(filtered);
}
