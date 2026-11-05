import './style.scss'

const scrollLeftBtn = document.querySelector(".carousel-navigation--left");
const scrollRightBtn = document.querySelector(".carousel-navigation--right");
const carousel = document.querySelector(".carousel-items");

const ArticlesCarousel = document.querySelector(".products-lists");

async function scrollToLeft() {
  console.log("move-left");
  const moveResult = await carousel.scrollBy(-100, 0);
  const ArticileResult = await ArticlesCarousel.scrollBy(-100, 0);
}
async function scrollToRight() {
  console.log("move-Right");
  const moveResult = await carousel.scrollBy(100, 0);
  const ArticileResult = await ArticlesCarousel.scrollBy(100, 0);
}
scrollLeftBtn.addEventListener("click", scrollToLeft);
scrollRightBtn.addEventListener("click", scrollToRight);

