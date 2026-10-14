import './style.css'

let tipAmount = document.getElementById("tipAmount");
let total = document.getElementById("total");
const inputData = {

}

let isPositive = (value) => !isNaN(value) && value > 0 ? true : false;


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
      this.setTotal();
      this.renderTotal();
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

  setTotal() {
    inputData.total = this.value
  }
  renderTotal() {
    total.textContent = inputData.total;
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
    console.log(this.percentajeCustom);
  }

  handleSelection = (e) => {

    const valueNum = Number.parseFloat(e.target.value);
    if (isPositive(valueNum)) {
      this.clearErrorState();
      this.value = valueNum;
      inputData.percentaje = this.value
      this.calculateTipAmoutPerson();
      this.calculateTotalAmoutPerson();
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

  renderErrorState() {
    this.percentajeCustom.classList.add("IsIncorrect");
  }

  clearErrorState() {
    this.percentajeCustom.classList.remove("IsIncorrect");
  }

  calculateTipAmoutPerson() {
    inputData.tipAmount = inputData.bill * (inputData.percentaje / 100);
  }

  renderTipAmountPerson() {
    tipAmount.textContent = parseFloat(inputData.tipAmount).toFixed(2);
  }

  calculateTotalAmoutPerson() {
    inputData.total = inputData.tipAmount + inputData.bill
  }
  renderTotalAmoutPerson() {
    total.textContent = parseFloat(inputData.total).toFixed(2);
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

  }

  handleInput = (e) => {

    const valueNum = Number.parseFloat(e.target.value);
    if (!isNaN(valueNum) && valueNum >= 1) {
      this.clearErrorState();
      this.value = valueNum
      inputData.numPerson = this.value
      console.log(this.value);
      this.calculateTipAmoutPerson();
      this.calculateTotalAmoutPerson();
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
  }

  clearErrorState() {
    this.container.classList.remove("IsIncorrect");
  }

  calculateTipAmoutPerson() {
    this.tipAmount.textContent = parseFloat(this.tipAmount.textContent) / this.value;
    this.tipAmount.textContent = parseFloat(this.tipAmount.textContent).toFixed(2);
  }

  calculateTotalAmoutPerson() {
    this.total.textContent = parseFloat(this.tipAmount.textContent) + parseFloat(this.bill.value);
  }

}

let bill = new Bill("bill", "billContainer");
let percentaje = new Percentaje("percentage", "percentageCustom", bill);
let people = new Person("numPeopleContainer", "numPeople", bill, percentaje);

percentaje.addEventListener();
people.addEventListener();
bill.addEventListener();


