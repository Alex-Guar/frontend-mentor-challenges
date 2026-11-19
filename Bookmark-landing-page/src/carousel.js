const carousel = document.getElementById("descriptions-carousel");
const carouselItems = Array.from(document.getElementsByClassName("feature-card"));
const handledItem = Array.from(document.getElementsByClassName("feature-link"));

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
      item.setAttribute("inert", "");
      setTimeout(item.hidden = true, 5000);
    } else {
      item.removeAttribute("inert");
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






function handledClick() {
  handledItem.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const elementID = getIDTag(e);
      showCrouselItem(elementID);


      let lastTime = 0;
      const currentlyPosition = window.scrollY;
      const elementPosition = carousel.getBoundingClientRect().top;
      console.log(elementPosition)
      let y = 0;
      let currentPosition = currentlyPosition;
      function animateScrolY(now) {
        const speed = 10; //px per second
        if (lastTime === 0) {
          lastTime = now;
        }

        const dt = Math.min((now - lastTime) / 1000, 5);
        lastTime = now;
        const dy = speed * dt;
        y += dy
        window.scrollBy(0, y);
        currentPosition += y
        if (currentPosition < currentlyPosition + elementPosition) {
          requestAnimationFrame(animateScrolY);
        }
      }

      requestAnimationFrame(animateScrolY);

    })
  })
}

function componentCarousel() {
  handledClick();

}



















export { componentCarousel }
