import './style.css'
import * as z from "zod";

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const send = document.getElementById('sendData');
const form = document.getElementById('birthday');

const errorInvalidDay = document.getElementById('errorValidDay');
const errorRequiredDay = document.getElementById('errorRequiredDay');

const errorInvalidMonth = document.getElementById('errorValidMonth');
const errorRequiredMonth = document.getElementById('errorRequiredMonth');

const errorInvalidYear = document.getElementById('errorValidYear');
const errorRequiredYear = document.getElementById('errorRequiredYear');


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
/**
 * evalute the typeerro 
 * @param {array} issues - list of errors 
 **/
function hanldleDay(event) {
  if (inputDay.validity.valid) {
    dayBirth.day = Number.parseInt(inputDay.value) ?? undefined;
    clearErrorInvalidDay();
  } else {
    renderErrorInvalidDay();
  }

}

function hanldleMonth() {
  dayBirth.month = Number.parseInt(inputMonth.value);
  console.log(dayBirth);
}
function hanldleYear() {
  dayBirth.year = Number.parseInt(inputYear.value);
  console.log(dayBirth);
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
      if (yearsCalculate >= 0) {

        const monthsCalculate = calculateTime.months;
        const daysCalculate = calculateTime.days;

        console.log(calculateTime);
        dataInput.resultYear.value = yearsCalculate;
        dataInput.resultMonths.value = monthsCalculate;
        dataInput.resultDays.value = daysCalculate;
      }

    } else {
      console.log("second test not pass");
    };
  }
}

form.addEventListener('submit', handleSend);

