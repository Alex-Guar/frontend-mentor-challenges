import './style.css'
const button = document.querySelector('button');
const barShareContent = document.querySelector('.c__container-socialshare');




button.addEventListener('click', activeBarShareOptions); 

function activeBarShareOptions() {
  if (isVisibleOptionShares()) {
    activateOptionsShare();
  }
  else {
    desactivateOptinsShare();
}}

function isVisibleOptionShares() {
  return barShareContent.classList.contains("c__container-socialshare-animate-in");
}

function activateOptionsShare() {
    barShareContent.classList.remove("c__container-socialshare-animate-in");
    barShareContent.classList.add("c__container-socialshare-animate-out");
}

function desactivateOptinsShare() {
    barShareContent.classList.add('c__container-socialshare-animate-in');
    barShareContent.classList.remove('c__container-socialshare-animate-out');
}



