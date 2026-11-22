import './style.scss'
import * as carousel from './carousel.js';
import * as questions from './questions.js';
const formELement = document.querySelector("form");
const emailFied = document.getElementById("field-email");
const emailInput = document.getElementById("email");
const emailErrorMessage = document.getElementById("email-error-message");
const emailErrorIcon = document.getElementById("email-error-icon");


const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

carousel.componentCarousel();
questions.componentQuestions();

// Check if the email is valid
const isValidEmail = () => {
  const validity = emailInput.value.length !== 0 && emailRegExp.test(emailInput.value);
  return validity;
};

function showErrorMessage() {
    emailFied.classList.add("subscription-showError");
    emailErrorIcon.classList.add("subscription-isActive");
    emailErrorMessage.classList.add("subscription-isActive");
}

function hiddeErrorMessage() {
    emailFied.classList.remove("subscription-showError");
    emailErrorIcon.classList.remove("subscription-isActive");
    emailErrorMessage.classList.remove("subscription-isActive");
}

function handleInput(event) {
  if (event.data === null) {
    hiddeErrorMessage();
  } else if (!isValidEmail()) {
    showErrorMessage();
  } else {
    hiddeErrorMessage();
  }
}

function handleSubmitForm(event) {
  event.preventDefault();
  if (event.data === null) {
    showErrorMessage();
  } else if (!isValidEmail()) {
    showErrorMessage();
  } else {
    hiddeErrorMessage();
  }
}
emailInput.addEventListener("input", handleInput);
formELement.addEventListener("submit",handleSubmitForm);

