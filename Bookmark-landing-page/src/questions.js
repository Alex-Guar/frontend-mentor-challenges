const questionItem = Array.from(document.getElementsByClassName("question-item"));


function componentQuestions() {
  questionItem.forEach((question)=>{
    question.addEventListener("toggle",()=>{
        const questionHeader = question.children.item(0);
        const questionIcon = questionHeader.children.item(1);
      if (question.open) {
        questionIcon.style.transform = "rotate(180deg)";
        console.log("open");
      } else {
        questionIcon.style.transform = "rotate(0deg)";
        console.log("close");
      }
    });
  });
}
export { componentQuestions }
