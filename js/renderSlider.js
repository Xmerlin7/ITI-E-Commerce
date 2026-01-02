export function renderSlider(products) {
  const sliderEl = document.querySelector(".slider-container");
  if (!sliderEl) return;
  if (!Array.isArray(products) || products.length === 0) return;

  sliderEl.innerHTML = "";

  const slider = document.createElement("section");
  slider.className = "slider";

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "btn btn-ghost";
  prevBtn.setAttribute("aria-label", "Previous slide");
  prevBtn.textContent = "‹";
  prevBtn.style.fontSize = "40px"

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "btn btn-ghost";
  nextBtn.setAttribute("aria-label", "Next slide");
  nextBtn.textContent = "›";
  nextBtn.style.fontSize = "40px"
  const link = document.createElement("a");
  link.className = "slider-view";
  link.href = "#";

  const img = document.createElement("img");
  img.className = "slider-img";
  img.alt = "";

  const meta = document.createElement("div");
  meta.className = "slider-meta";

  const title = document.createElement("p");
  title.className = "slider-title";

  const price = document.createElement("p");
  price.className = "slider-price";

  meta.appendChild(title);
  meta.appendChild(price);
  link.appendChild(img);
  link.appendChild(meta);

  slider.appendChild(prevBtn);
  slider.appendChild(link);
  slider.appendChild(nextBtn);
  sliderEl.appendChild(slider);

  let index = 0;

  const AUTOPLAY_MS = 3500;

  const show = (nextIndex) => {
    const len = products.length;
    index = ((nextIndex % len) + len) % len;

    const p = products[index];
    img.src = p?.image ?? "";
    img.alt = p?.title ? String(p.title) : "Product";
    title.textContent = p?.title ? String(p.title) : "";
    price.textContent = p?.price != null ? `$${p.price}` : "";

    const id = p?.id;
    link.href = id != null ? `#product-${id}` : "#";
  };

  prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn.addEventListener("click", () => show(index + 1));

  show(0);

  if (autoplayIntervalId !== null) {
    clearInterval(autoplayIntervalId);
  }
  autoplayIntervalId = setInterval(nextSlide, AUTOPLAY_MS);
}