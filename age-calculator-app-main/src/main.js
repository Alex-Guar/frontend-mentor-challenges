import './style.css'
import * as z from "zod";

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const send = document.getElementById('sendData');

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

/**
 * evalute the typeerro 
 * @param {array} issues - list of errors 
 **/
function handleError(file, typeError) {
  if (file == 'day') {
    if (typeError === 'too_small') {
      renderErrorInvalidDay();
      console.log(1);
    }
    else if (typeError === 'invalid_type') {
      renderErrorRequiredDay();
      console.log(2);
    }
  }
  if (file == 'month') {
    if (typeError === 'too_small') {
      renderErrorInvalidDay();
      console.log(1);
    }
    else if (typeError === 'invalid_type') {
      renderErrorRequiredDay();
      console.log(2);
    }
  }
}

function hanldleDay() {
  dayBirth.day = Number.parseInt(inputDay.value) ?? undefined;
  console.log(dayBirth);
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



function handleSend(event) {
  event.preventDefault();
  const result = dayBirthSchema.safeParse(dayBirth);
  if (!result.success) {

    console.log(result.error.issues);   // ZodError instance
    result.error.issues.forEach((issue) => handleError(issue.path[0], issue.code))
  } else {
    clearErrorInvalidDay();
    clearErrorRequiredDay();
  }
}

inputDay.addEventListener("input", hanldleDay);
inputMonth.addEventListener("input", hanldleMonth);
inputYear.addEventListener("input", hanldleYear);
send.addEventListener('click', handleSend);

