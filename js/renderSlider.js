let autoplayIntervalId = null;

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
  prevBtn.style.fontSize = "34px";
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "btn btn-ghost";
  nextBtn.setAttribute("aria-label", "Next slide");
  nextBtn.textContent = "›";
  nextBtn.style.fontSize = "34px";

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

  function renderCurrent() {
    const p = products[index];

    img.src = p && p.image ? p.image : "";
    img.alt = p && p.title ? String(p.title) : "Product";
    title.textContent = p && p.title ? String(p.title) : "";
    price.textContent = p && p.price != null ? `$${p.price}` : "";
    link.href = p && p.id != null ? `#product-${p.id}` : "#";
  }

  function nextSlide() {
    index = index + 1;
    if (index >= products.length) index = 0;
    renderCurrent();
  }

  function prevSlide() {
    index = index - 1;
    if (index < 0) index = products.length - 1;
    renderCurrent();
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  renderCurrent();
  // مش مهم خالص أنا عمري ما هنادي الrenderSlider مرتين
  if (autoplayIntervalId !== null) {
    clearInterval(autoplayIntervalId);
  }
  autoplayIntervalId = setInterval(nextSlide, AUTOPLAY_MS);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoplayIntervalId);
  });

  slider.addEventListener("mouseleave", () => {
    autoplayIntervalId = setInterval(nextSlide, AUTOPLAY_MS);
  });
}
