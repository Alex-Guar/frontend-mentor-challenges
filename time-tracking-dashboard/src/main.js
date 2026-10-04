import './style.css'
import data from './data.json' with { type: 'json' }

const btDaily = document.getElementById('daily');
const btWeekly = document.getElementById('weekly');
const btMonthly = document.getElementById('monthly');
/* 
 *Data definition
 *this function allow to pass and Time and return
 *the change of the data
 *
 * */

function setData(frecuency) {
  for (const activity of data) {
    const activityName = activity.title.replace(' ', '-').toLowerCase();
    const divCurrent = document.getElementById(`current-${activityName}`);
    const divPrevious = document.getElementById(`previous-${activityName}`);
    const filterFrecuency = activity.timeframes[frecuency];
    const currentTime = filterFrecuency.current;
    const previousTime = filterFrecuency.previous;

    divCurrent.dateTime = `PT${currentTime}H`;
    divCurrent.textContent = `${currentTime}hrs`;

    divPrevious.dateTime = `PT${previousTime}`;
    divPrevious.textContent = `${previousTime}hrs`;
  }
}

btDaily.addEventListener('click', (e) => { setData("daily") });
btWeekly.addEventListener('click', (e) => { setData("weekly") });
btMonthly.addEventListener('click', (e) => { setData("monthly") });




