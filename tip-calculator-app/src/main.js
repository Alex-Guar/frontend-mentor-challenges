import './style.css'

let tipAmount = document.getElementById("tipAmount");
let total = document.getElementById("total");

const inputData = {
  bill: 0,
  percentaje: 0,
  numPerson: 1,
  tipAmount: 0,
  total: 0,
}

let isPositive = (value) => !isNaN(value) && value > 0 ? true : false;


function calculateTipAmoutPerson() {
  inputData.tipAmount = (inputData.bill * (inputData.percentaje / 100)) / inputData.numPerson;
}

function renderTipAmountPerson() {
  tipAmount.textContent = parseFloat(inputData.tipAmount).toFixed(2);
}

function calculateTotalAmoutPerson() {
  inputData.total = inputData.tipAmount + (inputData.bill / inputData.numPerson)
}
function renderTotalAmoutPerson() {
  total.textContent = parseFloat(inputData.total).toFixed(2);
}


class Bill {
  constructor(idInput, idContainer) {
    this.idInput = idInput;
    this.idContainer = idContainer;
    this.value = 0;
    this.input = document.getElementById(this.idInput);
    this.container = document.getElementById(this.idContainer);
  }

  handleInput = (e) => {
    const valueNum = Number.parseFloat(e.target.value);

    if (isPositive(valueNum)) {
      this.clearErrorState();
      this.value = valueNum;
      inputData.bill = this.value

      calculateTipAmoutPerson();
      renderTipAmountPerson();
      calculateTotalAmoutPerson();
      renderTotalAmoutPerson();

      console.log(inputData);
    } else {
      this.renderErrorState();
    }
  };

  renderErrorState() {
    this.container.classList.add("IsIncorrect");
  }

  clearErrorState() {
    this.container.classList.remove("IsIncorrect");
  }



  addEventListener() {
    if (this.input) {
      this.input.addEventListener("input", this.handleInput);
    }
  }
}



class Percentaje {
  constructor(className, idCustom, bill) {
    this.className = className;
    this.idCustom = idCustom;
    /* bill is a "class" */
    this.value
    this.percentajes = document.getElementsByClassName(this.className); /* array-like*/
    this.percentajeCustom = document.getElementById(this.idCustom);
    this.percentajesArray = Array.from(this.percentajes);
  }

  handleSelection = (e) => {
    const valueNum = Number.parseFloat(e.target.value);
    if (isPositive(valueNum)) {
      if (e.type === "click") {
        const elementId = e.target.getAttribute("id");
        this.renderColorSelection(elementId);
        this.removeInputTextCustom(this.idCustom);
      } else {
        this.removeColorSelection();
      }
      this.clearErrorState();
      this.value = valueNum;

      inputData.percentaje = this.value;

      calculateTipAmoutPerson();
      renderTipAmountPerson();
      calculateTotalAmoutPerson();
      renderTotalAmoutPerson();
    } else {
      this.renderErrorState();
    }
  }

  addEventListener() {
    this.percentajesArray.forEach((percentaje) => {
      percentaje.addEventListener("click", this.handleSelection);
    });

    if (this.percentajeCustom) {
      this.percentajeCustom.addEventListener("input", this.handleSelection);
    }
  }

  renderColorSelection(idPercentage) {

    this.percentajesArray.forEach((percentaje) => {
      percentaje.classList.remove("isSelect");
    });

    const element = document.getElementById(idPercentage);
    element.classList.add("isSelect");
  }

  removeColorSelection() {
    this.percentajesArray.forEach((percentaje) => {
      percentaje.classList.remove("isSelect");
    });
  }

  removeInputTextCustom(idCustomPercentaje) {

    const customInputElement = document.getElementById(idCustomPercentaje);
    customInputElement.value = "";

  }


  renderErrorState() {
    this.percentajeCustom.classList.add("IsIncorrect");
  }

  clearErrorState() {
    this.percentajeCustom.classList.remove("IsIncorrect");
  }

}


class Person {
  constructor(idContainer, idInput, bill, percentaje) {
    this.idContainer = idContainer;
    this.idInput = idInput;
    this.value
    this.container = document.getElementById(this.idContainer); /* array-like*/
    this.input = document.getElementById(this.idInput);
    this.tipAmount = document.getElementById("tipAmount");
    this.total = document.getElementById("total");
    this.bill = bill;
    this.percentajes = percentaje;
    this.headError = document.getElementById("errorNumPeople");

  }

  handleInput = (e) => {

    const valueNum = Number.parseFloat(e.target.value);
    if (!isNaN(valueNum) && valueNum >= 1) {
      this.clearErrorState();
      this.value = valueNum
      inputData.numPerson = this.value;
      calculateTipAmoutPerson();
      renderTipAmountPerson();
      calculateTotalAmoutPerson();
      renderTotalAmoutPerson();
      console.log(inputData);
    } else {
      this.renderErrorState();
    }
  }

  addEventListener() {
    if (this.input) {
      this.input.addEventListener("input", this.handleInput);
    }
  }

  renderErrorState() {
    this.container.classList.add("IsIncorrect");
    this.headError.style.visibility = 'visible';

  }

  clearErrorState() {
    this.headError.style.visibility = 'hidden';
    this.container.classList.remove("IsIncorrect");
  }

}

let bill = new Bill("bill", "billContainer");
let percentaje = new Percentaje("percentage", "percentageCustom", bill);
let people = new Person("numPeopleContainer", "numPeople", bill, percentaje);

percentaje.addEventListener();
people.addEventListener();
bill.addEventListener();


