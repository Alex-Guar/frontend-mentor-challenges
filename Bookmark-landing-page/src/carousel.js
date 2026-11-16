const carousel = document.getElementById("descriptions-carousel");
const carouselItems = Array.from(document.getElementsByClassName("feature-card"));
const handledItem = Array.from(document.getElementsByClassName("feature-link"));

function handledClick() {
  handledItem.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hrefAttribute = e.target.href
      const pattern = new RegExp('#feature[1-9]', 'g');
      const hrelfFinded = hrefAttribute.match(pattern)[0];
      const idFinded = hrelfFinded.slice(1);

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


    })

  })
}

function componentCarousel() {

  handledClick();

}



















export { componentCarousel }
