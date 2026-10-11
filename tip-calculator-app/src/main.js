import './style.css'
const containersInput = document.getElementsByClassName("c_container_input");
const containerBill = containersInput.item(0);
const containerNumberPeople = containersInput.item(1);
const bill = document.getElementById("bill");
const customPercentage = document.getElementById("percentageCustom"); 
const numberPeople = document.getElementById("numPeople");

const isPositive = (value) => Number.parseInt(value)>0? true: false;

function renderErrorMessage() {
  containerBill.classList.add("IsIncorrect");
}


function handleInput(e) {
  const valueInt = Number.parseInt(e.data);
  if (isPositive(valueInt)) {
    renderErrorMessage()
  }
};

bill.addEventListener("input",handleInput);

