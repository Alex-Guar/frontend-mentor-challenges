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
function searchElement(elementID) {
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

      const move = async () => await window.scrollBy(0, searchElement(elementID));
      requestAnimationFrame(move);
    })

  })
}

function componentCarousel() {
  handledClick();

}



















export { componentCarousel }
