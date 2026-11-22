const carousel = document.getElementById("descriptions-carousel");
const carouselItems = Array.from(document.getElementsByClassName("feature-card"));
const handledItem = Array.from(document.getElementsByClassName("feature-link"));


const ReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


const handledQueryMotion = e => {
  if (e.matches) {
    return true;
  } else {
    return false;
  }
};

let isActivatedReduceMotion = handledQueryMotion(ReducedMotion);

const updataSettingUserAnimation = () => {
  isActivatedReduceMotion = handledQueryMotion(ReducedMotion);
}
ReducedMotion.addEventListener("change", updataSettingUserAnimation);

function getIDTag(e) {
  const hrefAttribute = e.target.href
  const pattern = new RegExp('#feature[1-9]', 'g');
  const hrelfFinded = hrefAttribute.match(pattern)[0];
  const idFinded = hrelfFinded.slice(1);
  return idFinded;
}

function showCrouselItem(idFinded) {
  carouselItems.forEach((item) => {
    const idItem = item.id;
    if (idFinded !== idItem) {
      item.hidden = true;
      item.style.opacity = 0;
    } else {
      item.hidden = false;
      item.style.opacity = 1;
    }
  })

  return;

}

/**
  * Determine the position of the Item carousel
  * @param {str} elementID - Id that is finded 
  * @returns {number} the coord where is id element
  */
function getPositionElement(elementID) {
  let position;
  carouselItems.forEach((item) => {
    if (item.id === elementID) {
      position = item.getBoundingClientRect();
    }
  })
  return position.top
}

function lerp(minValue, maxValue, t) {
  let position = minValue + (maxValue - minValue) * t;
  return position
}

let IDAnimationScroll;
let IDAnimationOpacity;

/**
  * activate fadeIN effect on an element
  *
  * @param {number} timestamp - time of ending of each of previos frame.
  * @param {number} starTimestamp - time when the first frame started.
  * @param {number} duration - time when end the animation.
  * @param {Element} element - the element that receive the effet.
  *
  */

function fadeIn(timestamp, starTimestamp, duration, element, updateCallback) {
  const value = Math.min((timestamp - starTimestamp) / (duration * 1000), 1); // animation-timing-function: linear
  if (value < 1) {
    element.style.opacity = value;
    const IDRequest = requestAnimationFrame((t) => fadeIn(t, starTimestamp, duration, element, updateCallback));
    updateIDAnimationOpacity(IDRequest);
  } else {
    element.style.opacity = 1;
  }
}


function updateIDAnimationOpacity(assignment) {
  IDAnimationOpacity = assignment;
}


/**
  *  change the position of window in vertical direction
  *
  * @param {number} timestamp - time of ending of each of previos frame.
  * @param {number} starTimestamp - time when the first frame started.
  * @param {number} duration - time when end the animation.
  * @param {number} starPostion - pixels where is the scroll.
  * @param {number} endPostion - pixels where must to finish the scroll effect.
  *
  */
function animateScrolY(timestamp, startTimestamp, duration, startPostion, endPosition, updateCallback) {
  const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
  const easyingFunction = Math.sin((Math.PI / 2) * progress);
  const y = lerp(startPostion, endPosition, easyingFunction);

  if (progress < 1) {
    window.scroll(0, y);
    const IDRequest = requestAnimationFrame((frameTime) => animateScrolY(frameTime, startTimestamp, duration, startPostion, endPosition, updateCallback))
    updateCallback(IDRequest);
  }
}

function updateIDAnimationScrool(assignment) {
  IDAnimationScroll = assignment;
}

function handledClick() {
  handledItem.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const elementID = getIDTag(e);
      showCrouselItem(elementID);
      const selectedElement = document.getElementById(elementID);
      window.cancelAnimationFrame(IDAnimationScroll);
      window.cancelAnimationFrame(IDAnimationOpacity);
      const startPosition = window.scrollY;
      const elementPosition = carousel.getBoundingClientRect().top;
      const endPosition = startPosition + elementPosition;
      const startTimestamp = document.timeline.currentTime;
      if (isActivatedReduceMotion) {
        window.scroll(0, endPosition);
        selectedElement.style.opacity = 1;
      } else {
        const duration = 1; // seconds 
        IDAnimationScroll = requestAnimationFrame(
          (t) => animateScrolY(t, startTimestamp, duration, startPosition, endPosition, updateIDAnimationScrool));
        IDAnimationOpacity = requestAnimationFrame(
          (t) => fadeIn(t, startTimestamp, duration, selectedElement, updateIDAnimationOpacity));
      }

    })
  })
}

function componentCarousel() {
  showCrouselItem("feature1");
  handledClick();

}










export { componentCarousel }
