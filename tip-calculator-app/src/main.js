import './style.css';

const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const buttonReset = document.getElementById("resetButton");

const inputData = {
  bill: 0,
  percentaje: 0,
  numPerson: 1,
  tipAmount: 0,
  total: 0,
};

/**
 * Evaluate if a value is a positive number.
 * @param {number} value - Number to evaluate
 * @returns {boolean} True if positive, false otherwise
 */
const isPositive = (value) => !isNaN(value) && value > 0 ? true : false;

/**
 * Show the reset button.
 * @returns {void}
 */
function activateResetButton() {
  buttonReset.classList.remove("c_display_reset-incomplete");
}

/**
 * Hide/deactivate the reset button.
 * @returns {void}
 */
function desactivateResetButton() {
  buttonReset.classList.add("c_display_reset-incomplete");
}

/**
 * Reset all input values and UI elements to initial state.
 * @returns {void}
 */
function handleResestButtom() {
  inputData.bill = 0;
  inputData.percentaje = 0;
  inputData.numPerson = 1;
  inputData.tipAmount = 0;
  inputData.total = 0;
  calculateTipAmoutPerson();
  renderTipAmountPerson();
  calculateTotalAmoutPerson();
  renderTotalAmoutPerson();
  percentaje.removeColorSelection();
  desactivateResetButton();
}

/**
 * Determine and update the tip amount per person.
 * @returns {void}
 */
function calculateTipAmoutPerson() {
  inputData.tipAmount = (inputData.bill * (inputData.percentaje / 100)) / inputData.numPerson;
}

/**
 * Update the tip amount value to display in HTML.
 * @returns {void}
 */
function renderTipAmountPerson() {
  tipAmount.textContent = parseFloat(inputData.tipAmount).toFixed(2);
}

/**
 * Determine and update the total amount per person.
 * @returns {void}
 */
function calculateTotalAmoutPerson() {
  inputData.total = inputData.tipAmount + (inputData.bill / inputData.numPerson);
}

/**
 * Update the total amount per person in HTML.
 * @returns {void}
 */
function renderTotalAmoutPerson() {
  total.textContent = parseFloat(inputData.total).toFixed(2);
}

/**
 * Class representing an input element for the bill.
 * 
 * @property {number} value - The value of the bill
 * @property {HTMLElement} input - Represents the HTML input element
 * @property {HTMLElement} container - Represents the parent element of the input
 */
class Bill {
  /**
   * Create a bill instance.
   * @param {string} idInput - ID property of the HTML input
   * @param {string} idContainer - ID property of the HTML parent of the input
   */
  constructor(idInput, idContainer) {
    this.idInput = idInput;
    this.idContainer = idContainer;
    this.value = 0;
    this.input = document.getElementById(this.idInput);
    this.container = document.getElementById(this.idContainer);
  }

  /**
   * Activate the error border state.
   * @returns {void}
   */
  renderErrorState() {
    this.container.classList.add("IsIncorrect");
  }

  /**
   * Remove the error border state from the container.
   * @returns {void}
   */
  clearErrorState() {
    this.container.classList.remove("IsIncorrect");
  }

  handleInput = (e) => {
    const valueNum = Number.parseFloat(e.target.value);

    if (isPositive(valueNum)) {
      this.clearErrorState();
      this.value = valueNum;
      inputData.bill = this.value;
      this.input.style.opacity = 1;
      calculateTipAmoutPerson();
      renderTipAmountPerson();
      calculateTotalAmoutPerson();
      renderTotalAmoutPerson();

      console.log(inputData);
    } else {
      this.renderErrorState();
    }
  };

  /**
   * Register the input event listener for the bill element.
   * @returns {void}
   */
  addEventListener() {
    if (this.input) {
      this.input.addEventListener("input", this.handleInput);
    }
  }
}

/**
 * Class representing the percentage input selection.
 * @property {number} value - The value of the percentage
 * @property {string} className - Class name of the percentage buttons
 * @property {string} idCustom - ID of the custom percentage input
 * @property {HTMLElement[]} percentajesArray - Array of percentage button elements
 */
class Percentaje {
  constructor(className, idCustom) {
    this.className = className;
    this.idCustom = idCustom;
    this.value;
    this.percentajes = document.getElementsByClassName(this.className);
    this.percentajeCustom = document.getElementById(this.idCustom);
    this.percentajesArray = Array.from(this.percentajes);
  }

  /**
   * Activate the error state for the custom percentage input.
   * @returns {void}
   */
  renderErrorState() {
    this.percentajeCustom.classList.add("IsIncorrect");
  }

  /**
   * Remove the error state from the custom percentage input.
   * @returns {void}
   */
  clearErrorState() {
    this.percentajeCustom.classList.remove("IsIncorrect");
  }

  /**
   * Activate the selected color style on a percentage button.
   * @param {string} idPercentage - ID of the percentage element
   * @returns {void}
   */
  renderColorSelection(idPercentage) {
    this.percentajesArray.forEach((percentaje) => {
      percentaje.classList.remove("isSelect");
    });

    const element = document.getElementById(idPercentage);
    element.classList.add("isSelect");
  }

  /**
   * Remove the selected color style from all percentage buttons.
   * @returns {void}
   */
  removeColorSelection() {
    this.percentajesArray.forEach((percentaje) => {
      percentaje.classList.remove("isSelect");
    });
  }

  /**
   * Clear the value inside the custom percentage input.
   * @param {string} idCustomPercentaje - ID of the custom percentage input
   * @returns {void}
   */
  removeInputTextCustom(idCustomPercentaje) {
    const customInputElement = document.getElementById(idCustomPercentaje);
    customInputElement.value = "";
  }

  handleSelection = (e) => {
    const valueNum = Number.parseFloat(e.target.value);
    if (isPositive(valueNum)) {
      activateResetButton();
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
  };

  /**
   * Register click event listeners for percentage buttons and input event listener for custom percentage.
   * @returns {void}
   */
  addEventListener() {
    this.percentajesArray.forEach((percentaje) => {
      percentaje.addEventListener("click", this.handleSelection);
    });

    if (this.percentajeCustom) {
      this.percentajeCustom.addEventListener("input", this.handleSelection);
    }
  }
}

/**
 * Class representing the number of people input.
 * @property {string} idContainer - ID of the HTML container
 * @property {string} idInput - ID of the HTML input
 * @property {number} value - Number of people to split the bill
 * @property {HTMLElement} container - Parent element of the input
 * @property {HTMLElement} input - HTML input element
 * @property {HTMLElement} headError - Paragraph element for error messages
 */
class Person {
  constructor(idContainer, idInput) {
    this.idContainer = idContainer;
    this.idInput = idInput;
    this.value;
    this.container = document.getElementById(this.idContainer);
    this.input = document.getElementById(this.idInput);
    this.headError = document.getElementById("errorNumPeople");
  }

  /**
   * Display the error state and message to the user.
   * @returns {void}
   */
  renderErrorState() {
    this.container.classList.add("IsIncorrect");
    this.headError.style.visibility = 'visible';
  }

  /**
   * Clear the error state and hide the error message.
   * @returns {void}
   */
  clearErrorState() {
    this.headError.style.visibility = 'hidden';
    this.container.classList.remove("IsIncorrect");
  }

  handleInput = (e) => {
    const valueNum = Number.parseFloat(e.target.value);
    if (!isNaN(valueNum) && valueNum >= 1) {
      this.clearErrorState();
      this.value = valueNum;
      inputData.numPerson = this.value;
      this.input.style.opacity = 1;
      calculateTipAmoutPerson();
      renderTipAmountPerson();
      calculateTotalAmoutPerson();
      renderTotalAmoutPerson();
    } else {
      this.renderErrorState();
      desactivateResetButton();
    }
  };

  /**
   * Register the input event listener for the number of people element.
   * @returns {void}
   */
  addEventListener() {
    if (this.input) {
      this.input.addEventListener("input", this.handleInput);
    }
  }
}

const bill = new Bill("bill", "billContainer");
const percentaje = new Percentaje("percentage", "percentageCustom");
const people = new Person("numPeopleContainer", "numPeople");

percentaje.addEventListener();
people.addEventListener();
bill.addEventListener();

buttonReset.addEventListener("click", handleResestButtom);
