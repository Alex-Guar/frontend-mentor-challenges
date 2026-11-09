import './style.scss'

const scrollLeftBtn = document.querySelector(".carousel-navigation--left");
const scrollRightBtn = document.querySelector(".carousel-navigation--right");
const ImagesCarousel = document.querySelector(".carousel-items");
const ArticlesCarousel = document.querySelector(".products-lists");
const buy = document.getElementsByClassName("buy");
const buyArray = Array.from(buy);
const mediaQueryLapton = window.matchMedia("(min-width: 48em)");
const navigationItems = document.querySelector(".navigation-list");
const containerHeader = document.querySelector(".navigation.l-container");
const asideContainer = document.querySelector(".aside-container");
const navationLinks = Array.from(document.getElementsByClassName("navigation-link"))

function moveNavagiationItems(e) {
  if (e.matches === false) {
    asideContainer.appendChild(navigationItems);
  } else {
    containerHeader.appendChild(navigationItems);
  }
}

moveNavagiationItems(mediaQueryLapton);


mediaQueryLapton.addEventListener("change", moveNavagiationItems);

const hamburgerBtn = document.querySelector(".navigation-hamburger");
const filterBlackContent = document.querySelector(".grid-content-filter");
const closeAsideBtn = document.querySelector(".aside-close");

function showFilterBlackContent() {
  const className = filterBlackContent.classList;
  className.add("is-active-content-filter")
  className.add("fade-in")
  className.remove("fade-out");
}

function hideFilterBlackContent() {
  const className = filterBlackContent.classList;
  className.remove("fade-in");
  className.add("fade-out")
  setTimeout(() => {
    className.remove("is-active-content-filter")
  }, 1000);
}

function handledHumber() {
  showFilterBlackContent();
}

hamburgerBtn.addEventListener("click", handledHumber);

function handledCloseAside() {
  hideFilterBlackContent();
}

closeAsideBtn.addEventListener("click", handledCloseAside)

async function scrollToLeft() {
  console.log("move-left");
  const moveResult = await ImagesCarousel.scrollBy(-100, 0);
  const ArticileResult = await ArticlesCarousel.scrollBy(-100, 0);
}
async function scrollToRight() {
  console.log("move-Right");
  const moveResult = await ImagesCarousel.scrollBy(100, 0);
  const ArticileResult = await ArticlesCarousel.scrollBy(100, 0);
}
scrollLeftBtn.addEventListener("click", scrollToLeft);
scrollRightBtn.addEventListener("click", scrollToRight);

function activeFocus(indexELement) {
  for (const buyElement of buyArray) {
    buyElement.className = "buy";
  }
  buyArray[indexELement].className = "buy isActive"
}


function handleScrollTouch() {
  const windownWidth = ImagesCarousel.clientWidth;
  const longScroll = ImagesCarousel.scrollLeft;
  const imageIndex = longScroll / windownWidth;
  ArticlesCarousel.scrollLeft = ArticlesCarousel.clientWidth * imageIndex;
  activeFocus(imageIndex);
}
ImagesCarousel.addEventListener("scrollend", handleScrollTouch)

navationLinks.forEach((linkBtn) => linkBtn.addEventListener("click",hideFilterBlackContent))
