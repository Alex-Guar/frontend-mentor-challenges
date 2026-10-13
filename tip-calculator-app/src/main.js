import './style.css'
let isPositive = (value) => !isNaN(value) && value > 0 ? true : false;

class Input {
  constructor(idInput, idContainer) {
    this.idInput = idInput;
    this.idContainer = idContainer;
    this.value = 0;
    this.input = document.getElementById(this.idInput);
    this.container = document.getElementById(this.idContainer);
    this.tipAmout = document.getElementById("tipAmount");
    this.total = document.getElementById("total");
  }

  handleInput = (e) => {
    const valueNum = Number.parseFloat(e.target.value);

    if (isPositive(valueNum)) {
      this.clearErrorState();
      this.value = valueNum;
      this.setTotal();
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
    this.total.textContent = this.value;
  }


  addEventListener() {
    if (this.input) {
      this.input.addEventListener("input", this.handleInput);
    }
  }
}

class People extends Input { }

class Bill extends Input { }

class Percentaje {
  constructor(className, idCustom, bill) {
    this.className = className;
    this.idCustom = idCustom;
    this.bill = bill;
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
      this.value = e.target.value
      console.log(this.value);
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
}


let bill = new Bill("bill", "billContainer")
let percentaje = new Percentaje("percentage", "percentageCustom", bill.value);
let people = new People("numPeople", "numPeopleContainer")

bill.addEventListener();
people.addEventListener();
percentaje.addEventListener();


