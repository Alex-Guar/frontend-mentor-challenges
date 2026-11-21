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
    item.hidden = false;
    const idItem = item.id;
    if (idFinded != idItem) {
      item.hidden = true;
    } else {
      item.hidden = false;
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

function lerp(minValue, maxValue, interpo) {
  let position = minValue + (maxValue - minValue) * interpo
  return position
}



function handledClick() {
  handledItem.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const elementID = getIDTag(e);
      showCrouselItem(elementID);

      const currentlyPosition = window.scrollY;
      const elementPosition = carousel.getBoundingClientRect().top;
      const start = document.timeline.currentTime;



      if (isActivatedReduceMotion) {
        window.scroll(0, currentlyPosition + elementPosition);

      } else {
        const duration = 1; // seconds 
        let Animation1 = requestAnimationFrame(animateScrolY);
        let Animation2 = requestAnimationFrame(fadeIn);

        if (Animation1 > 1 && Animation2 > 2) {
          window.cancelAnimationFrame(Animation2);
          window.cancelAnimationFrame(Animation1);
        } else {
          Animation1 = requestAnimationFrame(animateScrolY);
          Animation2 = requestAnimationFrame(fadeIn);
        }


        function fadeIn(now) {
          const selectedElement = document.getElementById(elementID);
          const value = Math.min((now - start) / (duration * 1000), 1); // animation-timing-function: linear
          if (value < 1) {
            selectedElement.style.opacity = value;
            Animation2 = requestAnimationFrame((t) => fadeIn(t));
          } else {
            selectedElement.style.opacity = 1;
            window.cancelAnimationFrame(Animation2);
          }
        }

        function animateScrolY(now) {
          const t = Math.min((now - start) / (duration * 1000), 1);
          const y = lerp(currentlyPosition, currentlyPosition + elementPosition + 70, Math.sin(t));
          window.scroll(0, y);
          if (t < 1) {
            Animation1 = requestAnimationFrame(animateScrolY);
          } else {
            window.cancelAnimationFrame(Animation1);
          }
        }

        console.log(Animation1, Animation2);

      }

    })
  })
}

function componentCarousel() {
  showCrouselItem("feature1");
  handledClick();




}



















export { componentCarousel }
