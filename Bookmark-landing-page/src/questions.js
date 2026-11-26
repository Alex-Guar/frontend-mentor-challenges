const questionItems = Array.from(document.getElementsByClassName("question-item"));

const ReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let animationHiddenID;

const handledQueryMotion = e => {
  if (e.matches) {
    return true;
  } else {
    return false;
  }
};

let isActivatedReduceMotion = handledQueryMotion(ReducedMotion);

const updataSettingUserAnimation = () => {
  isActivatedReduceMotion = handledQueryMotion(ReducedMotion);
}

ReducedMotion.addEventListener("change", updataSettingUserAnimation);

function lerp(minValue, maxValue, t) {
  let position = minValue + (maxValue - minValue) * t;
  return position
}


/**
  * active the answer of questions with an move slide
  * @param {number} timestamp - time of ending of previous frame.
  * @param {number} startTimestamp - time when the first frame started.
  * @param {number} duration - define the time when finis the animation
  * @param {number} startPosition - value start.
  * @param {number} endPosition - stage when the animation are going to finish.
  * @param {Element} element - the element of DOM that have the answer.
  */
function animateOpenAnswer(timestamp, startTimestamp, duration, endPosition, element) {
  element.style.overflow = "hidden";
  const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
  const endPositionParse = Number.parseFloat(endPosition)
  const y = lerp(0, endPositionParse, progress);
  const computedStyleAnswer = window.getComputedStyle(element);
  const parseHeight = Number.parseFloat(computedStyleAnswer.height);

  if (parseHeight < endPositionParse) {
    const concatHeight = `${y}px`
    element.style.height = concatHeight;
    const IDRequest = window.requestAnimationFrame((frameTime) => { animateOpenAnswer(frameTime, startTimestamp, duration, endPosition, element) })
  } else {
    element.style.height = endPosition;
  }
}

function animateCloseAnswer(timestamp, startTimestamp, duration, startPosition, element, father, callbackUpdate) {

  element.style.overflow = "hidden";
  const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
  const startPositionParse = Number.parseFloat(startPosition)
  const y = lerp(startPositionParse, 0, progress);
  const computedStyleAnswer = window.getComputedStyle(element);
  const parseHeight = Number.parseFloat(computedStyleAnswer.height);

  if (parseHeight !== 0) {
    const concatHeight = `${y}px`
    element.style.height = concatHeight;
    const IDRequest = window.requestAnimationFrame((frameTime) => { animateCloseAnswer(frameTime, startTimestamp, duration, startPosition, element, father, callbackUpdate) })
    callbackUpdate(IDRequest);

  } else {
    father.open = false;
    element.style.height = "max-content";
  }
}


function updateIDHiddenAnswer(assigmente) {
  animationHiddenID = assigmente;
}



function componentQuestions() {
  questionItems.forEach((question) => {

    const questionHeader = question.children.item(0);
    const questionIcon = questionHeader.children.item(1);
    const questionAnswer = question.children.item(1);
    const computedStyleAnswer = window.getComputedStyle(questionAnswer);

    questionHeader.addEventListener("click", (e) => {
      e.preventDefault();

      if (question.open) {

        console.log("closing");
        if (isActivatedReduceMotion) {
          questionIcon.style.backgroundColor = "hsl(231, 69%, 60%)";
          questionIcon.style.transform = "rotate(0deg)";
        } else {
          window.cancelAnimationFrame(animationHiddenID);
          questionAnswer.style.height = "max-content";
          const startTimestamp = document.timeline.currentTime;
          const startPosition = computedStyleAnswer.height;
          console.log(startPosition);
          window.requestAnimationFrame((timestamp) => {
            animateCloseAnswer(timestamp, startTimestamp, 0.5, startPosition, questionAnswer, question, updateIDHiddenAnswer)
          });
        }



      } else {
        question.open = true;

        if (isActivatedReduceMotion) {

          // animation icon
          questionIcon.style.backgroundColor = "#FA5959";
          questionIcon.style.transform = "rotate(180deg)";
        } else {

          const startTimestamp = document.timeline.currentTime;
          const endPosition = computedStyleAnswer.height;
          questionAnswer.style.height = 0;
          window.requestAnimationFrame((timestamp) => {
            animateOpenAnswer(timestamp, startTimestamp, 0.5, endPosition, questionAnswer)
          });

        }
        console.log("openning");
      }

      questionAnswer.hidden;
    });


    question.addEventListener("toggle", () => {





    });
  });
}
export { componentQuestions }
