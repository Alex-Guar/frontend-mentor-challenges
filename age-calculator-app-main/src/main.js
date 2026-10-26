import './style.css'

const form = document.getElementById('birthday');
const controls = form.elements;
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

let nowDate;
nowDate = Temporal.Now.plainDateISO();

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
function isValidInputDate(data, value) {
  if (data === "day") {
    if (value <= 0 || value > 31) {
      renderErrorInvalidDay();
      clearErrorRequiredDay();
      return false;
    } else if (value === "" || isNaN(value)) {
      renderErrorRequiredDay();
      clearErrorInvalidDay();
      return false;
    } else {
      clearErrorInvalidDay();
      clearErrorRequiredDay();
      return true;
    }
  }

  if (data === "month") {
    if (value <= 0 || value > 12) {
      renderErrorInvalidMonth();
      clearErrorRequiredMonth();
      return false;
    } else if (value === "" || isNaN(value)) {
      renderErrorRequiredMonth();
      clearErrorInvalidMonth();
      return false;
    } else {
      clearErrorInvalidMonth();
      clearErrorRequiredMonth();
      return true;
    }
  }

  if (data === "year") {
    if (value > nowDate.year || value <= 0) {
      renderErrorInvalidYear();
      clearErrorRequiredYear();
      return false;
    } else if (value === "" || isNaN(value)) {
      renderErrorRequiredYear();
      clearErrorInvalidYear();
      return false;
    } else {
      clearErrorInvalidYear();
      clearErrorRequiredYear();
      return true;
    }
  }
}

function isValidCalculatedDate(date, value) {
  const validated = true;
  if (date === "years") {
    if (value >= 0) {
      clearErrorFutureYear();
      return validated;
    } else {
      renderErrorFutureYear();
      return !validated;
    }
  }
  if (date === "months") {
    if (value >= 0) {
      clearErrorInvalidMonth();
      return validated;
    } else {
      renderErrorInvalidMonth();
      return !validated;
    }
  }
  if (date === "days") {
    if (value >= 0) {
      clearErrorInvalidMonth();
      return validated;
    } else {
      renderErrorInvalidMonth();
      return !validated;
    }
  }
}

function renderResultDate(yearsValue, monthsValue, daysValue) {
  controls.resultYear.value = yearsValue;
  controls.resultMonths.value = monthsValue;
  controls.resultDays.value = daysValue;
}

function clearResultDate() {
  controls.resultYear.value = "- -";
  controls.resultMonths.value = "- -";
  controls.resultDays.value = "- -";
}

function handleSend(event) {
  event.preventDefault();
  const dayFiel = controls[0];
  const monthFiel = controls[1];
  const yearFiel = controls[2];
  const inputDayValue = Number.parseInt(dayFiel.value);
  const inputMonthValue = Number.parseInt(monthFiel.value);
  const inputYearValue = Number.parseInt(yearFiel.value);

  const dayInputPredicate = isValidInputDate("day", inputDayValue);
  const monthInputPredicate = isValidInputDate("month", inputMonthValue);
  const yearInputPredicate = isValidInputDate("year", inputYearValue);

  if (dayInputPredicate && monthInputPredicate && yearInputPredicate) {
    console.log("first teset pass");

    let dateBirthDay;
    dateBirthDay = Temporal.PlainDate.from({
      year: inputYearValue,
      month: inputMonthValue,
      day: inputDayValue
    });
    const yearTemporal = dateBirthDay.year;
    const monthTemporal = dateBirthDay.month;
    const dayTemporal = dateBirthDay.day;

    if (inputYearValue === yearTemporal && inputMonthValue === monthTemporal && inputDayValue === dayTemporal) {
      console.log("seconde test pass");
      const options = { largestUnit: "years", smallestUnit: "days" };
      const calculateTime = nowDate.since(dateBirthDay, options);
      const yearsCalculate = calculateTime.years;
      const monthsCalculate = calculateTime.months;
      const daysCalculate = calculateTime.days;
      const yearValidatedCalculated = isValidCalculatedDate("years", yearsCalculate);
      const monthsValidatedCalculated = isValidCalculatedDate("months", monthsCalculate);
      const daysValidatedCalculated = isValidCalculatedDate("days", daysCalculate);

      if (yearValidatedCalculated && monthsValidatedCalculated && daysValidatedCalculated) {
        renderResultDate(yearsCalculate, monthsCalculate, daysCalculate);
      } else {
        clearResultDate();
      }
    } else {
      console.log("second test not pass");
    }
  } else {
    clearResultDate();
  }
}

form.addEventListener('submit', handleSend);
