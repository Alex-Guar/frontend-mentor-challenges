import './style.scss'

const query = window.matchMedia("(max-width: 49em)");
const creationButton = document.getElementById("creation-button");
const creationsContainer = document.querySelector(".creations .l-container");
const creationsHeader = document.getElementsByClassName("creations-header");

function screenTest() {
  if (query.matches === false) {
    creationsHeader[0].appendChild(creationButton);
  } else {
    creationsContainer.appendChild(creationButton);
  }
}
screenTest();
query.addEventListener("change", screenTest);
