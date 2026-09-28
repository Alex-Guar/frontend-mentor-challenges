import './style.css'
const form = document.getElementById("form");
const inputFormat = document.getElementById("newsletter-input");
const errorMessage = document.getElementById("errorLabel");
const newsletterModule = document.getElementById("newsletter");
const successModule = document.getElementById("success");
const userEmail = successModule.querySelector("#user-email-display");
const dismissButton = document.getElementById("sucess-button")



function updateUserNameDisplay(text) {
  userEmail.textContent = `${text}`;
}

function showSuccessModule() {
  successModule.classList.remove("is-hidden");
}

function hideSuccessModule() {
  successModule.classList.add("is-hidden");
}

function showNewsLetterModule() {
  newsletterModule.classList.remove("is-hidden");
}


function hideNewsLetterModule() {
  newsletterModule.classList.add("is-hidden");
}


function isIncorrectEmail() {
  if (inputFormat.validity.typeMismatch) {
    return true}
  else {
    return false}
}

  
const handleSubmit = (e) => {
  e.preventDefault(e);
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  hideNewsLetterModule();
  showSuccessModule();
  updateUserNameDisplay(data.email);

  console.log(data.email);
};

function handleInputFormat(e) {
  e.preventDefault(e);
  if (isIncorrectEmail) {
    errorMessage.classList.remove("is-hidden");
  }
  else {
    errorMessage.classList.add("is-hidden");
  }
}

function onClickDismiss(e) {
  e.preventDefault(e);
  hideSuccessModule();
  showNewsLetterModule();
}

form.addEventListener("submit", handleSubmit);
inputFormat.addEventListener("input",handleInputFormat);
dismissButton.addEventListener("click",onClickDismiss);
