import './style.css'
import * as z from "zod";

const form = document.getElementById('birthday');

const inputsElement = document.getElementsByTagName("input");

const errorInvalidDay = document.getElementById('errorValidDay');
const errorRequiredDay = document.getElementById('errorRequiredDay');

const errorInvalidMonth = document.getElementById('errorValidMonth');
const errorRequiredMonth = document.getElementById('errorRequiredMonth');

const errorInvalidYear = document.getElementById('errorValidYear');
const errorRequiredYear = document.getElementById('errorRequiredYear');

const errorFutureYear = document.getElementById('errorFutureYear');

const inputsArray = Array.from(inputsElement);
inputsArray.forEach((input) => input.addEventListener("click", () => input.style.opacity = 1))


const dayBirthSchema = z.object({
  day: z.number().positive(),
  month: z.number().positive(),
  year: z.number().positive(),
})

const dayBirth = {
}

/**
 *
 * data definition
 * dayBirth: is a structure that have:
 * day, month, year
 * */
function renderErrorRequiredDay() {
  errorRequiredDay.classList.add('isRequired');
}

function renderErrorInvalidDay() {
  errorInvalidDay.classList.add('isInvalid');
}
function clearErrorRequiredDay() {
  errorRequiredDay.classList.remove('isRequired');
}

function clearErrorInvalidDay() {
  errorInvalidDay.classList.remove('isInvalid');
}

function renderErrorRequiredMonth() {
  errorRequiredMonth.classList.add('isRequired');
}

function renderErrorInvalidMonth() {
  errorInvalidMonth.classList.add('isInvalid');
}
function clearErrorRequiredMonth() {
  errorRequiredMonth.classList.remove('isRequired');
}

function clearErrorInvalidMonth() {
  errorInvalidMonth.classList.remove('isInvalid');
}


function renderErrorRequiredYear() {
  errorRequiredYear.classList.add('isRequired');
}

function renderErrorInvalidYear() {
  errorInvalidYear.classList.add('isInvalid');
}
function clearErrorRequiredYear() {
  errorRequiredYear.classList.remove('isRequired');
}

function clearErrorInvalidYear() {
  errorInvalidYear.classList.remove('isInvalid');
}

function renderErrorFutureYear() {
  errorFutureYear.classList.add('isInvalid');
}

function clearErrorFutureYear() {
  errorFutureYear.classList.remove('isInvalid');
}
/**
  * determine what error is
  * @param {string} issues - name of the problem 
  **/

function valid(data, value) {

  if (data === "day") {
    if (value <= 0 || value > 31) {
      renderErrorInvalidDay();
      clearErrorRequiredDay();
      return false;
    }
    else if (value === "" || isNaN(value)) {
      renderErrorRequiredDay();
      clearErrorInvalidDay();
      return false;
    } else {
      clearErrorInvalidDay();
      clearErrorRequiredDay();
      return true;
    };
  }
  if (data === "month") {
    if (value <= 0 || value > 12) {
      renderErrorInvalidMonth();
      clearErrorRequiredMonth();
      return false;
    }
    else if (value === "" || isNaN(value)) {
      renderErrorRequiredMonth();
      clearErrorInvalidMonth();
      return false;
    } else {
      clearErrorInvalidMonth();
      clearErrorRequiredMonth();
      return true;
    };
  }

  if (data === "year") {
    if (value <= 0) {
      renderErrorInvalidYear();
      clearErrorRequiredYear();
      return false;
    }
    else if (value === "" || isNaN(value)) {
      renderErrorRequiredYear();
      clearErrorInvalidYear();
      return false;
    } else {
      clearErrorInvalidYear();
      clearErrorRequiredYear();
      return true;
    };
  }

}

function validateCalculatedDate(date, value) {
  const validated = true
  if (date === "years") {
    if (value >= 0) {
      clearErrorFutureYear();
      return validated
    } else {
      renderErrorFutureYear();
      return !validated
    }
  }
  if (date === "months") {
    if (value >= 0) {
      clearErrorInvalidMonth();
      return validated
    } else {
      renderErrorInvalidMonth();
      return !validated
    }
  }
  if (date === "days") {
    if (value >= 0) {
      clearErrorInvalidDay();
      return validated
    } else {
      renderErrorInvalidDay();
      return !validated
    }
  }
}


function renderResultDate(yearsValue, monthsValue, daysValue) {
  const controls = form.elements;
  controls.resultYear.value = yearsValue;
  controls.resultMonths.value = monthsValue;
  controls.resultDays.value = daysValue;
}

function clearResultDate() {
  const controls = form.elements;
  controls.resultYear.value = "- -";
  controls.resultMonths.value = "- -";
  controls.resultDays.value = "- -";
}

function handleSend(event) {
  event.preventDefault();
  const dataInput = form.elements;
  const dayFiel = dataInput[0];
  const monthFiel = dataInput[1];
  const yearFiel = dataInput[2];
  const dayValue = Number.parseInt(dayFiel.value);
  const monthValue = Number.parseInt(monthFiel.value);
  const yearValue = Number.parseInt(yearFiel.value);

  const dayValid = valid("day", dayValue)
  const monthValid = valid("month", monthValue)
  const yearValid = valid("year", yearValue)

  if (dayValid && monthValid && yearValid) {
    console.log("first teset pass");
    const dateBirthDay = Temporal.PlainDate.from({
      year: yearValue,
      month: monthValue,
      day: dayValue
    });
    const year = dateBirthDay.year;
    const month = dateBirthDay.month;
    const day = dateBirthDay.day;

    if (dayValue === day && monthValue === month && yearValue === year) {
      console.log("seconde test pass");
      const nowDate = Temporal.Now.plainDateISO();
      const options = { largestUnit: "years", smallestUnit: "days" }
      const calculateTime = nowDate.since(dateBirthDay, options);
      const yearsCalculate = calculateTime.years;
      const monthsCalculate = calculateTime.months;
      const daysCalculate = calculateTime.days;
      const yearValidatedCalculated = validateCalculatedDate("years", yearsCalculate);
      const monthsValidatedCalculated = validateCalculatedDate("months", monthsCalculate);
      const daysValidatedCalculated = validateCalculatedDate("days", daysCalculate);

      if (yearValidatedCalculated && monthsValidatedCalculated && daysValidatedCalculated) {
        renderResultDate(yearsCalculate, monthsCalculate, daysCalculate);
      } else {
        clearResultDate();
      }
    } else {
      console.log("second test not pass");
    };
  } else {
    clearResultDate();
  }
}

form.addEventListener('submit', handleSend);

