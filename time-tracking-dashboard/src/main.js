import './style.css';
import data from './data.json' with { type: 'json' };

const btDaily = document.getElementById('daily');
const btWeekly = document.getElementById('weekly');
const btMonthly = document.getElementById('monthly');
const statesFrequency = [btDaily, btWeekly, btMonthly];

/* 
 * Data definition
 * this function allow to pass and Time and return
 * the change of the data
 */
function setData(frecuency) {
  for (const activity of data) {
    const activityName = activity.title.replace(' ', '-').toLowerCase();
    const divCurrent = document.getElementById(`current-${activityName}`);
    const divPrevious = document.getElementById(`previous-${activityName}`);
    const filterFrequency = activity.timeframes[frecuency];
    const currentTime = filterFrequency.current;
    const previousTime = filterFrequency.previous;

    divCurrent.dateTime = `PT${currentTime}H`;
    divCurrent.textContent = `${currentTime}hrs`;

    divPrevious.dateTime = `PT${previousTime}H`;
    divPrevious.textContent = `${previousTime}hrs`;
  }
}

function activateFrequency(f) { 
  statesFrequency.forEach((fre) => {
    if (fre.className === "is-select") {
      fre.setAttribute("class", "");
    }
  }); 
  statesFrequency[f].setAttribute("class", "is-select");
}

const handleDaily = () => { 
  activateFrequency(0); 
  setData("daily"); 
};

const handleWeekly = () => { 
  activateFrequency(1); 
  setData("weekly"); 
};

const handleMonthly = () => { 
  activateFrequency(2); 
  setData("monthly"); 
};

handleWeekly();

btDaily.addEventListener('click', handleDaily);
btWeekly.addEventListener('click', handleWeekly);
btMonthly.addEventListener('click', handleMonthly);
