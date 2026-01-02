export function renderSlider(products) {
  const sliderEl = document.querySelector(".slider-container");
  sliderEl.innerHTML = "";
  const first = products[0];
  const img = document.createElement("img");
  img.src = first.image;
  sliderEl.appendChild(img);
}
